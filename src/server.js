import express from "express"; // == const express = require("express");
import morgan from "morgan";

import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

//console.log(process.cwd());     //현재 작업 디렉토리 확인 ; 서버를 기동하는 파일 위치 : package.json의 위치

const app = express();
const logger = morgan("dev");

/////////////////////////////////////////////////////////////////////////
//뷰 엔진 설정
const VIEW_ROUTE = "/src";

app.set("view engine", "pug");
app.set("views", process.cwd() + VIEW_ROUTE + "/views");

/////////////////////////////////////////////////////////////////////////
//순서 : 미들웨어부터 먼저
app.use(logger);                                    //Console route log
app.use(express.urlencoded({ extended: true }));    //<HTML Form> to <JS Object>

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// //1. inline(Finalware)
// app.get("/", (req, res) => 
//     {
//         return res.send("Hello! Node!");
//     }
// );

// //2. function(Finalware)
// const handleLogin = (req, res) => {
//     return res.send("Login here."); 
// }

// app.get("/login", handleLogin);

/////////////////////////////////////////////////////////////////////////

export default app;