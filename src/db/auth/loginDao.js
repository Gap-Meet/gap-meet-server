//로그인시 유저 인증 
export const auth_user = async (conn, user_id) => {
    const checkUser_query = `SELECT * FROM users WHERE user_id = ?;`;
    const [user] = await conn.query(checkUser_query, [user_id]);
    return [user];
};


