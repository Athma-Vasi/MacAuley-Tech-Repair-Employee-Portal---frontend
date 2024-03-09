import { PROPERTY_DESCRIPTOR } from "../../constants/data";
import { groupByField } from "../../utils";
import {
  DepartmentsNodesAndEdges,
  DepartmentsWithDefaultKey,
  DirectoryAction,
  DirectoryDispatch,
  DirectoryState,
  DirectoryUserDocument,
  FilteredNodesAndEdges,
} from "./types";

const initialDirectoryState: DirectoryState = {
  groupedByDepartment: {} as Record<DepartmentsWithDefaultKey, DirectoryUserDocument[]>,

  filterByDepartment: "Executive Management",
  filteredDepartmentsNodesAndEdges: null,
  filterByJobPosition: "All Job Positions",
  filteredJobPositionsNodesAndEdges: null,
  filterByStoreLocation: "All Store Locations",
  filteredStoreLocationsNodesAndEdges: null,

  triggerSetDepartmentsNodesAndEdges: false,
  departmentsNodesAndEdges: {} as DepartmentsNodesAndEdges,

  layoutedNodes: [],
  layoutedEdges: [],
  triggerSetLayoutedNodesAndEdges: false,

  // dagre layout options
  dagreRankDir: "TB",
  dagreRankAlign: "undefined",
  dagreNodeSep: 50, // default 50
  dagreRankSep: 50, // default 50
  dagreRanker: "network-simplex", // default 'network-simplex'
  dagreMinLen: 1, // minimum edge length default: 1

  isLoading: false,
  loadingMessage: "",
};

