
//관리자 로그인 상태 체크 미들웨어 함수
exports.isLoggined = (req, res, next) => {
    if(req.session.isLogined != undefined){
        //현재 사용자 로그인 상태이면 원래 요청했던 프로세스로 넘어간다.
        next();
    }else{
        //로그인이 안된 상태이면 로그인 페이지로 무조건 이동시킨다.
        res.redirect('/login');
    }
}

// 권한 레벨을 확인하는 미들웨어 함수
exports.checkPermission = (requiredLevel) => {
    return (req, res, next) => {
        if (req.session.loginUser && req.session.loginUser.permission_level === requiredLevel) {
            // 권한 레벨이 요구되는 레벨과 일치하면 다음 미들웨어로 진행
            next();
        } else {
            // 권한이 없는 경우 접근 불가 메시지를 보여주고 이전 페이지로 리다이렉트
            req.flash('error', '접근 불가: 허가되지 않은 권한입니다.');
            res.redirect('back'); // 이전 페이지로 리다이렉트
        }
    };
};