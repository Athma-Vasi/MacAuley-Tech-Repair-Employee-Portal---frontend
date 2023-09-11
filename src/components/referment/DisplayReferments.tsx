import { QueryResponseData } from '../../types';
import { DisplayResource } from '../displayResource';
import { REFERMENT_QUERY_DATA, REFERMENT_ROUTE_PATHS } from './constants';
import { RefermentDocument } from './create/types';

function DisplayReferments() {
  return (
    <DisplayResource<QueryResponseData<RefermentDocument>[]>
      componentQueryData={REFERMENT_QUERY_DATA}
      paths={REFERMENT_ROUTE_PATHS}
      requestBodyHeading="referment"
    />
  );
}

export default DisplayReferments;
