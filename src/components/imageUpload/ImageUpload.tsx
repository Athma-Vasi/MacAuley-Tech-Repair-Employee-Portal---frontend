import {
  Accordion,
  FileInput,
  Flex,
  Group,
  Image,
  Slider,
  Space,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { compress } from 'image-conversion';
import { useEffect, useReducer } from 'react';
import { BiReset } from 'react-icons/bi';
import { LuRotate3D } from 'react-icons/lu';
import { TbTrash } from 'react-icons/tb';

import { useGlobalState } from '../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleErrorValidTextElementsForDynamicImageUploads,
} from '../../jsxCreators';
import { logState, returnImageValidationText } from '../../utils';
import { TextWrapper } from '../wrappers';
import {
  displayOrientationLabel,
  IMG_ORIENTATION_SLIDER_DATA,
  IMG_QUALITY_SLIDER_DATA,
} from './constants';
import {
  imageUploadAction,
  imageUploadReducer,
  initialImageUploadState,
} from './state';
import { ImageUploadProps } from './types';

function ImageUpload({
  style = {},
  maxImageSize,
  maxImages,
}: ImageUploadProps) {
  const [imageUploadState, imageUploadDispatch] = useReducer(
    imageUploadReducer,
    initialImageUploadState
  );
  const {
    images,
    imagePreviews,
    imageCount,

    areValidImageSizes,
    areValidImageKinds,
    areValidImageTypes,
    areImagesFocused,

    qualities,
    orientations,

    isError,
    errorMessage,
    isLoading,
    loadingMessage,
    isSuccess,
    successMessage,
    isSubmitting,
    submitMessage,
  } = imageUploadState;
  const {
    globalState: { padding, rowGap, width },
  } = useGlobalState();

  // validate image sizes on every image upload
  useEffect(() => {
    imagePreviews.forEach((image, index) => {
      const imageIsValidSize = image.size <= maxImageSize;
      imageUploadDispatch({
        type: imageUploadAction.setAreValidImageSizes,
        payload: {
          index,
          value: imageIsValidSize,
        },
      });
    });
  }, [imagePreviews, maxImageSize]);

  // validate image kinds on every image upload
  useEffect(() => {
    imagePreviews.forEach((image, index) => {
      const imageIsValidKind = image.type.split('/')[0] === 'image';
      imageUploadDispatch({
        type: imageUploadAction.setAreValidImageKinds,
        payload: {
          index,
          value: imageIsValidKind,
        },
      });
    });
  }, [imagePreviews]);

  // validate image types on every image upload
  useEffect(() => {
    const validImageTypes = new Set(['jpeg', 'png', 'gif']);

    imagePreviews.forEach((image, index) => {
      const imageIsValidType = validImageTypes.has(image.type.split('/')[1]);
      imageUploadDispatch({
        type: imageUploadAction.setAreValidImageTypes,
        payload: {
          index,
          value: imageIsValidType,
        },
      });
    });
  }, [imagePreviews]);

  // compress, orient image on every slider change
  useEffect(() => {
    async function modifyImage() {
      await Promise.all(
        images.map(async (image, index) => {
          const modifiedImage = await compress(image, {
            quality: (qualities[index] ?? 10) / 10,
            orientation: orientations[index] ?? 1,
          });

          imageUploadDispatch({
            type: imageUploadAction.setImagePreviews,
            payload: {
              index,
              imagePreview: modifiedImage,
            },
          });
        })
      );
    }

    modifyImage();
  }, [qualities, orientations]);

  const [imageFileUploadErrorTexts, imageFileUploadValidTexts] =
    returnAccessibleErrorValidTextElementsForDynamicImageUploads({
      areValidImageKinds,
      areValidImageSizes,
      areValidImageTypes,
      images,
      imagePreviews,
      semanticName: 'image',
      validationFunction: returnImageValidationText,
    });

  const createdImageUploadFileInput = (
    <Flex p={padding} w="100%" align="center" justify="center">
      <FileInput
        disabled={imageCount >= maxImages}
        label="Upload image"
        onChange={(file) => {
          if (!file) {
            return;
          }

          imageUploadDispatch({
            type: imageUploadAction.setImageCount,
            payload: imageCount + 1,
          });
          imageUploadDispatch({
            type: imageUploadAction.setImages,
            payload: {
              index: imageCount,
              image: file,
            },
          });
          imageUploadDispatch({
            type: imageUploadAction.setImagePreviews,
            payload: {
              index: imageCount,
              imagePreview: file,
            },
          });
        }}
        placeholder="Click to upload image"
        value={images[imageCount]}
        w="62%"
      />
    </Flex>
  );

  const createdImagePreview = Array.from({ length: imageCount }).map(
    (_, index) => {
      const imagePreview = (
        <Image
          maw={382}
          mx="auto"
          radius="sm"
          //   src={`data:${images[index]?.arrayBuffer};base64,${images[index]}`}
          // src={`${URL.createObjectURL(images[index])}`}
          src={
            areValidImageKinds[index]
              ? URL.createObjectURL(imagePreviews[index])
              : undefined
          }
          alt={areValidImageKinds[index] ? images[index].name : 'Invalid kind'}
          withPlaceholder
          placeholder={
            <Flex
              align="center"
              justify="center"
              style={{
                height: '100%',
                width: '100%',
              }}
            >
              <Text size="sm">Invalid image</Text>
            </Flex>
          }
        />
      );

      const [createdResetButton, createdRemoveButton] =
        returnAccessibleButtonElements([
          {
            buttonLabel: 'Reset',
            semanticDescription: 'Reset image to default values',
            semanticName: 'reset image button',
            leftIcon: <BiReset />,
            buttonOnClick: () => {
              imageUploadDispatch({
                type: imageUploadAction.setQualities,
                payload: {
                  index,
                  value: 10,
                },
              });
              imageUploadDispatch({
                type: imageUploadAction.setOrientations,
                payload: {
                  index,
                  value: 1,
                },
              });
            },
          },
          {
            buttonLabel: 'Remove',
            semanticDescription: 'Remove image from selection',
            semanticName: 'remove image button',
            leftIcon: <TbTrash />,
            buttonOnClick: () => {
              imageUploadDispatch({
                type: imageUploadAction.removeImage,
                payload: index,
              });
            },
          },
        ]);

      return (
        <Stack
          key={`${index}-${images[index]?.name}-${imageCount}`}
          w={375}
          p={padding}
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
          }}
        >
          {imagePreview}
          <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            rowGap={rowGap}
          >
            {imageFileUploadErrorTexts[index]}
            {imageFileUploadValidTexts[index]}
          </Flex>
          {/* image name */}
          <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            rowGap={rowGap}
            style={{
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <TextWrapper creatorInfoObj={{}}>Name: </TextWrapper>
            <TextWrapper creatorInfoObj={{}}>
              <Tooltip label={images[index].name}>
                <Group>
                  {images[index].name.length > 17
                    ? `${images[index].name.slice(0, 17)}...`
                    : images[index].name}
                </Group>
              </Tooltip>
            </TextWrapper>
          </Flex>
          {/* image size */}
          <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            style={{
              borderBottom: areValidImageSizes[index]
                ? '1px solid #e0e0e0'
                : '1px solid red',
            }}
          >
            <TextWrapper creatorInfoObj={{}}>Size: </TextWrapper>
            <TextWrapper creatorInfoObj={{}}>
              {(imagePreviews[index].size / 1_000).toFixed(2)} KB
            </TextWrapper>
          </Flex>
          {/* image kind */}
          <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            style={{
              borderBottom: areValidImageKinds[index]
                ? '1px solid #e0e0e0'
                : '1px solid red',
            }}
          >
            <TextWrapper creatorInfoObj={{}}>Kind: </TextWrapper>
            <TextWrapper creatorInfoObj={{}}>
              {images[index].type.split('/')[0]}
            </TextWrapper>
          </Flex>
          {/* image type */}
          <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            style={{
              borderBottom: areValidImageTypes[index]
                ? '1px solid #e0e0e0'
                : '1px solid red',
            }}
          >
            <TextWrapper creatorInfoObj={{}}>Type: </TextWrapper>
            <TextWrapper creatorInfoObj={{}}>
              {images[index].type.split('/')[1]}
            </TextWrapper>
          </Flex>
          <Group w="100%" position="apart">
            {createdResetButton}
            {createdRemoveButton}
          </Group>

          {/* quality slider */}
          <Accordion w="100%" pb={padding}>
            <Accordion.Item
              value={
                areValidImageKinds[index] || areValidImageTypes[index]
                  ? 'Adjust compression and orientation'
                  : 'Can only modify images'
              }
            >
              <Accordion.Control
                disabled={
                  !areValidImageKinds[index] || !areValidImageTypes[index]
                }
                w="100%"
              >
                <Text size="sm" color="dark">
                  {areValidImageKinds[index] || areValidImageTypes[index]
                    ? 'Adjust compression and orientation'
                    : 'Can only modify images'}
                </Text>
              </Accordion.Control>
              <Accordion.Panel w="100%" pb={padding}>
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  w="100%"
                  rowGap={rowGap}
                >
                  <Stack w="100%">
                    <TextWrapper creatorInfoObj={{}}>Quality: </TextWrapper>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      marks={IMG_QUALITY_SLIDER_DATA}
                      value={qualities[index] ?? 10}
                      onChange={(value) => {
                        imageUploadDispatch({
                          type: imageUploadAction.setQualities,
                          payload: {
                            index,
                            value,
                          },
                        });
                      }}
                    />
                  </Stack>
                  <Space h="xl" />

                  {/* orientation slider */}
                  <Stack w="100%">
                    <Text size="sm" color="dark">
                      {!qualities[index] || qualities[index] >= 8
                        ? 'To enable orientation slider, set quality to less than 80%'
                        : 'Orientation:'}
                    </Text>
                    <Slider
                      showLabelOnHover
                      disabled={!qualities[index] || qualities[index] >= 8}
                      min={1}
                      max={8}
                      step={1}
                      marks={IMG_ORIENTATION_SLIDER_DATA}
                      label={(value) => displayOrientationLabel(value)}
                      value={orientations[index] ?? 1}
                      onChange={(value) => {
                        imageUploadDispatch({
                          type: imageUploadAction.setOrientations,
                          payload: {
                            index,
                            value,
                          },
                        });
                      }}
                      thumbChildren={<LuRotate3D />}
                    />
                  </Stack>
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Stack>
      );
    }
  );

  const displayImagePreviews = (
    <Flex
      align="flex-start"
      justify="flex-start"
      w="100%"
      wrap="wrap"
      p={padding}
      columnGap={rowGap}
      rowGap="xl"
    >
      {createdImagePreview}
    </Flex>
  );

  useEffect(() => {
    logState({
      state: imageUploadState,
      groupLabel: 'ImageUpload',
    });
  }, [imageUploadState]);

  return (
    <Stack
      w="100%"
      style={{
        ...style,
        backgroundColor: '#fff',
        borderRadius: '4px',
      }}
    >
      {displayImagePreviews}
      {createdImageUploadFileInput}
    </Stack>
  );
}

export { ImageUpload };

/**
 *  const createdImageUploadFileInput = Array.from({
    length: imageCount + 1,
  }).map((_, index) => {
    const fileInput = (
      <FileInput
        label="Upload image"
        placeholder="Click to upload image"
        value={images[index]}
        onChange={(file) => {
          imageUploadDispatch({
            type: imageUploadAction.setImages,
            payload: {
              index,
              image: file as File,
            },
          });

          imageUploadDispatch({
            type: imageUploadAction.setImagePreviews,
            payload: {
              index,
              imagePreview: URL.createObjectURL(file as File),
            },
          });
        }}
      />
    );

    return fileInput;
  });
 */

/**
   * const imageSizes = await Promise.all(
        images.map(async (image) => {
          const compressedImage = await compress(image, {
            quality: qualities[imageCount],
            orientation: orientations[imageCount],
            scale: scales[imageCount],
          });

          return compressedImage.size;
        })
      );
   */

/**
       * const compressedImage = await imageCompression(image, {
        maxSizeMB: qualities[index],
        maxWidthOrHeight: scales[index],
        useWebWorker: true,
        initialQuality: 1,
        minQuality: 0.1,
      });
       */
