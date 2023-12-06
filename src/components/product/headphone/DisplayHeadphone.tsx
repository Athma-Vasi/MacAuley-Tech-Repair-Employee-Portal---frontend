import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { HEADPHONE_QUERY_DATA, HEADPHONE_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayHeadphone() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress";
  const imageAlt = "Top View Photo of Black Wireless Headphones";
  const resourceDescription = "Manage Your Headphones";
  const resourceTitle = "Headphone";

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
      componentQueryData={HEADPHONE_QUERY_DATA}
      createResourcePath="/home/product/headphone/create"
      requestBodyHeading="Headphone"
      resourceUrlPaths={HEADPHONE_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayHeadphoneComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayHeadphoneComponent;
}

export default DisplayHeadphone;
