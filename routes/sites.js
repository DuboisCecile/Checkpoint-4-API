const sitesRouter = require('express').Router();
const Site = require('../models/site');

sitesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  Site.findSite(id).then((result) => {
    res.json(result);
  });
});

module.exports = sitesRouter;
