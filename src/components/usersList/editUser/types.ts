import type { User } from '../../../types';
import { UserInfoDisplay } from '../types';

type EditUserProps = {
  user: UserInfoDisplay;
  closeModalCallback: () => void;
};

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

type EditUserResponse = {
  message: string;
};

export type {
  EditUserAction,
  EditUserDispatch,
  EditUserPayload,
  EditUserProps,
  EditUserReducer,
  EditUserResponse,
  EditUserState,
};
