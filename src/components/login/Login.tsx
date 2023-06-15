import {
  Text,
  TextInput,
  PasswordInput,
  Title,
  Alert,
  Button,
  Flex,
} from '@mantine/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import { axiosInstance } from '../../api/axios';
import { useRef, useEffect, useReducer } from 'react';

import { initialLoginState, loginAction, loginReducer } from './state';
import { LOGIN_URL } from './constants';
import { DecodedToken, LoginResponse } from './types';
import { authAction } from '../../context/authProvider/state';
import { useAuth } from '../../hooks/useAuth';

function Login() {
  const [{ username, password, errorMessage }, loginDispatch] = useReducer(
    loginReducer,
    initialLoginState
  );

  const { authState, authDispatch } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  // if there is no state object, it means the user is trying to access the login page directly
  const from = state?.from?.pathname || '/';

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

  async function handleLoginFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const loginObj = {
      username,
      password,
    };

    try {
      loginDispatch({
        type: loginAction.setIsLoading,
        payload: true,
      });

      const response = await axiosInstance.post<LoginResponse>(
        LOGIN_URL,
        JSON.stringify(loginObj),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      const {
        status,
        data: { accessToken = '' },
      } = response;

      if (status === 200) {
        // decode user info from the access token
        const { userInfo } = jwtDecode<DecodedToken>(accessToken);

        authDispatch({
          type: authAction.setAllAuthState,
          payload: {
            username: userInfo.username,
            password,
            roles: userInfo.roles,
            accessToken,
            errorMessage: '',
            isLoggedIn: true,
          },
        });
      }
      // navigate to portal
      navigate('/portal');
    } catch (error: any) {
      // if there is no response object, it means the server is down
      if (!error?.response) {
        loginDispatch({
          type: loginAction.setErrorMessage,
          payload: 'Network Error',
        });

        authDispatch({
          type: authAction.setErrorMessage,
          payload: 'Network Error',
        });
      }
      // if there is a response object, it means the server is up
      else if (error.response) {
        const {
          response: {
            data: { message },
          },
        } = error;

        loginDispatch({
          type: loginAction.setErrorMessage,
          payload: message,
        });

        authDispatch({
          type: authAction.setErrorMessage,
          payload: message,
        });
      }
      // if the error is an instance of InvalidTokenError, it means the access token is invalid
      else if (error instanceof InvalidTokenError) {
        loginDispatch({
          type: loginAction.setErrorMessage,
          payload: 'Invalid Access Token',
        });

        authDispatch({
          type: authAction.setErrorMessage,
          payload: 'Invalid Access Token',
        });
      }
      // catch all other errors
      else {
        loginDispatch({
          type: loginAction.setErrorMessage,
          payload: 'An unknown error occurred. Please try again.',
        });

        authDispatch({
          type: authAction.setErrorMessage,
          payload: 'An unknown error occurred. Please try again.',
        });
      }
    } finally {
      loginDispatch({
        type: loginAction.setIsLoading,
        payload: false,
      });
    }
  }

  useEffect(() => {
    console.log({ authState });
    // console.log({ username, password, errorMessage, isSuccessful });
  }, [authState]);

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

  return <main>{errorMessage ? displayError : displayLoginForm}</main>;
}

export { Login };
