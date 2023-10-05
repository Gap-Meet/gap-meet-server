import pool from "../../config/database.js";
import { remove } from "../../utils/cache.js";
import { verify } from "../../utils/authjwt.js";
import { delete_user } from "../../db/auth/userDao.js"; // 사용자 삭제 함수
import { auth_user } from '../../db/auth/loginDao.js';
import bcrypt from 'bcrypt';

export const resign = async (req, res) => {
    // 요청에서 사용자 ID를 추출합니다.
    const { password } = req.body;
    const conn = await pool.getConnection();

    try {
        // req.headers.authorization로부터 토큰 추출
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1]; // 'Bearer' 토큰을 제외하고 토큰 추출
        
        console.log(token + "......."); //디버깅
        const user_id = verify(token);

        // 디버깅
        console.log(user_id + "!!!!!!!!!!!!!!!!!!!!!!!");
        
        // 사용자명으로 데이터베이스에서 사용자 정보를 가져옵니다.
        const user = await auth_user(conn, user_id);
        console.log(user[0][0].password);

        // 비밀번호를 비교하여 일치하는지 확인합니다.
        const match = await bcrypt.compare(password, user[0][0].password);

        if (!match) {
            // 비밀번호가 일치하지 않는경우
            return res.status(402).send({
                ok: false,
                msg: "비밀번호가 일치하지 않습니다."
            });
        }

        
        // 데이터베이스에서 사용자 삭제 쿼리 실행
        //await conn.query(delete_user(conn, user_id));
        await conn.query('DELETE FROM users WHERE user_id = ?', [user_id]);
        conn.release();

        // 캐시에서 리프레시 토큰을 삭제합니다.
        remove(user_id);

        // 성공 상태 코드(200)와 메시지를 응답으로 보냅니다.
        res.status(200).send({
            ok: true,
            msg: "Account deleted successfully"
        });
    } catch (err) {
        // 오류 처리 블록: 오류 메시지와 함께 오류 응답을 보냅니다.
        res.status(500).send({
            ok: false,
            msg: err.message + "ㅜㅜ"
        });
    }
};

export default resign;
