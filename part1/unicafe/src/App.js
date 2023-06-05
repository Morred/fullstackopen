import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = (props) => (
  <p>{props.tag} {props.value || 0}</p>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + neutral + bad;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={'good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'bad'} />

      <h1>statistics</h1>
      <Display tag={'good'} value={good} />
      <Display tag={'neutral'} value={neutral} />
      <Display tag={'bad'} value={bad} />
      <Display tag={'all'} value={total}/>
      <Display tag={'average'} value={(good*1 + neutral*0 + bad*-1)/total}/>
      <Display tag={'positive'} value={(good/total || 0) + '%'}/>
    </div>
  )
}

export default App
