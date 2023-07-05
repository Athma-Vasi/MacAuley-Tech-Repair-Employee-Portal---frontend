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

  const emailInputErrorText = (
    <Text
      id="email-note-error"
      style={{
        display: isEmailFocused && email && !isValidEmail ? 'block' : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnEmailRegexValidationText(email)}
    </Text>
  );

  const emailInputValidText = (
    <Text
      id="email-note-valid"
      style={{
        display: isEmailFocused && email && isValidEmail ? 'block' : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Email is valid
    </Text>
  );

  const usernameInputErrorText = (
    <Text
      id="username-note-error"
      style={{
        display:
          isUsernameFocused && username && !isValidUsername ? 'block' : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnUsernameRegexValidationText(username)}
    </Text>
  );

  const usernameInputValidText = (
    <Text
      id="username-note-valid"
      style={{
        display:
          isUsernameFocused && username && isValidUsername ? 'block' : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Username is valid
    </Text>
  );

  const passwordRegexValidationText =
    returnPasswordRegexValidationText(password);

  const passwordInputErrorText = (
    <Text
      id="password-note-error"
      style={{
        display:
          isPasswordFocused && password && !isValidPassword ? 'block' : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} /> {passwordRegexValidationText}
      {passwordRegexValidationText.includes('special')
        ? screenReaderPasswordSpecialCharacters
        : ''}
    </Text>
  );

  const passwordInputValidText = (
    <Text
      id="password-note-valid"
      style={{
        display:
          isPasswordFocused && password && isValidPassword ? 'block' : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Password is valid
    </Text>
  );

  const confirmPasswordInputErrorText = (
    <Text
      id="confirm-password-note-error"
      style={{
        display:
          isConfirmPasswordFocused && confirmPassword && !isValidConfirmPassword
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="red"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {isValidPassword && !isValidConfirmPassword
        ? 'Passwords do not match'
        : ''}
    </Text>
  );

  const confirmPasswordInputValidText = (
    <Text
      id="confirm-password-note-valid"
      style={{
        display:
          isConfirmPasswordFocused && confirmPassword && isValidConfirmPassword
            ? 'block'
            : 'none',
      }}
      w="100%"
      color="green"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> Confirm password is valid. Both
      passwords match
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
        aria-describedby={
          isValidEmail ? 'email-note-valid' : 'email-note-error'
        }
        aria-required
        aria-invalid={isValidEmail ? false : true}
        icon={
          isValidEmail ? <FontAwesomeIcon icon={faCheck} color="green" /> : null
        }
        value={email}
        description={isValidEmail ? emailInputValidText : emailInputErrorText}
        error={!isValidEmail && email !== ''}
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
        aria-describedby={
          isValidUsername ? 'username-note-valid' : 'username-note-error'
        }
        aria-required
        aria-invalid={isValidUsername ? false : true}
        value={username}
        icon={
          isValidUsername ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidUsername && username !== ''}
        description={
          isValidUsername ? usernameInputValidText : usernameInputErrorText
        }
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
        aria-describedby={
          isValidPassword ? 'password-note-valid' : 'password-note-error'
        }
        aria-required
        aria-invalid={isValidPassword ? false : true}
        value={password}
        icon={
          isValidPassword ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidPassword && password !== ''}
        description={
          isValidPassword ? passwordInputValidText : passwordInputErrorText
        }
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
        aria-required
        aria-describedby={
          isValidPassword && isValidConfirmPassword
            ? 'confirm-password-note-valid'
            : 'confirm-password-note-error'
        }
        aria-invalid={isValidConfirmPassword ? false : true}
        value={confirmPassword}
        icon={
          isValidPassword && isValidConfirmPassword ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidConfirmPassword && confirmPassword !== ''}
        description={
          isValidPassword && isValidConfirmPassword
            ? confirmPasswordInputValidText
            : confirmPasswordInputErrorText
        }
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
