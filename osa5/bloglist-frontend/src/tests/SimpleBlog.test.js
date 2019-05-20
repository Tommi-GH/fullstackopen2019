import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, findAllByTestId, fireEvent } from 'react-testing-library'
import SimpleBlog from '../components/SimpleBlog'

afterEach(cleanup)

test('render title, author & likes', () => {
  const blog = {
    title: 'This is a title',
    author: 'A.U. Thor',
    likes: '27'
  }

  const component = render(<SimpleBlog blog={blog} />)

  expect(component.container).toHaveTextContent('This is a title')
  expect(component.container).toHaveTextContent('A.U. Thor')
  expect(component.container).toHaveTextContent('blog has 27 likes')
})

test('clicking the like button twice calls the function twice', () => {
  const blog = {
    title: 'This is a title',
    author: 'A.U. Thor',
    likes: '27'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  const button = getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})