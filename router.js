const router = require('express').Router();
const controller = require('./controller');

router
  .get('/pokemons', controller.getAllPokemons)

module.exports = router;
