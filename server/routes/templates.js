const router = require('express').Router();
const Site = require('../models/site');
const auth  = require('../middleware/auth');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  Site.find({template: true}).populate('rootPage').exec((err, sites) => {
    if (err) return next(err);
    res.json(sites);
  });
});

router.post('/:id/clone', auth, (req, res, next) => {
  Site.findOne({identifier: req.param.id}, (err1, site) => {
    if (err1) return next(err1);
    site._id = mongoose.Types.ObjectId();
    site.userId = req.user._id;
    site.save((err, s) => {
      res.json(s);
    });
  });
});

module.exports = router;
