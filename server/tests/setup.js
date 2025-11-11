// ---- Mongoose ObjectId compatibility shim for classroom tests ----
const mongoose = require('mongoose');

// Preserve the real class
const RealObjectId = mongoose.Types.ObjectId;

// Make mongoose.Types.ObjectId callable without `new`
function ObjectIdCompat(id) {
  return new RealObjectId(id);
}
// Keep static helpers working
ObjectIdCompat.isValid = RealObjectId.isValid;

// Keep prototype so instanceof checks don’t break
ObjectIdCompat.prototype = RealObjectId.prototype;

// Install the shim
mongoose.Types.ObjectId = ObjectIdCompat;

process.env.JWT_SECRET = process.env.JWT_SECRET || 'unit-secret';
