import { Flex } from '@mantine/core';

import { DisplayResource } from '../displayResource';
import DisplayResourceHeader from '../displayResourceHeader/DisplayResourceHeader';
import { PRODUCTS_QUERY_DATA, PRODUCTS_RESOURCE_PATHS } from './constants';

function DisplayProducts() {
  const imageSrc =
    'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress';
  const imageAlt = 'Black and White Laptop Computer on Brown Wooden Desk';
  const resourceDescription = 'Manage Your Products';
  const resourceTitle = 'Products';

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
      componentQueryData={PRODUCTS_QUERY_DATA}
      createResourcePath="/home/dashboard/product/create"
      isFileUploadsWithResource={true}
      resourceUrlPaths={PRODUCTS_RESOURCE_PATHS}
      requestBodyHeading="product"
      isDisplayProductsDocs={true}
    />
  );

  const displayProductComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayProductComponent;
}

export default DisplayProducts;
