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

  uploadedFilesIds: string[];
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

  imgFormDataArray: FormData[];
  areImagesValid: boolean;

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

  setImgFormDataArray: 'setImgFormDataArray';
  setAreImagesValid: 'setAreImagesValid';

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
        | CreateExpenseClaimAction['setAreImagesValid']
        | CreateExpenseClaimAction['setTriggerFormSubmit']
        | CreateExpenseClaimAction['setIsError']
        | CreateExpenseClaimAction['setIsSubmitting']
        | CreateExpenseClaimAction['setIsSuccessful']
        | CreateExpenseClaimAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: CreateExpenseClaimAction['setImgFormDataArray'];
      payload: FormData[];
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
  CreateExpenseClaimReducer,
  CreateExpenseClaimState,
  ExpenseClaimDocument,
  ExpenseClaimKind,
  ExpenseClaimSchema,
};
