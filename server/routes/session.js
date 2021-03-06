const router = require('express').Router();
const User = require('../models/user');
const Site = require('../models/site');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.post('/', (req, res, next) => {
  User.findOne({email: req.body.user.email}, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(404).json({message: 'A user with that email does not exist.'});
    if (bcrypt.compareSync(req.body.user.password, user.passwordDigest)) {
      res.cookie(
        '__DRAGONDROP__SESSION',
        user.sessionToken,
        { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true }
      );
      user.populateSites((err1, u) => {
        if (err1) return next(err);
        res.json(u);
      });
    } else {
      res.status(400).json({message: 'Invalid password for that email'});
    }
  });
});

router.delete('/', auth, (req, res, next) => {
  req.user.sessionToken = Math.random().toString().slice(2);
  req.user.save((err, user) => {
    if (err) return next(err);
    res.clearCookie('__DRAGONDROP__SESSION');
    res.json({});
  });
});


module.exports = router;
