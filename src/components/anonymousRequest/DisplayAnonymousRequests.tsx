import { Flex } from "@mantine/core";

import { QueryResponseData } from "../../types";
import { DisplayResource } from "../displayResource";
import DisplayResourceHeader from "../displayResourceHeader/DisplayResourceHeader";
import { ANONYMOUS_REQUEST_QUERY_DATA, ANONYMOUS_REQUEST_ROUTES } from "./constants";
import { AnonymousRequestDocument } from "./create/types";

function DisplayAnonymousRequests() {
  const imageSrc =
    "https://images.pexels.com/photos/6457515/pexels-photo-6457515.jpeg?auto=compress";
  const imageAlt =
    "Multiethnic cheerful colleagues talking about job and working with documents";
  const resourceDescription = "We are here to help";
  const resourceTitle = "Anonymous Requests";

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
      componentQueryData={ANONYMOUS_REQUEST_QUERY_DATA}
      createResourcePath="/home/general/anonymous-request/create"
      resourceUrlPaths={ANONYMOUS_REQUEST_ROUTES}
      requestBodyHeading="anonymousRequest"
    />
  );

  const displayAnonymousRequestComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayAnonymousRequestComponent;
}

export default DisplayAnonymousRequests;
