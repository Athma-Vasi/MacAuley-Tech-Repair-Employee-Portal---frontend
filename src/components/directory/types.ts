import { Edge, Node } from 'reactflow';

import {
  Country,
  Department,
  JobPosition,
  PreferredPronouns,
  Province,
  ResourceRequestServerResponse,
  StatesUS,
  StoreLocation,
  UserDocument,
} from '../../types';

type DirectoryUserDocument = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  preferredPronouns: PreferredPronouns;
  profilePictureUrl: string;

  address: {
    city: string;
    province?: Province;
    state?: StatesUS;
    country: Country;
  };

  jobPosition: JobPosition;
  department: Department;
  storeLocation?: StoreLocation;
  startDate: string;
  active: boolean;
};

type DagreRankDir = 'TB' | 'BT' | 'LR' | 'RL';
type DagreRankAlign = 'UL' | 'UR' | 'DL' | 'DR' | 'undefined';
type DagreRankerAlgorithm = 'network-simplex' | 'tight-tree' | 'longest-path';
type DagreLabelPos = 'l' | 'c' | 'r';

type FetchUsersDirectoryResponse =
  ResourceRequestServerResponse<DirectoryUserDocument>;

type DepartmentsWithDefaultKey = Department | 'All Departments';
type JobPositionsWithDefaultKey = JobPosition | 'All Job Positions';
type StoreLocationsWithDefaultKey = StoreLocation | 'All Store Locations';

type DepartmentsNodesAndEdges = Record<
  DepartmentsWithDefaultKey,
  { nodes: Node[]; edges: Edge[] }
>;
type FilteredDepartmentNodesAndEdges = Partial<DepartmentsNodesAndEdges>;

type DirectoryState = {
  groupedByDepartment: Record<
    DepartmentsWithDefaultKey,
    DirectoryUserDocument[]
  >;
  groupedByJobPositon: Record<
    JobPositionsWithDefaultKey,
    DirectoryUserDocument[]
  >;
  groupedByStoreLocation: Record<
    StoreLocationsWithDefaultKey,
    DirectoryUserDocument[]
  >;

  filterByDepartment: DepartmentsWithDefaultKey;
  filterByJobPosition: JobPositionsWithDefaultKey;
  filterByStoreLocation: StoreLocationsWithDefaultKey;
  filteredDepartmentsNodesAndEdges: FilteredDepartmentNodesAndEdges;

  triggerSetDepartmentsNodesAndEdges: boolean;
  departmentsNodesAndEdges: DepartmentsNodesAndEdges;

  layoutedNodes: Node[];
  layoutedEdges: Edge[];
  triggerSetLayoutedNodesAndEdges: boolean;

  // dagre layout options
  dagreRankDir: DagreRankDir;
  dagreRankAlign: DagreRankAlign;
  dagreNodeSep: number; // default 50
  dagreRankSep: number; // default 50
  dagreRanker: DagreRankerAlgorithm; // default 'network-simplex'
  dagreMinLen: number; // minimum edge length default: 1
  dagreWeight: number; // default: 1

  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  loadingMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessfull: boolean;
  successMessage: string;
};

type DirectoryAction = {
  setGroupedByDepartment: 'setGroupedByDepartment';
  setGroupedByJobPositon: 'setGroupedByJobPositon';
  setGroupedByStoreLocation: 'setGroupedByStoreLocation';

  setFilterByDepartment: 'setFilterByDepartment';
  setFilterByJobPosition: 'setFilterByJobPosition';
  setFilterByStoreLocation: 'setFilterByStoreLocation';
  setFilteredDepartmentsNodesAndEdges: 'setFilteredDepartmentsNodesAndEdges';

  triggerSetDepartmentsNodesAndEdges: 'triggerSetDepartmentsNodesAndEdges';
  setDepartmentsNodesAndEdges: 'setDepartmentsNodesAndEdges';

  setLayoutedNodes: 'setLayoutedNodes';
  setLayoutedEdges: 'setLayoutedEdges';
  triggerSetLayoutedNodesAndEdges: 'triggerSetLayoutedNodesAndEdges';

  // dagre layout options
  setDagreRankDir: 'setDagreRankDir';
  setDagreRankAlign: 'setDagreRankAlign';
  setDagreNodeSep: 'setDagreNodeSep';
  setDagreRankSep: 'setDagreRankSep';
  setDagreRanker: 'setDagreRanker';
  setDagreMinLen: 'setDagreMinLen';
  setDagreWeight: 'setDagreWeight';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessfull: 'setIsSuccessfull';
  setSuccessMessage: 'setSuccessMessage';
};

