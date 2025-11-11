// Minimal request logger with a toggle via DEBUG_HTTP=1
module.exports = function requestLogger(req, res, next) {
  if (process.env.DEBUG_HTTP === '1' && process.env.NODE_ENV !== 'test') {
    // safe shallow log (avoid huge bodies)
    const { method, originalUrl } = req;
    const body = req.body && Object.keys(req.body).length ? req.body : undefined;
    // eslint-disable-next-line no-console
    console.debug('[HTTP]', method, originalUrl, body ? { body } : '');
  }
  next();
};
