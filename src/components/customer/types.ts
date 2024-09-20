import type {
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

type CustomerState = {
  username: string;
  isUsernameExists: boolean;
  password: string;
  confirmPassword: string;
  email: string;
  isEmailExists: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  preferredPronouns: PreferredPronouns;
  profilePictureUrl: string;
  dateOfBirth: string;
  contactNumber: PhoneNumber | string;
  addressLine: string;
  city: string;
  province: Province;
  state: StatesUS;
  postalCode: PostalCode;
  country: Country;
  isPrefersReducedMotion: boolean;
  // billing
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  isBillingAddressSameAsShippingAddress: boolean;
  billingAddressLine: string;
  billingCity: string;
  billingProvince: Province;
  billingState: StatesUS;
  billingPostalCode: PostalCode;
  billingCountry: Country;

  triggerFormSubmit: boolean;
  pagesInError: Set<number>;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
};

export type {
  Address,
  CustomerDocument,
  CustomerSchema,
  CustomerState,
  PaymentInformation,
};
