import {
  DisplayQueryAction,
  DisplayQueryDispatch,
  DisplayQueryState,
} from './types';

const initialDisplayQueryState: DisplayQueryState = {
  groupByRadioData: [],
  groupBySelection: 'none',
  currentSelectionData: [],

  groupedByQueryResponseData: new Map(),
  fileUploadsForAForm: [],

  currentSegmentedSelection: 'condensed',

  acknowledgementText: '',
  isValidAcknowledgementText: false,
  isAcknowledgementTextFocused: false,

  deleteFormId: '',
  deleteFileUploadId: '',
  deleteResourceKind: '',
};

const displayQueryAction: DisplayQueryAction = {
  setGroupByRadioData: 'setGroupByRadioData',
  setGroupBySelection: 'setGroupBySelection',
  setCurrentSelectionData: 'setCurrentSelectionData',

  setGroupedByQueryResponseData: 'setGroupedByQueryResponseData',

  setFileUploadsForAForm: 'setFileUploadsForAForm',

  setCurrentSegmentedSelection: 'setCurrentSegmentedSelection',

  setAcknowledgementText: 'setAcknowledgementText',
  setIsValidAcknowledgementText: 'setIsValidAcknowledgementText',
  setIsAcknowledgementTextFocused: 'setIsAcknowledgementTextFocused',

  setDeleteFormId: 'setDeleteFormId',
  setDeleteFileUploadId: 'setDeleteFileUploadId',
  setDeleteResourceKind: 'setDeleteResourceKind',
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

    case displayQueryAction.setFileUploadsForAForm:
      return {
        ...state,
        fileUploadsForAForm: action.payload,
      };

    case displayQueryAction.setCurrentSegmentedSelection:
      return {
        ...state,
        currentSegmentedSelection: action.payload,
      };

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

    case displayQueryAction.setDeleteFormId:
      return {
        ...state,
        deleteFormId: action.payload,
      };
    case displayQueryAction.setDeleteFileUploadId:
      return {
        ...state,
        deleteFileUploadId: action.payload,
      };
    case displayQueryAction.setDeleteResourceKind:
      return {
        ...state,
        deleteResourceKind: action.payload,
      };

    default:
      return state;
  }
}

export { displayQueryAction, displayQueryReducer, initialDisplayQueryState };
