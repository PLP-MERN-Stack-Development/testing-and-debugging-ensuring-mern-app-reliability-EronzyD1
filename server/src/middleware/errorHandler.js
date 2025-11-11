export function notFound(req, res, next) {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  err.status = 404;
  next(err);
}

export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Server error';
  if (process.env.NODE_ENV !== 'test') {
    console.error('[ERROR]', status, message);
  }
  res.status(status).json({
    error: {
      message,
      status,
    },
  });
}