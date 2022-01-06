const browserObject = require('./browser');
const Insta = require('scraper-instagram');

// Start the insta client
const InstaClient = new Insta();

// Start the browser and create a browser instance, get the cookies
let browserInstance = browserObject.startBrowser()
    .then((data) => {
        const { browser, cookies } = data;
        const sessionIdCookie = cookies.find((item) =>  item.name === 'sessionid' && item.domain === '.instagram.com');
        InstaClient.authBySessionId(sessionIdCookie?.value)
            .then(account => console.log(`Logged with email ${account.email}`))
            .catch(err => console.error(err));
        console.log(browser);
        return browser;
    });

module.exports = {
    browserInstance,
    InstaClient
};
