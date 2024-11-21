import React, { useContext, useState } from "react";

import styles from './Auth.module.css';
import Card from '../../../shared/components/UIElements/Card'
import Input from '../../../shared/components/FormElements/Input/Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/util/validators'
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import Button from "../../../Shared/components/FormElements/Button";
import { AuthContext } from "../../../Shared/context/auth-context";
import ErrorModal from "../../../Shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../Shared/components/UIElements/LoadingSpinner/LoadingSpinner";

const Auth = () => {
  const auth = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
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

  const authSubmitHandler = async event => {
    event.preventDefault();
    setIsLoading(true)

    if(isLogin) {
      try {
        const response = await fetch('http://localhost:3000/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const responseData = await response.json()
        if (!response.ok){
          throw new Error(responseData.message)
        }
        setIsLoading(false)
        auth.login();
      } catch (err) {
        console.log(err)
        setIsLoading(false)
        setError(err.message || 'Algo salio mal, por favor intentalo de nuevo.')
      }
    } else {
      try {
        const response = await fetch('http://localhost:3000/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: "prueba",
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const responseData = await response.json()
        if (!response.ok){
          throw new Error(responseData.message)
        }
        setIsLoading(false)
        auth.login();
      } catch (err) {
        console.log(err)
        setIsLoading(false)
        setError(err.message || 'Algo salio mal, por favor intentalo de nuevo.')
      }
    }
  }

  const errorHandler = () => {
    setError(null)
  }

  return (
    <div className={styles.container}>
      <ErrorModal error={error} onClear={errorHandler}/>
    <Card className={styles.authentication}>
      {isLoading && <LoadingSpinner asOverlay/>}
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
