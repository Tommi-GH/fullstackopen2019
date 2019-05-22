import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, act, waitForElement } from 'react-testing-library'
jest.mock('../services/blogs')
import App from '../App'

afterEach(cleanup)

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    let component

    act(() => {
      component = render(
        <App />
      )
    })

    expect(component.container).toHaveTextContent('Username')
    expect(component.container).toHaveTextContent('Password')
    expect(component.container).not.toHaveTextContent('React patterns')
  })


  it('if user is logged, blogs are rendered', async () => {
    const user = {
      token: '1231231214',
      firstName: 'Teuvo',
      lastName: 'Testaaja'
    }

    localStorage.setItem('user', JSON.stringify(user))

    let component

    act(() => {
      component = render(
        <App />
      )
    })

    await waitForElement(() => component.container.querySelector('.blog'))

    const blogs = component.container.querySelectorAll('.blog')

    expect (blogs.length).toBe(7)
    expect(component.container).not.toHaveTextContent('Username')
    expect(component.container).not.toHaveTextContent('Password')
    expect(component.container).toHaveTextContent('React patterns')
    expect(component.container).toHaveTextContent('Blogi otsikko')
  })
})