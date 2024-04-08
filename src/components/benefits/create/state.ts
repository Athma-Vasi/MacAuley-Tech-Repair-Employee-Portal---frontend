import type {
  CreateBenefitAction,
  CreateBenefitDispatch,
  CreateBenefitState,
} from "./types";

const initialCreateBenefitState: CreateBenefitState = {
  benefitUsername: "",
  isValidBenefitUsername: false,
  isBenefitUsernameFocused: false,

  planName: "",
  isValidPlanName: false,
  isPlanNameFocused: false,

  planDescription: "",
  isValidPlanDescription: false,
  isPlanDescriptionFocused: false,

  planKind: "",

  planStartDate: "",
  isValidPlanStartDate: false,
  isPlanStartDateFocused: false,

  isPlanActive: false,
  currency: "CAD",

  employerContribution: "0",
  isValidEmployerContribution: false,
  isEmployerContributionFocused: false,

  employeeContribution: "0",
  isValidEmployeeContribution: false,
  isEmployeeContributionFocused: false,

  triggerFormSubmit: false,
  currentStepperPosition: 0,
  stepsInError: new Set(),

  isSubmitting: false,
  submitMessage: "",
  isSuccessful: false,
  successMessage: "",
  isLoading: false,
  loadingMessage: "",
};

const createBenefitAction: CreateBenefitAction = {
  setBenefitUsername: "setBenefitUsername",
  setIsValidBenefitUsername: "setIsValidBenefitUsername",
  setIsBenefitUsernameFocused: "setIsBenefitUsernameFocused",

  setPlanName: "setPlanName",
  setIsValidPlanName: "setIsValidPlanName",
  setIsPlanNameFocused: "setIsPlanNameFocused",

  setPlanDescription: "setPlanDescription",
  setIsValidPlanDescription: "setIsValidPlanDescription",
  setIsPlanDescriptionFocused: "setIsPlanDescriptionFocused",

  setPlanStartDate: "setPlanStartDate",
  setIsValidPlanStartDate: "setIsValidPlanStartDate",
  setIsPlanStartDateFocused: "setIsPlanStartDateFocused",

  setPlanKind: "setPlanKind",
  setIsPlanActive: "setIsPlanActive",
  setCurrency: "setCurrency",

  setEmployerContribution: "setEmployerContribution",
  setIsValidEmployerContribution: "setIsValidEmployerContribution",
  setIsEmployerContributionFocused: "setIsEmployerContributionFocused",

  setEmployeeContribution: "setEmployeeContribution",
  setIsValidEmployeeContribution: "setIsValidEmployeeContribution",
  setIsEmployeeContributionFocused: "setIsEmployeeContributionFocused",

  setTriggerFormSubmit: "setTriggerFormSubmit",
  setCurrentStepperPosition: "setCurrentStepperPosition",
  setStepsInError: "setStepsInError",

  setIsSubmitting: "setIsSubmitting",
  setSubmitMessage: "setSubmitMessage",
  setIsSuccessful: "setIsSuccessful",
  setSuccessMessage: "setSuccessMessage",
  setIsLoading: "setIsLoading",
  setLoadingMessage: "setLoadingMessage",
};

function createBenefitReducer(
  state: CreateBenefitState,
  action: CreateBenefitDispatch
): CreateBenefitState {
  switch (action.type) {
    case createBenefitAction.setBenefitUsername:
      return {
        ...state,
        benefitUsername: action.payload,
      };
    case createBenefitAction.setIsValidBenefitUsername:
      return {
        ...state,
        isValidBenefitUsername: action.payload,
      };
    case createBenefitAction.setIsBenefitUsernameFocused:
      return {
        ...state,
        isBenefitUsernameFocused: action.payload,
      };

    case createBenefitAction.setPlanName:
      return {
        ...state,
        planName: action.payload,
      };
    case createBenefitAction.setIsValidPlanName:
      return {
        ...state,
        isValidPlanName: action.payload,
      };
    case createBenefitAction.setIsPlanNameFocused:
      return {
        ...state,
        isPlanNameFocused: action.payload,
      };

    case createBenefitAction.setPlanDescription:
      return {
        ...state,
        planDescription: action.payload,
      };
    case createBenefitAction.setIsValidPlanDescription:
      return {
        ...state,
        isValidPlanDescription: action.payload,
      };
    case createBenefitAction.setIsPlanDescriptionFocused:
      return {
        ...state,
        isPlanDescriptionFocused: action.payload,
      };

    case createBenefitAction.setPlanStartDate:
      return {
        ...state,
        planStartDate: action.payload,
      };
    case createBenefitAction.setIsValidPlanStartDate:
      return {
        ...state,
        isValidPlanStartDate: action.payload,
      };
    case createBenefitAction.setIsPlanStartDateFocused:
      return {
        ...state,
        isPlanStartDateFocused: action.payload,
      };

    case createBenefitAction.setPlanKind:
      return {
        ...state,
        planKind: action.payload,
      };
    case createBenefitAction.setIsPlanActive:
      return {
        ...state,
        isPlanActive: action.payload,
      };
    case createBenefitAction.setCurrency:
      return {
        ...state,
        currency: action.payload,
      };

    case createBenefitAction.setEmployerContribution:
      return {
        ...state,
        employerContribution: action.payload,
      };
    case createBenefitAction.setIsValidEmployerContribution:
      return {
        ...state,
        isValidEmployerContribution: action.payload,
      };
    case createBenefitAction.setIsEmployerContributionFocused:
      return {
        ...state,
        isEmployerContributionFocused: action.payload,
      };

    case createBenefitAction.setEmployeeContribution:
      return {
        ...state,
        employeeContribution: action.payload,
      };
    case createBenefitAction.setIsValidEmployeeContribution:
      return {
        ...state,
        isValidEmployeeContribution: action.payload,
      };
    case createBenefitAction.setIsEmployeeContributionFocused:
      return {
        ...state,
        isEmployeeContributionFocused: action.payload,
      };

    case createBenefitAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };
    case createBenefitAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createBenefitAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === "add" ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case createBenefitAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createBenefitAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createBenefitAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createBenefitAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case createBenefitAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case createBenefitAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export { createBenefitAction, createBenefitReducer, initialCreateBenefitState };
