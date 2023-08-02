import { DisplayResource } from '../displayResource';
import {
  EVENT_CREATOR_QUERY_DATA,
  EVENT_CREATOR_ROUTE_PATHS,
} from './constants';

function DisplayEvents() {
  return (
    <DisplayResource
      componentQueryData={EVENT_CREATOR_QUERY_DATA}
      paths={EVENT_CREATOR_ROUTE_PATHS}
      requestBodyHeading="event"
    />
  );
}

export { DisplayEvents };
