import { Flex } from "@mantine/core";

import { DisplayResource } from "../displayResource";
import DisplayResourceHeader from "../displayResourceHeader/DisplayResourceHeader";
import { COMMENT_QUERY_DATA, COMMENT_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayComment() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress";
  const imageAlt = "Photography of Woman Using Laptop";
  const resourceDescription = "Manage Your Comments";
  const resourceTitle = "Comment";

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
      componentQueryData={COMMENT_QUERY_DATA}
      createResourcePath="/home/comment/create"
      requestBodyHeading="Comment"
      resourceUrlPaths={COMMENT_RESOURCE_ROUTE_PATHS}
    />
  );

  const displayCommentComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayCommentComponent;
}

export default DisplayComment;
