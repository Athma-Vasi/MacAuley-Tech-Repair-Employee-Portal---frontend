import type { StepperPage } from "../../../types";
import type { CustomerDocument } from "../../customer/types";
import type { CreateRepairTicketAction } from "./actions";
import type { CreateRepairTicketDispatch, CustomerSearchField } from "./types";

type RepairTicketStepCustomerProps = {
    customerSearchField: CustomerSearchField;
    selectedCustomer: CustomerDocument | null;
    selectedFieldData: string[];

    createRepairTicketAction: CreateRepairTicketAction;
    createRepairTicketDispatch: React.Dispatch<CreateRepairTicketDispatch>;
    stepperPages: StepperPage[];
};

function RepairTicketStepCustomer(
    {
        createRepairTicketAction,
        createRepairTicketDispatch,
        customerSearchField,
        selectedCustomer,
        selectedFieldData,
        stepperPages,
    }: RepairTicketStepCustomerProps,
) {
    return null;
}

export { RepairTicketStepCustomer };
