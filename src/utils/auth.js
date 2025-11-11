// src/utils/auth.js  (root)
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key';

function generateToken(user) {
  const id =
    user?._id?.toString?.() ??
    user?.id ??
    (typeof user === 'string' ? user : undefined);

  if (!id) throw new Error('generateToken requires a user with id/_id');

  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { generateToken, JWT_SECRET };
