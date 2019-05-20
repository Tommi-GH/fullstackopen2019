import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, findAllByTestId, fireEvent } from 'react-testing-library'
import Blog from '../components/Blog'

describe('<Blog />', () => {
    
it('before clicking, only basic information is visible', () => {
    const blog = {
        title: 'This is a title',
        author: 'A.U. Thor',
        likes: '27',
        url:'https://thorblog.com'
    }

    const component =  render(<Blog blog={blog}/>)

    expect(component.container).toHaveTextContent('This is a title')
    expect(component.container).toHaveTextContent('A.U. Thor')
    expect(component.container).not.toHaveTextContent('Likes: 27')
    expect(component.container).not.toHaveTextContent('https://thorblog.com')
})


it('after clicking, only all information is visible', () => {
    const blog = {
        title: 'This is a title',
        author: 'A.U. Thor',
        likes: '27',
        url:'https://thorblog.com'
    }

    const component =  render(<Blog blog={blog}/>)

    expect(component.container).toHaveTextContent('This is a title')
    expect(component.container).toHaveTextContent('A.U. Thor')
    expect(component.container).toHaveTextContent('Likes: 27')
    expect(component.container).toHaveTextContent('https://thorblog.com')
})
})
