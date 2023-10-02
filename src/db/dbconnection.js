// 필요한 모듈 불러오기
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';

// MySQL 연결 설정
const config = {
  host: `${process.env.DB_HOST}`, // MySQL 호스트 주소
  user: `${process.env.DB_USER}`, // MySQL 사용자 이름
  password: `${process.env.DB_PWD}`, // MySQL 비밀번호
  database: `${process.env.DB_NAME}` // 사용할 데이터베이스 이름
};

// MySQL 연결 생성
const pool = mysql.createConnection(config);

// 연결 시작
pool.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    throw err;
  }
  console.log('MySQL 연결 성공');
});

export default pool