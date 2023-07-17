import { SetStepsInErrorPayload } from '../../types';

type ReasonForLeave =
  | 'Vacation'
  | 'Medical'
  | 'Parental'
  | 'Bereavement'
  | 'Jury Duty'
  | 'Military'
  | 'Education'
  | 'Religious'
  | 'Other';

type LeaveRequestSchema = {
  userId: string;
  username: string;
  startDate: string;
  endDate: string;
  reasonForLeave: ReasonForLeave;
  delegatedToEmployee: string;
  delegatedResponsibilities: string;
  additionalComments: string;
  acknowledgement: boolean;
};

type LeaveRequestDocument = LeaveRequestSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type LeaveRequestState = {
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

type LeaveRequestAction = {
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

type LeaveRequestDispatch =
  | {
      type:
        | LeaveRequestAction['setStartDate']
        | LeaveRequestAction['setEndDate']
        | LeaveRequestAction['setDelegatedToEmployee']
        | LeaveRequestAction['setDelegatedResponsibilities']
        | LeaveRequestAction['setAdditionalComments']
        | LeaveRequestAction['setErrorMessage']
        | LeaveRequestAction['setSubmitMessage']
        | LeaveRequestAction['setSuccessMessage']
        | LeaveRequestAction['setLoadingMessage'];
      payload: string;
    }
  | {
      type:
        | LeaveRequestAction['setIsStartDateFocused']
        | LeaveRequestAction['setIsValidStartDate']
        | LeaveRequestAction['setIsValidEndDate']
        | LeaveRequestAction['setIsEndDateFocused']
        | LeaveRequestAction['setAreValidLeaveDates']
        | LeaveRequestAction['setIsValidDelegatedToEmployee']
        | LeaveRequestAction['setIsDelegatedToEmployeeFocused']
        | LeaveRequestAction['setIsValidDelegatedResponsibilities']
        | LeaveRequestAction['setIsDelegatedResponsibilitiesFocused']
        | LeaveRequestAction['setIsValidAdditionalComments']
        | LeaveRequestAction['setIsAdditionalCommentsFocused']
        | LeaveRequestAction['setIsAcknowledged']
        | LeaveRequestAction['setTriggerFormSubmit']
        | LeaveRequestAction['setIsError']
        | LeaveRequestAction['setIsSubmitting']
        | LeaveRequestAction['setIsSuccessful']
        | LeaveRequestAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: LeaveRequestAction['setReasonForLeave'];
      payload: ReasonForLeave;
    }
  | {
      type: LeaveRequestAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: LeaveRequestAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    };

type LeaveRequestReducer = (
  state: LeaveRequestState,
  action: LeaveRequestDispatch
) => LeaveRequestState;

export type {
  LeaveRequestAction,
  LeaveRequestDispatch,
  LeaveRequestDocument,
  LeaveRequestReducer,
  LeaveRequestSchema,
  LeaveRequestState,
  ReasonForLeave,
};
