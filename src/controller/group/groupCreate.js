import { create_group } from "../../db/group/groupDao.js"; //그룹 생성 함수 : create_group
import { addUserToGroups } from "../../db/group/groupDao.js";
import { find_groupid } from "../../db/group/groupDao.js";
import pool from "../../config/database.js";

export const groupcreate = async (req, res) => {
  const { group_name, groupcode } = req.body; //req 데이터 가져오기
  //const manager_user_id = req.user_id;
  const manager_user_id = req.user_id;
  console.log("모임이름 : " + group_name);
  console.log("비밀코드 : " + groupcode);
  console.log("매니저아이디 : " + manager_user_id);

  const params = [group_name, groupcode, manager_user_id];

  //params
  const conn = await pool.getConnection();

  //DB _ meetgroup 에 그룹 추가
  const [newgroup] = await create_group(conn, params);

  //DB _ group_users 에 사용자의 그룹 추가
  //그룹아이디 찾기
  //나중에 그룹 목록 리스트 정보 전달할떄 사용해야 하기 때문
  const group_id = await find_groupid(conn, group_name);
  console.log("추출한 그룹아이디 : " + group_id);
  const params2 = [group_id, manager_user_id];
  const newUser = await addUserToGroups(conn, params2);
  console.log(newUser);

  conn.release();

  res.status(200).send({
    success: true,
    msg: "그룹 생성 완료",
  });
};

export default groupcreate;
