import {
  Flex,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import { ChangeEvent, useEffect, useReducer, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { axiosInstance } from '../../api/axios';
import { authAction } from '../../context/authProvider/state';
import { useAuth } from '../../hooks/useAuth';
import { LOGIN_URL } from './constants';
import { initialLoginState, loginAction, loginReducer } from './state';
import { DecodedToken, LoginResponse } from './types';
import { TbPassword, TbUser } from 'react-icons/tb';
import { AccessibleButtonCreatorInfo } from '../wrappers';
import { returnAccessibleButtonElements } from '../../jsxCreators';
import { CustomNotification } from '../customNotification';
import { useGlobalState } from '../../hooks';
import { logState, urlBuilder } from '../../utils';
import { log } from 'console';

function Login() {
  /** ------------- begin hooks ------------- */
  const [loginState, loginDispatch] = useReducer(
    loginReducer,
    initialLoginState
  );
  const {
    username,
    password,
    triggerLoginSubmit,

    isError,
    errorMessage,
    isLoading,
    loadingMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
  } = loginState;

  const { authDispatch } = useAuth();
  const {
    globalState: { padding, rowGap, width },
  } = useGlobalState();
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  // sets focus on username input on first render
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    loginDispatch({
      type: loginAction.setIsLoading,
      payload: false,
    });
  }, []);

  useEffect(() => {
    logState({
      state: loginState,
      groupLabel: 'loginState',
    });
  }, [loginState]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function loginFormSubmit() {
      const url: URL = urlBuilder({
        path: '/auth/login',
      });
      const body = JSON.stringify({ username, password });

      const request: Request = new Request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
        signal: controller.signal,
      });

      try {
        loginDispatch({
          type: loginAction.setIsSubmitting,
          payload: true,
        });

        const response = await fetch(request);
        const data: LoginResponse = await response.json();

        if (!isMounted) {
          return;
        }
        const { ok } = response;
        if (!ok) {
          loginDispatch({
            type: loginAction.setIsError,
            payload: true,
          });
          loginDispatch({
            type: loginAction.setErrorMessage,
            payload: data.message,
          });
          return;
        }

        const { accessToken = '' } = data;
        const decodedToken: DecodedToken = jwtDecode(accessToken);
        const {
          userInfo: { username, userId, roles },
        } = decodedToken;

        // set all auth state upon login
        authDispatch({
          type: authAction.setAllAuthState,
          payload: {
            username,
            userId,
            password,
            roles,
            accessToken,
            errorMessage: '',
            isLoggedIn: true,
          },
        });

        loginDispatch({
          type: loginAction.setTriggerLoginSubmit,
          payload: false,
        });
        loginDispatch({
          type: loginAction.setIsSubmitting,
          payload: false,
        });

        navigate('/portal');
      } catch (error: any) {
        if (!isMounted) {
          return;
        }

        loginDispatch({
          type: loginAction.setIsError,
          payload: true,
        });

        error instanceof InvalidTokenError
          ? loginDispatch({
              type: loginAction.setErrorMessage,
              payload: 'Invalid token',
            })
          : !error?.response
          ? loginDispatch({
              type: loginAction.setErrorMessage,
              payload: 'No response from server',
            })
          : loginDispatch({
              type: loginAction.setErrorMessage,
              payload:
                error?.message ?? 'Unknown error occurred. Please try again.',
            });
      }
    }

    if (triggerLoginSubmit) {
      loginFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerLoginSubmit]);

  /** ------------- end hooks ------------- */

  /** ------------- begin component render bypass */
  if (isLoading || isError || isSubmitting) {
    return (
      <Flex w="100%" h="100vh" align="center" justify="center" p={padding}>
        <CustomNotification
          isError={isError}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          isSuccessful={isSuccessful}
          errorMessage={errorMessage}
          loadingMessage={loadingMessage}
          submitMessage={submitMessage}
          successMessage={successMessage}
          parentDispatch={loginDispatch}
          navigateTo={{
            errorPath: '/',
            successPath: '/portal',
          }}
        />
      </Flex>
    );
  }
  /** ------------- end component render bypass */

  /** ------------- begin element creation ------------- */
  const usernameTextInput = (
    <TextInput
      aria-live="polite"
      aria-label="username"
      aria-required="true"
      icon={<TbUser />}
      id="username"
      label="Username"
      name="username"
      placeholder="Username"
      value={username}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        loginDispatch({
          type: loginAction.setUsername,
          payload: event.currentTarget.value,
        });
      }}
      required
      ref={usernameRef}
      withAsterisk
    />
  );

  const passwordTextInput = (
    <PasswordInput
      aria-live="polite"
      aria-label="password"
      aria-required="true"
      icon={<TbPassword />}
      id="password"
      label="Password"
      name="password"
      placeholder="Password"
      value={password}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        loginDispatch({
          type: loginAction.setPassword,
          payload: event.currentTarget.value,
        });
      }}
      required
      withAsterisk
    />
  );

  const loginButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Login',
    semanticDescription: 'Login button to submit username and password',
    semanticName: 'Login button',
    buttonDisabled: isLoading,
    buttonOnClick: () => {
      loginDispatch({
        type: loginAction.setTriggerLoginSubmit,
        payload: true,
      });
    },
    buttonVariant: 'outline',
  };
  const createdLoginButton = returnAccessibleButtonElements([
    loginButtonCreatorInfo,
  ]);
  /** ------------- end element creation ------------- */

  /** ------------- begin component display ------------- */
  const displayTitle = (
    <Stack spacing={rowGap}>
      <Flex align="center" justify="center">
        <Title order={3} color="dark" style={{ letterSpacing: '0.30rem' }}>
          MACAULEY
        </Title>
        <Title order={3} color="red">
          TECH
        </Title>
        <Title order={3} color="green">
          REPAIR
        </Title>
      </Flex>

      <Text size="lg" color="dark">
        Employee Portal
      </Text>
    </Stack>
  );

  const displayInputs = (
    <Stack w="100%" spacing={rowGap}>
      {usernameTextInput}
      {passwordTextInput}
    </Stack>
  );

  const displayLoginButton = (
    <Group w="100%" position="right">
      {createdLoginButton}
    </Group>
  );

  const displayLinkToRegister = (
    <Flex align="center" justify="center" columnGap="sm" w="100%">
      <Text color="dark">Don&apos;t have an account?</Text>
      <Text color="blue">
        <Link to="/register">Create one!</Link>
      </Text>
    </Flex>
  );

  const displayLoginComponent = (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w={width < 480 ? 350 : width <= 1024 ? 480 : 640}
      p={padding}
      gap={rowGap}
    >
      {displayTitle}
      {displayInputs}
      {displayLoginButton}
      {displayLinkToRegister}
    </Flex>
  );
  /** ------------- end component display ------------- */

  return (
    <Flex w="100%" h="100vh" align="center" justify="center" p={padding}>
      {displayLoginComponent}
    </Flex>
  );
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
