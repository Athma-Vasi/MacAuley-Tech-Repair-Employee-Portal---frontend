import { Flex } from "@mantine/core";

import DisplayResourceHeader from "../displayResourceHeader/DisplayResourceHeader";

function DisplayCustomer() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress";
  const imageAlt = "Happy woman shopping online at home";
  const resourceDescription = "Manage Your Customers";
  const resourceTitle = "Customer";

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
  // const displayResource = (
  //   <DisplayResource
  //     componentQueryData={CUSTOMER_QUERY_DATA}
  //     createResourcePath="/home/customer/create"
  //     requestBodyHeading="Customer"
  //     resourceUrlPaths={CUSTOMER_RESOURCE_ROUTE_PATHS}
  //   />
  // );

  const displayCustomerComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {/* {displayResource} */}
    </Flex>
  );

  return displayCustomerComponent;
}

export default DisplayCustomer;
