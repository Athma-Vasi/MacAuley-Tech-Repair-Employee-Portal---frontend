import {
  DisplayQueryDesktopAction,
  DisplayQueryDesktopDispatch,
  DisplayQueryDesktopState,
} from './types';

const initialDisplayQueryDesktopState: DisplayQueryDesktopState = {
  fieldToSortBy: 'username',
  sortDirection: 'asc',
};

const displayQueryDesktopAction: DisplayQueryDesktopAction = {
  setFieldToSortBy: 'setFieldToSortBy',
  setSortDirection: 'setSortDirection',
};

function displayQueryDesktopReducer(
  state: DisplayQueryDesktopState,
  action: DisplayQueryDesktopDispatch
): DisplayQueryDesktopState {
  switch (action.type) {
    case displayQueryDesktopAction.setFieldToSortBy:
      return {
        ...state,
        fieldToSortBy: action.payload,
      };
    case displayQueryDesktopAction.setSortDirection:
      return {
        ...state,
        sortDirection: action.payload,
      };
    default:
      return state;
  }
}

export {
  displayQueryDesktopAction,
  displayQueryDesktopReducer,
  initialDisplayQueryDesktopState,
};
