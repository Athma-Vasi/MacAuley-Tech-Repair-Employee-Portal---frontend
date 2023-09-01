import { PROPERTY_DESCRIPTOR } from '../../constants/data';
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
  DepartmentsWithDefaultKey,
  DirectoryDispatch,
  JobPositionsWithDefaultKey,
  DirectoryState,
  StoreLocationsWithDefaultKey,
  DirectoryUserDocument,
  FilteredNodesAndEdges,
} from './types';
import type { Node, Edge } from 'reactflow';

const initialDirectoryState: DirectoryState = {
  groupedByDepartment: {} as Record<DepartmentsWithDefaultKey, UserDocument[]>,
  groupedByJobPositon: {} as Record<JobPositionsWithDefaultKey, UserDocument[]>,
  groupedByStoreLocation: {} as Record<
    StoreLocationsWithDefaultKey,
    UserDocument[]
  >,

  filterByDepartment: 'All Departments',
  filteredDepartmentsNodesAndEdges: null,
  filterByJobPosition: 'All Job Positions',
  filteredJobPositionsNodesAndEdges: null,
  filterByStoreLocation: 'All Store Locations',
  filteredStoreLocationsNodesAndEdges: null,

  triggerSetDepartmentsNodesAndEdges: false,
  departmentsNodesAndEdges: {} as DepartmentsNodesAndEdges,

  layoutedNodes: [],
  layoutedEdges: [],
  triggerSetLayoutedNodesAndEdges: false,

  // dagre layout options
  dagreRankDir: 'TB',
  dagreRankAlign: 'undefined',
  dagreNodeSep: 50, // default 50
  dagreRankSep: 50, // default 50
  dagreRanker: 'network-simplex', // default 'network-simplex'
  dagreMinLen: 1, // minimum edge length default: 1
  dagreWeight: 1, // default: 1

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

  triggerSetDepartmentsNodesAndEdges: 'triggerSetDepartmentsNodesAndEdges',
  setDepartmentsNodesAndEdges: 'setDepartmentsNodesAndEdges',

  setLayoutedNodes: 'setLayoutedNodes',
  setLayoutedEdges: 'setLayoutedEdges',
  triggerSetLayoutedNodesAndEdges: 'triggerSetLayoutedNodesAndEdges',

  // dagre layout options
  setDagreRankDir: 'setDagreRankDir',
  setDagreRankAlign: 'setDagreRankAlign',
  setDagreNodeSep: 'setDagreNodeSep',
  setDagreRankSep: 'setDagreRankSep',
  setDagreRanker: 'setDagreRanker',
  setDagreMinLen: 'setDagreMinLen',
  setDagreWeight: 'setDagreWeight',

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
      // set filterByDepartment value
      const filterByDepartment = action.payload;

      // and set filteredDepartmentsNodesAndEdges based on said value
      if (filterByDepartment === 'All Departments') {
        return {
          ...state,
          filterByDepartment,
          filteredDepartmentsNodesAndEdges: null,
          filterByJobPosition: 'All Job Positions',
          filteredJobPositionsNodesAndEdges: null,
          filterByStoreLocation: 'All Store Locations',
          filteredStoreLocationsNodesAndEdges: null,
        };
      }

      const nodesAndEdgesObj =
        state.departmentsNodesAndEdges[filterByDepartment];
      // create a new object and assign nodes and edges
      const filteredDepartmentsNodesAndEdges = Object.entries(
        nodesAndEdgesObj
      ).reduce(
        (filteredDepartmentNodesAndEdgesAcc: FilteredNodesAndEdges, curr) => {
          const key = curr[0]; // will be 'nodes' or 'edges'
          const value = curr[1]; // will be Node[] | Edge[]

          Object.defineProperty(filteredDepartmentNodesAndEdgesAcc, key, {
            ...PROPERTY_DESCRIPTOR,
            value,
          });

          return filteredDepartmentNodesAndEdgesAcc;
        },
        Object.create(null)
      );

      // on every filterByDepartment change, set filteredJobPositionsNodesAndEdges to null and filteredStoreLocationsNodesAndEdges to null

      return {
        ...state,
        filterByDepartment,
        filteredDepartmentsNodesAndEdges,
        filterByJobPosition: 'All Job Positions',
        filteredJobPositionsNodesAndEdges: null,
        filterByStoreLocation: 'All Store Locations',
        filteredStoreLocationsNodesAndEdges: null,
      };
    }

    case directoryAction.setFilterByJobPosition: {
      // set filterByJobPosition string value
      const filterByJobPosition = action.payload;
      const filterByStoreLocation = state.filterByStoreLocation;

      // filteredDepartmentNodesAndEdges will always be set when this reducer action is dispatched
      const filteredDepartmentsNodesAndEdges =
        state.filteredDepartmentsNodesAndEdges;

      if (!filteredDepartmentsNodesAndEdges) {
        return state;
      }

      // if filterByJobPosition is 'All Job Positions' then return filteredDepartmentsNodesAndEdges filtered by filterByStoreLocation
      if (filterByJobPosition === 'All Job Positions') {
        const {
          nodes: filteredDepartmentsNodes,
          edges: filteredDepartmentsEdges,
        } = filteredDepartmentsNodesAndEdges;

        const filteredJobPositionsNodes = filteredDepartmentsNodes.filter(
          (node) => {
            return filterByStoreLocation === 'All Store Locations'
              ? node
              : node.id
                  .toLowerCase()
                  .includes(filterByStoreLocation.toLowerCase());
          }
        );

        const filteredJobPositionsEdges = filteredDepartmentsEdges.filter(
          (edge) => {
            return filterByStoreLocation === 'All Store Locations'
              ? edge
              : edge.id
                  .toLowerCase()
                  .includes(filterByStoreLocation.toLowerCase());
          }
        );

        const filteredJobPositionsNodesAndEdges = Object.create(
          null
        ) as FilteredNodesAndEdges;

        Object.defineProperty(filteredJobPositionsNodesAndEdges, 'nodes', {
          ...PROPERTY_DESCRIPTOR,
          value: filteredJobPositionsNodes,
        });

        Object.defineProperty(filteredJobPositionsNodesAndEdges, 'edges', {
          ...PROPERTY_DESCRIPTOR,
          value: filteredJobPositionsEdges,
        });

        return {
          ...state,
          filterByJobPosition,
          filteredJobPositionsNodesAndEdges,
        };
      }

      // if filterByJobPosition is not 'All Job Positions' then return filteredDepartmentsNodesAndEdges filtered by filterByJobPosition and filterByStoreLocation
      const {
        nodes: filteredDepartmentsNodes,
        edges: filteredDepartmentsEdges,
      } = filteredDepartmentsNodesAndEdges;

      const filteredJobPositionsNodes = filteredDepartmentsNodes.filter(
        (node) => {
          return filterByStoreLocation === 'All Store Locations'
            ? node.id.toLowerCase().includes(filterByJobPosition.toLowerCase())
            : node.id
                .toLowerCase()
                .includes(filterByJobPosition.toLowerCase()) &&
                node.id
                  .toLowerCase()
                  .includes(filterByStoreLocation.toLowerCase());
        }
      );

      const filteredJobPositionsEdges = filteredDepartmentsEdges.filter(
        (edge) => {
          return filterByStoreLocation === 'All Store Locations'
            ? edge.id.toLowerCase().includes(filterByJobPosition.toLowerCase())
            : edge.id
                .toLowerCase()
                .includes(filterByJobPosition.toLowerCase()) &&
                edge.id
                  .toLowerCase()
                  .includes(filterByStoreLocation.toLowerCase());
        }
      );

      const filteredJobPositionsNodesAndEdges = Object.create(
        null
      ) as FilteredNodesAndEdges;

      Object.defineProperty(filteredJobPositionsNodesAndEdges, 'nodes', {
        ...PROPERTY_DESCRIPTOR,
        value: filteredJobPositionsNodes,
      });

      Object.defineProperty(filteredJobPositionsNodesAndEdges, 'edges', {
        ...PROPERTY_DESCRIPTOR,
        value: filteredJobPositionsEdges,
      });

      return {
        ...state,
        filterByJobPosition,
        filteredJobPositionsNodesAndEdges,
      };
    }

    case directoryAction.setFilterByStoreLocation: {
      const filterByStoreLocation = action.payload;
      // const filterByDepartment = state.filterByDepartment;
      const filterByJobPosition = state.filterByJobPosition;

      // filteredDepartmentsNodesAndEdges will always be set when this reducer action is dispatched
      const filteredDepartmentsNodesAndEdges =
        state.filteredDepartmentsNodesAndEdges;

      if (!filteredDepartmentsNodesAndEdges) {
        return state;
      }

      // if filterByStoreLocation is 'All Store Locations' then return filteredDepartmentsNodesAndEdges filtered by filterByJobPosition
      if (filterByStoreLocation === 'All Store Locations') {
        const {
          nodes: filteredDepartmentsNodes,
          edges: filteredDepartmentsEdges,
        } = filteredDepartmentsNodesAndEdges;

        const filteredStoreLocationsNodes = filteredDepartmentsNodes.filter(
          (node) => {
            return filterByJobPosition === 'All Job Positions'
              ? node
              : node.id
                  .toLowerCase()
                  .includes(filterByJobPosition.toLowerCase());
          }
        );

        const filteredStoreLocationsEdges = filteredDepartmentsEdges.filter(
          (edge) => {
            return filterByJobPosition === 'All Job Positions'
              ? edge
              : edge.id
                  .toLowerCase()
                  .includes(filterByJobPosition.toLowerCase());
          }
        );

        const filteredStoreLocationsNodesAndEdges = Object.create(
          null
        ) as FilteredNodesAndEdges;

        Object.defineProperty(filteredStoreLocationsNodesAndEdges, 'nodes', {
          ...PROPERTY_DESCRIPTOR,
          value: filteredStoreLocationsNodes,
        });

        Object.defineProperty(filteredStoreLocationsNodesAndEdges, 'edges', {
          ...PROPERTY_DESCRIPTOR,
          value: filteredStoreLocationsEdges,
        });

        return {
          ...state,
          filterByStoreLocation,
          filteredStoreLocationsNodesAndEdges,
        };
      }

      // if filterByStoreLocation is not 'All Store Locations' then return filteredDepartmentsNodesAndEdges filtered by filterByStoreLocation and filterByJobPosition
      const {
        nodes: filteredDepartmentsNodes,
        edges: filteredDepartmentsEdges,
      } = filteredDepartmentsNodesAndEdges;

      const filteredStoreLocationsNodes = filteredDepartmentsNodes.filter(
        (node) => {
          return filterByJobPosition === 'All Job Positions'
            ? node.id
                .toLowerCase()
                .includes(filterByStoreLocation.toLowerCase())
            : node.id
                .toLowerCase()
                .includes(filterByStoreLocation.toLowerCase()) &&
                node.id
                  .toLowerCase()
                  .includes(filterByJobPosition.toLowerCase());
        }
      );

      const filteredStoreLocationsEdges = filteredDepartmentsEdges.filter(
        (edge) => {
          return filterByJobPosition === 'All Job Positions'
            ? edge.id
                .toLowerCase()
                .includes(filterByStoreLocation.toLowerCase())
            : edge.id
                .toLowerCase()
                .includes(filterByStoreLocation.toLowerCase()) &&
                edge.id
                  .toLowerCase()
                  .includes(filterByJobPosition.toLowerCase());
        }
      );

      const filteredStoreLocationsNodesAndEdges = Object.create(
        null
      ) as FilteredNodesAndEdges;

      Object.defineProperty(filteredStoreLocationsNodesAndEdges, 'nodes', {
        ...PROPERTY_DESCRIPTOR,
        value: filteredStoreLocationsNodes,
      });

      Object.defineProperty(filteredStoreLocationsNodesAndEdges, 'edges', {
        ...PROPERTY_DESCRIPTOR,
        value: filteredStoreLocationsEdges,
      });

      return {
        ...state,
        filterByStoreLocation,
        filteredStoreLocationsNodesAndEdges,
      };
    }

    case directoryAction.triggerSetDepartmentsNodesAndEdges:
      return { ...state, triggerSetDepartmentsNodesAndEdges: action.payload };

    case directoryAction.setDepartmentsNodesAndEdges: {
      const { department, kind, data } = action.payload;

      // cannot deep copy Node using structuredClone (contains DOM elements)
      // state update cascade is orchestrated to ensure that the nodes and edges are built anew every change
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
      };
    case directoryAction.setLayoutedEdges:
      return {
        ...state,
        layoutedEdges: action.payload,
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
    case directoryAction.setDagreRankSep:
      return {
        ...state,
        dagreRankSep: action.payload,
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
