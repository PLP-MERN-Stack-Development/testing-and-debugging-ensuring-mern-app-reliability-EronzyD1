import React from 'react';

export default function BugList({ bugs, onAdvance, onDelete }) {
  if (!bugs.length) return <p>No bugs yet.</p>;

  return (
    <ul aria-label="bug-list" style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
      {bugs.map(b => (
        <li key={b._id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
          <strong>{b.title}</strong> — <em>{b.status}</em> — <small>{b.priority}</small>
          {b.description && <p>{b.description}</p>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => onAdvance(b._id)}>Advance Status</button>
            <button onClick={() => onDelete(b._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}