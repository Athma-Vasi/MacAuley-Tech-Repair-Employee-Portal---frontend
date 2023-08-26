import { Edge, Node } from 'reactflow';

import {
  Department,
  JobPosition,
  ResourceRequestServerResponse,
  StoreLocation,
  UserDocument,
} from '../../types';

type FetchUsersDirectoryResponse = ResourceRequestServerResponse<UserDocument>;

type FlowNodesLayoutDirection = 'LR' | 'TB' | 'RL' | 'BT';
type DirectoryState = {
  groupedByDepartment: Record<Department, UserDocument[]>;
  groupedByJobPositon: Record<JobPosition, UserDocument[]>;
  groupedByStoreLocation: Record<StoreLocation, UserDocument[]>;

  layoutDirection: FlowNodesLayoutDirection;

  storeLocationsNodes: Node[];
  storeLocationsEdges: Edge[];

  executiveManagementNodes: Node[];
  executiveManagementEdges: Edge[];

  administrativeDepartmentNodes: Node[];
  administrativeDepartmentEdges: Edge[];

  salesAndMarketingNodes: Node[];
  salesAndMarketingEdges: Edge[];

  informationTechnologyNodes: Node[];
  informationTechnologyEdges: Edge[];

  repairTechniciansNodes: Node[];
  repairTechniciansEdges: Edge[];

  fieldServiceTechniciansNodes: Node[];
  fieldServiceTechniciansEdges: Edge[];

  logisticsAndInventoryNodes: Node[];
  logisticsAndInventoryEdges: Edge[];

  customerServiceNodes: Node[];
  customerServiceEdges: Edge[];

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

  setLayoutDirection: 'setLayoutDirection';

  setStoreLocationsNodes: 'setStoreLocationsNodes';
  setStoreLocationsEdges: 'setStoreLocationsEdges';

  setExecutiveManagementNodes: 'setExecutiveManagementNodes';
  setExecutiveManagementEdges: 'setExecutiveManagementEdges';

  setAdministrativeDepartmentNodes: 'setAdministrativeDepartmentNodes';
  setAdministrativeDepartmentEdges: 'setAdministrativeDepartmentEdges';

  setSalesAndMarketingNodes: 'setSalesAndMarketingNodes';
  setSalesAndMarketingEdges: 'setSalesAndMarketingEdges';

  setInformationTechnologyNodes: 'setInformationTechnologyNodes';
  setInformationTechnologyEdges: 'setInformationTechnologyEdges';

  setRepairTechniciansNodes: 'setRepairTechniciansNodes';
  setRepairTechniciansEdges: 'setRepairTechniciansEdges';

  setFieldServiceTechniciansNodes: 'setFieldServiceTechniciansNodes';
  setFieldServiceTechniciansEdges: 'setFieldServiceTechniciansEdges';

  setLogisticsAndInventoryNodes: 'setLogisticsAndInventoryNodes';
  setLogisticsAndInventoryEdges: 'setLogisticsAndInventoryEdges';

  setCustomerServiceNodes: 'setCustomerServiceNodes';
  setCustomerServiceEdges: 'setCustomerServiceEdges';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessfull: 'setIsSuccessfull';
  setSuccessMessage: 'setSuccessMessage';
};

type DirectoryDispatch =
  | {
      type:
        | DirectoryAction['setStoreLocationsNodes']
        | DirectoryAction['setExecutiveManagementNodes']
        | DirectoryAction['setAdministrativeDepartmentNodes']
        | DirectoryAction['setSalesAndMarketingNodes']
        | DirectoryAction['setInformationTechnologyNodes']
        | DirectoryAction['setRepairTechniciansNodes']
        | DirectoryAction['setFieldServiceTechniciansNodes']
        | DirectoryAction['setLogisticsAndInventoryNodes']
        | DirectoryAction['setCustomerServiceNodes'];

      payload: Node[];
    }
  | {
      type:
        | DirectoryAction['setStoreLocationsEdges']
        | DirectoryAction['setExecutiveManagementEdges']
        | DirectoryAction['setAdministrativeDepartmentEdges']
        | DirectoryAction['setSalesAndMarketingEdges']
        | DirectoryAction['setInformationTechnologyEdges']
        | DirectoryAction['setRepairTechniciansEdges']
        | DirectoryAction['setFieldServiceTechniciansEdges']
        | DirectoryAction['setLogisticsAndInventoryEdges']
        | DirectoryAction['setCustomerServiceEdges'];

      payload: Edge[];
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

      payload: UserDocument[];
    }
  | {
      type:
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
  DirectoryAction,
  DirectoryDispatch,
  DirectoryState,
  FetchUsersDirectoryResponse,
  FlowNodesLayoutDirection,
};
