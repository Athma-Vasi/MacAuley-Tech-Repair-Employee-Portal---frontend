import { Stack } from "@mantine/core";

import type { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import type { ProductCategory } from "../dashboard/types";
import { AdditionalFields } from "./AdditionalFields";
import type { CreateProductAction } from "./actions";
import {
  WEBCAM_FRAME_RATE_DATA,
  WEBCAM_INTERFACE_DATA,
  WEBCAM_MICROPHONE_DATA,
  WEBCAM_RESOLUTION_DATA,
} from "./constants";
import type { CreateProductDispatch } from "./dispatch";
import type {
  WebcamFrameRate,
  WebcamInterface,
  WebcamMicrophone,
  WebcamResolution,
} from "./types";

type WebcamProps = {
  additionalFields: Array<[string, string]>;
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
        label: "Color",
        name: "webcamColor",
        parentDispatch,
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
        label: "Frame Rate",
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
        label: "Interface",
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
        label: "Microphone",
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
        label: "Resolution",
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
      page={15}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {webcamResolutionSelectInput}
      {webcamFrameRateSelectInput}
      {webcamInterfaceSelectInput}
      {webcamMicrophoneSelectInput}
      {webcamColorTextInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { Webcam };
