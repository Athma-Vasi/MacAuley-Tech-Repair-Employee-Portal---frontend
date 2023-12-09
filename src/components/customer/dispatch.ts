import { StepsInErrorPayload } from "../endorsements/create/types";
import { CreateCustomerAction } from "./actions";
import { CreateCustomerState } from "./types";

type CreateCustomerDispatch =
  | {
      type: CreateCustomerAction["setUsername"];
      payload: CreateCustomerState["username"];
    }
  | {
      type: CreateCustomerAction["setIsUsernameFocused"];
      payload: CreateCustomerState["isUsernameFocused"];
    }
  | {
      type: CreateCustomerAction["setIsUsernameValid"];
      payload: CreateCustomerState["isUsernameValid"];
    }
  | {
      type: CreateCustomerAction["setIsUsernameExists"];
      payload: CreateCustomerState["isUsernameExists"];
    }
  | {
      type: CreateCustomerAction["setConfirmPassword"];
      payload: CreateCustomerState["confirmPassword"];
    }
  | {
      type: CreateCustomerAction["setIsConfirmPasswordFocused"];
      payload: CreateCustomerState["isConfirmPasswordFocused"];
    }
  | {
      type: CreateCustomerAction["setIsConfirmPasswordValid"];
      payload: CreateCustomerState["isConfirmPasswordValid"];
    }
  | {
      type: CreateCustomerAction["setPassword"];
      payload: CreateCustomerState["password"];
    }
  | {
      type: CreateCustomerAction["setIsPasswordFocused"];
      payload: CreateCustomerState["isPasswordFocused"];
    }
  | {
      type: CreateCustomerAction["setIsPasswordValid"];
      payload: CreateCustomerState["isPasswordValid"];
    }
  | {
      type: CreateCustomerAction["setEmail"];
      payload: CreateCustomerState["email"];
    }
  | {
      type: CreateCustomerAction["setIsEmailFocused"];
      payload: CreateCustomerState["isEmailFocused"];
    }
  | {
      type: CreateCustomerAction["setIsEmailValid"];
      payload: CreateCustomerState["isEmailValid"];
    }
  | {
      type: CreateCustomerAction["setIsEmailExists"];
      payload: CreateCustomerState["isEmailExists"];
    }
  | {
      type: CreateCustomerAction["setFirstName"];
      payload: CreateCustomerState["firstName"];
    }
  | {
      type: CreateCustomerAction["setIsFirstNameFocused"];
      payload: CreateCustomerState["isFirstNameFocused"];
    }
  | {
      type: CreateCustomerAction["setIsFirstNameValid"];
      payload: CreateCustomerState["isFirstNameValid"];
    }
  | {
      type: CreateCustomerAction["setMiddleName"];
      payload: CreateCustomerState["middleName"];
    }
  | {
      type: CreateCustomerAction["setIsMiddleNameFocused"];
      payload: CreateCustomerState["isMiddleNameFocused"];
    }
  | {
      type: CreateCustomerAction["setIsMiddleNameValid"];
      payload: CreateCustomerState["isMiddleNameValid"];
    }
  | {
      type: CreateCustomerAction["setLastName"];
      payload: CreateCustomerState["lastName"];
    }
  | {
      type: CreateCustomerAction["setIsLastNameFocused"];
      payload: CreateCustomerState["isLastNameFocused"];
    }
  | {
      type: CreateCustomerAction["setIsLastNameValid"];
      payload: CreateCustomerState["isLastNameValid"];
    }
  | {
      type: CreateCustomerAction["setPreferredName"];
      payload: CreateCustomerState["preferredName"];
    }
  | {
      type: CreateCustomerAction["setIsPreferredNameFocused"];
      payload: CreateCustomerState["isPreferredNameFocused"];
    }
  | {
      type: CreateCustomerAction["setIsPreferredNameValid"];
      payload: CreateCustomerState["isPreferredNameValid"];
    }
  | {
      type: CreateCustomerAction["setPreferredPronouns"];
      payload: CreateCustomerState["preferredPronouns"];
    }
  | {
      type: CreateCustomerAction["setProfilePictureUrl"];
      payload: CreateCustomerState["profilePictureUrl"];
    }
  | {
      type: CreateCustomerAction["setIsProfilePictureUrlFocused"];
      payload: CreateCustomerState["isProfilePictureUrlFocused"];
    }
  | {
      type: CreateCustomerAction["setIsProfilePictureUrlValid"];
      payload: CreateCustomerState["isProfilePictureUrlValid"];
    }
  | {
      type: CreateCustomerAction["setDateOfBirth"];
      payload: CreateCustomerState["dateOfBirth"];
    }
  | {
      type: CreateCustomerAction["setIsDateOfBirthFocused"];
      payload: CreateCustomerState["isDateOfBirthFocused"];
    }
  | {
      type: CreateCustomerAction["setIsDateOfBirthValid"];
      payload: CreateCustomerState["isDateOfBirthValid"];
    }
  | {
      type: CreateCustomerAction["setContactNumber"];
      payload: CreateCustomerState["contactNumber"];
    }
  | {
      type: CreateCustomerAction["setIsContactNumberFocused"];
      payload: CreateCustomerState["isContactNumberFocused"];
    }
  | {
      type: CreateCustomerAction["setIsContactNumberValid"];
      payload: CreateCustomerState["isContactNumberValid"];
    }
  | {
      type: CreateCustomerAction["setAddressLine"];
      payload: CreateCustomerState["addressLine"];
    }
  | {
      type: CreateCustomerAction["setIsAddressLineFocused"];
      payload: CreateCustomerState["isAddressLineFocused"];
    }
  | {
      type: CreateCustomerAction["setIsAddressLineValid"];
      payload: CreateCustomerState["isAddressLineValid"];
    }
  | {
      type: CreateCustomerAction["setCity"];
      payload: CreateCustomerState["city"];
    }
  | {
      type: CreateCustomerAction["setIsCityFocused"];
      payload: CreateCustomerState["isCityFocused"];
    }
  | {
      type: CreateCustomerAction["setIsCityValid"];
      payload: CreateCustomerState["isCityValid"];
    }
  | {
      type: CreateCustomerAction["setProvince"];
      payload: CreateCustomerState["province"];
    }
  | {
      type: CreateCustomerAction["setState"];
      payload: CreateCustomerState["state"];
    }
  | {
      type: CreateCustomerAction["setPostalCode"];
      payload: CreateCustomerState["postalCode"];
    }
  | {
      type: CreateCustomerAction["setIsPostalCodeFocused"];
      payload: CreateCustomerState["isPostalCodeFocused"];
    }
  | {
      type: CreateCustomerAction["setIsPostalCodeValid"];
      payload: CreateCustomerState["isPostalCodeValid"];
    }
  | {
      type: CreateCustomerAction["setCountry"];
      payload: CreateCustomerState["country"];
    }
  | {
      type: CreateCustomerAction["setCardholderName"];
      payload: CreateCustomerState["cardholderName"];
    }
  | {
      type: CreateCustomerAction["setIsCardholderNameFocused"];
      payload: CreateCustomerState["isCardholderNameFocused"];
    }
  | {
      type: CreateCustomerAction["setIsCardholderNameValid"];
      payload: CreateCustomerState["isCardholderNameValid"];
    }
  | {
      type: CreateCustomerAction["setCardNumber"];
      payload: CreateCustomerState["cardNumber"];
    }
  | {
      type: CreateCustomerAction["setIsCardNumberFocused"];
      payload: CreateCustomerState["isCardNumberFocused"];
    }
  | {
      type: CreateCustomerAction["setIsCardNumberValid"];
      payload: CreateCustomerState["isCardNumberValid"];
    }
  | {
      type: CreateCustomerAction["setExpirationDate"];
      payload: CreateCustomerState["expirationDate"];
    }
  | {
      type: CreateCustomerAction["setIsExpirationDateFocused"];
      payload: CreateCustomerState["isExpirationDateFocused"];
    }
  | {
      type: CreateCustomerAction["setIsExpirationDateValid"];
      payload: CreateCustomerState["isExpirationDateValid"];
    }
  | {
      type: CreateCustomerAction["setCvv"];
      payload: CreateCustomerState["cvv"];
    }
  | {
      type: CreateCustomerAction["setIsCvvFocused"];
      payload: CreateCustomerState["isCvvFocused"];
    }
  | {
      type: CreateCustomerAction["setIsCvvValid"];
      payload: CreateCustomerState["isCvvValid"];
    }
  | {
      type: CreateCustomerAction["setIsBillingAddressSameAsShippingAddress"];
      payload: CreateCustomerState["isBillingAddressSameAsShippingAddress"];
    }
  | {
      type: CreateCustomerAction["setBillingAddressLine"];
      payload: CreateCustomerState["billingAddressLine"];
    }
  | {
      type: CreateCustomerAction["setIsBillingAddressLineFocused"];
      payload: CreateCustomerState["isBillingAddressLineFocused"];
    }
  | {
      type: CreateCustomerAction["setIsBillingAddressLineValid"];
      payload: CreateCustomerState["isBillingAddressLineValid"];
    }
  | {
      type: CreateCustomerAction["setBillingCity"];
      payload: CreateCustomerState["billingCity"];
    }
  | {
      type: CreateCustomerAction["setIsBillingCityFocused"];
      payload: CreateCustomerState["isBillingCityFocused"];
    }
  | {
      type: CreateCustomerAction["setIsBillingCityValid"];
      payload: CreateCustomerState["isBillingCityValid"];
    }
  | {
      type: CreateCustomerAction["setBillingProvince"];
      payload: CreateCustomerState["billingProvince"];
    }
  | {
      type: CreateCustomerAction["setBillingState"];
      payload: CreateCustomerState["billingState"];
    }
  | {
      type: CreateCustomerAction["setBillingPostalCode"];
      payload: CreateCustomerState["billingPostalCode"];
    }
  | {
      type: CreateCustomerAction["setIsBillingPostalCodeFocused"];
      payload: CreateCustomerState["isBillingPostalCodeFocused"];
    }
  | {
      type: CreateCustomerAction["setIsBillingPostalCodeValid"];
      payload: CreateCustomerState["isBillingPostalCodeValid"];
    }
  | {
      type: CreateCustomerAction["setBillingCountry"];
      payload: CreateCustomerState["billingCountry"];
    }
  | {
      type: CreateCustomerAction["setIsPrefersReducedMotion"];
      payload: CreateCustomerState["isPrefersReducedMotion"];
    }
  | {
      type: CreateCustomerAction["setTriggerFormSubmit"];
      payload: CreateCustomerState["triggerFormSubmit"];
    }
  | {
      type: CreateCustomerAction["setCurrentStepperPosition"];
      payload: CreateCustomerState["currentStepperPosition"];
    }
  | {
      type: CreateCustomerAction["setStepsInError"];
      payload: StepsInErrorPayload;
    }
  | {
      type: CreateCustomerAction["setIsSubmitting"];
      payload: CreateCustomerState["isSubmitting"];
    }
  | {
      type: CreateCustomerAction["setSubmitMessage"];
      payload: CreateCustomerState["submitMessage"];
    }
  | {
      type: CreateCustomerAction["setIsSuccessful"];
      payload: CreateCustomerState["isSuccessful"];
    }
  | {
      type: CreateCustomerAction["setSuccessMessage"];
      payload: CreateCustomerState["successMessage"];
    };

export type { CreateCustomerDispatch };
