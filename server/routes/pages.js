const router = require('express').Router();
const Page = require('../models/page');

router.get('/:id', (req, res, next) => {
  Page.findById(req.params.id, (err, page) => {
    if (err) return next(err);
    res.json(page);
  });
});

router.put('/:id', (req, res, next) => {
  console.log(req.body.page);
  Page.findByIdAndUpdate(req.params.id, req.body.page, {new: true}, (err, page) => {
    console.log(err);
    if (err) next(err);
    res.json(page);
  });
});

router.delete('/:id', (req, res, next) => {
  Page.findByIdAndRemove(req.params.id, req.body.page, (err, page) => {
    if (err) return next(err);
    res.json(page);
  });
});

module.exports = router;
