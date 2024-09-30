import React, { useCallback } from 'react'

import './Register.css'
import Input from '../../../shared/components/FormElements/Input/Input'
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../../shared/util/validators.js'

function Register() {
  const emailInputHandler = useCallback((id, value, isValid) => { }, [])
  const passwordInputHandler = useCallback((id, value, isValid) => { }, [])

  return (
    <div className='register-form'>
      <Input
        id='email'
        type='text'
        label='Email'
        element='input'
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid Email"
        onInput={emailInputHandler}
      />
      <Input
        id='password'
        type='text'
        label='Password'
        element='input'
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Password"
        onInput={emailInputHandler}
      />
      <button>Register</button>
    </div>
  )
}

export default Register
