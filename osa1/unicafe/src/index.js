import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad }) => {

    const total = good + neutral + bad

    if (total === 0){
        return (
            <p>Ei yhtään palautetta annettu</p>
        )
    }

    const mean = (good - bad) / total
    const positive = ((good / total) * 100) + " %"

    return (
        <div>
            <h1>Statistiikka</h1>
            <Statistic text="Hyvä" value={good}/>
            <Statistic text="Meh" value={neutral}/>
            <Statistic text="Huono" value={bad}/>
            <Statistic text="Yhteensä" value={total}/>
            <Statistic text="Keskiarvo" value={mean}/>
            <Statistic text="Positiivisia" value={positive}/>
        </div>
    )
}

const Statistic = ({text, value}) => {

    return(
        <p>{text}: {value}</p>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


const App = () => {

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