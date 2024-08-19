//article.js 라우터 파일의 기본주소는
//app.js에서 참조시 http://localhost:3000/article 기본주소가 설정되게
//처리합니다.
var express = require("express");
var router = express.Router();

// Sequelize에서 Op 객체를 가져오기
const { Op } = require('sequelize');

//DB프로그래밍을 위한 ORM DB객체 참조하기
var db = require("../models/index");

//관리자 로그인여부 체크 미들웨어 함수 참조하기
const { isLoggined } = require("./sessionMiddleware.js");

//파일업로드를 위한 multer객체 참조하기
var multer = require("multer");

//파일저장위치 지정
var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads/article/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});

//일반 업로드처리 객체 생성
var upload = multer({ storage: storage });

// 게시글 전체목록조회 웹페이지 요청과 응답처리 라우팅메소드
// 호출주소: http://localhost:3000/article/list
// 호출방식: Get
// 응답결과: 전체 게시글 목록이 포함된 웹페이지 반환
router.get("/list",isLoggined, async (req, res) => {
  try {
      const { title, publication_issue, writer_id, page = 1 } = req.query;

      // 한 페이지에 표시할 게시글 수
      const limit = 10;
      const offset = (page - 1) * limit;

      // 기본 조건 설정
      const whereClause = {};

      if (title) {
          whereClause.title = { [Op.like]: `%${title}%` };
      }

      if (publication_issue) {
          whereClause.publication_issue = publication_issue;
      }

      const includeOptions = [
          {
              model: db.Writer,
              as: "writer",
              attributes: ["id", "english_name"],
              through: {
                  where: {
                      role: "main",
                  },
              },
          },
      ];

      if (writer_id && writer_id !== "all") {
          includeOptions[0].where = { id: writer_id };
      }

      // 전체 게시글 개수 가져오기
      const totalArticles = await db.Article.count({ where: whereClause });

      // 전체 게시글 목록 조회하기, 최신 발간호 순으로 정렬
      const articles = await db.Article.findAll({
          where: whereClause,
          include: includeOptions,
          limit,
          offset,
          order: [['publication_issue', 'DESC']],
      });

      const totalPages = Math.ceil(totalArticles / limit);

      const writers = await db.Writer.findAll({
          attributes: ["id", "english_name"],
          where: { used_yn_code: 1 },
      });

      const searchOption = { title, publication_issue, writer_id };

      res.render("article/list.ejs", { 
          articles, 
          writers, 
          searchOption, 
          totalPages, 
          currentPage: parseInt(page) 
      });
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});


//신규 게시글 등록 웹페이지 요청과 응답처리 라우팅메소드
//호출주소: http://localhost:3000/article/create
router.get("/create", isLoggined, async (req, res, next) => {
  // DB에서 기자 목록 조회 (여기서는 'korean_name'을 가져오지만 필요에 따라 'english_name'을 가져올 수도 있습니다)
  const writers = await db.Writer.findAll({
    attributes: ['id', 'english_name'],
    where: { used_yn_code: 1 }, // 사용 중인 기자만 가져오기
  });

  // create.ejs 뷰로 기자 목록 전달
  res.render("article/create.ejs", { writers });
});

// 신규 게시글 입력정보 등록처리 요청과 응답처리 라우팅메소드
// 호출주소: http://localhost:3000/article/create
router.post("/create", isLoggined, async (req, res) => {
  console.log("Received req.body:", req.body);

  // Step1: 신규 게시글 등록폼에서 사용자가 입력/선택한 값을 추출
  const title = req.body.title;
  const content = req.body.content;
  const publication_issue = req.body.publication_issue;
  const category = req.body.category;
  const subcategory = req.body.subcategory;
  const main_writer_id = req.body.main_writer; // main_writer를 가져옴
  const sub_writers = req.body.sub_writers || []; // 서브 기자는 배열로 전송됨 (선택사항)

  // 현재 로그인한 사용자의 관리자 고유번호 추출하기 - 세션을 이용해서
  const loginAdminId = req.session.loginUser.admin_member_id;

  // Step2: article 테이블에 등록할 json 데이터 생성
  const article = {
    title,
    content, // HTML 형식 그대로 저장
    publication_issue,
    category,
    subcategory,
    main_writer_id,
    created_by: loginAdminId,
    created_at: new Date(),
    view_count: 0, // 기본값으로 조회수를 0으로 설정
  };

  // Step3: 준비된 신규 게시글 데이터를 article 테이블에 저장
  const newArticle = await db.Article.create(article);
  console.log("실제 DB article 테이블에 저장된 데이터확인:", newArticle);

  // Step4: article_writers 테이블에 메인 기자 및 서브 기자를 연결
  if (main_writer_id) {
    await db.Articlewriter.create({
      article_id: newArticle.id,
      writer_id: main_writer_id, // 이 부분에서 writer_id를 main_writer_id로 설정
      role: "main",
    });
  }

  // 서브 기자 추가
  if (sub_writers.length > 0) {
    const subWriterEntries = sub_writers.map((writer_id) => ({
      article_id: newArticle.id,
      writer_id,
      role: "sub",
    }));

    await db.Articlewriter.bulkCreate(subWriterEntries);
  }

  // 다른 후처리 작업이나 리다이렉트 등을 추가할 수 있습니다.
  res.redirect('/article/list');
});

// 기존 단일 게시글 수정 처리 요청과 응답처리 라우팅 메소드
router.post('/modify',isLoggined, async (req, res) => {
  const { article_id, title, content, publication_issue, category, subcategory, main_writer, sub_writers = [] } = req.body;
  const loginAdminId = req.session.loginUser.admin_member_id;

  const article = {
    title,
    content,
    publication_issue,
    category,
    subcategory,
    main_writer,
    updated_by: loginAdminId,
    updated_at: new Date(),
  };

  await db.Article.update(article, { where: { id: article_id } });

  // 기존의 관련 기자 정보를 삭제한 후 새롭게 추가
  await db.Articlewriter.destroy({ where: { article_id: article_id } });

  if (main_writer) {
    await db.Articlewriter.create({
      article_id: article_id,
      writer_id: main_writer, 
      role: "main",
    });
  }

  if (sub_writers.length > 0) {
    const subWriterEntries = sub_writers.map(writer_id => ({
      article_id: article_id,
      writer_id,
      role: "sub",
    }));
    await db.Articlewriter.bulkCreate(subWriterEntries);
  }

  res.redirect('/article/list');
});


// 기존 단일 게시글 삭제 처리 요청과 응답처리 라우팅 메소드
router.get('/delete',isLoggined, async (req, res) => {
  const article_id = req.query.id;
  
  await db.Articlewriter.destroy({ where: { article_id: article_id } });
  await db.Article.destroy({ where: { id: article_id } });

  res.redirect('/article/list');
});

// 기존 단일 게시글 정보 조회 확인 웹페이지 요청과 응답처리 라우팅 메소드
router.get('/modify/:id', isLoggined, async (req, res) => {
  const article_id = req.params.id;

  const article = await db.Article.findOne({ where: { id: article_id } });
  const mainWriter = await db.Articlewriter.findOne({ where: { article_id: article_id, role: 'main' } });
  const subWriters = await db.Articlewriter.findAll({ where: { article_id: article_id, role: 'sub' } });
  const writers = await db.Writer.findAll({
    attributes: ['id', 'english_name'],
    where: { used_yn_code: 1 }, 
  });

  res.render('article/modify.ejs', { article, mainWriter, subWriters, writers });
});


// 이미지 업로드 라우트
router.post("/upload_image", upload.single("upload"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const url = `/uploads/article/${file.filename}`;
  res.json({
    uploaded: 1,
    fileName: file.filename,
    url: url,
  });
});

module.exports = router;
