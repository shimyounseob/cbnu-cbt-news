var express = require("express");
var router = express.Router();
var moment = require("moment");
var db = require("../models/index.js");
var sequelize = db.sequelize;
const { QueryTypes } = sequelize;
var multer = require("multer");
var path = require("path");

// Sequelize에서 Op 객체를 가져오기
const { Op } = require('sequelize');

//관리자 로그인여부 체크 미들웨어 함수 참조하기
const { isLoggined } = require("./sessionMiddleware.js");

// 권한 허가 체크 미들웨어 함수 참조하기
const { checkPermission } = require("./sessionMiddleware.js");

// 저장 경로를 public/writer로 설정
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/writer")); // 파일이 저장될 경로
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름을 현재 시간으로 설정
  },
});

var upload = multer({ storage: storage });

// 기자 목록 조회 웹페이지 요청 처리
router.get("/list",isLoggined, async (req, res, next) => {
  let query = `
        SELECT 
            w.id,
            w.korean_name,
            w.english_name,
            w.email,
            w.department,
            w.student_number,
            w.position,
            w.photo,
            w.used_yn_code,
            w.created_at,
            ca.admin_id AS created_by, -- 등록자의 admin_id 가져오기
            w.updated_at,
            ua.admin_id AS updated_by -- 수정자의 admin_id 가져오기
        FROM writer w
        LEFT JOIN admin ca ON w.created_by = ca.admin_member_id -- created_by를 admin_id와 조인
        LEFT JOIN admin ua ON w.updated_by = ua.admin_member_id -- updated_by를 admin_id와 조인
        ORDER BY w.id ASC;
    `;

  const writers = await sequelize.query(query, {
    raw: true,
    type: QueryTypes.SELECT,
  });

  const searchOption = { name: "" }; // 기본 검색 옵션 설정

  res.render("writer/list.ejs", { writers, moment, searchOption });
});

// 기자 목록 조회 (POST 방식) 처리 (검색 기능 추가)
router.post("/list",isLoggined, async (req, res) => {
  // Step1: 검색 옵션 정보 추출하기
  const { korean_name, use_yn_code } = req.body;

  // 기본 쿼리문 시작
  let query = `
        SELECT 
            w.id,
            w.korean_name,
            w.english_name,
            w.email,
            w.department,
            w.student_number,
            w.position,
            w.photo,
            w.used_yn_code,
            w.created_at,
            ca.admin_id AS created_by, -- 등록자의 admin_id 가져오기
            w.updated_at,
            ua.admin_id AS updated_by -- 수정자의 admin_id 가져오기
        FROM writer w
        LEFT JOIN admin ca ON w.created_by = ca.admin_member_id -- created_by를 admin_id와 조인
        LEFT JOIN admin ua ON w.updated_by = ua.admin_member_id -- updated_by를 admin_id와 조인
        WHERE 1=1
    `;

  // 기자 이름에 따른 필터링 조건 추가
  if (korean_name && korean_name.length > 0) {
    query += ` AND w.korean_name LIKE '%${korean_name}%' `;
  }

  // 사용 여부에 따른 필터링 조건 추가
  if (use_yn_code && use_yn_code != "9") {
    query += ` AND w.used_yn_code = ${use_yn_code} `;
  }

  // 쿼리 정렬 추가
  query += " ORDER BY w.id ASC;";

  // 디버깅용: 쿼리 출력
  console.log("Generated Query:", query);

  // Step3: SQL 쿼리를 실행하여 필터링된 기자 목록 가져오기
  const writers = await sequelize.query(query, {
    raw: true,
    type: QueryTypes.SELECT,
  });

  // 조회 옵션 기본값을 사용자가 입력/선택한 값으로 저장해서 뷰에 전달
  const searchOption = { korean_name: korean_name, use_yn_code: use_yn_code };

  // Step4: 조회 결과 데이터를 뷰에 전달
  res.render("writer/list.ejs", { writers, moment, searchOption });
});

// 신규 기자 등록 웹페이지 요청 처리
router.get("/create",isLoggined, checkPermission(1), async (req, res, next) => {
  res.render("writer/create.ejs");
});

// 신규 기자 정보 등록 처리 (POST 요청)
router.post("/create",isLoggined, checkPermission(1), upload.single("photo"), async (req, res, next) => {
  const {
    korean_name,
    english_name,
    email,
    department,
    student_number,
    used_yn_code,
    position,
  } = req.body;
  const photo = req.file ? req.file.filename : null;

  // 현재 로그인한 사용자의 관리자 고유번호 추출하기-세션을 이용해서
  const loginAdminId = req.session.loginUser.admin_member_id;

  const writer = {
    korean_name,
    english_name,
    email,
    department,
    student_number,
    position,
    photo,
    used_yn_code: parseInt(used_yn_code, 10),
    created_by: loginAdminId,
    created_at: new Date(),
  };

  const registeredWriter = await db.Writer.create(writer);
  res.redirect("/writer/list");
});

// 기존 기자 정보 수정 처리 (POST 요청)
router.post("/modify",isLoggined, upload.single("photo"), async (req, res, next) => {
  
    // 수정한 사용자의 관리자 고유번호 추출하기-세션을 이용해서
  const loginAdminId = req.session.loginUser.admin_member_id;

  const {
    id,
    korean_name,
    english_name,
    email,
    department,
    student_number,
    used_yn_code,
    position,
  } = req.body;
  const photo = req.file ? req.file.filename : null;

  const writer = {
    korean_name,
    english_name,
    email,
    department,
    student_number,
    position,
    used_yn_code: parseInt(used_yn_code, 10),
    updated_by: loginAdminId,
    updated_at: new Date(),
  };

  if (photo) {
    writer.photo = photo;
  }

  const updatedCnt = await db.Writer.update(writer, {
    where: { id: id },
  });

  res.redirect("/writer/list");
});

// 기존 기자 정보 삭제 처리 요청 (GET 요청)
router.get("/delete",isLoggined, checkPermission(1), async (req, res, next) => {
  const writerId = req.query.id;

  const deletedCnt = await db.Writer.destroy({
    where: { id: writerId },
  });

  res.redirect("/writer/list");
});

// 기존 기자 정보 확인 웹페이지 요청 처리 (GET 요청)
router.get("/modify/:id", isLoggined, checkPermission(1), async (req, res, next) => {
  const writerId = req.params.id;

  const writer = await db.Writer.findOne({
    where: { id: writerId },
  });

  res.render("writer/modify.ejs", { writer });
});

module.exports = router;
