//로그인시 입력한 user_id로 유저정보 추출
export const check_user = async (conn, user_id) => {
  const finduser = `SELECT * FROM users WHERE user_id = ?;`;
  const [user] = await conn.query(finduser, user_id); //쿼리 결과의 첫 번째 행의 데이터만을 추출
  return [user][0][0]; //다차원 배열에서 순수 데이터만 뽑아내기
};
