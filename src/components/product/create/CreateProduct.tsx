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
  returnColorVariantValidationText,
  returnDisplayAspectRatioValidationText,
  returnGrammarValidationText,
  returnNumberAmountValidationText,
  returnRamTimingValidationText,
  returnSerialIdValidationText,
  returnSocketChipsetValidationText,
  urlBuilder,
} from '../../../utils';
import { InvalidTokenError } from 'jwt-decode';
import { globalAction } from '../../../context/globalProvider/state';
import { Currency, ResourceRequestServerResponse } from '../../../types';
import {
  CaseSidePanel,
  CaseType,
  DimensionUnit,
  MemoryType,
  MemoryUnit,
  MonitorPanelType,
  MotherboardFormFactor,
  ProductDocument,
  PsuEfficiency,
  PsuFormFactor,
  PsuModularity,
  StorageFormFactor,
  StorageInterface,
  StorageType,
  WeightUnit,
} from './types';
import {
  ACCESSORY_TYPE_REGEX,
  BRAND_REGEX,
  CASE_SIDE_PANEL_DATA,
  CASE_TYPE_DATA,
  COLOR_VARIANT_REGEX,
  CPU_SOCKET_REGEX,
  DIMENSION_UNIT_DATA,
  GPU_CHIPSET_REGEX,
  HEADPHONE_FREQUENCY_RESPONSE_REGEX,
  MEMORY_UNIT_DATA,
  DISPLAY_ASPECT_RATIO_REGEX,
  MONITOR_PANEL_TYPE_DATA,
  MOTHERBOARD_CHIPSET_REGEX,
  MOTHERBOARD_FORM_FACTOR_DATA,
  MOTHERBOARD_MEMORY_TYPE_DATA,
  MOTHERBOARD_SOCKET_REGEX,
  PSU_EFFICIENCY_RATING_DATA,
  PSU_FORM_FACTOR_DATA,
  PSU_MODULARITY_DATA,
  RAM_MEMORY_TYPE_DATA,
  RAM_TIMING_REGEX,
  SMARTPHONE_CHIPSET_REGEX,
  SPEAKER_FREQUENCY_RESPONSE_REGEX,
  STORAGE_FORM_FACTOR_DATA,
  STORAGE_INTERFACE_DATA,
  STORAGE_TYPE_DATA,
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
    isRamColorFocused,
    isRamColorValid,
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
    isCaseColorFocused,
    isCaseColorValid,
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
    isMouseColorFocused,
    isMouseColorValid,
    mouseInterface,

    // page 2 -> specifications -> headphone
    headphoneType,
    headphoneDriver,
    headphoneFrequencyResponse,
    isHeadphoneFrequencyResponseValid,
    isHeadphoneFrequencyResponseFocused,
    headphoneImpedance,
    headphoneColor,
    isHeadphoneColorFocused,
    isHeadphoneColorValid,
    headphoneInterface,

    // page 2 -> specifications -> speaker
    speakerType,
    speakerTotalWattage,
    speakerFrequencyResponse,
    isSpeakerFrequencyResponseValid,
    isSpeakerFrequencyResponseFocused,
    speakerColor,
    isSpeakerColorFocused,
    isSpeakerColorValid,
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
    isSmartphoneColorFocused,
    isSmartphoneColorValid,

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
    isTabletColorFocused,
    isTabletColorValid,

    // page 2 -> specifications -> accessory
    accessoryType,
    isAccessoryTypeValid,
    isAccessoryTypeFocused,
    accessoryColor,
    isAccessoryColorFocused,
    isAccessoryColorValid,
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

  // validate ram color variant on every change
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(ramTiming);

    createProductDispatch({
      type: createProductAction.setIsRamTimingValid,
      payload: isValid,
    });
  }, []);

  // validate RAM timing on every change
  useEffect(() => {
    const isValid = RAM_TIMING_REGEX.test(ramTiming);

    createProductDispatch({
      type: createProductAction.setIsRamTimingValid,
      payload: isValid,
    });
  }, [ramTiming]);

  // validate case color variant on every change
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(caseColor);

    createProductDispatch({
      type: createProductAction.setIsCaseColorValid,
      payload: isValid,
    });
  }, [caseColor]);

  // validate monitor aspect ratio on every change
  useEffect(() => {
    const isValid = DISPLAY_ASPECT_RATIO_REGEX.test(monitorAspectRatio);

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
      max={8192}
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
      max={8192}
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
      max={8192}
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
      max={8192}
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
      max={8192}
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

  // page 2 -> specifications -> motherboard

  // page 2 -> specifications -> motherboard -> motherboard socket

  // page 2 -> specifications -> motherboard -> motherboard socket -> accessible screen reader text elements
  const [motherboardSocketInputErrorText, motherboardSocketInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'motherboard socket',
      inputText: motherboardSocket,
      isInputTextFocused: isMotherboardSocketFocused,
      isValidInputText: isMotherboardSocketValid,
      regexValidationText: returnSocketChipsetValidationText({
        content: motherboardSocket,
        contentKind: 'motherboard socket',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> specifications -> motherboard -> motherboard socket -> text input element creator
  const [createdMotherboardSocketTextInput] = returnAccessibleTextInputElements(
    [
      {
        description: {
          error: motherboardSocketInputErrorText,
          valid: motherboardSocketInputValidText,
        },
        inputText: motherboardSocket,
        isValidInputText: isMotherboardSocketValid,
        label: 'Motherboard Socket',
        maxLength: 30,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardSocketFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardSocket,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardSocketFocused,
            payload: true,
          });
        },
        placeholder: 'Enter motherboard socket',
        required: true,
        semanticName: 'motherboard socket',
      },
    ]
  );

  // page 2 -> specifications -> motherboard -> motherboard chipset

  // page 2 -> specifications -> motherboard -> motherboard chipset -> accessible screen reader text elements
  const [motherboardChipsetInputErrorText, motherboardChipsetInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'motherboard chipset',
      inputText: motherboardChipset,
      isInputTextFocused: isMotherboardChipsetFocused,
      isValidInputText: isMotherboardChipsetValid,
      regexValidationText: returnSocketChipsetValidationText({
        content: motherboardChipset,
        contentKind: 'motherboard chipset',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> specifications -> motherboard -> motherboard chipset -> text input element creator
  const [createdMotherboardChipsetTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: motherboardChipsetInputErrorText,
          valid: motherboardChipsetInputValidText,
        },
        inputText: motherboardChipset,
        isValidInputText: isMotherboardChipsetValid,
        label: 'Motherboard Chipset',
        maxLength: 30,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardChipsetFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardChipset,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardChipsetFocused,
            payload: true,
          });
        },
        placeholder: 'Enter motherboard chipset',
        required: true,
        semanticName: 'motherboard chipset',
      },
    ]);

  // page 2 -> specifications -> motherboard -> motherboard form factor

  // page 2 -> specifications -> motherboard -> motherboard form factor -> select input element
  const [createdMotherboardFormFactorSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MOTHERBOARD_FORM_FACTOR_DATA,
        description: 'Select motherboard form factor',
        label: 'Motherboard Form Factor',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardFormFactor,
            payload: event.currentTarget.value as MotherboardFormFactor,
          });
        },
        value: motherboardFormFactor,
        required: true,
      },
    ]);

  // page 2 -> specifications -> motherboard -> motherboard memory max capacity

  // page 2 -> specifications -> motherboard -> motherboard memory max capacity -> number input element
  const createdMotherboardMemoryMaxCapacityNumberInput = (
    <NumberInput
      description="Enter motherboard memory max capacity"
      label="Motherboard Memory Max Capacity"
      max={8192}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMotherboardMemoryMaxCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={motherboardMemoryMaxCapacity}
      withAsterisk
    />
  );

  // page 2 -> specifications -> motherboard -> motherboard memory max capacity unit

  // page 2 -> specifications -> motherboard -> motherboard memory max capacity unit -> select input element
  const [createdMotherboardMemoryMaxCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: 'Select motherboard memory max capacity unit',
        label: 'Motherboard Memory Max Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardMemoryMaxCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: motherboardMemoryMaxCapacityUnit,
        required: true,
      },
    ]);

  // page 2 -> specifications -> motherboard -> motherboard memory slots

  // page 2 -> specifications -> motherboard -> motherboard memory slots -> number input element
  const createdMotherboardMemorySlotsNumberInput = (
    <NumberInput
      description="Enter motherboard memory slots"
      label="Motherboard Memory Slots"
      max={96}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMotherboardMemorySlots,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={motherboardMemorySlots}
      withAsterisk
    />
  );

  // page 2 -> specifications -> motherboard -> motherboard memory type

  // page 2 -> specifications -> motherboard -> motherboard memory type -> select input element
  const [createdMotherboardMemoryTypeSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MOTHERBOARD_MEMORY_TYPE_DATA,
        description: 'Select motherboard memory type',
        label: 'Motherboard Memory Type',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardMemoryType,
            payload: event.currentTarget.value as MemoryType,
          });
        },
        value: motherboardMemoryType,
        required: true,
      },
    ]);

  // page 2 -> specifications -> motherboard -> motherboard sata ports

  // page 2 -> specifications -> motherboard -> motherboard sata ports -> number input element
  const createdMotherboardSataPortsNumberInput = (
    <NumberInput
      description="Enter motherboard SATA ports"
      label="Motherboard SATA Ports"
      max={48}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMotherboardSataPorts,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={motherboardSataPorts}
      withAsterisk
    />
  );

  // page 2 -> specifications -> motherboard -> motherboard m2 slots

  // page 2 -> specifications -> motherboard -> motherboard m2 slots -> number input element
  const createdMotherboardM2SlotsNumberInput = (
    <NumberInput
      description="Enter motherboard M.2 slots"
      label="Motherboard M.2 Slots"
      max={24}
      min={0}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMotherboardM2Slots,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={motherboardM2Slots}
      withAsterisk
    />
  );

  // page 2 -> specifications -> motherboard -> motherboard pcie3 slots

  // page 2 -> specifications -> motherboard -> motherboard pcie3 slots -> number input element
  const createdMotherboardPcie3SlotsNumberInput = (
    <NumberInput
      description="Enter motherboard PCIe3 slots"
      label="Motherboard PCIe3 Slots"
      max={24}
      min={0}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMotherboardPcie3Slots,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={motherboardPcie3Slots}
      withAsterisk
    />
  );

  // page 2 -> specifications -> motherboard -> motherboard pcie4 slots

  // page 2 -> specifications -> motherboard -> motherboard pcie4 slots -> number input element
  const createdMotherboardPcie4SlotsNumberInput = (
    <NumberInput
      description="Enter motherboard PCIe4 slots"
      label="Motherboard PCIe4 Slots"
      max={24}
      min={0}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMotherboardPcie4Slots,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={motherboardPcie4Slots}
      withAsterisk
    />
  );

  // page 2 -> specifications -> motherboard -> motherboard pcie5 slots

  // page 2 -> specifications -> motherboard -> motherboard pcie5 slots -> number input element
  const createdMotherboardPcie5SlotsNumberInput = (
    <NumberInput
      description="Enter motherboard PCIe5 slots"
      label="Motherboard PCIe5 Slots"
      max={24}
      min={0}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMotherboardPcie5Slots,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={motherboardPcie5Slots}
      withAsterisk
    />
  );

  // page 2 -> specifications -> ram

  // page 2 -> specifications -> ram -> ram frequency

  // page 2 -> specifications -> ram -> ram frequency -> number input element
  const createdRamFrequencyNumberInput = (
    <NumberInput
      description="Enter RAM frequency in MHz"
      label="RAM Frequency"
      max={9999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setRamFrequency,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={ramFrequency}
      withAsterisk
    />
  );

  // page 2 -> specifications -> ram -> ram modules quantity

  // page 2 -> specifications -> ram -> ram modules quantity -> number input element
  const createdRamModulesQuantityNumberInput = (
    <NumberInput
      description="Enter RAM modules quantity"
      label="RAM Modules Quantity"
      max={96}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setRamModulesQuantity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={ramModulesQuantity}
      withAsterisk
    />
  );

  // page 2 -> specifications -> ram -> ram modules capacity

  // page 2 -> specifications -> ram -> ram modules capacity -> number input element
  const createdRamModulesCapacityNumberInput = (
    <NumberInput
      description="Enter RAM modules capacity"
      label="RAM Modules Capacity"
      max={8192}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setRamModulesCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={ramModulesCapacity}
      withAsterisk
    />
  );

  // page 2 -> specifications -> ram -> ram modules capacity unit

  // page 2 -> specifications -> ram -> ram modules capacity unit -> select input element
  const [createdRamModulesCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: 'Select RAM modules capacity unit',
        label: 'RAM Modules Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setRamModulesCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: ramModulesCapacityUnit,
        required: true,
      },
    ]);

  // page 2 -> specifications -> ram -> ram modules type

  // page 2 -> specifications -> ram -> ram modules type -> select input element
  const [createdRamTypeSelectInput] = returnAccessibleSelectInputElements([
    {
      data: RAM_MEMORY_TYPE_DATA,
      description: 'Select RAM modules type',
      label: 'RAM Type',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setRamType,
          payload: event.currentTarget.value as MemoryType,
        });
      },
      value: ramType,
      required: true,
    },
  ]);

  // page 2 -> specifications -> ram -> ram color

  // page 2 -> specifications -> ram -> ram color -> accessible screen reader text elements
  const [ramColorInputErrorText, ramColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'ram color',
      inputText: ramColor,
      isInputTextFocused: isRamColorFocused,
      isValidInputText: isRamColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: ramColor,
        contentKind: 'ram color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> specifications -> ram -> ram color -> text input element creator
  const [createdRamColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: ramColorInputErrorText,
        valid: ramColorInputValidText,
      },
      inputText: ramColor,
      isValidInputText: isRamColorValid,
      label: 'RAM Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsRamColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setRamColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsRamColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter RAM color',
      required: true,
      semanticName: 'ram color',
    },
  ]);

  // page 2 -> specifications -> ram -> ram voltage

  // page 2 -> specifications -> ram -> ram voltage -> number input element
  const createdRamVoltageNumberInput = (
    <NumberInput
      description="Enter RAM voltage in Volts(V)"
      label="RAM Voltage"
      max={9.99}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setRamVoltage,
          payload: value,
        });
      }}
      precision={2}
      required
      startValue={1}
      step={0.01}
      type="number"
      value={ramVoltage}
      withAsterisk
    />
  );

  // page 2 -> specifications -> ram -> ram timing

  // page 2 -> specifications -> ram -> ram timing -> accessible screen reader text elements
  const [ramTimingInputErrorText, ramTimingInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'ram timing',
      inputText: ramTiming,
      isInputTextFocused: isRamTimingFocused,
      isValidInputText: isRamTimingValid,
      regexValidationText: returnRamTimingValidationText({
        content: ramTiming,
        contentKind: 'ram timing',
        maxLength: 11,
        minLength: 11,
      }),
    });

  // page 2 -> specifications -> ram -> ram timing -> text input element creator
  const [createdRamTimingTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: ramTimingInputErrorText,
        valid: ramTimingInputValidText,
      },
      inputText: ramTiming,
      isValidInputText: isRamTimingValid,
      label: 'RAM Timing',
      maxLength: 11,
      minLength: 11,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsRamTimingFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setRamTiming,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsRamTimingFocused,
          payload: true,
        });
      },
      placeholder: 'Enter RAM timing',
      required: true,
      semanticName: 'ram timing',
    },
  ]);

  // page 2 -> specifications -> storage

  // page 2 -> specifications -> storage -> storage type

  // page 2 -> specifications -> storage -> storage type -> select input element
  const [createdStorageTypeSelectInput] = returnAccessibleSelectInputElements([
    {
      data: STORAGE_TYPE_DATA,
      description: 'Select storage type',
      label: 'Storage Type',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setStorageType,
          payload: event.currentTarget.value as StorageType,
        });
      },
      value: storageType,
      required: true,
    },
  ]);

  // page 2 -> specifications -> storage -> storage capacity

  // page 2 -> specifications -> storage -> storage capacity -> number input element
  const createdStorageCapacityNumberInput = (
    <NumberInput
      description="Enter storage capacity"
      label="Storage Capacity"
      max={8192}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setStorageCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={storageCapacity}
      withAsterisk
    />
  );

  // page 2 -> specifications -> storage -> storage capacity unit

  // page 2 -> specifications -> storage -> storage capacity unit -> select input element
  const [createdStorageCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: 'Select storage capacity unit',
        label: 'Storage Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setStorageCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: storageCapacityUnit,
        required: true,
      },
    ]);

  // page 2 -> specifications -> storage -> storage cache capacity

  // page 2 -> specifications -> storage -> storage cache capacity -> number input element
  const createdStorageCacheCapacityNumberInput = (
    <NumberInput
      description="Enter storage cache capacity"
      label="Storage Cache Capacity"
      max={8192}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setStorageCacheCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={storageCacheCapacity}
      withAsterisk
    />
  );

  // page 2 -> specifications -> storage -> storage cache capacity unit

  // page 2 -> specifications -> storage -> storage cache capacity unit -> select input element
  const [createdStorageCacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: 'Select storage cache capacity unit',
        label: 'Storage Cache Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setStorageCacheCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: storageCacheCapacityUnit,
        required: true,
      },
    ]);

  // page 2 -> specifications -> storage -> storage form factor

  // page 2 -> specifications -> storage -> storage form factor -> select input element
  const [createdStorageFormFactorSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: STORAGE_FORM_FACTOR_DATA,
        description: 'Select storage form factor',
        label: 'Storage Form Factor',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setStorageFormFactor,
            payload: event.currentTarget.value as StorageFormFactor,
          });
        },
        value: storageFormFactor,
        required: true,
      },
    ]);

  // page 2 -> specifications -> storage -> storage interface

  // page 2 -> specifications -> storage -> storage interface -> select input element
  const [createdStorageInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: STORAGE_INTERFACE_DATA,
        description: 'Select storage interface',
        label: 'Storage Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setStorageInterface,
            payload: event.currentTarget.value as StorageInterface,
          });
        },
        value: storageInterface,
        required: true,
      },
    ]);

  // page 2 -> specifications -> psu

  // page 2 -> specifications -> psu -> psu wattage

  // page 2 -> specifications -> psu -> psu wattage -> number input element
  const createdPsuWattageNumberInput = (
    <NumberInput
      description="Enter PSU wattage in Watts(W)"
      label="PSU Wattage"
      max={9999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setPsuWattage,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={psuWattage}
      withAsterisk
    />
  );

  // page 2 -> specifications -> psu -> psu efficiency rating

  // page 2 -> specifications -> psu -> psu efficiency rating -> select input element
  const [createdPsuEfficiencyRatingSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PSU_EFFICIENCY_RATING_DATA,
        description: 'Select PSU efficiency rating',
        label: 'PSU Efficiency Rating',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuEfficiency,
            payload: event.currentTarget.value as PsuEfficiency,
          });
        },
        value: psuEfficiency,
        required: true,
      },
    ]);

  // page 2 -> specifications -> psu -> psu modularity

  // page 2 -> specifications -> psu -> psu modularity -> select input element
  const [createdPsuModularitySelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: PSU_MODULARITY_DATA,
        description: 'Select PSU modularity',
        label: 'PSU Modularity',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuModularity,
            payload: event.currentTarget.value as PsuModularity,
          });
        },
        value: psuModularity,
        required: true,
      },
    ]
  );

  // page 2 -> specifications -> psu -> psu form factor

  // page 2 -> specifications -> psu -> psu form factor -> select input element
  const [createdPsuFormFactorSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: PSU_FORM_FACTOR_DATA,
        description: 'Select PSU form factor',
        label: 'PSU Form Factor',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuFormFactor,
            payload: event.currentTarget.value as PsuFormFactor,
          });
        },
        value: psuFormFactor,
        required: true,
      },
    ]
  );

  // page 2 -> specifications -> case

  // page 2 -> specifications -> case -> case type

  // page 2 -> specifications -> case -> case type -> select input element
  const [createdCaseTypeSelectInput] = returnAccessibleSelectInputElements([
    {
      data: CASE_TYPE_DATA,
      description: 'Select case type',
      label: 'Case Type',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setCaseType,
          payload: event.currentTarget.value as CaseType,
        });
      },
      value: caseType,
      required: true,
    },
  ]);

  // page 2 -> specifications -> case -> case color

  // page 2 -> specifications -> case -> case color -> accessible screen reader text elements
  const [caseColorInputErrorText, caseColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'case color',
      inputText: caseColor,
      isInputTextFocused: isCaseColorFocused,
      isValidInputText: isCaseColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: caseColor,
        contentKind: 'case color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> specifications -> case -> case color -> text input element creator
  const [createdCaseColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: caseColorInputErrorText,
        valid: caseColorInputValidText,
      },
      inputText: caseColor,
      isValidInputText: isCaseColorValid,
      label: 'Case Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsCaseColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setCaseColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsCaseColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter case color',
      required: true,
      semanticName: 'case color',
    },
  ]);

  // page 2 -> specifications -> case -> case side panel

  // page 2 -> specifications -> case -> case side panel -> select input element
  const [createdCaseSidePanelSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: CASE_SIDE_PANEL_DATA,
        description: 'Select case side panel',
        label: 'Case Side Panel',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setCaseSidePanel,
            payload: event.currentTarget.value as CaseSidePanel,
          });
        },
        value: caseSidePanel,
        required: true,
      },
    ]
  );

  // page 2 -> specifications -> monitor

  // page 2 -> specifications -> monitor -> monitor size

  // page 2 -> specifications -> monitor -> monitor size -> number input element
  const createdMonitorSizeNumberInput = (
    <NumberInput
      description="Enter monitor size in inches"
      label="Monitor Size"
      max={99}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMonitorSize,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={monitorSize}
      withAsterisk
    />
  );

  // page 2 -> specifications -> monitor -> monitor resolution

  // page 2 -> specifications -> monitor -> monitor resolution -> horizontal

  // page 2 -> specifications -> monitor -> monitor resolution -> horizontal -> number input element
  const createdMonitorResolutionHorizontalNumberInput = (
    <NumberInput
      description="Enter monitor horizontal resolution"
      label="Monitor Resolution Horizontal"
      max={99999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMonitorResolutionHorizontal,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={monitorResolutionHorizontal}
      withAsterisk
    />
  );

  // page 2 -> specifications -> monitor -> monitor resolution -> vertical

  // page 2 -> specifications -> monitor -> monitor resolution -> vertical -> number input element
  const createdMonitorResolutionVerticalNumberInput = (
    <NumberInput
      description="Enter monitor vertical resolution"
      label="Monitor Resolution Vertical"
      max={99999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMonitorResolutionVertical,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={monitorResolutionVertical}
      withAsterisk
    />
  );

  // page 2 -> specifications -> monitor -> monitor refresh rate

  // page 2 -> specifications -> monitor -> monitor refresh rate -> number input element
  const createdMonitorRefreshRateNumberInput = (
    <NumberInput
      description="Enter monitor refresh rate in Hz"
      label="Monitor Refresh Rate"
      max={999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMonitorRefreshRate,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={monitorRefreshRate}
      withAsterisk
    />
  );

  // page 2 -> specifications -> monitor -> monitor panel type

  // page 2 -> specifications -> monitor -> monitor panel type -> select input element
  const [createdMonitorPanelTypeSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MONITOR_PANEL_TYPE_DATA,
        description: 'Select monitor panel type',
        label: 'Monitor Panel Type',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setMonitorPanelType,
            payload: event.currentTarget.value as MonitorPanelType,
          });
        },
        value: monitorPanelType,
        required: true,
      },
    ]);

  // page 2 -> specifications -> monitor -> monitor response time

  // page 2 -> specifications -> monitor -> monitor response time -> number input element
  const createdMonitorResponseTimeNumberInput = (
    <NumberInput
      description="Enter monitor response time in ms"
      label="Monitor Response Time"
      max={99}
      min={0.1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMonitorResponseTime,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={0.01}
      type="number"
      value={monitorResponseTime}
      withAsterisk
    />
  );

  // page 2 -> specifications -> monitor -> monitor aspect ratio

  // page 2 -> specifications -> monitor -> monitor aspect ratio -> accessible screen reader text elements
  const [monitorAspectRatioInputErrorText, monitorAspectRatioInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'monitor aspect ratio',
      inputText: monitorAspectRatio,
      isInputTextFocused: isMonitorAspectRatioFocused,
      isValidInputText: isMonitorAspectRatioValid,
      regexValidationText: returnDisplayAspectRatioValidationText({
        content: monitorAspectRatio,
        contentKind: 'monitor aspect ratio',
        maxLength: 5,
        minLength: 5,
      }),
    });

  // page 2 -> specifications -> monitor -> monitor aspect ratio -> text input element creator
  const [createdMonitorAspectRatioTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: monitorAspectRatioInputErrorText,
          valid: monitorAspectRatioInputValidText,
        },
        inputText: monitorAspectRatio,
        isValidInputText: isMonitorAspectRatioValid,
        label: 'Monitor Aspect Ratio',
        maxLength: 5,
        minLength: 5,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsMonitorAspectRatioFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setMonitorAspectRatio,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsMonitorAspectRatioFocused,
            payload: true,
          });
        },
        placeholder: 'Enter monitor aspect ratio',
        required: true,
        semanticName: 'monitor aspect ratio',
      },
    ]);

  //
  //
  //
  return <Group w={330}>{createdQuantityNumberInput}</Group>;
}

export default CreateProduct;
