import { RequestStatus } from '../../types';

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
  requestStatus: RequestStatus;
};

type LeaveRequestDocument = LeaveRequestSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type { LeaveRequestDocument, LeaveRequestSchema, ReasonForLeave };
