import { DEPARTMENT_DATA, JOB_POSITION_DATA } from '../../constants/data';
import { CheckboxInputData } from '../../types';
import { STORE_LOCATION_DATA } from '../register/constants';

const DIRECTORY_DEPARTMENT_CHECKBOX_DATA = DEPARTMENT_DATA.reduce(
  (directoryDepartmentsAcc, department) => {
    directoryDepartmentsAcc.push({
      label: department,
      value: department,
    });

    return directoryDepartmentsAcc;
  },
  [{ label: 'All Departments', value: 'All Departments' }]
);

const DIRECTORY_JOB_POSITION_CHECKBOX_DATA = JOB_POSITION_DATA.reduce(
  (directoryJobPositionsAcc, jobPosition) => {
    directoryJobPositionsAcc.push({
      label: jobPosition,
      value: jobPosition,
    });

    return directoryJobPositionsAcc;
  },
  [{ label: 'All Job Positions', value: 'All Job Positions' }]
);

const DIRECTORY_STORE_LOCATION_CHECKBOX_DATA = STORE_LOCATION_DATA.reduce(
  (directoryStoreLocationsAcc, storeLocation) => {
    directoryStoreLocationsAcc.push({
      label: storeLocation,
      value: storeLocation,
    });

    return directoryStoreLocationsAcc;
  },
  [{ label: 'All Store Locations', value: 'All Store Locations' }]
);

export {
  DIRECTORY_DEPARTMENT_CHECKBOX_DATA,
  DIRECTORY_JOB_POSITION_CHECKBOX_DATA,
  DIRECTORY_STORE_LOCATION_CHECKBOX_DATA,
};
