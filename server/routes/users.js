const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.user.password, 10, (err, hash) => {
    if (err) return next(err);
    User.create({email: req.body.user.email, passwordDigest: hash}, (uErr, user) => {
      if (uErr) return next(uErr);
      res.cookie(
        '__DRAGONDROP__SESSION',
        user.sessionToken,
        { maxAge: 900000, httpOnly: true }
      );
      res.json({_id: user._id, email: user.email});
    });
  });
});

module.exports = router;
