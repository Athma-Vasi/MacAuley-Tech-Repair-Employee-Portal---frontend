import { DEPARTMENT_DATA, JOB_POSITION_DATA } from '../../constants/data';
import {
  CheckboxInputData,
  Department,
  JobPosition,
  SelectInputData,
  StoreLocation,
} from '../../types';
import { STORE_LOCATION_DATA } from '../register/constants';

const DIRECTORY_DEPARTMENT_SELECT_OPTIONS: SelectInputData =
  DEPARTMENT_DATA.reduce(
    (directoryDepartmentsAcc, department: Department) => {
      directoryDepartmentsAcc.push({
        label: department,
        value: department,
      });

      return directoryDepartmentsAcc;
    },
    [{ label: 'All Departments', value: 'All Departments' }]
  );

const DIRECTORY_JOB_POSITION_SELECT_OPTIONS: SelectInputData =
  JOB_POSITION_DATA.reduce(
    (directoryJobPositionsAcc, jobPosition: JobPosition) => {
      directoryJobPositionsAcc.push({
        label: jobPosition,
        value: jobPosition,
      });

      return directoryJobPositionsAcc;
    },
    [{ label: 'All Job Positions', value: 'All Job Positions' }]
  );

const DIRECTORY_STORE_LOCATION_SELECT_OPTIONS: SelectInputData =
  STORE_LOCATION_DATA.reduce(
    (directoryStoreLocationsAcc, storeLocation: StoreLocation) => {
      directoryStoreLocationsAcc.push({
        label: storeLocation,
        value: storeLocation,
      });

      return directoryStoreLocationsAcc;
    },
    [{ label: 'All Store Locations', value: 'All Store Locations' }]
  );

const DAGRE_LAYOUT_RANKDIR_SELECT_OPTIONS: SelectInputData = [
  { label: 'Top to Bottom', value: 'TB' },
  { label: 'Bottom to Top', value: 'BT' },
  { label: 'Left to Right', value: 'LR' },
  { label: 'Right to Left', value: 'RL' },
];

const DAGRE_LAYOUT_RANKALIGN_SELECT_OPTIONS: SelectInputData = [
  { label: 'Default', value: 'undefined' },
  { label: 'Upper Left', value: 'UL' },
  { label: 'Upper Right', value: 'UR' },
  { label: 'Down Left', value: 'DL' },
  { label: 'Down Right', value: 'DR' },
];

const DAGRE_LAYOUT_RANKER_SELECT_OPTIONS: SelectInputData = [
  { label: 'Network Simplex', value: 'network-simplex' },
  { label: 'Tight Tree', value: 'tight-tree' },
  { label: 'Longest Path', value: 'longest-path' },
];

export {
  DAGRE_LAYOUT_RANKALIGN_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKDIR_SELECT_OPTIONS,
  DAGRE_LAYOUT_RANKER_SELECT_OPTIONS,
  DIRECTORY_DEPARTMENT_SELECT_OPTIONS,
  DIRECTORY_JOB_POSITION_SELECT_OPTIONS,
  DIRECTORY_STORE_LOCATION_SELECT_OPTIONS,
};
