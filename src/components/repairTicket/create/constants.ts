import { CURRENCY_DATA, URGENCY_DATA } from "../../../constants/data";
import type {
  CheckboxRadioSelectData,
  RoleResourceRoutePaths,
  StepperChild,
  StepperPage,
} from "../../../types";
import type { RepairCategory } from "../../dashboard/types";
import type { PartsNeeded, RepairStatus, RequiredRepairs } from "../types";

const CREATE_REPAIR_NOTE_MAX_STEPPER_POSITION = 4;

const CREATE_REPAIR_NOTE_ROLE_PATHS: RoleResourceRoutePaths = {
  manager: "repair-note",
  admin: "repair-note",
  employee: "repair-note/user",
};

function returnCreateRepairNoteStepperPages() {
  const partNameTextChild: StepperChild = {
    inputType: "text",
    name: "partName",
    validationKey: "textInput",
  };

  const partSerialIdTextChild: StepperChild = {
    inputType: "text",
    name: "partSerialId",
    validationKey: "userDefinedValue",
  };

  const dateReceivedDateChild: StepperChild = {
    inputType: "date",
    name: "dateReceived",
    validationKey: "dateNearPast",
  };

  const descriptionOfIssueTextChild: StepperChild = {
    inputType: "text",
    name: "descriptionOfIssue",
    validationKey: "textAreaInput",
  };

  const initialInspectionNotesTextChild: StepperChild = {
    inputType: "text",
    isRequired: false,
    name: "initialInspectionNotes",
    validationKey: "textAreaInput",
  };

  const repairCategorySelectChild: StepperChild = {
    inputType: "select",
    name: "repairCategory",
    selectInputData: REPAIR_CATEGORIES_DATA,
  };

  const requiredRepairsTextChild: StepperChild = {
    inputType: "checkbox",
    name: "requiredRepairs",
    checkboxInputData: REQUIRED_REPAIRS_DATA,
  };

  const partsNeededTextChild: StepperChild = {
    inputType: "checkbox",
    name: "partsNeeded",
    checkboxInputData: PARTS_NEEDED_DATA,
  };

  const partsNeededModelsTextChild: StepperChild = {
    inputType: "text",
    isRequired: false,
    name: "partsNeededModels",
    validationKey: "userDefinedValue",
  };

  const partUnderWarrantySwitchChild: StepperChild = {
    inputType: "switch",
    name: "partUnderWarranty",
    validationKey: "acknowledgement",
  };

  const estimatedRepairCostTextChild: StepperChild = {
    inputType: "text",
    name: "estimatedRepairCost",
    validationKey: "money",
  };

  const estimatedRepairCostCurrencySelectChild: StepperChild = {
    inputType: "select",
    name: "estimatedRepairCostCurrency",
    selectInputData: CURRENCY_DATA,
  };

  const estimatedCompletionDateDateChild: StepperChild = {
    inputType: "date",
    name: "estimatedCompletionDate",
    validationKey: "dateNearFuture",
  };

  const repairPrioritySelectChild: StepperChild = {
    inputType: "select",
    name: "repairPriority",
    selectInputData: URGENCY_DATA,
  };

  const stepperPages: StepperPage[] = [
    {
      children: [
        partNameTextChild,
        partSerialIdTextChild,
        dateReceivedDateChild,
        descriptionOfIssueTextChild,
        initialInspectionNotesTextChild,
      ],
      description: "Part Information",
    },
    {
      children: [
        repairCategorySelectChild,
        requiredRepairsTextChild,
        partsNeededTextChild,
        partsNeededModelsTextChild,
        partUnderWarrantySwitchChild,
        estimatedRepairCostTextChild,
        estimatedRepairCostCurrencySelectChild,
        estimatedCompletionDateDateChild,
        repairPrioritySelectChild,
      ],
      description: "Repair Information",
    },
    {
      children: [],
      description: "Review and Proceed",
      kind: "review",
    },
  ];

  return stepperPages;
}

const REQUIRED_REPAIRS_DATA: CheckboxRadioSelectData<RequiredRepairs> = [
  {
    label: "Cleaning",
    value: "Cleaning",
  },
  {
    label: "Component replacement",
    value: "Component replacement",
  },
  {
    label: "Soldering",
    value: "Soldering",
  },
  {
    label: "Testing",
    value: "Testing",
  },
  {
    label: "Calibration",
    value: "Calibration",
  },
  {
    label: "Software update",
    value: "Software update",
  },
  {
    label: "Diagnostic evaluation",
    value: "Diagnostic evaluation",
  },
  {
    label: "Internal inspection",
    value: "Internal inspection",
  },
  {
    label: "External housing",
    value: "External housing",
  },
  {
    label: "Data recovery",
    value: "Data recovery",
  },
  {
    label: "Other",
    value: "Other",
  },
];

const PARTS_NEEDED_DATA: CheckboxRadioSelectData<PartsNeeded> = [
  {
    label: "CPU",
    value: "CPU",
  },
  {
    label: "GPU",
    value: "GPU",
  },
  {
    label: "Motherboard",
    value: "Motherboard",
  },
  {
    label: "RAM",
    value: "RAM",
  },
  {
    label: "Storage",
    value: "Storage",
  },
  {
    label: "PSU",
    value: "PSU",
  },
  {
    label: "Cooling",
    value: "Cooling",
  },
  {
    label: "Connectors",
    value: "Connectors",
  },
  {
    label: "Software",
    value: "Software",
  },
  {
    label: "Screen",
    value: "Screen",
  },
  {
    label: "Keyboard",
    value: "Keyboard",
  },
  {
    label: "Mouse",
    value: "Mouse",
  },
  {
    label: "Speaker",
    value: "Speaker",
  },
  {
    label: "Battery",
    value: "Battery",
  },
  {
    label: "Other",
    value: "Other",
  },
];

const REPAIR_STATUS_DATA: CheckboxRadioSelectData<RepairStatus> = [
  {
    label: "In progress",
    value: "In progress",
  },
  {
    label: "Waiting for parts",
    value: "Waiting for parts",
  },
  {
    label: "Awaiting approval",
    value: "Awaiting approval",
  },
  {
    label: "Completed",
    value: "Completed",
  },
  {
    label: "Cancelled",
    value: "Cancelled",
  },
];

const REPAIR_CATEGORIES_DATA: CheckboxRadioSelectData<RepairCategory> = [
  {
    label: "Computer Component",
    value: "Computer Component",
  },
  {
    label: "Peripheral",
    value: "Peripheral",
  },
  {
    label: "Electronic Device",
    value: "Electronic Device",
  },
  {
    label: "Mobile Device",
    value: "Mobile Device",
  },
  {
    label: "Audio/Video",
    value: "Audio/Video",
  },
  {
    label: "Accessory",
    value: "Accessory",
  },
];

export {
  CREATE_REPAIR_NOTE_MAX_STEPPER_POSITION,
  CREATE_REPAIR_NOTE_ROLE_PATHS,
  PARTS_NEEDED_DATA,
  REPAIR_CATEGORIES_DATA,
  REPAIR_STATUS_DATA,
  REQUIRED_REPAIRS_DATA,
  returnCreateRepairNoteStepperPages,
};
