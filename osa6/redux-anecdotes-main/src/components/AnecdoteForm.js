import React from 'react'
import { add } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

  
  const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        console.log('AnecdoteForm: add Anecdote clicked. event.target.newAnecdote: ', event.target.newAnecdote.value)
        const savedAnecdote = await anecdoteService.add(event.target.newAnecdote.value)
        console.log('AnecdoteForm saved anecdote: ', savedAnecdote)
        dispatch(add(savedAnecdote))
    }

    return (
      <form onSubmit={addAnecdote}>
        <input name='newAnecdote' />
        <button type='submit'>Add new anecdote</button>
      </form>
    )
  }

export default AnecdoteForm