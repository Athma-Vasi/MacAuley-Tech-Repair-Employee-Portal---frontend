import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { CPU_QUERY_DATA, CPU_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayCpu() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/40879/cpu-processor-macro-pen-40879.jpeg?auto=compress";
  const imageAlt = "Brown and Green Computer Processor";
  const resourceDescription = "Manage Your CPUs";
  const resourceTitle = "CPU";

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
      componentQueryData={CPU_QUERY_DATA}
      createResourcePath="/home/product/cpu/create"
      requestBodyHeading="CPU"
      resourceUrlPaths={CPU_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayCpuComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayCpuComponent;
}

export default DisplayCpu;
