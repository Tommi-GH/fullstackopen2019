import React from 'react'
import 'jest-dom/extend-expect'
import { render, wait } from 'react-testing-library'
jest.mock('../services/blogs')
import App from '../App'



describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector('.loginForm'))

    expect(component.container).toHaveTextContent('Username')
    expect(component.container).toHaveTextContent('Password')
    expect(component.container).not.toHaveTextContent('React patterns')
  })

  it('if user is logged, blogs are rendered', async () => {
    const component = render(
      <App />
    )

    const user = {
      username: 'tester',
      token: '1231231214',
      firstName: 'Teuvo',
      lastName: 'Testaaja'
    }

    localStorage.setItem('user', JSON.stringify(user))

    component.rerender(<App />)

    const { getByText } = component
    await wait(() => getByText('Blogs'))

    const blogs = component.querySelectorAll('.blog')

    expect (blogs.length).toBe(7)
    expect(component.container).not.toHaveTextContent('Username')
    expect(component.container).not.toHaveTextContent('Password')
    expect(component.container).toHaveTextContent('React patterns')
    expect(component.container).toHaveTextContent('Blogi otsikko')
  })
})