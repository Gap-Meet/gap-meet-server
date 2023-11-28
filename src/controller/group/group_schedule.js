//모임일정 잡아주기
//요청시 groupname보내기
//groupname으로 group_id찾기
//group_user 테이블에서 group_id를 가지는 user_id들 추출
//timetable 테이블에서 user_id의 시간표 다 추출
//해당 시간표를 가지고 모임 일정 잡기
import { find_groupid } from "../../db/group/groupDao.js"; //모임의 그룹아이디 추출
import { find_groupuser } from "../../db/group/groupDao.js"; //모임의 유저아이디 추출
import { extract_schedule } from "../../db/schedule/myScheduleDao.js"; //유저별 스케쥴 추출
import pool from "../../config/database.js";

export const setschedule = async (req, res) => {
  //프론트 요청에서 데이터 가져오기

  const { group_name, selectedOptions } = req.query; //group_name 이랑 옵션 가져오기
  //const { group_name } = req.query; //group_name 이랑 옵션 가져오기
  console.log(group_name);

  const conn = await pool.getConnection(); //데베 연결

  // 사용자 ID 목록을 동적으로 가져와서 저장
  // 1. meetgroup 테이블에서 group_name에 해당하는 group_id 추출
  // 2. group_user 테이블에서 group_id에 해당하는 user_id 추출
  const groupID = await find_groupid(conn, group_name);
  console.log("그룹아이디 : " + groupID);
  const userIDs = await find_groupuser(conn, groupID);
  console.log("그룹내유저아이디 : " + userIDs);

  // 사용자들의 시간표를 저장할 객체
  const schedules = {};
  let i = 1;
  // 각 사용자의 시간표를 가져와서 schedules 객체에 저장
  for (const user_id of userIDs) {
    //user_id for문 돌리기(여러명이니까)
    console.log(i + "번째 유저 아이디 : " + user_id);
    schedules[user_id] = await extract_schedule(conn, user_id); //timetable에서 해당하는 user_id의 시간표 추출해서 저장
    //console.log(i + "번째 유저의 시간표 : " + schedules[user_id]);
    i++;
  }

  //모임 일정 알고리즘 수행 - ./utils/scheduleAlgorithm 함수 불러오기
  // schedules 객체 출력 (테스트용)
  console.log(schedulesz);
  // scheduleAlgorithm(schedule, options);

  return schedules;
};

export default setschedule;
