import type { User } from '../../types';

type UsersListState = {
  errorMessage: string;
  isLoading: boolean;
  userToEdit: User;
  users: User[];
};

type UsersListAction = {
  setErrorMessage: 'setErrorMessage';
  setIsLoading: 'setIsLoading';

  setEmail: 'setEmail';
  setUsername: 'setUsername';
  setRoles: 'setRoles';
  setActive: 'setActive';
  setUserToEdit: 'setUserToEdit';
  setAllUsers: 'setAllUsers';
};

type UsersListPayload = {
  _id?: string;
  data: string | boolean | ('Admin' | 'Employee' | 'Manager')[] | User | User[];
};

type UsersListDispatch = {
  type: UsersListAction[keyof UsersListAction];
  payload: UsersListPayload;
};

type UsersListReducer = (
  state: UsersListState,
  action: UsersListDispatch
) => UsersListState;

type GetAllUsersResponse = {
  message: string;
  users: User[];
};

export type {
  User,
  UsersListState,
  UsersListAction,
  UsersListPayload,
  UsersListDispatch,
  UsersListReducer,
  GetAllUsersResponse,
};
