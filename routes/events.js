const eventsRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const Event = require('../models/event');

eventsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      res.send(await Event.findAllEvents());
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })
);

eventsRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const event = await Event.findEvent(id);
      if (!Object.entries(event).length)
        res.status(200).send(`Evènement (${id}) non trouvé`);
      else {
        res.send(event);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })
);

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

eventsRouter.post(
  '/register',
  asyncHandler(async (req, res) => {
    try {
      res.status(200).send(await Event.RecordRegistration(req.body));
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })
);

module.exports = eventsRouter;
