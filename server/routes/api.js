const router = require('express').Router();
const sites = require('./sites');
const pages = require('./pages');
const users = require('./users');
const templates = require('./templates');
const session = require('./session');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  res.send('This is the api!');
});

router.use('/sites', auth, sites);
router.use('/pages', auth, pages);
router.use('/users', users);
router.use('/session', session);
router.use('/templates', templates);

module.exports = router;
