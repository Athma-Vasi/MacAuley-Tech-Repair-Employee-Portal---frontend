import type { User } from '../../types';

type UsersListSort = 'asc' | 'desc' | '';

type UsersListSortKey =
  | 'email'
  | 'username'
  | 'roles'
  | 'active'
  | 'created'
  | 'updated';

type UsersListState = {
  errorMessage: string;
  isLoading: boolean;
  userToEdit: User;
  users: User[];

  sortKey: UsersListSortKey;
  sortDirection: UsersListSort;
  transformedUsers: User[];
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

  setSortKey: 'setSortKey';
  setSortDirection: 'setSortDirection';
  setTransformedUsers: 'setTransformedUsers';
};

type UsersListPayload = {
  _id?: string;
  data:
    | string
    | boolean
    | ('Admin' | 'Employee' | 'Manager')[]
    | User
    | User[]
    | UsersListSort
    | UsersListSortKey;
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
  UsersListSort,
  UsersListSortKey,
};
