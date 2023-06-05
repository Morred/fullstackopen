import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = (props) => (
  <p>{props.tag} {props.value || 0}</p>
)

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;

  if (total === 0) {
    return 'No feedback given';
  } else {
    return(
      <div>
        <Display tag={'good'} value={good} />
        <Display tag={'neutral'} value={neutral} />
        <Display tag={'bad'} value={bad} />
        <Display tag={'all'} value={total}/>
        <Display tag={'average'} value={(good*1 + neutral*0 + bad*-1)/total}/>
        <Display tag={'positive'} value={(good/total || 0)*100 + '%'}/>
      </div>
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
