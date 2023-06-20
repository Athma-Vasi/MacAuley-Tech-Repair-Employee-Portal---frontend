import {
  User,
  UsersListAction,
  UsersListDispatch,
  UsersListSort,
  UsersListSortKey,
  UsersListState,
} from './types';

const initialUsersListState: UsersListState = {
  errorMessage: '',
  isLoading: false,
  userToEdit: {
    _id: '',
    email: '',
    username: '',
    roles: [],
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  },
  users: [],

  sortKey: 'active',
  sortDirection: 'asc',
  transformedUsers: [],
};

const usersListAction: UsersListAction = {
  setErrorMessage: 'setErrorMessage',
  setIsLoading: 'setIsLoading',

  setEmail: 'setEmail',
  setUsername: 'setUsername',
  setRoles: 'setRoles',
  setActive: 'setActive',
  setUserToEdit: 'setUserToEdit',
  setAllUsers: 'setAllUsers',

  setSortKey: 'setSortKey',
  setSortDirection: 'setSortDirection',
  setTransformedUsers: 'setTransformedUsers',
};

function usersListReducer(
  state: UsersListState,
  action: UsersListDispatch
): UsersListState {
  switch (action.type) {
    case usersListAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload.data as string,
      };

    case usersListAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload.data as boolean,
      };

    case usersListAction.setEmail:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload?._id) {
            user.email = action.payload.data as string;
          }
          return user;
        }),
      };

    case usersListAction.setUsername:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload?._id) {
            user.username = action.payload.data as string;
          }
          return user;
        }),
      };

    case usersListAction.setRoles:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload?._id) {
            user.roles = action.payload.data as (
              | 'Admin'
              | 'Employee'
              | 'Manager'
            )[];
          }
          return user;
        }),
      };

    case usersListAction.setActive:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload?._id) {
            user.active = action.payload.data as boolean;
          }
          return user;
        }),
      };

    case usersListAction.setUserToEdit:
      return {
        ...state,
        userToEdit: action.payload.data as User,
      };

    case usersListAction.setAllUsers:
      return {
        ...state,
        users: action.payload.data as User[],
      };

    case usersListAction.setSortKey:
      return {
        ...state,
        sortKey: action.payload.data as UsersListSortKey,
      };

    case usersListAction.setSortDirection:
      return {
        ...state,
        sortDirection: action.payload.data as UsersListSort,
      };

    case usersListAction.setTransformedUsers:
      return {
        ...state,
        transformedUsers: action.payload.data as User[],
      };

    default:
      return state;
  }
}

export { initialUsersListState, usersListAction, usersListReducer };
