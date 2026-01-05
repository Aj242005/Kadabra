import { redisApp } from "./connectRedis.js"
import type response from "../types/response.type.js";
//only use when ip Exists

const decrementUser = async (ipAdd : string) : Promise<response> => {
    return await new Promise( async(resolve,reject) => {
        const userLimit = await redisApp.hget('ip',ipAdd);
        if(Number(userLimit) > 0){
            const decRes = await redisApp.hincrby('ip',ipAdd,-1);
            if(decRes+1){
                resolve({
                    message : "User's limit decremented",
                    status : 200
                })
            }
            else{
                reject({
                    message : "Internal Server Error",
                    status : 500
                })
            }
        }
        else{
            reject({
                message : "User do not have a valid limit left" ,
                status : 429
            })
        }
            
    })
}


export { decrementUser };