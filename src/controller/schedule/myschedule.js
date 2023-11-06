//스케쥴 전송 코드
import { extract_schedule } from "../../db/schedule/myScheduleDao.js"; //스케쥴 추출 함수 : extract_schedule
import pool from "../../config/database.js";

export const extract = async (req, res) => {
  //const { day_of_week, start_time, end_time } = req.body; //req 데이터 가져오기
  const user_id = req.body.user_id;
  //console.log("디버깅중1 : " + user_id);

  //params
  const conn = await pool.getConnection();

  //DB에 스케줄 추출
  const [mySchedule] = await extract_schedule(conn, user_id);

  conn.release();
  //console.log([mySchedule]);
  res.status(200).send({
    success: true,
    data: [mySchedule],
    msg: "시간표 전송 완료",
  });
};

export default extract;
