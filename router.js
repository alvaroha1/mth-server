const router = require('express').Router();
const homeController = require('./controllers/homeController');

router
  .get('/homes', homeController.getAllHomes);

module.exports = router;
