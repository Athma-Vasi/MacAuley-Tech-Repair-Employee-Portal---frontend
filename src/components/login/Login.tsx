import {
  Button,
  Flex,
  Image,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { AxiosRequestConfig } from 'axios';
import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import { useEffect, useReducer, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { axiosInstance } from '../../api/axios';
import { authAction } from '../../context/authProvider/state';
import { useAuth } from '../../hooks/useAuth';
import { LOGIN_URL } from './constants';
import { initialLoginState, loginAction, loginReducer } from './state';
import { DecodedToken, LoginResponse } from './types';

function Login() {
  const [loginState, loginDispatch] = useReducer(
    loginReducer,
    initialLoginState
  );
  const { username, password, errorMessage, isLoading } = loginState;

  const { authDispatch } = useAuth();
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  // sets focus on username input on first render
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  return <></>;
}

export { Login };

/**
 * async function handleLoginFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const loginObj = {
      username,
      password,
    };

    const controller = new AbortController();
    const { signal } = controller;

    try {
      loginDispatch({
        type: loginAction.setIsLoading,
        payload: true,
      });

      const axiosConfig: AxiosRequestConfig = {
        method: 'post',
        signal,
        url: LOGIN_URL,
        data: loginObj,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const response = await axiosInstance<LoginResponse>(axiosConfig);

      const {
        status,
        data: { accessToken = '' },
      } = response;

      if (status === 200) {
        // decode user info from the access token
        const { userInfo } = jwtDecode<DecodedToken>(accessToken);

        // sets all auth state upon login
        authDispatch({
          type: authAction.setAllAuthState,
          payload: {
            username: userInfo.username,
            userId: userInfo.userId,
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

      controller.abort();
    }
  }

 */

/**
 *  const displayLoginForm = (
    <Flex
      direction="column"
      align="flex-start"
      justify="space-between"
      rowGap="lg"
      w="100%"
    >
      <form onSubmit={handleLoginFormSubmit} style={{ width: '100%' }}>
        <Flex
          direction="column"
          align="flex-start"
          justify="center"
          rowGap="lg"
          w="100%"
        >
          <Title order={3} style={{ letterSpacing: '0.10rem' }}>
            Sign In
          </Title>
          <TextInput
            size="sm"
            w="100%"
            color="dark"
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
            minLength={3}
            maxLength={20}
            withAsterisk
            required
          />
          <PasswordInput
            size="sm"
            w="100%"
            color="dark"
            label="Password"
            placeholder="Enter password"
            value={password}
            onChange={(event) =>
              loginDispatch({
                type: loginAction.setPassword,
                payload: event.currentTarget.value,
              })
            }
            minLength={8}
            maxLength={32}
            withAsterisk
            required
          />
          <Flex w="100%" justify="flex-end">
            <Button
              type="submit"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.currentTarget.click();
                }
              }}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  event.currentTarget.blur();
                }
              }}
            >
              Sign In
            </Button>
          </Flex>
        </Flex>
      </form>

      <Flex align="center" justify="center" columnGap="sm" w="100%">
        <Text color="dark">No account?</Text>
        <Text color="blue">
          <Link to="/register">Create one!</Link>
        </Text>
      </Flex>
    </Flex>
  );

  return (
    <Flex w="100%" h="100%" align="center" justify="center">
      <Flex w={350} p="sm">
        {displayLoginForm}
      </Flex>
    </Flex>
  );
  */
