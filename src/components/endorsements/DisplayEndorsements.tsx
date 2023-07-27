import { DisplayResource } from '../displayResource';
import { ENDORSEMENTS_QUERY_DATA } from './constants';
import { EndorsementDocument } from './createEndorsement/types';

function DisplayEndorsements() {
  return (
    <DisplayResource<EndorsementDocument>
      componentQueryData={ENDORSEMENTS_QUERY_DATA}
      paths={{
        manager: '/api/v1/actions/general/endorsement/',
        admin: '/api/v1/actions/general/endorsement/',
        employee: '/api/v1/actions/general/endorsement/user',
      }}
      requestBodyHeading="endorsement"
    />
  );
}

export { DisplayEndorsements };
