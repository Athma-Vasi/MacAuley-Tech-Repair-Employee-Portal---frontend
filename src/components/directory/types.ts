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

type FetchUsersDirectoryResponse =
  ResourceRequestServerResponse<DirectoryUserDocument>;

type FlowNodesLayoutDirection = 'LR' | 'TB' | 'RL' | 'BT';

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

  layoutDirection: FlowNodesLayoutDirection;

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

  setTriggerSetDepartmentsNodesAndEdges: 'setTriggerSetDepartmentsNodesAndEdges';
  setDepartmentsNodesAndEdges: 'setDepartmentsNodesAndEdges';

  setLayoutDirection: 'setLayoutDirection';

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
      type: DirectoryAction['setLayoutDirection'];
      payload: FlowNodesLayoutDirection;
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
        | DirectoryAction['setTriggerSetDepartmentsNodesAndEdges']
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
    };

export type {
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
  FlowNodesLayoutDirection,
  SetDepartmentNodesAndEdgesPayload,
};
