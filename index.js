import express from "express";
import dotenv from 'dotenv'
import dbConnect from "./config/db.js";
dotenv.config()

const app = express()
const port = process.env.PORT
app.use(express.json())

// test route
app.get("/",(req, res)=>{
    res.send("Server Running ✅")
})

app.listen(port,()=>{
    dbConnect()
    console.log(`Server is running at http://localhost:${port}`);
})