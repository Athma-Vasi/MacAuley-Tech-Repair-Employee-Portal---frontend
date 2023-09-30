import { CheckboxInputData } from '../../types';
import { RegexValidationProps } from '../../utils';
import { GenerateQueryStringInput } from './utils';

type QueryInputKind =
  | 'dateInput'
  | 'timeInput'
  | 'numberInput'
  | 'selectInput'
  | 'textInput'
  | 'booleanInput';

type ComponentQueryData = {
  label: string;
  value: string;
  inputKind: QueryInputKind;
  selectData?: string[];
  booleanData?: boolean[];
  regex?: RegExp; // to validate dateInput, timeInput, numberInput, textInput
  regexValidationFn?: ({
    content,
    contentKind,
    maxLength,
    minLength,
  }: RegexValidationProps) => string; // to return precise error texts for dateInput, timeInput, numberInput, textInput
};

type QueryValueTypes = {
  value: string;
  inputKind: QueryInputKind;
  selectData?: string[];
  booleanData?: boolean[];
  regex?: RegExp;
  regexValidationFn?: ({
    content,
    contentKind,
    maxLength,
    minLength,
  }: RegexValidationProps) => string;
};

type QueryLabelValueTypesMap = Map<string, QueryValueTypes>;

type QueryBuilderProps = {
  collectionName: string;
  componentQueryData: ComponentQueryData[];
  disableProjection?: boolean;
  setQueryBuilderString: 'setQueryBuilderString';
  queryBuilderStringDispatch: React.Dispatch<{
    type: 'setQueryBuilderString';
    payload: string;
  }>;
  queryValuesArrayDispatch?: React.Dispatch<{
    type: 'setQueryValuesArray';
    payload: {
      kind: 'add' | 'remove' | 'clear';
      value: string;
    };
  }>;
};

type QueryBuilderState = {
  // filter
  filterSelectData: string[];
  currentFilterField: string;
  currentFilterOperator: string;
  currentFilterValue: string;
  isCurrentFilterValueValid: boolean;
  isCurrentFilterValueFocused: boolean;
  filterOperatorSelectData: string[];
  filterStatementsQueue: [string, string, string][]; // [field, operator, value][]

  // search
  searchSelectData: string[];
  currentSearchField: string;
  currentSearchValue: string;
  isCurrentSearchValueValid: boolean;
  isCurrentSearchValueFocused: boolean;
  searchStatementsQueue: [string, string][]; // [field, value]

  isGeneralSearchCaseSensitive: boolean;
  // general search inclusion
  generalSearchInclusionValue: string;
  isGeneralSearchInclusionValueValid: boolean;
  isGeneralSearchInclusionValueFocused: boolean;
  // general search exclusion
  generalSearchExclusionValue: string;
  isGeneralSearchExclusionValueValid: boolean;
  isGeneralSearchExclusionValueFocused: boolean;

  // sort
  sortSelectData: string[];
  currentSortField: string;
  currentSortDirection: string;
  sortStatementsQueue: [string, string][]; // [field, direction][]

  // projection
  projectionArray: string[];
  projectionCheckboxData: CheckboxInputData;
  selectedFieldsSet: Set<string>;
  projectedFieldsSet: Set<string>;

  queryString: string;

  labelValueTypesMap: QueryLabelValueTypesMap;
  // accordion chevron states
  isQueryBuilderOpened: boolean;
  isFilterOpened: boolean;
  isSearchOpened: boolean;
  isSortOpened: boolean;
  isProjectionOpened: boolean;
};

type QueryBuilderAction = {
  // filter
  setFilterSelectData: 'setFilterSelectData';
  setCurrentFilterField: 'setCurrentFilterField';
  setCurrentFilterOperator: 'setCurrentFilterOperator';
  setCurrentFilterValue: 'setCurrentFilterValue';
  setIsCurrentFilterValueValid: 'setIsCurrentFilterValueValid';
  setIsCurrentFilterValueFocused: 'setIsCurrentFilterValueFocused';
  setFilterOperatorSelectData: 'setFilterOperatorSelectData';
  setFilterStatementsQueue: 'setFilterStatementsQueue';

  // search
  setSearchSelectData: 'setSearchSelectData';
  setCurrentSearchField: 'setCurrentSearchField';
  setCurrentSearchValue: 'setCurrentSearchValue';
  setIsCurrentSearchValueValid: 'setIsCurrentSearchValueValid';
  setIsCurrentSearchValueFocused: 'setIsCurrentSearchValueFocused';
  setSearchStatementsQueue: 'setSearchStatementsQueue';

  setIsGeneralSearchCaseSensitive: 'setIsGeneralSearchCaseSensitive';
  // general search inclusion
  setGeneralSearchInclusionValue: 'setGeneralSearchInclusionValue';
  setIsGeneralSearchInclusionValueValid: 'setIsGeneralSearchInclusionValueValid';
  setIsGeneralSearchInclusionValueFocused: 'setIsGeneralSearchInclusionValueFocused';

  // general search exclusion
  setGeneralSearchExclusionValue: 'setGeneralSearchExclusionValue';
  setIsGeneralSearchExclusionValueValid: 'setIsGeneralSearchExclusionValueValid';
  setIsGeneralSearchExclusionValueFocused: 'setIsGeneralSearchExclusionValueFocused';

  // sort
  setSortSelectData: 'setSortSelectData';
  setCurrentSortField: 'setCurrentSortField';
  setCurrentSortDirection: 'setCurrentSortDirection';
  setSortStatementsQueue: 'setSortStatementsQueue';

  // projection
  setProjectionArray: 'setProjectionArray';
  setProjectionCheckboxData: 'setProjectionCheckboxData';
  setSelectedFieldsSet: 'setSelectedFieldsSet';
  setProjectedFieldsSet: 'setProjectedFieldsSet';

  setLabelValueTypesMap: 'setLabelValueTypesMap';
  setClearAllQueryData: 'setClearAllQueryData';
  buildQueryString: 'buildQueryString';

  // accordion chevron states
  toggleIsQueryBuilderOpened: 'toggleIsQueryBuilderOpened';
  toggleIsFilterOpened: 'toggleIsFilterOpened';
  toggleIsSearchOpened: 'toggleIsSearchOpened';
  toggleIsSortOpened: 'toggleIsSortOpened';
  toggleIsProjectionOpened: 'toggleIsProjectionOpened';
};

