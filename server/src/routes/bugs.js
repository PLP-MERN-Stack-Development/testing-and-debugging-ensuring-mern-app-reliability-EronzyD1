// server/src/routes/bugs.js
const express = require('express');
const repo = require('../repo/bugRepo');
const { validateBugInput } = require('../utils/validateBug');

const router = express.Router();

// GET /api/bugs
router.get('/', async (_req, res) => {
  const list = await repo.getBugs();
  return res.status(200).json(list);
});

// POST /api/bugs  (NO AUTH; must 400 on invalid)
router.post('/', async (req, res) => {
  // hard check for title to satisfy classroom test expecting 400
  if (!req.body || !req.body.title || !String(req.body.title).trim()) {
    return res.status(400).json({ error: { message: 'Validation failed' } });
  }

  // keep your existing validator too
  const { error } = validateBugInput(req.body);
  if (error) {
    return res.status(400).json({ error: { message: 'Validation failed' } });
  }

  const created = await repo.createBug(req.body);
  return res.status(201).json(created);
});

// PATCH /api/bugs/:id  (200 or 404)
router.patch('/:id', async (req, res) => {
  const updated = await repo.updateBug(req.params.id, req.body || {});
  if (!updated) return res.status(404).json({ error: 'Not found' });
  return res.status(200).json(updated);
});

// DELETE /api/bugs/:id  (NO AUTH; 204)
router.delete('/:id', async (req, res) => {
  await repo.deleteBug(req.params.id);
  return res.status(204).send();
});

module.exports = router;
