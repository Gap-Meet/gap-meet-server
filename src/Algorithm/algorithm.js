const schedules = {
  Person1: [
    [1, 9],
    [2, 11],
    [3, 11],
  ],
  Person2: [
    [1, 9],
    [3, 10],
    [5, 10],
  ],
  Person3: [
    [1, 11],
    [2, 9],
    [4, 11],
    [5, 9],
  ],
  Person4: [
    [1, 10],
    [6, 15],
  ],
  // Add schedules for other participants
};

const condition = {
  limit: [[9, 15]],
  day: [[1, 0]],
  time: [2],
};

let start_day, end_day;
for (const dayTuple of condition["day"]) {
  const [day1, day2] = dayTuple;
  if (day1 === 1 && day2 === 0) {
    start_day = 1;
    end_day = 5;
  } else if (day2 === 1 && day1 === 1) {
    start_day = 6;
    end_day = 7;
  } else {
    start_day = 1;
    end_day = 7;
  }
}

const [time1, time2] = condition["limit"][0];
const ti = condition["time"][0];

const possible = [];
let np = Object.keys(schedules).length;
let npm = 0;
let n = 0;

while (np !== npm + 2 && n <= 2) {
  for (let i = start_day; i <= end_day; i++) {
    let t = time1;

    while (t <= time2 - ti && n <= 2) {
      let p = true;
      let npp = 0;

      for (const person in schedules) {
        if (npp < np - npm && p === true) {
          for (const [day, time] of schedules[person]) {
            if (day === i && t <= time && time < t + 2) {
              p = false;
            }
          }
        }
        npp++;
      }

      if (p === true) {
        const newTuple = [i, t];
        if (
          !possible.some(
            (item) => JSON.stringify(item) === JSON.stringify(newTuple)
          )
        ) {
          possible.push(newTuple);
          console.log(possible);
        }
        n++;
      }

      t += 1;
    }
  }

  npm++;
}

console.log(possible);
