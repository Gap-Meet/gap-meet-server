import pool from "../../config/database.js";
import bcrypt from "bcrypt";
import { set } from "../../utils/cache.js";
import { sign, refresh } from "../../utils/authjwt.js";
import { insert_user } from "../../db/auth/signDao.js";

export const join = async (req, res) => {
  //params
  let { user_id, password, email, username } = req.body;
  let params = [];

  try {
    const conn = await pool.getConnection();

    //비밀번호 암호화
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;

    //유저 정보 DB에 저장
    params = [user_id, email, password, username];
    let [newUser] = await insert_user(conn, params);
    console.log([newUser]);

    conn.release();

    //토큰 발급
    const AccessToken = sign(newUser[0]);
    const RefreshToken = refresh(newUser);

    //refresh 토큰 redis에 저장
    set(newUser[0].user_id, RefreshToken);

    //respond
    res.status(200).send({
      ok: true,
      AccessToken: AccessToken,
      RefreshToken: RefreshToken,
    });
  } catch (err) {
    //에러 처리
    res.status(404).send({
      ok: false,
      msg: err.message,
    });
  }
};

export default join;
