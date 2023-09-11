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
      const url: URL = new URL('http://localhost:3500/auth/login');
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

        navigate('/home');
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
  if (isLoading || isSubmitting) {
    return (
      <Flex w="100%" h="100vh" align="center" justify="center" p={padding}>
        <CustomNotification
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          isSuccessful={isSuccessful}
          loadingMessage={loadingMessage}
          submitMessage={submitMessage}
          successMessage={successMessage}
          parentDispatch={loginDispatch}
          navigateTo={{
            successPath: '/home',
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

export default Login;
