const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google 로그인 요청 라우트
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google 로그인 콜백 라우트
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // 로그인 성공 후 프론트엔드로 리디렉션
    res.redirect('http://localhost:3000');
  }
);

// 로그인 상태 확인 엔드포인트
router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        // 사용자가 로그인된 경우
        const userData = { loggedIn: true, user: req.user };
        console.log("Logged In: ", userData);
        res.json(userData);
    } else {
        // 사용자가 로그인되지 않은 경우
        const userData = { loggedIn: false };
        console.log("Not logged In: ", userData);
        res.json(userData);
    }
});

// 로그아웃 처리 라우트
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { 
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Session destruction failed' });
      }
      res.clearCookie('connect.sid'); // 세션 쿠키 삭제
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

module.exports = router;