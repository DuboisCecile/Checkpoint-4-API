const User = require('../models/user');

module.exports = async (req, res, next) => {
  const userId = 1;
  try {
    req.currentUser = await User.findOne(userId);
  } catch (err) {
    return res.sendStatus(401);
  }
  return next();
};
