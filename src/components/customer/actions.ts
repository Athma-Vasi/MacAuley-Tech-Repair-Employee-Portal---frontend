const createCustomerAction: CreateCustomerAction = {
  setUsername: "setUsername",
  setIsUsernameFocused: "setIsUsernameFocused",
  setIsUsernameValid: "setIsUsernameValid",
  setIsUsernameExists: "setIsUsernameExists",

  setPassword: "setPassword",
  setIsPasswordFocused: "setIsPasswordFocused",
  setIsPasswordValid: "setIsPasswordValid",

  setConfirmPassword: "setConfirmPassword",
  setIsConfirmPasswordFocused: "setIsConfirmPasswordFocused",
  setIsConfirmPasswordValid: "setIsConfirmPasswordValid",

  setEmail: "setEmail",
  setIsEmailFocused: "setIsEmailFocused",
  setIsEmailValid: "setIsEmailValid",
  setIsEmailExists: "setIsEmailExists",

  setFirstName: "setFirstName",
  setIsFirstNameFocused: "setIsFirstNameFocused",
  setIsFirstNameValid: "setIsFirstNameValid",

  setMiddleName: "setMiddleName",
  setIsMiddleNameFocused: "setIsMiddleNameFocused",
  setIsMiddleNameValid: "setIsMiddleNameValid",

  setLastName: "setLastName",
  setIsLastNameFocused: "setIsLastNameFocused",
  setIsLastNameValid: "setIsLastNameValid",

  setPreferredName: "setPreferredName",
  setIsPreferredNameFocused: "setIsPreferredNameFocused",
  setIsPreferredNameValid: "setIsPreferredNameValid",

  setPreferredPronouns: "setPreferredPronouns",

  setProfilePictureUrl: "setProfilePictureUrl",
  setIsProfilePictureUrlFocused: "setIsProfilePictureUrlFocused",
  setIsProfilePictureUrlValid: "setIsProfilePictureUrlValid",

  setDateOfBirth: "setDateOfBirth",
  setIsDateOfBirthFocused: "setIsDateOfBirthFocused",
  setIsDateOfBirthValid: "setIsDateOfBirthValid",

  setContactNumber: "setContactNumber",
  setIsContactNumberFocused: "setIsContactNumberFocused",
  setIsContactNumberValid: "setIsContactNumberValid",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADDRESS
  // ╰─────────────────────────────────────────────────────────────────╯

  setAddressLine: "setAddressLine",
  setIsAddressLineFocused: "setIsAddressLineFocused",
  setIsAddressLineValid: "setIsAddressLineValid",

  setCity: "setCity",
  setIsCityFocused: "setIsCityFocused",
  setIsCityValid: "setIsCityValid",

  setProvince: "setProvince",
  setState: "setState",

  setPostalCode: "setPostalCode",
  setIsPostalCodeFocused: "setIsPostalCodeFocused",
  setIsPostalCodeValid: "setIsPostalCodeValid",

  setCountry: "setCountry",

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PAYMENT INFORMATION
  // ╰─────────────────────────────────────────────────────────────────╯

  setCardholderName: "setCardholderName",
  setIsCardholderNameFocused: "setIsCardholderNameFocused",
  setIsCardholderNameValid: "setIsCardholderNameValid",

  setCardNumber: "setCardNumber",
  setIsCardNumberFocused: "setIsCardNumberFocused",
  setIsCardNumberValid: "setIsCardNumberValid",

  setExpirationDate: "setExpirationDate",
  setIsExpirationDateFocused: "setIsExpirationDateFocused",
  setIsExpirationDateValid: "setIsExpirationDateValid",

  setCvv: "setCvv",
  setIsCvvFocused: "setIsCvvFocused",
  setIsCvvValid: "setIsCvvValid",

  setIsBillingAddressSameAsShippingAddress: "setIsBillingAddressSameAsShippingAddress",

  setBillingAddressLine: "setBillingAddressLine",
  setIsBillingAddressLineFocused: "setIsBillingAddressLineFocused",
  setIsBillingAddressLineValid: "setIsBillingAddressLineValid",

  setBillingCity: "setBillingCity",
  setIsBillingCityFocused: "setIsBillingCityFocused",
  setIsBillingCityValid: "setIsBillingCityValid",

  setBillingProvince: "setBillingProvince",
  setBillingState: "setBillingState",

  setBillingPostalCode: "setBillingPostalCode",
  setIsBillingPostalCodeFocused: "setIsBillingPostalCodeFocused",
  setIsBillingPostalCodeValid: "setIsBillingPostalCodeValid",

  setBillingCountry: "setBillingCountry",

  setIsPrefersReducedMotion: "setIsPrefersReducedMotion",

  setTriggerFormSubmit: "setTriggerFormSubmit",
  setCurrentStepperPosition: "setCurrentStepperPosition",
  setStepsInError: "setStepsInError",

  setIsSubmitting: "setIsSubmitting",
  setSubmitMessage: "setSubmitMessage",
  setIsSuccessful: "setIsSuccessful",
  setSuccessMessage: "setSuccessMessage",
};

