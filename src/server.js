import express from "express"; // == const express = require("express");
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

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
app.use(logger); //Console route log
app.use(express.urlencoded({ extended: true })); //<HTML Form> to <JS Object>

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,     //session을 수정할 때만 세션을 DB에 저장 => (2021.10.26) 현재 수정은 userController 로그인 시에만 이루어짐
    /* cookie 만료일 지정(milliseconds)
    cookie:{
      maxAge: 20000,
    }
    */
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

//====== TEST PRINT ======//
// app.use((req, res, next) => {

//** RESPONSE LOCALS(전역변수로 사용 가능)
// res.locals.siteName = "Wetube"; -> middlewares.js 로 이동

//1. HEADER
//console.log(req.headers);
//next();
//2. SESSION ID
//     req.sessionStore.all( (error, sessions) => {
//         console.log(sessions);
//         next();
//     });
// });
//3. SESSION ID PRINT
// app.get("/add-one", (req, res, next) => {
//  return res.send(`${req.session.id}`);
// });
//=== END OF TEST PRINT ===//

app.use(localsMiddleware);                          //localsMiddleware에서 세션을 접근하려면 세션 middleware 다음에 위치해야 함
app.use("/uploads", express.static("uploads"));     //서버의 해당 폴더 미인지 상태를 변경 -> 미리 정해서 알려줌
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

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
