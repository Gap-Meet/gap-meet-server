//유저 인증
export const auth_user = async (conn, user_id) => {
    const checkUser_query = `SELECT * FROM users WHERE user_id = ?;`;
    const [user] = await conn.query(checkUser_query, [user_id]);
    return [user];
};


//유저 정보 삭제
export const delete_user = async (conn, user_id) => {
    
    const deleteUser_query = `Delete from users WHERE user_id = ?;`;

    return deleteUser_query;
};


