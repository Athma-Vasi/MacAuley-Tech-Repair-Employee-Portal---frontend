import {
  CUSTOMER_QUERY_DATA,
  CUSTOMER_RESOURCE_ROUTE_PATHS,
} from "../../../customer/constants";
import { DisplayResource } from "../../../displayResource";
import { CreateRepairTicketAction, CreateRepairTicketDispatch } from "../types";

type RepairTicketStepCustomerProps = {
  createRepairTicketAction: CreateRepairTicketAction;
  createRepairTicketDispatch: React.Dispatch<CreateRepairTicketDispatch>;
};

function RepairTicketStepCustomer(parentState: RepairTicketStepCustomerProps) {
  const { createRepairTicketAction, createRepairTicketDispatch } = parentState;

  const displayResourceComponent = (
    <DisplayResource
      componentQueryData={CUSTOMER_QUERY_DATA}
      createResourcePath=""
      requestBodyHeading="Customer"
      resourceUrlPaths={CUSTOMER_RESOURCE_ROUTE_PATHS}
    />
  );

  return displayResourceComponent;
}

export { RepairTicketStepCustomer };
