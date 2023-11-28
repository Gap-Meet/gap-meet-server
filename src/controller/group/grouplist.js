//user_id가 참여하고 있는 모임의 group_name을 추출해서 전달
import { get_group_list } from "../../db/group/groupDao.js";
import pool from "../../config/database.js";

export const group_list = async (req, res) => {
  //params
  const conn = await pool.getConnection();
  const user_id = req.user_id;

  console.log(user_id);

  //DB
  const [myGroup] = await get_group_list(conn, user_id);
  console.log(myGroup);

  conn.release();

  //그룹 목록
  res.status(200).json(myGroup);
};

export default group_list;
