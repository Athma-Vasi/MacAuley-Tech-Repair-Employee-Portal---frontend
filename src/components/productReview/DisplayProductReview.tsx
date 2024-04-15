import { Flex } from "@mantine/core";

import { DisplayResource } from "../displayResource";
import DisplayResourceHeader from "../displayResourceHeader/DisplayResourceHeader";
import {
  PRODUCT_REVIEW_QUERY_DATA,
  PRODUCT_REVIEW_RESOURCE_ROUTE_PATHS,
} from "./constants";

function DisplayProductReview() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/9821386/pexels-photo-9821386.jpeg?auto=compress";
  const imageAlt = "Five Yellow Stars on Blue and Pink Background";
  const resourceDescription = "Manage Your Product Reviews";
  const resourceTitle = "Product Review";

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
      componentQueryData={PRODUCT_REVIEW_QUERY_DATA}
      createResourcePath=""
      requestBodyHeading="Product Review"
      resourceUrlPaths={PRODUCT_REVIEW_RESOURCE_ROUTE_PATHS}
    />
  );

  const displayProductReviewComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayProductReviewComponent;
}

export default DisplayProductReview;
