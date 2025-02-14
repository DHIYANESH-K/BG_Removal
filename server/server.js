import 'dotenv/config'
import express from "express"
import cors from "cors"
import connectDB from './configs/mongodb.js'

// const corsConfig={
//     origin:"*",
//     credential:true,
//     methods:["GET","POST","PUT","DELETE"],
// };


const PORT = process.env.PORT || 4000

const app=express()
// app.options("*",cors(corsConfig));
// app.use(cors(corsConfig))
app.use(cors())


app.use(express.json())


app.get("/",(req,res)=>{
    res.send("API Working ....")
})

app.listen(PORT,async()=>{
    await connectDB();
    console.log("Srever is Running on port "+PORT);
})