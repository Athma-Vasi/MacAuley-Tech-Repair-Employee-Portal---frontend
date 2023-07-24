import { CreateRepairNoteAction, CreateRepairNoteDispatch } from '../types';

type RepairNoteStepPartProps = {
  partName: string;
  isValidPartName: boolean;
  isPartNameFocused: boolean;

  partSerialId: string;
  isValidPartSerialId: boolean;
  isPartSerialIdFocused: boolean;

  dateReceived: string;
  isValidDateReceived: boolean;
  isDateReceivedFocused: boolean;

  descriptionOfIssue: string;
  isValidDescriptionOfIssue: boolean;
  isDescriptionOfIssueFocused: boolean;

  initialInspectionNotes: string;
  isValidInitialInspectionNotes: boolean;
  isInitialInspectionNotesFocused: boolean;

  createRepairNoteAction: CreateRepairNoteAction;
  createRepairNoteDispatch: React.Dispatch<CreateRepairNoteDispatch>;
};

export type { RepairNoteStepPartProps };
