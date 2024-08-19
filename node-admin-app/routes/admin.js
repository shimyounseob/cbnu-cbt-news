//admin.js 라우터의 기본주소는
//http://localhost:5001/admin 주소로 app.js에서 설정되어 있다.
var express = require("express");
var router = express.Router();

// Sequelize에서 Op 객체를 가져오기
const { Op } = require('sequelize');

//moment 패키지
var moment = require("moment");

//관리자 암호를 단방향암호화(해시알고리즘) 하기위해 bcryptjs패키지 참조하기
var bcrypt = require("bcryptjs");

//ORM DB객체 참조하기
var db = require("../models/index.js");

//동적 SQL쿼리를 직접 작성해서 전달하기 위한 참조
var sequelize = db.sequelize;
const { QueryTypes } = sequelize;

//관리자 로그인여부 체크 미들웨어 함수 참조하기
const { isLoggined } = require("./sessionMiddleware.js");

// 권한 허가 체크 미들웨어 함수 참조하기
const { checkPermission } = require("./sessionMiddleware.js");

/*
- 관리자 계정 목록 조회 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/list
- 요청방식: Get
- 응답결과: 관리자계정 목록 조회 웹페이지(뷰+Data) 반환
*/
router.get("/list", isLoggined, async (req, res, next) => {
  //관리자 목록조회 조회옵션 데이터 정의 =ViewModel
  const searchOption = {
    permission_level: "9",
    admin_id: "",
    use_yn_code: "9",
  };

  // 이 쿼리에서 조인을 사용하는 이유:
  // 1. 관리자의 등록자를 식별하기 위해서입니다. 'admin' 테이블의 'reg_member_id'는 해당 관리자를 등록한 다른 관리자의 'admin_member_id'를 참조합니다.
  // 2. 따라서, 'reg_member_id'를 이용해 조인(LEFT JOIN)을 수행하여, 등록자의 'admin_id'를 가져올 수 있습니다.
  // 3. 이렇게 하면 관리자의 정보를 조회하면서 동시에 해당 관리자를 등록한 사람의 'admin_id'를 함께 조회할 수 있습니다.
  // 4. LEFT JOIN을 사용함으로써 등록자가 없는 경우에도 기본 관리자 정보를 유지할 수 있습니다.

  let query = `
    SELECT 
        a.admin_member_id,
        a.admin_id,
        a.admin_name,
        a.email,
        a.used_yn_code,
        a.reg_date,
        a.permission_level,
        r.admin_id AS registrar_admin_id  -- 등록자의 아이디를 가져옴
    FROM admin a
    LEFT JOIN admin r ON a.reg_member_id = r.admin_member_id  -- 조인을 통해 등록자의 admin_id를 가져옴
    ORDER BY a.reg_date ASC;
`;

  //sql쿼리를 직접 수행하는 구문
  const admins = await sequelize.query(query, {
    raw: true,
    type: QueryTypes.SELECT,
  });

  //예시코드: 해당 테이블의 전체 로우건수 조회하기
  const adminCount = await db.Admin.count();
  console.log("관리자 테이블 전체 로우건수 조회:", adminCount);

  //step2: 관리자 계정목록 데이터 뷰파일 전달하기
  res.render("admin/list.ejs", { admins, moment, searchOption });
});

