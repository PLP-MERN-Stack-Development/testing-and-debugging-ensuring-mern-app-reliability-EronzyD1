// server/src/models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  author:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.Mixed, required: true }, // allow string or ObjectId in tests
  slug:     { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
