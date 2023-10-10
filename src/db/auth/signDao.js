//유저 이메일 중복 확인
export const check_useremail = async (conn, email) => {
  const checkUser_query = `SELECT email FROM users WHERE email=?;`;

  const [alreadyEmail] = await conn.query(checkUser_query, email);

  return [alreadyEmail][0][0];
};

//유저 아이디 중복 확인
export const check_userid = async (conn, user_id) => {
  const checkUser_query = `SELECT user_id FROM users WHERE user_id=?;`;

  const [alreadyUser_id] = await conn.query(checkUser_query, user_id);

  return [alreadyUser_id][0][0];
};

//유저 생성
export const insert_user = async (conn, params) => {
  const insertUser_query = `INSERT INTO users (user_id, email, password, username) VALUES (?,?,?,?);`;
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
