type AddUserReturn = {
  message: string;
};

type AddUserState = {
  userInfo: {
    username: string;
    password: string;
    roles: ('Admin' | 'Employee' | 'Manager')[];
  };
  isValidPassword: boolean;
  isValidUsername: boolean;
  isLoading: boolean;
  error: string;
  isSuccess?: boolean;
};

type AddUserDispatch = {
  type: AddUserAction[keyof AddUserAction];
  payload: AddUserState;
};

type AddUserAction = {
  ADD_USER_SUCCESS: 'ADD_USER_SUCCESS';
  ADD_USER_FAILURE: 'ADD_USER_FAILURE';
  ADD_USER_RESET: 'ADD_USER_RESET';
  ADD_USER_USERNAME: 'ADD_USER_USERNAME';
  ADD_USER_PASSWORD: 'ADD_USER_PASSWORD';
  ADD_USER_ROLES: 'ADD_USER_ROLES';
  ADD_USER_IS_VALID_USERNAME: 'ADD_USER_IS_VALID_USERNAME';
  ADD_USER_IS_VALID_PASSWORD: 'ADD_USER_IS_VALID_PASSWORD';
};

const addUserAction: AddUserAction = {
  ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
  ADD_USER_FAILURE: 'ADD_USER_FAILURE',
  ADD_USER_RESET: 'ADD_USER_RESET',
  ADD_USER_USERNAME: 'ADD_USER_USERNAME',
  ADD_USER_PASSWORD: 'ADD_USER_PASSWORD',
  ADD_USER_ROLES: 'ADD_USER_ROLES',
  ADD_USER_IS_VALID_USERNAME: 'ADD_USER_IS_VALID_USERNAME',
  ADD_USER_IS_VALID_PASSWORD: 'ADD_USER_IS_VALID_PASSWORD',
};

const initialAddUserState: AddUserState = {
  userInfo: {
    username: '',
    password: '',
    roles: ['Employee'],
  },
  isValidPassword: false,
  isValidUsername: false,
  isLoading: true,
  error: '',
  isSuccess: false,
};

function addUserReducer(
  state: AddUserState,
  dispatch: AddUserDispatch
): AddUserState {
  switch (dispatch.type) {
    case addUserAction.ADD_USER_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...dispatch.payload.userInfo,
        },
        isValidPassword: true,
        isValidUsername: true,
        isLoading: false,
        error: '',
        isSuccess: true,
      };

    case addUserAction.ADD_USER_FAILURE:
      return {
        ...state,
        userInfo: {
          ...dispatch.payload.userInfo,
        },
        isLoading: false,
        isValidPassword: false,
        isValidUsername: false,
        error: dispatch.payload.error,
        isSuccess: false,
      };

    case addUserAction.ADD_USER_RESET:
      return {
        ...state,
        userInfo: {
          username: '',
          password: '',
          roles: ['Employee'],
        },
        isValidPassword: false,
        isValidUsername: false,
        isLoading: true,
        error: '',
        isSuccess: false,
      };

    case addUserAction.ADD_USER_USERNAME:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          username: dispatch.payload.userInfo.username,
        },
      };

    case addUserAction.ADD_USER_PASSWORD:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          password: dispatch.payload.userInfo.password,
        },
      };

    case addUserAction.ADD_USER_ROLES:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          roles: dispatch.payload.userInfo.roles,
        },
      };

    case addUserAction.ADD_USER_IS_VALID_USERNAME:
      return {
        ...state,
        isValidUsername: dispatch.payload.isValidUsername,
      };

    case addUserAction.ADD_USER_IS_VALID_PASSWORD:
      return {
        ...state,
        isValidPassword: dispatch.payload.isValidPassword,
      };

    default:
      return state;
  }
}

export { addUserReducer, initialAddUserState, addUserAction };
export type { AddUserReturn, AddUserState, AddUserDispatch, AddUserAction };
