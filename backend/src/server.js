import express from "express";
import path from "path";
import cors from "cors";
import {serve} from "inngest/express"

import { connectDB } from "./lib/db.js";
import {ENV} from "./lib/env.js";


const _dirname=path.resolve();

const app= express();

//middleware
app.use(express.json())
//credential:true means->server allows the brower to include cookies on request
app.use(cors({origin:ENV.CLIENT_URL, credential:true}))

app.use("/api/inngest",serve({client: inngest, functions}))

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