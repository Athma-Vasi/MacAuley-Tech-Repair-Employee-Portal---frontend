import { DisplayResource } from '../displayResource';
import { ENDORSEMENTS_PATHS, ENDORSEMENTS_QUERY_DATA } from './constants';
import { EndorsementDocument } from './create/types';

function DisplayEndorsements() {
  return (
    <DisplayResource<EndorsementDocument>
      componentQueryData={ENDORSEMENTS_QUERY_DATA}
      paths={ENDORSEMENTS_PATHS}
      requestBodyHeading="endorsement"
    />
  );
}

export default DisplayEndorsements;
