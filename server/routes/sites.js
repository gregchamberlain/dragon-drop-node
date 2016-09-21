const router = require('express').Router();
const Site = require('../models/site');
const Page = require('../models/page');
const findSite = require('../middleware/find_site');

router.get('/', (req, res, next) => {
  Site.find({userId: req.user._id}).populate('rootPage').exec((err, sites) => {
    if (err) return next(err);
    const result = sites.map(site => site.toObject());
    result.forEach((site, idx) => {
      Page.find({siteId: site.identifier}, (pErr, pages) => {
        if (pErr) return next(pErr);
        site.pages = pages;
        if (idx === result.length - 1) {
          res.json(result);
        }
      });
    });
  });
});

router.post('/', (req, res, next) => {
  const newSite = req.body.site;
  const page = new Page({name: 'Home', path: '/', siteId: newSite.identifier});
  newSite.userId = req.user._id;
  newSite.rootPage = page._id;
  Site.create(newSite, (err, site) => {
    if (err) return next(err);
    page.save((pErr) => {
      if (pErr) return next(pErr);
      const result = site.toObject();
      result.pages = [page];
      result.rootPage = page;
      console.log(result);
      res.json(result);
    });
  });
});

router.get('/:id', findSite(false), (req, res, next) => {
  Page.find({siteId: req.site.identifier}).exec((err, pages) => {
    if (err) return next(err);
    const site = req.site.toObject();
    res.json(site);
  });
});

router.put('/:id', findSite(), (req, res, next) => {
  Site.findOneAndUpdate(
    {identifier: req.params.id},
    req.body.site,
    {new: true}
  ).populate('rootPage').exec((err, site) => {
    if (err) next(err);
    res.json(site);
  });
});

router.delete('/:id', findSite(), (req, res, next) => {
  Site.findOneAndRemove({identifier: req.params.id}, (err, site) => {
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
