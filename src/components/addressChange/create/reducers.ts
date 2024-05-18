import {
  Country,
  PhoneNumber,
  PostalCode,
  Province,
  SetStepsInErrorPayload,
  StatesUS,
} from "../../../types";
import { AddressChangeAction, addressChangeAction } from "./actions";
import { AddressChangeDispatch, AddressChangeState } from "./types";

function addressChangeReducer(
  state: AddressChangeState,
  dispatch: AddressChangeDispatch
): AddressChangeState {
  const reducer = addressChangeReducersMap.get(dispatch.type);
  return reducer ? reducer(state, dispatch) : state;
}

const addressChangeReducersMap = new Map<
  AddressChangeAction[keyof AddressChangeAction],
  (state: AddressChangeState, action: AddressChangeDispatch) => AddressChangeState
>([
  [addressChangeAction.setContactNumber, addressChangeReducer_setContactNumber],
  [addressChangeAction.setAddressLine, addressChangeReducer_setAddressLine],
  [addressChangeAction.setCity, addressChangeReducer_setCity],
  [addressChangeAction.setProvince, addressChangeReducer_setProvince],
  [addressChangeAction.setState, addressChangeReducer_setState],
  [addressChangeAction.setCountry, addressChangeReducer_setCountry],
  [addressChangeAction.setPostalCode, addressChangeReducer_setPostalCode],
  [addressChangeAction.setAcknowledgement, addressChangeReducer_setIsAcknowledged],
  [addressChangeAction.setTriggerFormSubmit, addressChangeReducer_setTriggerFormSubmit],
  [addressChangeAction.setStepsInError, addressChangeReducer_setStepsInError],
  [addressChangeAction.setIsSubmitting, addressChangeReducer_setIsSubmitting],
  [addressChangeAction.setIsSuccessful, addressChangeReducer_setIsSuccessful],
]);

function addressChangeReducer_setContactNumber(
  state: AddressChangeState,
  dispatch: AddressChangeDispatch
): AddressChangeState {
  return {
    ...state,
    contactNumber: dispatch.payload as PhoneNumber,
  };
}

function addressChangeReducer_setAddressLine(
  state: AddressChangeState,
  dispatch: AddressChangeDispatch
): AddressChangeState {
  return {
    ...state,
    addressLine: dispatch.payload as string,
  };
}

function addressChangeReducer_setCity(
  state: AddressChangeState,
  dispatch: AddressChangeDispatch
): AddressChangeState {
  return {
    ...state,
    city: dispatch.payload as string,
  };
}

function addressChangeReducer_setProvince(
  state: AddressChangeState,
  dispatch: AddressChangeDispatch
): AddressChangeState {
  return {
    ...state,
    province: dispatch.payload as Province,
  };
}

function addressChangeReducer_setState(
  state: AddressChangeState,
  dispatch: AddressChangeDispatch
): AddressChangeState {
  return {
    ...state,
    state: dispatch.payload as StatesUS,
  };
}

function addressChangeReducer_setCountry(
  state: AddressChangeState,
  dispatch: AddressChangeDispatch
): AddressChangeState {
  return {
    ...state,
    country: dispatch.payload as Country,
  };
}

function addressChangeReducer_setPostalCode(
  state: AddressChangeState,
  dispatch: AddressChangeDispatch
): AddressChangeState {
  return {
    ...state,
    postalCode: dispatch.payload as PostalCode,
  };
}

function addressChangeReducer_setIsAcknowledged(
  state: AddressChangeState,
  dispatch: AddressChangeDispatch
): AddressChangeState {
  return {
    ...state,
    acknowledgement: dispatch.payload as boolean,
  };
}

function addressChangeReducer_setTriggerFormSubmit(
  state: AddressChangeState,
  dispatch: AddressChangeDispatch
): AddressChangeState {
  return {
    ...state,
    triggerFormSubmit: dispatch.payload as boolean,
  };
}

function addressChangeReducer_setStepsInError(
  state: AddressChangeState,
  dispatch: AddressChangeDispatch
): AddressChangeState {
  const { kind, step } = dispatch.payload as SetStepsInErrorPayload;
  const stepsInError = new Set(state.stepsInError);
  kind === "add" ? stepsInError.add(step) : stepsInError.delete(step);

  return {
    ...state,
    stepsInError,
  };
}

function addressChangeReducer_setIsSubmitting(
  state: AddressChangeState,
  dispatch: AddressChangeDispatch
): AddressChangeState {
  return {
    ...state,
    isSubmitting: dispatch.payload as boolean,
  };
}

function addressChangeReducer_setIsSuccessful(
  state: AddressChangeState,
  dispatch: AddressChangeDispatch
): AddressChangeState {
  return {
    ...state,
    isSuccessful: dispatch.payload as boolean,
  };
}

export { addressChangeReducer };
