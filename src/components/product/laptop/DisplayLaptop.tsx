import { Flex } from "@mantine/core";

import { DisplayResource } from "../../displayResource";
import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";
import { LAPTOP_QUERY_DATA, LAPTOP_RESOURCE_ROUTE_PATHS } from "./constants";

function DisplayLaptop() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress";
  const imageAlt = "Macbook Pro Near Iphone and Apple Fruit";
  const resourceDescription = "Manage Your Laptops";
  const resourceTitle = "Laptop";

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
      componentQueryData={LAPTOP_QUERY_DATA}
      createResourcePath="/home/product/laptop/create"
      requestBodyHeading="Laptop"
      resourceUrlPaths={LAPTOP_RESOURCE_ROUTE_PATHS}
      fileUploadFieldName="fileUploads"
      isFileUploadsWithResource={true}
    />
  );

  const displayLaptopComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {displayResource}
    </Flex>
  );

  return displayLaptopComponent;
}

export default DisplayLaptop;
