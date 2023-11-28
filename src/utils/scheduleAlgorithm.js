import { convertDayOfWeek } from "./convertDayOfWeek";

export const scheduleAlgorithm = (schedules, condition) => {
  //그룹에 몇 명의 사용자가 있는지?
  const peopleNum = length(schedules);

  //전체 사용자의 시간표를 합친 2차원 배열
  const totalSchedule = [];

  //2차원 배열은 행이 0 ~ 23까지 24개 필요함
  //요일은 7개이므로 0 ~ 6까지  7개 필요함
  //2차원 배열의 각 요소 0으로 초기화
  for (let i = 0; i < 24; i++) {
    totalSchedule[i] = [];
    for (let j = 0; j < 7; j++) {
      totalSchedule[i][j] = 0; // 초기값으로 0을 할당
    }
  }

  //모든 사람에 대해, 스케줄 합치기
  for (i = 0; i < peopleNum; i++) {
    //월 - 0:화 - 1:수 - 2:...로 변환 (문자열 -> 숫자 인덱스)
    const dayOfWeekToNum = convertDayOfWeek(schedules[i].day_of_week);
    const startTime = schedules[i].start_time; //시작 시간
    const end_time = schedules[i].end_time; //종료 시간

    //ex) 월요일 2시부터 5시까지 일정이 있는 경우,
    //totalSchedule[2][0]...totalSchedule[5][0]의 숫자를 1증가시킨다.
    for (j = startTime; j <= end_time; j++) {
      totalSchedule[j][dayOfWeekToNum]++;
    }
  }

  //컨디션 고려해서 시간 정해주기
  const dayOfWeek = condition.day; //[0,1,2] - 월화수 가능함
  const limit = condition.limit; //[9,15] - 9시부터 3시 사이에
  const time = condition.time; //2 - 2시간

  const result = [];

  // 모두 되는 시간 찾아주기
  for (j = 0; j < dayOfWeek.length; j++) {
    const cnt = 0; //연속으로 붙어있는 칸
    const end = 0; //종료 시간 저장

    for (i = limit[0]; i < limit[1]; i++) {
      //ex)9~15 사이에 약속을 잡아야 하는 경우 -> 9부터 14까지 본다

      if (totalSchedule[i][dayOfWeek[j]] == 0) {
        //연속되는 빈 공간이 있는 경우, cnt값 증가
        end = i; //종료 시간 업데이트
        cnt++;

        //시간이 일치하는 걸 찾은 경우 for문 탈출
        if (cnt == time) {
          newDate = { day_of_week: dayOfWeek[j], start: end - cnt, end: end };
          result.push(newDate);
          break;
        }
      } else {
        //중간에 끊기는 부분이 있으면 cnt값을 0으로 초기화
        cnt = 0;
      }
    }
  }

  // 모두 다 되는 시간이 없는 경우
  if (result.length == 0) {
    let minDayOfWeek = -1;
    let minStartTime = -1;
    let minSum = 1000;

    // ex)
    for (let j = 0; j < dayOfWeek.length; j++) {
      // 각 배열의 요소를 더한다 -> 값이 작을수록 많은 사람이 가능한 것!
      let totalSum = 0;
      let start = 0;
      let myDayOfWeek = dayOfWeek[i];

      //start idx: i, i부터 i+time 인덱스까지 배열의 값을 합하여 totalSum에 저장한다.
      for (let i = limit[0]; i < limit[1] - time; i++) {
        // time만큼 붙어있는 칸들의 값을 합쳐준다.
        for (let k = i; k <= i + time; k++) {
          totalSum += totalSchedule[k][myDayOfWeek];
          start = i;
        }

        //최소인 경우, 업데이트
        if (minSum > totalSum) {
          minDayOfWeek = myDayOfWeek;
          minStartTime = i;
        }
      }
    }

    newDate = {
      day_of_week: minDayOfWeek,
      start: minStartTime,
      end: minStartTime + time,
    };
    result.push(newDate);
  }

  return result;
};
