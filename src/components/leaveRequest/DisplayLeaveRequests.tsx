import { DisplayResource } from '../displayResource';
import { LEAVE_REQUESTS_PATHS, LEAVE_REQUESTS_QUERY_DATA } from './constants';
import { LeaveRequestDocument } from './types';

function DisplayLeaveRequests() {
  return (
    <DisplayResource<LeaveRequestDocument>
      componentQueryData={LEAVE_REQUESTS_QUERY_DATA}
      createResourcePath="/home/company/leave-request/create"
      requestBodyHeading="leaveRequest"
      paths={LEAVE_REQUESTS_PATHS}
    />
  );
}

export default DisplayLeaveRequests;
