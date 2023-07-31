import {
  Button,
  Divider,
  FileInput,
  Flex,
  Group,
  Image,
  Slider,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { compress } from 'image-conversion';
import { useEffect, useReducer } from 'react';
import { LuRotate3D } from 'react-icons/lu';
import { MdOutlineRemove, MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { TbTrash } from 'react-icons/tb';

import { useGlobalState } from '../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleErrorValidTextElementsForDynamicImageUploads,
  returnAccessibleErrorValidTextElementsForDynamicInputs,
} from '../../jsxCreators';
import {
  logState,
  returnImageValidationText,
  splitCamelCase,
} from '../../utils';
import { TextWrapper } from '../wrappers';
import {
  IMG_ORIENTATION_SLIDER_DATA,
  IMG_QUALITY_SLIDER_DATA,
  displayOrientation,
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
    scales,

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
            orientation: orientations[index],
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

  // // compress image on every slider change
  // useEffect(() => {
  //   async function compressImage() {
  //     await Promise.all(
  //       images.map(async (image, index) => {
  //         const compressedImage = await compress(image, {
  //           quality: (qualities[index] ?? 10) / 10,
  //           // orientation: orientations[index],
  //         });

  //         imageUploadDispatch({
  //           type: imageUploadAction.setImagePreviews,
  //           payload: {
  //             index,
  //             imagePreview: compressedImage,
  //           },
  //         });
  //       })
  //     );
  //   }

  //   compressImage();
  // }, [qualities]);

  // // orient image on every slider change
  // useEffect(() => {
  //   async function orientImage() {
  //     await Promise.all(
  //       images.map(async (image, index) => {
  //         const orientedImage = await compress(image, {
  //           quality: (qualities[index] ?? 10) / 10,
  //           orientation: orientations[index],
  //         });

  //         imageUploadDispatch({
  //           type: imageUploadAction.setImagePreviews,
  //           payload: {
  //             index,
  //             imagePreview: orientedImage,
  //           },
  //         });
  //       })
  //     );
  //   }

  //   orientImage();
  // }, [orientations]);

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
          {/* remove button */}
          <Flex w="100%" align="center" justify="center">
            <Button
              size="xs"
              aria-label="Click to remove image from selection"
              variant="outline"
              onClick={() => {
                imageUploadDispatch({
                  type: imageUploadAction.removeImage,
                  payload: index,
                });
              }}
              leftIcon={<TbTrash />}
            >
              Remove
            </Button>
          </Flex>

          {/* quality slider */}
          <Stack w="100%" p={padding}>
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

          {/* orientation slider */}
          <Stack w="100%" p={padding}>
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
              label={(value) => displayOrientation(value)}
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
