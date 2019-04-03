import React from 'react'

const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course

const Header = ({ name }) => (
    <h1>{name}</h1>
)

const Content = ({ parts }) => {

    const partElements = () => parts.map(part =>
        <Part
            key={part.id}
            part={part}
        />
    )

    return (
        <div>
            {partElements()}
        </div>
    )
}

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Total = ({ parts }) => {



    const total = parts.reduce((total, part) => total + part.exercises, 0)

    return (
        <p>
            yhteensä {total} tehtävää
        </p>
    )
}