import {
  DisplayQueryAction,
  DisplayQueryDispatch,
  DisplayQueryState,
} from './types';

const initialDisplayQueryState: DisplayQueryState = {
  groupByRadioData: [],
  groupBySelection: 'username',
  currentSelectionData: [],
  groupedByQueryResponseData: new Map(),
  restOfGroupedQueryResponseData: [],
  currentSegmentedSelection: 'condensed',
};

const displayQueryAction: DisplayQueryAction = {
  setGroupByRadioData: 'setGroupByRadioData',
  setGroupBySelection: 'setGroupBySelection',
  setCurrentSelectionData: 'setCurrentSelectionData',

  setGroupedByQueryResponseData: 'setGroupedByQueryResponseData',
  setRestOfGroupedQueryResponseData: 'setRestOfGroupedQueryResponseData',

  setCurrentSegmentedSelection: 'setCurrentSegmentedSelection',
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

    case displayQueryAction.setCurrentSelectionData:
      return {
        ...state,
        currentSelectionData: action.payload,
      };

    case displayQueryAction.setGroupedByQueryResponseData:
      return {
        ...state,
        groupedByQueryResponseData: action.payload,
      };

    case displayQueryAction.setRestOfGroupedQueryResponseData:
      return {
        ...state,
        restOfGroupedQueryResponseData: action.payload,
      };

    case displayQueryAction.setCurrentSegmentedSelection:
      return {
        ...state,
        currentSegmentedSelection: action.payload,
      };

    default:
      return state;
  }
}

export { displayQueryAction, displayQueryReducer, initialDisplayQueryState };
