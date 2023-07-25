import {
  DisplayQueryMobileAction,
  DisplayQueryMobileDispatch,
  DisplayQueryMobileState,
} from './types';

const initialDisplayQueryMobileState: DisplayQueryMobileState = {
  groupBySelectData: [],
};

const displayQueryMobileAction: DisplayQueryMobileAction = {
  setGroupBySelectData: 'setGroupBySelectData',
};

function displayQueryMobileReducer(
  state: DisplayQueryMobileState,
  action: DisplayQueryMobileDispatch
): DisplayQueryMobileState {
  switch (action.type) {
    case displayQueryMobileAction.setGroupBySelectData:
      return {
        ...state,
        groupBySelectData: action.payload,
      };
    default:
      return state;
  }
}

export {
  displayQueryMobileAction,
  displayQueryMobileReducer,
  initialDisplayQueryMobileState,
};
