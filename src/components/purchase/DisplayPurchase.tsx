import { Flex } from "@mantine/core";

import { DisplayResource } from "../displayResource";
import DisplayResourceHeader from "../displayResourceHeader/DisplayResourceHeader";
import { PURCHASE_QUERY_DATA, PURCHASE_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayPurchase() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress";
  const imageAlt =
    "Black and Gray Laptop Computer With Turned-on Screen Beside Person Holding Red Smart Card in Selective-focus Photography";
  const resourceDescription = "Manage Customer Purchases";
  const resourceTitle = "Purchase";

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DISPLAY RESOURCE
  // ╰─────────────────────────────────────────────────────────────────╯
  const displayResource = (
    <DisplayResource
      componentQueryData={PURCHASE_QUERY_DATA}
      createResourcePath=""
      requestBodyHeading="Purchase"
      resourceUrlPaths={PURCHASE_RESOURCE_ROUTE_PATHS}
    />
  );

  const displayPurchaseComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayPurchaseComponent;
}

export default DisplayPurchase;
