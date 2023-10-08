//유저 이메일 중복 확인
export const check_user = async (conn, email) => {
  const checkUser_query = `SELECT user_id, email,password FROM users WHERE email=?;`;

  const [alreadyUser] = await conn.query(checkUser_query, [email]);

  return [alreadyUser];
};

//유저 생성
export const insert_user = async (conn, params) => {
  const insertUser_query = `INSERT INTO users (user_id, email, password, username, profile_image_path) VALUES (?,?,?,?,?);`;
  const selectUserID_query = `SELECT user_id FROM users WHERE email = ?`;

  await conn.query(insertUser_query, params);
  const [newUser] = await conn.query(selectUserID_query, params[1]);

  return [newUser];
};

//유저 인증
export const auth_user = async (conn, email) => {
  const checkUser_query = `SELECT user_id,email,password FROM users WHERE email=?;`;

  const [user] = await conn.query(checkUser_query, [email]);

  return [user];
};
