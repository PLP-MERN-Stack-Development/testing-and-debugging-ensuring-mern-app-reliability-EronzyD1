// server/src/repo/bugRepo.js  (CommonJS)
const Bug = require('../models/Bug');

async function createBug(data) {
  return Bug.create(data);
}
async function getBugs() {
  // sort newest first; return plain objects in real DB, fine for mocks too
  return Bug.find().sort({ createdAt: -1 });
}
async function updateBug(id, data) {
  return Bug.findByIdAndUpdate(id, data, { new: true });
}
async function deleteBug(id) {
  return Bug.findByIdAndDelete(id);
}

module.exports = { createBug, getBugs, updateBug, deleteBug };
