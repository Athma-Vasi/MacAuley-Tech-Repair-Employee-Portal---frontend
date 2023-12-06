import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { MOUSE_QUERY_DATA, MOUSE_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayMouse() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/6932748/pexels-photo-6932748.jpeg?auto=compress";
  const imageAlt = "Close-up of Modern Black Gaming Mouse";
  const resourceDescription = "Manage Your Mice";
  const resourceTitle = "Mouse";

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
      componentQueryData={MOUSE_QUERY_DATA}
      createResourcePath="/home/product/mouse/create"
      requestBodyHeading="Mouse"
      resourceUrlPaths={MOUSE_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayMouseComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayMouseComponent;
}

export default DisplayMouse;
