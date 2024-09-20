import type { CustomerState } from "./types";

const initialCustomerState: CustomerState = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    preferredName: "",
    preferredPronouns: "Prefer not to say",
    profilePictureUrl: "",
    dateOfBirth: "",
    contactNumber: "",

    addressLine: "",
    city: "",
    province: "Alberta",
    state: "Alabama",
    postalCode: "",
    country: "Canada",

    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddressLine: "",
    billingCity: "",
    billingProvince: "Alberta",
    billingState: "Alabama",
    billingPostalCode: "",
    billingCountry: "Canada",
    isBillingAddressSameAsShippingAddress: true,

    isPrefersReducedMotion: false,
    isUsernameExists: false,
    isEmailExists: false,

    triggerFormSubmit: false,
    pagesInError: new Set<number>(),
    isSubmitting: false,
    submitMessage: "",
    isSuccessful: false,
    successMessage: "",
};

export { initialCustomerState };
