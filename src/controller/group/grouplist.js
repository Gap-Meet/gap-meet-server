//user_id가 참여하고 있는 모임의 group_name을 추출해서 전달
import { extract_groupname } from "../../db/group/groupDao.js";
import pool from "../../config/database.js";

export const group_list = async (req, res) => {
  //params
  const conn = await pool.getConnection(); //데베연결
  const user_id = req.user_id;
  console.log("유저아이디:" + user_id);

  //DB
  const myGroup = await extract_groupname(conn, user_id);

  if (myGroup && myGroup.length > 0) {
    const groupNamesString = myGroup
      .map((group) => group.group_name)
      .join(", ");
    console.log("그룹이름 : " + groupNamesString);
  } else {
    console.log("참여 중인 그룹이 없습니다.");
  }

  conn.release();

  // 그룹 목록을 응답으로 보내줄 때
  res.status(200).json({
    groups: myGroup.map((group) => group.group_name),
  });
};

export default group_list;
