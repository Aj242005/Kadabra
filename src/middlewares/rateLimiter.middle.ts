
import { getClientIp } from 'request-ip'
import { rateLimiter } from "../utils/rateLimiter.js";
import type { Request, Response, NextFunction } from 'express'


const rateLimiterMiddleWare = async(req : Request ,res : Response ,next: NextFunction )=>{
    let ip = getClientIp(req)??"";
    try{
        const rateLimit = await rateLimiter(ip);
        if(rateLimit.status == 200){
            console.log(rateLimit);
            next();
        }
        else{
            console.log(rateLimit);
            res.status(500).json(rateLimit);
        }
    }
    catch (err){
        res.status(500).json({
            message : 'Internal Server Error Encountered',
            status : 500
        })
    }
}

export { rateLimiterMiddleWare };