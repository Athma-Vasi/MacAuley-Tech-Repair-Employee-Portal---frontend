import {
  ExpenseClaimAction,
  ExpenseClaimDispatch,
  ExpenseClaimState,
} from './types';

const initialExpenseClaimState: ExpenseClaimState = {
  expenseClaimAmount: '',
  isValidExpenseClaimAmount: false,
  isExpenseClaimAmountFocused: false,

  expenseClaimKind: 'Travel and Accomodation',
  expenseClaimCurrency: 'USD',

  expenseClaimDate: '',
  isValidExpenseClaimDate: false,
  isExpenseClaimDateFocused: false,

  expenseClaimDescription: '',
  isValidExpenseClaimDescription: false,
  isExpenseClaimDescriptionFocused: false,

  additionalComments: '',
  isValidAdditionalComments: false,
  isAdditionalCommentsFocused: false,

  acknowledgement: false,
  currentStepperPosition: 0,
  stepsInError: new Set(),

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
};

const expenseClaimAction: ExpenseClaimAction = {
  setExpenseClaimAmount: 'setExpenseClaimAmount',
  setIsValidExpenseClaimAmount: 'setIsValidExpenseClaimAmount',
  setIsExpenseClaimAmountFocused: 'setIsExpenseClaimAmountFocused',

  setExpenseClaimKind: 'setExpenseClaimKind',
  setExpenseClaimCurrency: 'setExpenseClaimCurrency',

  setExpenseClaimDate: 'setExpenseClaimDate',
  setIsValidExpenseClaimDate: 'setIsValidExpenseClaimDate',
  setIsExpenseClaimDateFocused: 'setIsExpenseClaimDateFocused',

  setExpenseClaimDescription: 'setExpenseClaimDescription',
  setIsValidExpenseClaimDescription: 'setIsValidExpenseClaimDescription',
  setIsExpenseClaimDescriptionFocused: 'setIsExpenseClaimDescriptionFocused',

  setAdditionalComments: 'setAdditionalComments',
  setIsValidAdditionalComments: 'setIsValidAdditionalComments',
  setIsAdditionalCommentsFocused: 'setIsAdditionalCommentsFocused',

  setAcknowledgement: 'setAcknowledgement',
  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function expenseClaimReducer(
  state: ExpenseClaimState,
  action: ExpenseClaimDispatch
): ExpenseClaimState {
  switch (action.type) {
    case expenseClaimAction.setExpenseClaimAmount:
      return {
        ...state,
        expenseClaimAmount: action.payload,
      };
    case expenseClaimAction.setIsValidExpenseClaimAmount:
      return {
        ...state,
        isValidExpenseClaimAmount: action.payload,
      };
    case expenseClaimAction.setIsExpenseClaimAmountFocused:
      return {
        ...state,
        isExpenseClaimAmountFocused: action.payload,
      };

    case expenseClaimAction.setExpenseClaimKind:
      return {
        ...state,
        expenseClaimKind: action.payload,
      };
    case expenseClaimAction.setExpenseClaimCurrency:
      return {
        ...state,
        expenseClaimCurrency: action.payload,
      };

    case expenseClaimAction.setExpenseClaimDate:
      return {
        ...state,
        expenseClaimDate: action.payload,
      };
    case expenseClaimAction.setIsValidExpenseClaimDate:
      return {
        ...state,
        isValidExpenseClaimDate: action.payload,
      };
    case expenseClaimAction.setIsExpenseClaimDateFocused:
      return {
        ...state,
        isExpenseClaimDateFocused: action.payload,
      };

    case expenseClaimAction.setExpenseClaimDescription:
      return {
        ...state,
        expenseClaimDescription: action.payload,
      };
    case expenseClaimAction.setIsValidExpenseClaimDescription:
      return {
        ...state,
        isValidExpenseClaimDescription: action.payload,
      };
    case expenseClaimAction.setIsExpenseClaimDescriptionFocused:
      return {
        ...state,
        isExpenseClaimDescriptionFocused: action.payload,
      };

    case expenseClaimAction.setAdditionalComments:
      return {
        ...state,
        additionalComments: action.payload,
      };
    case expenseClaimAction.setIsValidAdditionalComments:
      return {
        ...state,
        isValidAdditionalComments: action.payload,
      };
    case expenseClaimAction.setIsAdditionalCommentsFocused:
      return {
        ...state,
        isAdditionalCommentsFocused: action.payload,
      };

    case expenseClaimAction.setAcknowledgement:
      return {
        ...state,
        acknowledgement: action.payload,
      };
    case expenseClaimAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case expenseClaimAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case expenseClaimAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case expenseClaimAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case expenseClaimAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case expenseClaimAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case expenseClaimAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case expenseClaimAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case expenseClaimAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case expenseClaimAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    default:
      return state;
  }
}

export { expenseClaimAction, expenseClaimReducer, initialExpenseClaimState };
