import { deleteUser } from "../../db/auth/loginDao.js";
import pool from "../../config/database.js";

export const deleteData = async(req, res) => {

    //params
    const conn = await pool.getConnection();
    const user_id = req.id;

    //DB
    const result = await deleteUser(conn, user_id);
    console.log(result);

    conn.release();
    res.status(200).send({
        success: true,
        msg: "유저 삭제 완료",
    });

}

export default deleteData;