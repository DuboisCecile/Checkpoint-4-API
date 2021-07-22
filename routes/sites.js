const sitesRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const Site = require('../models/site');

sitesRouter.get(
  '/categories',
  asyncHandler(async (req, res) => {
    try {
      res.send(await Site.findSitesCategories());
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })
);

sitesRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      res.send(await Site.findAllSites());
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })
);

sitesRouter.post('/', (req, res) => {
  console.log(req.body);
  return Site.createSite(req.body)
    .then((favorite) => {
      res.json(favorite);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send("Il y a eu une erreur lors de l'enregistrement du site");
    });
});

module.exports = sitesRouter;
