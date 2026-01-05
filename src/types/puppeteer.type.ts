import type { Browser, Page } from "puppeteer"

export default interface Puppeteer {

    browser: Browser,
    page: Page

}