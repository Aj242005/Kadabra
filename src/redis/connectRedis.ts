import { Redis } from 'ioredis';
import type response from '../types/response.type.js';

const redisApp = new Redis();

const checkRedisLive = async():Promise<response> =>{
    try{
        await redisApp.ping();
        return {
            message : "Redis Server Live",
            status : 200
        }
        }
    catch(err){
        return {
            message : `Redis Server Error : ${err}`,
            status : 500
        };
    }
}

export { redisApp, checkRedisLive }