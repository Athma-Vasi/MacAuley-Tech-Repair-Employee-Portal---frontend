import type {
  Action,
  ActionsCompany,
  Country,
  PhoneNumber,
  PostalCode,
  Province,
  RequestStatus,
  SetStepsInErrorPayload,
  StatesUS,
} from "../../../types";
import { AddressChangeAction } from "./actions";

type AddressChangeSchema = {
  userId: string;
  username: string;
  action: Action;
  category: ActionsCompany;
  contactNumber: PhoneNumber;
  addressLine: string;
  city: string;
  province: Province;
  state: StatesUS;
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
  stepsInError: Set<number>;
  isSubmitting: boolean;
  isSuccessful: boolean;
};

type AddressChangeDispatch =
  | {
      type: AddressChangeAction["setAddressLine"] | AddressChangeAction["setCity"];
      payload: string;
    }
  | {
      type:
        | AddressChangeAction["setAcknowledgement"]
        | AddressChangeAction["setTriggerFormSubmit"]
        | AddressChangeAction["setIsSuccessful"]
        | AddressChangeAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      type: AddressChangeAction["setContactNumber"];
      payload: PhoneNumber | string;
    }
  | {
      type: AddressChangeAction["setProvince"];
      payload: Province;
    }
  | {
      type: AddressChangeAction["setState"];
      payload: StatesUS;
    }
  | {
      type: AddressChangeAction["setCountry"];
      payload: Country;
    }
  | {
      type: AddressChangeAction["setPostalCode"];
      payload: PostalCode;
    }
  | {
      type: AddressChangeAction["setStepsInError"];
      payload: SetStepsInErrorPayload;
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
