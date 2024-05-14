import type { AddressChangeDispatch, AddressChangeState } from "./types";

const initialAddressChangeState: AddressChangeState = {
  contactNumber: "+(1)",
  addressLine: "",
  city: "",
  province: "Alberta",
  state: "Alabama",
  country: "Canada",
  postalCode: "",
  isAcknowledged: false,
  triggerFormSubmit: false,
  currentStepperPosition: 0,
  stepsInError: new Set<number>(),
  isSubmitting: false,
  isSuccessful: false,
};

export { initialAddressChangeState };
