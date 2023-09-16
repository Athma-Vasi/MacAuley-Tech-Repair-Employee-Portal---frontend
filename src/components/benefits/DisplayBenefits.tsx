import { Flex } from '@mantine/core';

import { DisplayResource } from '../displayResource';
import DisplayResourceHeader from '../displayResourceHeader/DisplayResourceHeader';
import { BENEFIT_QUERY_DATA, BENEFIT_RESOURCE_PATHS } from './constants';
import { BenefitsDocument } from './create/types';

function DisplayBenefits() {
  const imageSrc =
    'https://images.pexels.com/photos/3856033/pexels-photo-3856033.jpeg?auto=compress';
  const imageAlt = 'Benefits Image';
  const resourceDescription = 'Explore and Customize Your Benefits';
  const resourceTitle = 'Benefits';

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  const displayResource = (
    <DisplayResource<BenefitsDocument>
      componentQueryData={BENEFIT_QUERY_DATA}
      createResourcePath="/home/company/benefit/create"
      paths={BENEFIT_RESOURCE_PATHS}
      requestBodyHeading="benefit"
    />
  );

  const displayBenefitComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayBenefitComponent;
}

export default DisplayBenefits;
