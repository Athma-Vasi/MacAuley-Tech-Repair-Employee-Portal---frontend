import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { GPU_QUERY_DATA, GPU_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayGpu() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/4581613/pexels-photo-4581613.jpeg?auto=compress";
  const imageAlt = "Black and Silver NVIDIA GPU";
  const resourceDescription = "Manage Your GPUs";
  const resourceTitle = "GPU";

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
      componentQueryData={GPU_QUERY_DATA}
      createResourcePath="/home/product/gpu/create"
      requestBodyHeading="GPU"
      resourceUrlPaths={GPU_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayGpuComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayGpuComponent;
}

export default DisplayGpu;
