import { QueryResponseData } from '../../types';
import { DisplayResource } from '../displayResource';
import {
  ANONYMOUS_REQUEST_QUERY_DATA,
  ANONYMOUS_REQUEST_ROUTES,
} from './constants';
import { AnonymousRequestDocument } from './create/types';

function DisplayAnonymousRequests() {
  return (
    <DisplayResource<QueryResponseData<AnonymousRequestDocument>[]>
      componentQueryData={ANONYMOUS_REQUEST_QUERY_DATA}
      createResourcePath="/home/general/anonymous-request/create"
      paths={ANONYMOUS_REQUEST_ROUTES}
      requestBodyHeading="anonymousRequest"
    />
  );
}

export default DisplayAnonymousRequests;
