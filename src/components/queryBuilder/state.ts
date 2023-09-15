import { QUERY_BUILDER_FILTER_OPERATORS } from './constants';
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
  filterOperatorSelectData: QUERY_BUILDER_FILTER_OPERATORS,

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

  // accordion chevron states
  isQueryBuilderOpened: false,
  isFilterOpened: false,
  isFilterChainOpened: false,
  isSortOpened: false,
  isSortChainOpened: false,
  isProjectionOpened: false,
};

const queryBuilderAction: QueryBuilderAction = {
  setCurrentFilterTerm: 'setCurrentFilterTerm',
  setCurrentFilterOperator: 'setCurrentFilterOperator',
  setCurrentFilterValue: 'setCurrentFilterValue',
  setIsCurrentFilterValueValid: 'setIsCurrentFilterValueValid',
  setIsCurrentFilterValueFocused: 'setIsCurrentFilterValueFocused',
  setFilterOperatorSelectData: 'setFilterOperatorSelectData',

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

  // accordion chevron states
  toggleIsQueryBuilderOpened: 'toggleIsQueryBuilderOpened',
  toggleIsFilterOpened: 'toggleIsFilterOpened',
  toggleIsFilterChainOpened: 'toggleIsFilterChainOpened',
  toggleIsSortOpened: 'toggleIsSortOpened',
  toggleIsSortChainOpened: 'toggleIsSortChainOpened',
  toggleIsProjectionOpened: 'toggleIsProjectionOpened',
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
    case queryBuilderAction.setFilterOperatorSelectData:
      return {
        ...state,
        filterOperatorSelectData: action.payload,
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
      const [newField, newOperator, newValue] = value;
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

      // if newField is already present in filterStatementsQueue
      const duplicateFieldIndex = filterStatementsQueue.findIndex(
        (item) => item[0] === newField
      );
      if (duplicateFieldIndex !== -1) {
        // if the operator is 'in', then add the new filter statement
        if (newOperator === 'in') {
          filterStatementsQueue.push(value);
          // if the operator is not 'in', then replace the existing filter statement
        } else {
          filterStatementsQueue.splice(duplicateFieldIndex, 1);
        }
      }

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
        const findCorrespondingLabel =
          Array.from(state.labelValueTypesMap).find(([_label, obj]) => {
            const { value } = obj;
            return value === item;
          })?.[0] ?? '';

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

    // accordion chevron states
    case queryBuilderAction.toggleIsQueryBuilderOpened:
      return {
        ...state,
        isQueryBuilderOpened: action.payload ? true : false,
      };

    case queryBuilderAction.toggleIsFilterOpened:
      return {
        ...state,
        isFilterOpened: action.payload ? true : false,
      };
    case queryBuilderAction.toggleIsFilterChainOpened:
      return {
        ...state,
        isFilterChainOpened: action.payload ? true : false,
      };
    case queryBuilderAction.toggleIsSortOpened:
      return {
        ...state,
        isSortOpened: action.payload ? true : false,
      };
    case queryBuilderAction.toggleIsSortChainOpened:
      return {
        ...state,
        isSortChainOpened: action.payload ? true : false,
      };
    case queryBuilderAction.toggleIsProjectionOpened:
      return {
        ...state,
        isProjectionOpened: action.payload ? true : false,
      };

    default:
      return state;
  }
}

export { initialQueryBuilderState, queryBuilderAction, queryBuilderReducer };
