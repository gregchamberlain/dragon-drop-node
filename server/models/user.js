const mongoose = require('mongoose');

const generateSessionToken = () => Math.random().toString().slice(2);

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordDigest: { type: String, required: true },
  sessionToken: { type: String, default: generateSessionToken, unique: true }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
