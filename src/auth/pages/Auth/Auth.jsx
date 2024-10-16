import React, { useState } from "react";

import styles from './Auth.module.css';
import Card from '../../../shared/components/UIElements/Card'
import Input from '../../../shared/components/FormElements/Input/Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/util/validators'
import { useForm } from "../../../shared/hooks/form-hook";
import Button from "../../../shared/components/FormElements/Button";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      valuse: '',
      isValid: false
    }
  }, false)

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData({
        ...formState.inputs,
        name: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        }
      }, false)
    }
    setIsLogin(prevMode => !prevMode);
  }

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  }
  return (
    <div className={styles.container}>
    <Card className={styles.authentication}>
      <h2 className={styles.card__title}>Iniciar Sesión</h2>
      <form onSubmit={authSubmitHandler}>
        {!isLogin && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Enter a name"
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Enter a valid email."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Enter at least 5 characters"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLogin ? 'Login' : 'Signup'}
        </Button>
      </form>
      <Button onClick={switchModeHandler}>
        {isLogin ? 'Signup' : 'Login'}
      </Button>
    </Card>
    </div>
  )
};

export default Auth;
