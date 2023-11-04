import multer from "multer";
import path from "path";


//디스크 저장소 객체
export const storage = multer.diskStorage({//디스크 저장소의 정의
    destination: function(req, file, cb){
        cb(null, 'src/uploads/')    //파일이 저장될 위치 정의
    },
    filename: function(req, file, cb){  //파일명
        cb(null, new Date().valueOf() + path.extname(file.originalname)); //시스템 시간으로 파일 이름 설정
    }
})

export default storage;