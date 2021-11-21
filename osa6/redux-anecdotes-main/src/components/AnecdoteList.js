import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'
import { changeNotification } from "../reducers/notificationReducer"


const Anecdote = ({ anecdote , handleVote }) => {

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
    const anecdotes = useSelector(state => state.anecdotes)

    const handleVote = (id) => {
        const votedFor = anecdotes.filter(a => a.id === id)
        console.log('votedFor:',votedFor)
        dispatch(changeNotification('Voted for: ' + votedFor[0].content))
        setTimeout(()=> {
            dispatch(changeNotification(''))
        },5000)
        dispatch(vote(id))
    }
    
    return(
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote}
                handleVote={handleVote}/>
          )}
        </div>
    )


}

export default AnecdoteList