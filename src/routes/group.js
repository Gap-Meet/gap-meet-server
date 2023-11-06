import express from "express";

// 각 API 엔드포인트에 대한 컨트롤러 함수 import(해당 엔드포인트에 대한 요청을 처리)
import groupcreate from "../controller/group/groupCreate.js";
import group_namecheck from "../controller/group/group_namecheck.js";
//import { verifyJWT } from "../middlewares/tokenverify.js";

export const groupRouter = express.Router();

/*
    /api/group 경로의 요청을 처리하는 라우터를 정의
    API 엔드포인트를 설정
*/

//POST /api/group/groupcreate
groupRouter.post("/groupcreate", groupcreate);

//GET /api/group/group_namecheck
groupRouter.get("/group_namecheck", group_namecheck);

export default groupRouter;