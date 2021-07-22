const gemsRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const Gem = require('../models/gem');

gemsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      res.send(await Gem.findGemsBatches());
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })
);

module.exports = gemsRouter;
