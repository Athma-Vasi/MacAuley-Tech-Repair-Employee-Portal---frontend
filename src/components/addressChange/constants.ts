import { PROVINCES, REQUEST_STATUS, STATES_US } from '../../constants/data';
import { ResourceRoutePaths } from '../../types';
import { ComponentQueryData } from '../queryBuilder';
import { DescriptionObjectsArray } from '../wrappers';

const ADDRESS_CHANGE_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Contact Details',
    ariaLabel:
      'Enter country, address line, city, province or state, postal or zip code, and contact number',
  },

  {
    description: 'Review and Proceed',
    ariaLabel:
      'Review all the information you have entered and ensure they are correct before proceeding',
  },
];

const ADDRESS_CHANGE_MAX_STEPPER_POSITION = 2;

const COUNTRIES_DATA = ['Canada', 'United States'];

const ADDRESS_CHANGE_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Address line',
    value: 'addressLine',
    inputKind: 'textInput',
  },
  {
    label: 'City',
    value: 'city',
    inputKind: 'textInput',
  },
  {
    label: 'Province',
    value: 'province',
    inputKind: 'selectInput',
    selectData: PROVINCES,
  },
  {
    label: 'State',
    value: 'state',
    inputKind: 'selectInput',
    selectData: STATES_US,
  },
  {
    label: 'Postal code',
    value: 'postalCode',
    inputKind: 'textInput',
  },
  {
    label: 'Country',
    value: 'country',
    inputKind: 'selectInput',
    selectData: COUNTRIES_DATA,
  },
  {
    label: 'Acknowledgement',
    value: 'acknowledgement',
    inputKind: 'selectInput',
    selectData: ['true', 'false'],
  },
  {
    label: 'Request status',
    value: 'requestStatus',
    inputKind: 'selectInput',
    selectData: REQUEST_STATUS,
  },
];

const ADDRESS_CHANGE_PATHS: ResourceRoutePaths = {
  manager: '/api/v1/actions/company/address-change',
  admin: '/api/v1/actions/general/address-change',
  employee: '/api/v1/actions/employee/address-change/user',
};

export {
  ADDRESS_CHANGE_DESCRIPTION_OBJECTS,
  ADDRESS_CHANGE_MAX_STEPPER_POSITION,
  ADDRESS_CHANGE_PATHS,
  ADDRESS_CHANGE_QUERY_DATA,
  COUNTRIES_DATA,
};
