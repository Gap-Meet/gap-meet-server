// groupDao.js 파일
// create_group 함수 정의
export const create_group = async (conn, params) => {
  try {
    const query = 'INSERT INTO meetgroup (group_name, groupcode, manager_user_id) VALUES (?, ?, ?)';
    const [result] = await conn.query(query, params);
    return result;
  } catch (error) {
    throw error;
  }
};

// 사용자 ID 목록을 데이터베이스에서 조회하는 함수 (예시로 만든 것이므로 실제로는 사용자 목록을 가져오는 로직을 추가해야 합니다)
const getUserIDsFromDatabase = async () => {
  // 여기에서 데이터베이스에서 사용자 ID 목록을 가져오는 로직을 추가
  // 예를 들어, MySQL을 사용한다면 사용자 ID 목록을 조회하는 쿼리를 실행
  // const query = 'SELECT user_id FROM users';
  // const [rows] = await pool.query(query);
  // return rows.map(row => row.user_id);

  // 여기에서는 예시로 더미 데이터를 반환
  return ['Person1', 'Person2', 'Person3', 'Person4'];
};

// groupController.js 파일
import { create_group } from "../../db/group/groupDao.js";
import pool from "../../config/database.js";

export const groupcreate = async (req, res) => {
  console.log(req.body.user_id);

  const { group_name, groupcode } = req.body;
  const manager_user_id = req.body.user_id;

  const params = [group_name, groupcode, manager_user_id];

  const conn = await pool.getConnection();

  try {
    // DB에 그룹 추가
    await create_group(conn, params);

    // DB에 group_users에 사용자의 그룹 추가 (이 부분은 나중에 필요하다면 추가)

    res.status(200).send({
      success: true,
      msg: "그룹 생성 완료",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      msg: "그룹 생성 중 오류 발생",
    });
  } finally {
    conn.release();
  }
};

export default groupcreate;
