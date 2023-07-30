import {
  Action,
  ActionsCompany,
  Currency,
  SetStepsInErrorPayload,
} from '../../../types';

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

type CreateExpenseClaimState = {
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
  triggerFormSubmit: boolean;
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

type CreateExpenseClaimAction = {
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
  setTriggerFormSubmit: 'setTriggerFormSubmit';
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

type CreateExpenseClaimDispatch =
  | {
      type: CreateExpenseClaimAction['setExpenseClaimKind'];
      payload: ExpenseClaimKind;
    }
  | {
      type:
        | CreateExpenseClaimAction['setExpenseClaimAmount']
        | CreateExpenseClaimAction['setExpenseClaimDate']
        | CreateExpenseClaimAction['setExpenseClaimDescription']
        | CreateExpenseClaimAction['setAdditionalComments']
        | CreateExpenseClaimAction['setErrorMessage']
        | CreateExpenseClaimAction['setSubmitMessage']
        | CreateExpenseClaimAction['setSuccessMessage']
        | CreateExpenseClaimAction['setLoadingMessage'];
      payload: string;
    }
  | {
      type:
        | CreateExpenseClaimAction['setIsValidExpenseClaimAmount']
        | CreateExpenseClaimAction['setIsExpenseClaimAmountFocused']
        | CreateExpenseClaimAction['setIsValidExpenseClaimDate']
        | CreateExpenseClaimAction['setIsExpenseClaimDateFocused']
        | CreateExpenseClaimAction['setIsValidExpenseClaimDescription']
        | CreateExpenseClaimAction['setIsExpenseClaimDescriptionFocused']
        | CreateExpenseClaimAction['setIsValidAdditionalComments']
        | CreateExpenseClaimAction['setIsAdditionalCommentsFocused']
        | CreateExpenseClaimAction['setAcknowledgement']
        | CreateExpenseClaimAction['setTriggerFormSubmit']
        | CreateExpenseClaimAction['setIsError']
        | CreateExpenseClaimAction['setIsSubmitting']
        | CreateExpenseClaimAction['setIsSuccessful']
        | CreateExpenseClaimAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: CreateExpenseClaimAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: CreateExpenseClaimAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    }
  | {
      type: CreateExpenseClaimAction['setExpenseClaimCurrency'];
      payload: Currency;
    };

type CreateExpenseClaimReducer = (
  state: CreateExpenseClaimState,
  action: CreateExpenseClaimDispatch
) => CreateExpenseClaimState;

export type {
  CreateExpenseClaimAction,
  CreateExpenseClaimDispatch,
  ExpenseClaimDocument,
  ExpenseClaimKind,
  CreateExpenseClaimReducer,
  ExpenseClaimSchema,
  CreateExpenseClaimState,
};

/**
 * 
 * type setExpenseClaimKindProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setExpenseClaimKind'];
    payload: ExpenseClaimKind;
  };
};

type setExpenseClaimCurrencyProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setExpenseClaimCurrency'];
    payload: Currency;
  };
};

type setExpenseClaimDateProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setExpenseClaimDate'];
    payload: string;
  };
};

type setIsValidExpenseClaimDateProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setIsValidExpenseClaimDate'];
    payload: boolean;
  };
};

type setIsExpenseClaimDateFocusedProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setIsExpenseClaimDateFocused'];
    payload: boolean;
  };
};

type setExpenseClaimDescriptionProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setExpenseClaimDescription'];
    payload: string;
  };
};

type setIsValidExpenseClaimDescriptionProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setIsValidExpenseClaimDescription'];
    payload: boolean;
  };
};

type setIsExpenseClaimDescriptionFocusedProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setIsExpenseClaimDescriptionFocused'];
    payload: boolean;
  };
};

type setAdditionalCommentsProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setAdditionalComments'];
    payload: string;
  };
};

type setIsValidAdditionalCommentsProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setIsValidAdditionalComments'];
    payload: boolean;
  };
};

type setIsAdditionalCommentsFocusedProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setIsAdditionalCommentsFocused'];
    payload: boolean;
  };
};

type setAcknowledgementProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setAcknowledgement'];
    payload: boolean;
  };
};

type setCurrentStepperPositionProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setCurrentStepperPosition'];
    payload: number;
  };
};

type setStepsInErrorProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setStepsInError'];
    payload: SetStepsInErrorPayload;
  };
};

type setIsErrorProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setIsError'];
    payload: boolean;
  };
};

type setErrorMessageProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setErrorMessage'];
    payload: string;
  };
};

type setIsSubmittingProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setIsSubmitting'];
    payload: boolean;
  };
};

type setSubmitMessageProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setSubmitMessage'];
    payload: string;
  };
};

type setIsSuccessfulProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setIsSuccessful'];
    payload: boolean;
  };
};

type setSuccessMessageProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setSuccessMessage'];
    payload: string;
  };
};

type setIsLoadingProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setIsLoading'];
    payload: boolean;
  };
};

type setLoadingMessageProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setLoadingMessage'];
    payload: string;
  };
};

type setExpenseClaimAmountProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setExpenseClaimAmount'];
    payload: string;
  };
};

type setIsValidExpenseClaimAmountProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setIsValidExpenseClaimAmount'];
    payload: boolean;
  };
};

type setIsExpenseClaimAmountFocusedProps = {
  state: CreateExpenseClaimState;
  action: {
    type: CreateExpenseClaimAction['setIsExpenseClaimAmountFocused'];
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
