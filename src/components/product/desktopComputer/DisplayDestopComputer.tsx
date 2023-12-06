import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import {
  DESKTOP_COMPUTER_QUERY_DATA,
  DESKTOP_COMPUTER_RESOURCE_ROUTE_PATHS,
} from "./constants";

function DisplayDesktopComputer() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/2330137/pexels-photo-2330137.jpeg?auto=compress";
  const imageAlt = "Man in Raglan Sleeve Shirt Using Computer";
  const resourceDescription = "Manage Your Desktop Computers";
  const resourceTitle = "Desktop Computer";

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
      componentQueryData={DESKTOP_COMPUTER_QUERY_DATA}
      createResourcePath="/home/product/desktop-computer/create"
      requestBodyHeading="Desktop Computer"
      resourceUrlPaths={DESKTOP_COMPUTER_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayDesktopComputerComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayDesktopComputerComponent;
}

export default DisplayDesktopComputer;
