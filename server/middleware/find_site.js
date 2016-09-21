const Site = require('../models/site');

const findSite = (auth = true) => (req, res, next) => {
  Site.findOne(
    {identifier: req.params.id}
  ).populate('rootPage').exec((err, site) => {
    if (err) return next(err);
    if (!site) return res.status(404).json({message: 'Site not found.'});
    if (auth && site.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({message: 'Site does not belong to you.'});
    } else {
      req.site = site;
      next();
    }
  });
};

module.exports = findSite;
