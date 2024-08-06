import express from "express";
import dotenv from "dotenv";
import connectMGDB from "./configs/dbconfig.js";
import routes from "./routes/index.js";
import cors from 'cors'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
process.on('warning', e => console.warn(e.stack));
connectMGDB(process.env.dbURL)
routes(app)

app.listen(process.env.PORT, () => {
    console.log("server đang chạy trên cổng " + process.env.PORT)
})