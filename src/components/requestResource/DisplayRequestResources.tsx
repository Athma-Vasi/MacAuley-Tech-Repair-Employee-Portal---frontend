import { Flex } from "@mantine/core";

import { QueryResponseData } from "../../types";
import { DisplayResource } from "../displayResource";
import DisplayResourceHeader from "../displayResourceHeader/DisplayResourceHeader";
import { REQUEST_RESOURCE_PATHS, REQUEST_RESOURCE_QUERY_DATA } from "./constants";
import { RequestResourceDocument } from "./create/types";

function DisplayRequestResources() {
  const imageSrc =
    "https://images.pexels.com/photos/4063729/pexels-photo-4063729.jpeg?auto=compress";
  const imageAlt = "Person requesting resource";
  const resourceDescription = "We're Here to Assist with Resource Requests";
  const resourceTitle = "Request Resource";

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  const displayResource = (
    <DisplayResource
      componentQueryData={REQUEST_RESOURCE_QUERY_DATA}
      createResourcePath="/home/company/request-resource/create"
      resourceUrlPaths={REQUEST_RESOURCE_PATHS}
      requestBodyHeading="requestResource"
    />
  );

  const displayRequestResourceComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayRequestResourceComponent;
}

export default DisplayRequestResources;