type QueryBuilderDispatch =
  | {
      type:
        | QueryBuilderAction['setCurrentFilterField']
        | QueryBuilderAction['setCurrentFilterOperator']
        | QueryBuilderAction['setCurrentFilterValue']
        | QueryBuilderAction['setCurrentSearchField']
        | QueryBuilderAction['setCurrentSearchValue']
        | QueryBuilderAction['setGeneralSearchInclusionValue']
        | QueryBuilderAction['setGeneralSearchExclusionValue']
        | QueryBuilderAction['setCurrentSortField']
        | QueryBuilderAction['setCurrentSortDirection']
        | QueryBuilderAction['setClearAllQueryData'];

      payload: string;
    }
  | {
      type:
        | QueryBuilderAction['setIsCurrentFilterValueValid']
        | QueryBuilderAction['setIsCurrentFilterValueFocused']
        | QueryBuilderAction['setIsCurrentSearchValueValid']
        | QueryBuilderAction['setIsCurrentSearchValueFocused']
        | QueryBuilderAction['setIsGeneralSearchCaseSensitive']
        | QueryBuilderAction['setIsGeneralSearchInclusionValueValid']
        | QueryBuilderAction['setIsGeneralSearchInclusionValueFocused']
        | QueryBuilderAction['setIsGeneralSearchExclusionValueValid']
        | QueryBuilderAction['setIsGeneralSearchExclusionValueFocused'];

      payload: boolean;
    }
  | {
      type:
        | QueryBuilderAction['setFilterSelectData']
        | QueryBuilderAction['setSearchSelectData']
        | QueryBuilderAction['setSortSelectData']
        | QueryBuilderAction['setFilterOperatorSelectData'];

      payload: string[];
    }
  | {
      type: QueryBuilderAction['setLabelValueTypesMap'];
      payload: QueryLabelValueTypesMap;
    }
  | {
      type: QueryBuilderAction['setFilterStatementsQueue'];
      payload: {
        index: number;
        value: [string, string, string];
      };
    }
  | {
      type: QueryBuilderAction['setSearchStatementsQueue'];
      payload: { index: number; value: [string, string] };
    }
  | {
      type: QueryBuilderAction['setSortStatementsQueue'];
      payload: {
        index: number;
        value: [string, string];
      };
    }
  | {
      type: QueryBuilderAction['setProjectionArray'];
      payload: string[];
    }
  | {
      type: QueryBuilderAction['setSelectedFieldsSet'];
      payload: {
        calledFrom: 'filter' | 'search' | 'sort';
      };
    }
  | {
      type: QueryBuilderAction['setProjectedFieldsSet'];
      payload: string[];
    }
  | {
      type: QueryBuilderAction['setProjectionCheckboxData'];
      payload: CheckboxInputData;
    }
  | {
      type: QueryBuilderAction['buildQueryString'];
      payload: GenerateQueryStringInput;
    }
  | {
      type: QueryBuilderAction['toggleIsQueryBuilderOpened'];
      payload: 'Query Builder' | null;
    }
  | {
      type: QueryBuilderAction['toggleIsFilterOpened'];
      payload: 'Filter' | null;
    }
  | {
      type: QueryBuilderAction['toggleIsSearchOpened'];
      payload: 'Search' | null;
    }
  | {
      type: QueryBuilderAction['toggleIsSortOpened'];
      payload: 'Sort' | null;
    }
  | {
      type: QueryBuilderAction['toggleIsProjectionOpened'];
      payload: 'Projection' | null;
    };

type QueryBuilderReducer = (
  state: QueryBuilderState,
  action: QueryBuilderDispatch
) => QueryBuilderState;

export type {
  ComponentQueryData,
  QueryBuilderAction,
  QueryBuilderDispatch,
  QueryBuilderProps,
  QueryBuilderReducer,
  QueryBuilderState,
  QueryInputKind,
  QueryLabelValueTypesMap,
  QueryValueTypes,
};
