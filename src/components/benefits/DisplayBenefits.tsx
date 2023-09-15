import { Flex } from '@mantine/core';
import { DisplayResource } from '../displayResource';
import { BENEFIT_QUERY_DATA, BENEFIT_RESOURCE_PATHS } from './constants';
import { BenefitsDocument } from './create/types';
import DisplayResourceHeader, {
  DisplayResourceHeaderProps,
} from '../displayResourceHeader/DisplayResourceHeader';

function DisplayBenefits() {
  const benefitsHeaderInput: DisplayResourceHeaderProps = {
    imageSrc:
      'https://images.pexels.com/photos/13019868/pexels-photo-13019868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    imageAlt: 'Benefits Image',
    resourceDescription: 'Modify your company benefits here',
    resourceTitle: 'Benefits',
  };
  const { imageAlt, imageSrc, resourceDescription, resourceTitle } =
    benefitsHeaderInput;

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
