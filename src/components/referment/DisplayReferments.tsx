import { Flex } from '@mantine/core';
import { QueryResponseData } from '../../types';
import { DisplayResource } from '../displayResource';
import DisplayResourceHeader from '../displayResourceHeader/DisplayResourceHeader';
import { REFERMENT_QUERY_DATA, REFERMENT_ROUTE_PATHS } from './constants';
import { RefermentDocument } from './create/types';

function DisplayReferments() {
  const imageSrc =
    'https://images.pexels.com/photos/9489084/pexels-photo-9489084.jpeg?auto=compress';
  const imageAlt = 'Person referring a friend';
  const resourceDescription = 'Let us know who you would like to refer';
  const resourceTitle = 'Referment';

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  const displayResource = (
    <DisplayResource<QueryResponseData<RefermentDocument>[]>
      componentQueryData={REFERMENT_QUERY_DATA}
      createResourcePath="/home/general/referment/create"
      resourceUrlPaths={REFERMENT_ROUTE_PATHS}
      requestBodyHeading="referment"
    />
  );

  const displayRefermentComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayRefermentComponent;
}

export default DisplayReferments;
