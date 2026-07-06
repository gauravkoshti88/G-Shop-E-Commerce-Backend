import express from "express";
import dotenv from 'dotenv'
import dbConnect from "./config/db.js";
import authRouter from "./routes/user/auth.routes.js";
dotenv.config()

const app = express()
const port = process.env.PORT
app.use(express.json())

// test route
app.get("/",(req, res)=>{
    res.send("Server Running ✅")
})

// main routes
app.use("/api/auth", authRouter);

app.listen(port,()=>{
    dbConnect();
    console.log(`Server is running at http://localhost:${port}`);
})