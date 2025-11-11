// client/src/tests/App.integration.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the API layer with Jest (not Vitest)
jest.mock('../api.js', () => ({
  fetchBugs: jest.fn(),
  createBug: jest.fn(),
  updateBug: jest.fn(),
  deleteBug: jest.fn(),
}));

import { fetchBugs, createBug } from '../api.js';

beforeEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

test('loads bugs and creates a new one', async () => {
  // initial list
  fetchBugs.mockResolvedValueOnce([
    { _id: '1', title: 'Existing bug', status: 'open', priority: 'low' },
  ]);

  render(<App />);

  // existing bug shows up
  expect(await screen.findByText(/existing bug/i)).toBeInTheDocument();

  // create new bug
  createBug.mockResolvedValueOnce({
    _id: '2',
    title: 'New bug',
    status: 'open',
    priority: 'low',
  });

  const titleInput = screen.getByLabelText(/title/i);
  await userEvent.clear(titleInput);
  await userEvent.type(titleInput, 'New bug');

  const submit = screen.getByRole('button', { name: /report bug/i });
  await userEvent.click(submit);

  // optimistic add or re-fetch result should show
  expect(await screen.findByText(/new bug/i)).toBeInTheDocument();
});
