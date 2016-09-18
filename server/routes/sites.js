const router = require('express').Router();
const Site = require('../models/site');
const Page = require('../models/page');

router.get('/', (req, res) => {
  Site.find((err, sites) => {
    res.json(sites);
  });
});

router.post('/', (req, res, next) => {
  Site.create(req.body, (err, site) => {
    if (err) return next(err);
    res.json(site);
  });
});

router.get('/:id', (req, res, next) => {
  Site.findById(req.params.id, (err, site) => {
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

router.put('/:id', (req, res, next) => {
  Site.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, site) => {
    if (err) next(err);
    res.json(site);
  });
});

router.delete('/:id', (req, res, next) => {
  Site.findByIdAndRemove(req.params.id, req.body, (err, site) => {
    if (err) return next(err);
    res.json(site);
  });
});

module.exports = router;
