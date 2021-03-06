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

const decrementPlaces = async ({ quantity, eventId }) => {
  const eventToUpdate = await findEvent(eventId);
  return db.event.update({
    where: { id: parseInt(eventId, 10) },
    data: {
      availablePlaces: eventToUpdate.availablePlaces - quantity,
    },
  });
};

const findByQuery = (searchValue) =>
  db.event.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchValue,
          },
        },
        {
          description: {
            contains: searchValue,
          },
        },
      ],
    },
  });

module.exports = {
  findEvent,
  createEvent,
  findAllEvents,
  RecordRegistration,
  decrementPlaces,
  findByQuery,
};
