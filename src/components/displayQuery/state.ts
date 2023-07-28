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
  popoversOpenCloseState: new Map(),

  acknowledgementText: '',
  isValidAcknowledgementText: false,
  isAcknowledgementTextFocused: false,
};

const displayQueryAction: DisplayQueryAction = {
  setGroupByRadioData: 'setGroupByRadioData',
  setGroupBySelection: 'setGroupBySelection',
  setCurrentSelectionData: 'setCurrentSelectionData',

  setGroupedByQueryResponseData: 'setGroupedByQueryResponseData',
  setRestOfGroupedQueryResponseData: 'setRestOfGroupedQueryResponseData',

  setCurrentSegmentedSelection: 'setCurrentSegmentedSelection',
  setPopoversOpenCloseState: 'setPopoversOpenCloseState',

  setAcknowledgementText: 'setAcknowledgementText',
  setIsValidAcknowledgementText: 'setIsValidAcknowledgementText',
  setIsAcknowledgementTextFocused: 'setIsAcknowledgementTextFocused',
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

    case displayQueryAction.setPopoversOpenCloseState: {
      const { key, popoverState } = action.payload;
      const newMap = new Map(state.popoversOpenCloseState);

      const currentPopoverState = newMap.get(key);
      if (currentPopoverState) {
        currentPopoverState[popoverState.index] = popoverState.value;
      } else {
        newMap.set(key, [popoverState.value]);
      }

      return {
        ...state,
        popoversOpenCloseState: newMap,
      };
    }

    case displayQueryAction.setAcknowledgementText:
      return {
        ...state,
        acknowledgementText: action.payload,
      };
    case displayQueryAction.setIsValidAcknowledgementText:
      return {
        ...state,
        isValidAcknowledgementText: action.payload,
      };
    case displayQueryAction.setIsAcknowledgementTextFocused:
      return {
        ...state,
        isAcknowledgementTextFocused: action.payload,
      };

    default:
      return state;
  }
}

export { displayQueryAction, displayQueryReducer, initialDisplayQueryState };
