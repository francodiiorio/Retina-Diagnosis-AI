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
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

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

    if(isLogin) {
      try {
        await sendRequest('http://localhost:3000/login/', 
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
          
        );
        auth.login();
      } catch (err) {

      }

    } else {
      try {
        await sendRequest('http://localhost:3000/register/',
          'POST',
          JSON.stringify({
            username: "prueba",
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          },
        );

        auth.login();
      } catch (err) {}
    }
  }

  return (
    <div className={styles.container}>
      <ErrorModal error={error} onClear={clearError}/>
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
