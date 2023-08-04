import { UseFetchAction, UseFetchDispatch, UseFetchState } from './types';

const initialUseFetchState: UseFetchState = {
  data: [],
  url: '',
  isLoading: false,
  loadingMessage: '',
  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
};

const useFetchAction: UseFetchAction = {
  setData: 'setData',
  setUrl: 'setUrl',

  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',

  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',

  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
};

function useFetchReducer(
  state: UseFetchState,
  action: UseFetchDispatch
): UseFetchState {
  switch (action.type) {
    case useFetchAction.setData:
      return {
        ...state,
        data: action.payload,
      };

    case useFetchAction.setUrl:
      return {
        ...state,
        url: action.payload,
      };

    case useFetchAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };

    case useFetchAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    case useFetchAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };

    case useFetchAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case useFetchAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case useFetchAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };

    case useFetchAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };

    case useFetchAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };

    default:
      return state;
  }
}

export { initialUseFetchState, useFetchAction, useFetchReducer };
