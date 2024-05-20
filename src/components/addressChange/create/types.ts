import type {
  Country,
  PhoneNumber,
  PostalCode,
  Province,
  RequestStatus,
  SetPageInErrorPayload,
  StatesUS,
} from "../../../types";
import { AddressChangeAction } from "./actions";

type AddressChangeSchema = {
  userId: string;
  username: string;
  contactNumber: PhoneNumber;
  addressLine: string;
  city: string;
  province: Province | "Not Applicable";
  state: StatesUS | "Not Applicable";
  postalCode: PostalCode;
  country: Country;
  acknowledgement: boolean;
  requestStatus: RequestStatus;
};

type AddressChangeDocument = AddressChangeSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type AddressChangeState = {
  contactNumber: PhoneNumber | string;
  addressLine: string;
  city: string;
  province: Province;
  state: StatesUS;
  country: Country;
  postalCode: PostalCode;
  acknowledgement: boolean;
  triggerFormSubmit: boolean;
  pagesInError: Set<number>;
  isSubmitting: boolean;
  isSuccessful: boolean;
};

type AddressChangeDispatch =
  | {
      action: AddressChangeAction["setAddressLine"] | AddressChangeAction["setCity"];
      payload: string;
    }
  | {
      action:
        | AddressChangeAction["setAcknowledgement"]
        | AddressChangeAction["setTriggerFormSubmit"]
        | AddressChangeAction["setIsSuccessful"]
        | AddressChangeAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: AddressChangeAction["setContactNumber"];
      payload: PhoneNumber | string;
    }
  | {
      action: AddressChangeAction["setProvince"];
      payload: Province;
    }
  | {
      action: AddressChangeAction["setState"];
      payload: StatesUS;
    }
  | {
      action: AddressChangeAction["setCountry"];
      payload: Country;
    }
  | {
      action: AddressChangeAction["setPostalCode"];
      payload: PostalCode;
    }
  | {
      action: AddressChangeAction["setPageInError"];
      payload: SetPageInErrorPayload;
    };

type AddressChangeReducer = (
  state: AddressChangeState,
  action: AddressChangeDispatch
) => AddressChangeState;

export type {
  AddressChangeDispatch,
  AddressChangeDocument,
  AddressChangeReducer,
  AddressChangeSchema,
  AddressChangeState,
};
