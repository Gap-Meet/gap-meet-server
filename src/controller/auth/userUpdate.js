import { updateUser } from "../../db/auth/LoginDao.js";
import pool from "../../config/database.js";
import multer from "multer";
import storage from "../../utils/storage.js";

export const update = async (req, res) => {
  //params
  const user_id = req.id;
  const path = req.file.path;
  const profile_image_path = path.replace(/\\/g, "/");
  const { email, password, username, nickname } = req.body;

  const conn = await pool.getConnection();
  const params = [
    email,
    password,
    username,
    profile_image_path,
    nickname,
    user_id,
  ];

  //DB
  const result = await updateUser(conn, params);

  conn.release();

  res.status(200).send({
    success: true,
    msg: "사용자 정보 수정 완료",
  });
};

export default update;
