const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const PageSchema = new mongoose.Schema({
  siteId: { type: String, ref: 'Site', required: true },
  name: { type: String, required: true },
  path: { type: String, required: true },
  items: {type: Schema.Types.Mixed, default: {root: {id: 'root', type: 'Column', props: {children: []}}} }
}, {
  timestamps: true
});

PageSchema.index({ siteId: 1, path: 1 }, { unique: true });

PageSchema.plugin(uniqueValidator,
  { message: 'Path already used for this site.' });


const Page = mongoose.model('Page', PageSchema);

module.exports = Page;
