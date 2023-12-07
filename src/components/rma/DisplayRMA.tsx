import { Flex } from "@mantine/core";

import { DisplayResource } from "../displayResource";
import DisplayResourceHeader from "../displayResourceHeader/DisplayResourceHeader";
import { RMA_QUERY_DATA, RMA_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayRMA() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress";
  const imageAlt = "Close-up Photography Two Brown Cards";
  const resourceDescription = "Manage Customer RMAs";
  const resourceTitle = "RMA";

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
      componentQueryData={RMA_QUERY_DATA}
      createResourcePath=""
      requestBodyHeading="RMA"
      resourceUrlPaths={RMA_RESOURCE_ROUTE_PATHS}
    />
  );

  const displayRMAComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayRMAComponent;
}

export default DisplayRMA;
