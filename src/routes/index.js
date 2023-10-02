import express from "express";
import authRouter from "../routes/auth.js"

const router = express.Router();

//auth 
router.use('/api/user', authRouter);

export default router;