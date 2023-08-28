import {
  Department,
  UserDocument,
  JobPosition,
  StoreLocation,
} from '../../types';
import { groupByField } from '../../utils';
import {
  DepartmentsNodesAndEdges,
  DirectoryAction,
  DirectoryDepartments,
  DirectoryDispatch,
  DirectoryJobPositions,
  DirectoryState,
  DirectoryStoreLocations,
  DirectoryUserDocument,
} from './types';

const initialDirectoryState: DirectoryState = {
  groupedByDepartment: {} as Record<DirectoryDepartments, UserDocument[]>,
  groupedByJobPositon: {} as Record<DirectoryJobPositions, UserDocument[]>,
  groupedByStoreLocation: {} as Record<DirectoryStoreLocations, UserDocument[]>,

  filterByDepartment: 'All Departments',
  filterByJobPosition: 'All Job Positions',
  filterByStoreLocation: 'All Store Locations',
  filteredDepartmentsNodesAndEdges: {} as Partial<DepartmentsNodesAndEdges>,

  triggerSetDepartmentsNodesAndEdges: false,
  departmentsNodesAndEdges: {} as DepartmentsNodesAndEdges,

  layoutDirection: 'LR',

  isError: false,
  errorMessage: '',
  isLoading: false,
  loadingMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessfull: false,
  successMessage: '',
};

const directoryAction: DirectoryAction = {
  setGroupedByDepartment: 'setGroupedByDepartment',
  setGroupedByJobPositon: 'setGroupedByJobPositon',
  setGroupedByStoreLocation: 'setGroupedByStoreLocation',

  setFilterByDepartment: 'setFilterByDepartment',
  setFilterByJobPosition: 'setFilterByJobPosition',
  setFilterByStoreLocation: 'setFilterByStoreLocation',
  setFilteredDepartmentsNodesAndEdges: 'setFilteredDepartmentsNodesAndEdges',

  setTriggerSetDepartmentsNodesAndEdges:
    'setTriggerSetDepartmentsNodesAndEdges',
  setDepartmentsNodesAndEdges: 'setDepartmentsNodesAndEdges',

  setLayoutDirection: 'setLayoutDirection',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessfull: 'setIsSuccessfull',
  setSuccessMessage: 'setSuccessMessage',
};

function directoryReducer(
  state: DirectoryState,
  action: DirectoryDispatch
): DirectoryState {
  switch (action.type) {
    case directoryAction.setGroupedByDepartment: {
      const users = action.payload;
      const groupedByDepartment = groupByField<DirectoryUserDocument>({
        objectArray: users,
        field: 'department',
      });

      // set trigger to true
      const triggerSetDepartmentsNodesAndEdges = true;

      return {
        ...state,
        groupedByDepartment,
        triggerSetDepartmentsNodesAndEdges,
      };
    }

    case directoryAction.setGroupedByJobPositon: {
      const users = action.payload;
      const groupedByJobPositon = groupByField<DirectoryUserDocument>({
        objectArray: users,
        field: 'jobPosition',
      });

      // set trigger to true
      // const triggerSetDepartmentsNodesAndEdges = true;

      return { ...state, groupedByJobPositon };
    }

    case directoryAction.setGroupedByStoreLocation: {
      const users = action.payload;
      const groupedByStoreLocation = groupByField<DirectoryUserDocument>({
        objectArray: users,
        field: 'storeLocation',
      });

      // set trigger to true
      // const triggerSetDepartmentsNodesAndEdges = true;

      return { ...state, groupedByStoreLocation };
    }

    case directoryAction.setFilterByDepartment: {
      // const filterByDepartment = action.payload;

      // console.log('filterByDepartment', filterByDepartment);

      // if (filterByDepartment === 'All Departments') {
      //   return { ...state, filterByDepartment };
      // }

      // // only show the selected department
      // const propertyDescriptor: PropertyDescriptor = {
      //   enumerable: true,
      //   configurable: true,
      //   writable: true,
      // };

      // const departmentsNodesAndEdges = Object.entries(
      //   state.departmentsNodesAndEdges
      // ).reduce(
      //   (
      //     departmentsNodesAndEdgesAcc: DepartmentsNodesAndEdges,
      //     [department, { nodes, edges }]
      //   ) => {
      //     if (department === filterByDepartment) {
      //       Object.defineProperty(departmentsNodesAndEdgesAcc, department, {
      //         ...propertyDescriptor,
      //         value: { nodes, edges },
      //       });
      //     }

      //     return departmentsNodesAndEdgesAcc;
      //   },
      //   Object.create(null)
      // );

      // return {
      //   ...state,
      //   filterByDepartment,
      //   departmentsNodesAndEdges,
      // };
      return { ...state };
    }

    case directoryAction.setFilterByJobPosition:
      return { ...state, filterByJobPosition: action.payload };

    case directoryAction.setFilterByStoreLocation:
      return { ...state, filterByStoreLocation: action.payload };

    case directoryAction.setFilteredDepartmentsNodesAndEdges:
      return {
        ...state,
        // filteredDepartmentsNodesAndEdges: action.payload,
      };

    case directoryAction.setTriggerSetDepartmentsNodesAndEdges:
      return { ...state, triggerSetDepartmentsNodesAndEdges: action.payload };

    case directoryAction.setDepartmentsNodesAndEdges: {
      const { department, kind, data } = action.payload;

      console.log('department', department);
      console.log('kind', kind);
      console.log('data', data);

      // a shallow copy of the object
      // however, the nodes and edges are built anew upon each change of these state values: groupedByDepartment, any of the filters, and layoutDirection, padding, rowGap and storeLocationsNodes
      const departmentsNodesAndEdges = state.departmentsNodesAndEdges;

      const propertyDescriptor: PropertyDescriptor = {
        enumerable: true,
        configurable: true,
        writable: true,
      };

      switch (kind) {
        case 'nodes': {
          Object.defineProperty(departmentsNodesAndEdges, department, {
            ...propertyDescriptor,
            value: {
              ...departmentsNodesAndEdges[department],
              nodes: data,
            },
          });
          return {
            ...state,
            departmentsNodesAndEdges,
          };
        }
        case 'edges': {
          Object.defineProperty(departmentsNodesAndEdges, department, {
            ...propertyDescriptor,
            value: {
              ...departmentsNodesAndEdges[department],
              edges: data,
            },
          });
          return {
            ...state,
            departmentsNodesAndEdges,
          };
        }
        default:
          return state;
      }
    }

    case directoryAction.setLayoutDirection:
      return { ...state, layoutDirection: action.payload };

    case directoryAction.setIsError:
      return { ...state, isError: action.payload };
    case directoryAction.setErrorMessage:
      return { ...state, errorMessage: action.payload };
    case directoryAction.setIsLoading:
      return { ...state, isLoading: action.payload };
    case directoryAction.setLoadingMessage:
      return { ...state, loadingMessage: action.payload };
    case directoryAction.setIsSubmitting:
      return { ...state, isSubmitting: action.payload };
    case directoryAction.setSubmitMessage:
      return { ...state, submitMessage: action.payload };
    case directoryAction.setIsSuccessfull:
      return { ...state, isSuccessfull: action.payload };
    case directoryAction.setSuccessMessage:
      return { ...state, successMessage: action.payload };
    default:
      return state;
  }
}

export { directoryAction, directoryReducer, initialDirectoryState };
