import {
  DisplayQueryAction,
  DisplayQueryDispatch,
  DisplayQueryState,
} from './types';

const initialDisplayQueryState: DisplayQueryState = {
  groupByRadioData: [],
  groupBySelection: 'username',
  groupBySelectValueMap: new Map(),
};

const displayQueryAction: DisplayQueryAction = {
  setGroupByRadioData: 'setGroupByRadioData',
  setGroupBySelection: 'setGroupBySelection',
  setGroupBySelectValueMap: 'setGroupBySelectValueMap',
};

function displayQueryReducer(
  state: DisplayQueryState,
  action: DisplayQueryDispatch
): DisplayQueryState {
  switch (action.type) {
    case displayQueryAction.setGroupByRadioData:
      return {
        ...state,
        groupByRadioData: action.payload,
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
