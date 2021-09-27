import React, { useState } from "react"

const Login = ({ handleLogin, username, setUsername, password, setPassword, user, handleLogout }) => {

    const handleLoginNameChange = event => setUsername(event.target.value)
    const handlePasswordChange = event => setPassword(event.target.value)

    


    return (
        <div>
            Lokitus:<br />
            username: {username} <br />
            password: {password} <br />
            <form onSubmit={handleLogin}>
                Käyttäjätunnus: <input type='text' value={username} onChange={handleLoginNameChange}></input><br />
                Salasana: <input type='password' value={password} onChange={handlePasswordChange}></input><br />
                <button type='submit'>Kirjaudu</button>
            </form>
        </div>
    )
}

export default Login