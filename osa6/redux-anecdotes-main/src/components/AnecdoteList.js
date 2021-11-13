import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'


const Anecdote = ({ anecdote , handleVote}) => {

    return(
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    return(
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote}
                handleVote={() => dispatch(vote(anecdote.id))}/>
          )}
        </div>
    )
}

export default AnecdoteList