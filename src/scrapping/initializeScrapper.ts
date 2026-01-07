import * as child from 'node:child_process';


const scrapper = (url: string):Array<string>=> {
    try {
        const output = child.execSync(
            `yt-dlp --flat-playlist --print "%(title)s" "${url}"`,
            { 
                encoding: "utf-8" 
            }
        );
        let playlistArray = output.split('\n');
        playlistArray = playlistArray.filter((music) => {
            if(music){
                return music;
            }
        })
        return playlistArray;
    }
    catch (err) {
        console.log(`Server Error in the Scrapper : ${err}`)
        return [];
    }
}

//yt-simple-endpoint style-scope yt-formatted-string
//yt-simple-endpoint style-scope yt-formatted-string

//class="title style-scope ytmusic-responsive-list-item-renderer complex-string"
//flex-column style-scope ytmusic-responsive-list-item-renderer complex-string

export { scrapper };