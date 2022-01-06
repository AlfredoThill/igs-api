const browserObject = require('./browser');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();
module.exports =  browserInstance;
