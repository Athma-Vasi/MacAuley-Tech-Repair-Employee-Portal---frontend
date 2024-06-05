import { Stack } from "@mantine/core";

import { DEPARTMENT_DATA, JOB_POSITION_DATA } from "../../../constants/data";
import { JobPosition, StepperPage } from "../../../types";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleSwitchInput } from "../../accessibleInputs/AccessibleSwitchInput";
import { AccessibleTextAreaInput } from "../../accessibleInputs/AccessibleTextAreaInput";
import { Department } from "../../survey/types";
import { RefermentAction } from "./actions";

type RefermentPositionProps = {
  additionalInformation: string;
  departmentReferredFor: Department;
  parentAction: RefermentAction;
  parentDispatch: any;
  positionJobDescription: string;
  positionReferredFor: JobPosition;
  privacyConsent: boolean;
  referralReason: string;
  stepperPages: StepperPage[];
};

function RefermentPosition({
  additionalInformation,
  departmentReferredFor,
  parentAction,
  parentDispatch,
  positionJobDescription,
  positionReferredFor,
  privacyConsent,
  referralReason,
  stepperPages,
}: RefermentPositionProps) {
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

  const departmentReferredForSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: DEPARTMENT_DATA,
        name: "departmentReferredFor",
        parentDispatch,
        value: departmentReferredFor,
        validValueAction: parentAction.setDepartmentReferredFor,
      }}
    />
  );

  const positionReferredForSelectInput = (
    <AccessibleSelectInput<RefermentAction["setPositionReferredFor"], JobPosition>
      attributes={{
        data: JOB_POSITION_DATA,
        name: "positionReferredFor",
        parentDispatch,
        value: positionReferredFor,
        validValueAction: parentAction.setPositionReferredFor,
      }}
    />
  );

  const positionJobDescriptionTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "positionJobDescription",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setPositionJobDescription,
        value: positionJobDescription,
      }}
    />
  );

  const referralReasonTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "referralReason",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setReferralReason,
        value: referralReason,
      }}
    />
  );

  const privacyConsentSwitch = (
    <AccessibleSwitchInput
      attributes={{
        checked: privacyConsent,
        invalidValueAction: parentAction.setPageInError,
        name: "privacyConsent",
        offLabel: "No",
        onLabel: "Yes",
        parentDispatch,
        switchOffDescription: "I do not acknowledge.",
        switchOnDescription: "I acknowledge to share candidate's personal information.",
        validValueAction: parentAction.setPrivacyConsent,
        value: privacyConsent ? "Yes" : "No",
      }}
    />
  );

  return (
    <Stack>
      {departmentReferredForSelectInput}
      {positionReferredForSelectInput}
      {positionJobDescriptionTextAreaInput}
      {referralReasonTextAreaInput}
      {additionalInformationTextAreaInput}
      {privacyConsentSwitch}
    </Stack>
  );
}

export { RefermentPosition };
