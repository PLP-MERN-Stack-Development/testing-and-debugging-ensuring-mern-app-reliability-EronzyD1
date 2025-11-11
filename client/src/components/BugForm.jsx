import React, { useState } from 'react';

export default function BugForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) { setError('Title is required'); return; }
    try {
      await onCreate({ title, description, priority });
      setTitle(''); setDescription(''); setPriority('low');
    } catch (err) {
      setError(err.message || 'Failed');
    }
  }

  return (
    <form onSubmit={submit} aria-label="bug-form" style={{ display: 'grid', gap: 8, marginBottom: 24 }}>
      {error && <div role="alert">Error: {error}</div>}
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        aria-label="title-input"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <select value={priority} onChange={e => setPriority(e.target.value)} aria-label="priority-select">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" disabled={!title.trim()}>Report Bug</button>
    </form>
  );
}