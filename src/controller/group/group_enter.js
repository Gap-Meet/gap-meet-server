//모임목록에서 선택해서 그룹 들어감
//방장인지 팀원인지 구별해야함
import { get_group_role } from "../../db/group/groupDao.js";
import { get_group_list } from "../../db/group/groupDao.js";
import pool from "../../config/database.js";

export const group_role = async (req, res) => {
  //params
  const conn = await pool.getConnection();
  const { group_name } = req.body; //HTTP 요청의 body에서 값을 추출하여 group_name 변수에 저장
  const user_id = req.user_id;

  const params = [group_name, user_id];

  console.log("user_id: ", user_id);
  console.log("group_name: ", group_name);

  //DB
  const [manager_id] = await get_group_role(conn, params);

  //    console.log(manager_id);
  console.log("manager_id: ", manager_id[0].manager_user_id);

  let myRole = "";

  if (manager_id[0].manager_user_id == user_id) {
    myRole = "방장";
  } else {
    myRole = "팀원";
  }

  conn.release();

  //그룹 목록
  res.status(200).json(myRole);
};

export default group_role;
