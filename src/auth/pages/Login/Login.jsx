import React from 'react'

import './Login.css'

function Login() {
  return (
    <div className='login-form'>
      <Input type='text' label='Email' />
      <Input type='text' label='Password' />
      <button>Login</button>
    </div>
  )
}

export default Login
