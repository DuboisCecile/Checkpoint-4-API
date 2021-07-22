const siteRouter = require('./sites');
const eventRouter = require('./events');

module.exports = (app) => {
  app.use('/sites', siteRouter);
  app.use('/events', eventRouter);
};
