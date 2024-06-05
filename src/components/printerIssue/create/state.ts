import { TimeRailway } from "../../../types";
import { PrinterIssueState } from "./types";

const initialPrinterIssueState: PrinterIssueState = {
  additionalInformation: "",
  contactEmail: "",
  contactNumber: "",
  dateOfOccurrence: "",
  isSubmitting: false,
  isSuccessful: false,
  pagesInError: new Set(),
  printerIssueDescription: "",
  printerMake: "Brother",
  printerModel: "",
  printerSerialNumber: "",
  timeOfOccurrence: "" as TimeRailway,
  title: "",
  triggerFormSubmit: false,
  urgency: "low",
};

export { initialPrinterIssueState };
