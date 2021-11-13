import React from 'react'
import { add } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

  
  const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        console.log('add Anecdote clicked. event.target.newAnecdote: ', event.target.newAnecdote.value)
        dispatch(add(event.target.newAnecdote.value))
    }

    return (
      <form onSubmit={addAnecdote}>
        <input name='newAnecdote' />
        <button type='submit'>Add new anecdote</button>
      </form>
    )
  }

export default AnecdoteForm