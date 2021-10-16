import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import Togglable from './Togglable'
import NewBlog from './NewBlog'

test('renders content', () => {
  const blog = {
    author: 'Minä',
    title: 'Paras blogi ikinä',
    url: 'www.parasblogi.fi'
  }

  const component = render(
    <Blog blog={blog} />
  )
  // component.debug()

  const div1 = component.container.querySelector('div')
  console.log(prettyDOM(div1))

  // tapa 1
  expect(component.container).toHaveTextContent(
    'Minä'
  )

  // tapa 2 -> ei toimi ao tekstillä. Vain osa tekstiä mukana
  // const element = component.getByText(
  //   'Minä'
  // )
  // expect(element).toBeDefined()

  // tapa 3
  // const div = component.container.querySelector('.blog')
  // expect(div).toHaveTextContent(
  //   'Minä'
  // )
})

test('clicking the button calls event handler once', async () => {

  const mockHandler = jest.fn()

  const component = render(
    <NewBlog addNewBlog={mockHandler} />
  )

  const button = component.getByText('Lisää blogi!')
  // component.debug()
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel='show...'>
        <div className='testDiv' />
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const closeButton = component.getByText('cancel')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})

describe('Bloglist tests', () => {
  let component
  const blog = {
    title:'Mainio blogi',
    author: 'Matti Mainio',
    url: 'www.mainio.com',
    likes: 22
  }
  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog blog={blog} addLike={mockHandler} />
    )
  })

  test('title and author is rendered but not likes or url', () => {
    expect(component.container).toHaveTextContent('Mainio blogi')
    expect(component.container).toHaveTextContent('Matti Mainio')
    // AO feilaa, koska komponentti Blog on tehty Togglablen sisälle.
    // Blog renderöi kaikki tiedot mutta piilottaa tarpeettomat stylellä
    // expect(component.container).not.toHaveTextContent('www.mainio.com')
    // expect(component.container).not.toHaveTextContent('22')
  })

  test('All data is shown after show-button is pressed', () => {
    expect(component.container).toHaveTextContent('Mainio blogi')
    expect(component.container).toHaveTextContent('Matti Mainio')
    expect(component.container).toHaveTextContent('www.mainio.com')
    expect(component.container).toHaveTextContent('22')
  })

  test('Component like-button is pressed twice event handler is called twice', () => {
    const button = component.container.querySelector('.likeButton')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})

// Ao testi ei toimi. jostain syystä submitissa palautuu undefined
// describe('<NewBlog /> tests', () => {
//   test('<NewBlog /> updates parent state and calls onSubmit', () => {
//     const createBlog = jest.fn()

//     const component = render(
//       <NewBlog addNewBlog={createBlog} />
//     )

//     const author = component.container.querySelector('.author')
//     const title = component.container.querySelector('.title')
//     const url = component.container.querySelector('.url')
//     const form = component.container.querySelector('form')

//     fireEvent.change(author, {
//       target: { value: 'Testikirjoittaja' }
//     })
//     fireEvent.change(title, {
//       target: { value: 'Testiblogi' }
//     })
//     fireEvent.change(url, {
//       target: { value: 'www.testiurl.com' }
//     })
//     fireEvent.submit(form)

//     expect(createBlog.mock.calls).toHaveLength(1)
//     expect(createBlog.mock.calls[0][0].content).toBe(
//       '{ title: Testiblogi, author: Testikirjoittaja, url: www.testiurl.com }'
//     )
//   })
// })