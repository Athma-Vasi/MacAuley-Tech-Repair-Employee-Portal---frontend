import { Stack } from "@mantine/core";

import { PhoneNumber, StepperPage, TimeRailway } from "../../../types";
import { AccessibleDateTimeInput } from "../../accessibleInputs/AccessibleDateTimeInput";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import { PrinterIssueAction } from "./actions";

type PrinterIssueContactProps = {
  contactEmail: string;
  contactNumber: PhoneNumber;
  dateOfOccurrence: string;
  parentAction: PrinterIssueAction;
  parentDispatch: any;
  stepperPages: StepperPage[];
  timeOfOccurrence: TimeRailway;
  title: string;
};

function PrinterIssueContact({
  title,
  timeOfOccurrence,
  stepperPages,
  parentDispatch,
  parentAction,
  dateOfOccurrence,
  contactNumber,
  contactEmail,
}: PrinterIssueContactProps) {
  const contactEmailTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "contactEmail",
        page: 1,
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setContactEmail,
        value: contactEmail,
      }}
    />
  );

  const contactNumberTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "contactNumber",
        page: 1,
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setContactNumber,
        value: contactNumber,
      }}
    />
  );

  const dateOfOccurrenceTextInput = (
    <AccessibleDateTimeInput
      attributes={{
        dateKind: "date near past",
        invalidValueAction: parentAction.setPageInError,
        inputKind: "date",
        name: "dateOfOccurrence",
        page: 1,
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setDateOfOccurrence,
        value: dateOfOccurrence,
      }}
    />
  );

  const timeOfOccurrenceTextInput = (
    <AccessibleDateTimeInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        inputKind: "time",
        name: "timeOfOccurrence",
        page: 1,
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setTimeOfOccurrence,
        value: timeOfOccurrence,
      }}
    />
  );

  const titleTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "title",
        page: 1,
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setTitle,
        value: title,
      }}
    />
  );

  return (
    <Stack>
      {titleTextInput}
      {contactEmailTextInput}
      {contactNumberTextInput}
      {timeOfOccurrenceTextInput}
      {dateOfOccurrenceTextInput}
    </Stack>
  );
}

export { PrinterIssueContact };
