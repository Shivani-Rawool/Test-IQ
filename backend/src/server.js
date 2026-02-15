import express from "express";
import {ENV} from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";


const _dirname=path.resolve();
const app= express()


app.get("/health",(req,res)=>{
    res.status(200).json({
        msg:"success from backend made by SHIVANI"
    })
})

app.get("/books",(req,res)=>{
    res.status(200).json({
        msg:"This is the books endpoint"
    })
})

//make our app ready for deployment
if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(_dirname,"../frontend/dist")))

    app.get("/{*any}", (req,res)=>{
        res.sendFile(path.join(_dirname,"../frontend","/dist","index.html"))
    })
}

const startServer = async() =>{
    try {
        await connectDB();
        app.listen(ENV.PORT, ()=>{
        console.log("server is running on port :", ENV.PORT)
        })
    } catch (error) {
        console.error("Error connecting the server")
    }
    
};

startServer();