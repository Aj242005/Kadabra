import type response from "../types/response.type.js";
import { redisApp } from "./connectRedis.js"
import { decrementUser } from "./decrementLimit.js";

const addIpToRedis = async (ipAdd: string): Promise<response> => {
    try {
        const res = await redisApp.hsetnx('ip', ipAdd, 4);
        
        if (res === 1) {
            const expRes = await redisApp.hexpire('ip', 86400, 'FIELDS', 1, ipAdd);
            if (expRes) {
                console.log('IP added to redis successfully');
                return {
                    message : "IP added to redis successfully",
                    status : 200
                }
            }
            else {
                await redisApp.hdel('ip', ipAdd);
                return {
                    message: "Error adding ip to the redis hash",
                    status: 500
                }
            }
        }
        else{
            return {
                message : 'bad request redis operation failed',
                status : 500
            }
        }
    } catch (err) {
        console.error('Redis operation failed:', err);
        return {
            message: "Error adding ip to the redis hash",
            status: 500
        }
    }
}

export { addIpToRedis };