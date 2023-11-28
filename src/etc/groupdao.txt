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

//그룹 이름 추출해서 전달
export const extract_groupname = async (
  conn,
  manager_user_id,
  participant_user_id
) => {
  const extractGroupname_query = `SELECT group_name FROM meetgroups WHERE manager_user_id=? OR participant_user_id=?;`;

  const [groupList] = await conn.query(
    extractGroupname_query,
    manager_user_id,
    participant_user_id
  );
  if (groupList.length > 0) {
    //유저가 참여하고 있는 group이 있는경우
    return groupList[0].group_name;
  } else {
    //유저가 참여하고 있는 group이 없는 경우
    return -1;
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
