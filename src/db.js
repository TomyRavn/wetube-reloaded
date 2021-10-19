import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

const handleOpen = () => console.log("-- Connected to DB. ✔");

db.on("error", (error) => console.log("!! Error : DB Error", error));      //여러 번 발생
db.once("open", handleOpen);                                               //한 번 발생