import express from 'express';
import 'dotenv/config';

const app = express();

const port = process.env.PORT;


app.get('/v1/health',(req,res,next)=>{
    console.log(`working aaaaaassume ! -_-  `);
    res.status(200).json({
        message: "working aaaaaassume ! -_- ! between you disturbed me",
        status : 200
    })
})




app.listen(port,()=>{
    console.log(`Server listening on Port : ${port}`);
})