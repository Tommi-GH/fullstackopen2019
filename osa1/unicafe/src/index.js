import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({ status }) => (

    <div>
        <h1>Statistiikka</h1>
        <p>Good {status[0]}</p>
        <p>Neutral {status[1]}</p>
        <p>Bad {status[2]}</p>
    </div>

)

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [status, setStatus] = useState([good, neutral, bad])

    const handleClickGood = () => {
        console.log(good)
        setGood(good + 1)
        setStatus([good, neutral, bad])
        console.log(good)
    }

    const handleClickNeutral = () => {
        setNeutral(neutral + 1)
        setStatus([good, neutral, bad])
    }

    const handleClickBad = () => {
        setBad(bad + 1)
        setStatus([good, neutral, bad])
    }

    return (
        <div>
            <Display status={status} />
            <Button handleClick={handleClickGood} text="Good" />
            <Button handleClick={handleClickNeutral} text="Neutral" />
            <Button handleClick={handleClickBad} text="Bad" />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)