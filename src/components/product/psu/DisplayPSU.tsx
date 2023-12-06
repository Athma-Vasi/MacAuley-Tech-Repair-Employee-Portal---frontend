import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { PSU_QUERY_DATA, PSU_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayPSU() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/11708856/pexels-photo-11708856.jpeg?auto=compress";
  const imageAlt = "Computer Power Supply on Yellow Surface";
  const resourceDescription = "Manage Your PSUs";
  const resourceTitle = "PSU";

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
      componentQueryData={PSU_QUERY_DATA}
      createResourcePath="/home/product/psu/create"
      requestBodyHeading="PSU"
      resourceUrlPaths={PSU_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayPSUComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayPSUComponent;
}

export default DisplayPSU;
