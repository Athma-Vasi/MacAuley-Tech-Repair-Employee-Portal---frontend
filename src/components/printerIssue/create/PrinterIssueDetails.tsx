import { Stack } from "@mantine/core";

import { URGENCY_DATA } from "../../../constants/data";
import { StepperPage, Urgency } from "../../../types";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextAreaInput } from "../../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import { PRINTER_MAKE_SELECT_OPTIONS } from "../constants";
import { PrinterIssueAction, PrinterMake } from "./types";

type PrinterIssueDetailsProps = {
  additionalInformation: string;
  parentAction: PrinterIssueAction;
  parentDispatch: any;
  printerIssueDescription: string;
  printerMake: PrinterMake;
  printerModel: string;
  printerSerialNumber: string;
  stepperPages: StepperPage[];
  urgency: Urgency;
};

function PrinterIssueDetails({
  additionalInformation,
  parentAction,
  parentDispatch,
  printerIssueDescription,
  printerMake,
  printerModel,
  printerSerialNumber,
  stepperPages,
  urgency,
}: PrinterIssueDetailsProps) {
  const additionalInformationTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "additionalInformation",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setAdditionalInformation,
        value: additionalInformation,
      }}
    />
  );

  const printerIssueDescriptionTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "printerIssueDescription",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setPrinterIssueDescription,
        value: printerIssueDescription,
      }}
    />
  );

  const printerMakeSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: PRINTER_MAKE_SELECT_OPTIONS,
        name: "printerMake",
        parentDispatch,
        value: printerMake,
        validValueAction: parentAction.setPrinterMake,
      }}
    />
  );

  const printerModelTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "printerModel",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setPrinterModel,
        value: printerModel,
      }}
    />
  );

  const printerSerialNumberTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "printerSerialNumber",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setPrinterSerialNumber,
        value: printerSerialNumber,
      }}
    />
  );

  const urgencySelectInput = (
    <AccessibleSelectInput<PrinterIssueAction["setUrgency"], Urgency>
      attributes={{
        data: URGENCY_DATA,
        name: "urgency",
        parentDispatch,
        value: urgency,
        validValueAction: parentAction.setUrgency,
      }}
    />
  );

  return (
    <Stack>
      {printerMakeSelectInput}
      {printerModelTextInput}
      {printerSerialNumberTextInput}
      {printerIssueDescriptionTextAreaInput}
      {urgencySelectInput}
      {additionalInformationTextAreaInput}
    </Stack>
  );
}

export { PrinterIssueDetails };
