import { getUser } from "../../db/auth/LoginDao.js";
import pool from "../../config/database.js";

export const getInfo = async (req, res) => {
  //params
  const user_id = req.id;

  const conn = await pool.getConnection();

  //DB
  const result = await getUser(conn, user_id);

  conn.release();

  res.status(200).send({
    success: true,
    msg: result,
  });
};

export default getInfo;
