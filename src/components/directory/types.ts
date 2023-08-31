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
type DagreRankAlign = 'UL' | 'UR' | 'DL' | 'DR' | undefined;
type DagreRankerAlgorithm = 'network-simplex' | 'tight-tree' | 'longest-path';
type DagreLabelPos = 'l' | 'c' | 'r';

type FetchUsersDirectoryResponse =
  ResourceRequestServerResponse<DirectoryUserDocument>;

type DirectoryDepartments = Department;
type DirectoryJobPositions = JobPosition;
type DirectoryStoreLocations = StoreLocation;

type DepartmentsNodesAndEdges = Record<
  DirectoryDepartments,
  { nodes: Node[]; edges: Edge[] }
>;
type FilteredDepartmentNodesAndEdges = Partial<DepartmentsNodesAndEdges>;

type DirectoryState = {
  groupedByDepartment: Record<DirectoryDepartments, DirectoryUserDocument[]>;
  groupedByJobPositon: Record<DirectoryJobPositions, DirectoryUserDocument[]>;
  groupedByStoreLocation: Record<
    DirectoryStoreLocations,
    DirectoryUserDocument[]
  >;

  filterByDepartment: DirectoryDepartments[];
  filterByJobPosition: DirectoryJobPositions[];
  filterByStoreLocation: DirectoryStoreLocations[];
  filteredDepartmentsNodesAndEdges: FilteredDepartmentNodesAndEdges;

  triggerSetDepartmentsNodesAndEdges: boolean;
  departmentsNodesAndEdges: DepartmentsNodesAndEdges;

  layoutedNodes: Node[];
  layoutedEdges: Edge[];
  triggerSetLayoutedNodesAndEdges: boolean;

  // dagre layout options
  dagreRankDir: DagreRankDir;
  dagreRankAlign?: DagreRankAlign;
  dagreNodeSep: number; // default 50
  dagreEdgeSep: number; // default 10
  dagreRankSep: number; // default 50
  dagreMarginX: number; // default 0
  dagreMarginY: number; // default 0
  dagreRanker: DagreRankerAlgorithm; // default 'network-simplex'
  dagreMinLen: number; // minimum edge length default: 1
  dagreWeight: number; // default: 1
  dagreLabelPos: DagreLabelPos; // default: 'r'
  dagreLabelOffset: number; // default: 10

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
  setDagreEdgeSep: 'setDagreEdgeSep';
  setDagreRankSep: 'setDagreRankSep';
  setDagreMarginX: 'setDagreMarginX';
  setDagreMarginY: 'setDagreMarginY';
  setDagreRanker: 'setDagreRanker';
  setDagreMinLen: 'setDagreMinLen';
  setDagreWeight: 'setDagreWeight';
  setDagreLabelPos: 'setDagreLabelPos';
  setDagreLabelOffset: 'setDagreLabelOffset';

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
  | { department: DirectoryDepartments; kind: 'nodes'; data: Node[] }
  | { department: DirectoryDepartments; kind: 'edges'; data: Edge[] };

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
      payload: DirectoryDepartments[];
    }
  | {
      type: DirectoryAction['setFilterByJobPosition'];
      payload: DirectoryJobPositions[];
    }
  | {
      type: DirectoryAction['setFilterByStoreLocation'];
      payload: DirectoryStoreLocations[];
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
      type: DirectoryAction['setDagreLabelPos'];
      payload: DagreLabelPos;
    }
  | {
      type:
        | DirectoryAction['setDagreNodeSep']
        | DirectoryAction['setDagreEdgeSep']
        | DirectoryAction['setDagreRankSep']
        | DirectoryAction['setDagreMarginX']
        | DirectoryAction['setDagreMarginY']
        | DirectoryAction['setDagreMinLen']
        | DirectoryAction['setDagreWeight']
        | DirectoryAction['setDagreLabelOffset'];

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
  DirectoryAction,
  DirectoryDepartments,
  DirectoryDispatch,
  DirectoryJobPositions,
  DirectoryState,
  DirectoryStoreLocations,
  DirectoryUserDocument,
  FetchUsersDirectoryResponse,
  FilteredDepartmentNodesAndEdges,
  RemoteDepartmentsProfileNodesObject,
  SetDepartmentNodesAndEdgesPayload,
  StoreDepartmentsProfileNodesObject,
};
