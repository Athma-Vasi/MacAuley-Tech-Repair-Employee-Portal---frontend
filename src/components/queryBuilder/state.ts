import { QUERY_BUILDER_FILTER_OPERATORS } from './constants';
import {
  QueryBuilderAction,
  QueryBuilderDispatch,
  QueryBuilderState,
} from './types';
import { generateQueryString } from './utils';

const initialQueryBuilderState: QueryBuilderState = {
  // filter
  filterSelectData: [],
  currentFilterField: 'Created date',
  currentFilterOperator: 'equal to',
  currentFilterValue: '1970-01-01',
  isCurrentFilterValueValid: false,
  isCurrentFilterValueFocused: false,
  filterOperatorSelectData: QUERY_BUILDER_FILTER_OPERATORS,
  filterStatementsQueue: [],

  // search
  searchSelectData: [],
  currentSearchField: '',
  currentSearchValue: '',
  isCurrentSearchValueValid: false,
  isCurrentSearchValueFocused: false,
  searchStatementsQueue: [],

  // sort
  sortSelectData: [],
  currentSortField: 'Created date',
  currentSortDirection: 'ascending',
  sortStatementsQueue: [],

  //
  projectionArray: [],
  projectionCheckboxData: [],
  selectedFieldsSet: new Set(),
  projectedFieldsSet: new Set(),

  labelValueTypesMap: new Map(),
  queryString: '?',

  // accordion chevron states
  isQueryBuilderOpened: false,
  isFilterOpened: false,
  isSearchOpened: false,
  isSortOpened: false,
  isProjectionOpened: false,
};

const queryBuilderAction: QueryBuilderAction = {
  // filter
  setFilterSelectData: 'setFilterSelectData',
  setCurrentFilterField: 'setCurrentFilterField',
  setCurrentFilterOperator: 'setCurrentFilterOperator',
  setCurrentFilterValue: 'setCurrentFilterValue',
  setIsCurrentFilterValueValid: 'setIsCurrentFilterValueValid',
  setIsCurrentFilterValueFocused: 'setIsCurrentFilterValueFocused',
  setFilterOperatorSelectData: 'setFilterOperatorSelectData',
  setFilterStatementsQueue: 'setFilterStatementsQueue',

  // search
  setSearchSelectData: 'setSearchSelectData',
  setCurrentSearchField: 'setCurrentSearchField',
  setCurrentSearchValue: 'setCurrentSearchValue',
  setIsCurrentSearchValueValid: 'setIsCurrentSearchValueValid',
  setIsCurrentSearchValueFocused: 'setIsCurrentSearchValueFocused',
  setSearchStatementsQueue: 'setSearchStatementsQueue',

  // sort
  setSortSelectData: 'setSortSelectData',
  setCurrentSortField: 'setCurrentSortField',
  setCurrentSortDirection: 'setCurrentSortDirection',
  setSortStatementsQueue: 'setSortStatementsQueue',

  // projection
  setProjectionArray: 'setProjectionArray',
  setProjectionCheckboxData: 'setProjectionCheckboxData',
  setSelectedFieldsSet: 'setSelectedFieldsSet',
  setProjectedFieldsSet: 'setProjectedFieldsSet',

  setClearAllQueryData: 'setClearAllQueryData',
  buildQueryString: 'buildQueryString',
  setLabelValueTypesMap: 'setLabelValueTypesMap',

  // accordion chevron states
  toggleIsQueryBuilderOpened: 'toggleIsQueryBuilderOpened',
  toggleIsFilterOpened: 'toggleIsFilterOpened',
  toggleIsSearchOpened: 'toggleIsSearchOpened',
  toggleIsSortOpened: 'toggleIsSortOpened',
  toggleIsProjectionOpened: 'toggleIsProjectionOpened',
};

