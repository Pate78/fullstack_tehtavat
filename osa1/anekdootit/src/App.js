import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const getNumber = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
    // console.log(votes);
  }

  const vote = () => {
    // console.log(votes[selected]);
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    console.log('selectMostVoted -> votes: ', votes);
    for(let i=0; i<votes.length; i++) {
      console.log('mostVoted:',mostVoted);
      // console.log('votes[i] >= votes[i+1]:',votes[i] >= votes[i+1]);
      // console.log('votes[i] >= mostVoted:',votes[i] >= mostVoted);
      if (votes[i] >= votes[mostVoted]) {
        console.log('votes[i]: ',votes[i]);
        setMostVoted(i)
      }
  }

 
    // console.log('Total votes: ', votes[index]);
    // console.log('mostVoted: ', mostVoted);
    // console.log('Anecdote: ', anecdotes[index]);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br />
       {votes[selected] !== undefined ? 'has '+votes[selected]+' votes':<></>} <br />
      <button onClick={vote}>Vote</button>
      <button onClick={getNumber}>Next anecdote</button><br />
        <h1>Anecdote with most votes</h1>
      {anecdotes[mostVoted]}
      {votes[mostVoted]}

    </div>
  )
}

export default App