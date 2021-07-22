const siteRouter = require('./sites');
const eventRouter = require('./events');
const userRouter = require('./users');
const currentUserRouter = require('./currentUser');
const gemsRouter = require('./gems');

module.exports = (app) => {
  app.use('/sites', siteRouter);
  app.use('/events', eventRouter);
  app.use('/users', userRouter);
  app.use('/currentUser', currentUserRouter);
  app.use('/gems', gemsRouter);
};
