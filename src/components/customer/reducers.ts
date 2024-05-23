import { Country, PostalCode, PreferredPronouns, Province, StatesUS } from "../../types";
import { StepsInErrorPayload } from "../endorsement/create/types";
import { CreateCustomerAction, createCustomerAction } from "./actions";
import { CreateCustomerDispatch } from "./dispatch";
import { CreateCustomerState } from "./types";

// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    REDUCER FUNCTIONS
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// - each reducer function is mapped to an action type
// - type ComponentReducer = (state: ComponentState, dispatch: ComponentDispatch) => ComponentState
// - Map<ComponentAction[keyof ComponentAction], ComponentReducer>
// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

// ╭─────────────────────────────────────────────────────────────────╮
//    USERNAME
// ╰─────────────────────────────────────────────────────────────────╯
function setUsername_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, username: dispatch.payload as string };
}

function setIsUsernameFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isUsernameFocused: dispatch.payload as boolean };
}

function setIsUsernameValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isUsernameValid: dispatch.payload as boolean };
}

function setIsUsernameExists_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isUsernameExists: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PASSWORD
// ╰─────────────────────────────────────────────────────────────────╯
function setPassword_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, password: dispatch.payload as string };
}

function setIsPasswordFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isPasswordFocused: dispatch.payload as boolean };
}

function setIsPasswordValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isPasswordValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CONFIRM PASSWORD
// ╰─────────────────────────────────────────────────────────────────╯
function setConfirmPassword_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, confirmPassword: dispatch.payload as string };
}

function setIsConfirmPasswordFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isConfirmPasswordFocused: dispatch.payload as boolean };
}

function setIsConfirmPasswordValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isConfirmPasswordValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    EMAIL
// ╰─────────────────────────────────────────────────────────────────╯
function setEmail_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, email: dispatch.payload as string };
}

function setIsEmailFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isEmailFocused: dispatch.payload as boolean };
}

function setIsEmailValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isEmailValid: dispatch.payload as boolean };
}

function setIsEmailExists_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isEmailExists: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    FIRST NAME
// ╰─────────────────────────────────────────────────────────────────╯
function setFirstName_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, firstName: dispatch.payload as string };
}

function setIsFirstNameFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isFirstNameFocused: dispatch.payload as boolean };
}

function setIsFirstNameValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isFirstNameValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    MIDDLE NAME
// ╰─────────────────────────────────────────────────────────────────╯
function setMiddleName_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, middleName: dispatch.payload as string };
}

function setIsMiddleNameFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isMiddleNameFocused: dispatch.payload as boolean };
}

function setIsMiddleNameValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isMiddleNameValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    LAST NAME
// ╰─────────────────────────────────────────────────────────────────╯
function setLastName_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, lastName: dispatch.payload as string };
}

function setIsLastNameFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isLastNameFocused: dispatch.payload as boolean };
}

function setIsLastNameValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isLastNameValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PREFERRED NAME
// ╰─────────────────────────────────────────────────────────────────╯
function setPreferredName_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, preferredName: dispatch.payload as string };
}

function setIsPreferredNameFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isPreferredNameFocused: dispatch.payload as boolean };
}

function setIsPreferredNameValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isPreferredNameValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PREFERRED PRONOUNS
// ╰─────────────────────────────────────────────────────────────────╯
function setPreferredPronouns_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, preferredPronouns: dispatch.payload as PreferredPronouns };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PROFILE PICTURE URL
// ╰─────────────────────────────────────────────────────────────────╯
function setProfilePictureUrl_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, profilePictureUrl: dispatch.payload as string };
}

function setIsProfilePictureUrlFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isProfilePictureUrlFocused: dispatch.payload as boolean };
}

function setIsProfilePictureUrlValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isProfilePictureUrlValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    DATE OF BIRTH
// ╰─────────────────────────────────────────────────────────────────╯
function setDateOfBirth_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, dateOfBirth: dispatch.payload as string };
}

function setIsDateOfBirthFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isDateOfBirthFocused: dispatch.payload as boolean };
}

function setIsDateOfBirthValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isDateOfBirthValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CONTACT NUMBER
// ╰─────────────────────────────────────────────────────────────────╯
function setContactNumber_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, contactNumber: dispatch.payload as string };
}

function setIsContactNumberFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isContactNumberFocused: dispatch.payload as boolean };
}

function setIsContactNumberValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isContactNumberValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    ADDRESS LINE
// ╰─────────────────────────────────────────────────────────────────╯
function setAddressLine_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, addressLine: dispatch.payload as string };
}

function setIsAddressLineFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isAddressLineFocused: dispatch.payload as boolean };
}

function setIsAddressLineValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isAddressLineValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CITY
// ╰─────────────────────────────────────────────────────────────────╯
function setCity_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, city: dispatch.payload as string };
}

function setIsCityFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isCityFocused: dispatch.payload as boolean };
}

function setIsCityValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isCityValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PROVINCE
// ╰─────────────────────────────────────────────────────────────────╯
function setProvince_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, province: dispatch.payload as Province };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    STATE
// ╰─────────────────────────────────────────────────────────────────╯
function setState_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, state: dispatch.payload as StatesUS };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    POSTAL CODE
// ╰─────────────────────────────────────────────────────────────────╯
function setPostalCode_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, postalCode: dispatch.payload as PostalCode };
}

function setIsPostalCodeFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isPostalCodeFocused: dispatch.payload as boolean };
}

function setIsPostalCodeValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isPostalCodeValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    COUNTRY
// ╰─────────────────────────────────────────────────────────────────╯
function setCountry_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, country: dispatch.payload as Country };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CARDHOLDER NAME
// ╰─────────────────────────────────────────────────────────────────╯
function setCardholderName_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, cardholderName: dispatch.payload as string };
}

function setIsCardholderNameFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isCardholderNameFocused: dispatch.payload as boolean };
}

function setIsCardholderNameValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isCardholderNameValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CARD NUMBER
// ╰─────────────────────────────────────────────────────────────────╯
function setCardNumber_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, cardNumber: dispatch.payload as string };
}

function setIsCardNumberFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isCardNumberFocused: dispatch.payload as boolean };
}

function setIsCardNumberValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isCardNumberValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    EXPIRATION DATE
// ╰─────────────────────────────────────────────────────────────────╯
function setExpirationDate_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, expirationDate: dispatch.payload as string };
}

function setIsExpirationDateFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isExpirationDateFocused: dispatch.payload as boolean };
}

function setIsExpirationDateValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isExpirationDateValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CVV
// ╰─────────────────────────────────────────────────────────────────╯
function setCvv_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, cvv: dispatch.payload as string };
}

function setIsCvvFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isCvvFocused: dispatch.payload as boolean };
}

function setIsCvvValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isCvvValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    BILLING ADDRESS SAME AS SHIPPING ADDRESS
// ╰─────────────────────────────────────────────────────────────────╯
function setIsBillingAddressSameAsShippingAddress_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isBillingAddressSameAsShippingAddress: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    BILLING ADDRESS LINE
// ╰─────────────────────────────────────────────────────────────────╯
function setBillingAddressLine_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, billingAddressLine: dispatch.payload as string };
}

function setIsBillingAddressLineFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isBillingAddressLineFocused: dispatch.payload as boolean };
}

function setIsBillingAddressLineValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isBillingAddressLineValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    BILLING CITY
// ╰─────────────────────────────────────────────────────────────────╯
function setBillingCity_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, billingCity: dispatch.payload as string };
}

function setIsBillingCityFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isBillingCityFocused: dispatch.payload as boolean };
}

function setIsBillingCityValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isBillingCityValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    BILLING PROVINCE
// ╰─────────────────────────────────────────────────────────────────╯
function setBillingProvince_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, billingProvince: dispatch.payload as Province };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    BILLING STATE
// ╰─────────────────────────────────────────────────────────────────╯
function setBillingState_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, billingState: dispatch.payload as StatesUS };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    BILLING POSTAL CODE
// ╰─────────────────────────────────────────────────────────────────╯
function setBillingPostalCode_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, billingPostalCode: dispatch.payload as PostalCode };
}

