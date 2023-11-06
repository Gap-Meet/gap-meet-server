//시간표 추가
export const insert_schedule = async (conn, params) => {
  const scheduleInsert = `
        INSERT INTO timetable (user_id, day_of_week, start_time, end_time) 
        VALUES (?,?,?,?)
    `;

  //업데이트된 시간표 전달
  const [newSchedule] = await conn.query(scheduleInsert, user_id);

  return [newSchedule];
};

//시간표 추출
export const extract_schedule = async (conn, user_id) => {
  const scheduleExtract = `SELECT day_of_week, start_time, end_time FROM timetable where user_id=?;`;

  //업데이트된 시간표 전달
  const [mySchedule] = await conn.query(scheduleExtract, user_id);
  //console.log("디버깅중 : ", [mySchedule]);

  return [mySchedule];
};
