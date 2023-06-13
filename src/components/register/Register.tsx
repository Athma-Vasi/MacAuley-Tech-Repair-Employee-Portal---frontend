import { useEffect, useState, useRef, useReducer } from 'react';
import {
  faCheck,
  faInfo,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Alert,
  PasswordInput,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from './constants';
import { initialRegisterState, registerAction, registerReducer } from './state';
import '../../index.css';
import {
  returnEmailRegexValidationText,
  returnPasswordRegexValidationText,
  returnUsernameRegexValidationText,
} from './utils';

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

    console.log({
      emailRegex: isValid,
      email,
    });

    registerDispatch({
      type: registerAction.setIsValidEmail,
      payload: isValid,
    });
  }, [email]);

  // used to validate username on every change
  useEffect(() => {
    const isValid = USERNAME_REGEX.test(username);

    console.log({
      usernameRegex: isValid,
      username,
    });

    registerDispatch({
      type: registerAction.setIsValidUsername,
      payload: isValid,
    });
  }, [username]);

  // used to validate password on every change and confirm password on every change
  useEffect(() => {
    const isValid = PASSWORD_REGEX.test(password);
    console.log({ passwordRegex: isValid, password, confirmPassword });

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
      color="red"
      className={errorMessage ? '' : 'offscreen'}
    >
      <Text ref={errorRef} aria-live="assertive">
        {errorMessage}
      </Text>
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

  const passwordInputValidationText = (
    <Text
      id="pwdnote"
      className={
        isPasswordFocused && password && !isValidPassword ? '' : 'offscreen'
      }
      color="red"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnPasswordRegexValidationText(password)}
    </Text>
  );

  return (
    <section>
      {displayError}
      <Title order={3}>Register</Title>

      <form>
        <TextInput
          label="Email"
          placeholder="Enter email address"
          autoComplete="off"
          aria-describedby="emailnote"
          aria-invalid={isValidUsername ? false : true}
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
      </form>
    </section>
  );
}

export { Register };
