import { Flex } from '@mantine/core';
import { DisplayResource } from '../displayResource';
import DisplayResourceHeader from '../displayResourceHeader/DisplayResourceHeader';
import { LEAVE_REQUESTS_PATHS, LEAVE_REQUESTS_QUERY_DATA } from './constants';
import { LeaveRequestDocument } from './types';

function DisplayLeaveRequests() {
  const imageSrc =
    'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress';
  const imageAlt = 'Person on vacation';
  const resourceDescription = 'Manage Your Leave Requests with Ease';
  const resourceTitle = 'Leave Requests';

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  const displayResource = (
    <DisplayResource<LeaveRequestDocument>
      componentQueryData={LEAVE_REQUESTS_QUERY_DATA}
      createResourcePath="/home/company/leave-request/create"
      resourceUrlPaths={LEAVE_REQUESTS_PATHS}
      requestBodyHeading="leaveRequest"
    />
  );

  const displayLeaveRequestComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayLeaveRequestComponent;
}

export default DisplayLeaveRequests;
