const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// 환경 변수에서 클라이언트 ID, 클라이언트 비밀을 가져옵니다.
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
  },
  // 사용자 정보를 저장하거나 가져오는 로직
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

// 사용자 정보를 세션에 저장
passport.serializeUser(function(user, done) {
  done(null, user);
});

// 세션에서 사용자 정보를 가져옴
passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;