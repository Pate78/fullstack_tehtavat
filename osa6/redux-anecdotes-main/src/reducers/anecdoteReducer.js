const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      console.log('action.data.id: ', action.data.id)
      // console.log('action.data.votes: ', action.data.votes)
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes+1
      }
      console.log('changedAnecdote: ',changedAnecdote)
      return state.map(a => a.id !== id ? a : changedAnecdote)
    case 'ADD':
      console.log('anecdoteReducer -> ADD -> action.data.anecdote: ',action.data.anecdote)
      return [...state, { content: action.data.anecdote.content, votes:0, id: action.data.anecdote.id }]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  console.log('anecdoteReducer: initializing anecdotes: ', anecdotes)
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: {id}
  }
}

export const add = (anecdote) => {
  return {
    type: 'ADD',
    data: {anecdote}
  }
}

export default anecdoteReducer