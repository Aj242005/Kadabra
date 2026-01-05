import { addIpToRedis, checkIfIpExists, checkRedisLive, decrementUser, redisApp } from '../redis/index.js'
import type response from '../types/response.type.js'

const rateLimiter = async (ipAdd: string): Promise<response> => {
    try {
        const redisOn = await checkRedisLive();
        if (redisOn.status == 500) {
            return redisOn;
        }
        else if (redisOn.status == 200) {
            const ipExists = await checkIfIpExists(ipAdd);
            if (ipExists) {
                const ipLimitLeft = await redisApp.hget('ip', ipAdd);
                if (ipLimitLeft == null) {
                    return {
                        message: `Redis Internal Error Encountered: Found field's value null for the given ip address : ${ipAdd}`,
                        status: 500
                    }
                }
                else{
                    if(Number(ipLimitLeft) == 0){
                        return {
                            message : 'Usage Limit Exhausted',
                            status : 429
                        }
                    }
                    else{
                        return await decrementUser(ipAdd);
                    }
                }
            }
            else {
                console.log('ip do not exists');
                return await addIpToRedis(ipAdd);
            }
        }
        else {
            return {
                message: "Internal Server Error : Unexpected Status Code found .....",
                status: 509
            }
        }
    }
    catch (err) {
        return {
            message: "Internal Server Error Encountered",
            status: 500
        }
    }

}

export { rateLimiter };