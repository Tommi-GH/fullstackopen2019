import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad }) => {

    const total = good + neutral + bad
    const mean = (good-bad)/total
    const positive = (good/total)*100

    return (
        <div>
            <h1>Statistiikka</h1>
            <p>Hyvä {good}</p>
            <p>Meh {neutral}</p>
            <p>Huono {bad}</p>
            <p>Yhteensä {total}</p>
            <p>Keskiarvo {mean}</p>
            <p>Positiivisia {positive}%</p>
        </div>
    )
}

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

    const handleClickGood = () => {
        setGood(good + 1)
    }

    const handleClickNeutral = () => {
        setNeutral(neutral + 1)
    }

    const handleClickBad = () => {
        setBad(bad + 1)
    }


    return (
        <div>
            <h1>Anna palautetta</h1>
            <Button handleClick={handleClickGood} text="Hyvä" />
            <Button handleClick={handleClickNeutral} text="Meh" />
            <Button handleClick={handleClickBad} text="Huono" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)