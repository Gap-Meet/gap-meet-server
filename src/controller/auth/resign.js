import pool from "../../config/database.js";
import { remove } from "../../utils/cache.js";
import { verify } from "../../utils/authjwt.js";
import { check_user } from "../../db/auth/LoginDao.js";
import bcrypt from "bcrypt";

export const resign = async (req, res) => {
  const { password } = req.body; // 요청에서 유저가 입력한 password를 password 변수에 저장
  const conn = await pool.getConnection();

  try {
    // req.headers.authorization로부터 토큰 추출
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1]; // 'Bearer' 토큰을 제외하고 토큰 추출

    console.log("토큰 : " + token); //디버깅 1
    const user_id = verify(token); //토큰 검증

    console.log(user_id + "!!!!!!!!!!!!!!!!!!!!!!!"); // 디버깅 2

    // user_id로 db에서 해당 유저 정보를 가져와서 user에 저장
    const user = await check_user(conn, user_id);
    console.log(user.password);

    //user_id에 해당하는 유저가 존재하는지 확인이 됐으면
    //입력한 비밀번호(password)와 저장된 비밀번호를 비교하여 일치하는지 확인
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // 비밀번호가 일치하지 않는 경우
      return res.status(402).send({
        ok: false,
        msg: "비밀번호 틀림",
      });
    }

    // db에서 user_id에 해당하는 유저 정보 삭제하는 쿼리문 실행
    await conn.query("DELETE FROM users WHERE user_id = ?", user_id);
    conn.release(); //데베 연결 해제

    // redis cache에서 삭제된 유저의 refresh token 삭제
    remove(user_id);

    res.status(200).send({
      ok: true,
      msg: "Account deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      ok: false,
      msg: err.message + "ㅜㅜ",
    });
  }
};

export default resign;
