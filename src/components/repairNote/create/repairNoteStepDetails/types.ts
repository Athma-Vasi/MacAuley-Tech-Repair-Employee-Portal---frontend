import type { Currency, Urgency } from '../../../../types';
import type { PartsNeeded, RequiredRepairs } from '../../types';
import type {
  CreateRepairNoteAction,
  CreateRepairNoteDispatch,
} from '../types';

type RepairNoteStepDetailsProps = {
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

  createRepairNoteAction: CreateRepairNoteAction;
  createRepairNoteDispatch: React.Dispatch<CreateRepairNoteDispatch>;
};

export type { RepairNoteStepDetailsProps };
