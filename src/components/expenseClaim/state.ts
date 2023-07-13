import type {
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

/**
 * NEITHER OF BELOW IMPLEMENTATIONS WORK WITH TYPESCRIPT
 */

/*
 *  const lookupMap = new Map([
 *  [
      expenseClaimAction.setExpenseClaimAmount,
      function () {
        return {
          ...state,
          expenseClaimAmount: action.payload,
        };
      },
    ],
    [
      expenseClaimAction.setIsValidExpenseClaimAmount,
      () => ({
        ...state,
        isValidExpenseClaimAmount: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsExpenseClaimAmountFocused,
      () => ({
        ...state,
        isExpenseClaimAmountFocused: action.payload,
      }),
    ],

    [
      expenseClaimAction.setExpenseClaimKind,
      () => ({
        ...state,
        expenseClaimKind: action.payload,
      }),
    ],
    [
      expenseClaimAction.setExpenseClaimCurrency,
      () => ({
        ...state,
        expenseClaimCurrency: action.payload,
      }),
    ],

    [
      expenseClaimAction.setExpenseClaimDate,
      () => ({
        ...state,
        expenseClaimDate: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsValidExpenseClaimDate,
      () => ({
        ...state,
        isValidExpenseClaimDate: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsExpenseClaimDateFocused,
      () => ({
        ...state,
        isExpenseClaimDateFocused: action.payload,
      }),
    ],

    [
      expenseClaimAction.setExpenseClaimDescription,
      () => ({
        ...state,
        expenseClaimDescription: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsValidExpenseClaimDescription,
      () => ({
        ...state,
        isValidExpenseClaimDescription: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsExpenseClaimDescriptionFocused,
      () => ({
        ...state,
        isExpenseClaimDescriptionFocused: action.payload,
      }),
    ],

    [
      expenseClaimAction.setAdditionalComments,
      () => ({
        ...state,
        additionalComments: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsValidAdditionalComments,
      () => ({
        ...state,
        isValidAdditionalComments: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsAdditionalCommentsFocused,
      () => ({
        ...state,
        isAdditionalCommentsFocused: action.payload,
      }),
    ],

    [
      expenseClaimAction.setAcknowledgement,
      () => ({
        ...state,
        acknowledgement: action.payload,
      }),
    ],
    [
      expenseClaimAction.setCurrentStepperPosition,
      () => ({
        ...state,
        currentStepperPosition: action.payload,
      }),
    ],
    [
      expenseClaimAction.setStepsInError,
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
      expenseClaimAction.setIsError,
      () => ({
        ...state,
        isError: action.payload,
      }),
    ],
    [
      expenseClaimAction.setErrorMessage,
      () => ({
        ...state,
        errorMessage: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsSubmitting,
      () => ({
        ...state,
        isSubmitting: action.payload,
      }),
    ],
    [
      expenseClaimAction.setSubmitMessage,
      () => ({
        ...state,
        submitMessage: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsSuccessful,
      () => ({
        ...state,
        isSuccessful: action.payload,
      }),
    ],
    [
      expenseClaimAction.setSuccessMessage,
      () => ({
        ...state,
        successMessage: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsLoading,
      () => ({
        ...state,
        isLoading: action.payload,
      }),
    ],
    [
      expenseClaimAction.setLoadingMessage,
      () => ({
        ...state,
        loadingMessage: action.payload,
      }),
    ],
  ]);
 */

/**
   * function expenseClaimReducer1(
  state: ExpenseClaimState,
  action: ExpenseClaimDispatch
): ExpenseClaimState {
  const lookupMap = new Map([
    [
      expenseClaimAction.setExpenseClaimAmount,
      ({ state, action }: setExpenseClaimAmountProps) => ({
        ...state,
        expenseClaimAmount: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsValidExpenseClaimAmount,
      ({ state, action }: setIsValidExpenseClaimAmountProps) => ({
        ...state,
        isValidExpenseClaimAmount: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsExpenseClaimAmountFocused,
      ({ state, action }: setIsExpenseClaimAmountFocusedProps) => ({
        ...state,
        isExpenseClaimAmountFocused: action.payload,
      }),
    ],

    [
      expenseClaimAction.setExpenseClaimKind,
      ({ state, action }: setExpenseClaimKindProps) => ({
        ...state,
        expenseClaimKind: action.payload,
      }),
    ],
    [
      expenseClaimAction.setExpenseClaimCurrency,
      ({ state, action }: setExpenseClaimCurrencyProps) => ({
        ...state,
        expenseClaimCurrency: action.payload,
      }),
    ],

    [
      expenseClaimAction.setExpenseClaimDate,
      ({ state, action }: setExpenseClaimDateProps) => ({
        ...state,
        expenseClaimDate: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsValidExpenseClaimDate,
      ({ state, action }: setIsValidExpenseClaimDateProps) => ({
        ...state,
        isValidExpenseClaimDate: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsExpenseClaimDateFocused,
      ({ state, action }: setIsExpenseClaimAmountFocusedProps) => ({
        ...state,
        isExpenseClaimDateFocused: action.payload,
      }),
    ],

    [
      expenseClaimAction.setExpenseClaimDescription,
      ({ state, action }: setExpenseClaimDescriptionProps) => ({
        ...state,
        expenseClaimDescription: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsValidExpenseClaimDescription,
      ({ state, action }: setIsValidExpenseClaimDescriptionProps) => ({
        ...state,
        isValidExpenseClaimDescription: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsExpenseClaimDescriptionFocused,
      ({ state, action }: setIsExpenseClaimDateFocusedProps) => ({
        ...state,
        isExpenseClaimDescriptionFocused: action.payload,
      }),
    ],

    [
      expenseClaimAction.setAdditionalComments,
      ({ state, action }: setAdditionalCommentsProps) => ({
        ...state,
        additionalComments: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsValidAdditionalComments,
      ({ state, action }: setIsValidAdditionalCommentsProps) => ({
        ...state,
        isValidAdditionalComments: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsAdditionalCommentsFocused,
      ({ state, action }: setIsAdditionalCommentsFocusedProps) => ({
        ...state,
        isAdditionalCommentsFocused: action.payload,
      }),
    ],

    [
      expenseClaimAction.setAcknowledgement,
      ({ state, action }: setAcknowledgementProps) => ({
        ...state,
        acknowledgement: action.payload,
      }),
    ],
    [
      expenseClaimAction.setCurrentStepperPosition,
      ({ state, action }: setCurrentStepperPositionProps) => ({
        ...state,
        currentStepperPosition: action.payload,
      }),
    ],
    [
      expenseClaimAction.setStepsInError,
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
      expenseClaimAction.setIsError,
      ({ state, action }: setIsErrorProps) => ({
        ...state,
        isError: action.payload,
      }),
    ],
    [
      expenseClaimAction.setErrorMessage,
      ({ state, action }: setErrorMessageProps) => ({
        ...state,
        errorMessage: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsSubmitting,
      ({ state, action }: setIsSubmittingProps) => ({
        ...state,
        isSubmitting: action.payload,
      }),
    ],
    [
      expenseClaimAction.setSubmitMessage,
      ({ state, action }: setSubmitMessageProps) => ({
        ...state,
        submitMessage: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsSuccessful,
      ({ state, action }: setIsSuccessfulProps) => ({
        ...state,
        isSuccessful: action.payload,
      }),
    ],
    [
      expenseClaimAction.setSuccessMessage,
      ({ state, action }: setSuccessMessageProps) => ({
        ...state,
        successMessage: action.payload,
      }),
    ],
    [
      expenseClaimAction.setIsLoading,
      ({ state, action }: setIsLoadingProps) => ({
        ...state,
        isLoading: action.payload,
      }),
    ],
    [
      expenseClaimAction.setLoadingMessage,
      ({ state, action }: setLoadingMessageProps) => ({
        ...state,
        loadingMessage: action.payload,
      }),
    ],
  ]);

  return lookupMap.get(action.type)?.({ state, action }) ?? state;
}
   */
