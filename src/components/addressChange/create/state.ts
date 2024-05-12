import type {
  AddressChangeAction,
  AddressChangeDispatch,
  AddressChangeState,
} from "./types";

const initialAddressChangeState: AddressChangeState = {
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
  isAcknowledged: false,

  triggerFormSubmit: false,
  currentStepperPosition: 0,
  stepsInError: new Set<number>(),

  isSubmitting: false,
  submitMessage: "",
  isSuccessful: false,
  successMessage: "",
  isLoading: false,
  loadingMessage: "",
};

const addressChangeAction: AddressChangeAction = {
  setContactNumber: "setContactNumber",
  setIsValidContactNumber: "setIsValidContactNumber",
  setIsContactNumberFocused: "setIsContactNumberFocused",

  setAddressLine: "setAddressLine",
  setIsAddressLineFocused: "setIsAddressLineFocused",
  setIsValidAddressLine: "setIsValidAddressLine",

  setCity: "setCity",
  setIsValidCity: "setIsValidCity",
  setIsCityFocused: "setIsCityFocused",

  setProvince: "setProvince",
  setState: "setState",
  setCountry: "setCountry",

  setPostalCode: "setPostalCode",
  setIsValidPostalCode: "setIsValidPostalCode",
  setIsPostalCodeFocused: "setIsPostalCodeFocused",
  setIsAcknowledged: "setIsAcknowledged",

  setTriggerFormSubmit: "setTriggerFormSubmit",
  setCurrentStepperPosition: "setCurrentStepperPosition",
  setStepsInError: "setStepsInError",

  setIsSubmitting: "setIsSubmitting",
  setSubmitMessage: "setSubmitMessage",
  setIsSuccessful: "setIsSuccessful",
  setSuccessMessage: "setSuccessMessage",
  setIsLoading: "setIsLoading",
  setLoadingMessage: "setLoadingMessage",

  setAll: "setAll",
};

function addressChangeReducer(
  state: AddressChangeState,
  action: AddressChangeDispatch
): AddressChangeState {
  switch (action.type) {
    case addressChangeAction.setContactNumber:
      return {
        ...state,
        contactNumber: action.payload,
      };
    case addressChangeAction.setIsValidContactNumber:
      return {
        ...state,
        isValidContactNumber: action.payload,
      };
    case addressChangeAction.setIsContactNumberFocused:
      return {
        ...state,
        isContactNumberFocused: action.payload,
      };

    case addressChangeAction.setAddressLine:
      return {
        ...state,
        addressLine: action.payload,
      };
    case addressChangeAction.setIsValidAddressLine:
      return {
        ...state,
        isValidAddressLine: action.payload,
      };
    case addressChangeAction.setIsAddressLineFocused:
      return {
        ...state,
        isAddressLineFocused: action.payload,
      };

    case addressChangeAction.setCity:
      return {
        ...state,
        city: action.payload,
      };
    case addressChangeAction.setIsValidCity:
      return {
        ...state,
        isValidCity: action.payload,
      };
    case addressChangeAction.setIsCityFocused:
      return {
        ...state,
        isCityFocused: action.payload,
      };

    case addressChangeAction.setProvince:
      return {
        ...state,
        province: action.payload,
      };
    case addressChangeAction.setState:
      return {
        ...state,
        state: action.payload,
      };
    case addressChangeAction.setCountry:
      return {
        ...state,
        country: action.payload,
      };

    case addressChangeAction.setPostalCode:
      return {
        ...state,
        postalCode: action.payload,
      };
    case addressChangeAction.setIsValidPostalCode:
      return {
        ...state,
        isValidPostalCode: action.payload,
      };
    case addressChangeAction.setIsPostalCodeFocused:
      return {
        ...state,
        isPostalCodeFocused: action.payload,
      };
    case addressChangeAction.setIsAcknowledged:
      return {
        ...state,
        isAcknowledged: action.payload,
      };

    case addressChangeAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };
    case addressChangeAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case addressChangeAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === "add" ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case addressChangeAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case addressChangeAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case addressChangeAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case addressChangeAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case addressChangeAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case addressChangeAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    case addressChangeAction.setAll:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export { addressChangeAction, addressChangeReducer, initialAddressChangeState };
