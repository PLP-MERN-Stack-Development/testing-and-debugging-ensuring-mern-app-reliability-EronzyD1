import React, { useEffect, useState } from 'react';
import { fetchBugs, createBug, updateBug, deleteBug } from './api.js';
import BugForm from './components/BugForm.jsx';
import BugList from './components/BugList.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { INTENTIONAL_STATE_BUG } from './debugToggles';

export default function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchBugs();
      setBugs(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(bug) {
    const created = await createBug(bug);
    setBugs(prev => {
      const next = [created, ...prev];
      if (INTENTIONAL_STATE_BUG) {
        return next.slice(1); // drop newest to simulate a confusing UI bug
      }
      return next;
    });
  }

  async function handleAdvance(id) {
    const target = bugs.find(b => b._id === id);
    const cycle = { 'open': 'in-progress', 'in-progress': 'resolved', 'resolved': 'resolved' };
    const updated = await updateBug(id, { status: cycle[target.status] });
    setBugs(prev => prev.map(b => b._id === id ? updated : b));
  }

  async function handleDelete(id) {
    await deleteBug(id);
    setBugs(prev => prev.filter(b => b._id !== id));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <ErrorBoundary>
      <div style={{ maxWidth: 720, margin: '40px auto', padding: 16 }}>
        <h1>MERN Bug Tracker</h1>
        <BugForm onCreate={handleCreate} />
        <BugList bugs={bugs} onAdvance={handleAdvance} onDelete={handleDelete} />
      </div>
    </ErrorBoundary>
  );
}