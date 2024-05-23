import { PrinterIssueState } from "./types";

const initialPrinterIssueState: PrinterIssueState = {
  additionalInformation: "",
  contactEmail: "",
  contactNumber: "+(1)",
  dateOfOccurrence: "",
  isSubmitting: false,
  isSuccessful: false,
  pagesInError: new Set(),
  printerIssueDescription: "",
  printerMake: "Brother",
  printerModel: "",
  printerSerialNumber: "",
  timeOfOccurrence: "",
  title: "",
  triggerFormSubmit: false,
  urgency: "low",
};

export { initialPrinterIssueState };
