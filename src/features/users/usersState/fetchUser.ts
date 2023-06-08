type FetchUserReturn = {
  _id: string;
  username: string;
  roles: ('Admin' | 'Employee' | 'Manager')[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type FetchUserState = {
  users: FetchUserReturn[];
  isLoading: boolean;
  error: string;
  isSuccess?: boolean;
};

type UserDispatch = {
  type: FetchUserAction[keyof FetchUserAction];
  payload: FetchUserState;
};

type FetchUserAction = {
  FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS';
  FETCH_USERS_FAILURE: 'FETCH_USERS_FAILURE';
};

const fetchUserAction: FetchUserAction = {
  FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE: 'FETCH_USERS_FAILURE',
};

const initialFetchUserState: FetchUserState = {
  users: [],
  isLoading: true,
  error: '',
  isSuccess: false,
};

function fetchUsersReducer(
  state: FetchUserState,
  dispatch: UserDispatch
): FetchUserState {
  switch (dispatch.type) {
    case fetchUserAction.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: dispatch.payload.users,
        isLoading: false,
        error: '',
        isSuccess: true,
      };
    case fetchUserAction.FETCH_USERS_FAILURE:
      return {
        ...state,
        users: [],
        isLoading: false,
        error: dispatch.payload.error,
        isSuccess: false,
      };
    default:
      return state;
  }
}

export { fetchUsersReducer, initialFetchUserState, fetchUserAction };
export type { FetchUserReturn, FetchUserState, UserDispatch, FetchUserAction };
