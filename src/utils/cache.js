import redis from "redis";
import dotenv from "dotenv";
dotenv.config();

//Redis 연결
export const redisClient = redis.createClient({
  /*
    Redis 클라이언트 객체 생성 :
      Redis 서버에 연결하기 위한 URL을 지정
      legacyMode 옵션을 활성화
  */
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}/0`,
  legacyMode: true,
});

//Redis 연결 성공
redisClient.on("connect", () => {
  console.info("✅ Redis connected!");
});

//Redis 연결 실패
redisClient.on("error", (err) => {
  console.error("❌ Redis Client Error", err);
});

//Redis v4 연결 (비동기)
redisClient.connect().then();

export const set = (key, value) => {
  redisClient.set(key, JSON.stringify(value));
};

export const get = (req, res, next) => {
  let key = req.originalUrl;

  redisClient.get(key, (error, data) => {
    if (error) {
      res.status(400).send({
        ok: false,
        message: error,
      });
    }
    if (data !== null) {
      console.log("data from redis!");
      res.status(200).send({
        ok: true,
        data: JSON.parse(data),
      });
    } else next();
  });
};

// 캐시 삭제 함수
export const remove = (key) => {
  redisClient.del(key, (error, reply) => {
    if (error) {
      console.error("캐시 삭제 실패:", error);
    } else {
      console.log("캐시 삭제 성공:", reply); // 삭제된 캐시 키의 수가 반환됩니다.
    }
  });
};
