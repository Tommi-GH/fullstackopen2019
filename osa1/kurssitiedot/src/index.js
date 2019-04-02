import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
    return(
    <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
        {props.name} {props.exercises}
      </p>
    )
}

const Content = (props) => {
    return(
        <div>
            <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
            <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
            <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
        </div>    
    )
}

const Total = (props) => {
return(
    <p>yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehtävää</p>
)
}


const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = {
    name: 'Reactin perusteet',
    exercises: 10
  }

  const part2 = {
    name: 'Tiedonvälitys propseilla',
    exercises: 7
  }

  const part3 = {
    name: 'Komponenttien tila',
    exercises: 14
  }

  const parts=[part1, part2, part3]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))