/*
- 관리자 계정 목록 조회처리 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/list
- 요청방식: Post
- 응답결과: 관리자 계정 조회옵션 결과 웹페이지(뷰+Data) 반환
*/
router.post("/list",isLoggined, async (req, res) => {
  // Step1: 조회 옵션 정보 추출하기
  const { permission_level, admin_id, use_yn_code } = req.body;

  // 기본 쿼리문 시작
  let query = `
      SELECT 
      a.admin_member_id,
      a.admin_id,
      a.admin_name,
      a.email,
      a.used_yn_code,
      a.reg_date,
      a.permission_level,
      r.admin_id AS registrar_admin_id  -- 등록자의 아이디를 가져옴
    FROM admin a
    LEFT JOIN admin r ON a.reg_member_id = r.admin_member_id  -- 조인을 통해 등록자의 admin_id를 가져옴
    WHERE 1=1  -- 기본 조건(모든 행 포함)
  `;

  // permission_level이 9가 아닌 경우에만 조건 추가
  if (permission_level !== undefined && permission_level != 9) {
    query += ` AND a.permission_level = ${permission_level} `;
  }

  // 관리자 아이디 추가 필터 조건 반영
  if (admin_id && admin_id.length > 0) {
    query += ` AND a.admin_id LIKE '%${admin_id}%' `;
  }

  // 사용 여부 코드가 9가 아닌 경우에만 조건 추가
  if (use_yn_code !== undefined && use_yn_code != 9) {
    query += ` AND a.used_yn_code = ${use_yn_code} `;
  }

  // 쿼리 정렬 추가
  query += " ORDER BY a.reg_date ASC;";

  // 디버깅용: 쿼리 출력
  console.log("Generated Query:", query);

  // Step3: SQL 쿼리를 실행하여 데이터 가져오기
  const admins = await sequelize.query(query, {
    raw: true,
    type: QueryTypes.SELECT,
  });

  // 조회 옵션 기본값을 사용자가 입력/선택한 값으로 저장해서 뷰에 전달
  const searchOption = {
    permission_level: permission_level,
    admin_id: admin_id,
    use_yn_code: use_yn_code,
  };

  // Step4: 조회 결과 데이터를 뷰에 전달
  res.render("admin/list.ejs", { admins, moment, searchOption });
});

/*
- 신규 관리자 계정 등록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/create
- 요청방식: Get
- 응답결과: 신규 관리자 계정 등록 웹페이지(뷰) 반환
*/
router.get("/create",isLoggined, checkPermission(1), async (req, res, next) => {
  res.render("admin/create");
});

/*
- 신규 관리자 정보 등록처리 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/create
- 요청방식: Post
- 응답결과: 신규 관리자 계정 등록 후 목록 페이지 이동
*/
router.post("/create",isLoggined, checkPermission(1), async (req, res, next) => {
  //Step1: 신규 관리자 정보 추출하기
  const admin_id = req.body.admin_id;
  const admin_password = req.body.admin_password;
  const confirm_password = req.body.admin_password_confirm;
  const admin_name = req.body.admin_name;
  const email = req.body.email;
  const use_yn_code = req.body.use_yn_code;
  const permission_level = req.permission_level;

  // 유효성 검사
  if (admin_id.length < 8) {
    req.flash('error', '관리자 아이디는 8자 이상이어야 합니다.');
    return res.redirect('back');
  }

  if (admin_password.length < 10) {
    req.flash('error', '관리자 비밀번호는 10자 이상이어야 합니다.');
    return res.redirect('back');
  }

  if (admin_password !== confirm_password) {
    req.flash('error', '관리자 비밀번호와 비밀번호 재확인이 일치하지 않습니다.');
    return res.redirect('back');
  }

  // 기존 아이디 중복 검사
  const existingAdmin = await db.Admin.findOne({ where: { admin_id } });
  if (existingAdmin) {
    req.flash('error', '이미 존재하는 관리자 아이디입니다.');
    return res.redirect('back');
  }

  //hash('사용자가 입력한 암호',암호화강도);
  const encryptedPassword = await bcrypt.hash(admin_password, 12);

  //Step2: 신규 관리자 정보 DB저장 처리
  //주의/중요: db에 저장할 데이터 구조는 반드시 해당 모델의 속성명과 동일해야한다.
  //신규 데이터 등록시 모델의 속성중 NotNull(allowNull:false)인 속성값은 반드시 값을 등록해야합니다.

  //현재 로그인한 사용자의 관리자 고유번호 추출하기-세션을 이용해서
  const loginAdminId = req.session.loginUser.admin_member_id;

  const admin = {
    admin_id,
    admin_password: encryptedPassword,
    admin_name,
    email,
    used_yn_code: use_yn_code,
    reg_date: Date.now(),
    reg_member_id: loginAdminId,
    permission_level,
  };

  //db admin 테이블에 상기 신규 데이터를 등록처리하고 실제 저장된
  //관리자 계정정보를 db서버가 반환한다   .
  //create()==> INSERT INTO admin(...)values(...) SQL구문을 ORM FX가 만들어서
  //DB서버에 전달하여 실행하고 저장결과를 다시 반환한다.
  const registedAdmin = await db.Admin.create(admin);

  //Step3: 목록 페이지로 이동시키기
  res.redirect("/admin/list");
});

