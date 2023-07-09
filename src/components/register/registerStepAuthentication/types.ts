import { RegisterAction, RegisterDispatch } from '../types';

type RegisterStepAuthenticationProps = {
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

  registerAction: RegisterAction;
  registerDispatch: React.Dispatch<RegisterDispatch>;
};

export type { RegisterStepAuthenticationProps };
