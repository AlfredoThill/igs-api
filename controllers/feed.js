
const browserInstance = require('../browser/index');
const axios = require('axios');
const cheerio = require('cheerio');
const Insta = require('scraper-instagram');
const InstaClient = new Insta();

exports.getProfile = (req, res, next) => {
  const username = req.query.name;
  InstaClient.getProfile(username)
    .then(profile => {
      res.json(profile);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
};

exports.getPosts = (req, res, next) => {
  const profileUsername = req.query.name;
  InstaClient.getProfilePosts(profileUsername, 5)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
};

exports.searchProfile = (req, res, next) => {
  const query = req.query.q;
  InstaClient.searchProfile(query)
    .then(profiles => {
      res.json(profiles);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
};

exports.scrapePuppet = async (req, res, next) => {
  const name = req.query.name;
  const url = `https://www.instagram.com/${name}/`;
  try {
    const browser = await browserInstance;
    let page = await browser.newPage();
    console.log(`Navigating to ${url}...`);
    await page.goto(url);
    await page.waitForSelector('article');
    const dataObject = await page.$$eval('article a', links => {
      const data = [];
      links.forEach((link) => {
        const href = link.getAttribute('href');
        const postId = href.split('/')[2];
        const img = link.querySelector('img');
        const postDesc = img.getAttribute('alt');
        const srcset = img.getAttribute('srcset');
        const [postImg, imgSize] = srcset.split(',')[0].split(' ');
        data.push({
          postId,
          postImg,
          imgSize,
          postDesc,
        })
      })
      return data;
    });
    res.json(dataObject);
    await page.goto('about:blank');
    await page.close();
  } catch(err) {
    console.log("Could not resolve the browser instance => ", err);
    next(err);
  }
};
