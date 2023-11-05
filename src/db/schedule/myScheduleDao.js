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
