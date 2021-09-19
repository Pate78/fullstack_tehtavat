import React from "react";

const Contacts = (props) => {
    console.log(props)
    if (props === undefined) {
        return null
    }
    return (
        <div>
        <h2>Numbers</h2>
        {props.persons !== undefined ? props.persons
            .filter(p => {
                console.log(props);
                // console.log('p.name: ',p.name);
                return (
                    p.name
                        .toLowerCase()
                        .includes(props.filter
                            .toLowerCase()))
            })
            .map(p => <p key={p.name}>{p.name} {p.number} <button onClick={() => props.handleDelete(p.id)}>delete</button></p>):<></>}
        </div>
    )
}

export default Contacts