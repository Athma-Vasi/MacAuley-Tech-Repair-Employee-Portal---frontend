import { ChangeEvent, useEffect } from "react";

import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from "../../../constants/regex";
import {
  AccessibleErrorValidTextElements,
  returnAccessiblePasswordInputElements,
  returnAccessibleTextInputElements,
} from "../../../jsxCreators";
import {
  returnEmailValidationText,
  returnUsernameRegexValidationText,
} from "../../../utils";
import {
  AccessiblePasswordInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
} from "../../wrappers";
import { returnPasswordRegexValidationText } from "../utils";
import type { RegisterStepAuthenticationProps } from "./types";

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
      payload: matchPassword && password.length > 0,
    });
  }, [password, confirmPassword]);

  // update the corresponding stepsInError state if any of the inputs are in error
  useEffect(() => {
    const isStepInError =
      !isValidEmail || !isValidUsername || !isValidPassword || !isValidConfirmPassword;

    registerDispatch({
      type: registerAction.setStepsInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 0,
      },
    });
  }, [
    isValidEmail,
    isValidUsername,
    isValidPassword,
    isValidConfirmPassword,
    registerDispatch,
    registerAction.setStepsInError,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [emailInputErrorText, emailInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "email",
    inputText: email,
    isValidInputText: isValidEmail,
    isInputTextFocused: isEmailFocused,
    regexValidationText: returnEmailValidationText({
      content: email,
      contentKind: "email",
    }),
  });

  const [usernameInputErrorText, usernameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "username",
      inputText: username,
      isValidInputText: isValidUsername,
      isInputTextFocused: isUsernameFocused,
      regexValidationText: returnUsernameRegexValidationText({
        content: username,
        contentKind: "username",
      }),
    });

  const passwordRegexValidationText = returnPasswordRegexValidationText({
    content: password,
    contentKind: "password",
  });

  const [passwordInputErrorText, passwordInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "password",
      inputText: password,
      isValidInputText: isValidPassword,
      isInputTextFocused: isPasswordFocused,
      regexValidationText: `${passwordRegexValidationText}${
        passwordRegexValidationText.includes("special") ? " !, @, #, $, %, ^, &, *" : ""
      }`,
    });

  const [confirmPasswordInputErrorText, confirmPasswordInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "confirm password",
      inputText: confirmPassword,
      isValidInputText: isValidConfirmPassword,
      isInputTextFocused: isConfirmPasswordFocused,
      regexValidationText: `${
        isValidPassword && !isValidConfirmPassword ? "Passwords do not match" : ""
      }`,
    });

  const emailTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: emailInputErrorText,
      valid: emailInputValidText,
    },
    inputText: email,
    isValidInputText: isValidEmail,
    label: "Email",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsEmailFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setEmail,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsEmailFocused,
        payload: true,
      });
    },
    placeholder: "Enter email address",
    required: true,
    withAsterisk: true,
    semanticName: "email",
  };

  const usernameTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: usernameInputErrorText,
      valid: usernameInputValidText,
    },
    inputText: username,
    isValidInputText: isValidUsername,
    label: "Username",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsUsernameFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setUsername,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsUsernameFocused,
        payload: true,
      });
    },
    placeholder: "Enter username",
    required: true,
    withAsterisk: true,
    semanticName: "username",
  };

  const passwordTextInputCreatorInfo: AccessiblePasswordInputCreatorInfo = {
    description: {
      error: passwordInputErrorText,
      valid: passwordInputValidText,
    },
    inputText: password,
    isValidInputText: isValidPassword,
    label: "Password",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsPasswordFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setPassword,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsPasswordFocused,
        payload: true,
      });
    },
    placeholder: "Enter password",
    required: true,
    withAsterisk: true,
    semanticName: "password",
  };

  const confirmPasswordTextInputCreatorInfo: AccessiblePasswordInputCreatorInfo = {
    description: {
      error: confirmPasswordInputErrorText,
      valid: confirmPasswordInputValidText,
    },
    inputText: confirmPassword,
    isValidInputText: isValidConfirmPassword,
    label: "Confirm password",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsConfirmPasswordFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setConfirmPassword,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsConfirmPasswordFocused,
        payload: true,
      });
    },
    placeholder: "Confirm password",
    required: true,
    withAsterisk: true,
    semanticName: "confirm password",
  };

  // following are the created accessible input elements
  const [createdEmailTextInputElement, createdUsernameTextInputElement] =
    returnAccessibleTextInputElements([
      emailTextInputCreatorInfo,
      usernameTextInputCreatorInfo,
    ]);

  const [createdPasswordTextInputElement, createdConfirmPasswordTextInputElement] =
    returnAccessiblePasswordInputElements([
      passwordTextInputCreatorInfo,
      confirmPasswordTextInputCreatorInfo,
    ]);

  const createdAuthenticationPageForm = (
    <FormLayoutWrapper>
      {createdEmailTextInputElement}
      {createdUsernameTextInputElement}
      {createdPasswordTextInputElement}
      {createdConfirmPasswordTextInputElement}
    </FormLayoutWrapper>
  );

  return <>{createdAuthenticationPageForm}</>;
}

export { RegisterStepAuthentication };
