const User = require('../models/user');

const auth = (req, res, next) => {
  User.findOne({
    sessionToken: req.cookies['__DRAGONDROP__SESSION']
  }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.clearCookie('__DRAGONDROP__SESSION');
      return res.status(403).json({
        message: 'You must be logged in to do that!'
      });
    }
    req.user = user;
    next();
  });
};

module.exports = auth;
