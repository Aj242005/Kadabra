
import type { Request, Response, NextFunction } from 'express'
import { checkUrl } from '../utils/checkUrl.js';

const conversionMiddleware = async (req : Request , res : Response , next : NextFunction ) => {
    const { url } = req.body;
    console.log(url);
    const verdict = await checkUrl(url);
    if(verdict){
        console.log({
            message: " url found was correct proceeding to the next step",
            status : 200
        })
        next();
    }
    else{
        res.status(400).json({
            message : "The url user have entered is malfunctioned",
            status : 400
        })
    }
}



export { conversionMiddleware };