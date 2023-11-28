//시간표 추가
export const insert_schedule = async (conn, params) => {
  const scheduleInsert = `
        INSERT INTO timetable (user_id, day_of_week, start_time, end_time) 
        VALUES (?,?,?,?)
    `;

  //업데이트된 시간표 전달
  const [newSchedule] = await conn.query(scheduleInsert, params);

  return [newSchedule];
};

//시간표 추출
export const extract_schedule = async (conn, user_id) => {
  const scheduleExtract = `SELECT day_of_week, start_time, end_time FROM timetable where user_id=?;`;

  //업데이트된 시간표 전달
  const [result] = await conn.query(scheduleExtract, user_id);
  //console.log("디버깅중 : ", [mySchedule]);

  // 만약 result가 배열이고 길이가 1 이상이라면 모든 시간표를 추출
  const mySchedules = result.length > 0 ? result.map((item) => item) : [];

  return mySchedules;
};
