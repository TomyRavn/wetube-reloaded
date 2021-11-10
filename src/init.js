import "regenerator-runtime";
import "dotenv/config"; //=> require("dotenv").config(); 로는 되지 않음, 요구하는 모든 파일에 작성되어야함 => import로 해결
                        //import는 선언문이라 Hoisting 발생, require는 표현식이라 늦게 호출
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = 4000;

const handleListening = () => 
    console.log(`-- Server listening on port http://localhost:${PORT} ✔`);

app.listen(PORT, handleListening);