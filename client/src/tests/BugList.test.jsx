import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BugList from '../components/BugList.jsx'

test('BugList renders and handles clicks', async () => {
  const user = userEvent.setup()
  const bugs = [{ _id: '1', title: 'A', status: 'open', priority: 'low' }]
  const onAdvance = vi.fn()
  const onDelete = vi.fn()
  render(<BugList bugs={bugs} onAdvance={onAdvance} onDelete={onDelete} />)

  await user.click(screen.getByRole('button', { name: /advance status/i }))
  expect(onAdvance).toHaveBeenCalledWith('1')

  await user.click(screen.getByRole('button', { name: /delete/i }))
  expect(onDelete).toHaveBeenCalledWith('1')
})