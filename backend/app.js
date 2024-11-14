import express from "express"
import dotenv from "dotenv"
dotenv.config()
import ConnectDatabase from "./database/db.js"
import userRoutes from "./routes/user.js"
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 6000

//@database setup 
ConnectDatabase()

// @express variable 
const app = express()

//@from data setup 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// @cookie setup 
app.use(cookieParser())

// @handle user routes
app.use("/api/users",userRoutes)

//@inital start route
app.get("/",(req,res)=>{ res.send("server is ready") })

app.listen(PORT,
    console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)