import type { CreateRepairTicketState } from "./types";

const initialCreateRepairTicketState: CreateRepairTicketState = {
  customerSearchField: "firstName",
  selectedCustomer: null,
  selectedFieldData: [],

  partName: "",
  partSerialId: "",
  dateReceived: "",
  descriptionOfIssue: "",
  initialInspectionNotes: "",

  repairCategory: "Accessory",
  requiredRepairs: [],
  partsNeeded: [],
  partsNeededModels: "",
  partUnderWarranty: false,
  estimatedRepairCost: "",
  estimatedRepairCostCurrency: "CAD",
  estimatedCompletionDate: "",
  repairPriority: "low",

  triggerRepairFormSubmit: false,
  pagesInError: new Set(),
  isSubmitting: false,
  isSuccessful: false,
};

export { initialCreateRepairTicketState };
