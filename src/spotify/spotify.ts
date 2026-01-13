import axios from "axios"
import type response from "../types/response.type.js"
import { v4 } from 'uuid';
import { writeFileSync } from "fs";
import { json } from "stream/consumers";


const user_id = process.env.SPOTIFY_USER_ID;
const bearer_token = process.env.SPOTIFY_BEARER_TOKEN;

const makePlaylist = async (): Promise<string> => {
    try {
        const newPlaylistLink = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
            headers: {
                Authorization: `Bearer ${bearer_token}`,
                'Content-Type': 'application/json'
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
        return String(res["external_urls"]["spotify"]);
    }
    catch (err) {
        console.log(`Internal Server Error : makePlaylist`);
        console.log(err);
        return "";
    }
}

const findTrack = async (song : string): Promise<string> => {
    try{
        let songQueryArray = song.split(' ');
        let songQuery = songQueryArray.join("+");
        const trackLink = await fetch(`https://api.spotify.com/v1/search?q=${songQuery}&type=track`, {
            headers: {
                Authorization: `Bearer ${bearer_token}`
            },
            method: "GET"
        }); 
        const res = await trackLink.json();
        console.log('found the track');
        return String(res["tracks"]["items"][0]["uri"]);
    }
    catch(err){
        console.log(`Internal Server Error : findTrack`);
        console.log(err);
        return "";
    }
}

const addSongArrayToPlaylist = async ( songArray : Array<string>, playlistid : string ): Promise<string> =>{
    try{
        console.log(songArray);
        console.log(JSON.stringify({
                "uris" : songArray,
                "position" : 0
                }))
        const playlistSnapShot = await fetch(`https://api.spotify.com/v1/playlists/${playlistid}/tracks`,{
            headers: {
                Authorization: `Bearer ${bearer_token}`,
                'Content-Type': 'application/json'
            },
            method: "POST",
            body : JSON.stringify({
                uris : songArray
            })
        })
        const res = await playlistSnapShot.json();
        return String(res["snapshot_id"]);
    }
    catch (err){
        console.log(`Internal Server Error : addSongArrayToPlaylist`);
        console.log(err);
        return "";
    }
}

export { makePlaylist, findTrack, addSongArrayToPlaylist };