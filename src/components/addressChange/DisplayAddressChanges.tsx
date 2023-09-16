import { Flex } from '@mantine/core';

import { DisplayResource } from '../displayResource';
import DisplayResourceHeader from '../displayResourceHeader/DisplayResourceHeader';
import { ADDRESS_CHANGE_PATHS, ADDRESS_CHANGE_QUERY_DATA } from './constants';

function DisplayAddressChanges() {
  const imageSrc =
    'https://images.pexels.com/photos/4569323/pexels-photo-4569323.jpeg?auto=compress';
  const imageAlt = 'People moving houses';
  const resourceDescription = 'Get started with hassle-free address updates';
  const resourceTitle = 'Address Changes';

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  const displayResource = (
    <DisplayResource
      componentQueryData={ADDRESS_CHANGE_QUERY_DATA}
      createResourcePath="/home/company/address-change/create"
      paths={ADDRESS_CHANGE_PATHS}
      requestBodyHeading="addressChange"
    />
  );

  const displayAddressChangeComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayAddressChangeComponent;
}

export default DisplayAddressChanges;