const directoryAction: DirectoryAction = {
  setGroupedByDepartment: "setGroupedByDepartment",

  setFilterByDepartment: "setFilterByDepartment",
  setFilterByJobPosition: "setFilterByJobPosition",
  setFilterByStoreLocation: "setFilterByStoreLocation",

  triggerSetDepartmentsNodesAndEdges: "triggerSetDepartmentsNodesAndEdges",
  setDepartmentsNodesAndEdges: "setDepartmentsNodesAndEdges",

  setLayoutedNodes: "setLayoutedNodes",
  setLayoutedEdges: "setLayoutedEdges",
  triggerSetLayoutedNodesAndEdges: "triggerSetLayoutedNodesAndEdges",

  // dagre layout options
  setDagreRankDir: "setDagreRankDir",
  setDagreRankAlign: "setDagreRankAlign",
  setDagreNodeSep: "setDagreNodeSep",
  setDagreRankSep: "setDagreRankSep",
  setDagreRanker: "setDagreRanker",
  setDagreMinLen: "setDagreMinLen",

  setIsLoading: "setIsLoading",
  setLoadingMessage: "setLoadingMessage",
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
        field: "department",
      });

      // set trigger to true
      const triggerSetDepartmentsNodesAndEdges = true;

      return {
        ...state,
        groupedByDepartment,
        triggerSetDepartmentsNodesAndEdges,
      };
    }

    case directoryAction.setFilterByDepartment: {
      // set filterByDepartment value
      const filterByDepartment = action.payload;

      // and set filteredDepartmentsNodesAndEdges based on said value
      if (filterByDepartment === "All Departments") {
        return {
          ...state,
          filterByDepartment,
          filteredDepartmentsNodesAndEdges: null,
          filterByJobPosition: "All Job Positions",
          filteredJobPositionsNodesAndEdges: null,
          filterByStoreLocation: "All Store Locations",
          filteredStoreLocationsNodesAndEdges: null,
        };
      }

      const nodesAndEdgesObj = state.departmentsNodesAndEdges[filterByDepartment];
      // create a new object and assign nodes and edges
      const filteredDepartmentsNodesAndEdges = Object.entries(nodesAndEdgesObj).reduce(
        (filteredDepartmentNodesAndEdgesAcc: FilteredNodesAndEdges, curr) => {
          const key = curr[0]; // will be 'nodes' or 'edges'
          const value = curr[1]; // will be Node[] | Edge[]

          // to pacify TS compiler as it does not know that key will be either 'nodes' or 'edges'
          Object.defineProperty(filteredDepartmentNodesAndEdgesAcc, key, {
            ...PROPERTY_DESCRIPTOR,
            value,
          });

          return filteredDepartmentNodesAndEdgesAcc;
        },
        Object.create(null)
      );

      return {
        ...state,
        filterByDepartment,
        filteredDepartmentsNodesAndEdges,
        filterByJobPosition: "All Job Positions",
        filteredJobPositionsNodesAndEdges: null,
        filterByStoreLocation: "All Store Locations",
        filteredStoreLocationsNodesAndEdges: null,
      };
    }

    case directoryAction.setFilterByJobPosition: {
      // set filterByJobPosition string value
      const filterByJobPosition = action.payload;
      const filterByStoreLocation = state.filterByStoreLocation;

      // filteredDepartmentNodesAndEdges will always be set when this reducer action is dispatched
      const filteredDepartmentsNodesAndEdges = state.filteredDepartmentsNodesAndEdges;

      if (!filteredDepartmentsNodesAndEdges) {
        return state;
      }

      // if filterByJobPosition is 'All Job Positions' then return filteredDepartmentsNodesAndEdges filtered by filterByStoreLocation
      if (filterByJobPosition === "All Job Positions") {
        const { nodes: filteredDepartmentsNodes, edges: filteredDepartmentsEdges } =
          filteredDepartmentsNodesAndEdges;

        const filteredJobPositionsNodes = filteredDepartmentsNodes.filter((node) => {
          return filterByStoreLocation === "All Store Locations"
            ? node
            : node.id.toLowerCase().includes(filterByStoreLocation.toLowerCase());
        });

        const filteredJobPositionsEdges = filteredDepartmentsEdges.filter((edge) => {
          return filterByStoreLocation === "All Store Locations"
            ? edge
            : edge.id.toLowerCase().includes(filterByStoreLocation.toLowerCase());
        });

        const filteredJobPositionsNodesAndEdges = Object.create(
          null
        ) as FilteredNodesAndEdges;

        filteredJobPositionsNodesAndEdges.nodes = filteredJobPositionsNodes;
        filteredJobPositionsNodesAndEdges.edges = filteredJobPositionsEdges;

        return {
          ...state,
          filterByJobPosition,
          filteredJobPositionsNodesAndEdges,
        };
      }

      // if filterByJobPosition is not 'All Job Positions' then return filteredDepartmentsNodesAndEdges filtered by filterByJobPosition and filterByStoreLocation
      const { nodes: filteredDepartmentsNodes, edges: filteredDepartmentsEdges } =
        filteredDepartmentsNodesAndEdges;

      const filteredJobPositionsNodes = filteredDepartmentsNodes.filter((node) => {
        return filterByStoreLocation === "All Store Locations"
          ? node.id.toLowerCase().includes(filterByJobPosition.toLowerCase())
          : node.id.toLowerCase().includes(filterByJobPosition.toLowerCase()) &&
              node.id.toLowerCase().includes(filterByStoreLocation.toLowerCase());
      });

      const filteredJobPositionsEdges = filteredDepartmentsEdges.filter((edge) => {
        return filterByStoreLocation === "All Store Locations"
          ? edge.id.toLowerCase().includes(filterByJobPosition.toLowerCase())
          : edge.id.toLowerCase().includes(filterByJobPosition.toLowerCase()) &&
              edge.id.toLowerCase().includes(filterByStoreLocation.toLowerCase());
      });

      const filteredJobPositionsNodesAndEdges = Object.create(
        null
      ) as FilteredNodesAndEdges;

      filteredJobPositionsNodesAndEdges.nodes = filteredJobPositionsNodes;
      filteredJobPositionsNodesAndEdges.edges = filteredJobPositionsEdges;

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
      const filteredDepartmentsNodesAndEdges = state.filteredDepartmentsNodesAndEdges;

      if (!filteredDepartmentsNodesAndEdges) {
        return state;
      }

      // if filterByStoreLocation is 'All Store Locations' then return filteredDepartmentsNodesAndEdges filtered by filterByJobPosition
      if (filterByStoreLocation === "All Store Locations") {
        const { nodes: filteredDepartmentsNodes, edges: filteredDepartmentsEdges } =
          filteredDepartmentsNodesAndEdges;

        const filteredStoreLocationsNodes = filteredDepartmentsNodes.filter((node) => {
          return filterByJobPosition === "All Job Positions"
            ? node
            : node.id.toLowerCase().includes(filterByJobPosition.toLowerCase());
        });

        const filteredStoreLocationsEdges = filteredDepartmentsEdges.filter((edge) => {
          return filterByJobPosition === "All Job Positions"
            ? edge
            : edge.id.toLowerCase().includes(filterByJobPosition.toLowerCase());
        });

        const filteredStoreLocationsNodesAndEdges = Object.create(
          null
        ) as FilteredNodesAndEdges;

        filteredStoreLocationsNodesAndEdges.nodes = filteredStoreLocationsNodes;
        filteredStoreLocationsNodesAndEdges.edges = filteredStoreLocationsEdges;

        return {
          ...state,
          filterByStoreLocation,
          filteredStoreLocationsNodesAndEdges,
        };
      }

      // if filterByStoreLocation is not 'All Store Locations' then return filteredDepartmentsNodesAndEdges filtered by filterByStoreLocation and filterByJobPosition
      const { nodes: filteredDepartmentsNodes, edges: filteredDepartmentsEdges } =
        filteredDepartmentsNodesAndEdges;

      const filteredStoreLocationsNodes = filteredDepartmentsNodes.filter((node) => {
        return filterByJobPosition === "All Job Positions"
          ? node.id.toLowerCase().includes(filterByStoreLocation.toLowerCase())
          : node.id.toLowerCase().includes(filterByStoreLocation.toLowerCase()) &&
              node.id.toLowerCase().includes(filterByJobPosition.toLowerCase());
      });

      const filteredStoreLocationsEdges = filteredDepartmentsEdges.filter((edge) => {
        return filterByJobPosition === "All Job Positions"
          ? edge.id.toLowerCase().includes(filterByStoreLocation.toLowerCase())
          : edge.id.toLowerCase().includes(filterByStoreLocation.toLowerCase()) &&
              edge.id.toLowerCase().includes(filterByJobPosition.toLowerCase());
      });

      const filteredStoreLocationsNodesAndEdges = Object.create(
        null
      ) as FilteredNodesAndEdges;

      filteredStoreLocationsNodesAndEdges.nodes = filteredStoreLocationsNodes;
      filteredStoreLocationsNodesAndEdges.edges = filteredStoreLocationsEdges;

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
        case "nodes": {
          departmentsNodesAndEdges[department] = {
            ...departmentsNodesAndEdges[department],
            nodes: data,
          };

          return {
            ...state,
            departmentsNodesAndEdges,
          };
        }
        case "edges": {
          departmentsNodesAndEdges[department] = {
            ...departmentsNodesAndEdges[department],
            edges: data,
          };

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

    case directoryAction.setIsLoading:
      return { ...state, isLoading: action.payload };
    case directoryAction.setLoadingMessage:
      return { ...state, loadingMessage: action.payload };

    default:
      return state;
  }
}

export { directoryAction, directoryReducer, initialDirectoryState };
