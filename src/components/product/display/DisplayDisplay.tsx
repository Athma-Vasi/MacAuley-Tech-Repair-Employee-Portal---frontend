import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { DISPLAY_QUERY_DATA, DISPLAY_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayDisplay() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/400678/pexels-photo-400678.jpeg?auto=compress";
  const imageAlt = "Dell Monitor Turned-on";
  const resourceDescription = "Manage Your Displays";
  const resourceTitle = "Display";

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
      componentQueryData={DISPLAY_QUERY_DATA}
      createResourcePath="/home/product/display/create"
      requestBodyHeading="Display"
      resourceUrlPaths={DISPLAY_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayDisplayComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayDisplayComponent;
}

export default DisplayDisplay;
