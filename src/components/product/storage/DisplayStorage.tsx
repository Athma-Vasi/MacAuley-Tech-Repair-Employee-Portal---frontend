import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { STORAGE_QUERY_DATA, STORAGE_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayStorage() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/11253062/pexels-photo-11253062.jpeg?auto=compress";
  const imageAlt = "Close-up of Putting NVME SSD on Laptop";
  const resourceDescription = "Manage Your Storages";
  const resourceTitle = "Storage";

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
      componentQueryData={STORAGE_QUERY_DATA}
      createResourcePath="/home/product/storage/create"
      requestBodyHeading="Storage"
      resourceUrlPaths={STORAGE_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayStorageComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayStorageComponent;
}

export default DisplayStorage;
