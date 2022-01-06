const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/profile', feedController.getProfile);
router.get('/posts', feedController.getProfile);
router.get('/search', feedController.searchProfile);
router.get('/scrape', feedController.scrapePuppet);

module.exports = router;
