const puppeteer = require('puppeteer');

const igUser = process.env.IG_USER;
const igPass = process.env.IG_PASS;

async function startBrowser(){
    let browser;
    let cookies = [];
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            // headless: true,
            // args: ["--fast-start", "--disable-extensions", "--no-sandbox"],
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
        const page = await browser.newPage();
        await page.goto('https://www.instagram.com/accounts/login/');
        await page.waitForSelector('input[name="username"]');
        await page.type('input[name="username"]', igUser);
        await page.type('input[name="password"]', igPass);
        await page.click('button[type="submit"]');
        await page.waitForSelector('svg[aria-label="Home"][role="img"]');
        cookies = await page.cookies();
        await page.goto('about:blank');
        await page.close();
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return { browser, cookies };
}

module.exports = {
    startBrowser
};