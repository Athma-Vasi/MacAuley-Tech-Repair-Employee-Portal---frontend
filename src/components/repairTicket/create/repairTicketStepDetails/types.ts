import type { Currency, Urgency } from "../../../../types";
import type { PartsNeeded, RequiredRepairs } from "../../types";
import type { CreateRepairTicketAction } from "../actions";
import type { CreateRepairTicketDispatch } from "../types";

type RepairTicketStepDetailsProps = {
  requiredRepairs: RequiredRepairs[];
  partsNeeded: PartsNeeded[];
  partsNeededModels: string;
  partUnderWarranty: boolean;
  estimatedRepairCost: string;
  estimatedRepairCostCurrency: Currency;
  estimatedCompletionDate: string;
  repairPriority: Urgency;

  createRepairTicketAction: CreateRepairTicketAction;
  createRepairTicketDispatch: React.Dispatch<CreateRepairTicketDispatch>;
};

export type { RepairTicketStepDetailsProps };
