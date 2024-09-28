import type { Currency, SetPageInErrorPayload, Urgency } from "../../../types";
import type { CustomerDocument } from "../../customer/types";
import type { RepairCategory } from "../../dashboard/types";
import type { PartsNeeded, RequiredRepairs } from "../types";
import type { CreateRepairTicketAction } from "./actions";

type CustomerSearchField =
  | "firstName"
  | "middleName"
  | "lastName"
  | "preferredName"
  | "email"
  | "username"
  | "contactNumber";

type CreateRepairTicketState = {
  // customer information search - page 1
  customerSearchField: CustomerSearchField;
  customerSearchKeyword: string;
  selectedCustomer: CustomerDocument | null;
  selectedFieldData: string[];

  // part information - page 2
  partName: string;
  partSerialId: string;
  dateReceived: string;
  descriptionOfIssue: string;
  initialInspectionNotes: string;

  // repair information - page 3
  repairCategory: RepairCategory;
  requiredRepairs: RequiredRepairs[];
  partsNeeded: PartsNeeded[];
  partsNeededModels: string;
  partUnderWarranty: boolean;
  estimatedRepairCost: string;
  estimatedRepairCostCurrency: Currency;
  estimatedCompletionDate: string;
  repairPriority: Urgency;

  // work order id is generated by the system
  // rest of the information is updated by the repair technician after the initial repair note is created

  queryString: string;
  customerSearchResults: CustomerDocument[];
  totalDocuments: number;
  totalPages: number;
  triggerCustomerSearchSubmit: boolean;
  triggerRepairFormSubmit: boolean;
  pagesInError: Set<number>;
  isSubmitting: boolean;
  isSuccessful: boolean;
  isLoading: boolean;
};

type CreateRepairTicketDispatch =
  | {
    action: CreateRepairTicketAction["setCustomerSearchField"];
    payload: CustomerSearchField;
  }
  | {
    action: CreateRepairTicketAction["setCustomerSearchKeyword"];
    payload: string;
  }
  | {
    action: CreateRepairTicketAction["setSelectedFieldData"];
    payload: string[];
  }
  | {
    action: CreateRepairTicketAction["setSelectedCustomer"];
    payload: CustomerDocument | null;
  }
  | {
    action: CreateRepairTicketAction["setPartName"];
    payload: string;
  }
  | {
    action: CreateRepairTicketAction["setPartSerialId"];
    payload: string;
  }
  | {
    action: CreateRepairTicketAction["setDateReceived"];
    payload: string;
  }
  | {
    action: CreateRepairTicketAction["setDescriptionOfIssue"];
    payload: string;
  }
  | {
    action: CreateRepairTicketAction["setInitialInspectionNotes"];
    payload: string;
  }
  | {
    action: CreateRepairTicketAction["setRepairCategory"];
    payload: RepairCategory;
  }
  | {
    action: CreateRepairTicketAction["setRequiredRepairs"];
    payload: RequiredRepairs[];
  }
  | {
    action: CreateRepairTicketAction["setPartsNeeded"];
    payload: PartsNeeded[];
  }
  | {
    action: CreateRepairTicketAction["setPartsNeededModels"];
    payload: string;
  }
  | {
    action: CreateRepairTicketAction["setPartUnderWarranty"];
    payload: boolean;
  }
  | {
    action: CreateRepairTicketAction["setEstimatedRepairCost"];
    payload: string;
  }
  | {
    action: CreateRepairTicketAction["setEstimatedRepairCostCurrency"];
    payload: Currency;
  }
  | {
    action: CreateRepairTicketAction["setEstimatedCompletionDate"];
    payload: string;
  }
  | {
    action: CreateRepairTicketAction["setRepairPriority"];
    payload: Urgency;
  }
  | {
    action: CreateRepairTicketAction["setQueryString"];
    payload: string;
  }
  | {
    action: CreateRepairTicketAction["setTriggerCustomerSearchSubmit"];
    payload: boolean;
  }
  | {
    action: CreateRepairTicketAction["setCustomerSearchResults"];
    payload: CustomerDocument[];
  }
  | {
    action: CreateRepairTicketAction["setTotalDocuments"];
    payload: number;
  }
  | {
    action: CreateRepairTicketAction["setTotalPages"];
    payload: number;
  }
  | {
    action: CreateRepairTicketAction["setTriggerRepairFormSubmit"];
    payload: boolean;
  }
  | {
    action: CreateRepairTicketAction["setPageInError"];
    payload: SetPageInErrorPayload;
  }
  | {
    action: CreateRepairTicketAction["setIsSubmitting"];
    payload: boolean;
  }
  | {
    action: CreateRepairTicketAction["setIsSuccessful"];
    payload: boolean;
  }
  | {
    action: CreateRepairTicketAction["setIsLoading"];
    payload: boolean;
  };

export type {
  CreateRepairTicketDispatch,
  CreateRepairTicketState,
  CustomerSearchField,
};