/*
- 기존 관리자 정보 수정처리 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/modify
- 요청방식: Post
- 응답결과: 기존 관리자 계정 정보 수정처리 후 목록 페이지 이동
*/ ``;
router.post("/modify", isLoggined, checkPermission(1), async (req, res, next) => {
  //STEP1: 사용자 수정데이터 추출하기
  //관리자 계정 고유번호
  const admin_member_id = req.body.admin_member_id;

  //관리자 계정:ex) eddy
  const admin_id = req.body.admin_id;
  const admin_password = req.body.admin_password;
  const confirm_password = req.body.admin_password_confirm;
  const admin_name = req.body.admin_name; 
  const email = req.body.email;
  const permission_level = req.body.permission_level;
  const use_yn_code = req.body.use_yn_code;

  // 유효성 검사
  if (admin_id.length < 8) {
    req.flash('error', '관리자 아이디는 8자 이상이어야 합니다.');
    return res.redirect('back');
  }

  const admin = {
    admin_name,
    email,
    permission_level,
    used_yn_code: use_yn_code,
    edit_date: Date.now(),
    edit_member_id: req.session.loginUser.admin_member_id,
  };

  // 비밀번호가 입력된 경우 비밀번호 변경 처리
  if (admin_password) {
    if (admin_password.length < 10) {
      req.flash('error', '비밀번호는 10자 이상이어야 합니다.');
      return res.redirect('back');
    }

    if (admin_password !== confirm_password) {
      req.flash('error', '비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return res.redirect('back');
    }

    const encryptedPassword = await bcrypt.hash(admin_password, 12);
    admin.admin_password = encryptedPassword;
  }

  //db서버에 해당 관리자계정 정보를 수정하고 실제 수정된 건수를 db서버에 반환한다.
  //update() => Update admin Set company_code =0,.... WHERE admin_member_id=1;
  const updatedCnt = await db.Admin.update(admin, {
    where: { admin_member_id: admin_member_id },
  });

  //STEP3: 수정처리후 목록페이지로 이동처리
  res.redirect("/admin/list");
});

/*
- 기존 관리자 정보 삭제처리 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/delete?id=1
- 요청방식: Get
- 응답결과: 기존 관리자 계정 정보 삭제처리 후 목록 페이지 이동
*/
router.get("/delete", isLoggined, checkPermission(1), async (req, res, next) => {
  //step1: 관리자 고유번호를 추출한다.
  const admin_member_id = req.query.id;

  //step2: 관리자 고유번호에 해당하는 단일 관리자 정보를 삭제처리한다.
  const deletedCnt = await db.Admin.destroy({
    where: { admin_member_id: admin_member_id },
  });

  //step3:삭제후 목록 페이지로 이동한다.
  res.redirect("/admin/list");
});

/*
- 기존 관리자 정보 확인 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/modify/1
- 요청방식: Get
- 응답결과: 기존 관리자 계정 정보가 포함된 웹 페이지(뷰) 제공
*/
router.get("/modify/:id", isLoggined, checkPermission(1), async (req, res, next) => {
  //step1: URL에서 관리자 고유번호를 추출합니다.
  const admin_member_id = req.params.id;

  //step2: 단일 관리자 정보를 db에서 조회해옵니다.
  const admin = await db.Admin.findOne({
    where: { admin_member_id: admin_member_id },
  });

  //step3: 단일 관리자 정보를 뷰에 전달합니다.
  res.render("admin/modify.ejs", { admin });
});

module.exports = router;
