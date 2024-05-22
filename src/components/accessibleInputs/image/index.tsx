import { Dispatch, useEffect, useReducer, useRef, useState } from "react";

import { AccessibleFileInput } from "../AccessibleFileInput";
import { AccessibleImageInputAction, accessibleImageInputAction } from "./actions";
import { accessibleImageInputReducer } from "./reducers";
import { initialAccessibleImageInputState } from "./state";
import { AccessibleImageInputAttributes } from "./types";
import { logState } from "../../../utils";
import { Group, Image, Space, Stack, Text } from "@mantine/core";
import { createAccessibleButtons } from "../utils";
import { AccessibleSliderInput } from "../AccessibleSliderInput";
import {
  IMG_ORIENTATION_SLIDER_DATA,
  IMG_QUALITY_SLIDER_DATA,
  displayOrientationLabel,
} from "../../imageUpload/constants";
import { ALLOWED_FILE_EXTENSIONS_REGEX, MAX_IMAGES, MAX_IMAGE_SIZE } from "./constants";
import { EImageType, compress } from "image-conversion";
import { useErrorBoundary } from "react-error-boundary";

function AccessibleImageInput<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({
  formData,
  invalidValueAction,
  maxImageSize = MAX_IMAGE_SIZE,
  maxImages = MAX_IMAGES,
  page,
  parentDispatch,
  stepperPages,
  validValueAction,
}: AccessibleImageInputAttributes<ValidValueAction, InvalidValueAction>) {
  const [accessibleImageInputState, accessibleImageInputDispatch] = useReducer(
    accessibleImageInputReducer,
    initialAccessibleImageInputState
  );

  const { currentImageIndex, imageFileBlobs, imagesBuffer, orientations, qualities } =
    accessibleImageInputState;

  const [imageName, setImageName] = useState<string | null>(null);

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    logState({
      state: accessibleImageInputState,
      groupLabel: "Accessible Image Input State",
    });
  }, [accessibleImageInputState]);

  const isComponentMountedRef = useRef(false);

  useEffect(() => {
    isComponentMountedRef.current = true;
    const isMounted = isComponentMountedRef.current;

    async function compressAndRotateImage() {
      try {
        const imageToModify = structuredClone(imagesBuffer[currentImageIndex]);

        if (!imageToModify) {
          return;
        }

        const quality = qualities[currentImageIndex] / 10;
        const orientation = orientations[currentImageIndex];
        const type = imageToModify?.type as EImageType;

        const fileBlob = await compress(imageToModify, {
          quality,
          orientation,
          type,
        });

        if (!isMounted) {
          return;
        }

        accessibleImageInputDispatch({
          action: accessibleImageInputAction.setImageFileBlobs,
          payload: {
            fileBlob,
            index: currentImageIndex,
          },
        });

        const areImagesInvalid = imageFileBlobs.reduce((invalidAcc, fileBlob) => {
          if (fileBlob === null) {
            return true;
          }

          const { size, type } = fileBlob;
          const extension = type.split("/")[1];

          if (size > maxImageSize) {
            return true;
          }
          if (!ALLOWED_FILE_EXTENSIONS_REGEX.test(extension)) {
            return true;
          }

          return invalidAcc;
        }, false);

        parentDispatch({
          action: invalidValueAction,
          payload: {
            kind: areImagesInvalid ? "add" : "delete",
            page,
          },
        });

        const formData = imageFileBlobs.reduce<FormData>(
          (formDataAcc, imageFileBlob, index) => {
            if (imageFileBlob) {
              formDataAcc.append(
                `images-${index}`,
                imageFileBlob,
                imagesBuffer[index].name
              );
            }

            return formDataAcc;
          },
          new FormData()
        );

        parentDispatch({
          action: validValueAction,
          payload: formData,
        });

        console.log("formData.get(images)", formData.get("images-1"));
      } catch (error: any) {
        if (!isMounted) {
          return;
        }

        showBoundary(error);
      }
    }

    compressAndRotateImage();

    return () => {
      isComponentMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImageIndex, qualities, orientations]);

  const fileInput = (
    <AccessibleFileInput<AccessibleImageInputAction["addImageToBuffer"]>
      attributes={{
        name: "images",
        parentDispatch: accessibleImageInputDispatch,
        validValueAction: accessibleImageInputAction.addImageToBuffer,
        value: imagesBuffer.at(-1) ?? null,
      }}
    />
  );

  const images = imageFileBlobs.map((fileBlob: File | Blob | null, index) => {
    const img = (
      <Image
        key={index}
        src={URL.createObjectURL(fileBlob ?? new Blob([]))}
        alt="image preview"
      />
    );

    const [removeButton, resetButton] = createAccessibleButtons([
      {
        name: "remove",
      },
      { name: "reset" },
    ]);

    const imageFile = fileBlob ?? new Blob([]);

    const imageSize = <Text>{imageFile?.size}</Text>;
    const imageType = <Text>{imageFile?.type}</Text>;

    const imageQualitySlider = (
      <AccessibleSliderInput
        attributes={{
          index,
          marks: IMG_QUALITY_SLIDER_DATA,
          max: 10,
          min: 1,
          name: "quality",
          parentDynamicDispatch: accessibleImageInputDispatch,
          step: 1,
          validValueAction: accessibleImageInputAction.setQualities,
          value: qualities[index],
        }}
      />
    );

    const imageOrientationSlider = (
      <AccessibleSliderInput
        attributes={{
          index,
          label: (value) => displayOrientationLabel(value),
          marks: IMG_ORIENTATION_SLIDER_DATA,
          max: 8,
          min: 1,
          name: "orientation",
          parentDynamicDispatch: accessibleImageInputDispatch,
          step: 1,
          validValueAction: accessibleImageInputAction.setOrientations,
          value: orientations[index],
        }}
      />
    );

    return (
      <Stack w={350}>
        {img}
        <Group>
          {imageSize}
          {imageType}
        </Group>
        <Stack>
          {imageQualitySlider}
          <Space h="md" />
          {imageOrientationSlider}
        </Stack>
        <Group>
          {removeButton}
          {resetButton}
        </Group>
      </Stack>
    );
  });

  return (
    <Stack w={700}>
      {fileInput}
      {images}
    </Stack>
  );
}

export { AccessibleImageInput };
