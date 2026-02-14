import express from "express";
import {ENV} from "./lib/env.js";
const app= express()

console.log(ENV.DB_URL);
console.log(ENV.PORT);

app.get("/health",(req,res)=>{
    res.status(200).json({
        msg:"success from backend made by SHIVANI"
    })
})

app.listen(ENV.PORT, ()=>{
    console.log("server is running on port :", ENV.PORT)
})