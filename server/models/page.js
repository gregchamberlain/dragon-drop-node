const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PageSchema = new mongoose.Schema({
  siteId: { type: Schema.ObjectId, ref: 'Site', required: true },
  name: { type: String, required: true },
  path: { type: String, required: true },
  components: [{
    name: { type: String, required: true },
    layout: { type: Schema.Types.Mixed, required: true },
    props: { type: Schema.Types.Mixed, required: true },
  }]
}, {
  timestamps: true
});

PageSchema.index({ siteId: 1, path: 1 }, { unique: true });

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;
