const db = require('../db');

const findGemsBatches = async () => {
  return db.gemsCost.findMany();
};

module.exports = {
  findGemsBatches,
};
