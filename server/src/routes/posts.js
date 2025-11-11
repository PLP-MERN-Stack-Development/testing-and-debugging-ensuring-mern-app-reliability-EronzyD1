// server/src/routes/posts.js
const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const { verifyToken } = require('../utils/auth');

const router = express.Router();

/** ---- helpers ---- */
function validatePostBody(body = {}) {
  const { title, content, category } = body;
  if (!title || !content || !category) return false;
  // If category provided, accept either ObjectId or string-ish ObjectId
  if (!mongoose.isValidObjectId(String(category))) return false;
  return true;
}

function authRequired(req, res, next) {
  const h = req.headers['authorization'] || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = verifyToken(token); // should decode to {_id: ...} or {id: ...}
    return next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

/** ---- routes ---- */

// Create post
// IMPORTANT: Validate FIRST (so invalid body -> 400 even without auth), then require auth
router.post('/', async (req, res) => {
  if (!validatePostBody(req.body)) {
    return res.status(400).json({ error: 'Validation failed' });
  }

  // now enforce auth
  const h = req.headers['authorization'] || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  let user;
  try {
    user = verifyToken(token);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const authorId = user._id || user.id;
  const slug =
    req.body.slug ||
    String(req.body.title).toLowerCase().trim().replace(/\s+/g, '-');

  const created = await Post.create({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    author: authorId,
    slug,
  });
  return res.status(201).json(created);
});

// List posts (with optional category filter + pagination)
router.get('/', async (req, res) => {
  const { category, page = '1', limit = '10' } = req.query;
  const filter = {};
  if (category && mongoose.isValidObjectId(String(category))) {
    filter.category = category;
  }

  const p = Math.max(parseInt(page, 10) || 1, 1);
  const l = Math.max(parseInt(limit, 10) || 10, 1);

  const posts = await Post.find(filter)
    .sort({ createdAt: -1 })
    .skip((p - 1) * l)
    .limit(l);

  return res.status(200).json(posts);
});

// Get one
router.get('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ error: 'Not found' });
  }
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  return res.status(200).json(post);
});

// Update (auth + author-only)
router.put('/:id', authRequired, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ error: 'Not found' });
  }
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });

  const userId = (req.user && (req.user._id || req.user.id)) || '';
  if (String(post.author) !== String(userId)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const updates = {
    ...(req.body.title ? { title: req.body.title } : {}),
    ...(req.body.content ? { content: req.body.content } : {}),
    ...(req.body.category ? { category: req.body.category } : {}),
  };
  const updated = await Post.findByIdAndUpdate(req.params.id, updates, {
    new: true,
  });
  return res.status(200).json(updated);
});

// Delete (auth + author-only)
router.delete('/:id', authRequired, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ error: 'Not found' });
  }
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });

  const userId = (req.user && (req.user._id || req.user.id)) || '';
  if (String(post.author) !== String(userId)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  await Post.findByIdAndDelete(req.params.id);
  return res.status(200).json({ ok: true });
});

module.exports = router;
