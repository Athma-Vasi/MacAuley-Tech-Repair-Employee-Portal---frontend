import { Flex } from '@mantine/core';
import { DisplayResource } from '../displayResource';
import DisplayResourceHeader from '../displayResourceHeader/DisplayResourceHeader';
import { ENDORSEMENTS_PATHS, ENDORSEMENTS_QUERY_DATA } from './constants';
import { EndorsementDocument } from './create/types';

function DisplayEndorsements() {
  const imageSrc =
    'https://images.pexels.com/photos/6140715/pexels-photo-6140715.jpeg?auto=compress';
  const imageAlt = 'Positive young multiracial guys demonstrating thumbs up';
  const resourceDescription = "Let's Simplify Your Endorsement Process";
  const resourceTitle = 'Endorsements';

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  const displayResource = (
    <DisplayResource<EndorsementDocument>
      componentQueryData={ENDORSEMENTS_QUERY_DATA}
      createResourcePath="/home/general/endorsement/create"
      resourceUrlPaths={ENDORSEMENTS_PATHS}
      requestBodyHeading="endorsement"
    />
  );

  const displayEndorsementComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayEndorsementComponent;
}

export default DisplayEndorsements;
