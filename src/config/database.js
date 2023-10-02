// 필요한 모듈 불러오기
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

// MySQL 연결 설정
const config = {
  host: process.env.DB_HOST, // MySQL 호스트 주소
  user: process.env.DB_USER, // MySQL 사용자 이름
  port: 3306, // MySQL 포트 번호 (기본값은 3306입니다)
  password: process.env.DB_PWD, // MySQL 비밀번호
  database: process.env.DB_NAME // 사용할 데이터베이스 이름
};

// MySQL 연결 생성 (Promise 방식)
const pool = mysql.createPool(config);

export default pool;
