import type { Currency, Urgency } from "../../../../types";
import type { PartsNeeded, RequiredRepairs } from "../../types";
import type { CreateRepairTicketAction, CreateRepairTicketDispatch } from "../types";

type RepairTicketStepDetailsProps = {
  requiredRepairs: RequiredRepairs[];
  partsNeeded: PartsNeeded[];
  partsNeededModels: string;
  isValidPartsNeededModels: boolean;
  isPartsNeededModelsFocused: boolean;

  partUnderWarranty: boolean;
  estimatedRepairCost: string;
  isValidEstimatedRepairCost: boolean;
  isEstimatedRepairCostFocused: boolean;

  estimatedRepairCostCurrency: Currency;
  estimatedCompletionDate: string;
  isValidEstimatedCompletionDate: boolean;
  isEstimatedCompletionDateFocused: boolean;

  repairPriority: Urgency;

  createRepairTicketAction: CreateRepairTicketAction;
  createRepairTicketDispatch: React.Dispatch<CreateRepairTicketDispatch>;
};

export type { RepairTicketStepDetailsProps };
