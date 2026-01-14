import 'dotenv/config'
import express from 'express';
import { conversionMiddleware, rateLimiterMiddleWare } from './src/middlewares/index.js';
import { scrapper } from './src/scrapping/initializeScrapper.js';
import { makePlaylist,addSongArrayToPlaylist,findTrack } from './src/spotify/spotify.js';

const app = express();


const port = process.env.PORT ?? 1008;
app.use(express.json());

app.post('/v1/convert',rateLimiterMiddleWare,conversionMiddleware, async(req,res)=>{
    let url : string = req.body?.url ?? "";
    console.log(url);
    const musicList = scrapper(url);
    const spotifyUrlList = musicList.map( async (song) => {
        return await findTrack(song);
    })
    const playlistLink = await makePlaylist();
    const resolvedSpotifyUrls = await Promise.all(spotifyUrlList);

    const cleanedUrlList = resolvedSpotifyUrls.filter( (song): song is string => typeof song === 'string' && song.startsWith('spotify:track:')
);

    const snapshot = await addSongArrayToPlaylist(cleanedUrlList,playlistLink.substring(34));
    console.log(`snapshot : ${snapshot}`);
    console.log(playlistLink);
    res.status(200).json({
        status : 200,
        numberOfSongs : cleanedUrlList.length,
        inputYoutubeUrl : url,
        spotifyUrl : playlistLink
    })

})

app.get('/v1/health',(req,res,next)=>{
    
    console.log('health route explored');
    res.status(200).json({
        message: "working aaaaaawsome ! ~_~ ! between you disturbed me ~~'Server'🔥🔥🔥",
        status : 200
    })
})

app.get('/',(req,res)=>{
    res.status(200).json({
        message : "Welcome to the Kadabra Backend",
        status : 200
    })
})

app.use( (req,res)=>{
    res.status(404).json({
        message: "Backend Endpoint Not Found",
        status : 404    
    })
})

app.listen(port,()=>{
    console.log(`Server listening on Port : ${port}`);
})
