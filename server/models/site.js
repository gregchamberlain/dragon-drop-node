const mongoose = require('mongoose');
const Page = require('./page');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const parseIdentifier = val => (
  val.slice(0, 24).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
);

const SiteSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User', require: true, index: true},
  name: { type: String, required: [true, 'Name can\'t be blank.'] },
  identifier: {
    type: String,
    required: [true, 'Identifier can\'t be blank.'],
    unique: true
  },
  rootPage: { type: Schema.ObjectId, ref: 'Page', required: true },
  template: { type: Boolean, default: false}
}, {
  timestamps: true
});

SiteSchema.plugin(uniqueValidator, { message: 'Identifier already taken.' });

const Site = mongoose.model('Site', SiteSchema);

module.exports = Site;
