import React from 'react'

const Total = ({ course }) => {

    return (
        <div>
            <b>total of {course.parts.reduce((sum, part) => sum + part.exercises,0)} exercises
            </b>
        </div>
            // {/* // <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p> */}
    )
}

export default Total