const router = require('express').Router();
const Page = require('../models/page');

router.get('/', (req, res) => {
  Page.find((err, pages) => {
    res.json(pages);
  });
});

router.post('/', (req, res, next) => {
  Page.create(req.body, (err, page) => {
    if (err) return next(err);
    res.json(page);
  });
});

router.get('/:id', (req, res, next) => {
  Page.findById(req.params.id, (err, page) => {
    if (err) return next(err);
    res.json(page);
  });
});

router.put('/:id', (req, res, next) => {
  Page.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, page) => {
    if (err) next(err);
    res.json(page);
  });
});

router.delete('/:id', (req, res, next) => {
  Page.findByIdAndRemove(req.params.id, req.body, (err, page) => {
    if (err) return next(err);
    res.json(page);
  });
});

module.exports = router;
