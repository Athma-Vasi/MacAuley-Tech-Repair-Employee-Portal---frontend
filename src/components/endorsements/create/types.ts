import { Action, ActionsGeneral } from '../../../types';

type EmployeeAttributes = (
  | 'teamwork and collaboration'
  | 'leadership and mentorship'
  | 'technical expertise'
  | 'adaptibility and flexibility'
  | 'problem solving'
  | 'customer service'
  | 'initiative and proactivity'
  | 'communication'
  | 'reliability and dependability'
)[];

type EndorsementSchema = {
  userId: string;
  username: string;
  action: Action;
  category: ActionsGeneral;
  title: string;
  employeeToBeEndorsed: string;
  summaryOfEndorsement: string;
  attributeEndorsed: EmployeeAttributes;
};

type EndorsementDocument = EndorsementSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type CreateEndorsementState = {
  title: string;
  isValidTitle: boolean;
  isTitleFocused: boolean;

  employeeToBeEndorsed: string;
  isValidEmployeeToBeEndorsed: boolean;
  isEmployeeToBeEndorsedFocused: boolean;

  summaryOfEndorsement: string;
  isValidSummaryOfEndorsement: boolean;
  isSummaryOfEndorsementFocused: boolean;

  attributeEndorsed: EmployeeAttributes;

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

type CreateEndorsementAction = {
  setTitle: 'setTitle';
  setIsValidTitle: 'setIsValidTitle';
  setIsTitleFocused: 'setIsTitleFocused';

  setEmployeeToBeEndorsed: 'setEmployeeToBeEndorsed';
  setIsValidEmployeeToBeEndorsed: 'setIsValidEmployeeToBeEndorsed';
  setIsEmployeeToBeEndorsedFocused: 'setIsEmployeeToBeEndorsedFocused';

  setSummaryOfEndorsement: 'setSummaryOfEndorsement';
  setIsValidSummaryOfEndorsement: 'setIsValidSummaryOfEndorsement';
  setIsSummaryOfEndorsementFocused: 'setIsSummaryOfEndorsementFocused';

  setAttributeEndorsed: 'setAttributeEndorsed';

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

type StepsInErrorPayload = {
  kind: 'add' | 'delete';
  step: number;
};

type CreateEndorsementDispatch =
  | {
      type:
        | CreateEndorsementAction['setTitle']
        | CreateEndorsementAction['setEmployeeToBeEndorsed']
        | CreateEndorsementAction['setSummaryOfEndorsement']
        | CreateEndorsementAction['setErrorMessage']
        | CreateEndorsementAction['setSubmitMessage']
        | CreateEndorsementAction['setSuccessMessage']
        | CreateEndorsementAction['setLoadingMessage'];
      payload: string;
    }
  | {
      type: CreateEndorsementAction['setAttributeEndorsed'];
      payload: EmployeeAttributes;
    }
  | {
      type:
        | CreateEndorsementAction['setIsValidTitle']
        | CreateEndorsementAction['setIsTitleFocused']
        | CreateEndorsementAction['setIsValidEmployeeToBeEndorsed']
        | CreateEndorsementAction['setIsEmployeeToBeEndorsedFocused']
        | CreateEndorsementAction['setIsValidSummaryOfEndorsement']
        | CreateEndorsementAction['setIsSummaryOfEndorsementFocused']
        | CreateEndorsementAction['setTriggerFormSubmit']
        | CreateEndorsementAction['setIsError']
        | CreateEndorsementAction['setIsSubmitting']
        | CreateEndorsementAction['setIsSuccessful']
        | CreateEndorsementAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: CreateEndorsementAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: CreateEndorsementAction['setStepsInError'];
      payload: StepsInErrorPayload;
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