type CreateCustomerAction = {
  setUsername: "setUsername";
  setIsUsernameFocused: "setIsUsernameFocused";
  setIsUsernameValid: "setIsUsernameValid";
  setIsUsernameExists: "setIsUsernameExists";

  setPassword: "setPassword";
  setIsPasswordFocused: "setIsPasswordFocused";
  setIsPasswordValid: "setIsPasswordValid";

  setConfirmPassword: "setConfirmPassword";
  setIsConfirmPasswordFocused: "setIsConfirmPasswordFocused";
  setIsConfirmPasswordValid: "setIsConfirmPasswordValid";

  setEmail: "setEmail";
  setIsEmailFocused: "setIsEmailFocused";
  setIsEmailValid: "setIsEmailValid";
  setIsEmailExists: "setIsEmailExists";

  setFirstName: "setFirstName";
  setIsFirstNameFocused: "setIsFirstNameFocused";
  setIsFirstNameValid: "setIsFirstNameValid";

  setMiddleName: "setMiddleName";
  setIsMiddleNameFocused: "setIsMiddleNameFocused";
  setIsMiddleNameValid: "setIsMiddleNameValid";

  setLastName: "setLastName";
  setIsLastNameFocused: "setIsLastNameFocused";
  setIsLastNameValid: "setIsLastNameValid";

  setPreferredName: "setPreferredName";
  setIsPreferredNameFocused: "setIsPreferredNameFocused";
  setIsPreferredNameValid: "setIsPreferredNameValid";

  setPreferredPronouns: "setPreferredPronouns";

  setProfilePictureUrl: "setProfilePictureUrl";
  setIsProfilePictureUrlFocused: "setIsProfilePictureUrlFocused";
  setIsProfilePictureUrlValid: "setIsProfilePictureUrlValid";

  setDateOfBirth: "setDateOfBirth";
  setIsDateOfBirthFocused: "setIsDateOfBirthFocused";
  setIsDateOfBirthValid: "setIsDateOfBirthValid";

  setContactNumber: "setContactNumber";
  setIsContactNumberFocused: "setIsContactNumberFocused";
  setIsContactNumberValid: "setIsContactNumberValid";

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADDRESS
  // ╰─────────────────────────────────────────────────────────────────╯

  setAddressLine: "setAddressLine";
  setIsAddressLineFocused: "setIsAddressLineFocused";
  setIsAddressLineValid: "setIsAddressLineValid";

  setCity: "setCity";
  setIsCityFocused: "setIsCityFocused";
  setIsCityValid: "setIsCityValid";

  setProvince: "setProvince";
  setState: "setState";

  setPostalCode: "setPostalCode";
  setIsPostalCodeFocused: "setIsPostalCodeFocused";
  setIsPostalCodeValid: "setIsPostalCodeValid";

  setCountry: "setCountry";

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PAYMENT INFORMATION
  // ╰─────────────────────────────────────────────────────────────────╯

  setCardholderName: "setCardholderName";
  setIsCardholderNameFocused: "setIsCardholderNameFocused";
  setIsCardholderNameValid: "setIsCardholderNameValid";

  setCardNumber: "setCardNumber";
  setIsCardNumberFocused: "setIsCardNumberFocused";
  setIsCardNumberValid: "setIsCardNumberValid";

  setExpirationDate: "setExpirationDate";
  setIsExpirationDateFocused: "setIsExpirationDateFocused";
  setIsExpirationDateValid: "setIsExpirationDateValid";

  setCvv: "setCvv";
  setIsCvvFocused: "setIsCvvFocused";
  setIsCvvValid: "setIsCvvValid";

  setIsBillingAddressSameAsShippingAddress: "setIsBillingAddressSameAsShippingAddress";

  setBillingAddressLine: "setBillingAddressLine";
  setIsBillingAddressLineFocused: "setIsBillingAddressLineFocused";
  setIsBillingAddressLineValid: "setIsBillingAddressLineValid";

  setBillingCity: "setBillingCity";
  setIsBillingCityFocused: "setIsBillingCityFocused";
  setIsBillingCityValid: "setIsBillingCityValid";

  setBillingProvince: "setBillingProvince";
  setBillingState: "setBillingState";

  setBillingPostalCode: "setBillingPostalCode";
  setIsBillingPostalCodeFocused: "setIsBillingPostalCodeFocused";
  setIsBillingPostalCodeValid: "setIsBillingPostalCodeValid";

  setBillingCountry: "setBillingCountry";

  setIsPrefersReducedMotion: "setIsPrefersReducedMotion";

  setTriggerFormSubmit: "setTriggerFormSubmit";
  setCurrentStepperPosition: "setCurrentStepperPosition";
  setStepsInError: "setStepsInError";

  setIsSubmitting: "setIsSubmitting";
  setSubmitMessage: "setSubmitMessage";
  setIsSuccessful: "setIsSuccessful";
  setSuccessMessage: "setSuccessMessage";
};

export { createCustomerAction };
export type { CreateCustomerAction };
