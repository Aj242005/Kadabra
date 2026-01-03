import 'dotenv/config'
import express from 'express';
const app = express();

const port = process.env.PORT ?? 1008;


app.get('/v1/health',(req,res,next)=>{
    console.log('health route explored');
    res.status(200).json({
        message: "working aaaaaassume ! ~_~ ! between you disturbed me ~~'Server'🔥🔥🔥",
        status : 200
    })
})




app.listen(port,()=>{
    console.log(`Server listening on Port : ${port}`);
})