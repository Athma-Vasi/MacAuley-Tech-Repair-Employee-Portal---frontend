import { useEffect, useState, useRef, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Button,
  Flex,
  Loader,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
  REGISTER_URL,
} from './constants';
import { initialRegisterState, registerAction, registerReducer } from './state';
import '../../index.css';
import {
  returnEmailRegexValidationText,
  returnPasswordRegexValidationText,
  returnUsernameRegexValidationText,
} from './utils';
import { axiosInstance } from '../../api/axios';
import { RegisterResponse } from './types';

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

  // allows error message to be read by screen reader instead of removing it from the DOM
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
        You have successfully registered!
      </Text>
      <Text color="blue">
        <Link to="/login">Click here to login</Link>
      </Text>
    </Alert>
  );

  const displayLoading = (
    <Alert
      title="Loading..."
      color="gray"
      className={isSuccessful ? '' : 'offscreen'}
    >
      <Loader />
    </Alert>
  );

  const emailValidationText = (
    <Text
      id="emailnote"
      className={isEmailFocused && email && !isValidEmail ? '' : 'offscreen'}
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnEmailRegexValidationText(email)}
    </Text>
  );

  const usernameInputValidationText = (
    <Text
      id="uidnote"
      className={
        isUsernameFocused && username && !isValidUsername ? '' : 'offscreen'
      }
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnUsernameRegexValidationText(username)}
    </Text>
  );

  const passwordRegexValidationText =
    returnPasswordRegexValidationText(password);
  const screenReaderSpecialCharacters = (
    <span>
      <span> Allowed special characters: </span>
      <span aria-label="exclamation mark">!</span>
      <span aria-label="at symbol">@</span>
      <span aria-label="number symbol">#</span>
      <span aria-label="dollar symbol">$</span>
      <span aria-label="percent symbol">%</span>
      <span aria-label="caret symbol">^</span>
      <span aria-label="ampersand symbol">&</span>
      <span aria-label="asterisk symbol">*</span>
    </span>
  );

  const passwordInputValidationText = (
    <Text
      id="pwdnote"
      className={
        isPasswordFocused && password && !isValidPassword ? '' : 'offscreen'
      }
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} /> {passwordRegexValidationText}
      {passwordRegexValidationText.includes('special')
        ? screenReaderSpecialCharacters
        : ''}
    </Text>
  );

  const confirmPasswordInputValidationText = (
    <Text
      id="confirmpwdnote"
      className={
        isConfirmPasswordFocused && confirmPassword && !isValidConfirmPassword
          ? ''
          : 'offscreen'
      }
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

    try {
      registerDispatch({
        type: registerAction.setIsSubmitting,
        payload: true,
      });

      const response = await axiosInstance.post<RegisterResponse>(
        REGISTER_URL,
        JSON.stringify(newUserObj),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      const {
        status,
        data: { message },
      } = response;

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
      console.error(error);
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
    }
  }

  return (
    <>
      <section>
        <Flex
          direction="column"
          align="center"
          justify="space-between"
          style={{ outline: '1px solid red' }}
        >
          {displayError}
          {isSubmitting ? (
            displayLoading
          ) : isSuccessful ? (
            displaySuccess
          ) : (
            <>
              <Title order={3}>Register</Title>

              <form onSubmit={handleRegisterFormSubmit}>
                <Flex direction="column" justify="space-between">
                  <TextInput
                    label="Email"
                    placeholder="Enter email address"
                    autoComplete="off"
                    aria-describedby="emailnote"
                    aria-invalid={isValidUsername ? false : true}
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
                    label="Username"
                    placeholder="Enter username"
                    autoComplete="off"
                    aria-describedby="uidnote"
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
                    withAsterisk
                    required
                  />
                  <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    aria-describedby="pwdnote"
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
                    withAsterisk
                    required
                  />
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm password"
                    aria-describedby="confirmpwdnote"
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
                    withAsterisk
                    required
                  />
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
              </form>
              <Flex direction="column" align="center" justify="center">
                <Text>Already have an account?</Text>
                <Text color="blue">
                  <Link to="/login">Login</Link>
                </Text>
              </Flex>
            </>
          )}
        </Flex>
      </section>
    </>
  );
}

export { Register };
