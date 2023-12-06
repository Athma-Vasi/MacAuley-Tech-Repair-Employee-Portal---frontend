import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { CASE_QUERY_DATA, CASE_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayCase() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/6913135/pexels-photo-6913135.jpeg?auto=compress";
  const imageAlt = "Desktop System Unit with Lighted Computer Fans";
  const resourceDescription = "Manage Your Computer Cases";
  const resourceTitle = "Computer Case";

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
      componentQueryData={CASE_QUERY_DATA}
      createResourcePath="/home/product/computer-case/create"
      requestBodyHeading="Computer Case"
      resourceUrlPaths={CASE_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayComputerCaseComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayComputerCaseComponent;
}

export default DisplayCase;
