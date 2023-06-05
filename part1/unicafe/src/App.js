import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tr><td>{props.text}</td><td>{props.value || 0}</td></tr>
)

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;

  if (total === 0) {
    return 'No feedback given';
  } else {
    return(
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total}/>
          <StatisticLine text="average" value={(good*1 + neutral*0 + bad*-1)/total}/>
          <StatisticLine text="positive" value={(good/total || 0)*100 + '%'}/>
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text={'good'} />
        <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
        <Button handleClick={() => setBad(bad + 1)} text={'bad'} />
      </div>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
