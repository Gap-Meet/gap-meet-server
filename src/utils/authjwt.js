import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { redisClient } from "./cache.js"
import { promisify } from "util";

dotenv.config();
const secret = process.env.JWT_SECRET;

//access 토큰 발급
export const sign = (user) => {
  
  //payload 발급
  const payload = {
    user_id: user.user_id
  };

  //access token 발급
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '30m',
    issuer: 'gapmeet',
  });
};


//access 토큰 검증 부분
export const verify = (token) => {
  let decoded = null;

  try {
    //검증
    decoded = jwt.verify(token, secret);
    console.log(decoded);  //디버깅

    const user_id = decoded.user_id;
    console.log(user_id);  //디버깅
    console.log("에러는 안남..."); //디버깅
    return user_id;

  } catch (err) {
    console.error('토큰 해독 오류:', err);
    
    return {
      ok: false,
      message: err.message,
    };
  }
};





//refresh 토큰 발급
export const refresh = () => {
  return jwt.sign({}, secret, {
    algorithm: 'HS256',
    expiresIn: '30m',
    issuer: 'pitapet',
  });
};

//refresh 토큰 검증
export const refreshVerify = async (token, email) => {
  const getAsync = promisify(redisClient.get).bind(redisClient);
  try {
    //refresh 토큰 가져오기
    const data = await getAsync(email);

    //검증
    if (token === data) {
      jwt.verify(token, secret);
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
      };
    }

    //에러처리
  } catch (err) {
    return {
      ok: false,
    };
  }
};
