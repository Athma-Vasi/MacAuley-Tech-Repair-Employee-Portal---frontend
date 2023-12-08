import { CreateCustomerState } from "./types";

const initialCreateCustomerState: CreateCustomerState = {
  username: "",
  isUsernameFocused: false,
  isUsernameValid: false,

  confirmPassword: "",
  isConfirmPasswordFocused: false,
  isConfirmPasswordValid: false,

  password: "",
  isPasswordFocused: false,
  isPasswordValid: false,

  email: "",
  isEmailFocused: false,
  isEmailValid: false,

  firstName: "",
  isFirstNameFocused: false,
  isFirstNameValid: false,

  middleName: "",
  isMiddleNameFocused: false,
  isMiddleNameValid: false,

  lastName: "",
  isLastNameFocused: false,
  isLastNameValid: false,

  preferredName: "",
  isPreferredNameFocused: false,
  isPreferredNameValid: false,

  preferredPronouns: "Prefer not to say",

  profilePictureUrl: "",
  isProfilePictureUrlFocused: false,
  isProfilePictureUrlValid: false,

  dateOfBirth: "",
  isDateOfBirthFocused: false,
  isDateOfBirthValid: false,

  contactNumber: "+(1)",
  isContactNumberFocused: false,
  isContactNumberValid: false,

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADDRESS
  // ╰─────────────────────────────────────────────────────────────────╯
  addressLine: "",
  isAddressLineFocused: false,
  isAddressLineValid: false,

  city: "",
  isCityFocused: false,
  isCityValid: false,

  province: "Alberta",
  state: "Alabama",

  postalCode: "",
  isPostalCodeFocused: false,
  isPostalCodeValid: false,

  country: "Canada",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PAYMENT INFORMATION
  // ╰─────────────────────────────────────────────────────────────────╯
  cardholderName: "",
  isCardholderNameFocused: false,
  isCardholderNameValid: false,

  cardNumber: "",
  isCardNumberFocused: false,
  isCardNumberValid: false,

  expirationDate: "",
  isExpirationDateFocused: false,
  isExpirationDateValid: false,

  cvv: "",
  isCvvFocused: false,
  isCvvValid: false,

  isBillingAddressSameAsShippingAddress: false,

  billingAddressLine: "",
  isBillingAddressLineFocused: false,
  isBillingAddressLineValid: false,

  billingCity: "",
  isBillingCityFocused: false,
  isBillingCityValid: false,

  billingProvince: "Alberta",
  billingState: "Alabama",

  billingPostalCode: "",
  isBillingPostalCodeFocused: false,
  isBillingPostalCodeValid: false,

  billingCountry: "Canada",

  isPrefersReducedMotion: false,

  triggerFormSubmit: false,
  currentStepperPosition: 0,
  stepsInError: new Set<number>(),

  isSubmitting: false,
  submitMessage: "",
  isSuccessful: false,
  successMessage: "",
};

export { initialCreateCustomerState };
