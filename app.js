import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/routes/index.js";

const app = express();

app.use(cors({
    origin: ["http://localhost:3000" ], // 접근 권한을 부여하는 도메인들의 배열
    credentials: true,
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}));

app.use(
    cors({
        exposedHeaders: ['Authorization'],
    }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.use(express.json({
    limit : '50mb'
}));

const SERVER_HOST = process.env.SERVER_HOST;

app.listen(3000, '0.0.0.0', () => {
    console.log(`✅ Server running at http://localhost:${SERVER_HOST} 🚀`);
});


export default app;