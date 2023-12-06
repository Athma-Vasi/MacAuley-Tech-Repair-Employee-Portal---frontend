import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { MICROPHONE_QUERY_DATA, MICROPHONE_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayMicrophone() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress";
  const imageAlt = "Macbook Pro Near Iphone and Apple Fruit";
  const resourceDescription = "Manage Your Microphones";
  const resourceTitle = "Microphone";

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
      componentQueryData={MICROPHONE_QUERY_DATA}
      createResourcePath="/home/product/microphone/create"
      requestBodyHeading="Microphone"
      resourceUrlPaths={MICROPHONE_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayMicrophoneComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayMicrophoneComponent;
}

export default DisplayMicrophone;
