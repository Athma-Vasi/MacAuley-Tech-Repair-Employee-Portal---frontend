import { useEffect, useRef, useReducer } from 'react';
import { Link } from 'react-router-dom';
import {
  faCheck,
  faInfoCircle,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Button,
  Center,
  Flex,
  Loader,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '../../constants';
import { REGISTER_URL } from './constants';
import { initialRegisterState, registerAction, registerReducer } from './state';
import '../../index.css';
import {
  returnEmailRegexValidationText,
  returnUsernameRegexValidationText,
} from '../../utils';
import { returnPasswordRegexValidationText } from './utils';
import { axiosInstance } from '../../api/axios';
import { RegisterResponse } from './types';
import { screenReaderPasswordSpecialCharacters } from '../../domElements';
import { Loading } from '../loading';
import { CustomError } from '../customError';
import { Success } from '../success';

function Register() {
  const [
    {
      email,
      isValidEmail,
      isEmailFocused,

      username,
      isValidUsername,
      isUsernameFocused,

      password,
      isValidPassword,
      isPasswordFocused,

      confirmPassword,
      isValidConfirmPassword,
      isConfirmPasswordFocused,

      errorMessage,
      isSubmitting,
      isSuccessful,
    },
    registerDispatch,
  ] = useReducer(registerReducer, initialRegisterState);

  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // sets focus on email input on first render
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // used to validate email on every change
  useEffect(() => {
    const isValid = EMAIL_REGEX.test(email);

    registerDispatch({
      type: registerAction.setIsValidEmail,
      payload: isValid,
    });
  }, [email]);

  // used to validate username on every change
  useEffect(() => {
    const isValid = USERNAME_REGEX.test(username);

    registerDispatch({
      type: registerAction.setIsValidUsername,
      payload: isValid,
    });
  }, [username]);

  // used to validate password on every change and confirm password on every change
  useEffect(() => {
    const isValid = PASSWORD_REGEX.test(password);

    registerDispatch({
      type: registerAction.setIsValidPassword,
      payload: isValid,
    });

    const matchPassword = password === confirmPassword;
    registerDispatch({
      type: registerAction.setIsValidConfirmPassword,
      payload: matchPassword,
    });
  }, [password, confirmPassword]);

  // removes error message after every change in email, username, password, or confirm password
  useEffect(() => {
    registerDispatch({
      type: registerAction.setErrorMessage,
      payload: '',
    });
  }, [email, username, password, confirmPassword]);

  const displayError = (
    <CustomError
      ref={errorRef}
      message={errorMessage}
      link={{
        address: '/login',
        text: 'Back to login',
      }}
      isError={errorMessage ? true : false}
    />
  );

  const displaySuccess = (
    <Success
      message="You have successfully registered!"
      link={{ address: '/login', text: 'Click here to login' }}
      isSuccessful={isSuccessful}
    />
  );

  const displayLoading = <Loading dataDirection="load" />;

  const emailValidationText = (
    <Text
      id="email-note"
      className={isEmailFocused && email && !isValidEmail ? '' : 'offscreen'}
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnEmailRegexValidationText(email)}
    </Text>
  );

  const usernameInputValidationText = (
    <Text
      id="username-note"
      className={
        isUsernameFocused && username && !isValidUsername ? '' : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnUsernameRegexValidationText(username)}
    </Text>
  );

  const passwordRegexValidationText =
    returnPasswordRegexValidationText(password);

  const passwordInputValidationText = (
    <Text
      id="password-note"
      className={
        isPasswordFocused && password && !isValidPassword ? '' : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} /> {passwordRegexValidationText}
      {passwordRegexValidationText.includes('special')
        ? screenReaderPasswordSpecialCharacters
        : ''}
    </Text>
  );

  const confirmPasswordInputValidationText = (
    <Text
      id="confirm-password-note"
      className={
        isConfirmPasswordFocused && confirmPassword && !isValidConfirmPassword
          ? ''
          : 'offscreen'
      }
      w="100%"
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {isValidPassword && !isValidConfirmPassword
        ? 'Passwords do not match'
        : ''}
    </Text>
  );

  async function handleRegisterFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    // because I'm just a little stitious
    const testEmail = EMAIL_REGEX.test(email);
    const testUsername = USERNAME_REGEX.test(username);
    const testPassword = PASSWORD_REGEX.test(password);
    const testConfirmPassword = password === confirmPassword;

    // if any field is invalid, display error message and return
    if (!testEmail || !testUsername || !testPassword || !testConfirmPassword) {
      registerDispatch({
        type: registerAction.setErrorMessage,
        payload: 'Please fill out all fields correctly',
      });
      return;
    }

    const newUserObj = {
      email,
      username,
      password,
    };

    const controller = new AbortController();
    const { signal } = controller;

    try {
      registerDispatch({
        type: registerAction.setIsSubmitting,
        payload: true,
      });

      const axiosConfig = {
        method: 'post',
        signal,
        url: REGISTER_URL,
        data: newUserObj,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const response = await axiosInstance<RegisterResponse>(axiosConfig);

      const { status } = response;

      if (status === 201) {
        registerDispatch({
          type: registerAction.setIsSuccessful,
          payload: true,
        });
        registerDispatch({
          type: registerAction.setErrorMessage,
          payload: '',
        });
        return;
      }
    } catch (error: any) {
      if (!error.response) {
        registerDispatch({
          type: registerAction.setErrorMessage,
          payload: 'Network error',
        });
      } else {
        registerDispatch({
          type: registerAction.setErrorMessage,
          payload: error.response.data.message,
        });
      }

      errorRef.current?.focus();
    } finally {
      registerDispatch({
        type: registerAction.setIsSubmitting,
        payload: false,
      });

      controller.abort();
    }
  }

  const displayRegisterForm = (
    <Flex
      direction="column"
      align="flex-start"
      justify="space-between"
      w="100%"
      h="100%"
      p="lg"
    >
      <Flex direction="column" align="flex-start" justify="center" rowGap="lg">
        <Flex align="center" justify="center">
          <Title order={3} color="dark">
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
      </Flex>

      <form onSubmit={handleRegisterFormSubmit}>
        <Flex
          direction="column"
          align="start"
          justify="center"
          rowGap="lg"
          p="lg"
          w={400}
          h="100%"
        >
          <Title order={3} color="dark">
            Register
          </Title>
          <TextInput
            w="100%"
            color="dark"
            label="Email"
            placeholder="Enter email address"
            autoComplete="off"
            aria-describedby="email-note"
            aria-invalid={isValidEmail ? false : true}
            icon={
              isValidEmail ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            value={email}
            error={!isValidEmail && email !== ''}
            description={emailValidationText}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setEmail,
                payload: event.currentTarget.value,
              });
            }}
            onFocus={() => {
              registerDispatch({
                type: registerAction.setIsEmailFocused,
                payload: true,
              });
            }}
            onBlur={() => {
              registerDispatch({
                type: registerAction.setIsEmailFocused,
                payload: false,
              });
            }}
            withAsterisk
            required
          />
          <TextInput
            w="100%"
            color="dark"
            label="Username"
            placeholder="Enter username"
            autoComplete="off"
            aria-describedby="username-note"
            aria-invalid={isValidUsername ? false : true}
            value={username}
            icon={
              isValidUsername ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            error={!isValidUsername && username !== ''}
            description={usernameInputValidationText}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setUsername,
                payload: event.currentTarget.value,
              });
            }}
            onFocus={() => {
              registerDispatch({
                type: registerAction.setIsUsernameFocused,
                payload: true,
              });
            }}
            onBlur={() => {
              registerDispatch({
                type: registerAction.setIsUsernameFocused,
                payload: false,
              });
            }}
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
            aria-describedby="password-note"
            aria-invalid={isValidPassword ? false : true}
            value={password}
            icon={
              isValidPassword ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            error={!isValidPassword && password !== ''}
            description={passwordInputValidationText}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setPassword,
                payload: event.currentTarget.value,
              });
            }}
            onFocus={() => {
              registerDispatch({
                type: registerAction.setIsPasswordFocused,
                payload: true,
              });
            }}
            onBlur={() => {
              registerDispatch({
                type: registerAction.setIsPasswordFocused,
                payload: false,
              });
            }}
            minLength={8}
            maxLength={32}
            withAsterisk
            required
          />
          <PasswordInput
            w="100%"
            color="dark"
            label="Confirm Password"
            placeholder="Confirm password"
            aria-describedby="confirm-password-note"
            aria-invalid={isValidConfirmPassword ? false : true}
            value={confirmPassword}
            icon={
              isValidPassword && isValidConfirmPassword ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : null
            }
            error={!isValidConfirmPassword && confirmPassword !== ''}
            description={confirmPasswordInputValidationText}
            onChange={(event) => {
              registerDispatch({
                type: registerAction.setConfirmPassword,
                payload: event.currentTarget.value,
              });
            }}
            onFocus={() => {
              registerDispatch({
                type: registerAction.setIsConfirmPasswordFocused,
                payload: true,
              });
            }}
            onBlur={() => {
              registerDispatch({
                type: registerAction.setIsConfirmPasswordFocused,
                payload: false,
              });
            }}
            minLength={8}
            maxLength={32}
            withAsterisk
            required
          />
          <Flex w="100%" justify="flex-end">
            <Button
              type="submit"
              disabled={
                !isValidEmail ||
                !isValidUsername ||
                !isValidPassword ||
                !isValidConfirmPassword
                  ? true
                  : false
              }
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </form>
      <Flex align="center" justify="center" columnGap="sm" w="100%">
        <Text color="dark">Already have an account?</Text>
        <Text color="blue">
          <Link to="/login">Login</Link>
        </Text>
      </Flex>
    </Flex>
  );

  return (
    <Center
      style={{
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
        borderRadius: '3px',
        backgroundColor: 'white',
      }}
      w={500}
      h="auto"
      p="lg"
    >
      {errorMessage
        ? displayError
        : isSubmitting
        ? displayLoading
        : isSuccessful
        ? displaySuccess
        : displayRegisterForm}
    </Center>
  );
}

export { Register };
