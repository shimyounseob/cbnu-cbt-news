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

// 요청 인터셉터 추가
instance.interceptors.request.use(
    async (config) => {
        // 요청이 보내지기 전에 호출됨
        // 로컬 스토리지에서 액세스 토큰을 가져와 요청 헤더에 추가함
        let accessToken = localStorage.getItem('accessToken');
        
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
    (response) => {
        // 응답이 성공적으로 도착하면 그대로 반환
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // 401 오류가 발생하고, 요청이 재시도된 적이 없다면
        if (error.response.status === 401 && !originalRequest._retry) { 
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                try {
                    // 리프레시 토큰을 사용하여 새로운 액세스 토큰을 요청함
                    const { data } = await instance.post('/auth/refresh-token', { refreshToken });
                    
                    // 새로운 액세스 토큰을 로컬 스토리지에 저장
                    localStorage.setItem('accessToken', data.accessToken);

                    // 원래의 요청에 새로운 액세스 토큰을 추가하여 다시 요청함
                    originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                    return instance(originalRequest);
                } catch (err) {
                    console.error('Failed to refresh token:', err);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
