import { Flex } from "@mantine/core";

import { DisplayResource } from "../displayResource";
import DisplayResourceHeader from "../displayResourceHeader/DisplayResourceHeader";
import { FILE_UPLOADS_QUERY_DATA, FILE_UPLOADS_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayFileUploads() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/1370294/pexels-photo-1370294.jpeg?auto=compress";
  const imageAlt = "Gray Steel File Cabinet";
  const resourceDescription = "Manage Your Files";
  const resourceTitle = "File Uploads";

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
      componentQueryData={FILE_UPLOADS_QUERY_DATA}
      createResourcePath="/home/file-upload"
      requestBodyHeading="File Upload"
      resourceUrlPaths={FILE_UPLOADS_RESOURCE_ROUTE_PATHS}
    />
  );

  const displayFileUploadsComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayFileUploadsComponent;
}

export default DisplayFileUploads;
