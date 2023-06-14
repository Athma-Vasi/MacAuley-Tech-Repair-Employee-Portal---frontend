import {
  Text,
  TextInput,
  PasswordInput,
  Title,
  Alert,
  Button,
  Flex,
} from '@mantine/core';
import { useRef, useEffect, useReducer } from 'react';
import { initialLoginState, loginAction, loginReducer } from './state';
import { Link } from 'react-router-dom';

function Login() {
  const [{ username, password, errorMessage, isSuccessful }, loginDispatch] =
    useReducer(loginReducer, initialLoginState);

  const usernameRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // sets focus on username input on first render
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  // clears error message on username or password change
  useEffect(() => {
    loginDispatch({
      type: loginAction.setErrorMessage,
      payload: '',
    });
  }, [username, password]);

  const displayError = (
    <Alert
      title="Warning!"
      color="yellow"
      className={errorMessage ? '' : 'offscreen'}
    >
      <Text ref={errorRef} aria-live="assertive">
        {errorMessage}
      </Text>
    </Alert>
  );

  const displaySuccess = (
    <Alert
      title="Success!"
      color="green"
      className={isSuccessful ? '' : 'offscreen'}
    >
      <Text ref={errorRef} aria-live="assertive">
        Congrats! You have successfully logged in!
      </Text>
    </Alert>
  );

  async function handleLoginFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    console.log({ username, password });
  }

  const displayLoginForm = (
    <Flex direction="column" align="center" justify="center">
      <Title order={2}>Sign In</Title>

      <form onSubmit={handleLoginFormSubmit}>
        <TextInput
          label="Username"
          placeholder="Enter username"
          autoComplete="off"
          value={username}
          ref={usernameRef}
          onChange={(event) =>
            loginDispatch({
              type: loginAction.setUsername,
              payload: event.currentTarget.value,
            })
          }
          withAsterisk
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(event) =>
            loginDispatch({
              type: loginAction.setPassword,
              payload: event.currentTarget.value,
            })
          }
          withAsterisk
          required
        />

        <Button type="submit">Sign In</Button>
      </form>

      <Flex direction="column" align="center" justify="center">
        <Text>Need an Account?</Text>
        <Text color="blue">
          <Link to="/register">Register</Link>
        </Text>
      </Flex>
    </Flex>
  );

  return (
    <main>
      {errorMessage
        ? displayError
        : isSuccessful
        ? displaySuccess
        : displayLoginForm}
    </main>
  );
}

export { Login };
