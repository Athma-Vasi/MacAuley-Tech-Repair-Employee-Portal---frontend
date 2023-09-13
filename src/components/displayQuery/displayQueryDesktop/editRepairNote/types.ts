import { Currency } from '../../../../types';
import { RepairStatus } from '../../../repairNote/types';

type EditRepairNoteState = {
  repairNote: string;
  isRepairNoteValid: boolean;
  isRepairNoteFocused: boolean;

  testingResults: string;
  isTestingResultsValid: boolean;
  isTestingResultsFocused: boolean;

  finalRepairCost: string;
  isFinalRepairCostValid: boolean;
  isFinalRepairCostFocused: boolean;

  finalRepairCostCurrency: Currency;
  repairStatus: RepairStatus;

  triggerFormSubmit: boolean;
};

type EditRepairNoteAction = {
  setRepairNote: 'setRepairNote';
  setIsRepairNoteValid: 'setIsRepairNoteValid';
  setIsRepairNoteFocused: 'setIsRepairNoteFocused';

  setTestingResults: 'setTestingResults';
  setIsTestingResultsValid: 'setIsTestingResultsValid';
  setIsTestingResultsFocused: 'setIsTestingResultsFocused';

  setFinalRepairCost: 'setFinalRepairCost';
  setIsFinalRepairCostValid: 'setIsFinalRepairCostValid';
  setIsFinalRepairCostFocused: 'setIsFinalRepairCostFocused';

  setFinalRepairCostCurrency: 'setFinalRepairCostCurrency';
  setRepairStatus: 'setRepairStatus';

  setTriggerFormSubmit: 'setTriggerFormSubmit';
};

type EditRepairNoteDispatch =
  | {
      type:
        | EditRepairNoteAction['setRepairNote']
        | EditRepairNoteAction['setTestingResults']
        | EditRepairNoteAction['setFinalRepairCost'];

      payload: string;
    }
  | {
      type:
        | EditRepairNoteAction['setIsRepairNoteValid']
        | EditRepairNoteAction['setIsTestingResultsValid']
        | EditRepairNoteAction['setIsFinalRepairCostValid']
        | EditRepairNoteAction['setIsRepairNoteFocused']
        | EditRepairNoteAction['setIsTestingResultsFocused']
        | EditRepairNoteAction['setIsFinalRepairCostFocused']
        | EditRepairNoteAction['setTriggerFormSubmit'];

      payload: boolean;
    }
  | {
      type: EditRepairNoteAction['setFinalRepairCostCurrency'];

      payload: Currency;
    }
  | {
      type: EditRepairNoteAction['setRepairStatus'];

      payload: RepairStatus;
    };

export type {
  EditRepairNoteAction,
  EditRepairNoteDispatch,
  EditRepairNoteState,
};
