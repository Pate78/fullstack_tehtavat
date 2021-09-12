import React from "react";

const Contacts = (props) => {
    return (
        <div>
        <h2>Numbers</h2>
        {props.persons
            .filter(p => p.name.toLowerCase().includes(props.filter.toLowerCase()))
            .map(p => <p key={p.name}>{p.name} {p.number}</p>)}
        </div>
    )
}

export default Contacts