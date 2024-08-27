const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");

// JWT 액세스 토큰 생성 함수
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, // JWT 페이로드: 사용자 ID 및 이메일
    process.env.JWT_SECRET,              // JWT 시크릿 키
    { expiresIn: '15m' }                 // 액세스 토큰 유효 기간: 15분
  );
};

// JWT 리프레시 토큰 생성 함수
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, // JWT 페이로드: 사용자 ID 및 이메일
    process.env.JWT_SECRET,              // JWT 시크릿 키
    { expiresIn: '7d' }                  // 리프레시 토큰 유효 기간: 7일
  );
};

// Google 로그인 요청 라우트
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google 로그인 콜백 라우트
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    //  액세스 토큰과 리프레시 토큰 생성
    const accessToken = generateAccessToken(req.user);
    const refreshToken = generateRefreshToken(req.user);
    
    // 클라이언트로 토큰 전달 (token 변수 오류 수정)
    res.redirect(`http://localhost:3000?accessToken=${accessToken}&refreshToken=${refreshToken}&googleId=${req.user.googleId}`);
  }
);

// 로그인 상태 확인 엔드포인트
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    const userData = { loggedIn: true, user: req.user };
    console.log("Logged In: ", userData);
    res.json(userData);
  } else {
    const userData = { loggedIn: false };
    console.log("Not logged In: ", userData);
    res.json(userData);
  }
});

// 액세스 토큰을 갱신하기 위한 엔드포인트
router.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;  

  if (!refreshToken) {
    return res.status(403).json({ error: 'Refresh token is required' }); 
  }

  try {
    // 리프레시 토큰을 검증하여 유효한 경우 새로운 액세스 토큰을 생성
    const user = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });  // 새로운 액세스 토큰을 클라이언트에 반환
  } catch (error) {
    res.status(403).json({ error: 'Invalid refresh token' });  
  }
});

// 로그아웃 처리 라우트
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    req.session.destroy((err) => {
      if (err)
        return res.status(500).json({ message: "Session destruction failed" });
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;
