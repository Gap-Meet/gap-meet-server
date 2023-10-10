import pool from "../../config/database.js"; //데베 연결 가져오기
import bcrypt from "bcrypt"; //비밀번호 해싱을 위한 bcrypt 모듈 가져오기
import { sign } from "../../utils/authjwt.js"; //토큰 발급 함수 'sign' 가져오기
import { check_user } from "../../db/auth/LoginDao.js"; //유저정보 추출하는 함수 'check_user' 가져오기

export const login = async (req, res) => {
  const { user_id, password } = req.body; //HTTP 요청의 body에서 값을 추출하여 각각 user_id와 password 변수에 저장
  console.log("아이디: " + user_id + "\n비밀번호: " + password);
  try {
    const conn = await pool.getConnection(); //데베 연결

    // user_id로 db에서 해당 유저 정보를 가져와서 user에 저장
    const user = await check_user(conn, user_id);

    console.log(user); //디버깅1

    if (!user) {
      // user_id에 해당하는 유저가 존재하지 않는 경우
      return res
        .status(401)
        .json({ message: "해당 아이디와 일치하는 유저 정보 없음" });
    }
    console.log(user.password); //디버깅2

    //user_id에 해당하는 유저가 존재하는지 확인이 됐으면
    //입력한 비밀번호(password)와 저장된 비밀번호를 비교하여 일치하는지 확인
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // 비밀번호가 일치하지 않는 경우
      return res.status(401).json({ message: "비밀번호 일치하지 않음" });
    }

    // 로그인 성공 시 해당 유저에 대한 access token생성
    const token = sign(user);
    res.json({ token });

    conn.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

export default login;
