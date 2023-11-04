import express from "express";

// 각 API 엔드포인트에 대한 컨트롤러 함수 import(해당 엔드포인트에 대한 요청을 처리)
import create from "../controller/schedule/scheduleCreate.js";
import { verifyJWT } from "../middlewares/tokenverify.js";

export const router = express.Router();

/*
    /api/user 경로의 요청을 처리하는 라우터를 정의
    API 엔드포인트를 설정
*/

//POST /api/schedule/create
router.post("/create", verifyJWT, create);

export default router;
