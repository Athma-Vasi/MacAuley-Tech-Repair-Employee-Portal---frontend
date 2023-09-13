import type {
  CreateExpenseClaimAction,
  CreateExpenseClaimDispatch,
  CreateExpenseClaimState,
} from './types';

const initialCreateExpenseClaimState: CreateExpenseClaimState = {
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

  imgFormDataArray: [],
  areImagesValid: false,

  triggerFormSubmit: false,

  currentStepperPosition: 0,
  stepsInError: new Set(),

  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
};

const createExpenseClaimAction: CreateExpenseClaimAction = {
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

  setImgFormDataArray: 'setImgFormDataArray',
  setAreImagesValid: 'setAreImagesValid',

  setTriggerFormSubmit: 'setTriggerFormSubmit',

  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function createExpenseClaimReducer(
  state: CreateExpenseClaimState,
  action: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  switch (action.type) {
    case createExpenseClaimAction.setExpenseClaimAmount:
      return {
        ...state,
        expenseClaimAmount: action.payload,
      };
    case createExpenseClaimAction.setIsValidExpenseClaimAmount:
      return {
        ...state,
        isValidExpenseClaimAmount: action.payload,
      };
    case createExpenseClaimAction.setIsExpenseClaimAmountFocused:
      return {
        ...state,
        isExpenseClaimAmountFocused: action.payload,
      };

    case createExpenseClaimAction.setExpenseClaimKind:
      return {
        ...state,
        expenseClaimKind: action.payload,
      };
    case createExpenseClaimAction.setExpenseClaimCurrency:
      return {
        ...state,
        expenseClaimCurrency: action.payload,
      };

    case createExpenseClaimAction.setExpenseClaimDate:
      return {
        ...state,
        expenseClaimDate: action.payload,
      };
    case createExpenseClaimAction.setIsValidExpenseClaimDate:
      return {
        ...state,
        isValidExpenseClaimDate: action.payload,
      };
    case createExpenseClaimAction.setIsExpenseClaimDateFocused:
      return {
        ...state,
        isExpenseClaimDateFocused: action.payload,
      };

    case createExpenseClaimAction.setExpenseClaimDescription:
      return {
        ...state,
        expenseClaimDescription: action.payload,
      };
    case createExpenseClaimAction.setIsValidExpenseClaimDescription:
      return {
        ...state,
        isValidExpenseClaimDescription: action.payload,
      };
    case createExpenseClaimAction.setIsExpenseClaimDescriptionFocused:
      return {
        ...state,
        isExpenseClaimDescriptionFocused: action.payload,
      };

    case createExpenseClaimAction.setAdditionalComments:
      return {
        ...state,
        additionalComments: action.payload,
      };
    case createExpenseClaimAction.setIsValidAdditionalComments:
      return {
        ...state,
        isValidAdditionalComments: action.payload,
      };
    case createExpenseClaimAction.setIsAdditionalCommentsFocused:
      return {
        ...state,
        isAdditionalCommentsFocused: action.payload,
      };

    case createExpenseClaimAction.setImgFormDataArray:
      return {
        ...state,
        imgFormDataArray: action.payload,
      };
    case createExpenseClaimAction.setAreImagesValid:
      return {
        ...state,
        areImagesValid: action.payload,
      };

    case createExpenseClaimAction.setAcknowledgement:
      return {
        ...state,
        acknowledgement: action.payload,
      };

    case createExpenseClaimAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };

    case createExpenseClaimAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createExpenseClaimAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case createExpenseClaimAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createExpenseClaimAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createExpenseClaimAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createExpenseClaimAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case createExpenseClaimAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case createExpenseClaimAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    default:
      return state;
  }
}

export {
  createExpenseClaimAction,
  createExpenseClaimReducer,
  initialCreateExpenseClaimState,
};
