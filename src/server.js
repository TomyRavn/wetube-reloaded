import express from "express"; // == const express = require("express");
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

/////////////////////////////////////////////////////////////////////////
//순서 : 미들웨어부터 먼저
app.use(logger);

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