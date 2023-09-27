import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders content', () => {
    const blog = {
      title: 'Testi3000',
      author: 'Meikämake'
    }
  
    render(<Blog blog={blog} />)

    const element = screen.getByText('Testi3000')
    expect(element).toBeDefined()
  })

  test('clicking the button calls event handler twice', async () => {
    const blog = {
      title: 'Testi3000',
      author: 'Meikämake'
    }
  
    const mockHandler = jest.fn()
  
    render(
      <Blog blog={blog} likeBlog={mockHandler} />
    )
  
    const user = userEvent
    const button = screen.getByText('Like')
    await user.dblClick(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent
    const createBlog = jest.fn()
  
    render(<BlogForm createBlog={createBlog} />)
  
    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')
  
    await user.type(inputs[0], 'testing a form...')
    await user.click(sendButton)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toStrictEqual({"author": "", "likes": 0, "title": "testing a form...", "url": ""})
  })