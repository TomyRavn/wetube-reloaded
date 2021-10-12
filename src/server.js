import express from "express"; // == const express = require("express");

const PORT = 4000;

const app = express();


/////////////////////////////////////////////////////////////////////////
//순서 : 미들웨어부터 먼저
//(Middleware Function)
const logger = (req, res, next) =>{
    console.log(`${req.method} ${req.url}`);
    next();
}

const privateMiddleware = (req, res, next) => {
    const url = req.url;
    if(url === "/protected"){
        return res.send("<h1>Not Allowed</h1>");
    }
    console.log("Allowed, you may continue.");
    next();
};

//(Global Middleware)
app.use(logger);
app.use(privateMiddleware);


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

const handleProtected = (req, res) => {
    return res.send("Welcome to the private lounge.");
}

app.get("/protected", handleProtected);

/////////////////////////////////////////////////////////////////////////

const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);