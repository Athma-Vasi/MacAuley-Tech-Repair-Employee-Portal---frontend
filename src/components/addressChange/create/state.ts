import type { AddressChangeState } from "./types";

const initialAddressChangeState: AddressChangeState = {
  acknowledgement: false,
  addressLine: "",
  city: "",
  contactNumber: "",
  country: "Canada",
  isSubmitting: false,
  isSuccessful: false,
  pagesInError: new Set<number>(),
  postalCode: "",
  province: "Alberta",
  state: "Alabama",
  triggerFormSubmit: false,
};

export { initialAddressChangeState };
