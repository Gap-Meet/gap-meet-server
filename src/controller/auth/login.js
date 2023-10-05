import pool from "../../config/database.js";
import bcrypt from 'bcrypt';
import { sign } from '../../utils/authjwt.js';
import { auth_user } from '../../db/auth/loginDao.js';

export const login = async (req, res) => {
    const { user_id, password } = req.body;

    console.log(user_id);  //디버깅1

    try {
        const conn = await pool.getConnection();

        // 사용자명으로 데이터베이스에서 사용자 정보를 가져옵니다.
        const user = await auth_user(conn, user_id);

        console.log(user); //디버깅1

        if (!user) {
            // 사용자가 존재하지 않는 경우
            return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
        }
        console.log(user[0][0].password);

        // 비밀번호를 비교하여 일치하는지 확인합니다.
        const match = await bcrypt.compare(password, user[0][0].password);

        if (!match) {
            // 비밀번호가 일치하지 않는 경우
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        // JWT 토큰을 생성하여 응답합니다.
        const token = sign(user[0][0]);
        console.log("토큰은 " + token); //
        res.json({ token });

        conn.release();

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

export default login;
