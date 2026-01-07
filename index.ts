import 'dotenv/config'
import express from 'express';
import { conversionMiddleware, rateLimiterMiddleWare } from './src/middlewares/index.js';
import { scrapper } from './src/scrapping/initializeScrapper.js';
const app = express();


const port = process.env.PORT ?? 1008;
app.use(express.json());

app.post('/v1/convert',rateLimiterMiddleWare,conversionMiddleware, async(req,res)=>{
    let url : string = req.body?.url ?? "";
    console.log(url);
    const musicPlaylist = scrapper(url);
    res.status(200).json({
        message : "url into list of songs scrapped",
        status : 200,
        playlist : musicPlaylist
    })
})

app.get('/v1/health',(req,res,next)=>{
    
    console.log('health route explored');
    res.status(200).json({
        message: "working aaaaaassume ! ~_~ ! between you disturbed me ~~'Server'🔥🔥🔥",
        status : 200
    })
})

app.get('/',(req,res)=>{
    res.status(200).json({
        message : "Welcome to the Kadabra Backend",
        status : 200
    })
})

app.use( (req,res)=>{
    res.status(404).json({
        message: "Backend Endpoint Not Found",
        status : 404    
    })
})

app.listen(port,()=>{
    console.log(`Server listening on Port : ${port}`);
})