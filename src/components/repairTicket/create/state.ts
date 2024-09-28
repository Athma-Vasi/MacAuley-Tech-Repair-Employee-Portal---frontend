import type { CreateRepairTicketState } from "./types";

const initialCreateRepairTicketState: CreateRepairTicketState = {
  customerSearchField: "username",
  customerSearchKeyword: "",
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

  queryString: "",
  customerSearchResults: [],
  totalDocuments: 0,
  totalPages: 0,
  triggerCustomerSearchSubmit: false,
  triggerRepairFormSubmit: false,
  pagesInError: new Set(),
  isSubmitting: false,
  isSuccessful: false,
  isLoading: true,
};

export { initialCreateRepairTicketState };
