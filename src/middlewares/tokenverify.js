import { verify } from "../utils/authjwt.js"; //토큰 유효성 검사 verify함수 가져오기
import dotenv from "dotenv";
dotenv.config();

export const verifyJWT = (req, res, next) => {
  //헤더 처리
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    console.log(token);
    console.log(req.body);

    //토큰 유효성 검증 ->  req.user_id 다음 핸들러로 넘겨주기
    const result = verify(token);
    req.user_id = result;

    console.log("result", result);
    next();
  } else {
    res.status(401).send({
      ok: false,
      message: "Unauthorized",
    });
  }
};
