import 'dotenv/config'
import express from 'express';
import { rateLimiterMiddleWare } from './src/middlewares/rateLimiter.middle.js';
const app = express();


const port = process.env.PORT ?? 1008;
app.use(express.json());

app.get('/v1/health',rateLimiterMiddleWare,(req,res,next)=>{
    
    console.log('health route explored');
    res.status(200).json({
        message: "working aaaaaassume ! ~_~ ! between you disturbed me ~~'Server'🔥🔥🔥",
        status : 200
    })
})




app.listen(port,()=>{
    console.log(`Server listening on Port : ${port}`);
})