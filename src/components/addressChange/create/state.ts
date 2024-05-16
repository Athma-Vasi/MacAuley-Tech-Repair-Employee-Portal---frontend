import type { AddressChangeDispatch, AddressChangeState } from "./types";

const initialAddressChangeState: AddressChangeState = {
  addressLine: "",
  city: "",
  contactNumber: "",
  country: "Canada",
  currentStepperPosition: 0,
  isAcknowledged: false,
  isSubmitting: false,
  isSuccessful: false,
  postalCode: "",
  province: "Alberta",
  state: "Alabama",
  stepsInError: new Set<number>(),
  triggerFormSubmit: false,
};

export { initialAddressChangeState };
