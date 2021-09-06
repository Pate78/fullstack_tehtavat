import React, { useState } from 'react';
import './App.css';

function App() {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const changeGood = () => {
    setGood(good+1)
  }

  const changeBad = () => {
    setBad(bad+1)
  }

  const changeNeutral = () => {
    setNeutral(neutral+1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <p>
        <Button handleClick={changeGood} name='Good' />
        <Button handleClick={changeBad} name='Bad' />
        <Button handleClick={changeNeutral} name='Neutral' />
      </p>
      <Statiscics
        good={good}
        bad={bad}
        neutral={neutral}
      />
    </div>
  );
}



const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.name}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )


  //   // {props.text}
  //   // <div>
  //   //   {props.good}<br />
  //   //   {props.bad}<br />
  //   //   {props.neutral} <br />
  //   //   {props.good+props.bad+props.neutral} <br />
  //   //   {(props.good-props.bad) !== 0 ? (props.good-props.bad)/(props.good+props.bad+props.neutral):<></>} <br />
  //   //    {(props.good+props.bad+props.neutral) !== 0 ? props.good/(props.good+props.bad+props.neutral):<></>}<br />
  //   // </div>
}

const Statiscics = (props) => {

  const average = (props.good-props.bad) !== 0 ? (props.good-props.bad)/(props.good+props.bad+props.neutral): 0
  const all = props.good+props.bad+props.neutral
  const positive = (props.good+props.bad+props.neutral) !== 0 ? props.good/(props.good+props.bad+props.neutral):0


  if(props.good !==0 || props.bad !==0 || props.neutral !==0) {
    return (    
      <div className="Stats">
        <h1>Statistics</h1>
        <table>
          <thead></thead>
          <tbody>
            <StatisticLine text='Good' value={props.good} />
            <StatisticLine text='Bad' value={props.bad} />
            <StatisticLine text='Neutral' value={props.neutral} />
            <StatisticLine text='All' value={all} />
            <StatisticLine text='Average' value={average} />
            <StatisticLine text='Positive' value={positive} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (    
      <h1>No feedback given</h1>
    );
  }

}

export default App;
