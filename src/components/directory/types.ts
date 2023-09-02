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
type DagreLabelPos = 'l' | 'r' | 'c';

type FetchUsersDirectoryResponse =
  ResourceRequestServerResponse<DirectoryUserDocument>;

// default keys needed for select inputs
type DepartmentsWithDefaultKey = Department | 'All Departments';
type JobPositionsWithDefaultKey = JobPosition | 'All Job Positions';
type StoreLocationsWithDefaultKey = StoreLocation | 'All Store Locations';

type DepartmentsNodesAndEdges = Record<
  Department,
  { nodes: Node[]; edges: Edge[] }
>;

type FilteredNodesAndEdges = {
  nodes: Node[];
  edges: Edge[];
};

type DirectoryState = {
  groupedByDepartment: Record<Department, DirectoryUserDocument[]>;
  groupedByJobPositon: Record<JobPosition, DirectoryUserDocument[]>;
  groupedByStoreLocation: Record<StoreLocation, DirectoryUserDocument[]>;

  filterByDepartment: DepartmentsWithDefaultKey;
  filteredDepartmentsNodesAndEdges: FilteredNodesAndEdges | null;
  filterByJobPosition: JobPositionsWithDefaultKey;
  filteredJobPositionsNodesAndEdges: FilteredNodesAndEdges | null;
  filterByStoreLocation: StoreLocationsWithDefaultKey;
  filteredStoreLocationsNodesAndEdges: FilteredNodesAndEdges | null;

  triggerSetDepartmentsNodesAndEdges: boolean;
  departmentsNodesAndEdges: DepartmentsNodesAndEdges;

  layoutedNodes: Node[];
  layoutedEdges: Edge[];
  triggerSetLayoutedNodesAndEdges: boolean;

  // profile picture blobs
  profilePictureBlobs: Map<string, Blob>;

  // dagre layout options
  dagreRankDir: DagreRankDir;
  dagreRankAlign: DagreRankAlign;
  dagreNodeSep: number; // default 50
  dagreRankSep: number; // default 50
  dagreRanker: DagreRankerAlgorithm; // default 'network-simplex'
  dagreMinLen: number; // minimum edge length default: 1

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

  triggerSetDepartmentsNodesAndEdges: 'triggerSetDepartmentsNodesAndEdges';
  setDepartmentsNodesAndEdges: 'setDepartmentsNodesAndEdges';

  setLayoutedNodes: 'setLayoutedNodes';
  setLayoutedEdges: 'setLayoutedEdges';
  triggerSetLayoutedNodesAndEdges: 'triggerSetLayoutedNodesAndEdges';

  setProfilePictureBlobs: 'setProfilePictureBlobs';

  // dagre layout options
  setDagreRankDir: 'setDagreRankDir';
  setDagreRankAlign: 'setDagreRankAlign';
  setDagreNodeSep: 'setDagreNodeSep';
  setDagreRankSep: 'setDagreRankSep';
  setDagreRanker: 'setDagreRanker';
  setDagreMinLen: 'setDagreMinLen';

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
  | { department: Department; kind: 'nodes'; data: Node[] }
  | { department: Department; kind: 'edges'; data: Edge[] };

type SetFilteredDepartmentsNodesAndEdgesPayload =
  SetDepartmentNodesAndEdgesPayload;

type DirectoryDispatch =
  | {
      type: DirectoryAction['setDepartmentsNodesAndEdges'];
      payload: SetDepartmentNodesAndEdgesPayload;
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
  | {
      type: DirectoryAction['setProfilePictureBlobs'];
      payload: { _id: string; blob: Blob }[];
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
        | DirectoryAction['setDagreMinLen'];

      payload: number;
    };

type CorporateDepartmentsProfileNodesObject = Record<JobPosition, Node>;

type StoreDepartmentsProfileNodesObject = Record<
  StoreLocation,
  Record<JobPosition, Node>
>;

export type {
  CorporateDepartmentsProfileNodesObject,
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
  FilteredNodesAndEdges,
  JobPositionsWithDefaultKey,
  SetDepartmentNodesAndEdgesPayload,
  StoreDepartmentsProfileNodesObject,
  StoreLocationsWithDefaultKey,
};
