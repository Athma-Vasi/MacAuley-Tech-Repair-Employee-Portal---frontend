import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { SMARTPHONE_QUERY_DATA, SMARTPHONE_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplaySmartphone() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/2643698/pexels-photo-2643698.jpeg?auto=compress";
  const imageAlt = "Close-Up Photo of iPhone";
  const resourceDescription = "Manage Your Smartphones";
  const resourceTitle = "Smartphone";

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
      componentQueryData={SMARTPHONE_QUERY_DATA}
      createResourcePath="/home/product/smartphone/create"
      requestBodyHeading="Smartphone"
      resourceUrlPaths={SMARTPHONE_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displaySmartphoneComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displaySmartphoneComponent;
}

export default DisplaySmartphone;
