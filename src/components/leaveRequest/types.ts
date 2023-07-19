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

type LeaveRequestServerResponse = {
  message: string;
  leaveRequestData: Array<Omit<LeaveRequestDocument, '__v'>>;
};

type QueriedLeaveRequestsServerResponse = {
  message: string;
  pages: number;
  totalDocuments: number;
  leaveRequestsData: Array<Partial<LeaveRequestDocument>>;
};

export type {
  LeaveRequestDocument,
  LeaveRequestSchema,
  LeaveRequestServerResponse,
  QueriedLeaveRequestsServerResponse,
  ReasonForLeave,
};