function setIsBillingPostalCodeFocused_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isBillingPostalCodeFocused: dispatch.payload as boolean };
}

function setIsBillingPostalCodeValid_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isBillingPostalCodeValid: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    BILLING COUNTRY
// ╰─────────────────────────────────────────────────────────────────╯
function setBillingCountry_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, billingCountry: dispatch.payload as Country };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    PREFERS REDUCED MOTION
// ╰─────────────────────────────────────────────────────────────────╯
function setIsPrefersReducedMotion_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isPrefersReducedMotion: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    TRIGGER FORM SUBMIT
// ╰─────────────────────────────────────────────────────────────────╯
function setTriggerFormSubmit_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, triggerFormSubmit: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    CURRENT STEPPER POSITION
// ╰─────────────────────────────────────────────────────────────────╯
function setCurrentStepperPosition_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, currentStepperPosition: dispatch.payload as number };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    STEPS IN ERROR
// ╰─────────────────────────────────────────────────────────────────╯
function setStepsInError_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  const { kind, step } = dispatch.payload as StepsInErrorPayload;
  const stepsInError = new Set(state.stepsInError);
  kind === "add" ? stepsInError.add(step) : stepsInError.delete(step);

  return {
    ...state,
    stepsInError,
  };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    IS SUBMITTING
// ╰─────────────────────────────────────────────────────────────────╯
function setIsSubmitting_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isSubmitting: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SUBMIT MESSAGE
// ╰─────────────────────────────────────────────────────────────────╯
function setSubmitMessage_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, submitMessage: dispatch.payload as string };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    IS SUCCESSFUL
// ╰─────────────────────────────────────────────────────────────────╯
function setIsSuccessful_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, isSuccessful: dispatch.payload as boolean };
}

// ╭─────────────────────────────────────────────────────────────────╮
//    SUCCESS MESSAGE
// ╰─────────────────────────────────────────────────────────────────╯
function setSuccessMessage_CreateCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  return { ...state, successMessage: dispatch.payload as string };
}

// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    REDUCERS MAP
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

const createCustomerReducersMap = new Map<
  CreateCustomerAction[keyof CreateCustomerAction],
  (state: CreateCustomerState, action: CreateCustomerDispatch) => CreateCustomerState
