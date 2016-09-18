const mongoose = require('mongoose');

const parseIdentifier = val => (
  val.slice(0, 24).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
);

const SiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  identifier: {
    type: String,
    required: true,
    unique: true
  },
  template: { type: Boolean, default: false}
}, {
  timestamps: true
});

const Site = mongoose.model('Site', SiteSchema);

module.exports = Site;
