const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/auth');

function auth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [type, token] = header.split(' ');
    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = auth;
