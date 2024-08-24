const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user'); // User 모델 불러오기

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
  async (accessToken, refreshToken, profile, done) => {
    try {
        const newUser = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
        };

        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            return done(null, user);
        } else {
            user = await User.create(newUser);
            return done(null, user);
        }
    } catch (err) {
        console.error(err);
        return done(err, null);
    }
  }
));

// 사용자 정보를 세션에 저장
passport.serializeUser(function(user, done) {
  done(null, user);
});

// 세션에서 사용자 정보를 가져옴
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;