//user_id가 참여하고 있는 모임의 group_name을 추출해서 전달
//get 요청 들어옴
import pool from "../../config/database.js"; //데베 연결 가져오기
import { extract_groupname } from "../../db/group/groupDao.js";

export const group_namecheck = async (req, res) => {
  const { user_id } = req.body; //HTTP 요청의 body에서 값을 추출하여 group_name 변수에 저장
  const manager_user_id = user_id;
  const participant_user_id = user_id;
  console.log("유저아이디:" + user_id);
  console.log("조건1 : " + manager_user_id);
  console.log("조건2 : " + participant_user_id);

  try {
    const conn = await pool.getConnection(); //데베 연결

    // user_id로 db에서 그룹 이름을 가져와서 groupList에 저장
    const [groupList] = await extract_groupname(
      conn,
      manager_user_id,
      participant_user_id
    );
    z;
    if (groupList.length > 0) {
      console.log(user_id + "의 그룹목록 존재"); //디버깅
      return res.status(409).json({
        ok: false,
        grouplist: [groupList],
        message: "그룹목록 존재",
      });
    } else {
      console.log(user_id + "의 그룹목록 없음"); //디버깅
      return res.status(200).json({
        ok: true,
        message: "그룹목록 없음",
      });
    }

    conn.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

export default group_namecheck;
