import puppeteer from "puppeteer";
import type Puppeteer from "../types/puppeteer.type.js";
import { writeFileSync } from "fs";

const initializeScrapper = async (url : string):Promise<Puppeteer> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    return {
        browser,page
    }
}

initializeScrapper('https://google.com')
.then( async (data)=>{
    const website = await data.page.content();
    const something = writeFileSync('google.html',website);
    console.log(website);
    console.log(typeof website);
} )