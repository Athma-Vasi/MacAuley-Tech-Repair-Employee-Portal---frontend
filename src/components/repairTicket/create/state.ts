import type { CreateRepairTicketState } from "./types";

const initialCreateRepairTicketState: CreateRepairTicketState = {
  clearSearchInputs: false,
  currentSearchObject: {},
  currentSearchResultPage: 1,
  customerId: "",
  customerSearchResults: [],
  deleteSearchObjectField: "",
  searchOperator: "AND",
  selectedCustomer: null,

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

  triggerFormSubmit: false,
  pagesInError: new Set(),
  isSubmitting: false,
  isSuccessful: false,
};

export { initialCreateRepairTicketState };
