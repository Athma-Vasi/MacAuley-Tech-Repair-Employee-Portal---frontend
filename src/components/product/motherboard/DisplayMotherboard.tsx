import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { MOTHERBOARD_QUERY_DATA, MOTHERBOARD_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayMotherboard() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/2582932/pexels-photo-2582932.jpeg?auto=compress";
  const imageAlt = "Black and Gray Motherboard";
  const resourceDescription = "Manage Your Motherboards";
  const resourceTitle = "Motherboard";

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
      componentQueryData={MOTHERBOARD_QUERY_DATA}
      createResourcePath="/home/product/motherboard/create"
      requestBodyHeading="Motherboard"
      resourceUrlPaths={MOTHERBOARD_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayMotherboardComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayMotherboardComponent;
}

export default DisplayMotherboard;
