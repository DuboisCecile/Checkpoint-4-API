const eventsRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const Event = require('../models/event');
const User = require('../models/user');
const requireCurrentUser = require('../middlewares/requireCurrentUser');

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
    const id = parseInt(req.params.id, 10);
    try {
      const event = await Event.findEvent(id);
      if (!Object.entries(event).length)
        res.status(404).send(`Evènement (${id}) non trouvé`);
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
  requireCurrentUser,
  asyncHandler(async (req, res) => {
    const { quantity, eventId, totalCost } = req.body;
    const attendeeId = req.currentUser.id;
    try {
      const recording = await Event.RecordRegistration({
        quantity,
        eventId,
        attendeeId,
      });
      if (!Object.entries(recording).length) {
        res.status(404).send(`Il y a eu un problème lors de l'enregistrement`);
      } else {
        await Event.decrementPlaces({ quantity, eventId });
        await User.useGems({ totalCost, attendeeId });
        res.send(recording);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })
);

eventsRouter.post(
  '/search',
  asyncHandler(async (req, res) => {
    const { searchValue } = req.body;
    try {
      const searchedEvents = await Event.findByQuery(searchValue);
      res.send(searchedEvents);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })
);

module.exports = eventsRouter;
