//코드와 방이름 입력해서 모임목록에 추가하기
//방이름이 존재하는지 check <-> 존재 안하면 res(존재하지 않는 방이름)
//존재하면 코드 체크 <-> 코드 틀리면 res(코드가 일치하지 않습니다.)
//로그인 방식과 비슷

import pool from "../../config/database.js"; //데베 연결 가져오기
import { check_groupname } from "../../db/group/groupDao.js";
import { checkUser } from "../../db/group/groupDao.js";
import { getGroupCode } from "../../db/group/groupDao.js";
import { addUserToGroups } from "../../db/group/groupDao.js";
import { getGroupId } from "../../db/group/groupDao.js";

export const groupParticipation = async (req, res) => {
  const { group_name, groupcode } = req.body;
  const input_code = groupcode;
  const user_id = req.user_id;
  console.log("group_name: ", group_name);
  console.log("input_code: ", input_code);

  const conn = await pool.getConnection(); //데베 연결

  try {
    const isGroup = await check_groupname(conn, group_name);

    console.log("isGroup: ", isGroup);

    if (isGroup.length > 0) {
      const result = await getGroupCode(conn, group_name);
      const groupCode = result[0].groupcode;
      const result1 = await getGroupId(conn, groupCode);
      const group_id = result1[0].group_id;

      console.log("group_id: ", group_id);
      console.log("groupCode: ", groupCode);

      if (groupCode == input_code) {
        const params = [group_id, user_id];

        //이미 존재하는지 확인
        const isMember = await addUserToGroups(conn, params);

        if (isMember) {
          return res.status(409).json({
            ok: false,
            message: "이미 들어간 그룹입니다.",
          });
        } else {
          //그룹에 추가
          const newUser = await addUserToGroups(conn, params);

          return res.status(200).json({
            ok: true,
            message: newUser,
          });
        }
      } else {
        return res.status(409).json({
          ok: false,
          message: "코드가 일치하지 않습니다.",
        });
      }
    } else {
      return res.status(409).json({
        ok: false,
        message: "존재하지 않는 그룹입니다.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류 발생" });
  } finally {
    conn.release();
  }
};

export default groupParticipation;
