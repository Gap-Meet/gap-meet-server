import express from "express";
import join from "../controller/auth/join.js"
import resign from "../controller/auth/resign.js"
import login from "../controller/auth/login.js"

export const router = express.Router();


//POST /api/user/login
router.post('/login', login);

//POST /api/user/join
router.post('/join', join);

//POST /api/user/resign
router.post('/resign', resign);

export default router;