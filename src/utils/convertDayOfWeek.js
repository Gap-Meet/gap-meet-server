export const convertDayOfWeekToNumber = function (dayOfWeek) {
  switch (dayOfWeek) {
    case "월":
      return 0;
    case "화":
      return 1;
    case "수":
      return 2;
    case "목":
      return 3;
    case "금":
      return 4;
    case "토":
      return 5;
    case "일":
      return 6;
    default:
      // 유효하지 않은 입력이 들어온 경우 예외처리
      throw new Error("유효하지 않은 요일입니다.");
  }
};
