import { create_group } from "../../db/group/groupDao.js"; //그룹 생성 함수 : create_group
import pool from "../../config/database.js";

export const groupcreate = async (req, res) => {
  console.log(req.body.user_id);

  const { group_name, groupcode } = req.body; //req 데이터 가져오기
  //const manager_user_id = req.user_id;
  const manager_user_id = req.body.user_id;

  const params = [group_name, groupcode, manager_user_id];

  //params
  const conn = await pool.getConnection();

  //DB _ meetgroup 에 그룹 추가
  const [newgroup] = await create_group(conn, params);

  //DB _ group_users 에 사용자의 그룹 추가
  //나중에 그룹 목록 리스트 정보 전달할떄 사용해야 하기 때문

  conn.release();

  res.status(200).send({
    success: true,
    msg: "그룹 생성 완료",
  });
};

export default groupcreate;
