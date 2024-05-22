import { Card, Grid, Group, Image, Space, Stack, Text, Tooltip } from "@mantine/core";
import { compress, EImageType } from "image-conversion";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { BiReset } from "react-icons/bi";
import { TbCheck, TbExclamationCircle, TbTrash } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../../constants/data";
import { useGlobalState } from "../../../hooks";
import { logState, returnThemeColors } from "../../../utils";
import {
  displayOrientationLabel,
  IMG_ORIENTATION_SLIDER_DATA,
  IMG_QUALITY_SLIDER_DATA,
} from "../../imageUpload/constants";
import { AccessibleFileInput } from "../AccessibleFileInput";
import { AccessibleSliderInput } from "../AccessibleSliderInput";
import { createAccessibleButtons } from "../utils";
import { AccessibleImageInputAction, accessibleImageInputAction } from "./actions";
import { ALLOWED_FILE_EXTENSIONS_REGEX, MAX_IMAGE_SIZE, MAX_IMAGES } from "./constants";
import { accessibleImageInputReducer } from "./reducers";
import { initialAccessibleImageInputState } from "./state";
import { AccessibleImageInputAttributes } from "./types";
import { GoldenGrid } from "../GoldenGrid";

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

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const { showBoundary } = useErrorBoundary();

  const {
    generalColors: { redColorShade, textColor, greenColorShade },
    appThemeColors: { borderColor },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

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

        const fileBlob: Blob = await compress(imageToModify, {
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
          if (size > maxImageSize) {
            return true;
          }

          if (!type.length) {
            return true;
          }

          const extension = type.split("/")[1];
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
              formDataAcc.append("images", imageFileBlob, imagesBuffer[index].name);
            }

            return formDataAcc;
          },
          new FormData()
        );

        parentDispatch({
          action: validValueAction,
          payload: formData,
        });

        console.log("formData.getAll(images)", formData.getAll("images"));
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

  const fileBlobCards = imageFileBlobs.map((fileBlob: File | Blob | null, index) => {
    const { size, type } = fileBlob ?? new Blob([]);

    const isImageSizeInvalid = size > maxImageSize;
    const isImageTypeInvalid = !ALLOWED_FILE_EXTENSIONS_REGEX.test(type.split("/")[1]);
    const isImageInvalid = isImageSizeInvalid || isImageTypeInvalid;

    const validScreenreaderTextElement = (
      <GoldenGrid>
        <Group position="right">
          <TbCheck color={greenColorShade} size={22} />
        </Group>
        <Text color={greenColorShade} aria-live="polite">
          Image is valid
        </Text>
      </GoldenGrid>
    );
    const invalidImageDescription = isImageSizeInvalid
      ? `Image is too large. Must be less than ${maxImageSize / 1000} KB.`
      : !ALLOWED_FILE_EXTENSIONS_REGEX.test(type.split("/")[1])
      ? "Image contains disallowed file type. Must only contain .jpg, .jpeg or .png file types."
      : "Image is invalid.";

    const invalidScreenreaderTextElement = (
      <GoldenGrid>
        <Group position="right">
          <TbExclamationCircle color={redColorShade} size={22} />
        </Group>
        <Text color={redColorShade} aria-live="polite">
          {invalidImageDescription}
        </Text>
      </GoldenGrid>
    );

    const img = (
      <Image
        alt={isImageInvalid ? "Invalid image" : imagesBuffer[index]?.name ?? "Image"}
        key={index}
        maw={300}
        src={URL.createObjectURL(fileBlob ?? new Blob([]))}
        withPlaceholder
      />
    );

    const imageName = (
      <GoldenGrid>
        <Text color={textColor}>Name:</Text>
        <Text color={textColor}>{imagesBuffer[index]?.name ?? "Image"}</Text>
      </GoldenGrid>
    );

    const imageSizeColor = isImageSizeInvalid ? redColorShade : textColor;
    const imageSize = (
      <GoldenGrid>
        <Text color={imageSizeColor}>Size:</Text>
        <Text color={imageSizeColor}>{Math.round(size / 1000)} KB</Text>
      </GoldenGrid>
    );

    const imageTypeColor = isImageTypeInvalid ? redColorShade : textColor;
    const imageType = (
      <GoldenGrid>
        <Text color={imageTypeColor}>Type:</Text>
        <Text color={imageTypeColor}>
          {type.length
            ? type.split("/")[1]
            : imagesBuffer[index]?.name.split(".")[1] ?? "Unknown"}
        </Text>
      </GoldenGrid>
    );

    const [removeButton, resetButton] = createAccessibleButtons([
      {
        disabledScreenreaderText: "Image is invalid",
        enabledScreenreaderText: "Remove image",
        leftIcon: <TbTrash />,
        name: "remove",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          accessibleImageInputDispatch({
            action: accessibleImageInputAction.removeImageFromBuffer,
            payload: index,
          });
        },
      },
      {
        disabled: isImageInvalid,
        disabledScreenreaderText: "Image is invalid",
        enabledScreenreaderText: "Reset image",
        leftIcon: <BiReset />,
        name: "reset",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          accessibleImageInputDispatch({
            action: accessibleImageInputAction.resetImageFileBlob,
            payload: index,
          });
        },
      },
    ]);

    const removeButtonWithTooltip = isImageInvalid ? (
      <Tooltip label={`${imageName} is invalid`}>{removeButton}</Tooltip>
    ) : (
      removeButton
    );

    const resetButtonWithTooltip = isImageInvalid ? (
      <Tooltip label={invalidImageDescription}>{resetButton}</Tooltip>
    ) : (
      resetButton
    );

    const imageQualitySlider = (
      <AccessibleSliderInput
        attributes={{
          disabled: isImageInvalid,
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

    const imageQualityStack = (
      <Stack spacing="md">
        {imageQualitySlider}
        <Group position="center">
          <Text>Quality</Text>
        </Group>
      </Stack>
    );

    const imageOrientationSlider = (
      <AccessibleSliderInput
        attributes={{
          disabled: isImageInvalid || qualities[index] > 7,
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

    const imageOrientationSliderWithTooltip =
      qualities[index] > 7 ? (
        <Tooltip label="Quality must be less than 80% to rotate image">
          <Group>{imageOrientationSlider}</Group>
        </Tooltip>
      ) : (
        imageOrientationSlider
      );

    const imageOrientationStack = (
      <Stack spacing="md">
        {imageOrientationSliderWithTooltip}
        <Group position="center">
          <Text>Orientation</Text>
        </Group>
      </Stack>
    );

    return (
      <Card w={325} style={{ outline: borderColor, borderRadius: 4 }}>
        <Stack spacing="sm">
          {img}
          {isImageInvalid ? invalidScreenreaderTextElement : validScreenreaderTextElement}
          <Stack>
            {imageName}
            {imageSize}
            {imageType}
          </Stack>
          <Group w="100%" position="apart">
            <Group position="left">{removeButtonWithTooltip}</Group>
            <Group position="right">{resetButtonWithTooltip}</Group>
          </Group>
          <Stack spacing="sm" style={{ outline: "1px solid blue" }}>
            {imageQualityStack}
            {imageOrientationStack}
          </Stack>
        </Stack>
      </Card>
    );
  });

  return (
    <Stack w={700}>
      {fileInput}
      {fileBlobCards}
    </Stack>
  );
}

export { AccessibleImageInput };
