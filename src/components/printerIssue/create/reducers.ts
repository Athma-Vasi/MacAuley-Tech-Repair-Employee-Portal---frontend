import { PhoneNumber, SetPageInErrorPayload, TimeRailway, Urgency } from "../../../types";
import { printerIssueAction } from "./actions";
import {
  PrinterIssueAction,
  PrinterIssueDispatch,
  PrinterIssueState,
  PrinterMake,
} from "./types";

function printerIssueReducer(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  const reducer = printerIssueReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const printerIssueReducers = new Map<
  PrinterIssueAction[keyof PrinterIssueAction],
  (state: PrinterIssueState, dispatch: PrinterIssueDispatch) => PrinterIssueState
>([
  [
    printerIssueAction.setAdditionalInformation,
    printerIssueReducer_setAdditionalInformation,
  ],
  [printerIssueAction.setContactEmail, printerIssueReducer_setContactEmail],
  [printerIssueAction.setContactNumber, printerIssueReducer_setContactNumber],
  [printerIssueAction.setDateOfOccurrence, printerIssueReducer_setDateOfOccurrence],
  [printerIssueAction.setIsSubmitting, printerIssueReducer_setIsSubmitting],
  [printerIssueAction.setIsSuccessful, printerIssueReducer_setIsSuccessful],
  [printerIssueAction.setPageInError, printerIssueReducer_setPageInError],
  [
    printerIssueAction.setPrinterIssueDescription,
    printerIssueReducer_setPrinterIssueDescription,
  ],
  [printerIssueAction.setPrinterMake, printerIssueReducer_setPrinterMake],
  [printerIssueAction.setPrinterModel, printerIssueReducer_setPrinterModel],
  [printerIssueAction.setPrinterSerialNumber, printerIssueReducer_setPrinterSerialNumber],
  [printerIssueAction.setTimeOfOccurrence, printerIssueReducer_setTimeOfOccurrence],
  [printerIssueAction.setTitle, printerIssueReducer_setTitle],
  [printerIssueAction.setTriggerFormSubmit, printerIssueReducer_setTriggerFormSubmit],
  [printerIssueAction.setUrgency, printerIssueReducer_setUrgency],
]);

function printerIssueReducer_setAdditionalInformation(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    additionalInformation: dispatch.payload as string,
  };
}

function printerIssueReducer_setTitle(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    title: dispatch.payload as string,
  };
}

function printerIssueReducer_setContactEmail(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    contactEmail: dispatch.payload as string,
  };
}

function printerIssueReducer_setContactNumber(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    contactNumber: dispatch.payload as PhoneNumber | string,
  };
}

function printerIssueReducer_setDateOfOccurrence(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    dateOfOccurrence: dispatch.payload as string,
  };
}

function printerIssueReducer_setIsSubmitting(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    isSubmitting: dispatch.payload as boolean,
  };
}

function printerIssueReducer_setIsSuccessful(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    isSuccessful: dispatch.payload as boolean,
  };
}

function printerIssueReducer_setPageInError(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  const { kind, page } = dispatch.payload as SetPageInErrorPayload;
  const pagesInError = new Set(state.pagesInError);
  kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

  return {
    ...state,
    pagesInError,
  };
}

function printerIssueReducer_setPrinterIssueDescription(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    printerIssueDescription: dispatch.payload as string,
  };
}

function printerIssueReducer_setPrinterMake(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    printerMake: dispatch.payload as PrinterMake,
  };
}

function printerIssueReducer_setPrinterModel(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    printerModel: dispatch.payload as string,
  };
}

function printerIssueReducer_setPrinterSerialNumber(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    printerSerialNumber: dispatch.payload as string,
  };
}

function printerIssueReducer_setTimeOfOccurrence(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    timeOfOccurrence: dispatch.payload as TimeRailway | string,
  };
}

function printerIssueReducer_setTriggerFormSubmit(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    triggerFormSubmit: dispatch.payload as boolean,
  };
}

function printerIssueReducer_setUrgency(
  state: PrinterIssueState,
  dispatch: PrinterIssueDispatch
): PrinterIssueState {
  return {
    ...state,
    urgency: dispatch.payload as Urgency,
  };
}

export { printerIssueReducer };
