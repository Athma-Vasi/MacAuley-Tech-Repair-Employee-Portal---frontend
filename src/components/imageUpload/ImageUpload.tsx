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
import localforage from 'localforage';
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
import { ImageUploadLocalForage, ImageUploadProps } from './types';

/**
 *  TODO: when user logs out, flush localforage
 */

function ImageUpload({
  isParentComponentFormSubmitted,
  maxImageSize,
  maxImages,
  parentComponentName,
  setImgFormDataArray,
  setImgFormDataArrayDispatch,
  setAreImagesValid,
  setAreImagesValidDispatch,
  style = {},
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
    globalState: { padding, rowGap },
  } = useGlobalState();

  // set localforage imageupload state to initial state on every mount
  useEffect(() => {
    async function getImageUploadState() {
      const imageUploadState =
        await localforage.getItem<ImageUploadLocalForage>(
          `${parentComponentName}-imageUploadState`
        );

      if (imageUploadState) {
        const { imageCount, images, imagePreviews, orientations, qualities } =
          imageUploadState;

        imageUploadDispatch({
          type: imageUploadAction.setImageCount,
          payload: imageCount,
        });

        images.forEach((image, index) => {
          imageUploadDispatch({
            type: imageUploadAction.setImages,
            payload: {
              index,
              image,
            },
          });
        });

        imagePreviews.forEach((imagePreview, index) => {
          imageUploadDispatch({
            type: imageUploadAction.setImagePreviews,
            payload: {
              index,
              imagePreview,
            },
          });
        });

        orientations.forEach((orientation, index) => {
          imageUploadDispatch({
            type: imageUploadAction.setOrientations,
            payload: {
              index,
              value: orientation,
            },
          });
        });

        qualities.forEach((quality, index) => {
          imageUploadDispatch({
            type: imageUploadAction.setQualities,
            payload: {
              index,
              value: quality,
            },
          });
        });
      }
    }

    getImageUploadState();
  }, []);

  // stored in localforage to persist across component unmounts
  useEffect(() => {
    localforage.setItem(`${parentComponentName}-imageUploadState`, {
      imageCount,
      images,
      imagePreviews,
      qualities,
      orientations,
    });
  }, [
    imageCount,
    images,
    imagePreviews,
    qualities,
    orientations,
    parentComponentName,
  ]);

  // flush local forage when parent component submits form
  useEffect(() => {
    if (isParentComponentFormSubmitted) {
      localforage.removeItem(`${parentComponentName}-imageUploadState`);
    }
  }, [isParentComponentFormSubmitted, parentComponentName]);

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

  // dispatch image validation state to parent component on every change
  useEffect(() => {
    const areImagesValid =
      areValidImageSizes.every((isValid) => isValid) &&
      areValidImageKinds.every((isValid) => isValid) &&
      areValidImageTypes.every((isValid) => isValid);

    setAreImagesValidDispatch({
      type: setAreImagesValid,
      payload: areImagesValid,
    });
  }, [
    areValidImageSizes,
    areValidImageKinds,
    areValidImageTypes,
    setAreImagesValidDispatch,
    setAreImagesValid,
  ]);

  // compress, orient image on every slider change
  useEffect(() => {
    async function modifyImage() {
      await Promise.all(
        images.map(async (image, index) => {
          if (!qualities[index] && !orientations[index]) {
            return;
          }
          if (!areValidImageKinds[index] || !areValidImageTypes[index]) {
            return;
          }

          const modifiedImage = await compress(image, {
            quality: (qualities[index] ?? 8) / 10,
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

  // on every change to image previews or images, set and dispatch formdata
  useEffect(() => {
    // if images are not valid, do not set formdata
    if (
      !areValidImageSizes.every((isValid) => isValid) ||
      !areValidImageKinds.every((isValid) => isValid) ||
      !areValidImageTypes.every((isValid) => isValid)
    ) {
      return;
    }

    const formDataArray = imagePreviews.reduce(
      (formDataArray: FormData[], image, idx) => {
        const formData = new FormData();
        // because the Blob type returned by compress() does not have a name property
        formData.append('file', image, images[idx].name);

        formDataArray.push(formData);
        return formDataArray;
      },
      []
    );

    formDataArray.forEach((formData, idx) => {
      formData.forEach((value, key) => {
        console.log(`formDataArray[${idx}][${key}] = ${value}`);
      });
    });

    setImgFormDataArrayDispatch({
      type: setImgFormDataArray,
      payload: formDataArray,
    });
  }, [images, imagePreviews]);

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
        label={
          imageCount >= maxImages ? (
            <Text size="sm" color="dark">
              Max image count reached
            </Text>
          ) : (
            <Text size="sm" color="dark">
              {`Upload an image. Space available: ${maxImages - imageCount}`}
            </Text>
          )
        }
        onChange={(file) => {
          if (!file || file.size > 10_000_000) {
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
        placeholder="Click to select image"
        value={images[imageCount]}
        w="62%"
      />
    </Flex>
  );

  const createdImagePreview = Array.from({ length: imagePreviews.length }).map(
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
            buttonDisabled:
              !areValidImageKinds[index] || !areValidImageTypes[index],
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
            <Tooltip
              label={
                !areValidImageKinds[index] || !areValidImageTypes[index]
                  ? 'Please select a valid image'
                  : `Reset values of ${images[index].name} to default`
              }
            >
              <Group>{createdResetButton}</Group>
            </Tooltip>
            <Tooltip label={`Remove ${images[index].name} from selection`}>
              <Group>{createdRemoveButton}</Group>
            </Tooltip>
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
                      max={8}
                      step={1}
                      marks={IMG_QUALITY_SLIDER_DATA}
                      value={qualities[index] ?? 8}
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
      {createdImageUploadFileInput}
      {displayImagePreviews}
    </Stack>
  );
}

export { ImageUpload };
