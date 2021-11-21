import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
// import { vote } from './reducers/anecdoteReducer'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  // const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => 
      {
          console.log('Found anecdotes: ', anecdotes )
          return dispatch(initializeAnecdotes(anecdotes))
      }
    )
  },[dispatch])



  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
      {/* {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteFor(anecdote.id)}>vote</button>
          </div>
        </div>
      )} */}
      {/* <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form> */}
    </div>
  )
}

export default App