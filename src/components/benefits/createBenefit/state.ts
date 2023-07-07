import type {
  BenefitsPlanKind,
  CreateBenefitAction,
  CreateBenefitDispatch,
  CreateBenefitState,
  Currency,
} from './types';

const initialCreateBenefitState: CreateBenefitState = {
  planName: '',
  isValidPlanName: false,
  isPlanNameFocused: false,

  planDescription: '',
  isValidPlanDescription: false,
  isPlanDescriptionFocused: false,

  planKind: '',

  planStartDate: '',
  isValidPlanStartDate: false,
  isPlanStartDateFocused: false,

  isPlanActive: false,
  currency: 'CAD',

  employerContribution: '0',
  isValidEmployerContribution: false,
  isEmployerContributionFocused: false,

  employeeContribution: '0',
  isValidEmployeeContribution: false,
  isEmployeeContributionFocused: false,
};

const createBenefitAction: CreateBenefitAction = {
  setPlanName: 'setPlanName',
  setIsValidPlanName: 'setIsValidPlanName',
  setIsPlanNameFocused: 'setIsPlanNameFocused',

  setPlanDescription: 'setPlanDescription',
  setIsValidPlanDescription: 'setIsValidPlanDescription',
  setIsPlanDescriptionFocused: 'setIsPlanDescriptionFocused',

  setPlanStartDate: 'setPlanStartDate',
  setIsValidPlanStartDate: 'setIsValidPlanStartDate',
  setIsPlanStartDateFocused: 'setIsPlanStartDateFocused',

  setPlanKind: 'setPlanKind',
  setIsPlanActive: 'setIsPlanActive',
  setCurrency: 'setCurrency',

  setEmployerContribution: 'setEmployerContribution',
  setIsValidEmployerContribution: 'setIsValidEmployerContribution',
  setIsEmployerContributionFocused: 'setIsEmployerContributionFocused',

  setEmployeeContribution: 'setEmployeeContribution',
  setIsValidEmployeeContribution: 'setIsValidEmployeeContribution',
  setIsEmployeeContributionFocused: 'setIsEmployeeContributionFocused',
};

function createBenefitReducer(
  state: CreateBenefitState,
  action: CreateBenefitDispatch
): CreateBenefitState {
  switch (action.type) {
    case createBenefitAction.setPlanName:
      return {
        ...state,
        planName: action.payload as string,
      };
    case createBenefitAction.setIsValidPlanName:
      return {
        ...state,
        isValidPlanName: action.payload as boolean,
      };
    case createBenefitAction.setIsPlanNameFocused:
      return {
        ...state,
        isPlanNameFocused: action.payload as boolean,
      };

    case createBenefitAction.setPlanDescription:
      return {
        ...state,
        planDescription: action.payload as string,
      };
    case createBenefitAction.setIsValidPlanDescription:
      return {
        ...state,
        isValidPlanDescription: action.payload as boolean,
      };
    case createBenefitAction.setIsPlanDescriptionFocused:
      return {
        ...state,
        isPlanDescriptionFocused: action.payload as boolean,
      };

    case createBenefitAction.setPlanStartDate:
      return {
        ...state,
        planStartDate: action.payload as string,
      };
    case createBenefitAction.setIsValidPlanStartDate:
      return {
        ...state,

        isValidPlanStartDate: action.payload as boolean,
      };
    case createBenefitAction.setIsPlanStartDateFocused:
      return {
        ...state,
        isPlanStartDateFocused: action.payload as boolean,
      };

    case createBenefitAction.setPlanKind:
      return {
        ...state,
        planKind: action.payload as BenefitsPlanKind,
      };
    case createBenefitAction.setIsPlanActive:
      return {
        ...state,
        isPlanActive: action.payload as boolean,
      };
    case createBenefitAction.setCurrency:
      return {
        ...state,
        currency: action.payload as Currency,
      };

    case createBenefitAction.setEmployerContribution:
      return {
        ...state,
        employerContribution: action.payload as string,
      };
    case createBenefitAction.setIsValidEmployerContribution:
      return {
        ...state,
        isValidEmployerContribution: action.payload as boolean,
      };
    case createBenefitAction.setIsEmployerContributionFocused:
      return {
        ...state,
        isEmployerContributionFocused: action.payload as boolean,
      };

    case createBenefitAction.setEmployeeContribution:
      return {
        ...state,
        employeeContribution: action.payload as string,
      };
    case createBenefitAction.setIsValidEmployeeContribution:
      return {
        ...state,
        isValidEmployeeContribution: action.payload as boolean,
      };
    case createBenefitAction.setIsEmployeeContributionFocused:
      return {
        ...state,
        isEmployeeContributionFocused: action.payload as boolean,
      };

    default:
      return state;
  }
}

export { createBenefitAction, createBenefitReducer,initialCreateBenefitState };
