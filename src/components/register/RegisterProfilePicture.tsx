import { Stack } from "@mantine/core";

import { StepperPage } from "../../types";
import { AccessibleImageInput } from "../accessibleInputs/image";
import { RegisterAction } from "./actions";

type RegisterProfilePictureProps = {
  profilePictureFormData: FormData | undefined;
  parentAction: RegisterAction;
  parentDispatch: any;
  stepperPages: StepperPage[];
};

function RegisterProfilePicture({
  profilePictureFormData,
  parentAction,
  parentDispatch,
  stepperPages,
}: RegisterProfilePictureProps) {
  const imageInput = (
    <AccessibleImageInput
      attributes={{
        formData: profilePictureFormData,
        invalidValueAction: parentAction.setPageInError,
        page: 2,
        parentDispatch,
        stepperPages,
        storageKey: "profilePicture",
        validValueAction: parentAction.setProfilePictureFormData,
      }}
    />
  );

  return <Stack>{imageInput}</Stack>;
}

export { RegisterProfilePicture };
