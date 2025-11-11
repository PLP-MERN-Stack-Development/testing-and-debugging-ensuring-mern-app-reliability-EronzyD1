// CommonJS utils: generate & verify JWTs used by routes/tests

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key'; // safe default for tests

function generateToken(user) {
  // Accepts a user doc/object or just an id
  const id =
    (user && (user._id?.toString?.() || user.id || user._id)) || user;

  const payload = { _id: id };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (_err) {
    // Tests expect this to fail safely
    return null;
  }
}

module.exports = { generateToken, verifyToken };
