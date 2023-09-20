const express = require('express');
const app = express();

// 필요한 모듈 불러오기
const mysql = require('mysql');

// MySQL 연결 설정
const dbConfig = {
  host: 'awsdbinstance.ctpcezq624ms.ap-northeast-2.rds.amazonaws.com', // MySQL 호스트 주소
  user: 'gapmeet', // MySQL 사용자 이름
  password: 'ese2023sw', // MySQL 비밀번호
  database: 'gapmeetdb' // 사용할 데이터베이스 이름
};

// MySQL 연결 생성
const connection = mysql.createConnection(dbConfig);

// 연결 시작
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    throw err;
  }
  console.log('MySQL 연결 성공');

    
    // 유저 정보 삽입 SQL 쿼리
    const insertUserSQL = `
      INSERT INTO users (user_id, username, email, password)
      VALUES ('testid', 'testname', 'testemail@goole.com', '0000')
    `;
    
    // 유저 정보 삽입
    connection.query(insertUserSQL, (err) => {
      if (err) {
        console.error('유저 정보 삽입 실패:', err);
        throw err;
      }
      console.log('유저 정보 삽입 성공');
      
      // 유저 정보 조회 SQL 쿼리
      const selectUserSQL = 'SELECT * FROM users';
      
      // 유저 정보 조회
      connection.query(selectUserSQL, (err, results) => {
        if (err) {
          console.error('유저 정보 조회 실패:', err);
          throw err;
        }
        console.log('유저 정보 조회 결과:', results);
        
        // 연결 종료
        connection.end((err) => {
          if (err) {
            console.error('MySQL 연결 종료 실패:', err);
            throw err;
          }
          console.log('MySQL 연결 종료');
        });
      });
    });
  });

  app.get('/', function(req, res){
    res.send('hello NodeJs');
})
app.listen(3000, () => console.log('3000번 포트 대기'));