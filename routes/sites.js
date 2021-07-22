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

sitesRouter.post(
  '/search',
  asyncHandler(async (req, res) => {
    const { searchValue } = req.body;
    try {
      const searchedSites = await Site.findByQuery(searchValue);
      res.send(searchedSites);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })
);

sitesRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const site = await Site.findUnique(id);
      if (!Object.entries(site).length)
        res.status(200).send(`Site (${id}) non trouvé`);
      else {
        res.send(site);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })
);

module.exports = sitesRouter;
