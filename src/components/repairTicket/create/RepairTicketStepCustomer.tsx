import { Stack, Text } from "@mantine/core";
import type { StepperPage } from "../../../types";
import type { CustomerDocument } from "../../customer/types";
import type { CreateRepairTicketAction } from "./actions";
import type { CreateRepairTicketDispatch, CustomerSearchField } from "./types";

type RepairTicketStepCustomerProps = {
    createRepairTicketAction: CreateRepairTicketAction;
    createRepairTicketDispatch: React.Dispatch<CreateRepairTicketDispatch>;
    customerSearchField: CustomerSearchField;
    customerSearchKeyword: string;
    isLoading: boolean;
    selectedCustomer: CustomerDocument | null;
    stepperPages: StepperPage[];
};

function RepairTicketStepCustomer(
    {
        createRepairTicketAction,
        createRepairTicketDispatch,
        customerSearchField,
        customerSearchKeyword,
        isLoading,
        selectedCustomer,
        stepperPages,
    }: RepairTicketStepCustomerProps,
) {
    return (
        <Stack>
            <Text>INSERT QUERY HERE</Text>
        </Stack>
    );
}

export { RepairTicketStepCustomer };
