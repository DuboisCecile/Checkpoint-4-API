const db = require('../db');

const findEvent = async (id) => {
  const idInt = parseInt(id, 10);
  const animation = await db.animation.findUnique({
    where: {
      id: idInt,
    },
  });
  return animation;
};

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
  console.log(maxPlaces);
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

module.exports = {
  findEvent,
  createEvent,
};
