import { REQUEST_STATUS, URGENCY_DATA } from '../../constants/data';
import {
  DATE_FULL_RANGE_REGEX,
  DATE_NEAR_PAST_REGEX,
  EMAIL_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  PHONE_NUMBER_REGEX,
  PRINTER_MAKE_MODEL_REGEX,
  PRINTER_SERIAL_NUMBER_REGEX,
  TIME_RAILWAY_REGEX,
  USERNAME_REGEX,
} from '../../constants/regex';
import { ResourceRoutePaths } from '../../types';
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
} from '../../utils';
import { ComponentQueryData } from '../queryBuilder';
import { DescriptionObjectsArray } from '../wrappers';

const CREATE_PRINTER_ISSUE_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Personal and Contact Details',
    ariaLabel:
      'Enter title, contact number, contact email, date and time of occurence',
  },

  {
    description: 'Printer Details',
    ariaLabel:
      'Enter printer: make, model, serial number, description of issue, and any additional information',
  },

  {
    description: 'Review and Proceed',
    ariaLabel: 'Review the accuracy of information entered and proceed',
  },
];

const CREATE_PRINTER_ISSUE_MAX_STEPPER_POSITION = 3;

const PRINTER_MAKE_SELECT_OPTIONS = [
  'HP',
  'Canon',
  'Epson',
  'Brother',
  'Xerox',
  'Ricoh',
  'Lexmark',
  'Dell',
  'Kyocera',
  'Sharp',
  'Konica Minolta',
  'Toshiba TEC',
  'OKI',
  'Panasonic',
  'Fujitsu',
  'Zebra Technologies',
];

const PRINTER_ISSUE_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Username',
    value: 'username',
    inputKind: 'textInput',
    regex: USERNAME_REGEX,
    regexValidationFn: returnUsernameRegexValidationText,
  },
  {
    label: 'Created Date',
    value: 'createdAt',
    inputKind: 'dateInput',
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: 'Updated Date',
    value: 'updatedAt',
    inputKind: 'dateInput',
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: 'Title',
    value: 'title',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Contact Number',
    value: 'contactNumber',
    inputKind: 'textInput',
    regex: PHONE_NUMBER_REGEX,
    regexValidationFn: returnPhoneNumberValidationText,
  },
  {
    label: 'Contact Email',
    value: 'contactEmail',
    inputKind: 'textInput',
    regex: EMAIL_REGEX,
    regexValidationFn: returnEmailValidationText,
  },
  {
    label: 'Date of Occurrence',
    value: 'dateOfOccurrence',
    inputKind: 'dateInput',
    regex: DATE_NEAR_PAST_REGEX,
    regexValidationFn: returnDateNearPastValidationText,
  },
  {
    label: 'Time of Occurrence',
    value: 'timeOfOccurrence',
    inputKind: 'timeInput',
    regex: TIME_RAILWAY_REGEX,
    regexValidationFn: returnTimeRailwayValidationText,
  },
  {
    label: 'Printer Make',
    value: 'printerMake',
    inputKind: 'selectInput',
    selectData: PRINTER_MAKE_SELECT_OPTIONS,
  },
  {
    label: 'Printer Model',
    value: 'printerModel',
    inputKind: 'textInput',
    regex: PRINTER_MAKE_MODEL_REGEX,
    regexValidationFn: returnPrinterMakeModelValidationText,
  },
  {
    label: 'Printer Serial Number',
    value: 'printerSerialNumber',
    inputKind: 'textInput',
    regex: PRINTER_SERIAL_NUMBER_REGEX,
    regexValidationFn: returnPrinterSerialNumberValidationText,
  },
  {
    label: 'Printer Issue Description',
    value: 'printerIssueDescription',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Urgency',
    value: 'urgency',
    inputKind: 'selectInput',
    selectData: URGENCY_DATA,
  },
  {
    label: 'Additional Information',
    value: 'additionalInformation',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Request Status',
    value: 'requestStatus',
    inputKind: 'selectInput',
    selectData: REQUEST_STATUS,
  },
];

const PRINTER_ISSUE_ROUTE_PATHS: ResourceRoutePaths = {
  manager: 'actions/general/printer-issue',
  admin: 'actions/general/printer-issue',
  employee: 'actions/general/printer-issue/user',
};

export {
  CREATE_PRINTER_ISSUE_DESCRIPTION_OBJECTS,
  CREATE_PRINTER_ISSUE_MAX_STEPPER_POSITION,
  PRINTER_ISSUE_QUERY_DATA,
  PRINTER_ISSUE_ROUTE_PATHS,
  PRINTER_MAKE_SELECT_OPTIONS,
};
