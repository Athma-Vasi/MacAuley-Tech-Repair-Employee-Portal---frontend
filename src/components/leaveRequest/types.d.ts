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
  userId: Types.ObjectId;
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
  _id: Types.ObjectId;
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

  reasonForLeave: ReasonForLeave;
  isValidReasonForLeave: boolean;
  isReasonForLeaveFocused: boolean;

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
};

type LeaveRequestAction = {
  setStartDate: 'setStartDate';
  setIsValidStartDate: 'setIsValidStartDate';
  setIsStartDateFocused: 'setIsStartDateFocused';

  setEndDate: 'setEndDate';
  setIsValidEndDate: 'setIsValidEndDate';
  setIsEndDateFocused: 'setIsEndDateFocused';

  setReasonForLeave: 'setReasonForLeave';
  setIsValidReasonForLeave: 'setIsValidReasonForLeave';
  setIsReasonForLeaveFocused: 'setIsReasonForLeaveFocused';

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
};

type LeaveRequestPayload = string | boolean | ReasonForLeave;

type LeaveRequestDispatch = {
  type: LeaveRequestAction[keyof LeaveRequestAction];
  payload: LeaveRequestPayload;
};

type LeaveRequestReducer = (
  state: LeaveRequestState,
  action: LeaveRequestDispatch
) => LeaveRequestState;

export type {
  LeaveRequestAction,
  LeaveRequestDispatch,
  LeaveRequestDocument,
  LeaveRequestPayload,
  LeaveRequestReducer,
  LeaveRequestSchema,
  LeaveRequestState,
  ReasonForLeave,
};
