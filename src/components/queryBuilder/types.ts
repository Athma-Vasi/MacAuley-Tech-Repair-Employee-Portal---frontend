import { SelectInputData } from '../../types';

type QueryBuilderState = {
  currentFilterTerm: string;
  currentFilterOperator: string;
  currentFilterValue: string;

  currentSortTerm: string;
  currentSortDirection: string;

  filterSelectData: SelectInputData;
  sortSelectData: SelectInputData;

  filterStatementsQueue: string[];
  sortStatementsQueue: string[];

  projectionArray: string[];
  selectedFieldsSet: Set<string>;

  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  loadingMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
};

type QueryBuilderAction = {
  setCurrentFilterTerm: 'setCurrentFilterTerm';
  setCurrentFilterOperator: 'setCurrentFilterOperator';
  setCurrentFilterValue: 'setCurrentFilterValue';

  setCurrentSortTerm: 'setCurrentSortTerm';
  setCurrentSortDirection: 'setCurrentSortDirection';

  setFilterSelectData: 'setFilterSelectData';
  setSortSelectData: 'setSortSelectData';

  setFilterStatementsQueue: 'setFilterStatementsQueue';
  setSortStatementsQueue: 'setSortStatementsQueue';

  setProjectionArray: 'setProjectionArray';
  setSelectedFieldsSet: 'setSelectedFieldsSet';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type QueryBuilderDispatch =
  | {
      type:
        | QueryBuilderAction['setCurrentFilterTerm']
        | QueryBuilderAction['setCurrentFilterOperator']
        | QueryBuilderAction['setCurrentFilterValue']
        | QueryBuilderAction['setCurrentSortTerm']
        | QueryBuilderAction['setCurrentSortDirection']
        | QueryBuilderAction['setErrorMessage']
        | QueryBuilderAction['setSuccessMessage']
        | QueryBuilderAction['setLoadingMessage']
        | QueryBuilderAction['setSubmitMessage'];
      payload: string;
    }
  | {
      type:
        | QueryBuilderAction['setFilterSelectData']
        | QueryBuilderAction['setSortSelectData'];
      payload: SelectInputData;
    }
  | {
      type:
        | QueryBuilderAction['setFilterStatementsQueue']
        | QueryBuilderAction['setSortStatementsQueue'];
      payload: {
        index: number;
        value: string[];
      };
    }
  | {
      type: QueryBuilderAction['setProjectionArray'];
      payload: string;
    }
  | {
      type: QueryBuilderAction['setSelectedFieldsSet'];
      payload: {
        kind: 'add' | 'delete';
        value: string;
      };
    };

type QueryBuilderReducer = (
  state: QueryBuilderState,
  action: QueryBuilderDispatch
) => QueryBuilderState;

export type {
  QueryBuilderAction,
  QueryBuilderDispatch,
  QueryBuilderReducer,
  QueryBuilderState,
};
