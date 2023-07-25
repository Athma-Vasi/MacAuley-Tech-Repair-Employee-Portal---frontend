import {
  DisplayQueryAction,
  DisplayQueryDispatch,
  DisplayQueryState,
} from './types';

const initialDisplayQueryState: DisplayQueryState = {
  groupBySelectData: [],
  groupBySelection: 'username',
  groupBySelectValueMap: new Map(),
};

const displayQueryAction: DisplayQueryAction = {
  setGroupBySelectData: 'setGroupBySelectData',
  setGroupBySelection: 'setGroupBySelection',
  setGroupBySelectValueMap: 'setGroupBySelectValueMap',
};

function displayQueryReducer(
  state: DisplayQueryState,
  action: DisplayQueryDispatch
): DisplayQueryState {
  switch (action.type) {
    case displayQueryAction.setGroupBySelectData:
      return {
        ...state,
        groupBySelectData: action.payload,
      };

    case displayQueryAction.setGroupBySelection:
      return {
        ...state,
        groupBySelection: action.payload,
      };

    case displayQueryAction.setGroupBySelectValueMap:
      return {
        ...state,
        groupBySelectValueMap: action.payload,
      };

    default:
      return state;
  }
}

export { displayQueryAction, displayQueryReducer, initialDisplayQueryState };
