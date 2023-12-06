import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { WEBCAM_QUERY_DATA, WEBCAM_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayWebcam() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/414781/pexels-photo-414781.jpeg?auto=compress";
  const imageAlt = "Close-up Photo of Camera Shutter";
  const resourceDescription = "Manage Your Webcams";
  const resourceTitle = "Webcam";

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
      componentQueryData={WEBCAM_QUERY_DATA}
      createResourcePath="/home/product/webcam/create"
      requestBodyHeading="Webcam"
      resourceUrlPaths={WEBCAM_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayWebcamComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayWebcamComponent;
}

export default DisplayWebcam;
