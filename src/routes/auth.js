import express from "express";

// 각 API 엔드포인트에 대한 컨트롤러 함수 import(해당 엔드포인트에 대한 요청을 처리)
import join from "../controller/auth/join.js";
import resign from "../controller/auth/resign.js";
import login from "../controller/auth/login.js";
import getInfo from "../controller/auth/myInfo.js";

import update from "../controller/auth/userUpdate.js";
import join_idcheck from "../controller/auth/join_idcheck.js";
import join_emailcheck from "../controller/auth/join_emailcheck.js";
import { verifyJWT } from "../middlewares/tokenverify.js";
import storage from "../utils/storage.js";
import multer from "multer";

export const authRouter = express.Router();

/*
    /api/user 경로의 요청을 처리하는 라우터를 정의
    API 엔드포인트를 설정
*/

//POST /api/user/login
authRouter.post("/login", login);

//POST /api/user/join
authRouter.post("/join", join);

//DELETE /api/user/resign
authRouter.delete("/resign", verifyJWT, resign);

//PUT /api/user/update
const upload = multer({ storage: storage }); //multer 객체 생성
authRouter.put("/update/", verifyJWT, upload.single("profile"), update);

//POST /api/user/join_idcheck
authRouter.post("/join_idcheck/", join_idcheck);

//POST /api/user/join_emailcheck
authRouter.post("/join_emailcheck/", join_emailcheck);

//GET /api/user/getInfo
authRouter.get("/getInfo/", getInfo);

export default authRouter;
