import { Card, Group, Image, LoadingOverlay, Stack, Text, Tooltip } from "@mantine/core";
import { compress, EImageType } from "image-conversion";
import localforage from "localforage";
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
import { GoldenGrid } from "../GoldenGrid";
import { createAccessibleButtons } from "../utils";
import { AccessibleImageInputAction, accessibleImageInputAction } from "./actions";
import { ALLOWED_FILE_EXTENSIONS_REGEX, MAX_IMAGE_SIZE, MAX_IMAGES } from "./constants";
import { accessibleImageInputReducer } from "./reducers";
import { initialAccessibleImageInputState } from "./state";
import { AccessibleImageInputAttributes, AccessibleImageInputProps } from "./types";
import { validateImages } from "./utils";

function AccessibleImageInput<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({ attributes }: AccessibleImageInputProps<ValidValueAction, InvalidValueAction>) {
  const {
    disabled,
    formData,
    invalidValueAction,
    maxImageSize = MAX_IMAGE_SIZE,
    maxImages = MAX_IMAGES,
    page,
    parentDispatch,
    stepperPages,
    validValueAction,
  } = attributes;

  const [accessibleImageInputState, accessibleImageInputDispatch] = useReducer(
    accessibleImageInputReducer,
    initialAccessibleImageInputState
  );

  const {
    currentImageIndex,
    imageFileBlobs,
    imagesBuffer,
    isLoading,
    orientations,
    qualities,
  } = accessibleImageInputState;

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

  const isMountedRetrieveImagesRef = useRef(false);
  useEffect(() => {
    isMountedRetrieveImagesRef.current = true;
    const isMounted = isMountedRetrieveImagesRef.current;

    async function retrieveImages(): Promise<void> {
      try {
        accessibleImageInputDispatch({
          action: accessibleImageInputAction.setIsLoading,
          payload: true,
        });

        const images = await localforage.getItem<Array<File | null>>("images");

        if (!isMounted) {
          return;
        }

        images?.forEach((image: File | null, index) => {
          if (!image) {
            return;
          }

          if (image.name !== imagesBuffer[index]?.name) {
            accessibleImageInputDispatch({
              action: accessibleImageInputAction.addImageToBuffer,
              payload: image,
            });
          }
        });

        accessibleImageInputDispatch({
          action: accessibleImageInputAction.setIsLoading,
          payload: false,
        });
      } catch (error: any) {
        if (!isMounted) {
          return;
        }

        showBoundary(error);
      }
    }

    if (formData === undefined) {
      retrieveImages();
    }

    return () => {
      isMountedRetrieveImagesRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isMountedStoreImagesRef = useRef(false);
  useEffect(() => {
    isMountedStoreImagesRef.current = true;
    const isMounted = isMountedStoreImagesRef.current;

    async function storeImages(): Promise<void> {
      try {
        const newImages = structuredClone(
          (await localforage.getItem<Array<File | null>>("images")) ?? []
        );
        if (!isMounted || newImages.length === imagesBuffer.length) {
          return;
        }

        if (newImages.length > imagesBuffer.length) {
          newImages.pop();
        }

        newImages.push(imagesBuffer.at(-1) ?? new File([], "image"));
        await localforage.setItem("images", newImages);
      } catch (error: any) {
        showBoundary(error);
      }
    }

    storeImages();

    return () => {
      isMountedStoreImagesRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesBuffer.length]);

  const isMountedModifyImagesRef = useRef(false);
  useEffect(() => {
    isMountedModifyImagesRef.current = true;
    const isMounted = isMountedModifyImagesRef.current;

    async function modifyImage(): Promise<void> {
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

        const { areImagesInvalid } = validateImages({
          allowedFileExtensionsRegex: ALLOWED_FILE_EXTENSIONS_REGEX,
          imageFileBlobs,
          maxImages,
          maxImageSize,
        });

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

    modifyImage();

    return () => {
      isMountedModifyImagesRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImageIndex, qualities, orientations]);

  const fileInput = (
    <AccessibleFileInput<AccessibleImageInputAction["addImageToBuffer"]>
      attributes={{
        disabled,
        name: "images",
        onChange: async (_file: File | null) => {
          parentDispatch({
            action: validValueAction,
            payload: imageFileBlobs.reduce<FormData>(
              (formDataAcc, imageFileBlob, index) => {
                if (imageFileBlob) {
                  formDataAcc.append("file", imageFileBlob, imagesBuffer[index].name);
                }

                return formDataAcc;
              },
              new FormData()
            ),
          });
        },
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
        kind: "delete",
        name: "remove",
        onClick: async (
          _event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          const images = await localforage.getItem<Array<File | null>>("images");
          images?.splice(index, 1);
          await localforage.setItem("images", images);

          accessibleImageInputDispatch({
            action: accessibleImageInputAction.removeImageFromBuffer,
            payload: index,
          });
        },
      },
      {
        disabled: isImageTypeInvalid,
        disabledScreenreaderText: "Image is invalid",
        enabledScreenreaderText: "Reset image",
        kind: "refresh",
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
          disabled: isImageTypeInvalid,
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
      <Stack spacing="xl">
        {imageQualitySlider}
        <Group position="center">
          <Text>Quality</Text>
        </Group>
      </Stack>
    );

    const imageOrientationSlider = (
      <AccessibleSliderInput
        attributes={{
          disabled: isImageTypeInvalid,
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

    const imageOrientationStack = (
      <Stack spacing="xl">
        {imageOrientationSlider}
        <Group position="center">
          <Text>Orientation</Text>
        </Group>
      </Stack>
    );

    return (
      <Card
        w={325}
        style={{ outline: borderColor, borderRadius: 4 }}
        key={`${index}-${imagesBuffer[index]?.name}`}
      >
        <Stack spacing="xl">
          {img}
          {isImageInvalid ? invalidScreenreaderTextElement : validScreenreaderTextElement}
          <Stack>
            {imageName}
            {imageSize}
            {imageType}
          </Stack>
          <GoldenGrid>
            {removeButtonWithTooltip}
            {resetButtonWithTooltip}
          </GoldenGrid>
          <Stack spacing="xl">
            {imageQualityStack}
            {imageOrientationStack}
          </Stack>
        </Stack>
      </Card>
    );
  });

  const loadingOverlay = <LoadingOverlay visible={isLoading} />;

  return (
    <Stack w={700}>
      {loadingOverlay}
      {fileInput}
      {fileBlobCards}
    </Stack>
  );
}

export { AccessibleImageInput };
