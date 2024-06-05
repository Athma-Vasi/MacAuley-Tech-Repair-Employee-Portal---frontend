import { Stack } from "@mantine/core";

import { PhoneNumber, StepperPage } from "../../../types";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import { RefermentAction } from "./actions";

type RefermentCandidateProps = {
  candidateContactNumber: PhoneNumber | string;
  candidateCurrentCompany: string;
  candidateCurrentJobTitle: string;
  candidateEmail: string;
  candidateFullName: string;
  candidateProfileUrl: string;
  parentAction: RefermentAction;
  parentDispatch: any;
  stepperPages: StepperPage[];
};

function RefermentCandidate({
  candidateContactNumber,
  candidateCurrentCompany,
  candidateCurrentJobTitle,
  candidateEmail,
  candidateFullName,
  candidateProfileUrl,
  parentAction,
  parentDispatch,
  stepperPages,
}: RefermentCandidateProps) {
  const candidateContactNumberTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "candidateContactNumber",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCandidateContactNumber,
        value: candidateContactNumber,
      }}
    />
  );

  const candidateCurrentCompanyTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "candidateCurrentCompany",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCandidateCurrentCompany,
        value: candidateCurrentCompany,
      }}
    />
  );

  const candidateCurrentJobTitleTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "candidateCurrentJobTitle",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCandidateCurrentJobTitle,
        value: candidateCurrentJobTitle,
      }}
    />
  );

  const candidateEmailTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "candidateEmail",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCandidateEmail,
        value: candidateEmail,
      }}
    />
  );

  const candidateFullNameTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "candidateFullName",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCandidateFullName,
        value: candidateFullName,
      }}
    />
  );

  const candidateProfileUrlTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "candidateProfileUrl",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCandidateProfileUrl,
        value: candidateProfileUrl,
      }}
    />
  );

  return (
    <Stack>
      {candidateFullNameTextInput}
      {candidateEmailTextInput}
      {candidateContactNumberTextInput}
      {candidateProfileUrlTextInput}
      {candidateCurrentJobTitleTextInput}
      {candidateCurrentCompanyTextInput}
    </Stack>
  );
}

export { RefermentCandidate };
