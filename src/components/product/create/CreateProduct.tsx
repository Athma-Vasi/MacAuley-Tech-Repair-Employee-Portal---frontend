import { useDisclosure } from '@mantine/hooks';
import { ChangeEvent, useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { useGlobalState, useWrapFetch } from '../../../hooks';
import {
  createProductAction,
  createProductReducer,
  initialCreateProductState,
} from './state';
import {
  logState,
  returnBrandNameValidationText,
  returnGrammarValidationText,
  returnNumberAmountValidationText,
  returnSerialIdValidationText,
  returnSocketChipsetValidationText,
  urlBuilder,
} from '../../../utils';
import { InvalidTokenError } from 'jwt-decode';
import { globalAction } from '../../../context/globalProvider/state';
import { Currency, ResourceRequestServerResponse } from '../../../types';
import {
  DimensionUnit,
  MemoryUnit,
  ProductDocument,
  WeightUnit,
} from './types';
import {
  ACCESSORY_TYPE_REGEX,
  BRAND_REGEX,
  CPU_SOCKET_REGEX,
  DIMENSION_UNIT_DATA,
  GPU_CHIPSET_REGEX,
  HEADPHONE_FREQUENCY_RESPONSE_REGEX,
  MEMORY_UNIT_DATA,
  MONITOR_ASPECT_RATIO_REGEX,
  MOTHERBOARD_CHIPSET_REGEX,
  MOTHERBOARD_SOCKET_REGEX,
  RAM_TIMING_REGEX,
  SMARTPHONE_CHIPSET_REGEX,
  SPEAKER_FREQUENCY_RESPONSE_REGEX,
  TABLET_CHIPSET_REGEX,
  WEIGHT_UNIT_DATA,
} from '../constants';
import {
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
  SERIAL_ID_REGEX,
} from '../../../constants/regex';
import {
  AccessibleErrorValidTextElements,
  returnAccessibleRadioSingleInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  AccessibleRadioSingleInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
} from '../../wrappers';
import { ProductCategory } from '../../dashboard/types';
import { PRODUCT_CATEGORIES } from '../../dashboard/constants';
import { CURRENCY_DATA } from '../../benefits/constants';
import { Group, NumberInput } from '@mantine/core';

function CreateProduct() {
  const [createProductState, createProductDispatch] = useReducer(
    createProductReducer,
    initialCreateProductState
  );

  const {
    globalState: { themeObject },
    globalDispatch,
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
    // page 1 -> model, product category
    model,
    isModelValid,
    isModelFocused,
    productCategory,
    // page 1 -> description
    description,
    isDescriptionValid,
    isDescriptionFocused,
    // page 1 -> price, currency, availability, quantity
    price,
    isPriceValid,
    isPriceFocused,
    currency,
    availability,
    quantity,
    // page 1 -> weight
    weight,
    weightUnit,
    // page 1 -> dimensions
    dimensionLength,
    dimensionLengthUnit,
    dimensionWidth,
    dimensionWidthUnit,
    dimensionHeight,
    dimensionHeightUnit,
    // page 1 -> additional comments
    additionalComments,
    isAdditionalCommentsValid,
    isAdditionalCommentsFocused,

    // page 2

    // page 2 -> specifications

    // page 2 -> specifications -> cpu
    cpuSocket,
    isCpuSocketValid,
    isCpuSocketFocused,
    cpuFrequency,
    cpuCores,
    cpuL1CacheCapacity,
    cpuL1CacheCapacityUnit,
    cpuL2CacheCapacity,
    cpuL2CacheCapacityUnit,
    cpuL3CacheCapacity,
    cpuL3CacheCapacityUnit,
    cpuWattage,

    // page 2 -> specifications -> gpu
    gpuChipset,
    isGpuChipsetValid,
    isGpuChipsetFocused,
    gpuMemoryCapacity,
    gpuMemoryCapacityUnit,
    gpuCoreClock,
    gpuBoostClock,
    gpuTdp,

    // page 2 -> specifications -> motherboard
    motherboardSocket,
    isMotherboardSocketValid,
    isMotherboardSocketFocused,
    motherboardChipset,
    isMotherboardChipsetValid,
    isMotherboardChipsetFocused,
    motherboardFormFactor,
    motherboardMemoryMaxCapacity,
    motherboardMemoryMaxCapacityUnit,
    motherboardMemorySlots,
    motherboardMemoryType,
    motherboardSataPorts,
    motherboardM2Slots,
    motherboardPcie3Slots,
    motherboardPcie4Slots,
    motherboardPcie5Slots,

    // page 2 -> specifications -> ram
    ramFrequency,
    ramModulesQuantity,
    ramModulesCapacity,
    ramModulesCapacityUnit,
    ramType,
    ramColor,
    ramVoltage,
    ramTiming,
    isRamTimingValid,
    isRamTimingFocused,

    // page 2 -> specifications -> storage
    storageType,
    storageCapacity,
    storageCapacityUnit,
    storageCacheCapacity,
    storageCacheCapacityUnit,
    storageFormFactor,
    storageInterface,

    // page 2 -> specifications -> psu
    psuWattage,
    psuEfficiency,
    psuFormFactor,
    psuModularity,

    // page 2 -> specifications -> case
    caseType,
    caseColor,
    caseSidePanel,

    // page 2 -> specifications -> monitor
    monitorSize,
    monitorResolutionHorizontal,
    monitorResolutionVertical,
    monitorRefreshRate,
    monitorPanelType,
    monitorResponseTime,
    monitorAspectRatio,
    isMonitorAspectRatioValid,
    isMonitorAspectRatioFocused,

    // page 2 -> specifications -> keyboard
    keyboardSwitch,
    keyboardLayout,
    keyboardBacklight,
    keyboardInterface,

    // page 2 -> specifications -> mouse
    mouseSensor,
    mouseDpi,
    mouseButtons,
    mouseColor,
    mouseInterface,

    // page 2 -> specifications -> headphone
    headphoneType,
    headphoneDriver,
    headphoneFrequencyResponse,
    isHeadphoneFrequencyResponseValid,
    isHeadphoneFrequencyResponseFocused,
    headphoneImpedance,
    headphoneColor,
    headphoneInterface,

    // page 2 -> specifications -> speaker
    speakerType,
    speakerTotalWattage,
    speakerFrequencyResponse,
    isSpeakerFrequencyResponseValid,
    isSpeakerFrequencyResponseFocused,
    speakerColor,
    speakerInterface,

    // page 2 -> specifications -> smartphone
    smartphoneOs,
    smartphoneChipset,
    isSmartphoneChipsetValid,
    isSmartphoneChipsetFocused,
    smartphoneDisplay,
    smartphoneResolutionHorizontal,
    smartphoneResolutionVertical,
    smartphoneRamCapacity,
    smartphoneRamCapacityUnit,
    smartphoneStorageCapacity,
    smartphoneBatteryCapacity,
    smartphoneCamera,
    smartphoneColor,

    // page 2 -> specifications -> tablet
    tabletOs,
    tabletChipset,
    isTabletChipsetValid,
    isTabletChipsetFocused,
    tabletDisplay,
    tabletResolutionHorizontal,
    tabletResolutionVertical,
    tabletRamCapacity,
    tabletRamCapacityUnit,
    tabletStorageCapacity,
    tabletBatteryCapacity,
    tabletCamera,
    tabletColor,

    // page 2 -> specifications -> accessory
    accessoryType,
    isAccessoryTypeValid,
    isAccessoryTypeFocused,
    accessoryColor,
    accessoryInterface,

    // page 3
    imgFormDataArray,
    areImagesValid,

    //
    triggerFormSubmit,
    currentStepperPosition,
    stepsInError,

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = createProductState;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function imagesUploadRequest() {
      createProductDispatch({
        type: createProductAction.setIsSubmitting,
        payload: true,
      });
      createProductDispatch({
        type: createProductAction.setSubmitMessage,
        payload: 'File uploads are being processed...',
      });
      openSubmitSuccessNotificationModal();

      if (imgFormDataArray.length === 0) {
        return;
      }

      await Promise.all(
        imgFormDataArray.map(async (formData) => {
          const fileUploadUrl: URL = urlBuilder({
            path: 'file-upload',
          });

          const imgUpLoadRequestInit: RequestInit = {
            method: 'POST',
            headers: {
              Authorization: '',
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
              throw new Error(imgUploadResponseData.message);
            }

            createProductDispatch({
              type: createProductAction.setIsSubmitting,
              payload: false,
            });
            createProductDispatch({
              type: createProductAction.setSubmitMessage,
              payload: '',
            });

            createProductDispatch({
              type: createProductAction.setIsSuccessful,
              payload: true,
            });
            createProductDispatch({
              type: createProductAction.setSuccessMessage,
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

        async function createProductFormRequest() {
          createProductDispatch({
            type: createProductAction.setIsSubmitting,
            payload: true,
          });
          createProductDispatch({
            type: createProductAction.setSubmitMessage,
            payload: `Creating ${productCategory} product...`,
          });

          const createProductUrl: URL = urlBuilder({
            path: 'actions/dashboard/product',
          });

          const createProductRequestBody = JSON.stringify({});

          const createProductRequestInit: RequestInit = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: createProductRequestBody,
          };

          try {
            const createProductResponse = await wrappedFetch({
              isMounted,
              requestInit: createProductRequestInit,
              signal: controller.signal,
              url: createProductUrl,
            });

            const createProductResponseData: ResourceRequestServerResponse<ProductDocument> =
              await createProductResponse.json();

            if (!isMounted) {
              return;
            }
            if (!createProductResponse.ok) {
              throw new Error(createProductResponseData.message);
            }

            createProductDispatch({
              type: createProductAction.setIsSuccessful,
              payload: true,
            });
            createProductDispatch({
              type: createProductAction.setSuccessMessage,
              payload:
                createProductResponseData.message ??
                `Successfully created ${productCategory} product.`,
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
              createProductDispatch({
                type: createProductAction.setIsSubmitting,
                payload: false,
              });
              createProductDispatch({
                type: createProductAction.setSubmitMessage,
                payload: '',
              });
              createProductDispatch({
                type: createProductAction.setImgFormDataArray,
                payload: [],
              });
              createProductDispatch({
                type: createProductAction.setTriggerFormSubmit,
                payload: false,
              });
            }
          }
        }

        if (imgUploadResponseData.every((item) => item !== undefined)) {
          createProductFormRequest();
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

  useEffect(() => {
    logState({
      state: createProductState,
      groupLabel: 'Create Product State',
    });
  }, [createProductState]);

  // validate brand on every change
  useEffect(() => {
    const isValid = BRAND_REGEX.test(brand);

    createProductDispatch({
      type: createProductAction.setIsBrandValid,
      payload: isValid,
    });
  }, [brand]);

  // validate model on every change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(model);

    createProductDispatch({
      type: createProductAction.setIsModelValid,
      payload: isValid,
    });
  }, [model]);

  // validate description on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(description);

    createProductDispatch({
      type: createProductAction.setIsDescriptionValid,
      payload: isValid,
    });
  }, [description]);

  // validate price on every change
  useEffect(() => {
    const isValid = MONEY_REGEX.test(price);

    createProductDispatch({
      type: createProductAction.setIsPriceValid,
      payload: isValid,
    });
  }, [price]);

  // insert comma if currency is EUR
  useEffect(() => {
    // if currency is EUR, replace decimal with comma and remove leading zeros
    if (currency === 'EUR') {
      const priceWithCommaAndNoLeadingZero = price
        .replace('.', ',')
        .replace(/^0+(?=\d)/, ''); // removes leading zeros if amount !== '0.00'

      createProductDispatch({
        type: createProductAction.setPrice,
        payload: priceWithCommaAndNoLeadingZero,
      });
    }
    // if currency is not EUR, replace comma with decimal and remove leading zeros
    else {
      const priceWithDecimalAndNoLeadingZero = price
        .replace(',', '.')
        .replace(/^0+(?=\d)/, '');

      createProductDispatch({
        type: createProductAction.setPrice,
        payload: priceWithDecimalAndNoLeadingZero,
      });
    }
  }, [currency, price]);

  // validate additional comments on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalComments);

    createProductDispatch({
      type: createProductAction.setIsAdditionalCommentsValid,
      payload: isValid,
    });
  }, [additionalComments]);

  // validate CPU socket on every change
  useEffect(() => {
    const isValid = CPU_SOCKET_REGEX.test(cpuSocket);

    createProductDispatch({
      type: createProductAction.setIsCpuSocketValid,
      payload: isValid,
    });
  }, [cpuSocket]);

  // validate GPU chipset on every change
  useEffect(() => {
    const isValid = GPU_CHIPSET_REGEX.test(gpuChipset);

    createProductDispatch({
      type: createProductAction.setIsGpuChipsetValid,
      payload: isValid,
    });
  }, [gpuChipset]);

  // validate motherboard socket on every change
  useEffect(() => {
    const isValid = MOTHERBOARD_SOCKET_REGEX.test(motherboardSocket);

    createProductDispatch({
      type: createProductAction.setIsMotherboardSocketValid,
      payload: isValid,
    });
  }, [motherboardSocket]);

  // validate motherboard chipset on every change
  useEffect(() => {
    const isValid = MOTHERBOARD_CHIPSET_REGEX.test(motherboardChipset);

    createProductDispatch({
      type: createProductAction.setIsMotherboardChipsetValid,
      payload: isValid,
    });
  }, [motherboardChipset]);

  // validate RAM timing on every change
  useEffect(() => {
    const isValid = RAM_TIMING_REGEX.test(ramTiming);

    createProductDispatch({
      type: createProductAction.setIsRamTimingValid,
      payload: isValid,
    });
  }, [ramTiming]);

  // validate monitor aspect ratio on every change
  useEffect(() => {
    const isValid = MONITOR_ASPECT_RATIO_REGEX.test(monitorAspectRatio);

    createProductDispatch({
      type: createProductAction.setIsMonitorAspectRatioValid,
      payload: isValid,
    });
  }, [monitorAspectRatio]);

  // validate headphone frequency response on every change
  useEffect(() => {
    const isValid = HEADPHONE_FREQUENCY_RESPONSE_REGEX.test(
      headphoneFrequencyResponse
    );

    createProductDispatch({
      type: createProductAction.setIsHeadphoneFrequencyResponseValid,
      payload: isValid,
    });
  }, [headphoneFrequencyResponse]);

  // validate speaker frequency response on every change
  useEffect(() => {
    const isValid = SPEAKER_FREQUENCY_RESPONSE_REGEX.test(
      speakerFrequencyResponse
    );

    createProductDispatch({
      type: createProductAction.setIsSpeakerFrequencyResponseValid,
      payload: isValid,
    });
  }, [speakerFrequencyResponse]);

  // validate smartphone chipset on every change
  useEffect(() => {
    const isValid = SMARTPHONE_CHIPSET_REGEX.test(smartphoneChipset);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneChipsetValid,
      payload: isValid,
    });
  }, [smartphoneChipset]);

  // validate tablet chipset on every change
  useEffect(() => {
    const isValid = TABLET_CHIPSET_REGEX.test(tabletChipset);

    createProductDispatch({
      type: createProductAction.setIsTabletChipsetValid,
      payload: isValid,
    });
  }, [tabletChipset]);

  // validate accessory type on every change
  useEffect(() => {
    const isValid = ACCESSORY_TYPE_REGEX.test(accessoryType);

    createProductDispatch({
      type: createProductAction.setIsAccessoryTypeValid,
      payload: isValid,
    });
  }, [accessoryType]);

  // update stepper wrapper state on every page 1 input validation change
  useEffect(() => {
    const arePage1InputsInError =
      !isBrandValid ||
      !isModelValid ||
      !isPriceValid ||
      !isDescriptionValid ||
      !isAdditionalCommentsValid;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: arePage1InputsInError ? 'add' : 'delete',
        step: 0,
      },
    });
  }, [
    isAdditionalCommentsValid,
    isBrandValid,
    isDescriptionValid,
    isModelValid,
    isPriceValid,
  ]);

  // update stepper wrapper state on every page 2 input validation change
  useEffect(() => {
    const arePage2InputsInError =
      !isCpuSocketValid ||
      !isGpuChipsetValid ||
      !isMotherboardSocketValid ||
      !isMotherboardChipsetValid ||
      !isRamTimingValid ||
      !isMonitorAspectRatioValid ||
      !isHeadphoneFrequencyResponseValid ||
      !isSpeakerFrequencyResponseValid ||
      !isSmartphoneChipsetValid ||
      !isTabletChipsetValid ||
      !isAccessoryTypeValid;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: arePage2InputsInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    isAccessoryTypeValid,
    isCpuSocketValid,
    isGpuChipsetValid,
    isHeadphoneFrequencyResponseValid,
    isMonitorAspectRatioValid,
    isMotherboardChipsetValid,
    isMotherboardSocketValid,
    isRamTimingValid,
    isSmartphoneChipsetValid,
    isSpeakerFrequencyResponseValid,
    isTabletChipsetValid,
  ]);

  // update stepper wrapper state on every page 3 input validation change
  useEffect(() => {
    const arePage3InputsInError =
      !areImagesValid || imgFormDataArray.length === 0;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: arePage3InputsInError ? 'add' : 'delete',
        step: 2,
      },
    });
  }, [areImagesValid, imgFormDataArray.length]);

  // ╭────────────────╮
  // │ Created Inputs │
  // ╰────────────────╯

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
        createProductDispatch({
          type: createProductAction.setIsBrandFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setBrand,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsBrandFocused,
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
        createProductDispatch({
          type: createProductAction.setIsModelFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setModel,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsModelFocused,
          payload: true,
        });
      },
      placeholder: 'Enter model name',
      required: true,
      semanticName: 'model',
    },
  ]);

  // page 1 -> product category

  // page 1 -> product category -> select element creator
  const [createdProductCategorySelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_CATEGORIES,
        description: 'Select a product category',
        label: 'Product Category',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setProductCategory,
            payload: event.currentTarget.value as ProductCategory,
          });
        },
        value: productCategory,
        required: true,
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
  const [createdDescriptionTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: descriptionInputErrorText,
        valid: descriptionInputValidText,
      },
      inputText: description,
      isValidInputText: isDescriptionValid,
      label: 'Product Description',
      maxLength: 2000,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsDescriptionFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setDescription,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsDescriptionFocused,
          payload: true,
        });
      },
      placeholder: 'Enter product description',
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
      regexValidationText: returnNumberAmountValidationText({
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
        createProductDispatch({
          type: createProductAction.setIsPriceFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setPrice,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsPriceFocused,
          payload: true,
        });
      },
      placeholder: 'Enter product price',
      required: true,
      semanticName: 'price',
    },
  ]);

  // page 1 -> currency

  // page 1 -> currency -> select element creator
  const [createdCurrencySelectInput] = returnAccessibleSelectInputElements([
    {
      data: CURRENCY_DATA,
      description: 'Select a currency',
      label: 'Currency',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setCurrency,
          payload: event.currentTarget.value as Currency,
        });
      },
      value: currency,
      required: true,
    },
  ]);

  // page 1 -> availability

  // page 1 -> availability -> radio element creator
  const [createdAvailabilityRadioInput] =
    returnAccessibleRadioSingleInputElements([
      {
        checked: availability,
        description: 'Select availability',
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setAvailability,
            payload: event.currentTarget.value === 'true',
          });
        },
        semanticName: 'availability',
        required: true,
      },
    ]);

  // page 1 -> quantity

  // page 1 -> quantity -> number input element
  const createdQuantityNumberInput = (
    <NumberInput
      description="Enter product quantity"
      label="Quantity"
      max={99999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setQuantity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={quantity}
      withAsterisk
    />
  );

  // page 1 -> weight

  // page 1 -> weight -> number input element
  const createdWeightNumberInput = (
    <NumberInput
      description="Enter product weight"
      label="Weight"
      max={99999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setWeight,
          payload: value,
        });
      }}
      precision={2}
      required
      startValue={0}
      step={0.01}
      type="number"
      value={weight}
      withAsterisk
    />
  );

  // page 1 -> weight -> weight unit select input
  const [createdWeightUnitSelectInput] = returnAccessibleSelectInputElements([
    {
      data: WEIGHT_UNIT_DATA,
      description: 'Select a weight unit',
      label: 'Weight Unit',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setWeightUnit,
          payload: event.currentTarget.value as WeightUnit,
        });
      },
      value: weightUnit,
      required: true,
    },
  ]);

  // page 1 -> dimensions

  // page 1 -> dimensions -> length number input element
  const createdDimensionLengthNumberInput = (
    <NumberInput
      description="Enter product length"
      label="Length"
      max={99999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setDimensionLength,
          payload: value,
        });
      }}
      precision={2}
      required
      startValue={0}
      step={0.01}
      type="number"
      value={dimensionLength}
      withAsterisk
    />
  );

  // page 1 -> dimensions -> length unit select input
  const [createdDimensionLengthUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: DIMENSION_UNIT_DATA,
        description: 'Select a length unit',
        label: 'Length Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setDimensionLengthUnit,
            payload: event.currentTarget.value as DimensionUnit,
          });
        },
        value: dimensionLengthUnit,
        required: true,
      },
    ]);

  // page 1 -> dimensions -> width number input element
  const createdDimensionWidthNumberInput = (
    <NumberInput
      description="Enter product width"
      label="Width"
      max={99999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setDimensionWidth,
          payload: value,
        });
      }}
      precision={2}
      required
      startValue={0}
      step={0.01}
      type="number"
      value={dimensionWidth}
      withAsterisk
    />
  );

  // page 1 -> dimensions -> width unit select input
  const [createdDimensionWidthUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: DIMENSION_UNIT_DATA,
        description: 'Select a width unit',
        label: 'Width Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setDimensionWidthUnit,
            payload: event.currentTarget.value as DimensionUnit,
          });
        },
        value: dimensionWidthUnit,
        required: true,
      },
    ]);

  // page 1 -> dimensions -> height number input element
  const createdDimensionHeightNumberInput = (
    <NumberInput
      description="Enter product height"
      label="Height"
      max={99999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setDimensionHeight,
          payload: value,
        });
      }}
      precision={2}
      required
      startValue={0}
      step={0.01}
      type="number"
      value={dimensionHeight}
      withAsterisk
    />
  );

  // page 1 -> dimensions -> height unit select input
  const [createdDimensionHeightUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: DIMENSION_UNIT_DATA,
        description: 'Select a height unit',
        label: 'Height Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setDimensionHeightUnit,
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
  const [createdAdditionalCommentsTextInput] =
    returnAccessibleTextInputElements([
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
          createProductDispatch({
            type: createProductAction.setIsAdditionalCommentsFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setAdditionalComments,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsAdditionalCommentsFocused,
            payload: true,
          });
        },
        placeholder: 'Enter additional comments',
        required: true,
        semanticName: 'additional comments',
      },
    ]);

  // page 2

  // page 2 -> specifications

  // page 2 -> specifications -> cpu

  // page 2 -> specifications -> cpu -> cpu socket

  // page 2 -> specifications -> cpu -> cpu socket -> accessible screen reader text elements
  const [cpuSocketInputErrorText, cpuSocketInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu socket',
      inputText: cpuSocket,
      isInputTextFocused: isCpuSocketFocused,
      isValidInputText: isCpuSocketValid,
      regexValidationText: returnSocketChipsetValidationText({
        content: cpuSocket,
        contentKind: 'cpu socket',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> specifications -> cpu -> cpu socket -> text input element creator
  const [createdCpuSocketTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: cpuSocketInputErrorText,
        valid: cpuSocketInputValidText,
      },
      inputText: cpuSocket,
      isValidInputText: isCpuSocketValid,
      label: 'CPU Socket',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuSocketFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setCpuSocket,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuSocketFocused,
          payload: true,
        });
      },
      placeholder: 'Enter CPU socket',
      required: true,
      semanticName: 'cpu socket',
    },
  ]);

  // page 2 -> specifications -> cpu -> cpu frequency

  // page 2 -> specifications -> cpu -> cpu frequency -> number input element
  const createdCpuFrequencyNumberInput = (
    <NumberInput
      description="Enter CPU frequency in GHz"
      label="CPU Frequency"
      max={7}
      min={0.01}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setCpuFrequency,
          payload: value,
        });
      }}
      precision={2}
      required
      startValue={0}
      step={0.01}
      type="number"
      value={cpuFrequency}
      withAsterisk
    />
  );

  // page 2 -> specifications -> cpu -> cpu cores

  // page 2 -> specifications -> cpu -> cpu cores -> number input element
  const createdCpuCoresNumberInput = (
    <NumberInput
      description="Enter CPU cores"
      label="CPU Cores"
      max={4096}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setCpuCores,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={cpuCores}
      withAsterisk
    />
  );

  // page 2 -> specifications -> cpu -> cpu L1 cache capacity

  // page 2 -> specifications -> cpu -> cpu L1 cache capacity -> number input element
  const createdCpuL1CacheCapacityNumberInput = (
    <NumberInput
      description="Enter CPU L1 cache capacity"
      label="CPU L1 Cache Capacity"
      max={1024}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setCpuL1CacheCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={cpuL1CacheCapacity}
      withAsterisk
    />
  );

  // page 2 -> specifications -> cpu -> cpu L1 cache capacity unit

  // page 2 -> specifications -> cpu -> cpu L1 cache capacity unit -> select input element
  const [createdCpuL1CacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: 'Select CPU L1 cache capacity unit',
        label: 'CPU L1 Cache Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuL1CacheCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: cpuL1CacheCapacityUnit,
        required: true,
      },
    ]);

  // page 2 -> specifications -> cpu -> cpu L2 cache capacity

  // page 2 -> specifications -> cpu -> cpu L2 cache capacity -> number input element
  const createdCpuL2CacheCapacityNumberInput = (
    <NumberInput
      description="Enter CPU L2 cache capacity"
      label="CPU L2 Cache Capacity"
      max={1024}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setCpuL2CacheCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={cpuL2CacheCapacity}
      withAsterisk
    />
  );

  // page 2 -> specifications -> cpu -> cpu L2 cache capacity unit

  // page 2 -> specifications -> cpu -> cpu L2 cache capacity unit -> select input element
  const [createdCpuL2CacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: 'Select CPU L2 cache capacity unit',
        label: 'CPU L2 Cache Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuL2CacheCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: cpuL2CacheCapacityUnit,
        required: true,
      },
    ]);

  // page 2 -> specifications -> cpu -> cpu L3 cache capacity

  // page 2 -> specifications -> cpu -> cpu L3 cache capacity -> number input element
  const createdCpuL3CacheCapacityNumberInput = (
    <NumberInput
      description="Enter CPU L3 cache capacity"
      label="CPU L3 Cache Capacity"
      max={1024}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setCpuL3CacheCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={cpuL3CacheCapacity}
      withAsterisk
    />
  );

  // page 2 -> specifications -> cpu -> cpu L3 cache capacity unit

  // page 2 -> specifications -> cpu -> cpu L3 cache capacity unit -> select input element
  const [createdCpuL3CacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: 'Select CPU L3 cache capacity unit',
        label: 'CPU L3 Cache Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuL3CacheCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: cpuL3CacheCapacityUnit,
        required: true,
      },
    ]);

  // page 2 -> specifications -> cpu -> cpu wattage

  // page 2 -> specifications -> cpu -> cpu wattage -> number input element
  const createdCpuWattageNumberInput = (
    <NumberInput
      description="Enter CPU wattage in Watts(W)"
      label="CPU Wattage"
      max={999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setCpuWattage,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={cpuWattage}
      withAsterisk
    />
  );

  // page 2 -> specifications -> gpu

  // page 2 -> specifications -> gpu -> gpu chipset

  // page 2 -> specifications -> gpu -> gpu chipset -> accessible screen reader text elements
  const [gpuChipsetInputErrorText, gpuChipsetInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'gpu chipset',
      inputText: gpuChipset,
      isInputTextFocused: isGpuChipsetFocused,
      isValidInputText: isGpuChipsetValid,
      regexValidationText: returnSocketChipsetValidationText({
        content: gpuChipset,
        contentKind: 'gpu chipset',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> specifications -> gpu -> gpu chipset -> text input element creator
  const [createdGpuChipsetTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: gpuChipsetInputErrorText,
        valid: gpuChipsetInputValidText,
      },
      inputText: gpuChipset,
      isValidInputText: isGpuChipsetValid,
      label: 'GPU Chipset',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuChipsetFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setGpuChipset,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuChipsetFocused,
          payload: true,
        });
      },
      placeholder: 'Enter GPU chipset',
      required: true,
      semanticName: 'gpu chipset',
    },
  ]);

  // page 2 -> specifications -> gpu -> gpu memory capacity

  // page 2 -> specifications -> gpu -> gpu memory capacity -> number input element
  const createdGpuMemoryCapacityNumberInput = (
    <NumberInput
      description="Enter GPU memory capacity"
      label="GPU Memory Capacity"
      max={4096}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setGpuMemoryCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={gpuMemoryCapacity}
      withAsterisk
    />
  );

  // page 2 -> specifications -> gpu -> gpu memory capacity unit

  // page 2 -> specifications -> gpu -> gpu memory capacity unit -> select input element
  const [createdGpuMemoryCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: 'Select GPU memory capacity unit',
        label: 'GPU Memory Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setGpuMemoryCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: gpuMemoryCapacityUnit,
        required: true,
      },
    ]);

  // page 2 -> specifications -> gpu -> gpu core clock

  // page 2 -> specifications -> gpu -> gpu core clock -> number input element
  const createdGpuCoreClockNumberInput = (
    <NumberInput
      description="Enter GPU core clock in MHz"
      label="GPU Core Clock"
      max={9999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setGpuCoreClock,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={gpuCoreClock}
      withAsterisk
    />
  );

  // page 2 -> specifications -> gpu -> gpu boost clock

  // page 2 -> specifications -> gpu -> gpu boost clock -> number input element
  const createdGpuBoostClockNumberInput = (
    <NumberInput
      description="Enter GPU boost clock in MHz"
      label="GPU Boost Clock"
      max={9999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setGpuBoostClock,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={gpuBoostClock}
      withAsterisk
    />
  );

  // page 2 -> specifications -> gpu -> gpu wattage

  // page 2 -> specifications -> gpu -> gpu wattage -> number input element
  const createdGpuWattageNumberInput = (
    <NumberInput
      description="Enter GPU wattage in Watts(W)"
      label="GPU Wattage"
      max={999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setGpuTdp,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={gpuTdp}
      withAsterisk
    />
  );

  //
  //
  //
  return <Group w={330}>{createdQuantityNumberInput}</Group>;
}

export default CreateProduct;
