# 사람들의 스케줄을 나타내는 리스트
# schedules = {
#     'Person1': [(1, 9), (2, 10), (3, 11)],  # (요일, 시간) 형태의 튜플 리스트
#     'Person2': [(1, 9), (3, 10), (5, 11)],
#     'Person3': [(2, 9), (4, 10)],
#     'Person4': [(6, 15.5)]
#     # 나머지 참가자의 스케줄은 추가
# }

schedules = {
    'Person1': [(1, 9), (2, 11), (3, 11)],  # (요일, 시간) 형태의 튜플 리스트
    'Person2': [(1, 9.5), (3, 10), (5, 10)],
    'Person3': [(1, 11.0), (2, 9), (4, 11), (5, 9.5)],
    'Person4': [(1, 10.0), (6, 15.5)]
    # 나머지 참가자의 스케줄은 추가
}

# 조건
# condition = {
#     'limit': [(9,12)],
#     'day': [(1,0)],
#     'time': [(2)],
# }

condition = {
    'limit': [(9,13)],
    'day': [(1,0)],
    'time': [(2)],
}

# 리스트의 각 튜플을 확인
for day_tuple in condition['day']:
    day_1, day_2 = day_tuple
    if day_1 == 1 and day_2 == 0:
        start_day = 1
        end_day = 5
    elif day_2 == 1 and day_1 == 1:
        start_day = 6
        end_day = 7
    else:
        start_day = 1
        end_day = 7
for limit_tuple in condition['limit']:
    time1, time2 = limit_tuple
ti = condition['time'][0]

# 가능한 요일과 시간의 조합을 담을 빈 집합 생성
possible = []
np = len(schedules.items())
npm = 0
n = 0  # 3개만

while np != npm+2 and n <= 2:  # 2명까지 탐색
    for i in range(start_day, end_day + 1):  # 요일
        
        t = time1
        
        while t <= time2-ti and n <= 2:  # 제한시간

            p = True
            npp = 0
            
            for person, person_schedule in schedules.items():  # 사람마다 안 되는 것 확인
                if npp < np - npm and p == True:  # 인원수 제한
                    for day, time in person_schedule:  # 한 사람의 요일 시간 확인
                        if day == i and t <= time < t + 2:
                            p = False
                npp += 1
                
            if p == True:  # 모두가 가능한 시간이면 추가
                new_tuple = (i,t)
                if new_tuple not in possible:
                    possible.append(new_tuple)
                    print(possible)
                n += 1
            
            t += 0.5
            
    npm += 1
        
print(possible)