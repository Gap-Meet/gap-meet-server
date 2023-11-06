import pool from "../../config/database.js"; //데베 연결 가져오기
import { check_groupname } from "../../db/group/groupDao.js";

export const group_namecheck = async (req, res) => {
  const { group_name } = req.body; //HTTP 요청의 body에서 값을 추출하여 group_name 변수에 저장
  console.log("입력한 그룹 이름: " + group_name); //디버깅
  try {
    const conn = await pool.getConnection(); //데베 연결

    // user_id로 db에서 해당 유저 정보를 가져와서 user에 저장
    const isgroup = await check_groupname(conn, group_name);

    //console.log("그룹 존재성 : " + isgroup); //디버깅1

    if (isgroup.length > 0) {
      console.log("동일한 그룹 이름 이미 존재");
      return res.status(409).json({
        ok: false,
        message: "동일한 그룹 이름 이미 존재",
      });
    } else {
      // groupname에 입력한 이름이 존재하지 않는 경우
      console.log("그룹 이름 사용 가능");
      return res.status(200).json({
        ok: true,
        message: "그룹 이름 사용 가능",
      });
    }

    conn.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

export default group_namecheck;
