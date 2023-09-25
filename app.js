const jwt = require('jsonwebtoken'); //toketn 생성모듈
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');
//경로 설정
const path = require('path');

// Body Parser 미들웨어 설정 - 파싱위함
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// MySQL 연결 모듈 가져오기
const mysqlConnection = require('./dbconnection');

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/tempfront', 'login.html'));
})

app.get('/signup', function(req, res){
    res.sendFile(path.join(__dirname + '/tempfront', 'signup.html'));
})



app.get('/users',(req, res)=>{
    //mysql 연결 모듈 사용 및 데베쿼리 실행
    mysqlConnection.query('SELECT * FROM users', (err, results) => {
        if (err) {
          console.error('MySQL query error: ', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
          console.log('유저정보 조회 성공')
          // 쿼리 결과를 변수에 저장 -> 프론트측에서 이 데이터 가지고 감
          const users = results;
        }
      });
})

// 로그인 요청을 처리하는 라우트
app.post('/login', (req, res) => {
    const { userid, password } = req.body;
    console.log(req.body);
    
    // 입력한 아이디와 패스워드를 사용하여 사용자 조회 쿼리
    const query = 'SELECT * FROM users WHERE user_id = ? AND password = ?';
    mysqlConnection.query(query,[userid, password], (err, results) => {
        if (err) {
            console.log(results);
            console.error('MySQL query error: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
            
            //res.send('로그인 실패. 아이디 또는 비밀번호가 올바르지 않습니다.');
        } else {
            const user = results;
            console.log(user);
            if(user.length === 0){
                console.log('로그인 실패 - 해당정보 사용자없음');
                res.sendFile(path.join(__dirname + '/tempfront', 'login.html'));
            }else{
                console.log('유저 정보 조회 성공');

                // 사용자 정보를 기반으로 JWT 생성
                const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
                  expiresIn: '1h' // 토큰 만료 시간 설정 (예: 1시간)
                });
        
                // 토큰을 클라이언트로 반환
                res.json({ token });
                //res.sendFile(path.join(__dirname + '/tempfront', 'main.html'));
            }
        }
    });
});


// 회원가입 요청을 처리하는 라우트
app.post('/signup', (req, res) => {
    const { username, email, userid, password } = req.body;
    console.log(req.body);
    
        // 입력한 아이디를 사용하여 사용자 조회 쿼리
        const checkQuery = 'SELECT * FROM users WHERE user_id = ?';
        mysqlConnection.query(checkQuery, [userid], (err, results) => {
            if (err) {
                console.error('MySQL query error: ', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                // 중복된 아이디가 이미 존재하는 경우
                if (results.length > 0) {
                    console.log('아이디 중복');
                    res.status(409).send('아이디 중복: 이미 존재하는 아이디입니다.');
                } else {
                    // 중복된 아이디가 없는 경우, 회원가입 쿼리 실행
                    const insertQuery = 'INSERT INTO users (username, email, user_id, password) VALUES (?, ?, ?, ?)';
                    mysqlConnection.query(insertQuery, [username, email, userid, password], (insertErr, insertResults) => {
                        if (insertErr) {
                            console.error('MySQL query error: ', insertErr);
                            res.status(500).json({ error: 'Internal Server Error' });
                        } else {
                            console.log('회원가입 성공');
                            res.status(201).send('회원가입 성공');
                        }
                    });
                }
            }
        });
    });

app.listen(3000, () => console.log('3000번 포트 대기'));