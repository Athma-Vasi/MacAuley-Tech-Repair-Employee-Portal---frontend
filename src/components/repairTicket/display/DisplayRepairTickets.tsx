import { Flex } from "@mantine/core";

import DisplayResourceHeader from "../../displayResourceHeader/DisplayResourceHeader";

function DisplayRepairTickets() {
  const imageSrc =
    "https://images.pexels.com/photos/7639370/pexels-photo-7639370.jpeg?auto=compress";
  const imageAlt = "A Person Fixing a Laptop";
  const resourceDescription = "Welcome to Repair Tickets Management Portal";
  const resourceTitle = "Repair Tickets";

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  // const displayResource = (
  //   <DisplayResource
  //     componentQueryData={REPAIR_NOTE_QUERY_DATA}
  //     createResourcePath="/home/repair-ticket/create"
  //     resourceUrlPaths={REPAIR_NOTE_ROUTE_PATHS}
  //     requestBodyHeading="repairTicket"
  //   />
  // );

  const displayRepairTicketComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {/* {displayResource} */}
    </Flex>
  );

  return displayRepairTicketComponent;
}

export default DisplayRepairTickets;
