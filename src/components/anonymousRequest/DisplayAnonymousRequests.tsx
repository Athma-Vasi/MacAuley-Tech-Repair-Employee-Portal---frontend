import { QueryResponseData } from '../../types';
import { DisplayResource } from '../displayResource';
import {
  ANONYMOUS_REQUEST_QUERY_DATA,
  ANONYMOUS_REQUEST_ROUTES,
} from './constants';
import { AnonymousRequestDocument } from './createAnonymousRequest/types';

function DisplayAnonymousRequests() {
  return (
    <DisplayResource<QueryResponseData<AnonymousRequestDocument>[]>
      componentQueryData={ANONYMOUS_REQUEST_QUERY_DATA}
      paths={ANONYMOUS_REQUEST_ROUTES}
      requestBodyHeading="anonymousRequest"
    />
  );
}

export { DisplayAnonymousRequests };
