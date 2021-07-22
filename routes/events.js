const eventsRouter = require('express').Router();
const Event = require('../models/event');

eventsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  Event.findEvent(id).then((result) => {
    res.json(result);
  });
});

eventsRouter.post('/', (req, res) => {
  return Event.createEvent(req.body)
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

module.exports = eventsRouter;
