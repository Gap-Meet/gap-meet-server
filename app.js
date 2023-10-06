import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/routes/index.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: ["http://localhost:3000" ], // 접근 권한을 부여하는 도메인들의 배열
    credentials: true,
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}));

app.use(
    //서버의 응답 헤더 중에서 클라이언트에게 노출할 헤더를 설정
    /*
        인증 헤더 노출 : 
            주로 "Authorization" 헤더와 같은 인증 정보를 노출
            이 헤더는 일반적으로 클라이언트가 서버에 로그인하고 인증 토큰을 서버로 전달하는 데 사용.
            이 헤더를 노출시키지 않으면 클라이언트가 해당 정보에 접근할 수 없으므로, 필요한 경우 이 헤더를 노출시켜야함
    */
    cors({exposedHeaders: ['Authorization']})
);

app.use(bodyParser.urlencoded({ extended: false })); //url-encoded 데이터에서 중첩된 객체 파싱 비활성화
app.use(bodyParser.json());  //JSON 데이터 파싱

//루트 경로(/)로 들어오는 모든 요청을 router 객체를 통해 처리
app.use('/', router);

// 클라이언트가 보내는 JSON 데이터의 크기를 제한
app.use(express.json({
    limit : '50mb'
}));

//서버 연결 포트 환경변수 불러오기 및 변수에 저장 
const SERVER_HOST = process.env.SERVER_HOST;

//리스닝 하고 있는 3000번 포트로 로컬 서버 연결
app.listen(3000, '0.0.0.0', () => {
    console.log(`@@ http://localhost:${SERVER_HOST}에서 서버 실행 중 ...@@`);
});



export default app;