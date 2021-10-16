import React from "react"

const LoginForm = ({
    handleSubmit, 
    handleLoginNameChange, 
    handlePasswordChange,
    username,
    password }) => {

   
    return (
        <div>
            Lokitus:<br />
            username: {username} <br />
            password: {password} <br />
            <form onSubmit={handleSubmit}>
                Käyttäjätunnus: <input type='text' value={username} onChange={handleLoginNameChange}></input><br />
                Salasana: <input type='password' value={password} onChange={handlePasswordChange}></input><br />
                <button type='submit'>Kirjaudu</button>
            </form>
        </div>
    )
}

export default LoginForm