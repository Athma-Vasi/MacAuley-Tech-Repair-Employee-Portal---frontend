import { Action, ActionsGeneral } from '../../../types';

type EmployeeAttributes =
  | 'teamwork and collaboration'
  | 'leadership and mentorship'
  | 'technical expertise'
  | 'adaptibility and flexibility'
  | 'problem solving'
  | 'customer service'
  | 'initiative and proactivity'
  | 'communication'
  | 'reliability and dependability';

type EndorsementSchema = {
  userId: string;
  username: string;
  action: Action;
  category: ActionsGeneral;
  title: string;
  userToBeEndorsed: string;
  summaryOfEndorsement: string;
  attributeEndorsed: EmployeeAttributes;
};

type EndorsementDocument = EndorsementSchema & {
  _id: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
  __v: number;
};

type CreateEndorsementState = {
  title: string;
  isValidTitle: boolean;
  isTitleFocused: boolean;

  userToBeEndorsed: string;
  isValidUserToBeEndorsed: boolean;
  isUserToBeEndorsedFocused: boolean;

  summaryOfEndorsement: string;
  isValidSummaryOfEndorsement: boolean;
  isSummaryOfEndorsementFocused: boolean;

  attributeEndorsed: EmployeeAttributes;

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

type CreateEndorsementAction = {
  setTitle: 'setTitle';
  setIsValidTitle: 'setIsValidTitle';
  setIsTitleFocused: 'setIsTitleFocused';

  setUserToBeEndorsed: 'setUserToBeEndorsed';
  setIsValidUserToBeEndorsed: 'setIsValidUserToBeEndorsed';
  setIsUserToBeEndorsedFocused: 'setIsUserToBeEndorsedFocused';

  setSummaryOfEndorsement: 'setSummaryOfEndorsement';
  setIsValidSummaryOfEndorsement: 'setIsValidSummaryOfEndorsement';
  setIsSummaryOfEndorsementFocused: 'setIsSummaryOfEndorsementFocused';

  setAttributeEndorsed: 'setAttributeEndorsed';

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

type StepsInErrorPayload = {
  kind: 'add' | 'delete';
  step: number;
};

type CreateEndorsementDispatch =
  | {
      type: 'setTitle' | 'setUserToBeEndorsed' | 'setSummaryOfEndorsement';
      payload: string;
    }
  | {
      type: 'setAttributeEndorsed';
      payload: EmployeeAttributes;
    }
  | {
      type:
        | 'setIsValidTitle'
        | 'setIsValidUserToBeEndorsed'
        | 'setIsValidSummaryOfEndorsement';
      payload: boolean;
    }
  | {
      type:
        | 'setIsTitleFocused'
        | 'setIsUserToBeEndorsedFocused'
        | 'setIsSummaryOfEndorsementFocused';
      payload: boolean;
    }
  | {
      type: 'setCurrentStepperPosition';
      payload: number;
    }
  | {
      type: 'setStepsInError';
      payload: StepsInErrorPayload;
    }
  | {
      type:
        | 'setIsError'
        | 'setIsSubmitting'
        | 'setIsSuccessful'
        | 'setIsLoading';
      payload: boolean;
    }
  | {
      type:
        | 'setErrorMessage'
        | 'setSubmitMessage'
        | 'setSuccessMessage'
        | 'setLoadingMessage';
      payload: string;
    };

export type {
  CreateEndorsementAction,
  CreateEndorsementDispatch,
  CreateEndorsementState,
  EmployeeAttributes,
  EndorsementDocument,
  EndorsementSchema,
  StepsInErrorPayload,
};
