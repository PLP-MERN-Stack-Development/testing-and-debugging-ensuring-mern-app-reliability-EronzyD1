// server/src/app.js (CommonJS)
const express = require('express');
const cors = require('cors');

const bugs = require('./routes/bugs');   // must exist
const posts = require('./routes/posts'); // must exist

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/bugs', bugs);
app.use('/api/posts', posts);

module.exports = app;
