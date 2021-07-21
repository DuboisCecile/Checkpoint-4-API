// const axios = require('axios');
const db = require('../db');

const findSite = async (id) => {
  const idInt = parseInt(id, 10);
  const site = await db.site.findUnique({
    where: {
      id: idInt,
    },
  });
  return site;
};

module.exports = {
  findSite,
};
