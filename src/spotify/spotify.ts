import axios from "axios"
import type response from "../types/response.type.js"
import { v4 } from 'uuid';

const user_id = process.env.SPOTIFY_USER_ID
const bearer_token = process.env.SPOTIFY_BEARER_TOKEN


const makePlaylist = async (): Promise<string> => {
    try {
        const newPlaylistLink = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
            headers: {
                Authorization: `Bearer ${bearer_token}`
            },
            method: "POST",
            body: JSON.stringify({
                "name": `playlist ${v4()}`,
                "description": `Converted from a youtube music playlist to a spotify playlist`,
                "public": true
            })
        })
        const res = await newPlaylistLink.json();
        console.log('playlist created');
        console.log(res);
        return String(res["external_urls"]);
    }
    catch (err) {
        console.log(`Internal Server Error : ${err}`);
        return "";
    }
}

const findTrack = async (song : string): Promise<string> => {
    try{
        let songQueryArray = song.split('');
        let songQuery = songQueryArray.join("+");
        const trackLink = await fetch(`https://api.spotify.com/v1/search?q=${songQuery}&type=track`, {
            headers: {
                Authorization: `Bearer ${bearer_token}`
            },
            method: "GET"
        }); 
        const res = await trackLink.json();
        console.log('found the track');
        return String(res["tracks"]["items"]["external_urls"]["spotify"]);
    }
    catch(err){
        console.log(`Internal Server Error : ${err}`);
        return "";
    }
}



export { makePlaylist }