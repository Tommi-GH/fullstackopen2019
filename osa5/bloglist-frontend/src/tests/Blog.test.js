import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, findAllByTestId, fireEvent } from 'react-testing-library'
import Blog from '../components/Blog'

describe('<Blog />', () => {

  let component
  const blog = {
    title: 'This is a title',
    author: 'A.U. Thor',
    likes: '27',
    url: 'https://thorblog.com',
    user: {
      firstName: 'etunimi',
      lastName: 'sukunimi',
      username: 'käyttäjänimi',
      id: '1234'
    }
  }

  beforeEach(() => {
    component = render(<Blog blog={blog} />)
  })

  it('before clicking, only basic information is visible', () => {
    const div = component.container.querySelector('.additionalInfo')
    expect(div).toHaveStyle('display:none')
  })


  it('after clicking, all information is visible', () => {

    const div = component.container.querySelector('.additionalInfo')
    fireEvent.click(div)
    expect(div).not.toHaveStyle('display:none')
  })
})
