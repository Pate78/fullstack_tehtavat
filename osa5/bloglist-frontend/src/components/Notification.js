import React from 'react'

// eslint-disable-next-line no-irregular-whitespace
const Notification = ({ message }) => {
  return (
    <div className='error'>
      {message}
    </div>
  )
}

export default Notification