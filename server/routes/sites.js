const router = require('express').Router();
const Site = require('../models/site');
const Page = require('../models/page');
const findSite = require('../middleware/find_site');

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

router.get('/:id', findSite(false), (req, res, next) => {
  Page.find({siteId: req.site.identifier}, (err, pages) => {
    if (err) return next(err);
    const site = req.site.toObject();
    site.pages = pages;
    res.json(site);
  });
});

router.put('/:id', findSite(), (req, res, next) => {
  Site.findOneAndUpdate({identifier: req.params.id}, req.body.site, {new: true}, (err, site) => {
    if (err) next(err);
    res.json(site);
  });
});

router.delete('/:id', findSite(), (req, res, next) => {
  Site.findByIdAndRemove(req.params.id, req.body.site, (err, site) => {
    if (err) return next(err);
    res.json(site);
  });
});

router.get('/:id/pages', findSite(), (req, res, next) => {
  Page.find({siteId: req.params.id}, (err, pages) => {
    if (err) return next(err);
    res.json(pages);
  });
});

router.post('/:id/pages', findSite(), (req, res, next) => {
  const newPage = Object.assign({}, req.body.page, {siteId: req.params.id});
  Page.create(newPage, (err, page) => {
    if (err) return next(err);
    res.json(page);
  });
});

module.exports = router;
