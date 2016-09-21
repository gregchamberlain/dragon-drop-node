const mongoose = require('mongoose');
const Site = require('./site');

const generateSessionToken = () => Math.random().toString().slice(2);

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordDigest: { type: String, required: true },
  sessionToken: { type: String, default: generateSessionToken, unique: true }
});

UserSchema.methods.populateSites = function(callback) {
  const u = this.toObject();
  Site.find({userId: this._id}).populate('rootPage').exec((err, sites) => {
    if (err) return callback(err, null);
    u.sites = sites;
    delete u.passwordDigest;
    delete u.sessionToken;
    callback(null, u);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
