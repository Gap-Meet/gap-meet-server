import { updateUser } from "../../db/auth/LoginDao.js";
import pool from "../../config/database.js";

export const update = async (req, res) => {
  //params
  const user_id = req.id;
  const { password } = req.body;

  const conn = await pool.getConnection();
  const params = [password, nickname];

  //DB
  const result = await updateUser(conn, params);

  conn.release();

  res.status(200).send({
    success: true,
    msg: "사용자 정보 수정 완료",
  });
};

export default update;
