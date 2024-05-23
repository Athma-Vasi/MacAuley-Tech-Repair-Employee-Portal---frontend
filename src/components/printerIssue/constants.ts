import { REQUEST_STATUS, URGENCY_DATA } from "../../constants/data";
import {
  DATE_FULL_RANGE_REGEX,
  DATE_NEAR_PAST_REGEX,
  EMAIL_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  PHONE_NUMBER_REGEX,
  PRINTER_MAKE_MODEL_REGEX,
  PRINTER_SERIAL_NUMBER_REGEX,
  TIME_RAILWAY_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import {
  DATE_NEAR_PAST_VALIDATIONS,
  EMAIL_VALIDATIONS,
  PHONE_NUMBER_VALIDATIONS,
  TEXT_AREA_INPUT_VALIDATIONS,
  TEXT_INPUT_VALIDATIONS,
} from "../../constants/validations";
import {
  ResourceRoutePaths,
  RoleResourceRoutePaths,
  StepperChild,
  StepperPage,
} from "../../types";
import {
  returnDateFullRangeValidationText,
  returnDateNearPastValidationText,
  returnEmailValidationText,
  returnGrammarValidationText,
  returnPhoneNumberValidationText,
  returnPrinterMakeModelValidationText,
  returnPrinterSerialNumberValidationText,
  returnTimeRailwayValidationText,
  returnUsernameRegexValidationText,
} from "../../utils";
import { ComponentQueryData } from "../queryBuilder";
import { DescriptionObjectsArray } from "../wrappers";
import { PrinterMake } from "./create/types";
import {
  PRINTER_MAKE_MODEL_VALIDATIONS,
  PRINTER_SERIAL_NUMBER_VALIDATIONS,
  TIME_RAILWAY_VALIDATIONS,
} from "./create/validations";

const PRINTER_ISSUE_ROLE_PATHS: RoleResourceRoutePaths = {
  manager: "actions/general/printer-issue",
  admin: "actions/general/printer-issue",
  employee: "actions/general/printer-issue/user",
};

function returnPrinterIssueStepperPages(): StepperPage[] {
  const additionalInformationChild: StepperChild = {
    inputType: "text",
    name: "additionalInformation",
    validations: TEXT_AREA_INPUT_VALIDATIONS,
  };

  const contactEmailChild: StepperChild = {
    inputType: "text",
    name: "contactEmail",
    validations: EMAIL_VALIDATIONS,
  };

  const contactNumberChild: StepperChild = {
    inputType: "text",
    name: "contactNumber",
    validations: PHONE_NUMBER_VALIDATIONS,
  };

  const dateOfOccurrenceChild: StepperChild = {
    inputType: "text",
    name: "dateOfOccurrence",
    validations: DATE_NEAR_PAST_VALIDATIONS,
  };

  const printerIssueDescriptionChild: StepperChild = {
    inputType: "text",
    name: "printerIssueDescription",
    validations: TEXT_AREA_INPUT_VALIDATIONS,
  };

  const printerMakeChild: StepperChild = {
    inputType: "select",
    name: "printerMake",
    selectInputData: PRINTER_MAKE_SELECT_OPTIONS,
  };

  const printerModelChild: StepperChild = {
    inputType: "text",
    name: "printerModel",
    validations: PRINTER_MAKE_MODEL_VALIDATIONS,
  };

  const printerSerialNumberChild: StepperChild = {
    inputType: "text",
    name: "printerSerialNumber",
    validations: PRINTER_SERIAL_NUMBER_VALIDATIONS,
  };

  const timeOfOccurrenceChild: StepperChild = {
    inputType: "text",
    name: "timeOfOccurrence",
    validations: TIME_RAILWAY_VALIDATIONS,
  };

  const titleChild: StepperChild = {
    inputType: "text",
    name: "title",
    validations: TEXT_INPUT_VALIDATIONS,
  };

  const urgencyChild: StepperChild = {
    inputType: "select",
    name: "urgency",
    selectInputData: URGENCY_DATA,
  };

  const stepperPages: StepperPage[] = [
    {
      children: [
        printerMakeChild,
        printerModelChild,
        printerSerialNumberChild,
        printerIssueDescriptionChild,
        urgencyChild,
        additionalInformationChild,
      ],
      description: "Printer Issue Details",
    },
    {
      children: [
        titleChild,
        contactNumberChild,
        contactEmailChild,
        dateOfOccurrenceChild,
        timeOfOccurrenceChild,
      ],
      description: "Personal and Contact Details",
    },

    {
      children: [],
      description: "Review and Proceed",
      kind: "review",
    },
  ];

  return stepperPages;
}

const PRINTER_ISSUE_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: "Personal and Contact Details",
    ariaLabel: "Enter title, contact number, contact email, date and time of occurence",
  },

  {
    description: "Printer Details",
    ariaLabel:
      "Enter printer: make, model, serial number, description of issue, and any additional information",
  },

  {
    description: "Review and Proceed",
    ariaLabel: "Review the accuracy of information entered and proceed",
  },
];

