// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

function buildLoginForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const user = userEvent.setup()
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const {username, password} = buildLoginForm()

  await user.type(screen.getByLabelText('Username'), username)
  await user.type(screen.getByLabelText('Password'), password)
  fireEvent.click(screen.getByRole('button', {name: /submit/i}))
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
