import express from "express";

// 각 API 엔드포인트에 대한 컨트롤러 함수 import(해당 엔드포인트에 대한 요청을 처리)
import join from "../controller/auth/join.js";
import resign from "../controller/auth/resign.js";
import login from "../controller/auth/login.js";
import update from "../controller/auth/userUpdate.js";
import { verifyJWT } from "../middlewares/tokenverify.js";
export const router = express.Router();

/*
    /api/user 경로의 요청을 처리하는 라우터를 정의
    API 엔드포인트를 설정
*/

//POST /api/user/login
router.post("/login", login);

//POST /api/user/join
router.post("/join", join);

//DELETE /api/user/resign
router.delete("/resign", verifyJWT, resign);

//PUT /api/user/update
router.put("/update/", verifyJWT, update);

export default router;
