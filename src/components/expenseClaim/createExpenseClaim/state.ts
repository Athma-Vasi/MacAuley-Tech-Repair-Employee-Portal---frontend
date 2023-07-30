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
  triggerFormSubmit: false,
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
  setTriggerFormSubmit: 'setTriggerFormSubmit',
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

    case createExpenseClaimAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case createExpenseClaimAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
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

/**
 * NEITHER OF BELOW IMPLEMENTATIONS WORK WITH TYPESCRIPT
 */

/*
 *  const lookupMap = new Map([
 *  [
      createExpenseClaimAction.setExpenseClaimAmount,
      function () {
        return {
          ...state,
          expenseClaimAmount: action.payload,
        };
      },
    ],
    [
      createExpenseClaimAction.setIsValidExpenseClaimAmount,
      () => ({
        ...state,
        isValidExpenseClaimAmount: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsExpenseClaimAmountFocused,
      () => ({
        ...state,
        isExpenseClaimAmountFocused: action.payload,
      }),
    ],

    [
      createExpenseClaimAction.setExpenseClaimKind,
      () => ({
        ...state,
        expenseClaimKind: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setExpenseClaimCurrency,
      () => ({
        ...state,
        expenseClaimCurrency: action.payload,
      }),
    ],

    [
      createExpenseClaimAction.setExpenseClaimDate,
      () => ({
        ...state,
        expenseClaimDate: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsValidExpenseClaimDate,
      () => ({
        ...state,
        isValidExpenseClaimDate: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsExpenseClaimDateFocused,
      () => ({
        ...state,
        isExpenseClaimDateFocused: action.payload,
      }),
    ],

    [
      createExpenseClaimAction.setExpenseClaimDescription,
      () => ({
        ...state,
        expenseClaimDescription: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsValidExpenseClaimDescription,
      () => ({
        ...state,
        isValidExpenseClaimDescription: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsExpenseClaimDescriptionFocused,
      () => ({
        ...state,
        isExpenseClaimDescriptionFocused: action.payload,
      }),
    ],

    [
      createExpenseClaimAction.setAdditionalComments,
      () => ({
        ...state,
        additionalComments: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsValidAdditionalComments,
      () => ({
        ...state,
        isValidAdditionalComments: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsAdditionalCommentsFocused,
      () => ({
        ...state,
        isAdditionalCommentsFocused: action.payload,
      }),
    ],

    [
      createExpenseClaimAction.setAcknowledgement,
      () => ({
        ...state,
        acknowledgement: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setCurrentStepperPosition,
      () => ({
        ...state,
        currentStepperPosition: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setStepsInError,
      () => {
        const { kind, step } = action.payload;
        const stepsInError = new Set(state.stepsInError);

        kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

        return {
          ...state,
          stepsInError,
        };
      },
    ],

    [
      createExpenseClaimAction.setIsError,
      () => ({
        ...state,
        isError: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setErrorMessage,
      () => ({
        ...state,
        errorMessage: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsSubmitting,
      () => ({
        ...state,
        isSubmitting: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setSubmitMessage,
      () => ({
        ...state,
        submitMessage: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsSuccessful,
      () => ({
        ...state,
        isSuccessful: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setSuccessMessage,
      () => ({
        ...state,
        successMessage: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsLoading,
      () => ({
        ...state,
        isLoading: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setLoadingMessage,
      () => ({
        ...state,
        loadingMessage: action.payload,
      }),
    ],
  ]);
 */

