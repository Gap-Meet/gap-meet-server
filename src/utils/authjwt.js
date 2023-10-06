import dotenv from "dotenv"; //.env 파일에서 환경 변수 로드
import jwt from "jsonwebtoken"; //JSON Web Tokens(JWT)를 다루는 라이브러리 "jsonwebtoken" 가져오기
import { redisClient } from "./cache.js"; //redisClient 객체 가져오기
import { promisify } from "util";

dotenv.config(); //.env 파일의 환경 변수가 현재 프로세스의 환경 변수(process.env)로 로드
const jwtSecret = process.env.JWT_SECRET; //환경 변수인 JWT_SECRET 값을 가져와서 jwtSecret 변수에 할당
//JWT를 서명하는 데 사용되는 비밀 키

/*   JWT 사용하여 액세스 토큰(Access token)생성 및 반환   */
export const sign = (user) => {
  //payload(토큰에 포함될 정보)
  const payload = {
    user_id: user.user_id,
  };
  return jwt.sign(payload, jwtSecret, {
    algorithm: "HS256", //JWT의 서명 알고리즘
    expiresIn: "10m", //토큰 만료 시간
    issuer: "gapmeet", //토큰 발급자
  });
};

/*  Access token 유효성 검증   */
export const verify = (token) => {
  let decoded = null;
  try {
    //검증
    decoded = jwt.verify(token, jwtSecret); //토큰을 서명한 비밀 키(jwtSecret)사용하여 검증
    // console.log(decoded);  //디버깅

    const user_id = decoded.user_id;
    // console.log(user_id);  //디버깅
    return user_id; //유효한 경우 해당 토큰에서 추출한 사용자 식별자(user_id)반환
  } catch (err) {
    //토큰이 유효하지 않거나 검증에 실패한 경우
    console.error("Access toketn 검증 실패:", err);
    return {
      ok: false, // 함수의 성공 또는 실패 상태
      message: err.message, // 오류에 대한 설명 또는 메시지
    };
  }
};

/* ----------------------------------------------------- */

/*   refresh 토큰 발급   */
export const refresh = () => {
  return jwt.sign({}, jwtSecret, {
    algorithm: "HS256",
    expiresIn: "30m",
    issuer: "gapmeet",
  });
};

/*   refresh 토큰 검증   */
export const refreshVerify = async (token, email) => {
  const getAsync = promisify(redisClient.get).bind(redisClient);
  try {
    //refresh 토큰 가져오기
    const data = await getAsync(email);

    //검증
    if (token === data) {
      jwt.verify(token, jwtSecret);
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
