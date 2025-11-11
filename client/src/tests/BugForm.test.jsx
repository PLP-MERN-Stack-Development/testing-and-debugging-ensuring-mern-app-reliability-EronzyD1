import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BugForm from '../components/BugForm.jsx'

test('BugForm validates title and calls onCreate', async () => {
  const user = userEvent.setup()
  const onCreate = vi.fn().mockResolvedValue({})
  render(<BugForm onCreate={onCreate} />)

  const submit = screen.getByRole('button', { name: /report bug/i })
  expect(submit).toBeDisabled()

  const titleInput = screen.getByLabelText('title-input')
  await user.type(titleInput, 'Crash on load')
  expect(submit).toBeEnabled()

  await user.click(submit)
  expect(onCreate).toHaveBeenCalledWith({ title: 'Crash on load', description: '', priority: 'low' })
})