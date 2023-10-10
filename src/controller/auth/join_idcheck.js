import pool from "../../config/database.js"; //데베 연결 가져오기
import { check_userid } from "../../db/auth/signDao.js";

export const join_idcheck = async (req, res) => {
  const { user_id } = req.body; //HTTP 요청의 body에서 값을 추출하여 user_id 변수에 저장
  console.log("입력 아이디: " + user_id);
  try {
    const conn = await pool.getConnection(); //데베 연결

    // user_id로 db에서 해당 유저 정보를 가져와서 user에 저장
    const user = await check_userid(conn, user_id);

    console.log(user); //디버깅1

    if (!user) {
      // user_id에 해당하는 유저가 존재하지 않는 경우
      return res.status(200).json({
        ok: true,
        message: "아이디 사용 가능",
      });
    } else {
      return res.status(409).json({
        ok: false,
        message: "아이디가 이미 존재",
      });
    }

    conn.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

export default join_idcheck;
