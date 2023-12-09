import {
  Country,
  PhoneNumber,
  PostalCode,
  PreferredPronouns,
  Province,
  StatesUS,
} from "../../types";

type PaymentInformation = {
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingAddress: Address;
};

type Address = {
  addressLine: string;
  city: string;
  province?: Province;
  state?: StatesUS;
  postalCode: PostalCode;
  country: Country;
};

type CustomerSchema = {
  username: string;
  password: string;
  email: string;

  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  preferredPronouns: PreferredPronouns;
  profilePictureUrl: string;
  dateOfBirth: string;

  contactNumber: PhoneNumber | string;
  address: Address;
  paymentInformation: PaymentInformation;
  productReviewsIds: string[];
  purchaseHistoryIds: string[];
  rmaHistoryIds: string[];

  isActive: boolean;
  completedSurveys: string[];
  isPrefersReducedMotion: boolean;
};

type CustomerDocument = CustomerSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//    CREATE CUSTOMER FORM STATE
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

type CreateCustomerState = {
  username: string;
  isUsernameFocused: boolean;
  isUsernameValid: boolean;
  isUsernameExists: boolean;

  password: string;
  isPasswordFocused: boolean;
  isPasswordValid: boolean;

  confirmPassword: string;
  isConfirmPasswordFocused: boolean;
  isConfirmPasswordValid: boolean;

  email: string;
  isEmailFocused: boolean;
  isEmailValid: boolean;
  isEmailExists: boolean;

  firstName: string;
  isFirstNameFocused: boolean;
  isFirstNameValid: boolean;

  middleName: string;
  isMiddleNameFocused: boolean;
  isMiddleNameValid: boolean;

  lastName: string;
  isLastNameFocused: boolean;
  isLastNameValid: boolean;

  preferredName: string;
  isPreferredNameFocused: boolean;
  isPreferredNameValid: boolean;

  preferredPronouns: PreferredPronouns;

  profilePictureUrl: string;
  isProfilePictureUrlFocused: boolean;
  isProfilePictureUrlValid: boolean;

  dateOfBirth: string;
  isDateOfBirthFocused: boolean;
  isDateOfBirthValid: boolean;

  contactNumber: PhoneNumber | string;
  isContactNumberFocused: boolean;
  isContactNumberValid: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADDRESS
  // ╰─────────────────────────────────────────────────────────────────╯
  addressLine: string;
  isAddressLineFocused: boolean;
  isAddressLineValid: boolean;

  city: string;
  isCityFocused: boolean;
  isCityValid: boolean;

  province: Province;
  state: StatesUS;

  postalCode: PostalCode;
  isPostalCodeFocused: boolean;
  isPostalCodeValid: boolean;

  country: Country;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PAYMENT INFORMATION
  // ╰─────────────────────────────────────────────────────────────────╯
  cardholderName: string;
  isCardholderNameFocused: boolean;
  isCardholderNameValid: boolean;

  cardNumber: string;
  isCardNumberFocused: boolean;
  isCardNumberValid: boolean;

  expirationDate: string;
  isExpirationDateFocused: boolean;
  isExpirationDateValid: boolean;

  cvv: string;
  isCvvFocused: boolean;
  isCvvValid: boolean;

  isBillingAddressSameAsShippingAddress: boolean;

  billingAddressLine: string;
  isBillingAddressLineFocused: boolean;
  isBillingAddressLineValid: boolean;

  billingCity: string;
  isBillingCityFocused: boolean;
  isBillingCityValid: boolean;

  billingProvince: Province;
  billingState: StatesUS;

  billingPostalCode: PostalCode;
  isBillingPostalCodeFocused: boolean;
  isBillingPostalCodeValid: boolean;

  billingCountry: Country;

  isPrefersReducedMotion: boolean;

  triggerFormSubmit: boolean;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
};

export type {
  Address,
  CreateCustomerState,
  CustomerDocument,
  CustomerSchema,
  PaymentInformation,
};
