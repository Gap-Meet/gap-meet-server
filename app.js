import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/routes/index.js";

dotenv.config();
const app = express();

// CORS 미들웨어 적용
// 특정 도메인을 허용하도록 CORS 설정을 추가합니다.
const allowedOrigins = ["http://localhost:3001"]; // 허용할 도메인을 배열로 지정

app.use(
  cors({
    origin: allowedOrigins, // allowedOrigins 배열에 있는 도메인만 허용
    credentials: true, // 인증 정보(쿠키 등)를 요청에 포함
    exposedHeaders: ["Authorization"], // 노출할 헤더 설정
  })
);

app.use(bodyParser.urlencoded({ extended: false })); //url-encoded 데이터에서 중첩된 객체 파싱 비활성화
app.use(bodyParser.json()); //JSON 데이터 파싱

//루트 경로(/)로 들어오는 모든 요청을 router 객체를 통해 처리
app.use("/", router);

// 클라이언트가 보내는 JSON 데이터의 크기를 제한
app.use(
  express.json({
    limit: "50mb",
  })
);

//서버 연결 포트 환경변수 불러오기 및 변수에 저장
const SERVER_HOST = process.env.SERVER_HOST;

//리스닝 하고 있는 3000번 포트로 로컬 서버 연결
app.listen(3000, "0.0.0.0", () => {
  console.log(`@@ http://localhost:${SERVER_HOST}에서 서버 실행 중 ...@@`);
});

export default app;
