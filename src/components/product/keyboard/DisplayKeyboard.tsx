import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { KEYBOARD_QUERY_DATA, KEYBOARD_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayKeyboard() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/841228/pexels-photo-841228.jpeg?auto=compress";
  const imageAlt = "Black Lighted Gaming Keyboard";
  const resourceDescription = "Manage Your Keyboards";
  const resourceTitle = "Keyboard";

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
      componentQueryData={KEYBOARD_QUERY_DATA}
      createResourcePath="/home/product/keyboard/create"
      requestBodyHeading="Keyboard"
      resourceUrlPaths={KEYBOARD_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayKeyboardComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayKeyboardComponent;
}

export default DisplayKeyboard;
