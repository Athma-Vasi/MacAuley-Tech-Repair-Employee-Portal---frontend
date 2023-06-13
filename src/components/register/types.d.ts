type RegisterState = {
  email: string;
  isValidEmail: boolean;
  isEmailFocused: boolean;

  username: string;
  isValidUsername: boolean;
  isUsernameFocused: boolean;

  password: string;
  isValidPassword: boolean;
  isPasswordFocused: boolean;

  confirmPassword: string;
  isValidConfirmPassword: boolean;
  isConfirmPasswordFocused: boolean;

  errorMessage: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
};

type RegisterAction = {
  setEmail: 'setEmail';
  setIsValidEmail: 'setIsValidEmail';
  setIsEmailFocused: 'setIsEmailFocused';

  setUsername: 'setUsername';
  setIsValidUsername: 'setIsValidUsername';
  setIsUsernameFocused: 'setIsUsernameFocused';

  setPassword: 'setPassword';
  setIsValidPassword: 'setIsValidPassword';
  setIsPasswordFocused: 'setIsPasswordFocused';

  setConfirmPassword: 'setConfirmPassword';
  setIsValidConfirmPassword: 'setIsValidConfirmPassword';
  setIsConfirmPasswordFocused: 'setIsConfirmPasswordFocused';

  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setIsSuccessful: 'setIsSuccessful';
};

type RegisterPayload = string | boolean;

type RegisterDispatch = {
  type: RegisterAction[keyof RegisterAction];
  payload: RegisterPayload;
};

export type {
  RegisterState,
  RegisterAction,
  RegisterPayload,
  RegisterDispatch,
};
