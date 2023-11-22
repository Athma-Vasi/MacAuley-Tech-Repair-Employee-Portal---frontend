import { Group, Stack, Text, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InvalidTokenError } from 'jwt-decode';
import { ChangeEvent, MouseEvent, useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { TbPlus, TbTrash, TbUpload } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../../../constants/data';
import {
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
  SERIAL_ID_REGEX,
} from '../../../../constants/regex';
import { globalAction } from '../../../../context/globalProvider/state';
import { useGlobalState, useWrapFetch } from '../../../../hooks';
import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../../jsxCreators';
import { Currency, ResourceRequestServerResponse } from '../../../../types';
import {
  returnBrandNameValidationText,
  returnColorVariantValidationText,
  returnDimensionsValidationText,
  returnFloatAmountValidationText,
  returnFormReviewObjectsFromUserDefinedFields,
  returnGrammarValidationText,
  returnLargeIntegerValidationText,
  returnObjectKeyValidationText,
  returnSerialIdValidationText,
  returnThemeColors,
  returnUserDefinedFieldValueValidationText,
  returnWeightValidationText,
  urlBuilder,
} from '../../../../utils';
import { CURRENCY_DATA } from '../../../benefits/constants';
import FormReviewPage, {
  FormReviewObjectArray,
} from '../../../formReviewPage/FormReviewPage';
import { ImageUpload } from '../../../imageUpload';
import { NotificationModal } from '../../../notificationModal';
import {
  AccessibleTextAreaInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../../../wrappers';
import {
  ACCESSORY_TYPE_REGEX,
  BRAND_REGEX,
  COLOR_VARIANT_REGEX,
  CREATE_PRODUCT_DESCRIPTION_OBJECTS,
  CREATE_PRODUCT_MAX_IMG_AMOUNT,
  CREATE_PRODUCT_MAX_IMG_SIZE,
  CREATE_PRODUCT_MAX_STEPPER_POSITION,
  DIMENSION_UNIT_SELECT_INPUT_DATA,
  DIMENSIONS_REGEX,
  LARGE_INTEGER_REGEX,
  OBJECT_KEY_REGEX,
  PERIPHERALS_INTERFACE_DATA,
  PRODUCT_AVAILABILITY_DATA,
  USER_DEFINED_VALUE_REGEX,
  WEIGHT_REGEX,
  WEIGHT_UNIT_SELECT_INPUT_DATA,
} from '../../constants';
import {
  DimensionUnit,
  MerchandiseAvailability,
  PeripheralsInterface,
  WeightUnit,
} from '../../create/types';
import {
  createAccessoryAction,
  createAccessoryReducer,
  initialCreateAccessoryState,
} from './state';
import { AccessoryDocument } from './types';

function CreateAccessory() {
  const [createAccessoryState, createAccessoryDispatch] = useReducer(
    createAccessoryReducer,
    initialCreateAccessoryState
  );

  const {
    globalDispatch,
    globalState: { padding, themeObject },
  } = useGlobalState();

  const { wrappedFetch } = useWrapFetch();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [
    openedSubmitSuccessNotificationModal,
    {
      open: openSubmitSuccessNotificationModal,
      close: closeSubmitSuccessNotificationModal,
    },
  ] = useDisclosure(false);

  const {
    // page 1

    // page 1 -> brand
    brand,
    isBrandValid,
    isBrandFocused,
    // page 1 -> model, accessory category
    model,
    isModelValid,
    isModelFocused,
    // page 1 -> description
    description,
    isDescriptionValid,
    isDescriptionFocused,
    // page 1 -> price, currency, availability
    price,
    isPriceValid,
    isPriceFocused,
    currency,
    availability,
    // page 1 -> quantity
    quantity,
    isQuantityFocused,
    isQuantityValid,
    // page 1 -> weight
    weight,
    isWeightFocused,
    isWeightValid,
    weightUnit,
    // page 1 -> dimensions
    dimensionLength,
    isDimensionLengthFocused,
    isDimensionLengthValid,
    dimensionLengthUnit,
    dimensionWidth,
    isDimensionWidthFocused,
    isDimensionWidthValid,
    dimensionWidthUnit,
    dimensionHeight,
    isDimensionHeightFocused,
    isDimensionHeightValid,
    dimensionHeightUnit,
    // page 1 -> additional comments
    additionalComments,
    isAdditionalCommentsValid,
    isAdditionalCommentsFocused,

    // page 2 -> accessory
    accessoryType,
    isAccessoryTypeValid,
    isAccessoryTypeFocused,
    accessoryColor,
    isAccessoryColorFocused,
    isAccessoryColorValid,
    accessoryInterface,
    accessoryFieldsAdditional,
    areAccessoryFieldsAdditionalFocused,
    areAccessoryFieldsAdditionalValid,
    currentlySelectedAdditionalFieldIndex,

    // page 3
    imgFormDataArray,
    areImagesValid,

    // misc.
    triggerFormSubmit,
    currentStepperPosition,
    stepsInError,

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
  } = createAccessoryState;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function imagesUploadRequest() {
      if (imgFormDataArray.length === 0) {
        return;
      }

      createAccessoryDispatch({
        type: createAccessoryAction.setIsSubmitting,
        payload: true,
      });
      createAccessoryDispatch({
        type: createAccessoryAction.setSubmitMessage,
        payload: 'File uploads are being processed...',
      });
      openSubmitSuccessNotificationModal();

      await Promise.all(
        imgFormDataArray.map(async (formData) => {
          const fileUploadUrl: URL = urlBuilder({
            path: 'file-upload',
          });

          const imgUpLoadRequestInit: RequestInit = {
            method: 'POST',
            headers: {
              Authorization: '', // will be added in wrappedFetch
            },
            body: formData,
          };

          try {
            const imgUploadResponse: Response = await wrappedFetch({
              isMounted,
              requestInit: imgUpLoadRequestInit,
              signal: controller.signal,
              url: fileUploadUrl,
            });

            const imgUploadResponseData: {
              message: string;
              documentId: string;
            } = await imgUploadResponse.json();

            if (!isMounted) {
              return;
            }
            if (!imgUploadResponse.ok) {
              throw new Error(
                imgUploadResponseData.message ??
                  'File uploads failed. Please try again.'
              );
            }

            createAccessoryDispatch({
              type: createAccessoryAction.setIsSubmitting,
              payload: false,
            });
            createAccessoryDispatch({
              type: createAccessoryAction.setSubmitMessage,
              payload: '',
            });

            createAccessoryDispatch({
              type: createAccessoryAction.setIsSuccessful,
              payload: true,
            });
            createAccessoryDispatch({
              type: createAccessoryAction.setSuccessMessage,
              payload:
                imgUploadResponseData.message ?? 'File uploads successful.',
            });

            return imgUploadResponseData;
          } catch (error: any) {
            if (!isMounted || error.name === 'AbortError') {
              return;
            }

            const errorMessage =
              error instanceof InvalidTokenError
                ? 'Invalid token. Please login again.'
                : !error.response
                ? 'Network error. Please try again.'
                : error?.message ?? 'Unknown error occurred. Please try again.';

            globalDispatch({
              type: globalAction.setErrorState,
              payload: {
                isError: true,
                errorMessage,
                errorCallback: () => {
                  navigate('/home');

                  globalDispatch({
                    type: globalAction.setErrorState,
                    payload: {
                      isError: false,
                      errorMessage: '',
                      errorCallback: () => {},
                    },
                  });
                },
              },
            });

            showBoundary(error);
          }
        })
      ).then((imgUploadResponseData) => {
        if (!imgUploadResponseData) {
          return;
        }

        async function createAccessoryFormRequest() {
          createAccessoryDispatch({
            type: createAccessoryAction.setIsSubmitting,
            payload: true,
          });
          createAccessoryDispatch({
            type: createAccessoryAction.setSubmitMessage,
            payload: `Creating ${model} accessory...`,
          });

          const createAccessoryUrl: URL = urlBuilder({
            path: 'actions/dashboard/accessory/accessory',
          });

          // request body

          // request body -> page 1
          const page1RequestBody = {
            brand,
            model,
            price,
            currency,
            availability,
            quantity,
            weight,
            weightUnit,
            length: dimensionLength,
            lengthUnit: dimensionLengthUnit,
            width: dimensionWidth,
            widthUnit: dimensionWidthUnit,
            height: dimensionHeight,
            heightUnit: dimensionHeightUnit,
            description,
            additionalComments,
          };

          // request body -> page 2 -> accessory
          const accessoryFieldsAdditionalRequestBody = Array.from(
            accessoryFieldsAdditional
          ).reduce((acc, [_key, tuple]) => {
            const [field, value] = tuple;
            acc[field] = value;

            return acc;
          }, Object.create(null));

          const accessoryRequestBody = {
            accessoryType,
            accessoryColor,
            accessoryInterface,
            additionalFields: {
              ...accessoryFieldsAdditionalRequestBody,
            },
          };

          const createAccessoryRequestBody = JSON.stringify({
            accessory: {
              ...page1RequestBody,
              ...accessoryRequestBody,
              reviews: [],
              uploadedFilesIds: imgUploadResponseData
                .filter((item) => item !== undefined)
                .map((item) => item?.documentId),
            },
          });

          const createAccessoryRequestInit: RequestInit = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: createAccessoryRequestBody,
          };

          try {
            const createAccessoryResponse = await wrappedFetch({
              isMounted,
              requestInit: createAccessoryRequestInit,
              signal: controller.signal,
              url: createAccessoryUrl,
            });

            const createAccessoryResponseData: ResourceRequestServerResponse<AccessoryDocument> =
              await createAccessoryResponse.json();

            if (!isMounted) {
              return;
            }
            if (!createAccessoryResponse.ok) {
              throw new Error(createAccessoryResponseData.message);
            }

            createAccessoryDispatch({
              type: createAccessoryAction.setIsSuccessful,
              payload: true,
            });
            createAccessoryDispatch({
              type: createAccessoryAction.setSuccessMessage,
              payload:
                createAccessoryResponseData.message ??
                `Successfully created ${model} accessory.`,
            });
          } catch (error: any) {
            if (!isMounted || error.name === 'AbortError') {
              return;
            }

            const errorMessage =
              error instanceof InvalidTokenError
                ? 'Invalid token. Please login again.'
                : !error.response
                ? 'Network error. Please try again.'
                : error?.message ?? 'Unknown error occurred. Please try again.';

            globalDispatch({
              type: globalAction.setErrorState,
              payload: {
                isError: true,
                errorMessage,
                errorCallback: () => {
                  navigate('/home');

                  globalDispatch({
                    type: globalAction.setErrorState,
                    payload: {
                      isError: false,
                      errorMessage: '',
                      errorCallback: () => {},
                    },
                  });
                },
              },
            });

            showBoundary(error);
          } finally {
            if (isMounted) {
              createAccessoryDispatch({
                type: createAccessoryAction.setIsSubmitting,
                payload: false,
              });
              createAccessoryDispatch({
                type: createAccessoryAction.setSubmitMessage,
                payload: '',
              });
              createAccessoryDispatch({
                type: createAccessoryAction.setImgFormDataArray,
                payload: [],
              });
              createAccessoryDispatch({
                type: createAccessoryAction.setTriggerFormSubmit,
                payload: false,
              });
            }
          }
        }

        if (imgUploadResponseData.every((item) => item !== undefined)) {
          createAccessoryFormRequest();
        }
      });
    }

    if (triggerFormSubmit && imgFormDataArray.length > 0) {
      imagesUploadRequest();
    }

    return () => {
      controller.abort();
      isMounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ╭────────────────────────────────────────────────────────────────╮
  //  │  INPUT VALIDATION                                              │
  //  ╰────────────────────────────────────────────────────────────────╯
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  // page 1 -> brand
  useEffect(() => {
    const isValid = BRAND_REGEX.test(brand);

    createAccessoryDispatch({
      type: createAccessoryAction.setIsBrandValid,
      payload: isValid,
    });
  }, [brand]);

  // page 1 -> model
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(model);

    createAccessoryDispatch({
      type: createAccessoryAction.setIsModelValid,
      payload: isValid,
    });
  }, [model]);

  // page 1 -> description
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(description);

    createAccessoryDispatch({
      type: createAccessoryAction.setIsDescriptionValid,
      payload: isValid,
    });
  }, [description]);

  // page 1 -> price
  useEffect(() => {
    const isValid = MONEY_REGEX.test(price);

    createAccessoryDispatch({
      type: createAccessoryAction.setIsPriceValid,
      payload: isValid,
    });
  }, [price]);

  // page 1 -> quantity
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(quantity);

    createAccessoryDispatch({
      type: createAccessoryAction.setIsQuantityValid,
      payload: isValid,
    });
  }, [quantity]);

  // page 1 -> weight
  useEffect(() => {
    const isValid = WEIGHT_REGEX.test(weight);

    createAccessoryDispatch({
      type: createAccessoryAction.setIsWeightValid,
      payload: isValid,
    });
  }, [weight]);

  // page 1 -> dimension length
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(dimensionLength);

    createAccessoryDispatch({
      type: createAccessoryAction.setIsDimensionLengthValid,
      payload: isValid,
    });
  }, [dimensionLength]);

  // page 1 -> dimension width
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(dimensionWidth);

    createAccessoryDispatch({
      type: createAccessoryAction.setIsDimensionWidthValid,
      payload: isValid,
    });
  }, [dimensionWidth]);

  // page 1 -> dimension height
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(dimensionHeight);

    createAccessoryDispatch({
      type: createAccessoryAction.setIsDimensionHeightValid,
      payload: isValid,
    });
  }, [dimensionHeight]);

  // insert comma if currency is EUR
  useEffect(() => {
    // if currency is EUR, replace decimal with comma and remove leading zeros
    if (currency === 'EUR') {
      const priceWithCommaAndNoLeadingZero = price
        .replace('.', ',')
        .replace(/^0+(?=\d)/, ''); // removes leading zeros if amount !== '0.00'

      createAccessoryDispatch({
        type: createAccessoryAction.setPrice,
        payload: priceWithCommaAndNoLeadingZero,
      });
    }
    // if currency is not EUR, replace comma with decimal and remove leading zeros
    else {
      const priceWithDecimalAndNoLeadingZero = price
        .replace(',', '.')
        .replace(/^0+(?=\d)/, '');

      createAccessoryDispatch({
        type: createAccessoryAction.setPrice,
        payload: priceWithDecimalAndNoLeadingZero,
      });
    }
  }, [currency, price]);

  // page 1 -> additional comments
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalComments);

    createAccessoryDispatch({
      type: createAccessoryAction.setIsAdditionalCommentsValid,
      payload: isValid,
    });
  }, [additionalComments]);

  // page 2 -> user defined accessory fields
  useEffect(() => {
    const currentlyUpdatingAccessoryFieldAdditional =
      accessoryFieldsAdditional.get(currentlySelectedAdditionalFieldIndex);
    if (!currentlyUpdatingAccessoryFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingAccessoryFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);

    createAccessoryDispatch({
      type: createAccessoryAction.setAreAccessoryFieldsAdditionalValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createAccessoryDispatch({
      type: createAccessoryAction.setAreAccessoryFieldsAdditionalValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, accessoryFieldsAdditional]);

  // page 2 -> accessory type
  useEffect(() => {
    const isValid = ACCESSORY_TYPE_REGEX.test(accessoryType);

    createAccessoryDispatch({
      type: createAccessoryAction.setIsAccessoryTypeValid,
      payload: isValid,
    });
  }, [accessoryType]);

  // page 2 -> accessory color variant
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(accessoryColor);

    createAccessoryDispatch({
      type: createAccessoryAction.setIsAccessoryColorValid,
      payload: isValid,
    });
  }, [accessoryColor]);

  // stepper wrapper

  // update stepper wrapper state on every page 1 input validation change
  useEffect(() => {
    const arePage1RequiredInputsInError =
      !isBrandValid ||
      !isModelValid ||
      !isPriceValid ||
      !quantity ||
      !price ||
      !isDescriptionValid;

    const isPage1OptionalInputInError =
      additionalComments !== '' && !isAdditionalCommentsValid;

    const arePage1InputsInError =
      arePage1RequiredInputsInError || isPage1OptionalInputInError;

    createAccessoryDispatch({
      type: createAccessoryAction.setStepsInError,
      payload: {
        kind: arePage1InputsInError ? 'add' : 'delete',
        step: 0,
      },
    });
  }, [
    additionalComments,
    isAdditionalCommentsValid,
    isBrandValid,
    isDescriptionValid,
    isModelValid,
    isPriceValid,
    price,
    quantity,
  ]);

  // update stepper wrapper state on every page 2 input validation change
  useEffect(() => {
    // select inputs are not included as they always have a default value
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid

    const arePage2HardcodedInputsInError =
      !isAccessoryTypeValid || !isAccessoryColorValid;

    const arePage2UserDefinedFieldsInError = Array.from(
      areAccessoryFieldsAdditionalValid
    ).some(([_key, value]) => !value);

    const arePage2InputsInError =
      arePage2HardcodedInputsInError || arePage2UserDefinedFieldsInError;

    createAccessoryDispatch({
      type: createAccessoryAction.setStepsInError,
      payload: {
        kind: arePage2InputsInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    areAccessoryFieldsAdditionalValid,
    isAccessoryColorValid,
    isAccessoryTypeValid,
  ]);

  // update stepper wrapper state on every page 3 input validation change
  useEffect(() => {
    const arePage3InputsInError =
      !areImagesValid || imgFormDataArray.length === 0;

    createAccessoryDispatch({
      type: createAccessoryAction.setStepsInError,
      payload: {
        kind: arePage3InputsInError ? 'add' : 'delete',
        step: 2,
      },
    });
  }, [areImagesValid, imgFormDataArray.length]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ╭────────────────────────────────────────────────────────────────╮
  //  │  INPUT CREATION                                                │
  //  ╰────────────────────────────────────────────────────────────────╯
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  // page 1

  // page 1 -> brand

  // page 1 -> brand -> accessible screen reader text elements
  const [brandInputErrorText, brandInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'brand',
      inputText: brand,
      isInputTextFocused: isBrandFocused,
      isValidInputText: isBrandValid,
      regexValidationText: returnBrandNameValidationText({
        content: brand,
        contentKind: 'brand',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 1 -> brand -> text input element creator
  const [createdBrandTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: brandInputErrorText,
        valid: brandInputValidText,
      },
      inputText: brand,
      isValidInputText: isBrandValid,
      label: 'Brand',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsBrandFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setBrand,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsBrandFocused,
          payload: true,
        });
      },
      placeholder: 'Enter brand name',
      required: true,
      semanticName: 'brand',
    },
  ]);

  // page 1 -> model

  // page 1 -> model -> accessible screen reader text elements
  const [modelInputErrorText, modelInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'model',
      inputText: model,
      isInputTextFocused: isModelFocused,
      isValidInputText: isModelValid,
      regexValidationText: returnSerialIdValidationText({
        content: model,
        contentKind: 'model',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 1 -> model -> text input element creator
  const [createdModelTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: modelInputErrorText,
        valid: modelInputValidText,
      },
      inputText: model,
      isValidInputText: isModelValid,
      label: 'Model',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsModelFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setModel,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsModelFocused,
          payload: true,
        });
      },
      placeholder: 'Enter model name',
      required: true,
      semanticName: 'model',
    },
  ]);

  // page 1 -> description

  // page 1 -> description -> accessible screen reader text elements
  const [descriptionInputErrorText, descriptionInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'description',
      inputText: description,
      isInputTextFocused: isDescriptionFocused,
      isValidInputText: isDescriptionValid,
      regexValidationText: returnGrammarValidationText({
        content: description,
        contentKind: 'description',
        maxLength: 2000,
        minLength: 2,
      }),
    });

  // page 1 -> description -> text input element creator
  const [createdDescriptionTextAreaInput] =
    returnAccessibleTextAreaInputElements([
      {
        description: {
          error: descriptionInputErrorText,
          valid: descriptionInputValidText,
        },
        inputText: description,
        isValidInputText: isDescriptionValid,
        label: 'Accessory Description',
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createAccessoryDispatch({
            type: createAccessoryAction.setIsDescriptionFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createAccessoryDispatch({
            type: createAccessoryAction.setDescription,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createAccessoryDispatch({
            type: createAccessoryAction.setIsDescriptionFocused,
            payload: true,
          });
        },
        placeholder: 'Enter accessory description',
        required: true,
        semanticName: 'description',
      },
    ]);

  // page 1 -> price

  // page 1 -> price -> accessible screen reader text elements
  const [priceInputErrorText, priceInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'price',
      inputText: price,
      isInputTextFocused: isPriceFocused,
      isValidInputText: isPriceValid,
      regexValidationText: returnFloatAmountValidationText({
        content: price,
        contentKind: 'price',
      }),
    });

  // page 1 -> price -> text input element creator
  const [createdPriceTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: priceInputErrorText,
        valid: priceInputValidText,
      },
      inputText: price,
      isValidInputText: isPriceValid,
      label: 'Price',
      onBlur: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsPriceFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setPrice,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsPriceFocused,
          payload: true,
        });
      },
      placeholder: 'Enter accessory price',
      required: true,
      semanticName: 'price',
    },
  ]);

  // page 1 -> currency

  // page 1 -> currency -> select element creator
  const [createdCurrencySelectInput] = returnAccessibleSelectInputElements([
    {
      data: CURRENCY_DATA,
      description: '',
      label: 'Currency',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setCurrency,
          payload: event.currentTarget.value as Currency,
        });
      },
      value: currency,
      required: true,
    },
  ]);

  // page 1 -> availability

  // page 1 -> availability -> radio element creator
  const [createdAvailabilitySelectInput] = returnAccessibleSelectInputElements([
    {
      data: PRODUCT_AVAILABILITY_DATA,
      description: '',
      label: 'Availability',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setAvailability,
          payload: event.currentTarget.value as MerchandiseAvailability,
        });
      },
      value: availability,
      required: true,
    },
  ]);

  // page 1 -> quantity

  // page 1 -> quantity -> screenreader accessible text input elements
  const [quantityInputErrorText, quantityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'quantity',
      inputText: quantity,
      isInputTextFocused: isQuantityFocused,
      isValidInputText: isQuantityValid,
      regexValidationText: returnLargeIntegerValidationText({
        content: quantity,
        contentKind: 'quantity',
      }),
    });

  // page 1 -> quantity -> text input element creator
  const [createdQuantityTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: quantityInputErrorText,
        valid: quantityInputValidText,
      },
      inputText: quantity,
      isValidInputText: isQuantityValid,
      label: 'Quantity',
      onBlur: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsQuantityFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setQuantity,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsQuantityFocused,
          payload: true,
        });
      },
      placeholder: 'Enter accessory quantity',
      required: true,
      semanticName: 'quantity',
    },
  ]);

  // page 1 -> weight

  // page 1 -> weight -> screenreader accessible text input elements
  const [weightInputErrorText, weightInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'weight',
      inputText: weight,
      isInputTextFocused: isWeightFocused,
      isValidInputText: isWeightValid,
      regexValidationText: returnWeightValidationText({
        content: weight,
        contentKind: 'weight',
      }),
    });

  // page 1 -> weight -> text input element creator
  const [createdWeightTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: weightInputErrorText,
        valid: weightInputValidText,
      },
      inputText: weight,
      isValidInputText: isWeightValid,
      label: 'Weight',
      onBlur: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsWeightFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setWeight,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsWeightFocused,
          payload: true,
        });
      },
      placeholder: 'Enter accessory weight',
      required: true,
      semanticName: 'weight',
    },
  ]);

  // page 1 -> weight unit

  // page 1 -> weight -> weight unit select input
  const [createdWeightUnitSelectInput] = returnAccessibleSelectInputElements([
    {
      data: WEIGHT_UNIT_SELECT_INPUT_DATA,
      description: '',
      label: 'Weight Unit',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setWeightUnit,
          payload: event.currentTarget.value as WeightUnit,
        });
      },
      value: weightUnit,
      required: true,
    },
  ]);

  // page 1 -> dimensions

  // page 1 -> dimensions -> length

  // page 1 -> dimensions -> length -> screenreader accessible text input elements
  const [dimensionLengthInputErrorText, dimensionLengthInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'dimension length',
      inputText: dimensionLength,
      isInputTextFocused: isDimensionLengthFocused,
      isValidInputText: isDimensionLengthValid,
      regexValidationText: returnDimensionsValidationText({
        content: dimensionLength,
        contentKind: 'dimension length',
      }),
    });

  // page 1 -> dimensions -> length -> text input element creator
  const [createdDimensionLengthTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: dimensionLengthInputErrorText,
        valid: dimensionLengthInputValidText,
      },
      inputText: dimensionLength,
      isValidInputText: isDimensionLengthValid,
      label: 'Length',
      onBlur: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsDimensionLengthFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setDimensionLength,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsDimensionLengthFocused,
          payload: true,
        });
      },
      placeholder: 'Enter accessory length',
      required: true,
      semanticName: 'dimension length',
    },
  ]);

  // page 1 -> dimensions -> length unit select input
  const [createdDimensionLengthUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: DIMENSION_UNIT_SELECT_INPUT_DATA,
        description: '',
        label: 'Length Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createAccessoryDispatch({
            type: createAccessoryAction.setDimensionLengthUnit,
            payload: event.currentTarget.value as DimensionUnit,
          });
        },
        value: dimensionLengthUnit,
        required: true,
      },
    ]);

  // page 1 -> dimensions -> width

  // page 1 -> dimensions -> width -> screenreader accessible text input elements
  const [dimensionWidthInputErrorText, dimensionWidthInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'dimension width',
      inputText: dimensionWidth,
      isInputTextFocused: isDimensionWidthFocused,
      isValidInputText: isDimensionWidthValid,
      regexValidationText: returnDimensionsValidationText({
        content: dimensionWidth,
        contentKind: 'dimension width',
      }),
    });

  // page 1 -> dimensions -> width -> text input element creator
  const [createdDimensionWidthTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: dimensionWidthInputErrorText,
        valid: dimensionWidthInputValidText,
      },
      inputText: dimensionWidth,
      isValidInputText: isDimensionWidthValid,
      label: 'Width',
      onBlur: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsDimensionWidthFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setDimensionWidth,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsDimensionWidthFocused,
          payload: true,
        });
      },
      placeholder: 'Enter accessory width',
      required: true,
      semanticName: 'dimension width',
    },
  ]);

  // page 1 -> dimensions -> width unit select input
  const [createdDimensionWidthUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: DIMENSION_UNIT_SELECT_INPUT_DATA,
        description: '',
        label: 'Width Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createAccessoryDispatch({
            type: createAccessoryAction.setDimensionWidthUnit,
            payload: event.currentTarget.value as DimensionUnit,
          });
        },
        value: dimensionWidthUnit,
        required: true,
      },
    ]);

  // page 1 -> dimensions -> height

  // page 1 -> dimensions -> height -> screenreader accessible text input elements
  const [dimensionHeightInputErrorText, dimensionHeightInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'dimension height',
      inputText: dimensionHeight,
      isInputTextFocused: isDimensionHeightFocused,
      isValidInputText: isDimensionHeightValid,
      regexValidationText: returnDimensionsValidationText({
        content: dimensionHeight,
        contentKind: 'dimension height',
      }),
    });

  // page 1 -> dimensions -> height -> text input element creator
  const [createdDimensionHeightTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: dimensionHeightInputErrorText,
        valid: dimensionHeightInputValidText,
      },
      inputText: dimensionHeight,
      isValidInputText: isDimensionHeightValid,
      label: 'Height',
      onBlur: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsDimensionHeightFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setDimensionHeight,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsDimensionHeightFocused,
          payload: true,
        });
      },
      placeholder: 'Enter accessory height',
      required: true,
      semanticName: 'dimension height',
    },
  ]);

  // page 1 -> dimensions -> height unit select input
  const [createdDimensionHeightUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: DIMENSION_UNIT_SELECT_INPUT_DATA,
        description: '',
        label: 'Height Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createAccessoryDispatch({
            type: createAccessoryAction.setDimensionHeightUnit,
            payload: event.currentTarget.value as DimensionUnit,
          });
        },
        value: dimensionHeightUnit,
        required: true,
      },
    ]);

  // page 1 -> additional comments

  // page 1 -> additional comments -> accessible screen reader text elements
  const [additionalCommentsInputErrorText, additionalCommentsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'additional comments',
      inputText: additionalComments,
      isInputTextFocused: isAdditionalCommentsFocused,
      isValidInputText: isAdditionalCommentsValid,
      regexValidationText: returnGrammarValidationText({
        content: additionalComments,
        contentKind: 'additional comments',
        maxLength: 2000,
        minLength: 2,
      }),
    });

  // page 1 -> additional comments -> text input element creator
  const [createdAdditionalCommentsTextAreaInput] =
    returnAccessibleTextAreaInputElements([
      {
        description: {
          error: additionalCommentsInputErrorText,
          valid: additionalCommentsInputValidText,
        },
        inputText: additionalComments,
        isValidInputText: isAdditionalCommentsValid,
        label: 'Additional Comments',
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createAccessoryDispatch({
            type: createAccessoryAction.setIsAdditionalCommentsFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createAccessoryDispatch({
            type: createAccessoryAction.setAdditionalComments,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createAccessoryDispatch({
            type: createAccessoryAction.setIsAdditionalCommentsFocused,
            payload: true,
          });
        },
        placeholder: 'Enter additional comments',
        semanticName: 'additional comments',
      },
    ]);

  // page 2 -> accessory

  // page 2 -> accessory -> accessory type

  // page 2 -> accessory -> accessory type -> accessible screen reader text elements
  const [accessoryTypeInputErrorText, accessoryTypeInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'accessory type',
      inputText: accessoryType,
      isInputTextFocused: isAccessoryTypeFocused,
      isValidInputText: isAccessoryTypeValid,
      regexValidationText: returnBrandNameValidationText({
        content: accessoryType,
        contentKind: 'accessory type',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> accessory -> accessory type -> text input element creator
  const [createdAccessoryTypeTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: accessoryTypeInputErrorText,
        valid: accessoryTypeInputValidText,
      },
      inputText: accessoryType,
      isValidInputText: isAccessoryTypeValid,
      label: 'Accessory Type',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsAccessoryTypeFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setAccessoryType,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsAccessoryTypeFocused,
          payload: true,
        });
      },
      placeholder: 'Enter accessory type',
      required: true,
      semanticName: 'accessory type',
    },
  ]);

  // page 2 -> accessory -> accessory color

  // page 2 -> accessory -> accessory color -> accessible screen reader text elements
  const [accessoryColorInputErrorText, accessoryColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'accessory color',
      inputText: accessoryColor,
      isInputTextFocused: isAccessoryColorFocused,
      isValidInputText: isAccessoryColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: accessoryColor,
        contentKind: 'accessory color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> accessory -> accessory color -> text input element creator
  const [createdAccessoryColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: accessoryColorInputErrorText,
        valid: accessoryColorInputValidText,
      },
      inputText: accessoryColor,
      isValidInputText: isAccessoryColorValid,
      label: 'Accessory Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsAccessoryColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setAccessoryColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createAccessoryDispatch({
          type: createAccessoryAction.setIsAccessoryColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter accessory color',
      required: true,
      semanticName: 'accessory color',
    },
  ]);

  // page 2 -> accessory -> accessory interface

  // page 2 -> accessory -> accessory interface -> select input element
  const [createdAccessoryInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PERIPHERALS_INTERFACE_DATA,
        description: '',
        label: 'Accessory Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createAccessoryDispatch({
            type: createAccessoryAction.setAccessoryInterface,
            payload: event.currentTarget.value as PeripheralsInterface,
          });
        },
        value: accessoryInterface,
        required: true,
      },
    ]);

  // page 2 -> accessory -> add new field button
  const [createdAddAccessoryFieldsAdditionalButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createAccessoryDispatch({
            type: createAccessoryAction.setAccessoryFieldsAdditional,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createAccessoryDispatch({
            type: createAccessoryAction.setAreAccessoryFieldsAdditionalFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createAccessoryDispatch({
            type: createAccessoryAction.setAreAccessoryFieldsAdditionalValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> accessory -> accessory fields user defined

  // page 2 -> accessory -> accessory fields user defined -> accessible screen reader text elements

  // page 2 -> accessory -> accessory fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field key (subsequent function for value)
  // accessory fields Map consists of tuples of the form [idxKey, [fieldName, fieldValue]]
  // valid & focused accessory fields map consists of tuples of the form [idxKey, [isNameFocused/Valid, isValueFocused/Valid]]
  // and are used to provide screenreader accessible error/valid text elements that are consumed by the text input element creator

  const accessoryFieldsAdditionalKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(accessoryFieldsAdditional).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    const [
      accessoryFieldsAdditionalKeysInputErrorText,
      accessoryFieldsAdditionalKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areAccessoryFieldsAdditionalFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areAccessoryFieldsAdditionalValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      accessoryFieldsAdditionalKeysInputErrorText,
      accessoryFieldsAdditionalKeysInputValidText,
    ];
  });

  // page 2 -> accessory -> accessory fields user defined -> accessible screen reader text elements -> field values
  const accessoryFieldsAdditionalValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(accessoryFieldsAdditional).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    const [
      accessoryFieldsAdditionalValuesInputErrorText,
      accessoryFieldsAdditionalValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areAccessoryFieldsAdditionalFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areAccessoryFieldsAdditionalValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      accessoryFieldsAdditionalValuesInputErrorText,
      accessoryFieldsAdditionalValuesInputValidText,
    ];
  });

  // page 2 -> accessory -> accessory fields user defined -> text area input element creator
  const createdAccessoryFieldsAdditionalTextInputElements = Array.from(
    accessoryFieldsAdditional
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const accessoryFieldsAdditionalKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: accessoryFieldsAdditionalKeysErrorValidTextElements[mapKey][0],
          valid: accessoryFieldsAdditionalKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areAccessoryFieldsAdditionalValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createAccessoryDispatch({
            type: createAccessoryAction.setAreAccessoryFieldsAdditionalFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createAccessoryDispatch({
            type: createAccessoryAction.setAccessoryFieldsAdditional,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createAccessoryDispatch({
            type: createAccessoryAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createAccessoryDispatch({
            type: createAccessoryAction.setAreAccessoryFieldsAdditionalFocused,
            payload: {
              operation: 'update',
              data: true,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        placeholder: 'Enter additional field name',
        required: true,
        semanticName: `additional field name ${mapKey + 1}`,
      };

    const accessoryFieldsAdditionalValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            accessoryFieldsAdditionalValuesErrorValidTextElements[mapKey][0],
          valid:
            accessoryFieldsAdditionalValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areAccessoryFieldsAdditionalValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createAccessoryDispatch({
            type: createAccessoryAction.setAreAccessoryFieldsAdditionalFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createAccessoryDispatch({
            type: createAccessoryAction.setAccessoryFieldsAdditional,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createAccessoryDispatch({
            type: createAccessoryAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createAccessoryDispatch({
            type: createAccessoryAction.setAreAccessoryFieldsAdditionalFocused,
            payload: {
              operation: 'update',
              data: true,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        placeholder: 'Enter additional field value',
        required: true,
        semanticName: `additional field value ${mapKey + 1}`,
      };

    const [
      createdAccessoryFieldsAdditionalKeysTextAreaInput,
      createdAccessoryFieldsAdditionalValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      accessoryFieldsAdditionalKeysTextInputCreatorInfo,
      accessoryFieldsAdditionalValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
          createAccessoryDispatch({
            type: createAccessoryAction.setAccessoryFieldsAdditional,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createAccessoryDispatch({
            type: createAccessoryAction.setAreAccessoryFieldsAdditionalFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createAccessoryDispatch({
            type: createAccessoryAction.setAreAccessoryFieldsAdditionalValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createAccessoryDispatch({
            type: createAccessoryAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: -1,
          });
        },
        leftIcon: <TbTrash />,
        semanticDescription: `Delete additional field ${mapKey + 1}`,
        semanticName: 'Delete field and value',
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack
        key={`accessoryFieldsAdditional-${mapKey}`}
        pt={padding}
        style={{ borderTop: borderColor }}
        w="100%"
      >
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional field ${mapKey + 1}`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdAccessoryFieldsAdditionalKeysTextAreaInput}
          {createdAccessoryFieldsAdditionalValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // page 4

  // page 4 -> submit button

  // page 4 -> submit button -> accessible button element
  const [createdSubmitButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Submit',
      buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
        createAccessoryDispatch({
          type: createAccessoryAction.setTriggerFormSubmit,
          payload: true,
        });
      },
      buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
      leftIcon: <TbUpload />,
      semanticDescription: 'create accessory form submit button',
      semanticName: 'submit button',
    },
  ]);

  // page 4 -> submit button -> display
  const displaySubmitButton =
    currentStepperPosition === CREATE_PRODUCT_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? 'Please fix errors before submitting form.'
            : 'Submit create accessory form'
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ╭────────────────────────────────────────────────────────────────╮
  //  │  INPUT DISPLAY                                                 │
  //  ╰────────────────────────────────────────────────────────────────╯
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  // page 1

  const displayCreateAccessoryFormPage1 = (
    <FormLayoutWrapper>
      {createdBrandTextInput}
      {createdModelTextInput}
      {createdPriceTextInput}
      {createdCurrencySelectInput}
      {createdAvailabilitySelectInput}
      {createdQuantityTextInput}
      {createdWeightTextInput}
      {createdWeightUnitSelectInput}
      {createdDimensionLengthTextInput}
      {createdDimensionLengthUnitSelectInput}
      {createdDimensionHeightTextInput}
      {createdDimensionHeightUnitSelectInput}
      {createdDimensionWidthTextInput}
      {createdDimensionWidthUnitSelectInput}
      {createdDescriptionTextAreaInput}
      {createdAdditionalCommentsTextAreaInput}
    </FormLayoutWrapper>
  );

  // page 2 -> accessory

  // page 2 -> accessory -> add new button
  const displayAccessoryFieldsAdditionalButton = (
    <Tooltip
      label={`Add new additional field ${accessoryFieldsAdditional.size + 1}`}
    >
      <Group>{createdAddAccessoryFieldsAdditionalButton}</Group>
    </Tooltip>
  );

  const displayAccessorySpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%" position="apart">
        <Title order={4}>Accessory Specifications</Title>
        {displayAccessoryFieldsAdditionalButton}
      </Group>
      {createdAccessoryTypeTextInput}
      {createdAccessoryColorTextInput}
      {createdAccessoryInterfaceSelectInput}
      {createdAccessoryFieldsAdditionalTextInputElements}
    </FormLayoutWrapper>
  );

  const displayCreateAccessoryFormPage2 = (
    <FormLayoutWrapper>
      {displayAccessorySpecificationsInputs}
    </FormLayoutWrapper>
  );

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ╭────────────────────────────────────────────────────────────────╮
  //  │  FORM REVIEW OBJECTS                                           │
  //  ╰────────────────────────────────────────────────────────────────╯
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  // page 1
  const page1FormReviewObject: FormReviewObjectArray = {
    'Accessory Details': [
      {
        inputName: 'Brand',
        inputValue: brand,
        isInputValueValid: isBrandValid,
      },
      {
        inputName: 'Model',
        inputValue: model,
        isInputValueValid: isModelValid,
      },
      {
        inputName: 'Description',
        inputValue: description,
        isInputValueValid: isDescriptionValid,
      },
      {
        inputName: 'Price',
        inputValue: price,
        isInputValueValid: isPriceValid,
      },
      {
        inputName: 'Currency',
        inputValue: currency,
      },
      {
        inputName: 'Availability',
        inputValue: availability,
      },
      {
        inputName: 'Quantity',
        inputValue: quantity,
        isInputValueValid: isQuantityValid,
      },
      {
        inputName: 'Weight',
        inputValue: weight,
        isInputValueValid: isWeightValid,
      },
      {
        inputName: 'Dimension Length',
        inputValue: dimensionLength,
        isInputValueValid: isDimensionLengthValid,
      },
      {
        inputName: 'Dimension Length Unit',
        inputValue: dimensionLengthUnit,
      },
      {
        inputName: 'Dimension Height',
        inputValue: dimensionHeight,
        isInputValueValid: isDimensionHeightValid,
      },
      {
        inputName: 'Dimension Height Unit',
        inputValue: dimensionHeightUnit,
      },
      {
        inputName: 'Dimension Width',
        inputValue: dimensionWidth,
        isInputValueValid: isDimensionWidthValid,
      },
      {
        inputName: 'Dimension Width Unit',
        inputValue: dimensionWidthUnit,
      },
      {
        inputName: 'Additional Comments',
        inputValue: additionalComments,
        isInputValueValid: additionalComments.length
          ? isAdditionalCommentsValid
          : true,
      },
    ],
  };

  // page 2 -> accessory

  const accessoryFieldsAdditionalFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: accessoryFieldsAdditional,
      areAdditionalFieldsValid: areAccessoryFieldsAdditionalValid,
    });

  const page2AccessoryFormReviewObject: FormReviewObjectArray = {
    'Accessory Specifications': [
      {
        inputName: 'Accessory Type',
        inputValue: accessoryType,
        isInputValueValid: isAccessoryTypeValid,
      },
      {
        inputName: 'Accessory Color',
        inputValue: accessoryColor,
        isInputValueValid: isAccessoryColorValid,
      },
      {
        inputName: 'Accessory Interface',
        inputValue: accessoryInterface,
      },
      ...accessoryFieldsAdditionalFormReviewObjects,
    ],
  };

  // page 3
  const page3ImageUploadsFormReviewObject: FormReviewObjectArray = {
    'Upload Images': [
      {
        inputName: 'Images',
        inputValue: stepsInError.has(2) ? 'Error' : 'Valid',
        isInputValueValid: !stepsInError.has(2),
      },
    ],
  };

  const createAccessoryFormReviewObjects: FormReviewObjectArray = {
    ...page1FormReviewObject,
    ...page2AccessoryFormReviewObject,
    ...page3ImageUploadsFormReviewObject,
  };

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ╭────────────────────────────────────────────────────────────────╮
  //  │  DISPLAY COMPONENT                                             │
  //  ╰────────────────────────────────────────────────────────────────╯
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  const displayCreateAccessoryReviewPage = (
    <FormReviewPage
      formReviewObject={createAccessoryFormReviewObjects}
      formName="Create Accessory"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate('/home/dashboard/accessory/display');
        },
      ]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={
        <Title order={4}>{isSuccessful ? 'Success!' : 'Submitting ...'}</Title>
      }
    />
  );

  const displayImageUploadPage = (
    <ImageUpload
      isParentComponentFormSubmitted={triggerFormSubmit}
      maxImageSize={CREATE_PRODUCT_MAX_IMG_SIZE}
      maxImages={CREATE_PRODUCT_MAX_IMG_AMOUNT}
      parentComponentName="create accessory form"
      setAreImagesValid={createAccessoryAction.setAreImagesValid}
      setAreImagesValidDispatch={createAccessoryDispatch}
      setImgFormDataArray={createAccessoryAction.setImgFormDataArray}
      setImgFormDataArrayDispatch={createAccessoryDispatch}
    />
  );

  const displayCreateAccessoryForm =
    currentStepperPosition === 0
      ? displayCreateAccessoryFormPage1
      : currentStepperPosition === 1
      ? displayCreateAccessoryFormPage2
      : currentStepperPosition === 2
      ? displayImageUploadPage
      : currentStepperPosition === 3
      ? displayCreateAccessoryReviewPage
      : displaySubmitButton;

  const displayCreateAccessoryComponent = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_PRODUCT_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_PRODUCT_MAX_STEPPER_POSITION}
      setCurrentStepperPosition={
        createAccessoryAction.setCurrentStepperPosition
      }
      stepsInError={stepsInError}
      parentComponentDispatch={createAccessoryDispatch}
      childrenTitle="Create Accessory"
    >
      {displaySubmitSuccessNotificationModal}
      {displayCreateAccessoryForm}
    </StepperWrapper>
  );

  return displayCreateAccessoryComponent;
}

export default CreateAccessory;
