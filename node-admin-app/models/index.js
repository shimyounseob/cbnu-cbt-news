const path = require('path');
const Sequelize = require('sequelize');


//개발모드 환경설정
const env = process.env.NODE_ENV || 'development';

//DB연결 환경설정정보 변경처리//관련정보 수정
const config = require(path.join(__dirname,'..','config','config.json'))[env];

//데이터 베이스 객체
const db= {};

//DB연결정보로 시퀄라이즈 ORM 객체 생성
const sequelize = new Sequelize(config.database,config.username,config.password,config);

// 로그 비활성화
sequelize.options.logging = false;

//DB 처리 객체에 시퀄라이즈 정보 맵핑처리
//이후 DB객체를 통해 데이터 관리가능해짐
db.sequelize = sequelize; //DB연결정보를 포함한 DB제어 객체속성(CRUD)
db.Sequelize = Sequelize; //Sequelize팩키지에서 제공하는 각종 데이터 타입 및 관련 객체정보를 제공함

//관리자 모델 모듈파일 참조하고 db 동적 속성 정의하기
db.Admin = require('./admin.js')(sequelize,Sequelize);

//게시글 모델 모듈파일 참조하고 db 동적 속성 정의하기
db.Article = require('./article.js')(sequelize,Sequelize);

//게시글 첨부파일 모델 파일 참조하고 동적속성 정의하기 
db.ArticleFile = require('./article_file.js')(sequelize,Sequelize);

//기자 모델 파일 참조하고 동적속성 정의하기
db.Writer = require('./writer.js')(sequelize,Sequelize);

// 이미지 모델 파일 참조하고 동적 속성 정의하기
db.Image = require('./image.js')(sequelize,Sequelize);

// 게시글과 기자 조인 테이블(N:N 구조) 파일 참조하고 동적 속성 정의하기
db.Articlewriter = require('./articlewriter.js')(sequelize,Sequelize);

// 다대다 관계 설정
db.Article.belongsToMany(db.Writer, {
    through: db.Articlewriter,
    foreignKey: 'article_id',
    otherKey: 'writer_id',
    as: 'writer'
  });
  
  db.Writer.belongsToMany(db.Article, {
    through: db.Articlewriter,
    foreignKey: 'writer_id',
    otherKey: 'article_id',
    as: 'articles'
  });


//db객체 외부로 노출하기
module.exports = db;