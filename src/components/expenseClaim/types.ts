import {
  Action,
  ActionsCompany,
  Currency,
  SetStepsInErrorPayload,
} from '../../types';

type ExpenseClaimKind =
  | 'Travel and Accomodation'
  | 'Equipment and Supplies'
  | 'Communication and Utilities'
  | 'Training and Certifications'
  | 'Software and Licenses'
  | 'Marketing and Advertising'
  | 'Insurance'
  | 'Rent and Leasing'
  | 'Legal and Professional Fees'
  | 'Miscellaneous';

type ExpenseClaimSchema = {
  userId: string;
  username: string;
  action: Action;
  category: ActionsCompany;

  uploadedFileId: string;
  expenseClaimKind: ExpenseClaimKind;
  expenseClaimAmount: number;
  expenseClaimCurrency: Currency;
  expenseClaimDate: string;
  expenseClaimDescription: string;
  additionalComments: string;
  acknowledgement: boolean;
};

type ExpenseClaimDocument = ExpenseClaimSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type ExpenseClaimState = {
  expenseClaimAmount: string;
  isValidExpenseClaimAmount: boolean;
  isExpenseClaimAmountFocused: boolean;

  expenseClaimKind: ExpenseClaimKind;
  expenseClaimCurrency: Currency;

  expenseClaimDate: string;
  isValidExpenseClaimDate: boolean;
  isExpenseClaimDateFocused: boolean;

  expenseClaimDescription: string;
  isValidExpenseClaimDescription: boolean;
  isExpenseClaimDescriptionFocused: boolean;

  additionalComments: string;
  isValidAdditionalComments: boolean;
  isAdditionalCommentsFocused: boolean;

  acknowledgement: boolean;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isError: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type ExpenseClaimAction = {
  setExpenseClaimAmount: 'setExpenseClaimAmount';
  setIsValidExpenseClaimAmount: 'setIsValidExpenseClaimAmount';
  setIsExpenseClaimAmountFocused: 'setIsExpenseClaimAmountFocused';

  setExpenseClaimKind: 'setExpenseClaimKind';
  setExpenseClaimCurrency: 'setExpenseClaimCurrency';

  setExpenseClaimDate: 'setExpenseClaimDate';
  setIsValidExpenseClaimDate: 'setIsValidExpenseClaimDate';
  setIsExpenseClaimDateFocused: 'setIsExpenseClaimDateFocused';

  setExpenseClaimDescription: 'setExpenseClaimDescription';
  setIsValidExpenseClaimDescription: 'setIsValidExpenseClaimDescription';
  setIsExpenseClaimDescriptionFocused: 'setIsExpenseClaimDescriptionFocused';

  setAdditionalComments: 'setAdditionalComments';
  setIsValidAdditionalComments: 'setIsValidAdditionalComments';
  setIsAdditionalCommentsFocused: 'setIsAdditionalCommentsFocused';

  setAcknowledgement: 'setAcknowledgement';
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type ExpenseClaimDispatch =
  | {
      type: ExpenseClaimAction['setExpenseClaimKind'];
      payload: ExpenseClaimKind;
    }
  | {
      type:
        | ExpenseClaimAction['setExpenseClaimAmount']
        | ExpenseClaimAction['setExpenseClaimDate']
        | ExpenseClaimAction['setExpenseClaimDescription']
        | ExpenseClaimAction['setAdditionalComments']
        | ExpenseClaimAction['setErrorMessage']
        | ExpenseClaimAction['setSubmitMessage']
        | ExpenseClaimAction['setSuccessMessage']
        | ExpenseClaimAction['setLoadingMessage'];
      payload: string;
    }
  | {
      type:
        | ExpenseClaimAction['setIsValidExpenseClaimAmount']
        | ExpenseClaimAction['setIsExpenseClaimAmountFocused']
        | ExpenseClaimAction['setIsValidExpenseClaimDate']
        | ExpenseClaimAction['setIsExpenseClaimDateFocused']
        | ExpenseClaimAction['setIsValidExpenseClaimDescription']
        | ExpenseClaimAction['setIsExpenseClaimDescriptionFocused']
        | ExpenseClaimAction['setIsValidAdditionalComments']
        | ExpenseClaimAction['setIsAdditionalCommentsFocused']
        | ExpenseClaimAction['setAcknowledgement']
        | ExpenseClaimAction['setIsError']
        | ExpenseClaimAction['setIsSubmitting']
        | ExpenseClaimAction['setIsSuccessful']
        | ExpenseClaimAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: ExpenseClaimAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: ExpenseClaimAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    }
  | {
      type: ExpenseClaimAction['setExpenseClaimCurrency'];
      payload: Currency;
    };

type ExpenseClaimReducer = (
  state: ExpenseClaimState,
  action: ExpenseClaimDispatch
) => ExpenseClaimState;

export type {
  ExpenseClaimAction,
  ExpenseClaimDispatch,
  ExpenseClaimDocument,
  ExpenseClaimKind,
  ExpenseClaimReducer,
  ExpenseClaimSchema,
  ExpenseClaimState,
};

/**
 * 
 * type setExpenseClaimKindProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setExpenseClaimKind'];
    payload: ExpenseClaimKind;
  };
};

type setExpenseClaimCurrencyProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setExpenseClaimCurrency'];
    payload: Currency;
  };
};

type setExpenseClaimDateProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setExpenseClaimDate'];
    payload: string;
  };
};

type setIsValidExpenseClaimDateProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setIsValidExpenseClaimDate'];
    payload: boolean;
  };
};

type setIsExpenseClaimDateFocusedProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setIsExpenseClaimDateFocused'];
    payload: boolean;
  };
};

type setExpenseClaimDescriptionProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setExpenseClaimDescription'];
    payload: string;
  };
};

type setIsValidExpenseClaimDescriptionProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setIsValidExpenseClaimDescription'];
    payload: boolean;
  };
};

type setIsExpenseClaimDescriptionFocusedProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setIsExpenseClaimDescriptionFocused'];
    payload: boolean;
  };
};

type setAdditionalCommentsProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setAdditionalComments'];
    payload: string;
  };
};

type setIsValidAdditionalCommentsProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setIsValidAdditionalComments'];
    payload: boolean;
  };
};

type setIsAdditionalCommentsFocusedProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setIsAdditionalCommentsFocused'];
    payload: boolean;
  };
};

type setAcknowledgementProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setAcknowledgement'];
    payload: boolean;
  };
};

type setCurrentStepperPositionProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setCurrentStepperPosition'];
    payload: number;
  };
};

type setStepsInErrorProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setStepsInError'];
    payload: SetStepsInErrorPayload;
  };
};

type setIsErrorProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setIsError'];
    payload: boolean;
  };
};

type setErrorMessageProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setErrorMessage'];
    payload: string;
  };
};

type setIsSubmittingProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setIsSubmitting'];
    payload: boolean;
  };
};

type setSubmitMessageProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setSubmitMessage'];
    payload: string;
  };
};

type setIsSuccessfulProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setIsSuccessful'];
    payload: boolean;
  };
};

type setSuccessMessageProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setSuccessMessage'];
    payload: string;
  };
};

type setIsLoadingProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setIsLoading'];
    payload: boolean;
  };
};

type setLoadingMessageProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setLoadingMessage'];
    payload: string;
  };
};

type setExpenseClaimAmountProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setExpenseClaimAmount'];
    payload: string;
  };
};

type setIsValidExpenseClaimAmountProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setIsValidExpenseClaimAmount'];
    payload: boolean;
  };
};

type setIsExpenseClaimAmountFocusedProps = {
  state: ExpenseClaimState;
  action: {
    type: ExpenseClaimAction['setIsExpenseClaimAmountFocused'];
    payload: boolean;
  };
};


export type {
  setAcknowledgementProps,
  setAdditionalCommentsProps,
  setCurrentStepperPositionProps,
  setErrorMessageProps,
  setExpenseClaimAmountProps,
  setExpenseClaimCurrencyProps,
  setExpenseClaimDateProps,
  setExpenseClaimDescriptionProps,
  setExpenseClaimKindProps,
  setIsAdditionalCommentsFocusedProps,
  setIsErrorProps,
  setIsExpenseClaimAmountFocusedProps,
  setIsExpenseClaimDateFocusedProps,
  setIsExpenseClaimDescriptionFocusedProps,
  setIsLoadingProps,
  setIsSubmittingProps,
  setIsSuccessfulProps,
  setIsValidAdditionalCommentsProps,
  setIsValidExpenseClaimAmountProps,
  setIsValidExpenseClaimDateProps,
  setIsValidExpenseClaimDescriptionProps,
  setLoadingMessageProps,
  setStepsInErrorProps,
  setSubmitMessageProps,
  setSuccessMessageProps,
};

*/
