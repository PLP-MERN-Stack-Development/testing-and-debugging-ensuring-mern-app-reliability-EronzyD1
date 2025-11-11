// server/src/server.js
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const app = require('./app'); // <- CommonJS import

mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

(async () => {
  try {
    if (MONGODB_URI) {
      await mongoose.connect(MONGODB_URI);
      console.log('MongoDB connected');
    } else {
      console.warn('[WARN] MONGODB_URI is not set. The app can run, but DB calls will fail.');
    }
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
