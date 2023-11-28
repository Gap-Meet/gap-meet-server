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

  const [groupID] = await conn.query(findGroupID_query, group_name);
  return [groupID];
};

//groupuser 추출
export const find_groupuser = async (conn, groupID) => {
  const findGroupuser_query = `SELECT user_id FROM group_user WHERE group_id=?;`;

  const [userID] = await conn.query(findGroupuser_query, groupID);
  return [userID];
};
