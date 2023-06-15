type User = {
  _id: string;
  email: string;
  username: string;
  roles: ('Admin' | 'Employee' | 'Manager')[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type UsersListState = {
  errorMessage: string;
  isLoading: boolean;
  users: User[];
};

type UsersListAction = {
  setErrorMessage: 'setErrorMessage';
  setIsLoading: 'setIsLoading';

  setEmail: 'setEmail';
  setUsername: 'setUsername';
  setRoles: 'setRoles';
  setActive: 'setActive';
  setAllUsers: 'setAllUsers';
};

type UsersListPayload = {
  _id?: string;
  data: string | boolean | ('Admin' | 'Employee' | 'Manager')[] | User[];
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
