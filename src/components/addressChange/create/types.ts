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
  acknowledgement: boolean;
  addressLine: string;
  city: string;
  contactNumber: PhoneNumber;
  country: Country;
  postalCode: PostalCode;
  province: Province | "Not Applicable";
  requestStatus: RequestStatus;
  state: StatesUS | "Not Applicable";
  userId: string;
  username: string;
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
      action: AddressChangeAction["setAcknowledgement"];
      payload: boolean;
    }
  | {
      action: AddressChangeAction["setAddressLine"];
      payload: string;
    }
  | {
      action: AddressChangeAction["setCity"];
      payload: string;
    }
  | {
      action: AddressChangeAction["setContactNumber"];
      payload: PhoneNumber | string;
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
      action: AddressChangeAction["setProvince"];
      payload: Province;
    }
  | {
      action: AddressChangeAction["setState"];
      payload: StatesUS;
    }
  | {
      action: AddressChangeAction["setTriggerFormSubmit"];
      payload: boolean;
    }
  | {
      action: AddressChangeAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: AddressChangeAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: AddressChangeAction["setIsSuccessful"];
      payload: boolean;
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
