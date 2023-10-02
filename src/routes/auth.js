import express from "express";
import join from "../controller/auth/join.js"
export const router = express.Router();


//POST /api/user/login

//POST /api/user/join
router.post('/join', join);

export default router;