>([
  // ╭─────────────────────────────────────────────────────────────────╮
  //    USERNAME
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setUsername, setUsername_CreateCustomerReducer],
  [createCustomerAction.setIsUsernameFocused, setIsUsernameFocused_CreateCustomerReducer],
  [createCustomerAction.setIsUsernameValid, setIsUsernameValid_CreateCustomerReducer],
  [createCustomerAction.setIsUsernameExists, setIsUsernameExists_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PASSWORD
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setPassword, setPassword_CreateCustomerReducer],
  [createCustomerAction.setIsPasswordFocused, setIsPasswordFocused_CreateCustomerReducer],
  [createCustomerAction.setIsPasswordValid, setIsPasswordValid_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CONFIRM PASSWORD
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setConfirmPassword, setConfirmPassword_CreateCustomerReducer],
  [
    createCustomerAction.setIsConfirmPasswordFocused,
    setIsConfirmPasswordFocused_CreateCustomerReducer,
  ],
  [
    createCustomerAction.setIsConfirmPasswordValid,
    setIsConfirmPasswordValid_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    EMAIL
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setEmail, setEmail_CreateCustomerReducer],
  [createCustomerAction.setIsEmailFocused, setIsEmailFocused_CreateCustomerReducer],
  [createCustomerAction.setIsEmailValid, setIsEmailValid_CreateCustomerReducer],
  [createCustomerAction.setIsEmailExists, setIsEmailExists_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    FIRST NAME
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setFirstName, setFirstName_CreateCustomerReducer],
  [
    createCustomerAction.setIsFirstNameFocused,
    setIsFirstNameFocused_CreateCustomerReducer,
  ],
  [createCustomerAction.setIsFirstNameValid, setIsFirstNameValid_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MIDDLE NAME
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setMiddleName, setMiddleName_CreateCustomerReducer],
  [
    createCustomerAction.setIsMiddleNameFocused,
    setIsMiddleNameFocused_CreateCustomerReducer,
  ],
  [createCustomerAction.setIsMiddleNameValid, setIsMiddleNameValid_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    LAST NAME
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setLastName, setLastName_CreateCustomerReducer],
  [createCustomerAction.setIsLastNameFocused, setIsLastNameFocused_CreateCustomerReducer],
  [createCustomerAction.setIsLastNameValid, setIsLastNameValid_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PREFERRED NAME
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setPreferredName, setPreferredName_CreateCustomerReducer],
  [
    createCustomerAction.setIsPreferredNameFocused,
    setIsPreferredNameFocused_CreateCustomerReducer,
  ],
  [
    createCustomerAction.setIsPreferredNameValid,
    setIsPreferredNameValid_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PREFERRED PRONOUNS
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setPreferredPronouns, setPreferredPronouns_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PROFILE PICTURE URL
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setProfilePictureUrl, setProfilePictureUrl_CreateCustomerReducer],
  [
    createCustomerAction.setIsProfilePictureUrlFocused,
    setIsProfilePictureUrlFocused_CreateCustomerReducer,
  ],
  [
    createCustomerAction.setIsProfilePictureUrlValid,
    setIsProfilePictureUrlValid_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DATE OF BIRTH
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setDateOfBirth, setDateOfBirth_CreateCustomerReducer],
  [
    createCustomerAction.setIsDateOfBirthFocused,
    setIsDateOfBirthFocused_CreateCustomerReducer,
  ],
  [
    createCustomerAction.setIsDateOfBirthValid,
    setIsDateOfBirthValid_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CONTACT NUMBER
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setContactNumber, setContactNumber_CreateCustomerReducer],
  [
    createCustomerAction.setIsContactNumberFocused,
    setIsContactNumberFocused_CreateCustomerReducer,
  ],
  [
    createCustomerAction.setIsContactNumberValid,
    setIsContactNumberValid_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADDRESS LINE
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setAddressLine, setAddressLine_CreateCustomerReducer],
  [
    createCustomerAction.setIsAddressLineFocused,
    setIsAddressLineFocused_CreateCustomerReducer,
  ],
  [
    createCustomerAction.setIsAddressLineValid,
    setIsAddressLineValid_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CITY
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setCity, setCity_CreateCustomerReducer],
  [createCustomerAction.setIsCityFocused, setIsCityFocused_CreateCustomerReducer],
  [createCustomerAction.setIsCityValid, setIsCityValid_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PROVINCE
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setProvince, setProvince_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STATE
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setState, setState_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    POSTAL CODE
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setPostalCode, setPostalCode_CreateCustomerReducer],
  [
    createCustomerAction.setIsPostalCodeFocused,
    setIsPostalCodeFocused_CreateCustomerReducer,
  ],
  [createCustomerAction.setIsPostalCodeValid, setIsPostalCodeValid_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COUNTRY
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setCountry, setCountry_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CARDHOLDER NAME
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setCardholderName, setCardholderName_CreateCustomerReducer],
  [
    createCustomerAction.setIsCardholderNameFocused,
    setIsCardholderNameFocused_CreateCustomerReducer,
  ],
  [
    createCustomerAction.setIsCardholderNameValid,
    setIsCardholderNameValid_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CARD NUMBER
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setCardNumber, setCardNumber_CreateCustomerReducer],
  [
    createCustomerAction.setIsCardNumberFocused,
    setIsCardNumberFocused_CreateCustomerReducer,
  ],
  [createCustomerAction.setIsCardNumberValid, setIsCardNumberValid_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    EXPIRATION DATE
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setExpirationDate, setExpirationDate_CreateCustomerReducer],
  [
    createCustomerAction.setIsExpirationDateFocused,
    setIsExpirationDateFocused_CreateCustomerReducer,
  ],
  [
    createCustomerAction.setIsExpirationDateValid,
    setIsExpirationDateValid_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CVV
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setCvv, setCvv_CreateCustomerReducer],
  [createCustomerAction.setIsCvvFocused, setIsCvvFocused_CreateCustomerReducer],
  [createCustomerAction.setIsCvvValid, setIsCvvValid_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    BILLING ADDRESS SAME AS SHIPPING ADDRESS
  // ╰─────────────────────────────────────────────────────────────────╯
  [
    createCustomerAction.setIsBillingAddressSameAsShippingAddress,
    setIsBillingAddressSameAsShippingAddress_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    BILLING ADDRESS LINE
  // ╰─────────────────────────────────────────────────────────────────╯
  [
    createCustomerAction.setBillingAddressLine,
    setBillingAddressLine_CreateCustomerReducer,
  ],
  [
    createCustomerAction.setIsBillingAddressLineFocused,
    setIsBillingAddressLineFocused_CreateCustomerReducer,
  ],
  [
    createCustomerAction.setIsBillingAddressLineValid,
    setIsBillingAddressLineValid_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    BILLING CITY
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setBillingCity, setBillingCity_CreateCustomerReducer],
  [
    createCustomerAction.setIsBillingCityFocused,
    setIsBillingCityFocused_CreateCustomerReducer,
  ],
  [
    createCustomerAction.setIsBillingCityValid,
    setIsBillingCityValid_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    BILLING PROVINCE
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setBillingProvince, setBillingProvince_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    BILLING STATE
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setBillingState, setBillingState_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    BILLING POSTAL CODE
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setBillingPostalCode, setBillingPostalCode_CreateCustomerReducer],
  [
    createCustomerAction.setIsBillingPostalCodeFocused,
    setIsBillingPostalCodeFocused_CreateCustomerReducer,
  ],
  [
    createCustomerAction.setIsBillingPostalCodeValid,
    setIsBillingPostalCodeValid_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    BILLING COUNTRY
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setBillingCountry, setBillingCountry_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PREFERS REDUCED MOTION
  // ╰─────────────────────────────────────────────────────────────────╯
  [
    createCustomerAction.setIsPrefersReducedMotion,
    setIsPrefersReducedMotion_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TRIGGER FORM SUBMIT
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setTriggerFormSubmit, setTriggerFormSubmit_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CURRENT STEPPER POSITION
  // ╰─────────────────────────────────────────────────────────────────╯
  [
    createCustomerAction.setCurrentStepperPosition,
    setCurrentStepperPosition_CreateCustomerReducer,
  ],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STEPS IN ERROR
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setStepsInError, setStepsInError_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    IS SUBMITTING
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setIsSubmitting, setIsSubmitting_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SUBMIT MESSAGE
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setSubmitMessage, setSubmitMessage_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    IS SUCCESSFUL
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setIsSuccessful, setIsSuccessful_CreateCustomerReducer],

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SUCCESS MESSAGE
  // ╰─────────────────────────────────────────────────────────────────╯
  [createCustomerAction.setSuccessMessage, setSuccessMessage_CreateCustomerReducer],
]);

function createCustomerReducer(
  state: CreateCustomerState,
  dispatch: CreateCustomerDispatch
): CreateCustomerState {
  const reducer = createCustomerReducersMap.get(dispatch.type);
  return reducer ? reducer(state, dispatch) : state;
}

export {
  createCustomerReducer,
  createCustomerReducersMap,
  setAddressLine_CreateCustomerReducer,
  setBillingAddressLine_CreateCustomerReducer,
  setBillingCity_CreateCustomerReducer,
  setBillingCountry_CreateCustomerReducer,
  setBillingPostalCode_CreateCustomerReducer,
  setBillingProvince_CreateCustomerReducer,
  setBillingState_CreateCustomerReducer,
  setCardholderName_CreateCustomerReducer,
  setCardNumber_CreateCustomerReducer,
  setCity_CreateCustomerReducer,
  setConfirmPassword_CreateCustomerReducer,
  setContactNumber_CreateCustomerReducer,
  setCountry_CreateCustomerReducer,
  setCurrentStepperPosition_CreateCustomerReducer,
  setCvv_CreateCustomerReducer,
  setDateOfBirth_CreateCustomerReducer,
  setEmail_CreateCustomerReducer,
  setExpirationDate_CreateCustomerReducer,
  setFirstName_CreateCustomerReducer,
  setIsAddressLineFocused_CreateCustomerReducer,
  setIsAddressLineValid_CreateCustomerReducer,
  setIsBillingAddressLineFocused_CreateCustomerReducer,
  setIsBillingAddressLineValid_CreateCustomerReducer,
  setIsBillingAddressSameAsShippingAddress_CreateCustomerReducer,
  setIsBillingCityFocused_CreateCustomerReducer,
  setIsBillingCityValid_CreateCustomerReducer,
  setIsBillingPostalCodeFocused_CreateCustomerReducer,
  setIsBillingPostalCodeValid_CreateCustomerReducer,
  setIsCardholderNameFocused_CreateCustomerReducer,
  setIsCardholderNameValid_CreateCustomerReducer,
  setIsCardNumberFocused_CreateCustomerReducer,
  setIsCardNumberValid_CreateCustomerReducer,
  setIsCityFocused_CreateCustomerReducer,
  setIsCityValid_CreateCustomerReducer,
  setIsConfirmPasswordFocused_CreateCustomerReducer,
  setIsConfirmPasswordValid_CreateCustomerReducer,
  setIsContactNumberFocused_CreateCustomerReducer,
  setIsContactNumberValid_CreateCustomerReducer,
  setIsCvvFocused_CreateCustomerReducer,
  setIsCvvValid_CreateCustomerReducer,
  setIsDateOfBirthFocused_CreateCustomerReducer,
  setIsDateOfBirthValid_CreateCustomerReducer,
  setIsEmailFocused_CreateCustomerReducer,
  setIsEmailValid_CreateCustomerReducer,
  setIsExpirationDateFocused_CreateCustomerReducer,
  setIsExpirationDateValid_CreateCustomerReducer,
  setIsFirstNameFocused_CreateCustomerReducer,
  setIsFirstNameValid_CreateCustomerReducer,
  setIsLastNameFocused_CreateCustomerReducer,
  setIsLastNameValid_CreateCustomerReducer,
  setIsMiddleNameFocused_CreateCustomerReducer,
  setIsMiddleNameValid_CreateCustomerReducer,
  setIsPasswordFocused_CreateCustomerReducer,
  setIsPasswordValid_CreateCustomerReducer,
  setIsPostalCodeFocused_CreateCustomerReducer,
  setIsPostalCodeValid_CreateCustomerReducer,
  setIsPreferredNameFocused_CreateCustomerReducer,
  setIsPreferredNameValid_CreateCustomerReducer,
  setIsPrefersReducedMotion_CreateCustomerReducer,
  setIsProfilePictureUrlFocused_CreateCustomerReducer,
  setIsProfilePictureUrlValid_CreateCustomerReducer,
  setIsSubmitting_CreateCustomerReducer,
  setIsSuccessful_CreateCustomerReducer,
  setIsUsernameFocused_CreateCustomerReducer,
  setIsUsernameValid_CreateCustomerReducer,
  setLastName_CreateCustomerReducer,
  setMiddleName_CreateCustomerReducer,
  setPassword_CreateCustomerReducer,
  setPostalCode_CreateCustomerReducer,
  setPreferredName_CreateCustomerReducer,
  setPreferredPronouns_CreateCustomerReducer,
  setProfilePictureUrl_CreateCustomerReducer,
  setProvince_CreateCustomerReducer,
  setState_CreateCustomerReducer,
  setStepsInError_CreateCustomerReducer,
  setSubmitMessage_CreateCustomerReducer,
  setSuccessMessage_CreateCustomerReducer,
  setTriggerFormSubmit_CreateCustomerReducer,
  setUsername_CreateCustomerReducer,
};
