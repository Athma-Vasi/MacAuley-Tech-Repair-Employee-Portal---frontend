import { Flex } from '@mantine/core';
import { DisplayResource } from '../displayResource';
import DisplayResourceHeader from '../displayResourceHeader/DisplayResourceHeader';
import {
  EVENT_CREATOR_QUERY_DATA,
  EVENT_CREATOR_ROUTE_PATHS,
} from './constants';

function DisplayEvents() {
  const imageSrc =
    'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress';
  const imageAlt = 'Group of People Standing Inside Room';
  const resourceDescription = 'Create and Manage Your Events';
  const resourceTitle = 'Events';

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  const displayResource = (
    <DisplayResource
      componentQueryData={EVENT_CREATOR_QUERY_DATA}
      createResourcePath="/home/outreach/event/create"
      resourceUrlPaths={EVENT_CREATOR_ROUTE_PATHS}
      requestBodyHeading="event"
    />
  );

  const displayEventComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayEventComponent;
}

export default DisplayEvents;