/**
   * function expenseClaimReducer1(
  state: CreateExpenseClaimState,
  action: CreateExpenseClaimDispatch
): CreateExpenseClaimState {
  const lookupMap = new Map([
    [
      createExpenseClaimAction.setExpenseClaimAmount,
      ({ state, action }: setExpenseClaimAmountProps) => ({
        ...state,
        expenseClaimAmount: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsValidExpenseClaimAmount,
      ({ state, action }: setIsValidExpenseClaimAmountProps) => ({
        ...state,
        isValidExpenseClaimAmount: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsExpenseClaimAmountFocused,
      ({ state, action }: setIsExpenseClaimAmountFocusedProps) => ({
        ...state,
        isExpenseClaimAmountFocused: action.payload,
      }),
    ],

    [
      createExpenseClaimAction.setExpenseClaimKind,
      ({ state, action }: setExpenseClaimKindProps) => ({
        ...state,
        expenseClaimKind: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setExpenseClaimCurrency,
      ({ state, action }: setExpenseClaimCurrencyProps) => ({
        ...state,
        expenseClaimCurrency: action.payload,
      }),
    ],

    [
      createExpenseClaimAction.setExpenseClaimDate,
      ({ state, action }: setExpenseClaimDateProps) => ({
        ...state,
        expenseClaimDate: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsValidExpenseClaimDate,
      ({ state, action }: setIsValidExpenseClaimDateProps) => ({
        ...state,
        isValidExpenseClaimDate: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsExpenseClaimDateFocused,
      ({ state, action }: setIsExpenseClaimAmountFocusedProps) => ({
        ...state,
        isExpenseClaimDateFocused: action.payload,
      }),
    ],

    [
      createExpenseClaimAction.setExpenseClaimDescription,
      ({ state, action }: setExpenseClaimDescriptionProps) => ({
        ...state,
        expenseClaimDescription: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsValidExpenseClaimDescription,
      ({ state, action }: setIsValidExpenseClaimDescriptionProps) => ({
        ...state,
        isValidExpenseClaimDescription: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsExpenseClaimDescriptionFocused,
      ({ state, action }: setIsExpenseClaimDateFocusedProps) => ({
        ...state,
        isExpenseClaimDescriptionFocused: action.payload,
      }),
    ],

    [
      createExpenseClaimAction.setAdditionalComments,
      ({ state, action }: setAdditionalCommentsProps) => ({
        ...state,
        additionalComments: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsValidAdditionalComments,
      ({ state, action }: setIsValidAdditionalCommentsProps) => ({
        ...state,
        isValidAdditionalComments: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsAdditionalCommentsFocused,
      ({ state, action }: setIsAdditionalCommentsFocusedProps) => ({
        ...state,
        isAdditionalCommentsFocused: action.payload,
      }),
    ],

    [
      createExpenseClaimAction.setAcknowledgement,
      ({ state, action }: setAcknowledgementProps) => ({
        ...state,
        acknowledgement: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setCurrentStepperPosition,
      ({ state, action }: setCurrentStepperPositionProps) => ({
        ...state,
        currentStepperPosition: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setStepsInError,
      ({ state, action }: setStepsInErrorProps) => {
        const { kind, step } = action.payload;
        const stepsInError = new Set(state.stepsInError);
        kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

        return {
          ...state,
          stepsInError,
        };
      },
    ],

    [
      createExpenseClaimAction.setIsError,
      ({ state, action }: setIsErrorProps) => ({
        ...state,
        isError: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setErrorMessage,
      ({ state, action }: setErrorMessageProps) => ({
        ...state,
        errorMessage: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsSubmitting,
      ({ state, action }: setIsSubmittingProps) => ({
        ...state,
        isSubmitting: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setSubmitMessage,
      ({ state, action }: setSubmitMessageProps) => ({
        ...state,
        submitMessage: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsSuccessful,
      ({ state, action }: setIsSuccessfulProps) => ({
        ...state,
        isSuccessful: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setSuccessMessage,
      ({ state, action }: setSuccessMessageProps) => ({
        ...state,
        successMessage: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setIsLoading,
      ({ state, action }: setIsLoadingProps) => ({
        ...state,
        isLoading: action.payload,
      }),
    ],
    [
      createExpenseClaimAction.setLoadingMessage,
      ({ state, action }: setLoadingMessageProps) => ({
        ...state,
        loadingMessage: action.payload,
      }),
    ],
  ]);

  return lookupMap.get(action.type)?.({ state, action }) ?? state;
}
   */
