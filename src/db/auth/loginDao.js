//로그인시 입력한 user_id로 유저정보 추출
export const check_user = async (conn, user_id) => {
  const finduser = `SELECT * FROM users WHERE user_id = ?;`;
  const [user] = await conn.query(finduser, user_id); //쿼리 결과의 첫 번째 행의 데이터만을 추출
  return [user][0][0]; //다차원 배열에서 순수 데이터만 뽑아내기
};

export const deleteUser = async (conn, params) => {
  try {
    const userDelete = `
        DELETE FROM users WHERE user_id = ?
    `;

    const result = await conn.query(userDelete, [user_id]);

    return result;
  } catch (error) {
    throw new Error("사용자 삭제 중 오류가 발생했습니다: " + error.message);
  }
};

export const updateUser = async (conn, params) => {
  console.log(params);

  const userUpdate = `
      UPDATE users
      SET email = ?, password = ?, username = ?, nickname = ?, profile_image_path = ?,
      WHERE user_id = ?;
  `;

  const [updatedUser] = await conn.query(userUpdate, params);

  return [updatedUser];
};

export const getUser = async (conn, params) => {
  const getUser = `
      select * FROM users WHERE user_id = ?
  `;

  const userInfo = await conn.query(getUser, [user_id]);

  if (userInfo.length > 0) return userInfo;
  else return -1;

  return result;
};
