import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ status }) => {
    console.log(status)
    return (
        <div>
            <h1>Statistiikka</h1>
            <p>Hyvä {status.good}</p>
            <p>Meh {status.neutral}</p>
            <p>Huono {status.bad}</p>
            <p>Yhteensä {status.total}</p>
            <p>Keskiarvo {status.mean}</p>
            <p>Positiivisia {status.positive}%</p>
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

    let total = good + neutral + bad
    let mean = (good-bad)/total
    let positive = (good/total)*100
    let status = {good, neutral, bad, total, mean, positive}

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
            <Statistics status={status} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)