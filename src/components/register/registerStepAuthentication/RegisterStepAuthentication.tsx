import { useEffect, useRef } from 'react';
import { Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
} from '../../../constants';
import type { RegisterStepAuthenticationProps } from './types';
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { screenReaderPasswordSpecialCharacters } from '../../../domElements';
import {
  returnEmailRegexValidationText,
  returnUsernameRegexValidationText,
} from '../../../utils';
import { returnPasswordRegexValidationText } from '../utils';

function RegisterStepAuthentication({
  email,
  isEmailFocused,
  isValidEmail,
  username,
  isUsernameFocused,
  isValidUsername,
  password,
  isPasswordFocused,
  isValidPassword,
  confirmPassword,
  isConfirmPasswordFocused,
  isValidConfirmPassword,
  registerDispatch,
  registerAction,
}: RegisterStepAuthenticationProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // sets focus on email input on first render
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // used to validate email on every change
  useEffect(() => {
    const isValidMail = EMAIL_REGEX.test(email);

    registerDispatch({
      type: registerAction.setIsValidEmail,
      payload: isValidMail,
    });
  }, [email]);

  // used to validate username on every change
  useEffect(() => {
    const isValidUsr = USERNAME_REGEX.test(username);

    registerDispatch({
      type: registerAction.setIsValidUsername,
      payload: isValidUsr,
    });
  }, [username]);

  // used to validate password on every change and confirm password on every change
  useEffect(() => {
    const isValidPwd = PASSWORD_REGEX.test(password);

    registerDispatch({
      type: registerAction.setIsValidPassword,
      payload: isValidPwd,
    });

    const matchPassword = password === confirmPassword;
    registerDispatch({
      type: registerAction.setIsValidConfirmPassword,
      payload: matchPassword,
    });
  }, [password, confirmPassword]);

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

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w="100%"
    >
      <TextInput
        w="100%"
        color="dark"
        label="Email"
        placeholder="Enter email address"
        autoComplete="off"
        aria-describedby="email-note"
        aria-invalid={isValidEmail ? false : true}
        icon={
          isValidEmail ? <FontAwesomeIcon icon={faCheck} color="green" /> : null
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
    </Flex>
  );
}

export { RegisterStepAuthentication };
