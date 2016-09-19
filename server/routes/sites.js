const router = require('express').Router();
const Site = require('../models/site');
const Page = require('../models/page');

router.get('/', (req, res) => {
  Site.find({userId: req.user._id}, (err, sites) => {
    res.json(sites);
  });
});

router.post('/', (req, res, next) => {
  const newSite = req.body.site;
  newSite.userId = req.user.id;
  Site.create(newSite, (err, site) => {
    if (err) return next(err);
    res.json(site);
  });
});

router.get('/:id', (req, res, next) => {
  Site.findOne({identifier: req.params.id}, (err, site) => {
    if (err) return next(err);
    res.json(site);
  });
});

router.put('/:id', (req, res, next) => {
  Site.findOneAndUpdate({identifier: req.params.id}, req.body.site, {new: true}, (err, site) => {
    if (err) next(err);
    res.json(site);
  });
});

router.delete('/:id', (req, res, next) => {
  Site.findByIdAndRemove(req.params.id, req.body.site, (err, site) => {
    if (err) return next(err);
    res.json(site);
  });
});

router.get('/:id/pages', (req, res, next) => {
  Page.find({siteId: req.params.id}, (err, pages) => {
    if (err) return next(err);
    res.json(pages);
  });
});

router.post('/:id/pages', (req, res, next) => {
  const newPage = Object.assign({}, req.body.page, {siteId: req.params.id});
  Page.create(newPage, (err, page) => {
    if (err) return next(err);
    res.json(page);
  });
});

module.exports = router;
