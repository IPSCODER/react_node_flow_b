import express from "express"

const app = express()


app.use("/",(req,resp) =>{
    resp.json("running")
})


app.listen(5000,()=>{
    console.log("app is running");
    
})