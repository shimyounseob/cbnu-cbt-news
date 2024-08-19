import axios from 'axios';

// 기본 설정을 가진 axios 인스턴스를 생성함.
const instance = axios.create({
    baseURL: 'http://localhost:5001/api',  // Express 서버의 API URL
    timeout: 10000,  // 요청 타임아웃 시간 설정
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,  // 쿠키를 포함한 요청 허용
});

export default instance;