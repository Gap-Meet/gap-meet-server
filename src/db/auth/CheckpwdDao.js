//현재입력한 password와 데베에 입력한 비밀번호 확인
//여기서 user_id는 토큰으로 찾아서 넣어줘야 함
export const check_pwd = async (conn, user_id) => {
  const finduser = `SELECT * FROM users WHERE user_id = ?;`;
  const [user] = await conn.query(finduser, user_id); //쿼리 결과의 첫 번째 행의 데이터만을 추출
  const db_password = [user][0][0].password; //다차원 배열에서 순수 데이터중 비밀번호 뽑아내기

  return db_password;
};
