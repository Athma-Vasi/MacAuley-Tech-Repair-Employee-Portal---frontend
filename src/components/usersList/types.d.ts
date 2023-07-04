import { UserInfo } from 'os';
import type { User } from '../../types';

type UsersListSort = 'asc' | 'desc' | '';

type UserInfoDisplay = {
  _id: string;
  email: string;
  username: string;
  roles: ('Admin' | 'Employee' | 'Manager')[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type UsersListSortKey =
  | 'email'
  | 'username'
  | 'roles'
  | 'active'
  | 'created'
  | 'updated';

type SortUsersByKeyProps = {
  users: User[];
  sortKey: UsersListSortKey;
  sortDirection: UsersListSort;
};

type UsersListState = {
  errorMessage: string;
  isLoading: boolean;
  triggerGetAllUsers: boolean;
  userToEdit: UserInfoDisplay;
  users: User[];

  sortKey: UsersListSortKey;
  sortDirection: UsersListSort;
  transformedUsers: User[];
};

type UsersListAction = {
  setErrorMessage: 'setErrorMessage';
  setIsLoading: 'setIsLoading';
  setTriggerGetAllUsers: 'setTriggerGetAllUsers';

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
  SortUsersByKeyProps,
  UserInfoDisplay,
};
