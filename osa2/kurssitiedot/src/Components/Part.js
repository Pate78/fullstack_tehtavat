import React from 'react'

const Part = ({ part, exercises }) => {
    console.log(part);
    return (
        <p>{part} {exercises}</p>
        // <div></div>
    )
}

export default Part