function queryBuilderReducer(
  state: QueryBuilderState,
  action: QueryBuilderDispatch
): QueryBuilderState {
  switch (action.type) {
    // filter
    case queryBuilderAction.setFilterSelectData:
      return {
        ...state,
        filterSelectData: action.payload,
      };
    case queryBuilderAction.setCurrentFilterField:
      return {
        ...state,
        currentFilterField: action.payload,
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

    // search
    case queryBuilderAction.setSearchSelectData:
      return {
        ...state,
        searchSelectData: action.payload,
      };
    case queryBuilderAction.setCurrentSearchField:
      return {
        ...state,
        currentSearchField: action.payload,
      };
    case queryBuilderAction.setCurrentSearchValue:
      return {
        ...state,
        currentSearchValue: action.payload,
      };
    case queryBuilderAction.setIsCurrentSearchValueValid:
      return {
        ...state,
        isCurrentSearchValueValid: action.payload,
      };
    case queryBuilderAction.setIsCurrentSearchValueFocused:
      return {
        ...state,
        isCurrentSearchValueFocused: action.payload,
      };
    case queryBuilderAction.setSearchStatementsQueue: {
      const { index, value } = action.payload;
      const searchStatementsQueue = [...state.searchStatementsQueue];

      // if search statement already present return state
      if (
        searchStatementsQueue.filter(
          (item) => item[0] === value[0] && item[1] === value[1]
        ).length > 0
      ) {
        return state;
      }

      // if there are duplicate search fields, remove the previous one
      const duplicateSearchFieldIndex = searchStatementsQueue.findIndex(
        (item) => item[0] === value[0]
      );

      if (duplicateSearchFieldIndex !== -1) {
        searchStatementsQueue.splice(duplicateSearchFieldIndex, 1);
      }

      if (index >= searchStatementsQueue.length) {
        searchStatementsQueue.push(value);
      } else {
        searchStatementsQueue[index] = value;
      }

      // filter out empty values and return state
      // done last because initial state is ['','']
      const filteredSearchStatementsQueue = searchStatementsQueue.filter(
        (item) => item[0] !== '' && item[1] !== ''
      );

      return {
        ...state,
        searchStatementsQueue: filteredSearchStatementsQueue,
      };
    }

    // sort
    case queryBuilderAction.setSortSelectData:
      return {
        ...state,
        sortSelectData: action.payload,
      };
    case queryBuilderAction.setCurrentSortField:
      return {
        ...state,
        currentSortField: action.payload,
      };
    case queryBuilderAction.setCurrentSortDirection:
      return {
        ...state,
        currentSortDirection: action.payload,
      };
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

    // projection
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

      const selectedFieldsSet = new Set<string>(state.selectedFieldsSet);
      if (calledFrom === 'filter') {
        const filterStatementsQueue = [...state.filterStatementsQueue];
        filterStatementsQueue.forEach(([field, _operator, _value]) => {
          selectedFieldsSet.add(field);
        });
      } else if (calledFrom === 'search') {
        const searchStatementsQueue = [...state.searchStatementsQueue];
        searchStatementsQueue.forEach(([field, _value]) => {
          selectedFieldsSet.add(field);
        });
      } else if (calledFrom === 'sort') {
        const sortStatementsQueue = [...state.sortStatementsQueue];
        sortStatementsQueue.forEach(([field, _direction]) => {
          selectedFieldsSet.add(field);
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
        searchStatementsQueue: [],
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
    case queryBuilderAction.toggleIsSearchOpened:
      return {
        ...state,
        isSearchOpened: action.payload ? true : false,
      };
    case queryBuilderAction.toggleIsSortOpened:
      return {
        ...state,
        isSortOpened: action.payload ? true : false,
      };
    case queryBuilderAction.toggleIsProjectionOpened:
      return {
        ...state,
        isProjectionOpened: action.payload ? true : false,
      };

    case queryBuilderAction.setLabelValueTypesMap:
      return {
        ...state,
        labelValueTypesMap: action.payload,
      };

    default:
      return state;
  }
}

export { initialQueryBuilderState, queryBuilderAction, queryBuilderReducer };
