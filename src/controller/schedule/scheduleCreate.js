import { insert_schedule } from "../../db/schedule/myScheduleDao.js"; //스케쥴 추가 함수 : insert_schedule
import pool from "../../config/database.js";

export const create = async (req, res) => {
  const { day_of_week, start_time, end_time } = req.body; //req 데이터 가져오기
  const user_id = req.user_id;
  const params = [user_id, day_of_week, start_time, end_time];

  //params
  const conn = await pool.getConnection();

  //DB에 스케줄 삽입
  const [mySchedule] = await insert_schedule(conn, params);

  conn.release();

  res.status(200).send({
    success: true,
    msg: "시간표 추가 완료",
  });
};

export default create;
