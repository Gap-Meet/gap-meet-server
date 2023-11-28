//그룹 생성
export const create_group = async (conn, params) => {
  const groupcreate = `
          INSERT INTO meetgroups (group_name, groupcode, manager_user_id) 
          VALUES (?,?,?)
      `;

  //업데이트된 시간표 전달
  const [newgroup] = await conn.query(groupcreate, params);

  return [newgroup];
};

//그룹 이름 중복 확인
export const check_groupname = async (conn, group_name) => {
  const checkGroupname_query = `SELECT group_name FROM meetgroups WHERE group_name=?;`;

  const [alreadyGroupname] = await conn.query(checkGroupname_query, group_name);
  if (alreadyGroupname.length > 0) return alreadyGroupname[0].group_name;
  else return -1;
};

//get_group_list
export const get_group_list = async (conn, params) => {
  const groupListQuery = `
      SELECT group_name
      FROM meetgroups
      INNER JOIN group_user ON meetgroups.group_id = group_user.group_id
      WHERE group_user.user_id = ?;
    `;

  const [group] = await conn.query(groupListQuery, params);

  return [group];
};

//get_group_role
export const get_group_role = async (conn, params) => {
  const checkRoleQuery = `
    SELECT group_name
    FROM meetgroups
    INNER JOIN group_user ON meetgroups.group_id = group_user.group_id
    WHERE group_user.user_id = ?;
  `;

  const [manager_id] = await conn.query(checkRoleQuery, params);

  return [manager_id];
};

//group_id 추출
export const find_groupid = async (conn, group_name) => {
  const findGroupID_query = `SELECT group_id FROM meetgroups WHERE group_name=?;`;

  const [result] = await conn.query(findGroupID_query, group_name);
  // 만약 result가 배열이고 길이가 1 이상이라면 첫 번째 요소에서 group_id를 추출
  const groupID = result.length > 0 ? result[0].group_id : null;
  return [groupID];
};

//groupuser 추출
export const find_groupuser = async (conn, groupID) => {
  const findGroupuser_query = `SELECT user_id FROM group_user WHERE group_id=?;`;

  const [result2] = await conn.query(findGroupuser_query, groupID);
  // 만약 result가 배열이고 길이가 1 이상이라면 모든 user_id를 추출
  const userIDs = result2.length > 0 ? result2.map((item) => item.user_id) : [];

  return userIDs;
};

// 그룹 이름 추출해서 전달
export const extract_groupname = async (conn, user_id) => {
  try {
    // 1. 유저가 참여하고 있는 모든 그룹의 group_id를 가져옴
    const extractGroupId_query = `SELECT group_id FROM group_user WHERE user_id=?;`;
    const [groupIDs] = await conn.query(extractGroupId_query, user_id);

    if (groupIDs.length > 0) {
      // 2. 각 group_id에 대응하는 group_name을 가져옴
      const extractGroupname_query = `SELECT group_name FROM meetgroups WHERE group_id IN (?);`;
      const [groupNames] = await conn.query(extractGroupname_query, [
        groupIDs.map((group) => group.group_id),
      ]);

      return groupNames;
    } else {
      // 유저가 참여하고 있는 group이 없는 경우
      return []; // 빈 배열을 반환
    }
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

//사용자와 그룹을 매칭해서 저장 (INSERT)
//group_users
export const add_group_users = async (conn, group_name, user_id, ismanager) => {
  const addusergroup = `
          INSERT INTO group_users (group_name, user_id, ismanager) 
          VALUES (?,?,?)
      `;

  //업데이트된 시간표 전달
  const [newgroup] = await conn.query(
    addusergroup,
    group_name,
    user_id,
    ismanager
  );

  return [newgroup];
};

//그룹 생성
export const addUserToGroups = async (conn, params) => {
  const addUser = `
          INSERT INTO group_user (group_id, user_id) 
          VALUES (?,?)
  `;

  const [newUser] = await conn.query(addUser, params);

  return [newUser];
};

//그룹 이름 중복 확인
export const getGroupId = async (conn, group_name) => {
  const getGroupIdQuery = `SELECT group_id FROM meetgroups WHERE group_name=?;`;

  const [myGroupId] = await conn.query(getGroupIdQuery, group_name);

  return myGroupId;
};
