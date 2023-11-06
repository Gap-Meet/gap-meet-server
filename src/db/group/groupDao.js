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
