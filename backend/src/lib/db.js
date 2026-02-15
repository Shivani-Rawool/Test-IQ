import mongoose from "mongoose";

import {ENV} from "./env.js";

export const connectDB = async() =>{
    try {
        if(!ENV.DB_URL){
            throw new error("DB_URL not found in env variables")
        }
        const conn = await mongoose.connect(ENV.DB_URL)
        console.log("Connected to MongoDB", conn.connection.host) 
    } catch (error) {
        console.error("Error connecting MongoDB", error)
        process.exit(1) 
    }
}