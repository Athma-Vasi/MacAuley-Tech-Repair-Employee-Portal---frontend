import type { User } from '../../types';

type EditUserState = {
  email: string;
  isValidEmail: boolean;
  isEmailFocused: boolean;

  username: string;
  isValidUsername: boolean;
  isUsernameFocused: boolean;

  id: string;
  roles: ('Admin' | 'Employee' | 'Manager')[];
  active: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
};

type EditUserAction = {
  setEmail: 'setEmail';
  setIsValidEmail: 'setIsValidEmail';
  setIsEmailFocused: 'setIsEmailFocused';

  setUsername: 'setUsername';
  setIsValidUsername: 'setIsValidUsername';
  setIsUsernameFocused: 'setIsUsernameFocused';

  setRoles: 'setRoles';
  setActive: 'setActive';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setIsSuccessful: 'setIsSuccessful';
  setAll: 'setAll';
};

type EditUserPayload =
  | string
  | boolean
  | ('Admin' | 'Employee' | 'Manager')[]
  | EditUserState;

type EditUserDispatch = {
  type: EditUserAction[keyof EditUserAction];
  payload: EditUserPayload;
};

type EditUserReducer = (
  state: EditUserState,
  action: EditUserDispatch
) => EditUserState;

type EditUserProps = {
  user: User;
};

type EditUserResponse = {
  message: string;
};

export type {
  EditUserState,
  EditUserAction,
  EditUserPayload,
  EditUserDispatch,
  EditUserReducer,
  EditUserProps,
  EditUserResponse,
};
