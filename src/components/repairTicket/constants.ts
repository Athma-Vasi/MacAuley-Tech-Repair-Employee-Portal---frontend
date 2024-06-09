import { CURRENCY_DATA, PROVINCES, STATES_US, URGENCY_DATA } from "../../constants/data";
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  DATE_FULL_RANGE_REGEX,
  DATE_NEAR_FUTURE_REGEX,
  DATE_NEAR_PAST_REGEX,
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
  NOTE_TEXT_AREA_REGEX,
  NOTE_TEXT_REGEX,
  PHONE_NUMBER_REGEX,
  SERIAL_ID_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import { ResourceRoutePaths } from "../../types";
import {
  returnAddressValidationText,
  returnCityValidationText,
  returnDateFullRangeValidationText,
  returnDateNearFutureValidationText,
  returnDateNearPastValidationText,
  returnEmailValidationText,
  returnGrammarValidationText,
  returnNameValidationText,
  returnNoteTextValidationText,
  returnFloatAmountValidationText,
  returnPhoneNumberValidationText,
  returnSerialIdValidationText,
  returnUsernameRegexValidationText,
} from "../../utils";
import { ComponentQueryData } from "../queryBuilder";
import { PartsNeeded } from "./types";

const REQUIRED_REPAIRS_CHECKBOX_DATA = [
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

const PARTS_NEEDED_CHECKBOX_DATA: {
  label: PartsNeeded;
  value: PartsNeeded;
}[] = [
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

const REPAIR_STATUS_DATA = [
  "In progress",
  "Waiting for parts",
  "Awaiting approval",
  "Completed",
  "Cancelled",
];

const REPAIR_NOTE_QUERY_DATA: ComponentQueryData[] = [
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

  // part information
  {
    label: "Part Name",
    value: "partName",
    inputKind: "textInput",
    regex: NOTE_TEXT_REGEX,
    regexValidationFn: returnNoteTextValidationText,
  },
  {
    label: "Part Serial Id",
    value: "partSerialId",
    inputKind: "textInput",
    regex: SERIAL_ID_REGEX,
    regexValidationFn: returnSerialIdValidationText,
  },
  {
    label: "Date Received",
    value: "dateReceived",
    inputKind: "dateInput",
    regex: DATE_NEAR_PAST_REGEX,
    regexValidationFn: returnDateNearPastValidationText,
  },
  {
    label: "Description of Issue",
    value: "descriptionOfIssue",
    inputKind: "textInput",
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Initial Inspection Notes",
    value: "initialInspectionNotes",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  // repair information
  {
    label: "Required Repairs",
    value: "requiredRepairs",
    inputKind: "selectInput",
    selectData: REQUIRED_REPAIRS_CHECKBOX_DATA.map(({ label }) => label),
  },
  {
    label: "Parts Needed",
    value: "partsNeeded",
    inputKind: "selectInput",
    selectData: PARTS_NEEDED_CHECKBOX_DATA.map(({ label }) => label),
  },
  {
    label: "Parts Needed Models",
    value: "partsNeededModels",
    inputKind: "textInput",
    regex: NOTE_TEXT_AREA_REGEX,
    regexValidationFn: returnNoteTextValidationText,
  },
  {
    label: "Part Under Warranty",
    value: "partUnderWarranty",
    inputKind: "booleanInput",
    booleanData: [true, false],
  },
  {
    label: "Estimated Repair Cost",
    value: "estimatedRepairCost",
    inputKind: "numberInput",
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: "Estimated Repair Cost Currency",
    value: "estimatedRepairCostCurrency",
    inputKind: "selectInput",
    selectData: CURRENCY_DATA,
  },
  {
    label: "Estimated Completion Date",
    value: "estimatedCompletionDate",
    inputKind: "dateInput",
    regex: DATE_NEAR_FUTURE_REGEX,
    regexValidationFn: returnDateNearFutureValidationText,
  },
  {
    label: "Repair Priority",
    value: "repairPriority",
    inputKind: "selectInput",
    selectData: URGENCY_DATA,
  },
  // ongoing updates
  {
    label: "Repair Notes",
    value: "repairTickets",
    inputKind: "textInput",
    regex: NOTE_TEXT_AREA_REGEX,
    regexValidationFn: returnNoteTextValidationText,
  },
  {
    label: "Testing Results",
    value: "testingResults",
    inputKind: "textInput",
    regex: NOTE_TEXT_AREA_REGEX,
    regexValidationFn: returnNoteTextValidationText,
  },
  {
    label: "Final Repair Cost",
    value: "finalRepairCost",
    inputKind: "numberInput",
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: "Final Repair Cost Currency",
    value: "finalRepairCostCurrency",
    inputKind: "selectInput",
    selectData: CURRENCY_DATA,
  },
  {
    label: "Repair Status",
    value: "repairStatus",
    inputKind: "selectInput",
    selectData: REPAIR_STATUS_DATA,
  },
];

const REPAIR_NOTE_ROUTE_PATHS: ResourceRoutePaths = {
  manager: "repair-ticket",
  admin: "repair-ticket",
  employee: "repair-ticket/user",
};

export {
  PARTS_NEEDED_CHECKBOX_DATA,
  REPAIR_NOTE_QUERY_DATA,
  REPAIR_NOTE_ROUTE_PATHS,
  REPAIR_STATUS_DATA,
  REQUIRED_REPAIRS_CHECKBOX_DATA,
};
