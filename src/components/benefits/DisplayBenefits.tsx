import { DisplayResource } from '../displayResource';
import { BENEFIT_QUERY_DATA, BENEFIT_RESOURCE_PATHS } from './constants';
import { BenefitsDocument } from './create/types';

function DisplayBenefits() {
  return (
    <DisplayResource<BenefitsDocument>
      componentQueryData={BENEFIT_QUERY_DATA}
      paths={BENEFIT_RESOURCE_PATHS}
      requestBodyHeading="benefit"
    />
  );
}

export default DisplayBenefits;
