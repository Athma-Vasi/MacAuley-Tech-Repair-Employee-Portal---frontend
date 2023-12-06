import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { SPEAKER_QUERY_DATA, SPEAKER_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplaySpeaker() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg?auto=compress";
  const imageAlt = "Black Speaker Close-up Photography";
  const resourceDescription = "Manage Your Speakers";
  const resourceTitle = "Speaker";

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
      componentQueryData={SPEAKER_QUERY_DATA}
      createResourcePath="/home/product/speaker/create"
      requestBodyHeading="Speaker"
      resourceUrlPaths={SPEAKER_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displaySpeakerComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displaySpeakerComponent;
}

export default DisplaySpeaker;