const PRINTER_ISSUE_MAX_STEPPER_POSITION = 3;

const PRINTER_MAKE_SELECT_OPTIONS: PrinterMake[] = [
  "HP",
  "Canon",
  "Epson",
  "Brother",
  "Xerox",
  "Ricoh",
  "Lexmark",
  "Dell",
  "Kyocera",
  "Sharp",
  "Konica Minolta",
  "Toshiba TEC",
  "OKI",
  "Panasonic",
  "Fujitsu",
  "Zebra Technologies",
];

const PRINTER_ISSUE_QUERY_DATA: ComponentQueryData[] = [
  {
    label: "Username",
    value: "username",
    inputKind: "textInput",
    regex: USERNAME_REGEX,
    regexValidationFn: returnUsernameRegexValidationText,
  },
  {
    label: "Created Date",
    value: "createdAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Updated Date",
    value: "updatedAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Title",
    value: "title",
    inputKind: "textInput",
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Contact Number",
    value: "contactNumber",
    inputKind: "textInput",
    regex: PHONE_NUMBER_REGEX,
    regexValidationFn: returnPhoneNumberValidationText,
  },
  {
    label: "Contact Email",
    value: "contactEmail",
    inputKind: "textInput",
    regex: EMAIL_REGEX,
    regexValidationFn: returnEmailValidationText,
  },
  {
    label: "Date of Occurrence",
    value: "dateOfOccurrence",
    inputKind: "dateInput",
    regex: DATE_NEAR_PAST_REGEX,
    regexValidationFn: returnDateNearPastValidationText,
  },
  {
    label: "Time of Occurrence",
    value: "timeOfOccurrence",
    inputKind: "timeInput",
    regex: TIME_RAILWAY_REGEX,
    regexValidationFn: returnTimeRailwayValidationText,
  },
  {
    label: "Printer Make",
    value: "printerMake",
    inputKind: "selectInput",
    selectData: PRINTER_MAKE_SELECT_OPTIONS,
  },
  {
    label: "Printer Model",
    value: "printerModel",
    inputKind: "textInput",
    regex: PRINTER_MAKE_MODEL_REGEX,
    regexValidationFn: returnPrinterMakeModelValidationText,
  },
  {
    label: "Printer Serial Number",
    value: "printerSerialNumber",
    inputKind: "textInput",
    regex: PRINTER_SERIAL_NUMBER_REGEX,
    regexValidationFn: returnPrinterSerialNumberValidationText,
  },
  {
    label: "Printer Issue Description",
    value: "printerIssueDescription",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Urgency",
    value: "urgency",
    inputKind: "selectInput",
    selectData: URGENCY_DATA,
  },
  {
    label: "Additional Information",
    value: "additionalInformation",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Request Status",
    value: "requestStatus",
    inputKind: "selectInput",
    selectData: REQUEST_STATUS,
  },
];

const PRINTER_ISSUE_ROUTE_PATHS: ResourceRoutePaths = {
  manager: "actions/general/printer-issue",
  admin: "actions/general/printer-issue",
  employee: "actions/general/printer-issue/user",
};

export {
  PRINTER_ISSUE_DESCRIPTION_OBJECTS,
  PRINTER_ISSUE_MAX_STEPPER_POSITION,
  PRINTER_ISSUE_QUERY_DATA,
  PRINTER_ISSUE_ROLE_PATHS,
  PRINTER_ISSUE_ROUTE_PATHS,
  PRINTER_MAKE_SELECT_OPTIONS,
  returnPrinterIssueStepperPages,
};
