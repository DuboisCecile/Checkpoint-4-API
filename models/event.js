const db = require('../db');

const findEvent = (id) =>
  db.event.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      Guide: true,
      Site: true,
    },
  });

const createEvent = async ({
  title,
  description,
  siteId,
  startDateTime,
  language = 'Français',
  duration,
  videoLink,
  maxPlaces,
  cost,
  guideId,
}) => {
  return db.event.create({
    data: {
      title,
      description,
      language,
      siteId: parseInt(siteId, 10),
      startDateTime,
      duration: parseInt(duration, 10),
      videoLink,
      availablePlaces: maxPlaces,
      maxAvailablePlaces: maxPlaces,
      cost: parseInt(cost, 10),
      guideId: parseInt(guideId, 10),
    },
  });
};

const findAllEvents = async () => {
  return db.event.findMany({
    include: {
      Guide: true,
      Site: true,
    },
  });
};

const RecordRegistration = async ({ quantity, attendeeId, eventId }) => {
  return db.registration.create({
    data: {
      quantity: parseInt(quantity, 10),
      attendeeId: parseInt(attendeeId, 10),
      eventId: parseInt(eventId, 10),
    },
  });
};

module.exports = {
  findEvent,
  createEvent,
  findAllEvents,
  RecordRegistration,
};
