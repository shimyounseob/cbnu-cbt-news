//환경설정파일 구성하기
require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require('./config/passport');  // Passport 설정 파일 불러오기
const connectDB = require('./config/db'); // 몽고 db 설정파일 불러오기

// cors 패키지 불러오기
const cors = require('cors');  

//서버 세션 객체 관리 패키지 참조하기
var session = require("express-session");

// Flash Message 패키지
var flash = require("connect-flash");

var expressLayouts = require("express-ejs-layouts");

//ORM DB연결객체 sequelize 참조하기
var sequelize = require("./models/index.js").sequelize;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var adminRouter = require("./routes/admin");

// var channelRouter = require('./routes/channel');
var articleRouter = require("./routes/article");
// var messageRouter = require('./routes/message');

var writerRouter = require("./routes/writer");

const apiarticleRouter = require('./api/article');
const apiwriterRouter = require('./api/writer');

var chatRoomRouter = require('./routes/chatRoom');
var messageRouter = require('./routes/messages');

// OAuth 전용 라우터 설정
var authRouter = require("./routes/auth");

var app = express();

//mysql과 자동연결처리 및 모델기반 물리 테이블 생성처리제공
sequelize.sync();

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000',  // 허용할 도메인
  credentials: true,  // 쿠키 및 인증 헤더를 포함할지 여부
}));


//백엔드 앱에서 세션을 사용할수 있게 설정하기
app.use(
  session({
    resave: false, //매번 세션 강제 저장 옵션  로그인시마다 세션값이 변경이 없어도 강제로 저장할지여부
    saveUninitialized: true, //빈 세션도 저장할지 여부..
    secret: "testsecret", //세션 아이디를 만들떄 사용한 암호화 키값
    cookie: {
      httpOnly: true, //http지원여부
      secure: false, //https환경에서만 세션정보를 주고받도록 처리할지여부
      maxAge: 1000 * 60 * 60, //1시간동안 서버세션을 유지하겠다.(1000은 1초)
    },
  })
);


// MongoDB 연결
connectDB();

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Flash Message 패키지
app.use(flash());

// 플래시 메시지를 모든 뷰에서 사용할 수 있게 설정
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// '/uploads/writer' 경로를 정적 디렉토리로 설정
app.use('/uploads/writer', express.static(path.join(__dirname, 'public/uploads/writer')));

// '/uploads/article' 경로를 정적 디렉토리로 설정
app.use('/uploads/article', express.static(path.join(__dirname, 'public/uploads/article')));

// Passport 초기화 및 세션 연결
app.use(passport.initialize());
app.use(passport.session());



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//레이아웃 설정
app.set("layout", "layout");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout extractMetas", true);
app.use(expressLayouts);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/admin", adminRouter);

// app.use('/channel', channelRouter);
app.use("/article", articleRouter);

app.use("/writer", writerRouter);

// 관리자와 OAuth 라우트를 분리하여 관리
app.use("/auth", authRouter); // OAuth 관련 라우터

// app.use('/message', messageRouter);

// 정적 파일 제공 (node_modules 포함)
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use('/api/article', apiarticleRouter);
app.use('/api/writer', apiwriterRouter);

app.use('/chatRoom', chatRoomRouter);
app.use('/messages', messageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;

