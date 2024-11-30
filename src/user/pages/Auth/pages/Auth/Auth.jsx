import React, { useContext, useState } from "react";

import styles from "./Auth.module.css";
import Card from "../../../../../shared/components/UIElements/Card";
import Input from "../../../../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../../../shared/util/validators";
import { useForm } from "../../../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../../../Shared/hooks/http-hook";
import Button from "../../../../../Shared/components/FormElements/Button";
import { AuthContext } from "../../../../../Shared/context/auth-context";
import ErrorModal from "../../../../../Shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../../../Shared/components/UIElements/LoadingSpinner/LoadingSpinner";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          confirmPassword: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          confirmPassword: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLogin(prevMode => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (!isLogin && formState.inputs.password.value !== formState.inputs.confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }

    if (isLogin) {
      try {
        const responseData = await sendRequest(
          "http://localhost:3000/login/",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        console.log(responseData);
        auth.login(
          responseData.user.id,
          responseData.user.username,
          responseData.token,
          responseData.user.email,
        );
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:3000/register/",
          "POST",
          JSON.stringify({
            username: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        console.log(responseData);
        auth.login(
          responseData.user.id,
          responseData.user.username,
          responseData.token,
          responseData.user.email
        );
      } catch (err) {}
    }
  };

  return (
    <div className={styles.container}>
      <ErrorModal error={error} onClear={clearError} />
      <Card className={styles.authentication}>
        {isLoading && <LoadingSpinner asOverlay />}
        <img className={styles.imgAuth} src="logoTransparente.png" alt="preview" />
        <h2 className={styles.card__title}>
          {isLogin ? "Iniciar Sesión" : "Regístrate"}
        </h2>
        <form onSubmit={authSubmitHandler}>
          {!isLogin && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Nombre"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Ingresa un nombre"
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Ingresa un mail válido"
            onInput={inputHandler}
          />
          <Input
            element="input"
            type="password"
            id="password"
            label="Contraseña"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Ingrese al menos 8 caracteres"
            onInput={inputHandler}
          />
          {!isLogin && (
            <Input
              element="input"
              type="password"
              id="confirmPassword"
              label="Confirma contraseña"
              validators={[VALIDATOR_MINLENGTH(8)]}
              errorText="La contraseña debe matchear"
              onInput={inputHandler}
            />
          )}
          <Button type="submit" disabled={!formState.isValid}>
            {isLogin ? "Login" : "Registrate"}
          </Button>
        </form>
        <Button onClick={switchModeHandler}>
          {isLogin ? "Registrate" : "Login"}
        </Button>
      </Card>
    </div>
  );
};

export default Auth;
