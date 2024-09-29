import type { CreateRepairTicketState } from "./types";

const initialCreateRepairTicketState: CreateRepairTicketState = {
  customerSearchResults: [],
  queryString: "",
  selectedCustomer: null,
  totalDocuments: 0,
  totalPages: 0,
  triggerCustomerSearchSubmit: false,

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
  isLoading: true,
};

export { initialCreateRepairTicketState };
