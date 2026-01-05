import type response from "../types/response.type.js";
import { redisApp } from "./connectRedis.js";


const checkIfIpExists = async (ipAdd : string):Promise<boolean> => {
    const res = await redisApp.hget('ip',ipAdd);
    if(res == null){
        return false;
    }
    else{
        return true;
    }
}


export { checkIfIpExists };