type SetDepartmentNodesAndEdgesPayload =
  | { department: DepartmentsWithDefaultKey; kind: 'nodes'; data: Node[] }
  | { department: DepartmentsWithDefaultKey; kind: 'edges'; data: Edge[] };

type SetFilteredDepartmentsNodesAndEdgesPayload =
  SetDepartmentNodesAndEdgesPayload;

type DirectoryDispatch =
  | {
      type: DirectoryAction['setDepartmentsNodesAndEdges'];
      payload: SetDepartmentNodesAndEdgesPayload;
    }
  | {
      type: DirectoryAction['setFilteredDepartmentsNodesAndEdges'];
      payload: SetFilteredDepartmentsNodesAndEdgesPayload;
    }
  | {
      type: DirectoryAction['setFilterByDepartment'];
      payload: DepartmentsWithDefaultKey;
    }
  | {
      type: DirectoryAction['setFilterByJobPosition'];
      payload: JobPositionsWithDefaultKey;
    }
  | {
      type: DirectoryAction['setFilterByStoreLocation'];
      payload: StoreLocationsWithDefaultKey;
    }
  | {
      type:
        | DirectoryAction['setGroupedByDepartment']
        | DirectoryAction['setGroupedByJobPositon']
        | DirectoryAction['setGroupedByStoreLocation'];

      payload: DirectoryUserDocument[];
    }
  | {
      type:
        | DirectoryAction['triggerSetDepartmentsNodesAndEdges']
        | DirectoryAction['triggerSetLayoutedNodesAndEdges']
        | DirectoryAction['setIsError']
        | DirectoryAction['setIsLoading']
        | DirectoryAction['setIsSubmitting']
        | DirectoryAction['setIsSuccessfull'];

      payload: boolean;
    }
  | {
      type:
        | DirectoryAction['setErrorMessage']
        | DirectoryAction['setLoadingMessage']
        | DirectoryAction['setSubmitMessage']
        | DirectoryAction['setSuccessMessage'];

      payload: string;
    }
  // dagre layout options
  | {
      type: DirectoryAction['setLayoutedNodes'];
      payload: Node[];
    }
  | {
      type: DirectoryAction['setLayoutedEdges'];
      payload: Edge[];
    }
  | {
      type: DirectoryAction['setDagreRankDir'];
      payload: DagreRankDir;
    }
  | {
      type: DirectoryAction['setDagreRankAlign'];
      payload: DagreRankAlign;
    }
  | {
      type: DirectoryAction['setDagreRanker'];
      payload: DagreRankerAlgorithm;
    }
  | {
      type:
        | DirectoryAction['setDagreNodeSep']
        | DirectoryAction['setDagreRankSep']
        | DirectoryAction['setDagreMinLen']
        | DirectoryAction['setDagreWeight'];

      payload: number;
    };

type RemoteDepartmentsProfileNodesObject = Record<JobPosition, Node>;

type StoreDepartmentsProfileNodesObject = Record<
  StoreLocation,
  Record<JobPosition, Node>
>;

export type {
  DagreLabelPos,
  DagreRankAlign,
  DagreRankDir,
  DagreRankerAlgorithm,
  DepartmentsNodesAndEdges,
  DepartmentsWithDefaultKey,
  DirectoryAction,
  DirectoryDispatch,
  DirectoryState,
  DirectoryUserDocument,
  FetchUsersDirectoryResponse,
  FilteredDepartmentNodesAndEdges,
  JobPositionsWithDefaultKey,
  RemoteDepartmentsProfileNodesObject,
  SetDepartmentNodesAndEdgesPayload,
  StoreDepartmentsProfileNodesObject,
  StoreLocationsWithDefaultKey,
};
