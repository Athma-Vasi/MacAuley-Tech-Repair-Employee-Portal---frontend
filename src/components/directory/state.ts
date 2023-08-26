import {
  Department,
  UserDocument,
  JobPosition,
  StoreLocation,
} from '../../types';
import { groupByField } from '../../utils';
import { DirectoryAction, DirectoryDispatch, DirectoryState } from './types';

const initialDirectoryState: DirectoryState = {
  groupedByDepartment: {} as Record<Department, UserDocument[]>,
  groupedByJobPositon: {} as Record<JobPosition, UserDocument[]>,
  groupedByStoreLocation: {} as Record<StoreLocation, UserDocument[]>,

  layoutDirection: 'LR',

  storeLocationsNodes: [],
  storeLocationsEdges: [],

  executiveManagementNodes: [],
  executiveManagementEdges: [],

  administrativeDepartmentNodes: [],
  administrativeDepartmentEdges: [],

  salesAndMarketingNodes: [],
  salesAndMarketingEdges: [],

  informationTechnologyNodes: [],
  informationTechnologyEdges: [],

  repairTechniciansNodes: [],
  repairTechniciansEdges: [],

  fieldServiceTechniciansNodes: [],
  fieldServiceTechniciansEdges: [],

  logisticsAndInventoryNodes: [],
  logisticsAndInventoryEdges: [],

  customerServiceNodes: [],
  customerServiceEdges: [],

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

  setLayoutDirection: 'setLayoutDirection',

  setStoreLocationsNodes: 'setStoreLocationsNodes',
  setStoreLocationsEdges: 'setStoreLocationsEdges',

  setExecutiveManagementNodes: 'setExecutiveManagementNodes',
  setExecutiveManagementEdges: 'setExecutiveManagementEdges',

  setAdministrativeDepartmentNodes: 'setAdministrativeDepartmentNodes',
  setAdministrativeDepartmentEdges: 'setAdministrativeDepartmentEdges',

  setSalesAndMarketingNodes: 'setSalesAndMarketingNodes',
  setSalesAndMarketingEdges: 'setSalesAndMarketingEdges',

  setInformationTechnologyNodes: 'setInformationTechnologyNodes',
  setInformationTechnologyEdges: 'setInformationTechnologyEdges',

  setRepairTechniciansNodes: 'setRepairTechniciansNodes',
  setRepairTechniciansEdges: 'setRepairTechniciansEdges',

  setFieldServiceTechniciansNodes: 'setFieldServiceTechniciansNodes',
  setFieldServiceTechniciansEdges: 'setFieldServiceTechniciansEdges',

  setLogisticsAndInventoryNodes: 'setLogisticsAndInventoryNodes',
  setLogisticsAndInventoryEdges: 'setLogisticsAndInventoryEdges',

  setCustomerServiceNodes: 'setCustomerServiceNodes',
  setCustomerServiceEdges: 'setCustomerServiceEdges',

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
      const groupedByDepartment = groupByField<UserDocument>({
        objectArray: users,
        field: 'department',
      });

      return { ...state, groupedByDepartment };
    }

    case directoryAction.setGroupedByJobPositon: {
      const users = action.payload;
      const groupedByJobPositon = groupByField<UserDocument>({
        objectArray: users,
        field: 'jobPosition',
      });

      return { ...state, groupedByJobPositon };
    }

    case directoryAction.setGroupedByStoreLocation: {
      const users = action.payload;
      const groupedByStoreLocation = groupByField<UserDocument>({
        objectArray: users,
        field: 'storeLocation',
      });

      return { ...state, groupedByStoreLocation };
    }

    case directoryAction.setLayoutDirection:
      return { ...state, layoutDirection: action.payload };

    case directoryAction.setStoreLocationsNodes:
      return { ...state, storeLocationsNodes: action.payload };

    case directoryAction.setStoreLocationsEdges:
      return { ...state, storeLocationsEdges: action.payload };

    case directoryAction.setExecutiveManagementNodes:
      return { ...state, executiveManagementNodes: action.payload };

    case directoryAction.setExecutiveManagementEdges:
      return { ...state, executiveManagementEdges: action.payload };

    case directoryAction.setAdministrativeDepartmentNodes:
      return { ...state, administrativeDepartmentNodes: action.payload };

    case directoryAction.setAdministrativeDepartmentEdges:
      return { ...state, administrativeDepartmentEdges: action.payload };

    case directoryAction.setSalesAndMarketingNodes:
      return { ...state, salesAndMarketingNodes: action.payload };

    case directoryAction.setSalesAndMarketingEdges:
      return { ...state, salesAndMarketingEdges: action.payload };

    case directoryAction.setInformationTechnologyNodes:
      return { ...state, informationTechnologyNodes: action.payload };

    case directoryAction.setInformationTechnologyEdges:
      return { ...state, informationTechnologyEdges: action.payload };

    case directoryAction.setRepairTechniciansNodes:
      return { ...state, repairTechniciansNodes: action.payload };

    case directoryAction.setRepairTechniciansEdges:
      return { ...state, repairTechniciansEdges: action.payload };

    case directoryAction.setFieldServiceTechniciansNodes:
      return { ...state, fieldServiceTechniciansNodes: action.payload };

    case directoryAction.setFieldServiceTechniciansEdges:
      return { ...state, fieldServiceTechniciansEdges: action.payload };

    case directoryAction.setLogisticsAndInventoryNodes:
      return { ...state, logisticsAndInventoryNodes: action.payload };

    case directoryAction.setLogisticsAndInventoryEdges:
      return { ...state, logisticsAndInventoryEdges: action.payload };

    case directoryAction.setCustomerServiceNodes:
      return { ...state, customerServiceNodes: action.payload };

    case directoryAction.setCustomerServiceEdges:
      return { ...state, customerServiceEdges: action.payload };

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
