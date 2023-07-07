import {
  UsersListMobileAction,
  UsersListMobileDispatch,
  UsersListMobileState,
} from './types';

const initialUsersListMobileState: UsersListMobileState = {};

const usersListMobileAction: UsersListMobileAction = {
  setCollapseToggle: 'setCollapseToggle',
};

function usersListMobileReducer(
  state: UsersListMobileState,
  action: UsersListMobileDispatch
): UsersListMobileState {
  switch (action.type) {
    case usersListMobileAction.setCollapseToggle:
      return {
        ...state,
        [action.payload.id]: action.payload.data,
      };
    default:
      return state;
  }
}

export {
  initialUsersListMobileState,
  usersListMobileAction,
  usersListMobileReducer,
};
