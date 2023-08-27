import { Edge, Node } from 'reactflow';

import {
  Department,
  JobPosition,
  ResourceRequestServerResponse,
  StoreLocation,
  UserDocument,
} from '../../types';

type DirectoryUserDocument = Omit<
  UserDocument,
  | 'password'
  | '__v'
  | 'dateOfBirth'
  | 'address'
  | 'contactNumber'
  | 'emergencyContact'
  | 'startDate'
  | 'completedSurveys'
  | 'email'
>;

type FetchUsersDirectoryResponse = ResourceRequestServerResponse<UserDocument>;

type FlowNodesLayoutDirection = 'LR' | 'TB' | 'RL' | 'BT';

type NodeDefaults = Record<Department, Node>;

type DepartmentsNodesAndEdges = Record<
  Department | 'Store Locations',
  { nodes: Node[]; edges: Edge[] }
>;

type DirectoryState = {
  groupedByDepartment: Record<Department, DirectoryUserDocument[]>;
  groupedByJobPositon: Record<JobPosition, DirectoryUserDocument[]>;
  groupedByStoreLocation: Record<StoreLocation, DirectoryUserDocument[]>;

  filterByDepartment: Department | 'All Departments';
  filterByJobPosition: JobPosition | 'All Job Positions';
  filterByStoreLocation: StoreLocation | 'All Store Locations';

  layoutDirection: FlowNodesLayoutDirection;

  triggerSetDepartmentsNodesAndEdges: boolean;
  departmentsNodesAndEdges: DepartmentsNodesAndEdges;

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

  setLayoutDirection: 'setLayoutDirection';

  setTriggerSetDepartmentsNodesAndEdges: 'setTriggerSetDepartmentsNodesAndEdges';
  setDepartmentsNodesAndEdges: 'setDepartmentsNodesAndEdges';

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
  | { department: Department | 'Store Locations'; kind: 'nodes'; data: Node[] }
  | { department: Department | 'Store Locations'; kind: 'edges'; data: Edge[] };

type DirectoryDispatch =
  | {
      type: DirectoryAction['setDepartmentsNodesAndEdges'];
      payload: SetDepartmentNodesAndEdgesPayload;
    }
  | {
      type: DirectoryAction['setFilterByDepartment'];
      payload: Department | 'All Departments';
    }
  | {
      type: DirectoryAction['setFilterByJobPosition'];
      payload: JobPosition | 'All Job Positions';
    }
  | {
      type: DirectoryAction['setFilterByStoreLocation'];
      payload: StoreLocation | 'All Store Locations';
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
  DirectoryDispatch,
  DirectoryState,
  DirectoryUserDocument,
  FetchUsersDirectoryResponse,
  FlowNodesLayoutDirection,
};
