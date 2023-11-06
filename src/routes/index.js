import express from "express";
import authRouter from "../routes/auth.js";
import scheduleRouter from "../routes/schedule.js";
import groupRouter from "../routes/group.js";

//라우터 객체 생성
const router = express.Router();

//api/user 시작하는 모든 요청을 authRouter로 전달
//router.use("/api/user", authRouter);
router.use("/api/user", authRouter);

router.use("/api/schedule", scheduleRouter);

router.use("/api/group", groupRouter);

export default router;
