import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { ACCESSORY_QUERY_DATA, ACCESSORY_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayAccessory() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/7364948/pexels-photo-7364948.jpeg?auto=compress";
  const imageAlt = "White security camera";
  const resourceDescription = "Manage Your Accessories";
  const resourceTitle = "Accessories";

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
      componentQueryData={ACCESSORY_QUERY_DATA}
      createResourcePath="/home/product/accessory/create"
      requestBodyHeading="accessory"
      resourceUrlPaths={ACCESSORY_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayAccessoryComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayAccessoryComponent;
}

export default DisplayAccessory;
