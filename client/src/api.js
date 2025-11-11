// client/src/api.js
const BASE =
  process.env.VITE_API_URL ||
  'http://localhost:5000'; // default for tests

export async function fetchBugs() {
  const r = await fetch(`${BASE}/api/bugs`);
  if (!r.ok) throw new Error('Failed to fetch bugs');
  return r.json();
}

export async function createBug(payload) {
  const r = await fetch(`${BASE}/api/bugs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error('Failed to create bug');
  return r.json();
}

export async function updateBug(id, payload) {
  const r = await fetch(`${BASE}/api/bugs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error('Failed to update bug');
  return r.json();
}

export async function deleteBug(id) {
  const r = await fetch(`${BASE}/api/bugs/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('Failed to delete bug');
  return true;
}
