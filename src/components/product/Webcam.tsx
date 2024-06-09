import { Stack } from "@mantine/core";

import { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { ProductCategory } from "../dashboard/types";
import { CreateProductAction } from "./actions";
import { AdditionalFields } from "./AdditionalFields";
import {
  WEBCAM_FRAME_RATE_DATA,
  WEBCAM_INTERFACE_DATA,
  WEBCAM_MICROPHONE_DATA,
  WEBCAM_RESOLUTION_DATA,
} from "./constants";
import { CreateProductDispatch } from "./dispatch";
import {
  WebcamFrameRate,
  WebcamInterface,
  WebcamMicrophone,
  WebcamResolution,
} from "./types";

type WebcamProps = {
  additionalFields: Array<[string, string]>;
  additionalFieldsFormData: FormData;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
  webcamColor: string;
  webcamFrameRate: WebcamFrameRate;
  webcamInterface: WebcamInterface;
  webcamMicrophone: WebcamMicrophone;
  webcamResolution: WebcamResolution;
};

function Webcam({
  additionalFields,
  additionalFieldsFormData,
  parentAction,
  parentDispatch,
  productCategory,
  stepperPages,
  webcamColor,
  webcamFrameRate,
  webcamInterface,
  webcamMicrophone,
  webcamResolution,
}: WebcamProps) {
  const webcamColorTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "webcamColor",
        stepperPages,
        validValueAction: parentAction.setWebcamColor,
        value: webcamColor,
      }}
    />
  );

  const webcamFrameRateSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: WEBCAM_FRAME_RATE_DATA,
        name: "webcamFrameRate",
        parentDispatch,
        validValueAction: parentAction.setWebcamFrameRate,
        value: webcamFrameRate,
      }}
    />
  );

  const webcamInterfaceSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: WEBCAM_INTERFACE_DATA,
        name: "webcamInterface",
        parentDispatch,
        validValueAction: parentAction.setWebcamInterface,
        value: webcamInterface,
      }}
    />
  );

  const webcamMicrophoneSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: WEBCAM_MICROPHONE_DATA,
        name: "webcamMicrophone",
        parentDispatch,
        validValueAction: parentAction.setWebcamMicrophone,
        value: webcamMicrophone,
      }}
    />
  );

  const webcamResolutionSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: WEBCAM_RESOLUTION_DATA,
        name: "webcamResolution",
        parentDispatch,
        validValueAction: parentAction.setWebcamResolution,
        value: webcamResolution,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      additionalFieldsFormData={additionalFieldsFormData}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {webcamColorTextInput}
      {webcamFrameRateSelectInput}
      {webcamInterfaceSelectInput}
      {webcamMicrophoneSelectInput}
      {webcamResolutionSelectInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { Webcam };
