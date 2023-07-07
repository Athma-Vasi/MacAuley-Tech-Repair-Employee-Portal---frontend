import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useEffect } from 'react';

import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from '../../../constants/regex';
import { screenReaderPasswordSpecialCharacters } from '../../../domElements';
import { returnAccessibleTextElem } from '../../../jsxCreators';
import {
  returnEmailRegexValidationText,
  returnUsernameRegexValidationText,
} from '../../../utils';
import { returnPasswordRegexValidationText } from '../utils';
import type { RegisterStepAuthenticationProps } from './types';

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

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [emailInputErrorText, emailInputValidText] = returnAccessibleTextElem({
    inputElementKind: 'email',
    inputText: email,
    isValidInputText: isValidEmail,
    isInputTextFocused: isEmailFocused,
    regexValidationText: returnEmailRegexValidationText(email),
  });

  const [usernameInputErrorText, usernameInputValidText] =
    returnAccessibleTextElem({
      inputElementKind: 'username',
      inputText: username,
      isValidInputText: isValidUsername,
      isInputTextFocused: isUsernameFocused,
      regexValidationText: returnUsernameRegexValidationText(username),
    });

  const passwordRegexValidationText =
    returnPasswordRegexValidationText(password);

  const [passwordInputErrorText, passwordInputValidText] =
    returnAccessibleTextElem({
      inputElementKind: 'password',
      inputText: password,
      isValidInputText: isValidPassword,
      isInputTextFocused: isPasswordFocused,
      regexValidationText: `${passwordRegexValidationText}${
        passwordRegexValidationText.includes('special')
          ? screenReaderPasswordSpecialCharacters
          : ''
      }`,
    });

  const [confirmPasswordInputErrorText, confirmPasswordInputValidText] =
    returnAccessibleTextElem({
      inputElementKind: 'confirm password',
      inputText: confirmPassword,
      isValidInputText: isValidConfirmPassword,
      isInputTextFocused: isConfirmPasswordFocused,
      regexValidationText: `${
        isValidPassword && !isValidConfirmPassword
          ? 'Passwords do not match'
          : ''
      }`,
    });

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w="100%"
    >
      <TextInput
        size="md"
        w="100%"
        color="dark"
        label="Email"
        placeholder="Enter email address"
        autoComplete="off"
        aria-describedby={
          isValidEmail ? 'email-input-note-valid' : 'email-input-note-error'
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
        size="md"
        w="100%"
        color="dark"
        label="Username"
        placeholder="Enter username"
        autoComplete="off"
        aria-describedby={
          isValidUsername
            ? 'username-input-note-valid'
            : 'username-input-note-error'
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
        size="md"
        w="100%"
        color="dark"
        label="Password"
        placeholder="Enter password"
        aria-describedby={
          isValidPassword
            ? 'password-input-note-valid'
            : 'password-input-note-error'
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
        size="md"
        w="100%"
        color="dark"
        label="Confirm Password"
        placeholder="Confirm password"
        aria-required
        aria-describedby={
          isValidPassword && isValidConfirmPassword
            ? 'confirm-password-input-note-valid'
            : 'confirm-password-input-note-error'
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
