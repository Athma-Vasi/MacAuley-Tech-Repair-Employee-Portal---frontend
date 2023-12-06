import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { RAM_QUERY_DATA, RAM_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayRAM() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/6636474/pexels-photo-6636474.jpeg?auto=compress";
  const imageAlt = "Computer Power Supply on Yellow Surface";
  const resourceDescription = "Manage Your RAMs";
  const resourceTitle = "RAM";

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
      componentQueryData={RAM_QUERY_DATA}
      createResourcePath="/home/product/ram/create"
      requestBodyHeading="RAM"
      resourceUrlPaths={RAM_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayRAMComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayRAMComponent;
}

export default DisplayRAM;
