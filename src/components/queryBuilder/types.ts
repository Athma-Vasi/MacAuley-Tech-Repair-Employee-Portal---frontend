import { CheckboxInputData } from '../../types';
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
};

type QueryValueTypes = {
  value: string;
  inputKind: QueryInputKind;
  selectData?: string[];
  booleanData?: boolean[];
};

type QueryLabelValueTypesMap = Map<string, QueryValueTypes>;

type QueryBuilderProps = {
  collectionName: string;
  componentQueryData: ComponentQueryData[];
  disableProjection?: boolean;
  setQueryBuilderString: 'setQueryBuilderString';
  parentComponentDispatch: React.Dispatch<{
    type: 'setQueryBuilderString';
    payload: string;
  }>;
};

type QueryBuilderState = {
  currentFilterTerm: string;
  currentFilterOperator: string;
  currentFilterValue: string;
  isCurrentFilterValueValid: boolean;
  isCurrentFilterValueFocused: boolean;
  filterOperatorSelectData: string[];

  currentSortTerm: string;
  currentSortDirection: string;

  filterSelectData: string[];
  sortSelectData: string[];
  labelValueTypesMap: QueryLabelValueTypesMap;

  filterStatementsQueue: [string, string, string][];
  sortStatementsQueue: [string, string][];

  projectionArray: string[];
  projectionCheckboxData: CheckboxInputData;
  selectedFieldsSet: Set<string>;
  projectedFieldsSet: Set<string>;

  queryString: string;
};

type QueryBuilderAction = {
  setCurrentFilterTerm: 'setCurrentFilterTerm';
  setCurrentFilterOperator: 'setCurrentFilterOperator';
  setCurrentFilterValue: 'setCurrentFilterValue';
  setIsCurrentFilterValueValid: 'setIsCurrentFilterValueValid';
  setIsCurrentFilterValueFocused: 'setIsCurrentFilterValueFocused';
  setFilterOperatorSelectData: 'setFilterOperatorSelectData';

  setCurrentSortTerm: 'setCurrentSortTerm';
  setCurrentSortDirection: 'setCurrentSortDirection';

  setFilterSelectData: 'setFilterSelectData';
  setSortSelectData: 'setSortSelectData';
  setLabelValueTypesMap: 'setLabelValueTypesMap';

  setFilterStatementsQueue: 'setFilterStatementsQueue';
  setSortStatementsQueue: 'setSortStatementsQueue';

  setProjectionArray: 'setProjectionArray';
  setProjectionCheckboxData: 'setProjectionCheckboxData';
  setSelectedFieldsSet: 'setSelectedFieldsSet';
  setProjectedFieldsSet: 'setProjectedFieldsSet';

  setClearAllQueryData: 'setClearAllQueryData';
  buildQueryString: 'buildQueryString';
};

type QueryBuilderDispatch =
  | {
      type:
        | QueryBuilderAction['setCurrentFilterTerm']
        | QueryBuilderAction['setCurrentFilterOperator']
        | QueryBuilderAction['setCurrentFilterValue']
        | QueryBuilderAction['setCurrentSortTerm']
        | QueryBuilderAction['setCurrentSortDirection']
        | QueryBuilderAction['setClearAllQueryData'];

      payload: string;
    }
  | {
      type:
        | QueryBuilderAction['setIsCurrentFilterValueValid']
        | QueryBuilderAction['setIsCurrentFilterValueFocused'];

      payload: boolean;
    }
  | {
      type:
        | QueryBuilderAction['setFilterSelectData']
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
        calledFrom: 'filter' | 'sort';
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
