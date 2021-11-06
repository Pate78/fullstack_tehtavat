import React from 'react'
import PropTypes from 'prop-types'

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
                Käyttäjätunnus: <input type='text' id='username' value={username} onChange={handleLoginNameChange}></input><br />
                Salasana: <input type='password' id='password' value={password} onChange={handlePasswordChange}></input><br />
        <button id='login-button' type='submit'>Kirjaudu</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleLoginNameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm