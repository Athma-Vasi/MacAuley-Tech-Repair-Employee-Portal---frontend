import {
  Text,
  TextInput,
  PasswordInput,
  Title,
  Alert,
  Button,
  Flex,
  Center,
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCogs,
  faGear,
  faGears,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { CustomError } from '../customError';

function Login() {
  const [{ username, password, errorMessage }, loginDispatch] = useReducer(
    loginReducer,
    initialLoginState
  );

  const { authState, authDispatch } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

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

    const controller = new AbortController();
    const { signal } = controller;

    try {
      loginDispatch({
        type: loginAction.setIsLoading,
        payload: true,
      });

      const axiosConfig = {
        method: 'post',
        signal,
        url: LOGIN_URL,
        data: loginObj,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

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

  const displayError = (
    <CustomError
      ref={errorRef}
      isError={errorMessage ? true : false}
      message={errorMessage}
    />
  );

  const displayLoginForm = (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      w="100%"
      h="100%"
      p="lg"
    >
      <Flex columnGap="md" w="100%" justify="space-between">
        <Center>
          <FontAwesomeIcon icon={faWrench} color="gray" size="2x" />
        </Center>
        <Title order={2} color="dimmed">
          MacAuley Tech Repair Employee Portal
        </Title>
      </Flex>
      <form onSubmit={handleLoginFormSubmit}>
        <Flex
          direction="column"
          align="flex-start"
          justify="center"
          rowGap="lg"
          p="lg"
          w="100%"
          h="100%"
        >
          <Title order={3} color="dark">
            Sign In
          </Title>
          <TextInput
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
            <Button type="submit">Sign In</Button>
          </Flex>
        </Flex>
      </form>

      <Flex
        direction="row"
        align="center"
        justify="space-between"
        columnGap="sm"
      >
        <Text color="dark">No account?</Text>
        <Text color="blue">
          <Link to="/register">Create one!</Link>
        </Text>
      </Flex>
    </Flex>
  );

  return (
    <Center
      style={{
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
        backgroundColor: 'white',
      }}
      w={400}
      h={552}
      p="lg"
    >
      {errorMessage ? displayError : displayLoginForm}
    </Center>
  );
}

export { Login };
