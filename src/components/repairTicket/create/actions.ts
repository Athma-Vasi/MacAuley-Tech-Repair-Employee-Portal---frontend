type CreateRepairTicketAction = {
    setCustomerSearchField: "setCustomerSearchField";
    setSelectedCustomer: "setSelectedCustomer";
    setSelectedFieldData: "setSelectedFieldData";

    setPartName: "setPartName";
    setPartSerialId: "setPartSerialId";
    setDateReceived: "setDateReceived";
    setDescriptionOfIssue: "setDescriptionOfIssue";
    setInitialInspectionNotes: "setInitialInspectionNotes";

    setRepairCategory: "setRepairCategory";
    setRequiredRepairs: "setRequiredRepairs";
    setPartsNeeded: "setPartsNeeded";
    setPartsNeededModels: "setPartsNeededModels";
    setPartUnderWarranty: "setPartUnderWarranty";
    setEstimatedRepairCost: "setEstimatedRepairCost";
    setEstimatedRepairCostCurrency: "setEstimatedRepairCostCurrency";
    setEstimatedCompletionDate: "setEstimatedCompletionDate";
    setRepairPriority: "setRepairPriority";

    setTriggerRepairFormSubmit: "setTriggerRepairFormSubmit";
    setPageInError: "setPageInError";
    setIsSubmitting: "setIsSubmitting";
    setIsSuccessful: "setIsSuccessful";
};

const createRepairTicketAction: CreateRepairTicketAction = {
    setCustomerSearchField: "setCustomerSearchField",
    setSelectedCustomer: "setSelectedCustomer",
    setSelectedFieldData: "setSelectedFieldData",

    setPartName: "setPartName",
    setPartSerialId: "setPartSerialId",
    setDateReceived: "setDateReceived",
    setDescriptionOfIssue: "setDescriptionOfIssue",
    setInitialInspectionNotes: "setInitialInspectionNotes",

    setRepairCategory: "setRepairCategory",
    setRequiredRepairs: "setRequiredRepairs",
    setPartsNeeded: "setPartsNeeded",
    setPartsNeededModels: "setPartsNeededModels",
    setPartUnderWarranty: "setPartUnderWarranty",
    setEstimatedRepairCost: "setEstimatedRepairCost",
    setEstimatedRepairCostCurrency: "setEstimatedRepairCostCurrency",
    setEstimatedCompletionDate: "setEstimatedCompletionDate",
    setRepairPriority: "setRepairPriority",

    setTriggerRepairFormSubmit: "setTriggerRepairFormSubmit",
    setPageInError: "setPageInError",
    setIsSubmitting: "setIsSubmitting",
    setIsSuccessful: "setIsSuccessful",
};

export { createRepairTicketAction };
export type { CreateRepairTicketAction };
