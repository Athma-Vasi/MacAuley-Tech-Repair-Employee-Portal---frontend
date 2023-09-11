import { SetStepsInErrorPayload } from '../../../types';
import { ReasonForLeave } from '../types';

type CreateLeaveRequestState = {
  startDate: string;
  isValidStartDate: boolean;
  isStartDateFocused: boolean;

  endDate: string;
  isValidEndDate: boolean;
  isEndDateFocused: boolean;

  areValidLeaveDates: boolean;
  reasonForLeave: ReasonForLeave;

  delegatedToEmployee: string;
  isValidDelegatedToEmployee: boolean;
  isDelegatedToEmployeeFocused: boolean;

  delegatedResponsibilities: string;
  isValidDelegatedResponsibilities: boolean;
  isDelegatedResponsibilitiesFocused: boolean;

  additionalComments: string;
  isValidAdditionalComments: boolean;
  isAdditionalCommentsFocused: boolean;

  isAcknowledged: boolean;
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

type CreateLeaveRequestAction = {
  setStartDate: 'setStartDate';
  setIsValidStartDate: 'setIsValidStartDate';
  setIsStartDateFocused: 'setIsStartDateFocused';

  setEndDate: 'setEndDate';
  setIsValidEndDate: 'setIsValidEndDate';
  setIsEndDateFocused: 'setIsEndDateFocused';

  setAreValidLeaveDates: 'setAreValidLeaveDates';
  setReasonForLeave: 'setReasonForLeave';

  setDelegatedToEmployee: 'setDelegatedToEmployee';
  setIsValidDelegatedToEmployee: 'setIsValidDelegatedToEmployee';
  setIsDelegatedToEmployeeFocused: 'setIsDelegatedToEmployeeFocused';

  setDelegatedResponsibilities: 'setDelegatedResponsibilities';
  setIsValidDelegatedResponsibilities: 'setIsValidDelegatedResponsibilities';
  setIsDelegatedResponsibilitiesFocused: 'setIsDelegatedResponsibilitiesFocused';

  setAdditionalComments: 'setAdditionalComments';
  setIsValidAdditionalComments: 'setIsValidAdditionalComments';
  setIsAdditionalCommentsFocused: 'setIsAdditionalCommentsFocused';

  setIsAcknowledged: 'setIsAcknowledged';
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

type CreateLeaveRequestDispatch =
  | {
      type:
        | CreateLeaveRequestAction['setStartDate']
        | CreateLeaveRequestAction['setEndDate']
        | CreateLeaveRequestAction['setDelegatedToEmployee']
        | CreateLeaveRequestAction['setDelegatedResponsibilities']
        | CreateLeaveRequestAction['setAdditionalComments']
        | CreateLeaveRequestAction['setErrorMessage']
        | CreateLeaveRequestAction['setSubmitMessage']
        | CreateLeaveRequestAction['setSuccessMessage']
        | CreateLeaveRequestAction['setLoadingMessage'];
      payload: string;
    }
  | {
      type:
        | CreateLeaveRequestAction['setIsStartDateFocused']
        | CreateLeaveRequestAction['setIsValidStartDate']
        | CreateLeaveRequestAction['setIsValidEndDate']
        | CreateLeaveRequestAction['setIsEndDateFocused']
        | CreateLeaveRequestAction['setAreValidLeaveDates']
        | CreateLeaveRequestAction['setIsValidDelegatedToEmployee']
        | CreateLeaveRequestAction['setIsDelegatedToEmployeeFocused']
        | CreateLeaveRequestAction['setIsValidDelegatedResponsibilities']
        | CreateLeaveRequestAction['setIsDelegatedResponsibilitiesFocused']
        | CreateLeaveRequestAction['setIsValidAdditionalComments']
        | CreateLeaveRequestAction['setIsAdditionalCommentsFocused']
        | CreateLeaveRequestAction['setIsAcknowledged']
        | CreateLeaveRequestAction['setTriggerFormSubmit']
        | CreateLeaveRequestAction['setIsError']
        | CreateLeaveRequestAction['setIsSubmitting']
        | CreateLeaveRequestAction['setIsSuccessful']
        | CreateLeaveRequestAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: CreateLeaveRequestAction['setReasonForLeave'];
      payload: ReasonForLeave;
    }
  | {
      type: CreateLeaveRequestAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: CreateLeaveRequestAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    };

type CreateLeaveRequestReducer = (
  state: CreateLeaveRequestState,
  action: CreateLeaveRequestDispatch
) => CreateLeaveRequestState;

export type {
  CreateLeaveRequestAction,
  CreateLeaveRequestDispatch,
  CreateLeaveRequestState,
  CreateLeaveRequestReducer,
};
