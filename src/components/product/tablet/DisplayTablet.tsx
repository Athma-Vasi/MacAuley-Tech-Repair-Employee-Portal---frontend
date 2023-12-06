import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { TABLET_QUERY_DATA, TABLET_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayTablet() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/430546/pexels-photo-430546.jpeg?auto=compress";
  const imageAlt = "White Ipad on Table";
  const resourceDescription = "Manage Your Tablets";
  const resourceTitle = "Tablet";

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
      componentQueryData={TABLET_QUERY_DATA}
      createResourcePath="/home/product/tablet/create"
      requestBodyHeading="Tablet"
      resourceUrlPaths={TABLET_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayTabletComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayTabletComponent;
}

export default DisplayTablet;
