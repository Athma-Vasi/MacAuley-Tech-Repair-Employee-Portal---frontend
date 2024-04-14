import { PROPERTY_DESCRIPTOR } from "../../../constants/data";
import { Country, Province, StatesUS } from "../../../types";
import {
  CreateRepairTicketAction,
  CreateRepairTicketDispatch,
  CreateRepairTicketState,
  CustomerSearchOperator,
} from "./types";

const initialCreateRepairTicketState: CreateRepairTicketState = {
  // customer information
  customerId: "",
  currentSearchObject: {},
  customerSearchResults: [],
  searchOperator: "OR",
  clearSearchInputs: false,
  currentSearchResultPage: 1,

  username: "",
  isValidUsername: false,
  isUsernameFocused: false,

  email: "",
  isValidEmail: false,
  isEmailFocused: false,

  firstName: "",
  isValidFirstName: false,
  isFirstNameFocused: false,

  middleName: "",
  isValidMiddleName: false,
  isMiddleNameFocused: false,

  lastName: "",
  isValidLastName: false,
  isLastNameFocused: false,

  preferredName: "",
  isValidPreferredName: false,
  isPreferredNameFocused: false,

  contactNumber: "+(1)",
  isValidContactNumber: false,
  isContactNumberFocused: false,

  addressLine: "",
  isValidAddressLine: false,
  isAddressLineFocused: false,

  city: "",
  isValidCity: false,
  isCityFocused: false,

  province: "Alberta",
  state: "Alabama",
  country: "Canada",

  postalCode: "",
  isValidPostalCode: false,
  isPostalCodeFocused: false,

  // part information
  partName: "",
  isValidPartName: false,
  isPartNameFocused: false,

  partSerialId: "",
  isValidPartSerialId: false,
  isPartSerialIdFocused: false,

  dateReceived: "",
  isValidDateReceived: false,
  isDateReceivedFocused: false,

  descriptionOfIssue: "",
  isValidDescriptionOfIssue: false,
  isDescriptionOfIssueFocused: false,

  initialInspectionNotes: "",
  isValidInitialInspectionNotes: false,
  isInitialInspectionNotesFocused: false,

  // repair information
  repairCategory: "Accessory",
  requiredRepairs: [],
  partsNeeded: [],
  partsNeededModels: "",
  isValidPartsNeededModels: false,
  isPartsNeededModelsFocused: false,

  partUnderWarranty: false,
  estimatedRepairCost: "",
  isValidEstimatedRepairCost: false,
  estimatedRepairCostCurrency: "CAD",
  isEstimatedRepairCostFocused: false,

  estimatedCompletionDate: "",
  isValidEstimatedCompletionDate: false,
  isEstimatedCompletionDateFocused: false,

  repairPriority: "low",

  // rest of the information is updated by the repair technician after the initial repair note is created

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

const createRepairTicketAction: CreateRepairTicketAction = {
  // customer information
  setCustomerId: "setCustomerId",
  setCurrentSearchObject: "setCurrentSearchObject",
  setCustomerSearchResults: "setCustomerSearchResults",
  setSearchOperator: "setSearchOperator",
  clearSearchInputs: "clearSearchInputs",
  setCurrentSearchResultPage: "setCurrentSearchResultPage",

  setUsername: "setUsername",
  setIsValidUsername: "setIsValidUsername",
  setIsUsernameFocused: "setIsUsernameFocused",

  setEmail: "setEmail",
  setIsValidEmail: "setIsValidEmail",
  setIsEmailFocused: "setIsEmailFocused",

  setFirstName: "setFirstName",
  setIsValidFirstName: "setIsValidFirstName",
  setIsFirstNameFocused: "setIsFirstNameFocused",

  setMiddleName: "setMiddleName",
  setIsValidMiddleName: "setIsValidMiddleName",
  setIsMiddleNameFocused: "setIsMiddleNameFocused",

  setLastName: "setLastName",
  setIsValidLastName: "setIsValidLastName",
  setIsLastNameFocused: "setIsLastNameFocused",

  setPreferredName: "setPreferredName",
  setIsValidPreferredName: "setIsValidPreferredName",
  setIsPreferredNameFocused: "setIsPreferredNameFocused",

  setContactNumber: "setContactNumber",
  setIsValidContactNumber: "setIsValidContactNumber",
  setIsContactNumberFocused: "setIsContactNumberFocused",

  setAddressLine: "setAddressLine",
  setIsValidAddressLine: "setIsValidAddressLine",
  setIsAddressLineFocused: "setIsAddressLineFocused",

  setCity: "setCity",
  setIsValidCity: "setIsValidCity",
  setIsCityFocused: "setIsCityFocused",

  setProvince: "setProvince",
  setState: "setState",
  setCountry: "setCountry",

  setPostalCode: "setPostalCode",
  setIsValidPostalCode: "setIsValidPostalCode",
  setIsPostalCodeFocused: "setIsPostalCodeFocused",

  // part information
  setPartName: "setPartName",
  setIsValidPartName: "setIsValidPartName",
  setIsPartNameFocused: "setIsPartNameFocused",

  setPartSerialId: "setPartSerialId",
  setIsValidPartSerialId: "setIsValidPartSerialId",
  setIsPartSerialIdFocused: "setIsPartSerialIdFocused",

  setDateReceived: "setDateReceived",
  setIsValidDateReceived: "setIsValidDateReceived",
  setIsDateReceivedFocused: "setIsDateReceivedFocused",

  setDescriptionOfIssue: "setDescriptionOfIssue",
  setIsValidDescriptionOfIssue: "setIsValidDescriptionOfIssue",
  setIsDescriptionOfIssueFocused: "setIsDescriptionOfIssueFocused",

  setInitialInspectionNotes: "setInitialInspectionNotes",
  setIsValidInitialInspectionNotes: "setIsValidInitialInspectionNotes",
  setIsInitialInspectionNotesFocused: "setIsInitialInspectionNotesFocused",

  // repair information
  setRepairCategory: "setRepairCategory",
  setRequiredRepairs: "setRequiredRepairs",
  setPartsNeeded: "setPartsNeeded",
  setPartsNeededModels: "setPartsNeededModels",
  setIsValidPartsNeededModels: "setIsValidPartsNeededModels",
  setIsPartsNeededModelsFocused: "setIsPartsNeededModelsFocused",

  setPartUnderWarranty: "setPartUnderWarranty",
  setEstimatedRepairCost: "setEstimatedRepairCost",
  setIsValidEstimatedRepairCost: "setIsValidEstimatedRepairCost",
  setIsEstimatedRepairCostFocused: "setIsEstimatedRepairCostFocused",

  setEstimatedRepairCostCurrency: "setEstimatedRepairCostCurrency",
  setEstimatedCompletionDate: "setEstimatedCompletionDate",
  setIsValidEstimatedCompletionDate: "setIsValidEstimatedCompletionDate",
  setIsEstimatedCompletionDateFocused: "setIsEstimatedCompletionDateFocused",

  setRepairPriority: "setRepairPriority",

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

function createRepairTicketReducer(
  state: CreateRepairTicketState,
  action: CreateRepairTicketDispatch
): CreateRepairTicketState {
  switch (action.type) {
    // customer information
    case createRepairTicketAction.setCustomerId:
      return {
        ...state,
        customerId: action.payload,
      };

    case createRepairTicketAction.setCurrentSearchObject:
      return (
        Object.entries(action.payload).reduce<CreateRepairTicketState>(
          (acc, [key, value]) => {
            Object.defineProperty(acc.currentSearchObject, key, {
              value,
              ...PROPERTY_DESCRIPTOR,
            });

            return acc;
          },
          structuredClone(state)
        ) ?? state
      );

    case createRepairTicketAction.setCustomerSearchResults:
      return {
        ...state,
        customerSearchResults: action.payload,
      };

    case createRepairTicketAction.setSearchOperator:
      return {
        ...state,
        searchOperator: action.payload,
      };

    case createRepairTicketAction.clearSearchInputs: {
      const prevState = structuredClone(state);

      const newState = {
        ...prevState,
        customerId: "",
        currentSearchObject: {},
        customerSearchResults: [],
        searchOperator: "OR" as CustomerSearchOperator,
        clearSearchInputs: false,
        currentSearchResultPage: 1,
        username: "",
        isValidUsername: false,
        isUsernameFocused: false,
        email: "",
        isValidEmail: false,
        isEmailFocused: false,
        firstName: "",
        isValidFirstName: false,
        isFirstNameFocused: false,
        middleName: "",
        isValidMiddleName: false,
        isMiddleNameFocused: false,
        lastName: "",
        isValidLastName: false,
        isLastNameFocused: false,
        preferredName: "",
        isValidPreferredName: false,
        isPreferredNameFocused: false,
        contactNumber: "+(1)",
        isValidContactNumber: false,
        isContactNumberFocused: false,
        addressLine: "",
        isValidAddressLine: false,
        isAddressLineFocused: false,
        city: "",
        isValidCity: false,
        isCityFocused: false,
        province: "Alberta" as Province,
        state: "Alabama" as StatesUS,
        country: "Canada" as Country,
        postalCode: "",
        isValidPostalCode: false,
        isPostalCodeFocused: false,
      };

      return newState;
    }

    case createRepairTicketAction.setCurrentSearchResultPage:
      return {
        ...state,
        currentSearchResultPage: action.payload,
      };

    case createRepairTicketAction.setUsername:
      return {
        ...state,
        username: action.payload,
      };
    case createRepairTicketAction.setIsValidUsername:
      return {
        ...state,
        isValidUsername: action.payload,
      };
    case createRepairTicketAction.setIsUsernameFocused:
      return {
        ...state,
        isUsernameFocused: action.payload,
      };

    case createRepairTicketAction.setEmail:
      return {
        ...state,
        email: action.payload,
      };
    case createRepairTicketAction.setIsValidEmail:
      return {
        ...state,
        isValidEmail: action.payload,
      };
    case createRepairTicketAction.setIsEmailFocused:
      return {
        ...state,
        isEmailFocused: action.payload,
      };

    case createRepairTicketAction.setFirstName:
      return {
        ...state,
        firstName: action.payload,
      };
    case createRepairTicketAction.setIsValidFirstName:
      return {
        ...state,
        isValidFirstName: action.payload,
      };
    case createRepairTicketAction.setIsFirstNameFocused:
      return {
        ...state,
        isFirstNameFocused: action.payload,
      };

    case createRepairTicketAction.setMiddleName:
      return {
        ...state,
        middleName: action.payload,
      };
    case createRepairTicketAction.setIsValidMiddleName:
      return {
        ...state,
        isValidMiddleName: action.payload,
      };
    case createRepairTicketAction.setIsMiddleNameFocused:
      return {
        ...state,
        isMiddleNameFocused: action.payload,
      };

    case createRepairTicketAction.setLastName:
      return {
        ...state,
        lastName: action.payload,
      };
    case createRepairTicketAction.setIsValidLastName:
      return {
        ...state,
        isValidLastName: action.payload,
      };
    case createRepairTicketAction.setIsLastNameFocused:
      return {
        ...state,
        isLastNameFocused: action.payload,
      };

    case createRepairTicketAction.setPreferredName:
      return {
        ...state,
        preferredName: action.payload,
      };
    case createRepairTicketAction.setIsValidPreferredName:
      return {
        ...state,
        isValidPreferredName: action.payload,
      };
    case createRepairTicketAction.setIsPreferredNameFocused:
      return {
        ...state,
        isPreferredNameFocused: action.payload,
      };

    case createRepairTicketAction.setContactNumber:
      return {
        ...state,
        contactNumber: action.payload,
      };
    case createRepairTicketAction.setIsValidContactNumber:
      return {
        ...state,
        isValidContactNumber: action.payload,
      };
    case createRepairTicketAction.setIsContactNumberFocused:
      return {
        ...state,
        isContactNumberFocused: action.payload,
      };

    case createRepairTicketAction.setAddressLine:
      return {
        ...state,
        addressLine: action.payload,
      };
    case createRepairTicketAction.setIsValidAddressLine:
      return {
        ...state,
        isValidAddressLine: action.payload,
      };
    case createRepairTicketAction.setIsAddressLineFocused:
      return {
        ...state,
        isAddressLineFocused: action.payload,
      };

    case createRepairTicketAction.setCity:
      return {
        ...state,
        city: action.payload,
      };
    case createRepairTicketAction.setIsValidCity:
      return {
        ...state,
        isValidCity: action.payload,
      };
    case createRepairTicketAction.setIsCityFocused:
      return {
        ...state,
        isCityFocused: action.payload,
      };

    case createRepairTicketAction.setProvince:
      return {
        ...state,
        province: action.payload,
      };
    case createRepairTicketAction.setState:
      return {
        ...state,
        state: action.payload,
      };
    case createRepairTicketAction.setCountry:
      return {
        ...state,
        country: action.payload,
      };

    case createRepairTicketAction.setPostalCode:
      return {
        ...state,
        postalCode: action.payload,
      };
    case createRepairTicketAction.setIsValidPostalCode:
      return {
        ...state,
        isValidPostalCode: action.payload,
      };
    case createRepairTicketAction.setIsPostalCodeFocused:
      return {
        ...state,
        isPostalCodeFocused: action.payload,
      };

    // part information
    case createRepairTicketAction.setPartName:
      return {
        ...state,
        partName: action.payload,
      };
    case createRepairTicketAction.setIsValidPartName:
      return {
        ...state,
        isValidPartName: action.payload,
      };
    case createRepairTicketAction.setIsPartNameFocused:
      return {
        ...state,
        isPartNameFocused: action.payload,
      };

    case createRepairTicketAction.setPartSerialId:
      return {
        ...state,
        partSerialId: action.payload,
      };
    case createRepairTicketAction.setIsValidPartSerialId:
      return {
        ...state,
        isValidPartSerialId: action.payload,
      };
    case createRepairTicketAction.setIsPartSerialIdFocused:
      return {
        ...state,
        isPartSerialIdFocused: action.payload,
      };

    case createRepairTicketAction.setDateReceived:
      return {
        ...state,
        dateReceived: action.payload,
      };
    case createRepairTicketAction.setIsValidDateReceived:
      return {
        ...state,
        isValidDateReceived: action.payload,
      };
    case createRepairTicketAction.setIsDateReceivedFocused:
      return {
        ...state,
        isDateReceivedFocused: action.payload,
      };

    case createRepairTicketAction.setDescriptionOfIssue:
      return {
        ...state,
        descriptionOfIssue: action.payload,
      };
    case createRepairTicketAction.setIsValidDescriptionOfIssue:
      return {
        ...state,
        isValidDescriptionOfIssue: action.payload,
      };
    case createRepairTicketAction.setIsDescriptionOfIssueFocused:
      return {
        ...state,
        isDescriptionOfIssueFocused: action.payload,
      };

    case createRepairTicketAction.setInitialInspectionNotes:
      return {
        ...state,
        initialInspectionNotes: action.payload,
      };
    case createRepairTicketAction.setIsValidInitialInspectionNotes:
      return {
        ...state,
        isValidInitialInspectionNotes: action.payload,
      };
    case createRepairTicketAction.setIsInitialInspectionNotesFocused:
      return {
        ...state,
        isInitialInspectionNotesFocused: action.payload,
      };

    // repair information
    case createRepairTicketAction.setRepairCategory:
      return {
        ...state,
        repairCategory: action.payload,
      };
    case createRepairTicketAction.setRequiredRepairs:
      return {
        ...state,
        requiredRepairs: action.payload,
      };
    case createRepairTicketAction.setPartsNeeded:
      return {
        ...state,
        partsNeeded: action.payload,
      };
    case createRepairTicketAction.setPartsNeededModels:
      return {
        ...state,
        partsNeededModels: action.payload,
      };
    case createRepairTicketAction.setIsValidPartsNeededModels:
      return {
        ...state,
        isValidPartsNeededModels: action.payload,
      };
    case createRepairTicketAction.setIsPartsNeededModelsFocused:
      return {
        ...state,
        isPartsNeededModelsFocused: action.payload,
      };

    case createRepairTicketAction.setPartUnderWarranty:
      return {
        ...state,
        partUnderWarranty: action.payload,
      };
    case createRepairTicketAction.setEstimatedRepairCost:
      return {
        ...state,
        estimatedRepairCost: action.payload,
      };
    case createRepairTicketAction.setIsValidEstimatedRepairCost:
      return {
        ...state,
        isValidEstimatedRepairCost: action.payload,
      };
    case createRepairTicketAction.setIsEstimatedRepairCostFocused:
      return {
        ...state,
        isEstimatedRepairCostFocused: action.payload,
      };

    case createRepairTicketAction.setEstimatedRepairCostCurrency:
      return {
        ...state,
        estimatedRepairCostCurrency: action.payload,
      };
    case createRepairTicketAction.setEstimatedCompletionDate:
      return {
        ...state,
        estimatedCompletionDate: action.payload,
      };
    case createRepairTicketAction.setIsValidEstimatedCompletionDate:
      return {
        ...state,
        isValidEstimatedCompletionDate: action.payload,
      };
    case createRepairTicketAction.setIsEstimatedCompletionDateFocused:
      return {
        ...state,
        isEstimatedCompletionDateFocused: action.payload,
      };

    case createRepairTicketAction.setRepairPriority:
      return {
        ...state,
        repairPriority: action.payload,
      };

    case createRepairTicketAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };
    case createRepairTicketAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createRepairTicketAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = structuredClone(state.stepsInError);
      kind === "add" ? stepsInError.add(step) : stepsInError.delete(step);

      return { ...state, stepsInError };
    }

    case createRepairTicketAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createRepairTicketAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createRepairTicketAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createRepairTicketAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case createRepairTicketAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case createRepairTicketAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    default:
      return state;
  }
}

export {
  createRepairTicketAction,
  createRepairTicketReducer,
  initialCreateRepairTicketState,
};
