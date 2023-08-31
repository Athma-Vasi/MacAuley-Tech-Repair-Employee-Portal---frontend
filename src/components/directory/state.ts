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
  FilteredDepartmentNodesAndEdges,
} from './types';

const initialDirectoryState: DirectoryState = {
  groupedByDepartment: {} as Record<DirectoryDepartments, UserDocument[]>,
  groupedByJobPositon: {} as Record<DirectoryJobPositions, UserDocument[]>,
  groupedByStoreLocation: {} as Record<DirectoryStoreLocations, UserDocument[]>,

  filterByDepartment: [],
  filterByJobPosition: [],
  filterByStoreLocation: [],
  filteredDepartmentsNodesAndEdges: {} as FilteredDepartmentNodesAndEdges,

  triggerSetDepartmentsNodesAndEdges: false,
  departmentsNodesAndEdges: {} as DepartmentsNodesAndEdges,

  layoutedNodes: [],
  layoutedEdges: [],
  triggerSetLayoutedNodesAndEdges: false,

  // dagre layout options
  dagreRankDir: 'TB',
  dagreRankAlign: 'undefined',
  dagreNodeSep: 50, // default 50
  dagreEdgeSep: 10, // default 10
  dagreRankSep: 50, // default 50
  dagreMarginX: 0, // default 0
  dagreMarginY: 0, // default 0
  dagreRanker: 'network-simplex', // default 'network-simplex'
  dagreMinLen: 1, // minimum edge length default: 1
  dagreWeight: 1, // default: 1
  dagreLabelPos: 'r', // default: 'r'
  dagreLabelOffset: 10, // default: 10

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

  triggerSetDepartmentsNodesAndEdges: 'triggerSetDepartmentsNodesAndEdges',
  setDepartmentsNodesAndEdges: 'setDepartmentsNodesAndEdges',

  setLayoutedNodes: 'setLayoutedNodes',
  setLayoutedEdges: 'setLayoutedEdges',
  triggerSetLayoutedNodesAndEdges: 'triggerSetLayoutedNodesAndEdges',

  // dagre layout options
  setDagreRankDir: 'setDagreRankDir',
  setDagreRankAlign: 'setDagreRankAlign',
  setDagreNodeSep: 'setDagreNodeSep',
  setDagreEdgeSep: 'setDagreEdgeSep',
  setDagreRankSep: 'setDagreRankSep',
  setDagreMarginX: 'setDagreMarginX',
  setDagreMarginY: 'setDagreMarginY',
  setDagreRanker: 'setDagreRanker',
  setDagreMinLen: 'setDagreMinLen',
  setDagreWeight: 'setDagreWeight',
  setDagreLabelPos: 'setDagreLabelPos',
  setDagreLabelOffset: 'setDagreLabelOffset',

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
  const propertyDescriptor: PropertyDescriptor = {
    enumerable: true,
    configurable: true,
    writable: true,
  };

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
      const filterByDepartment = action.payload;
      return { ...state, filterByDepartment };
    }

    case directoryAction.setFilterByJobPosition:
      return { ...state, filterByJobPosition: action.payload };

    case directoryAction.setFilterByStoreLocation:
      return { ...state, filterByStoreLocation: action.payload };

    case directoryAction.setFilteredDepartmentsNodesAndEdges: {
      const { department, kind, data } = action.payload;

      // a shallow copy of the object
      // however, the nodes and edges are built anew upon each change of these state values: groupedByDepartment, any of the filters, and layoutDirection, padding, rowGap and storeLocationsNodes
      const filteredDepartmentsNodesAndEdges =
        state.filteredDepartmentsNodesAndEdges;

      switch (kind) {
        case 'nodes': {
          Object.defineProperty(filteredDepartmentsNodesAndEdges, department, {
            ...propertyDescriptor,
            value: {
              ...filteredDepartmentsNodesAndEdges[department],
              nodes: data,
            },
          });
          return {
            ...state,
            filteredDepartmentsNodesAndEdges,
          };
        }
        case 'edges': {
          Object.defineProperty(filteredDepartmentsNodesAndEdges, department, {
            ...propertyDescriptor,
            value: {
              ...filteredDepartmentsNodesAndEdges[department],
              edges: data,
            },
          });
          return {
            ...state,
            filteredDepartmentsNodesAndEdges,
          };
        }
        default:
          return state;
      }
    }

    case directoryAction.triggerSetDepartmentsNodesAndEdges:
      return { ...state, triggerSetDepartmentsNodesAndEdges: action.payload };

    case directoryAction.setDepartmentsNodesAndEdges: {
      // separate state from filtered departments because cannot deep copy Node using structuredClone (contains DOM elements)
      const { department, kind, data } = action.payload;

      const departmentsNodesAndEdges = state.departmentsNodesAndEdges;

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

    case directoryAction.setLayoutedNodes:
      return {
        ...state,
        layoutedNodes: action.payload,
        triggerSetLayoutedNodesAndEdges: false,
      };
    case directoryAction.setLayoutedEdges:
      return {
        ...state,
        layoutedEdges: action.payload,
        triggerSetLayoutedNodesAndEdges: false,
      };
    case directoryAction.triggerSetLayoutedNodesAndEdges:
      return {
        ...state,
        triggerSetLayoutedNodesAndEdges: action.payload,
      };

    // dagre layout options
    case directoryAction.setDagreRankDir:
      return {
        ...state,
        dagreRankDir: action.payload,
      };
    case directoryAction.setDagreRankAlign:
      return {
        ...state,
        dagreRankAlign: action.payload,
      };

    case directoryAction.setDagreNodeSep:
      return {
        ...state,
        dagreNodeSep: action.payload,
      };
    case directoryAction.setDagreEdgeSep:
      return {
        ...state,
        dagreEdgeSep: action.payload,
      };
    case directoryAction.setDagreRankSep:
      return {
        ...state,
        dagreRankSep: action.payload,
      };
    case directoryAction.setDagreMarginX:
      return {
        ...state,
        dagreMarginX: action.payload,
      };
    case directoryAction.setDagreMarginY:
      return {
        ...state,
        dagreMarginY: action.payload,
      };
    case directoryAction.setDagreRanker:
      return {
        ...state,
        dagreRanker: action.payload,
      };
    case directoryAction.setDagreMinLen:
      return {
        ...state,
        dagreMinLen: action.payload,
      };
    case directoryAction.setDagreWeight:
      return {
        ...state,
        dagreWeight: action.payload,
      };
    case directoryAction.setDagreLabelPos:
      return {
        ...state,
        dagreLabelPos: action.payload,
      };
    case directoryAction.setDagreLabelOffset:
      return {
        ...state,
        dagreLabelOffset: action.payload,
      };

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
