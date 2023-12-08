import type { CreateRepairTicketAction, CreateRepairTicketDispatch } from "../types";

type RepairTicketStepPartProps = {
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

  createRepairTicketAction: CreateRepairTicketAction;
  createRepairTicketDispatch: React.Dispatch<CreateRepairTicketDispatch>;
};

export type { RepairTicketStepPartProps };
