import express from "express"; // == const express = require("express");
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

/////////////////////////////////////////////////////////////////////////
//순서 : 미들웨어부터 먼저
app.use(logger);


//Global Router
const globalRouter = express.Router();
const userRouter = express.Router();
const videoRouter = express.Router();

const handleHome = (req, res) => res.send("Home");
const handleWatchVideo = (req, res) => res.send("Watch Video");
const handleEditUser = (req, res) => res.send("Edit User");

globalRouter.get("/", handleHome);
videoRouter.get("/watch", handleWatchVideo);
userRouter.get("/edit", handleEditUser);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

//1. inline(Finalware)
app.get("/", (req, res) => 
    {
        return res.send("Hello! Node!");
    }
);

//2. function(Finalware)
const handleLogin = (req, res) => {
    return res.send("Login here."); 
}

app.get("/login", handleLogin);
/////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////

const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);