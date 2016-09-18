const router = require('express').Router();
const sites = require('./sites');
const pages = require('./pages');

router.get('/', (req, res) => {
  res.send('This is the api!');
});

router.use('/sites', sites);
router.use('/pages', pages);

module.exports = router;
