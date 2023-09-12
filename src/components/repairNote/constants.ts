import { PROVINCES, STATES_US, URGENCY_DATA } from '../../constants/data';
import { ResourceRoutePaths } from '../../types';
import { COUNTRIES_DATA } from '../addressChange/constants';
import { CURRENCY_DATA } from '../benefits/constants';
import { ComponentQueryData } from '../queryBuilder';

const REQUIRED_REPAIRS_CHECKBOX_DATA = [
  {
    label: 'Cleaning',
    value: 'Cleaning',
  },
  {
    label: 'Component replacement',
    value: 'Component replacement',
  },
  {
    label: 'Soldering',
    value: 'Soldering',
  },
  {
    label: 'Testing',
    value: 'Testing',
  },
  {
    label: 'Calibration',
    value: 'Calibration',
  },
  {
    label: 'Software update',
    value: 'Software update',
  },
  {
    label: 'Diagnostic evaluation',
    value: 'Diagnostic evaluation',
  },
  {
    label: 'Internal inspection',
    value: 'Internal inspection',
  },
  {
    label: 'External housing',
    value: 'External housing',
  },
  {
    label: 'Data recovery',
    value: 'Data recovery',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];

const PARTS_NEEDED_CHECKBOX_DATA = [
  {
    label: 'CPU',
    value: 'CPU',
  },
  {
    label: 'GPU',
    value: 'GPU',
  },
  {
    label: 'Motherboard',
    value: 'Motherboard',
  },
  {
    label: 'RAM',
    value: 'RAM',
  },
  {
    label: 'Storage',
    value: 'Storage',
  },
  {
    label: 'PSU',
    value: 'PSU',
  },
  {
    label: 'Cooling',
    value: 'Cooling',
  },
  {
    label: 'Connectors',
    value: 'Connectors',
  },
  {
    label: 'Software',
    value: 'Software',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];

const REPAIR_STATUS_DATA = [
  'In progress',
  'Waiting for parts',
  'Awaiting approval',
  'Completed',
  'Cancelled',
];

const REPAIR_NOTE_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Customer name',
    value: 'customerName',
    inputKind: 'textInput',
  },
  {
    label: 'Customer phone',
    value: 'customerPhone',
    inputKind: 'textInput',
  },
  {
    label: 'Customer email',
    value: 'customerEmail',
    inputKind: 'textInput',
  },
  {
    label: 'Customer address line',
    value: 'customerAddressLine',
    inputKind: 'textInput',
  },
  {
    label: 'Customer city',
    value: 'customerCity',
    inputKind: 'textInput',
  },
  {
    label: 'Customer state',
    value: 'customerState',
    inputKind: 'selectInput',
    selectData: STATES_US,
  },
  {
    label: 'Customer province',
    value: 'customerProvince',
    inputKind: 'selectInput',
    selectData: PROVINCES,
  },
  {
    label: 'Customer country',
    value: 'customerCountry',
    inputKind: 'selectInput',
    selectData: COUNTRIES_DATA,
  },
  {
    label: 'Customer postal code',
    value: 'customerPostalCode',
    inputKind: 'textInput',
  },
  // part information
  {
    label: 'Part name',
    value: 'partName',
    inputKind: 'textInput',
  },
  {
    label: 'Part serial id',
    value: 'partSerialId',
    inputKind: 'textInput',
  },
  {
    label: 'Date received',
    value: 'dateReceived',
    inputKind: 'dateInput',
  },
  {
    label: 'Description of issue',
    value: 'descriptionOfIssue',
    inputKind: 'textInput',
  },
  {
    label: 'Initial inspection notes',
    value: 'initialInspectionNotes',
    inputKind: 'textInput',
  },
  // repair information
  {
    label: 'Required repairs',
    value: 'requiredRepairs',
    inputKind: 'selectInput',
    selectData: REQUIRED_REPAIRS_CHECKBOX_DATA.map(({ label }) => label),
  },
  {
    label: 'Parts needed',
    value: 'partsNeeded',
    inputKind: 'selectInput',
    selectData: PARTS_NEEDED_CHECKBOX_DATA.map(({ label }) => label),
  },
  {
    label: 'Parts needed models',
    value: 'partsNeededModels',
    inputKind: 'textInput',
  },
  {
    label: 'Part under warranty',
    value: 'partUnderWarranty',
    inputKind: 'booleanInput',
    booleanData: [true, false],
  },
  {
    label: 'Estimated repair cost',
    value: 'estimatedRepairCost',
    inputKind: 'numberInput',
  },
  {
    label: 'Estimated repair cost currency',
    value: 'estimatedRepairCostCurrency',
    inputKind: 'selectInput',
    selectData: CURRENCY_DATA,
  },
  {
    label: 'Estimated completion date',
    value: 'estimatedCompletionDate',
    inputKind: 'dateInput',
  },
  {
    label: 'Repair priority',
    value: 'repairPriority',
    inputKind: 'selectInput',
    selectData: URGENCY_DATA,
  },
  // ongoing updates
  {
    label: 'Repair notes',
    value: 'repairNotes',
    inputKind: 'textInput',
  },
  {
    label: 'Testing results',
    value: 'testingResults',
    inputKind: 'textInput',
  },
  {
    label: 'Final repair cost',
    value: 'finalRepairCost',
    inputKind: 'numberInput',
  },
  {
    label: 'Final repair cost currency',
    value: 'finalRepairCostCurrency',
    inputKind: 'selectInput',
    selectData: CURRENCY_DATA,
  },
  {
    label: 'Repair status',
    value: 'repairStatus',
    inputKind: 'selectInput',
    selectData: REPAIR_STATUS_DATA,
  },
];

const REPAIR_NOTE_ROUTE_PATHS: ResourceRoutePaths = {
  manager: 'repair-note/',
  admin: 'repair-note/',
  employee: 'repair-note/user',
};

export {
  PARTS_NEEDED_CHECKBOX_DATA,
  REPAIR_NOTE_QUERY_DATA,
  REPAIR_NOTE_ROUTE_PATHS,
  REPAIR_STATUS_DATA,
  REQUIRED_REPAIRS_CHECKBOX_DATA,
};
