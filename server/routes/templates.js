const router = require('express').Router();
const Site = require('../models/site');
const Page = require('../models/page');
const auth  = require('../middleware/auth');
const mongoose = require('mongoose');
const async = require('async');

router.get('/', (req, res, next) => {
  Site.find({template: true}).populate('rootPage').exec((err, sites) => {
    if (err) return next(err);
    res.json(sites);
  });
});

router.post('/:id/clone', auth, (req, res, next) => {
  const rootPageId = mongoose.Types.ObjectId();
  let site = new Site(req.body.site);
  site.rootPage = rootPageId;
  site.userId = req.user._id;
  const newPages = [];
  site.save().then(() => {
    Page.find({siteId: req.params.id}, (err1, pages) => {
      if (err1) return next(err1);
      let count = 0;
      pages.forEach(page => {
        page._id = page.path === '/' ? rootPageId : mongoose.Types.ObjectId();
        page.isNew = true;
        page.siteId = site.identifier;
        page.components.forEach(c => { delete c._id; });
        page.save(err2 => {
          if (err2) return next(err2);
          count++;
          newPages.push(page);
          if (count === pages.length) {
            site = site.toObject();
            site.pages = newPages;
            res.json(site);
          }
        });
      });
    });
  }).catch(err => next(err));
});

module.exports = router;
