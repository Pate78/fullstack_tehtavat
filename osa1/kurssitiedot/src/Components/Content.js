import React from 'react'
import Part from './Part'

const Content = (props) => {
    console.log(props);
    return (
        <div>
            <Part part={props.part1.name}/>
            <Part part={props.part2.name}/>
            <Part part={props.part3.name}/>
        </div>
    )
}

export default Content