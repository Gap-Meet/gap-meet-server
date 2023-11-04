export const insert_schedule = async (conn, params) => {
    const scheduleInsert = `
        INSERT INTO timetable (user_id, day_of_week, start_time, end_time) 
        VALUES (?,?,?,?)
    `;

    const [newSchedule] = await conn.query(scheduleInsert, params);

    return [newSchedule];
};
