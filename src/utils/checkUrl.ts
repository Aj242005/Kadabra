import axios from "axios";

const checkUrl = async (url : string ) : Promise<boolean> => {
    if(!url){
        return false;
    }
    if(url.includes('music.youtube.com/playlist?')){
        try{
            await axios.get(url);
            return true;
        }
        catch (err){
            console.log(`Invalid Url from the user's end : ${err}`);
            return false;
        }
    }
    else{
        return false;
    }
}

export { checkUrl };