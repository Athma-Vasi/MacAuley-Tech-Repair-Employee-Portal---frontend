import { REQUEST_STATUS, URGENCY_DATA } from '../../constants/data';
import { ResourceRoutePaths } from '../../types';
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
    label: 'Title',
    value: 'title',
    inputKind: 'textInput',
  },
  {
    label: 'Contact number',
    value: 'contactNumber',
    inputKind: 'textInput',
  },
  {
    label: 'Contact email',
    value: 'contactEmail',
    inputKind: 'textInput',
  },
  {
    label: 'Date of occurrence',
    value: 'dateOfOccurrence',
    inputKind: 'dateInput',
  },
  {
    label: 'Time of occurrence',
    value: 'timeOfOccurrence',
    inputKind: 'timeInput',
  },
  {
    label: 'Printer make',
    value: 'printerMake',
    inputKind: 'selectInput',
    selectData: PRINTER_MAKE_SELECT_OPTIONS,
  },
  {
    label: 'Printer model',
    value: 'printerModel',
    inputKind: 'textInput',
  },
  {
    label: 'Printer serial number',
    value: 'printerSerialNumber',
    inputKind: 'textInput',
  },
  {
    label: 'Printer issue description',
    value: 'printerIssueDescription',
    inputKind: 'textInput',
  },
  {
    label: 'Urgency',
    value: 'urgency',
    inputKind: 'selectInput',
    selectData: URGENCY_DATA,
  },
  {
    label: 'Additional information',
    value: 'additionalInformation',
    inputKind: 'textInput',
  },
  {
    label: 'Request status',
    value: 'requestStatus',
    inputKind: 'selectInput',
    selectData: REQUEST_STATUS,
  },
  {
    label: 'Created date',
    value: 'createdAt',
    inputKind: 'dateInput',
  },
  {
    label: 'Updated date',
    value: 'updatedAt',
    inputKind: 'dateInput',
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
