import {
  QueryBuilderAction,
  QueryBuilderDispatch,
  QueryBuilderState,
} from './types';
import { generateQueryString } from './utils';

const initialQueryBuilderState: QueryBuilderState = {
  currentFilterTerm: 'Created date',
  currentFilterOperator: 'equal to',
  currentFilterValue: '1970-01-01',
  isCurrentFilterValueValid: false,
  isCurrentFilterValueFocused: false,

  currentSortTerm: 'Created date',
  currentSortDirection: 'ascending',

  filterSelectData: [],
  sortSelectData: [],
  labelValueTypesMap: new Map(),

  filterStatementsQueue: [],
  sortStatementsQueue: [],

  projectionArray: [],
  projectionCheckboxData: [],
  selectedFieldsSet: new Set(),
  projectedFieldsSet: new Set(),

  queryString: '?',

  isError: false,
  errorMessage: '',
  isLoading: false,
  loadingMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
};

const queryBuilderAction: QueryBuilderAction = {
  setCurrentFilterTerm: 'setCurrentFilterTerm',
  setCurrentFilterOperator: 'setCurrentFilterOperator',
  setCurrentFilterValue: 'setCurrentFilterValue',
  setIsCurrentFilterValueValid: 'setIsCurrentFilterValueValid',
  setIsCurrentFilterValueFocused: 'setIsCurrentFilterValueFocused',

  setCurrentSortTerm: 'setCurrentSortTerm',
  setCurrentSortDirection: 'setCurrentSortDirection',

  setFilterSelectData: 'setFilterSelectData',
  setSortSelectData: 'setSortSelectData',
  setLabelValueTypesMap: 'setLabelValueTypesMap',

  setFilterStatementsQueue: 'setFilterStatementsQueue',
  setSortStatementsQueue: 'setSortStatementsQueue',

  setProjectionArray: 'setProjectionArray',
  setProjectionCheckboxData: 'setProjectionCheckboxData',
  setSelectedFieldsSet: 'setSelectedFieldsSet',
  setProjectedFieldsSet: 'setProjectedFieldsSet',

  setClearAllQueryData: 'setClearAllQueryData',
  buildQueryString: 'buildQueryString',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function queryBuilderReducer(
  state: QueryBuilderState,
  action: QueryBuilderDispatch
): QueryBuilderState {
  switch (action.type) {
    case queryBuilderAction.setCurrentFilterTerm:
      return {
        ...state,
        currentFilterTerm: action.payload,
      };
    case queryBuilderAction.setCurrentFilterOperator:
      return {
        ...state,
        currentFilterOperator: action.payload,
      };
    case queryBuilderAction.setCurrentFilterValue:
      return {
        ...state,
        currentFilterValue: action.payload,
      };
    case queryBuilderAction.setIsCurrentFilterValueValid:
      return {
        ...state,
        isCurrentFilterValueValid: action.payload,
      };
    case queryBuilderAction.setIsCurrentFilterValueFocused:
      return {
        ...state,
        isCurrentFilterValueFocused: action.payload,
      };

    case queryBuilderAction.setCurrentSortTerm:
      return {
        ...state,
        currentSortTerm: action.payload,
      };
    case queryBuilderAction.setCurrentSortDirection:
      return {
        ...state,
        currentSortDirection: action.payload,
      };

    case queryBuilderAction.setFilterSelectData:
      return {
        ...state,
        filterSelectData: action.payload,
      };
    case queryBuilderAction.setSortSelectData:
      return {
        ...state,
        sortSelectData: action.payload,
      };
    case queryBuilderAction.setLabelValueTypesMap:
      return {
        ...state,
        labelValueTypesMap: action.payload,
      };

    case queryBuilderAction.setFilterStatementsQueue: {
      const { index, value } = action.payload;
      const filterStatementsQueue = [...state.filterStatementsQueue];

      // if filter statement already present return state
      if (
        filterStatementsQueue.filter(
          (item) =>
            item[0] === value[0] && item[1] === value[1] && item[2] === value[2]
        ).length > 0
      ) {
        return state;
      }

      // // if there are duplicate filter values, remove the previous one
      // const duplicateFilterValuesIndex = filterStatementsQueue.findIndex(
      //   (item) => item[0] === value[0]
      // );
      // if (duplicateFilterValuesIndex !== -1) {
      //   filterStatementsQueue.splice(duplicateFilterValuesIndex, 1);
      // }

      if (index >= filterStatementsQueue.length) {
        filterStatementsQueue.push(value);
      } else {
        filterStatementsQueue[index] = value;
      }

      // filter out empty values and return state
      // done last because initial state is ['','','']
      const filteredFilterStatementsQueue = filterStatementsQueue.filter(
        (item) => item[0] !== '' && item[1] !== '' && item[2] !== ''
      );

      return {
        ...state,
        filterStatementsQueue: filteredFilterStatementsQueue,
      };
    }

    case queryBuilderAction.setSortStatementsQueue: {
      const { index, value } = action.payload;
      const sortStatementsQueue = [...state.sortStatementsQueue];

      // if sort statement already present return state
      if (
        sortStatementsQueue.filter(
          (item) => item[0] === value[0] && item[1] === value[1]
        ).length > 0
      ) {
        return state;
      }

      // if there are duplicate sort fields, remove the previous one
      const duplicateSortFieldIndex = sortStatementsQueue.findIndex(
        (item) => item[0] === value[0]
      );
      if (duplicateSortFieldIndex !== -1) {
        sortStatementsQueue.splice(duplicateSortFieldIndex, 1);
      }

      if (index >= sortStatementsQueue.length) {
        sortStatementsQueue.push(value);
      } else {
        sortStatementsQueue[index] = value;
      }

      // filter out empty values and return state
      // done last because initial state is ['','','']
      const filteredSortStatementsQueue = sortStatementsQueue.filter(
        (item) => item[0] !== '' && item[1] !== ''
      );

      return {
        ...state,
        sortStatementsQueue: filteredSortStatementsQueue,
      };
    }

    case queryBuilderAction.setProjectionArray:
      return {
        ...state,
        projectionArray: action.payload,
      };

    case queryBuilderAction.setProjectionCheckboxData:
      return {
        ...state,
        projectionCheckboxData: action.payload,
      };

    case queryBuilderAction.setSelectedFieldsSet: {
      const { calledFrom } = action.payload;

      const selectedFieldsSet = new Set<string>();
      if (calledFrom === 'filter') {
        const filterStatementsQueue = [...state.filterStatementsQueue];
        filterStatementsQueue.forEach((item) => {
          selectedFieldsSet.add(item[0]);
        });
      } else if (calledFrom === 'sort') {
        const sortStatementsQueue = [...state.sortStatementsQueue];
        sortStatementsQueue.forEach((item) => {
          selectedFieldsSet.add(item[0]);
        });
      }

      return {
        ...state,
        selectedFieldsSet,
      };
    }

    case queryBuilderAction.setProjectedFieldsSet: {
      const projectedFieldsSet = new Set<string>();
      const projectionArray = [...state.projectionArray];

      // this is required because projection checkbox value is the camel cased value that is not the client facing label (e.g. createdAt as opposed to Created date). The backend consumes the camel cased value.
      // the corresponding label from the map is found as the projectedFieldsSet is consumed by sort and field select inputs, whose values are the client facing (non-camelcased) labels.
      projectionArray.forEach((item) => {
        const findCorrespondingLabel = Array.from(
          state.labelValueTypesMap
        ).reduce((acc, curr) => {
          const [label, obj] = curr;
          const { value } = obj;
          if (value === item) {
            // rome-ignore lint:
            acc = label;
          }

          return acc;
        }, '');

        projectedFieldsSet.add(findCorrespondingLabel);
      });

      return {
        ...state,
        projectedFieldsSet,
      };
    }

    case queryBuilderAction.setClearAllQueryData: {
      return {
        ...state,
        queryString: '?',
        filterStatementsQueue: [],
        sortStatementsQueue: [],
        projectionArray: [],
        selectedFieldsSet: new Set<string>(),
        projectedFieldsSet: new Set<string>(),
      };
    }
    case queryBuilderAction.buildQueryString: {
      const generateQueryStringInput = action.payload;
      const newQueryString = generateQueryString(generateQueryStringInput);

      return {
        ...state,
        queryString: newQueryString,
      };
    }

    case queryBuilderAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case queryBuilderAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case queryBuilderAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case queryBuilderAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case queryBuilderAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case queryBuilderAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case queryBuilderAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case queryBuilderAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    default:
      return state;
  }
}

export { initialQueryBuilderState, queryBuilderAction, queryBuilderReducer };
