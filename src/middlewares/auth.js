import { verify } from "../utils/authjwt.js";
import dotenv from 'dotenv';
dotenv.config();

export const authJWT = (req, res, next) => {
    //헤더 처리
    if (req.headers.authorization) {

        const token = req.headers.authorization.split('Bearer ')[1];
        console.log(token);
        console.log(req.body);

        //토큰 채굴
        const result = verify(token);
        req.id = result;

        console.log("result", result);

        next();


        // if (result.ok) {
        //     req.id = result.user_id;
        //     console.log("req.id", result);
        //     next();
        // } else {
        //     res.status(401).send({
        //         ok: false,
        //         message: result.message,
        //     });
        // }
    } else {
        res.status(401).send({
            ok: false,
            message: " 로그인 수행이 필요합니다. "
        });
    }
};