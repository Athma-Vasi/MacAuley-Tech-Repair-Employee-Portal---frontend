import { Group, NumberInput, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InvalidTokenError } from 'jwt-decode';
import { ChangeEvent, MouseEvent, useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { TbUpload } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import {
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
  SERIAL_ID_REGEX,
} from '../../../constants/regex';
import { globalAction } from '../../../context/globalProvider/state';
import { useGlobalState, useWrapFetch } from '../../../hooks';
import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessibleRadioGroupInputsElements,
  returnAccessibleRadioSingleInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { Currency, ResourceRequestServerResponse } from '../../../types';
import {
  logState,
  returnBrandNameValidationText,
  returnColorVariantValidationText,
  returnDisplayAspectRatioValidationText,
  returnFrequencyResponseValidationText,
  returnGrammarValidationText,
  returnMobileCameraResolutionValidationText,
  returnNumberAmountValidationText,
  returnRamTimingValidationText,
  returnSerialIdValidationText,
  returnSocketChipsetValidationText,
  urlBuilder,
} from '../../../utils';
import { CURRENCY_DATA } from '../../benefits/constants';
import { PRODUCT_CATEGORIES } from '../../dashboard/constants';
import { ProductCategory } from '../../dashboard/types';
import FormReviewPage, {
  FormReviewObject,
} from '../../formReviewPage/FormReviewPage';
import { ImageUpload } from '../../imageUpload';
import { NotificationModal } from '../../notificationModal';
import { FormLayoutWrapper, StepperWrapper } from '../../wrappers';
import {
  ACCESSORY_TYPE_REGEX,
  BRAND_REGEX,
  CASE_SIDE_PANEL_DATA,
  CASE_TYPE_DATA,
  COLOR_VARIANT_REGEX,
  CPU_SOCKET_REGEX,
  CREATE_PRODUCT_DESCRIPTION_OBJECTS,
  CREATE_PRODUCT_MAX_IMG_AMOUNT,
  CREATE_PRODUCT_MAX_IMG_SIZE,
  CREATE_PRODUCT_MAX_STEPPER_POSITION,
  DIMENSION_UNIT_DATA,
  DISPLAY_ASPECT_RATIO_REGEX,
  FREQUENCY_RESPONSE_REGEX,
  GPU_CHIPSET_REGEX,
  HEADPHONE_INTERFACE_DATA,
  HEADPHONE_TYPE_DATA,
  KEYBOARD_BACKLIGHT_DATA,
  KEYBOARD_LAYOUT_DATA,
  KEYBOARD_SWITCH_DATA,
  MEMORY_UNIT_DATA,
  MOBILE_CAMERA_REGEX,
  MOBILE_OS_DATA,
  MONITOR_PANEL_TYPE_DATA,
  MOTHERBOARD_CHIPSET_REGEX,
  MOTHERBOARD_FORM_FACTOR_DATA,
  MOTHERBOARD_MEMORY_TYPE_DATA,
  MOTHERBOARD_SOCKET_REGEX,
  MOUSE_SENSOR_DATA,
  PERIPHERALS_INTERFACE_DATA,
  PRODUCT_AVAILABILITY_DATA,
  PSU_EFFICIENCY_RATING_DATA,
  PSU_FORM_FACTOR_DATA,
  PSU_MODULARITY_DATA,
  RAM_MEMORY_TYPE_DATA,
  RAM_TIMING_REGEX,
  SMARTPHONE_CHIPSET_REGEX,
  SPEAKER_INTERFACE_DATA,
  SPEAKER_TYPE_DATA,
  STORAGE_FORM_FACTOR_DATA,
  STORAGE_INTERFACE_DATA,
  STORAGE_TYPE_DATA,
  TABLET_CHIPSET_REGEX,
  WEIGHT_UNIT_DATA,
} from '../constants';
import {
  createProductAction,
  createProductReducer,
  initialCreateProductState,
} from './state';
import {
  CaseSidePanel,
  CaseType,
  DimensionUnit,
  HeadphoneInterface,
  HeadphoneType,
  KeyboardBacklight,
  KeyboardLayout,
  KeyboardSwitch,
  MemoryType,
  MemoryUnit,
  MobileOs,
  MonitorPanelType,
  MotherboardFormFactor,
  MouseSensor,
  PeripheralsInterface,
  ProductAvailability,
  ProductDocument,
  PsuEfficiency,
  PsuFormFactor,
  PsuModularity,
  SpeakerInterface,
  SpeakerType,
  StorageFormFactor,
  StorageInterface,
  StorageType,
  WeightUnit,
} from './types';

function CreateProduct() {
  const [createProductState, createProductDispatch] = useReducer(
    createProductReducer,
    initialCreateProductState
  );

  const {
    globalDispatch,
    globalState: { padding },
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
    ramDataRate,
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
    isSmartphoneCameraFocused,
    isSmartphoneCameraValid,
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
    isTabletCameraFocused,
    isTabletCameraValid,
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
    const isValid = COLOR_VARIANT_REGEX.test(ramColor);

    createProductDispatch({
      type: createProductAction.setIsRamTimingValid,
      payload: isValid,
    });
  }, [ramColor]);

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

  // validate mouse color variant on every change
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(mouseColor);

    createProductDispatch({
      type: createProductAction.setIsMouseColorValid,
      payload: isValid,
    });
  }, [mouseColor]);

  // validate headphone frequency response on every change
  useEffect(() => {
    const isValid = FREQUENCY_RESPONSE_REGEX.test(headphoneFrequencyResponse);

    createProductDispatch({
      type: createProductAction.setIsHeadphoneFrequencyResponseValid,
      payload: isValid,
    });
  }, [headphoneFrequencyResponse]);

  // validate headphone color variant on every change
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(headphoneColor);

    createProductDispatch({
      type: createProductAction.setIsHeadphoneColorValid,
      payload: isValid,
    });
  }, [headphoneColor]);

  // validate speaker frequency response on every change
  useEffect(() => {
    const isValid = FREQUENCY_RESPONSE_REGEX.test(speakerFrequencyResponse);

    createProductDispatch({
      type: createProductAction.setIsSpeakerFrequencyResponseValid,
      payload: isValid,
    });
  }, [speakerFrequencyResponse]);

  // validate speaker color variant on every change
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(speakerColor);

    createProductDispatch({
      type: createProductAction.setIsSpeakerColorValid,
      payload: isValid,
    });
  }, [speakerColor]);

  // validate smartphone chipset on every change
  useEffect(() => {
    const isValid = SMARTPHONE_CHIPSET_REGEX.test(smartphoneChipset);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneChipsetValid,
      payload: isValid,
    });
  }, [smartphoneChipset]);

  // validate smartphone camera on every change
  useEffect(() => {
    const isValid = MOBILE_CAMERA_REGEX.test(smartphoneCamera);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneCameraValid,
      payload: isValid,
    });
  }, [smartphoneCamera]);

  // validate smartphone color variant on every change
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(smartphoneColor);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneColorValid,
      payload: isValid,
    });
  }, [smartphoneColor]);

  // validate tablet chipset on every change
  useEffect(() => {
    const isValid = TABLET_CHIPSET_REGEX.test(tabletChipset);

    createProductDispatch({
      type: createProductAction.setIsTabletChipsetValid,
      payload: isValid,
    });
  }, [tabletChipset]);

  // validate tablet camera on every change
  useEffect(() => {
    const isValid = MOBILE_CAMERA_REGEX.test(tabletCamera);

    createProductDispatch({
      type: createProductAction.setIsTabletCameraValid,
      payload: isValid,
    });
  }, [tabletCamera]);

  // validate tablet color variant on every change
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(tabletColor);

    createProductDispatch({
      type: createProductAction.setIsTabletColorValid,
      payload: isValid,
    });
  }, [tabletColor]);

  // validate accessory type on every change
  useEffect(() => {
    const isValid = ACCESSORY_TYPE_REGEX.test(accessoryType);

    createProductDispatch({
      type: createProductAction.setIsAccessoryTypeValid,
      payload: isValid,
    });
  }, [accessoryType]);

  // validate accessory color variant on every change
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(accessoryColor);

    createProductDispatch({
      type: createProductAction.setIsAccessoryColorValid,
      payload: isValid,
    });
  }, [accessoryColor]);

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
    // select inputs are not included as they always have a default value
    // inputs with value: 0 count as error

    const areCpuSpecificationsInError =
      !isCpuSocketValid ||
      !cpuFrequency ||
      !cpuCores ||
      !cpuL1CacheCapacity ||
      !cpuL2CacheCapacity ||
      !cpuL3CacheCapacity ||
      !cpuWattage;

    const areGpuSpecificationsInError =
      !isGpuChipsetValid ||
      !gpuMemoryCapacity ||
      !gpuCoreClock ||
      !gpuBoostClock ||
      !gpuTdp;

    const areMotherboardSpecificationsInError =
      !isMotherboardSocketValid ||
      !isMotherboardChipsetValid ||
      !motherboardMemoryMaxCapacity ||
      !motherboardMemorySlots ||
      !motherboardSataPorts ||
      !motherboardM2Slots ||
      !motherboardPcie3Slots ||
      !motherboardPcie4Slots ||
      !motherboardPcie5Slots;

    const areRamSpecificationsInError =
      !ramDataRate ||
      !ramModulesQuantity ||
      !ramModulesCapacity ||
      !isRamTimingValid ||
      !isRamColorValid ||
      !ramVoltage;

    const areStorageSpecificationsInError =
      !storageCapacity || !storageCacheCapacity;

    const isPsuSpecificationInError = !psuWattage;

    const isCaseSpecificationInError = !caseColor;

    const areMonitorSpecificationsInError =
      !monitorSize ||
      !monitorResolutionHorizontal ||
      !monitorResolutionVertical ||
      !monitorRefreshRate ||
      !monitorResponseTime ||
      !isMonitorAspectRatioValid;

    const areMouseSpecificationsInError =
      !mouseDpi || !mouseButtons || !isMouseColorValid;

    const areHeadphoneSpecificationsInError =
      !headphoneDriver ||
      !isHeadphoneFrequencyResponseValid ||
      !headphoneImpedance ||
      !isHeadphoneColorValid;

    const areSpeakerSpecificationsInError =
      !speakerTotalWattage ||
      !isSpeakerFrequencyResponseValid ||
      !isSpeakerColorValid;

    const areSmartphoneSpecificationsInError =
      !isSmartphoneChipsetValid ||
      !smartphoneDisplay ||
      !smartphoneResolutionHorizontal ||
      !smartphoneResolutionVertical ||
      !smartphoneRamCapacity ||
      !smartphoneStorageCapacity ||
      !smartphoneBatteryCapacity ||
      !isSmartphoneCameraValid ||
      !isSmartphoneColorValid;

    const areTabletSpecificationsInError =
      !isTabletChipsetValid ||
      !tabletDisplay ||
      !tabletResolutionHorizontal ||
      !tabletResolutionVertical ||
      !tabletRamCapacity ||
      !tabletStorageCapacity ||
      !tabletBatteryCapacity ||
      !isTabletCameraValid ||
      !isTabletColorValid;

    const areAccessorySpecificationsInError =
      !isAccessoryTypeValid || !isAccessoryColorValid;

    const areDesktopComputerSpecificationsInError =
      areCpuSpecificationsInError ||
      areGpuSpecificationsInError ||
      areMotherboardSpecificationsInError ||
      areRamSpecificationsInError ||
      areStorageSpecificationsInError ||
      isPsuSpecificationInError ||
      isCaseSpecificationInError ||
      areMonitorSpecificationsInError ||
      areMouseSpecificationsInError ||
      areSpeakerSpecificationsInError;

    const areLaptopSpecificationsInError =
      areCpuSpecificationsInError ||
      areGpuSpecificationsInError ||
      areRamSpecificationsInError ||
      areStorageSpecificationsInError ||
      areMonitorSpecificationsInError;

    const arePage2InputsInError =
      productCategory === 'Accessories'
        ? areAccessorySpecificationsInError
        : productCategory === 'Desktop Computers'
        ? areDesktopComputerSpecificationsInError
        : productCategory === 'Central Processing Units (CPUs)'
        ? areCpuSpecificationsInError
        : productCategory === 'Computer Cases'
        ? isCaseSpecificationInError
        : productCategory === 'Graphics Processing Units (GPUs)'
        ? areGpuSpecificationsInError
        : productCategory === 'Headphones'
        ? areHeadphoneSpecificationsInError
        : productCategory === 'Keyboards'
        ? false // all select inputs
        : productCategory === 'Laptops'
        ? areLaptopSpecificationsInError
        : productCategory === 'Memory (RAM)'
        ? areRamSpecificationsInError
        : productCategory === 'Mice'
        ? areMouseSpecificationsInError
        : productCategory === 'Monitors'
        ? areMonitorSpecificationsInError
        : productCategory === 'Motherboards'
        ? areMotherboardSpecificationsInError
        : productCategory === 'Power Supplies'
        ? isPsuSpecificationInError
        : productCategory === 'Smartphones'
        ? areSmartphoneSpecificationsInError
        : productCategory === 'Speakers'
        ? areSpeakerSpecificationsInError
        : productCategory === 'Storage'
        ? areStorageSpecificationsInError
        : areTabletSpecificationsInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: arePage2InputsInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    caseColor,
    cpuCores,
    cpuFrequency,
    cpuL1CacheCapacity,
    cpuL2CacheCapacity,
    cpuL3CacheCapacity,
    cpuWattage,
    gpuBoostClock,
    gpuCoreClock,
    gpuMemoryCapacity,
    gpuTdp,
    headphoneDriver,
    headphoneImpedance,
    isAccessoryColorValid,
    isAccessoryTypeValid,
    isCpuSocketValid,
    isGpuChipsetValid,
    isHeadphoneColorValid,
    isHeadphoneFrequencyResponseValid,
    isMonitorAspectRatioValid,
    isMotherboardChipsetValid,
    isMotherboardSocketValid,
    isMouseColorValid,
    isRamColorValid,
    isRamTimingValid,
    isSmartphoneCameraValid,
    isSmartphoneChipsetValid,
    isSmartphoneColorValid,
    isSpeakerColorValid,
    isSpeakerFrequencyResponseValid,
    isTabletCameraValid,
    isTabletChipsetValid,
    isTabletColorValid,
    monitorRefreshRate,
    monitorResolutionHorizontal,
    monitorResolutionVertical,
    monitorResponseTime,
    monitorSize,
    motherboardM2Slots,
    motherboardMemoryMaxCapacity,
    motherboardMemorySlots,
    motherboardPcie3Slots,
    motherboardPcie4Slots,
    motherboardPcie5Slots,
    motherboardSataPorts,
    mouseButtons,
    mouseDpi,
    productCategory,
    psuWattage,
    ramDataRate,
    ramModulesCapacity,
    ramModulesQuantity,
    ramVoltage,
    smartphoneBatteryCapacity,
    smartphoneDisplay,
    smartphoneRamCapacity,
    smartphoneResolutionHorizontal,
    smartphoneResolutionVertical,
    smartphoneStorageCapacity,
    speakerTotalWattage,
    storageCacheCapacity,
    storageCapacity,
    tabletBatteryCapacity,
    tabletDisplay,
    tabletRamCapacity,
    tabletResolutionHorizontal,
    tabletResolutionVertical,
    tabletStorageCapacity,
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

  // ╭──────────────────────────────────────────────────────────────╮
  // │ Created Inputs                                               │
  // ╰──────────────────────────────────────────────────────────────╯

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
        label: 'Product Description',
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsDescriptionFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
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
      description: '',
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
  const [createdAvailabilitySelectInput] = returnAccessibleSelectInputElements([
    {
      data: PRODUCT_AVAILABILITY_DATA,
      description: '',
      label: 'Availability',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setAvailability,
          payload: event.currentTarget.value as ProductAvailability,
        });
      },
      value: availability,
      required: true,
    },
  ]);

  // page 1 -> quantity

  // page 1 -> quantity -> number input element
  const createdQuantityNumberInput = (
    <NumberInput
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
      w={330}
      withAsterisk
    />
  );

  // page 1 -> weight

  // page 1 -> weight -> number input element
  const createdWeightNumberInput = (
    <NumberInput
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
      w={330}
      withAsterisk
    />
  );

  // page 1 -> weight -> weight unit select input
  const [createdWeightUnitSelectInput] = returnAccessibleSelectInputElements([
    {
      data: WEIGHT_UNIT_DATA,
      description: '',
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
      w={330}
      withAsterisk
    />
  );

  // page 1 -> dimensions -> length unit select input
  const [createdDimensionLengthUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: DIMENSION_UNIT_DATA,
        description: '',
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
      w={330}
      withAsterisk
    />
  );

  // page 1 -> dimensions -> width unit select input
  const [createdDimensionWidthUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: DIMENSION_UNIT_DATA,
        description: '',
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
      w={330}
      withAsterisk
    />
  );

  // page 1 -> dimensions -> height unit select input
  const [createdDimensionHeightUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: DIMENSION_UNIT_DATA,
        description: '',
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
          createProductDispatch({
            type: createProductAction.setIsAdditionalCommentsFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
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

  // page 2 -> product category

  // page 2 -> product category -> select element creator
  const [createdProductCategorySelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PRODUCT_CATEGORIES,
        description: '',
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
      label="CPU Frequency (GHz)"
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> cpu -> cpu cores

  // page 2 -> specifications -> cpu -> cpu cores -> number input element
  const createdCpuCoresNumberInput = (
    <NumberInput
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> cpu -> cpu L1 cache capacity

  // page 2 -> specifications -> cpu -> cpu L1 cache capacity -> number input element
  const createdCpuL1CacheCapacityNumberInput = (
    <NumberInput
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> cpu -> cpu L1 cache capacity unit

  // page 2 -> specifications -> cpu -> cpu L1 cache capacity unit -> select input element
  const [createdCpuL1CacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: '',
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> cpu -> cpu L2 cache capacity unit

  // page 2 -> specifications -> cpu -> cpu L2 cache capacity unit -> select input element
  const [createdCpuL2CacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: '',
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> cpu -> cpu L3 cache capacity unit

  // page 2 -> specifications -> cpu -> cpu L3 cache capacity unit -> select input element
  const [createdCpuL3CacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: '',
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
      label="CPU Wattage (W)"
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
      w={330}
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> gpu -> gpu memory capacity unit

  // page 2 -> specifications -> gpu -> gpu memory capacity unit -> select input element
  const [createdGpuMemoryCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: '',
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
      label="GPU Core Clock (MHz)"
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> gpu -> gpu boost clock

  // page 2 -> specifications -> gpu -> gpu boost clock -> number input element
  const createdGpuBoostClockNumberInput = (
    <NumberInput
      label="GPU Boost Clock (MHz)"
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> gpu -> gpu wattage

  // page 2 -> specifications -> gpu -> gpu wattage -> number input element
  const createdGpuWattageNumberInput = (
    <NumberInput
      label="GPU Wattage (W)"
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
      w={330}
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
        description: '',
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> motherboard -> motherboard memory max capacity unit

  // page 2 -> specifications -> motherboard -> motherboard memory max capacity unit -> select input element
  const [createdMotherboardMemoryMaxCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: '',
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> motherboard -> motherboard memory type

  // page 2 -> specifications -> motherboard -> motherboard memory type -> select input element
  const [createdMotherboardMemoryTypeSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MOTHERBOARD_MEMORY_TYPE_DATA,
        description: '',
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> motherboard -> motherboard m2 slots

  // page 2 -> specifications -> motherboard -> motherboard m2 slots -> number input element
  const createdMotherboardM2SlotsNumberInput = (
    <NumberInput
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> motherboard -> motherboard pcie3 slots

  // page 2 -> specifications -> motherboard -> motherboard pcie3 slots -> number input element
  const createdMotherboardPcie3SlotsNumberInput = (
    <NumberInput
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> motherboard -> motherboard pcie4 slots

  // page 2 -> specifications -> motherboard -> motherboard pcie4 slots -> number input element
  const createdMotherboardPcie4SlotsNumberInput = (
    <NumberInput
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> motherboard -> motherboard pcie5 slots

  // page 2 -> specifications -> motherboard -> motherboard pcie5 slots -> number input element
  const createdMotherboardPcie5SlotsNumberInput = (
    <NumberInput
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> ram

  // page 2 -> specifications -> ram -> ram data rate

  // page 2 -> specifications -> ram -> ram data rate -> number input element
  const createdRamDataRateNumberInput = (
    <NumberInput
      label="RAM Data Rate (MT/s)"
      max={9999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setRamDataRate,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={ramDataRate}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> ram -> ram modules quantity

  // page 2 -> specifications -> ram -> ram modules quantity -> number input element
  const createdRamModulesQuantityNumberInput = (
    <NumberInput
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> ram -> ram modules capacity

  // page 2 -> specifications -> ram -> ram modules capacity -> number input element
  const createdRamModulesCapacityNumberInput = (
    <NumberInput
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> ram -> ram modules capacity unit

  // page 2 -> specifications -> ram -> ram modules capacity unit -> select input element
  const [createdRamModulesCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: '',
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
      description: '',
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
      label="RAM Voltage (V)"
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
      w={330}
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
        maxLength: 14,
        minLength: 7,
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
      maxLength: 14,
      minLength: 7,
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
      placeholder: 'CL 00-00-00-00 or 0-0-0-0',
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
      description: '',
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> storage -> storage capacity unit

  // page 2 -> specifications -> storage -> storage capacity unit -> select input element
  const [createdStorageCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: '',
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> storage -> storage cache capacity unit

  // page 2 -> specifications -> storage -> storage cache capacity unit -> select input element
  const [createdStorageCacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: '',
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
        description: '',
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
        description: '',
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
      label="PSU Wattage (W)"
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> psu -> psu efficiency rating

  // page 2 -> specifications -> psu -> psu efficiency rating -> select input element
  const [createdPsuEfficiencyRatingSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PSU_EFFICIENCY_RATING_DATA,
        description: '',
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
      description: '',
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
      label="Monitor Size (inches)"
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> monitor -> monitor resolution

  // page 2 -> specifications -> monitor -> monitor resolution -> horizontal

  // page 2 -> specifications -> monitor -> monitor resolution -> horizontal -> number input element
  const createdMonitorResolutionHorizontalNumberInput = (
    <NumberInput
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> monitor -> monitor resolution -> vertical

  // page 2 -> specifications -> monitor -> monitor resolution -> vertical -> number input element
  const createdMonitorResolutionVerticalNumberInput = (
    <NumberInput
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> monitor -> monitor refresh rate

  // page 2 -> specifications -> monitor -> monitor refresh rate -> number input element
  const createdMonitorRefreshRateNumberInput = (
    <NumberInput
      label="Monitor Refresh Rate (Hz)"
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
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> monitor -> monitor panel type

  // page 2 -> specifications -> monitor -> monitor panel type -> select input element
  const [createdMonitorPanelTypeSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MONITOR_PANEL_TYPE_DATA,
        description: '',
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
      label="Monitor Response Time (ms)"
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
      w={330}
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
        minLength: 3,
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
        minLength: 3,
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
        placeholder: '00:00 or 0:0',
        required: true,
        semanticName: 'monitor aspect ratio',
      },
    ]);

  // page 2 -> specifications -> keyboard

  // page 2 -> specifications -> keyboard -> keyboard switch

  // page 2 -> specifications -> keyboard -> keyboard switch -> select input element
  const [createdKeyboardSwitchSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: KEYBOARD_SWITCH_DATA,
        description: '',
        label: 'Keyboard Switch',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardSwitch,
            payload: event.currentTarget.value as KeyboardSwitch,
          });
        },
        value: keyboardSwitch,
        required: true,
      },
    ]);

  // page 2 -> specifications -> keyboard -> keyboard layout

  // page 2 -> specifications -> keyboard -> keyboard layout -> select input element
  const [createdKeyboardLayoutSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: KEYBOARD_LAYOUT_DATA,
        description: '',
        label: 'Keyboard Layout',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardLayout,
            payload: event.currentTarget.value as KeyboardLayout,
          });
        },
        value: keyboardLayout,
        required: true,
      },
    ]);

  // page 2 -> specifications -> keyboard -> keyboard backlight

  // page 2 -> specifications -> keyboard -> keyboard backlight -> select input element
  const [createdKeyboardBacklightSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: KEYBOARD_BACKLIGHT_DATA,
        description: '',
        label: 'Keyboard Backlight',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardBacklight,
            payload: event.currentTarget.value as KeyboardBacklight,
          });
        },
        value: keyboardBacklight,
        required: true,
      },
    ]);

  // page 2 -> specifications -> keyboard -> keyboard interface

  // page 2 -> specifications -> keyboard -> keyboard interface -> select input element
  const [createdKeyboardInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PERIPHERALS_INTERFACE_DATA,
        description: '',
        label: 'Keyboard Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardInterface,
            payload: event.currentTarget.value as PeripheralsInterface,
          });
        },
        value: keyboardInterface,
        required: true,
      },
    ]);

  // page 2 -> specifications -> mouse

  // page 2 -> specifications -> mouse -> mouse sensor

  // page 2 -> specifications -> mouse -> mouse sensor -> select input element
  const [createdMouseSensorSelectInput] = returnAccessibleSelectInputElements([
    {
      data: MOUSE_SENSOR_DATA,
      description: '',
      label: 'Mouse Sensor',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setMouseSensor,
          payload: event.currentTarget.value as MouseSensor,
        });
      },
      value: mouseSensor,
      required: true,
    },
  ]);

  // page 2 -> specifications -> mouse -> mouse dpi

  // page 2 -> specifications -> mouse -> mouse dpi -> number input element
  const createdMouseDpiNumberInput = (
    <NumberInput
      label="Mouse DPI (Dots Per Inch)"
      max={9999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMouseDpi,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={mouseDpi}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> mouse -> mouse buttons quantity

  // page 2 -> specifications -> mouse -> mouse buttons quantity -> number input element
  const createdMouseButtonsNumberInput = (
    <NumberInput
      label="Mouse Buttons"
      max={99}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setMouseButtons,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={mouseButtons}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> mouse -> mouse color

  // page 2 -> specifications -> mouse -> mouse color -> accessible screen reader text elements
  const [mouseColorInputErrorText, mouseColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'mouse color',
      inputText: mouseColor,
      isInputTextFocused: isMouseColorFocused,
      isValidInputText: isMouseColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: mouseColor,
        contentKind: 'mouse color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> specifications -> mouse -> mouse color -> text input element creator
  const [createdMouseColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: mouseColorInputErrorText,
        valid: mouseColorInputValidText,
      },
      inputText: mouseColor,
      isValidInputText: isMouseColorValid,
      label: 'Mouse Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMouseColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMouseColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMouseColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter mouse color',
      required: true,
      semanticName: 'mouse color',
    },
  ]);

  // page 2 -> specifications -> mouse -> mouse interface

  // page 2 -> specifications -> mouse -> mouse interface -> select input element
  const [createdMouseInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PERIPHERALS_INTERFACE_DATA,
        description: '',
        label: 'Mouse Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setMouseInterface,
            payload: event.currentTarget.value as PeripheralsInterface,
          });
        },
        value: mouseInterface,
        required: true,
      },
    ]);

  // page 2 -> specifications -> headphone

  // page 2 -> specifications -> headphone -> headphone type

  // page 2 -> specifications -> headphone -> headphone type -> select input element
  const [createdHeadphoneTypeSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: HEADPHONE_TYPE_DATA,
        description: 'Select headphone type',
        label: 'Headphone Type',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneType,
            payload: event.currentTarget.value as HeadphoneType,
          });
        },
        value: headphoneType,
        required: true,
      },
    ]
  );

  // page 2 -> specifications -> headphone -> headphone driver

  // page 2 -> specifications -> headphone -> headphone driver -> number input element
  const createdHeadphoneDriverNumberInput = (
    <NumberInput
      label="Headphone Driver (mm)"
      max={99}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setHeadphoneDriver,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={headphoneDriver}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> headphone -> headphone frequency response

  // page 2 -> specifications -> headphone -> headphone frequency response -> accessible screen reader text elements
  const [
    headphoneFrequencyResponseInputErrorText,
    headphoneFrequencyResponseInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'headphone frequency response',
    inputText: headphoneFrequencyResponse,
    isInputTextFocused: isHeadphoneFrequencyResponseFocused,
    isValidInputText: isHeadphoneFrequencyResponseValid,
    regexValidationText: returnFrequencyResponseValidationText({
      content: headphoneFrequencyResponse,
      contentKind: 'headphone frequency response',
      maxLength: 14,
      minLength: 12,
    }),
  });

  // page 2 -> specifications -> headphone -> headphone frequency response -> text input element creator
  const [createdHeadphoneFrequencyResponseTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: headphoneFrequencyResponseInputErrorText,
          valid: headphoneFrequencyResponseInputValidText,
        },
        inputText: headphoneFrequencyResponse,
        isValidInputText: isHeadphoneFrequencyResponseValid,
        label: 'Headphone Frequency Response',
        maxLength: 14,
        minLength: 12,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsHeadphoneFrequencyResponseFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneFrequencyResponse,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsHeadphoneFrequencyResponseFocused,
            payload: true,
          });
        },
        placeholder: '00 Hz - 00 kHz or 0Hz-0kHz',
        required: true,
        semanticName: 'headphone frequency response',
      },
    ]);

  // page 2 -> specifications -> headphone -> headphone impedance

  // page 2 -> specifications -> headphone -> headphone impedance -> number input element
  const createdHeadphoneImpedanceNumberInput = (
    <NumberInput
      label="Headphone Impedance ohms(Ω)"
      max={999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setHeadphoneImpedance,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={headphoneImpedance}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> headphone -> headphone color

  // page 2 -> specifications -> headphone -> headphone color -> accessible screen reader text elements
  const [headphoneColorInputErrorText, headphoneColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'headphone color',
      inputText: headphoneColor,
      isInputTextFocused: isHeadphoneColorFocused,
      isValidInputText: isHeadphoneColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: headphoneColor,
        contentKind: 'headphone color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> specifications -> headphone -> headphone color -> text input element creator
  const [createdHeadphoneColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: headphoneColorInputErrorText,
        valid: headphoneColorInputValidText,
      },
      inputText: headphoneColor,
      isValidInputText: isHeadphoneColorValid,
      label: 'Headphone Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsHeadphoneColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setHeadphoneColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsHeadphoneColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter headphone color',
      required: true,
      semanticName: 'headphone color',
    },
  ]);

  // page 2 -> specifications -> headphone -> headphone interface

  // page 2 -> specifications -> headphone -> headphone interface -> select input element
  const [createdHeadphoneInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: HEADPHONE_INTERFACE_DATA,
        description: '',
        label: 'Headphone Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneInterface,
            payload: event.currentTarget.value as HeadphoneInterface,
          });
        },
        value: headphoneInterface,
        required: true,
      },
    ]);

  // page 2 -> specifications -> speaker

  // page 2 -> specifications -> speaker -> speaker type

  // page 2 -> specifications -> speaker -> speaker type -> select input element
  const [createdSpeakerTypeSelectInput] = returnAccessibleSelectInputElements([
    {
      data: SPEAKER_TYPE_DATA,
      description: '',
      label: 'Speaker Type',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setSpeakerType,
          payload: event.currentTarget.value as SpeakerType,
        });
      },
      value: speakerType,
      required: true,
    },
  ]);

  // page 2 -> specifications -> speaker -> speaker total wattage

  // page 2 -> specifications -> speaker -> speaker total wattage -> number input element
  const createdSpeakerTotalWattageNumberInput = (
    <NumberInput
      label="Speaker Total Wattage (W)"
      max={999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setSpeakerTotalWattage,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={speakerTotalWattage}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> speaker -> speaker frequency response

  // page 2 -> specifications -> speaker -> speaker frequency response -> accessible screen reader text elements
  const [
    speakerFrequencyResponseInputErrorText,
    speakerFrequencyResponseInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'speaker frequency response',
    inputText: speakerFrequencyResponse,
    isInputTextFocused: isSpeakerFrequencyResponseFocused,
    isValidInputText: isSpeakerFrequencyResponseValid,
    regexValidationText: returnFrequencyResponseValidationText({
      content: speakerFrequencyResponse,
      contentKind: 'speaker frequency response',
      maxLength: 14,
      minLength: 8,
    }),
  });

  // page 2 -> specifications -> speaker -> speaker frequency response -> text input element creator
  const [createdSpeakerFrequencyResponseTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: speakerFrequencyResponseInputErrorText,
          valid: speakerFrequencyResponseInputValidText,
        },
        inputText: speakerFrequencyResponse,
        isValidInputText: isSpeakerFrequencyResponseValid,
        label: 'Speaker Frequency Response',
        maxLength: 14,
        minLength: 8,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsSpeakerFrequencyResponseFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setSpeakerFrequencyResponse,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsSpeakerFrequencyResponseFocused,
            payload: true,
          });
        },
        placeholder: '00 Hz - 00 kHz or 0Hz-0kHz',
        required: true,
        semanticName: 'speaker frequency response',
      },
    ]);

  // page 2 -> specifications -> speaker -> speaker color

  // page 2 -> specifications -> speaker -> speaker color -> accessible screen reader text elements
  const [speakerColorInputErrorText, speakerColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'speaker color',
      inputText: speakerColor,
      isInputTextFocused: isSpeakerColorFocused,
      isValidInputText: isSpeakerColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: speakerColor,
        contentKind: 'speaker color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> specifications -> speaker -> speaker color -> text input element creator
  const [createdSpeakerColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: speakerColorInputErrorText,
        valid: speakerColorInputValidText,
      },
      inputText: speakerColor,
      isValidInputText: isSpeakerColorValid,
      label: 'Speaker Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsSpeakerColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setSpeakerColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsSpeakerColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter speaker color',
      required: true,
      semanticName: 'speaker color',
    },
  ]);

  // page 2 -> specifications -> speaker -> speaker interface

  // page 2 -> specifications -> speaker -> speaker interface -> select input element
  const [createdSpeakerInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: SPEAKER_INTERFACE_DATA,
        description: '',
        label: 'Speaker Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setSpeakerInterface,
            payload: event.currentTarget.value as SpeakerInterface,
          });
        },
        value: speakerInterface,
        required: true,
      },
    ]);

  // page 2 -> specifications -> smartphone

  // page 2 -> specifications -> smartphone -> smartphone os

  // page 2 -> specifications -> smartphone -> smartphone os -> select input element
  const [createdSmartphoneOsSelectInput] = returnAccessibleSelectInputElements([
    {
      data: MOBILE_OS_DATA,
      description: '',
      label: 'Smartphone OS',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneOs,
          payload: event.currentTarget.value as MobileOs,
        });
      },
      value: smartphoneOs,
      required: true,
    },
  ]);

  // page 2 -> specifications -> smartphone -> smartphone chipset

  // page 2 -> specifications -> smartphone -> smartphone chipset -> accessible screen reader text elements
  const [smartphoneChipsetInputErrorText, smartphoneChipsetInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'smartphone chipset',
      inputText: smartphoneChipset,
      isInputTextFocused: isSmartphoneChipsetFocused,
      isValidInputText: isSmartphoneChipsetValid,
      regexValidationText: returnSocketChipsetValidationText({
        content: smartphoneChipset,
        contentKind: 'smartphone chipset',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> specifications -> smartphone -> smartphone chipset -> text input element creator
  const [createdSmartphoneChipsetTextInput] = returnAccessibleTextInputElements(
    [
      {
        description: {
          error: smartphoneChipsetInputErrorText,
          valid: smartphoneChipsetInputValidText,
        },
        inputText: smartphoneChipset,
        isValidInputText: isSmartphoneChipsetValid,
        label: 'Smartphone Chipset',
        maxLength: 30,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneChipsetFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneChipset,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneChipsetFocused,
            payload: true,
          });
        },
        placeholder: 'Enter smartphone chipset',
        required: true,
        semanticName: 'smartphone chipset',
      },
    ]
  );

  // page 2 -> specifications -> smartphone -> smartphone display

  // page 2 -> specifications -> smartphone -> smartphone display -> number input element
  const createdSmartphoneDisplayNumberInput = (
    <NumberInput
      label="Smartphone Display (inches)"
      max={99}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneDisplay,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={0.1}
      type="number"
      value={smartphoneDisplay}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> smartphone -> smartphone resolution

  // page 2 -> specifications -> smartphone -> smartphone resolution -> horizontal

  // page 2 -> specifications -> smartphone -> smartphone resolution -> horizontal -> number input element
  const createdSmartphoneResolutionHorizontalNumberInput = (
    <NumberInput
      label="Smartphone Resolution Horizontal"
      max={9999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneResolutionHorizontal,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={smartphoneResolutionHorizontal}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> smartphone -> smartphone resolution -> vertical

  // page 2 -> specifications -> smartphone -> smartphone resolution -> vertical -> number input element
  const createdSmartphoneResolutionVerticalNumberInput = (
    <NumberInput
      label="Smartphone Resolution Vertical"
      max={9999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneResolutionVertical,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={smartphoneResolutionVertical}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> smartphone -> smartphone ram capacity

  // page 2 -> specifications -> smartphone -> smartphone ram capacity -> number input element
  const createdSmartphoneRamCapacityNumberInput = (
    <NumberInput
      label="Smartphone RAM Capacity"
      max={1024}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneRamCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={smartphoneRamCapacity}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> smartphone -> smartphone ram capacity unit

  // page 2 -> specifications -> smartphone -> smartphone ram capacity unit -> select input element
  const [createdSmartphoneRamCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: '',
        label: 'Smartphone RAM Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneRamCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: smartphoneRamCapacityUnit,
        required: true,
      },
    ]);

  // page 2 -> specifications -> smartphone -> smartphone storage capacity

  // page 2 -> specifications -> smartphone -> smartphone storage capacity -> number input element
  const createdSmartphoneStorageCapacityNumberInput = (
    <NumberInput
      label="Smartphone Storage Capacity (GB)"
      max={8192}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneStorageCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={smartphoneStorageCapacity}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> smartphone -> smartphone battery capacity

  // page 2 -> specifications -> smartphone -> smartphone battery capacity -> number input element
  const createdSmartphoneBatteryCapacityNumberInput = (
    <NumberInput
      label="Smartphone Battery Capacity (mAh)"
      max={99999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneBatteryCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={smartphoneBatteryCapacity}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> smartphone -> smartphone camera

  // page 2 -> specifications -> smartphone -> smartphone camera -> accessible screen reader text elements
  const [smartphoneCameraInputErrorText, smartphoneCameraInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'smartphone camera',
      inputText: smartphoneCamera,
      isInputTextFocused: isSmartphoneCameraFocused,
      isValidInputText: isSmartphoneCameraValid,
      regexValidationText: returnMobileCameraResolutionValidationText({
        content: smartphoneCamera,
        contentKind: 'smartphone camera',
        maxLength: 72,
        minLength: 4,
      }),
    });

  // page 2 -> specifications -> smartphone -> smartphone camera -> text input element creator
  const [createdSmartphoneCameraTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: smartphoneCameraInputErrorText,
        valid: smartphoneCameraInputValidText,
      },
      inputText: smartphoneCamera,
      isValidInputText: isSmartphoneCameraValid,
      label: 'Smartphone Camera',
      maxLength: 72,
      minLength: 4,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneCameraFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneCamera,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneCameraFocused,
          payload: true,
        });
      },
      placeholder: 'Enter smartphone camera',
      required: true,
      semanticName: 'smartphone camera',
    },
  ]);

  // page 2 -> specifications -> smartphone -> smartphone color

  // page 2 -> specifications -> smartphone -> smartphone color -> accessible screen reader text elements
  const [smartphoneColorInputErrorText, smartphoneColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'smartphone color',
      inputText: smartphoneColor,
      isInputTextFocused: isSmartphoneColorFocused,
      isValidInputText: isSmartphoneColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: smartphoneColor,
        contentKind: 'smartphone color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> specifications -> smartphone -> smartphone color -> text input element creator
  const [createdSmartphoneColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: smartphoneColorInputErrorText,
        valid: smartphoneColorInputValidText,
      },
      inputText: smartphoneColor,
      isValidInputText: isSmartphoneColorValid,
      label: 'Smartphone Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter smartphone color',
      required: true,
      semanticName: 'smartphone color',
    },
  ]);

  // page 2 -> specifications -> tablet

  // page 2 -> specifications -> tablet -> tablet os

  // page 2 -> specifications -> tablet -> tablet os -> select input element
  const [createdTabletOsSelectInput] = returnAccessibleSelectInputElements([
    {
      data: MOBILE_OS_DATA,
      description: '',
      label: 'Tablet OS',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setTabletOs,
          payload: event.currentTarget.value as MobileOs,
        });
      },
      value: tabletOs,
      required: true,
    },
  ]);

  // page 2 -> specifications -> tablet -> tablet chipset

  // page 2 -> specifications -> tablet -> tablet chipset -> accessible screen reader text elements
  const [tabletChipsetInputErrorText, tabletChipsetInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'tablet chipset',
      inputText: tabletChipset,
      isInputTextFocused: isTabletChipsetFocused,
      isValidInputText: isTabletChipsetValid,
      regexValidationText: returnSocketChipsetValidationText({
        content: tabletChipset,
        contentKind: 'tablet chipset',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> specifications -> tablet -> tablet chipset -> text input element creator
  const [createdTabletChipsetTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: tabletChipsetInputErrorText,
        valid: tabletChipsetInputValidText,
      },
      inputText: tabletChipset,
      isValidInputText: isTabletChipsetValid,
      label: 'Tablet Chipset',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletChipsetFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setTabletChipset,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletChipsetFocused,
          payload: true,
        });
      },
      placeholder: 'Enter tablet chipset',
      required: true,
      semanticName: 'tablet chipset',
    },
  ]);

  // page 2 -> specifications -> tablet -> tablet display

  // page 2 -> specifications -> tablet -> tablet display -> number input element
  const createdTabletDisplayNumberInput = (
    <NumberInput
      label="Tablet Display (inches)"
      max={99}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setTabletDisplay,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={0.1}
      type="number"
      value={tabletDisplay}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> tablet -> tablet resolution

  // page 2 -> specifications -> tablet -> tablet resolution -> horizontal

  // page 2 -> specifications -> tablet -> tablet resolution -> horizontal -> number input element
  const createdTabletResolutionHorizontalNumberInput = (
    <NumberInput
      label="Tablet Resolution Horizontal"
      max={9999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setTabletResolutionHorizontal,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={tabletResolutionHorizontal}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> tablet -> tablet resolution -> vertical

  // page 2 -> specifications -> tablet -> tablet resolution -> vertical -> number input element
  const createdTabletResolutionVerticalNumberInput = (
    <NumberInput
      label="Tablet Resolution Vertical"
      max={9999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setTabletResolutionVertical,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={tabletResolutionVertical}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> tablet -> tablet ram capacity

  // page 2 -> specifications -> tablet -> tablet ram capacity -> number input element
  const createdTabletRamCapacityNumberInput = (
    <NumberInput
      label="Tablet RAM Capacity"
      max={1024}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setTabletRamCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={tabletRamCapacity}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> tablet -> tablet ram capacity unit

  // page 2 -> specifications -> tablet -> tablet ram capacity unit -> select input element
  const [createdTabletRamCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_DATA,
        description: '',
        label: 'Tablet RAM Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletRamCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: tabletRamCapacityUnit,
        required: true,
      },
    ]);

  // page 2 -> specifications -> tablet -> tablet storage capacity

  // page 2 -> specifications -> tablet -> tablet storage capacity -> number input element
  const createdTabletStorageCapacityNumberInput = (
    <NumberInput
      label="Tablet Storage Capacity (GB)"
      max={8192}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setTabletStorageCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={tabletStorageCapacity}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> tablet -> tablet battery capacity

  // page 2 -> specifications -> tablet -> tablet battery capacity -> number input element
  const createdTabletBatteryCapacityNumberInput = (
    <NumberInput
      label="Tablet Battery Capacity (mAh)"
      max={99999}
      min={1}
      onChange={(value: number) => {
        createProductDispatch({
          type: createProductAction.setTabletBatteryCapacity,
          payload: value,
        });
      }}
      required
      startValue={1}
      step={1}
      type="number"
      value={tabletBatteryCapacity}
      w={330}
      withAsterisk
    />
  );

  // page 2 -> specifications -> tablet -> tablet camera

  // page 2 -> specifications -> tablet -> tablet camera -> accessible screen reader text elements
  const [tabletCameraInputErrorText, tabletCameraInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'tablet camera',
      inputText: tabletCamera,
      isInputTextFocused: isTabletCameraFocused,
      isValidInputText: isTabletCameraValid,
      regexValidationText: returnMobileCameraResolutionValidationText({
        content: tabletCamera,
        contentKind: 'tablet camera',
        maxLength: 72,
        minLength: 4,
      }),
    });

  // page 2 -> specifications -> tablet -> tablet camera -> text input element creator
  const [createdTabletCameraTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: tabletCameraInputErrorText,
        valid: tabletCameraInputValidText,
      },
      inputText: tabletCamera,
      isValidInputText: isTabletCameraValid,
      label: 'Tablet Camera',
      maxLength: 72,
      minLength: 4,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletCameraFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setTabletCamera,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletCameraFocused,
          payload: true,
        });
      },
      placeholder: 'Enter tablet camera',
      required: true,
      semanticName: 'tablet camera',
    },
  ]);

  // page 2 -> specifications -> tablet -> tablet color

  // page 2 -> specifications -> tablet -> tablet color -> accessible screen reader text elements
  const [tabletColorInputErrorText, tabletColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'tablet color',
      inputText: tabletColor,
      isInputTextFocused: isTabletColorFocused,
      isValidInputText: isTabletColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: tabletColor,
        contentKind: 'tablet color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // page 2 -> specifications -> tablet -> tablet color -> text input element creator
  const [createdTabletColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: tabletColorInputErrorText,
        valid: tabletColorInputValidText,
      },
      inputText: tabletColor,
      isValidInputText: isTabletColorValid,
      label: 'Tablet Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setTabletColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter tablet color',
      required: true,
      semanticName: 'tablet color',
    },
  ]);

  // page 2 -> specifications -> accessory

  // page 2 -> specifications -> accessory -> accessory type

  // page 2 -> specifications -> accessory -> accessory type -> accessible screen reader text elements
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

  // page 2 -> specifications -> accessory -> accessory type -> text input element creator
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
        createProductDispatch({
          type: createProductAction.setIsAccessoryTypeFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setAccessoryType,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsAccessoryTypeFocused,
          payload: true,
        });
      },
      placeholder: 'Enter accessory type',
      required: true,
      semanticName: 'accessory type',
    },
  ]);

  // page 2 -> specifications -> accessory -> accessory color

  // page 2 -> specifications -> accessory -> accessory color -> accessible screen reader text elements
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

  // page 2 -> specifications -> accessory -> accessory color -> text input element creator
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
        createProductDispatch({
          type: createProductAction.setIsAccessoryColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setAccessoryColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsAccessoryColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter accessory color',
      required: true,
      semanticName: 'accessory color',
    },
  ]);

  // page 2 -> specifications -> accessory -> accessory interface

  // page 2 -> specifications -> accessory -> accessory interface -> select input element
  const [createdAccessoryInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PERIPHERALS_INTERFACE_DATA,
        description: '',
        label: 'Accessory Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setAccessoryInterface,
            payload: event.currentTarget.value as PeripheralsInterface,
          });
        },
        value: accessoryInterface,
        required: true,
      },
    ]);

  // page 4

  // page 4 -> submit button

  // page 4 -> submit button -> accessible button element
  const [createdSubmitButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Submit',
      buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
        createProductDispatch({
          type: createProductAction.setTriggerFormSubmit,
          payload: true,
        });
      },
      buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
      leftIcon: <TbUpload />,
      semanticDescription: 'create product form submit button',
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
            : 'Submit create product form'
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  // ╭──────────────────────────────────────────────────────────────╮
  // │ Input Display                                                │
  // ╰──────────────────────────────────────────────────────────────╯

  // input display -> page 1

  const displayCreateProductFormPage1 = (
    <FormLayoutWrapper>
      {createdBrandTextInput}
      {createdModelTextInput}
      {createdPriceTextInput}
      {createdCurrencySelectInput}
      {createdQuantityNumberInput}
      {createdWeightNumberInput}
      {createdWeightUnitSelectInput}
      {createdDimensionLengthNumberInput}
      {createdDimensionLengthUnitSelectInput}
      {createdDimensionHeightNumberInput}
      {createdDimensionHeightUnitSelectInput}
      {createdDimensionWidthNumberInput}
      {createdDimensionWidthUnitSelectInput}
      {createdAvailabilitySelectInput}
      {createdDescriptionTextAreaInput}
      {createdAdditionalCommentsTextAreaInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2

  // input display -> page 2 -> specifications

  // input display -> page 2 -> specifications -> central processing unit
  const displayCpuSpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>CPU Specifications</Title>
      </Group>
      {createdCpuSocketTextInput}
      {createdCpuWattageNumberInput}
      {createdCpuFrequencyNumberInput}
      {createdCpuCoresNumberInput}
      {createdCpuL1CacheCapacityNumberInput}
      {createdCpuL1CacheCapacityUnitSelectInput}
      {createdCpuL2CacheCapacityNumberInput}
      {createdCpuL2CacheCapacityUnitSelectInput}
      {createdCpuL3CacheCapacityNumberInput}
      {createdCpuL3CacheCapacityUnitSelectInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> gpu chipset
  const displayGpuSpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>GPU Specifications</Title>
      </Group>
      {createdGpuChipsetTextInput}
      {createdGpuMemoryCapacityNumberInput}
      {createdGpuMemoryCapacityUnitSelectInput}
      {createdGpuWattageNumberInput}
      {createdGpuCoreClockNumberInput}
      {createdGpuBoostClockNumberInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> motherboard
  const displayMotherboardSpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>Motherboard Specifications</Title>
      </Group>
      {createdMotherboardSocketTextInput}
      {createdMotherboardChipsetTextInput}
      {createdMotherboardFormFactorSelectInput}
      {createdMotherboardMemoryMaxCapacityNumberInput}
      {createdMotherboardMemoryMaxCapacityUnitSelectInput}
      {createdMotherboardMemorySlotsNumberInput}
      {createdMotherboardMemoryTypeSelectInput}
      {createdMotherboardSataPortsNumberInput}
      {createdMotherboardM2SlotsNumberInput}
      {createdMotherboardPcie3SlotsNumberInput}
      {createdMotherboardPcie4SlotsNumberInput}
      {createdMotherboardPcie5SlotsNumberInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> ram
  const displayRamSpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>Memory (RAM) Specifications</Title>
      </Group>
      {createdRamDataRateNumberInput}
      {createdRamModulesQuantityNumberInput}
      {createdRamModulesCapacityNumberInput}
      {createdRamModulesCapacityUnitSelectInput}
      {createdRamTypeSelectInput}
      {createdRamColorTextInput}
      {createdRamVoltageNumberInput}
      {createdRamTimingTextInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> storage
  const displayStorageSpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>Storage Specifications</Title>
      </Group>
      {createdStorageTypeSelectInput}
      {createdStorageInterfaceSelectInput}
      {createdStorageCapacityNumberInput}
      {createdStorageCapacityUnitSelectInput}
      {createdStorageCacheCapacityNumberInput}
      {createdStorageCacheCapacityUnitSelectInput}
      {createdStorageFormFactorSelectInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> power supply
  const displayPowerSupplySpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>Power Supply Unit (PSU) Specifications</Title>
      </Group>
      {createdPsuWattageNumberInput}
      {createdPsuEfficiencyRatingSelectInput}
      {createdPsuFormFactorSelectInput}
      {createdPsuModularitySelectInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> computer case
  const displayComputerCaseSpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>Case Specifications</Title>
      </Group>
      {createdCaseTypeSelectInput}
      {createdCaseColorTextInput}
      {createdCaseSidePanelSelectInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> monitor
  const displayMonitorSpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>Monitor Specifications</Title>
      </Group>
      {createdMonitorSizeNumberInput}
      {createdMonitorResolutionHorizontalNumberInput}
      {createdMonitorResolutionVerticalNumberInput}
      {createdMonitorRefreshRateNumberInput}
      {createdMonitorPanelTypeSelectInput}
      {createdMonitorResponseTimeNumberInput}
      {createdMonitorAspectRatioTextInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> keyboard
  const displayKeyboardSpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>Keyboard Specifications</Title>
      </Group>
      {createdKeyboardSwitchSelectInput}
      {createdKeyboardLayoutSelectInput}
      {createdKeyboardBacklightSelectInput}
      {createdKeyboardInterfaceSelectInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> mouse
  const displayMouseSpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>Mouse Specifications</Title>
      </Group>
      {createdMouseSensorSelectInput}
      {createdMouseDpiNumberInput}
      {createdMouseButtonsNumberInput}
      {createdMouseColorTextInput}
      {createdMouseInterfaceSelectInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> headphone
  const displayHeadphoneSpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>Headphone Specifications</Title>
      </Group>
      {createdHeadphoneTypeSelectInput}
      {createdHeadphoneDriverNumberInput}
      {createdHeadphoneFrequencyResponseTextInput}
      {createdHeadphoneImpedanceNumberInput}
      {createdHeadphoneColorTextInput}
      {createdHeadphoneInterfaceSelectInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> speaker
  const displaySpeakerSpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>Speaker Specifications</Title>
      </Group>
      {createdSpeakerTypeSelectInput}
      {createdSpeakerTotalWattageNumberInput}
      {createdSpeakerFrequencyResponseTextInput}
      {createdSpeakerColorTextInput}
      {createdSpeakerInterfaceSelectInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> smartphone
  const displaySmartphoneSpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>Smartphone Specifications</Title>
      </Group>
      {createdSmartphoneOsSelectInput}
      {createdSmartphoneChipsetTextInput}
      {createdSmartphoneDisplayNumberInput}
      {createdSmartphoneResolutionHorizontalNumberInput}
      {createdSmartphoneResolutionVerticalNumberInput}
      {createdSmartphoneColorTextInput}
      {createdSmartphoneRamCapacityNumberInput}
      {createdSmartphoneRamCapacityUnitSelectInput}
      {createdSmartphoneStorageCapacityNumberInput}
      {createdSmartphoneBatteryCapacityNumberInput}
      {createdSmartphoneCameraTextInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> tablet
  const displayTabletSpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>Tablet Specifications</Title>
      </Group>
      {createdTabletOsSelectInput}
      {createdTabletChipsetTextInput}
      {createdTabletDisplayNumberInput}
      {createdTabletResolutionHorizontalNumberInput}
      {createdTabletResolutionVerticalNumberInput}
      {createdTabletColorTextInput}
      {createdTabletRamCapacityNumberInput}
      {createdTabletRamCapacityUnitSelectInput}
      {createdTabletStorageCapacityNumberInput}
      {createdTabletBatteryCapacityNumberInput}
      {createdTabletCameraTextInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> accessory
  const displayAccessorySpecificationsInputs = (
    <FormLayoutWrapper>
      <Group w="100%">
        <Title order={4}>Accessory Specifications</Title>
      </Group>
      {createdAccessoryTypeTextInput}
      {createdAccessoryColorTextInput}
      {createdAccessoryInterfaceSelectInput}
    </FormLayoutWrapper>
  );

  // input display -> page 2 -> specifications -> desktop computers
  const displayDesktopComputersSpecificationsInputs = (
    <>
      {displayCpuSpecificationsInputs}
      {displayGpuSpecificationsInputs}
      {displayMotherboardSpecificationsInputs}
      {displayRamSpecificationsInputs}
      {displayStorageSpecificationsInputs}
      {displayPowerSupplySpecificationsInputs}
      {displayComputerCaseSpecificationsInputs}
      {displayMonitorSpecificationsInputs}
      {displayKeyboardSpecificationsInputs}
      {displayMouseSpecificationsInputs}
      {displaySpeakerSpecificationsInputs}
    </>
  );

  // input display -> page 2 -> specifications -> laptop computers
  const displayLaptopComputersSpecificationsInputs = (
    <>
      {displayCpuSpecificationsInputs}
      {displayGpuSpecificationsInputs}
      {displayRamSpecificationsInputs}
      {displayStorageSpecificationsInputs}
    </>
  );

  const displayCreateProductFormPage2 = (
    <FormLayoutWrapper>
      <Group py={padding}>{createdProductCategorySelectInput}</Group>
      {productCategory === 'Accessories'
        ? displayAccessorySpecificationsInputs
        : productCategory === 'Central Processing Units (CPUs)'
        ? displayCpuSpecificationsInputs
        : productCategory === 'Computer Cases'
        ? displayComputerCaseSpecificationsInputs
        : productCategory === 'Desktop Computers'
        ? displayDesktopComputersSpecificationsInputs
        : productCategory === 'Graphics Processing Units (GPUs)'
        ? displayGpuSpecificationsInputs
        : productCategory === 'Headphones'
        ? displayHeadphoneSpecificationsInputs
        : productCategory === 'Keyboards'
        ? displayKeyboardSpecificationsInputs
        : productCategory === 'Laptops'
        ? displayLaptopComputersSpecificationsInputs
        : productCategory === 'Memory (RAM)'
        ? displayRamSpecificationsInputs
        : productCategory === 'Mice'
        ? displayMouseSpecificationsInputs
        : productCategory === 'Monitors'
        ? displayMonitorSpecificationsInputs
        : productCategory === 'Motherboards'
        ? displayMotherboardSpecificationsInputs
        : productCategory === 'Power Supplies'
        ? displayPowerSupplySpecificationsInputs
        : productCategory === 'Smartphones'
        ? displaySmartphoneSpecificationsInputs
        : productCategory === 'Speakers'
        ? displaySpeakerSpecificationsInputs
        : productCategory === 'Storage'
        ? displayStorageSpecificationsInputs
        : productCategory === 'Tablets'
        ? displayTabletSpecificationsInputs
        : null}
    </FormLayoutWrapper>
  );

  // ╭──────────────────────────────────────────────────────────────╮
  // │ Form Review Objects                                          │
  // ╰──────────────────────────────────────────────────────────────╯

  // form review object -> page 1
  const page1FormReviewObject: FormReviewObject = {
    'Product Details': [
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
        isInputValueValid: quantity !== 0,
      },
      {
        inputName: 'Weight',
        inputValue: weight,
        isInputValueValid: weight !== 0,
      },
      {
        inputName: 'Dimension Length',
        inputValue: dimensionLength,
        isInputValueValid: dimensionLength !== 0,
      },
      {
        inputName: 'Dimension Length Unit',
        inputValue: dimensionLengthUnit,
      },
      {
        inputName: 'Dimension Height',
        inputValue: dimensionHeight,
        isInputValueValid: dimensionHeight !== 0,
      },
      {
        inputName: 'Dimension Height Unit',
        inputValue: dimensionHeightUnit,
      },
      {
        inputName: 'Dimension Width',
        inputValue: dimensionWidth,
        isInputValueValid: dimensionWidth !== 0,
      },
      {
        inputName: 'Dimension Width Unit',
        inputValue: dimensionWidthUnit,
      },
      {
        inputName: 'Additional Comments',
        inputValue: additionalComments,
        isInputValueValid: isAdditionalCommentsValid,
      },
    ],
  };

  // form review object -> page 2

  // form review object -> page 2 -> specifications

  // form review object -> page 2 -> specifications -> central processing unit
  const page2CpuFormReviewObject: FormReviewObject = {
    'CPU Specifications': [
      {
        inputName: 'CPU Socket',
        inputValue: cpuSocket,
        isInputValueValid: isCpuSocketValid,
      },
      {
        inputName: 'CPU Frequency',
        inputValue: cpuFrequency,
        isInputValueValid: cpuFrequency !== 0,
      },
      {
        inputName: 'CPU Cores',
        inputValue: cpuCores,
        isInputValueValid: cpuCores !== 0,
      },
      {
        inputName: 'CPU L1 Cache Capacity',
        inputValue: cpuL1CacheCapacity,
        isInputValueValid: cpuL1CacheCapacity !== 0,
      },
      {
        inputName: 'CPU L1 Cache Capacity Unit',
        inputValue: cpuL1CacheCapacityUnit,
      },
      {
        inputName: 'CPU L2 Cache Capacity',
        inputValue: cpuL2CacheCapacity,
        isInputValueValid: cpuL2CacheCapacity !== 0,
      },
      {
        inputName: 'CPU L2 Cache Capacity Unit',
        inputValue: cpuL2CacheCapacityUnit,
      },
      {
        inputName: 'CPU L3 Cache Capacity',
        inputValue: cpuL3CacheCapacity,
        isInputValueValid: cpuL3CacheCapacity !== 0,
      },
      {
        inputName: 'CPU L3 Cache Capacity Unit',
        inputValue: cpuL3CacheCapacityUnit,
      },
      {
        inputName: 'CPU Wattage',
        inputValue: cpuWattage,
        isInputValueValid: cpuWattage !== 0,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> gpu chipset
  const page2GpuFormReviewObject: FormReviewObject = {
    'GPU Specifications': [
      {
        inputName: 'GPU Chipset',
        inputValue: gpuChipset,
        isInputValueValid: isGpuChipsetValid,
      },
      {
        inputName: 'GPU Memory Capacity',
        inputValue: gpuMemoryCapacity,
        isInputValueValid: gpuMemoryCapacity !== 0,
      },
      {
        inputName: 'GPU Memory Capacity Unit',
        inputValue: gpuMemoryCapacityUnit,
      },
      {
        inputName: 'GPU Core Clock',
        inputValue: gpuCoreClock,
        isInputValueValid: gpuCoreClock !== 0,
      },
      {
        inputName: 'GPU Boost Clock',
        inputValue: gpuBoostClock,
        isInputValueValid: gpuBoostClock !== 0,
      },
      {
        inputName: 'GPU Wattage',
        inputValue: gpuTdp,
        isInputValueValid: gpuTdp !== 0,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> motherboard
  const page2MotherboardFormReviewObject: FormReviewObject = {
    'Motherboard Specifications': [
      {
        inputName: 'Motherboard Socket',
        inputValue: motherboardSocket,
        isInputValueValid: isMotherboardSocketValid,
      },
      {
        inputName: 'Motherboard Chipset',
        inputValue: motherboardChipset,
        isInputValueValid: isMotherboardChipsetValid,
      },
      {
        inputName: 'Motherboard Form Factor',
        inputValue: motherboardFormFactor,
      },
      {
        inputName: 'Motherboard Memory Max Capacity',
        inputValue: motherboardMemoryMaxCapacity,
        isInputValueValid: motherboardMemoryMaxCapacity !== 0,
      },
      {
        inputName: 'Motherboard Memory Max Capacity Unit',
        inputValue: motherboardMemoryMaxCapacityUnit,
      },
      {
        inputName: 'Motherboard Memory Slots',
        inputValue: motherboardMemorySlots,
        isInputValueValid: motherboardMemorySlots !== 0,
      },
      {
        inputName: 'Motherboard Memory Type',
        inputValue: motherboardMemoryType,
      },
      {
        inputName: 'Motherboard SATA Ports',
        inputValue: motherboardSataPorts,
        isInputValueValid: motherboardSataPorts !== 0,
      },
      {
        inputName: 'Motherboard M.2 Slots',
        inputValue: motherboardM2Slots,
      },
      {
        inputName: 'Motherboard PCIe 3.0 Slots',
        inputValue: motherboardPcie3Slots,
        isInputValueValid: motherboardPcie3Slots !== 0,
      },
      {
        inputName: 'Motherboard PCIe 4.0 Slots',
        inputValue: motherboardPcie4Slots,
        isInputValueValid: motherboardPcie4Slots !== 0,
      },
      {
        inputName: 'Motherboard PCIe 5.0 Slots',
        inputValue: motherboardPcie5Slots,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> ram
  const page2RamFormReviewObject: FormReviewObject = {
    'Memory (RAM) Specifications': [
      {
        inputName: 'RAM Data Rate',
        inputValue: ramDataRate,
        isInputValueValid: ramDataRate !== 0,
      },
      {
        inputName: 'RAM Modules Quantity',
        inputValue: ramModulesQuantity,
        isInputValueValid: ramModulesQuantity !== 0,
      },
      {
        inputName: 'RAM Modules Capacity',
        inputValue: ramModulesCapacity,
        isInputValueValid: ramModulesCapacity !== 0,
      },
      {
        inputName: 'RAM Modules Capacity Unit',
        inputValue: ramModulesCapacityUnit,
      },
      {
        inputName: 'RAM Type',
        inputValue: ramType,
      },
      {
        inputName: 'RAM Color',
        inputValue: ramColor,
        isInputValueValid: isRamColorValid,
      },
      {
        inputName: 'RAM Voltage',
        inputValue: ramVoltage,
        isInputValueValid: ramVoltage !== 0,
      },
      {
        inputName: 'RAM Timing',
        inputValue: ramTiming,
        isInputValueValid: isRamTimingValid,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> storage
  const page2StorageFormReviewObject: FormReviewObject = {
    'Storage Specifications': [
      {
        inputName: 'Storage Type',
        inputValue: storageType,
      },
      {
        inputName: 'Storage Capacity',
        inputValue: storageCapacity,
        isInputValueValid: storageCapacity !== 0,
      },
      {
        inputName: 'Storage Capacity Unit',
        inputValue: storageCapacityUnit,
      },
      {
        inputName: 'Storage Cache Capacity',
        inputValue: storageCacheCapacity,
        isInputValueValid: storageCacheCapacity !== 0,
      },
      {
        inputName: 'Storage Cache Capacity Unit',
        inputValue: storageCacheCapacityUnit,
      },
      {
        inputName: 'Storage Form Factor',
        inputValue: storageFormFactor,
      },
      {
        inputName: 'Storage Interface',
        inputValue: storageInterface,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> power supply
  const page2PowerSupplyFormReviewObject: FormReviewObject = {
    'Power Supply Unit (PSU) Specifications': [
      {
        inputName: 'PSU Wattage',
        inputValue: psuWattage,
        isInputValueValid: psuWattage !== 0,
      },
      {
        inputName: 'PSU Efficiency Rating',
        inputValue: psuEfficiency,
      },
      {
        inputName: 'PSU Form Factor',
        inputValue: psuFormFactor,
      },
      {
        inputName: 'PSU Modularity',
        inputValue: psuModularity,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> computer case
  const page2ComputerCaseFormReviewObject: FormReviewObject = {
    'Case Specifications': [
      {
        inputName: 'Case Type',
        inputValue: caseType,
      },
      {
        inputName: 'Case Color',
        inputValue: caseColor,
        isInputValueValid: isCaseColorValid,
      },
      {
        inputName: 'Case Side Panel',
        inputValue: caseSidePanel,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> monitor
  const page2MonitorFormReviewObject: FormReviewObject = {
    'Monitor Specifications': [
      {
        inputName: 'Monitor Size',
        inputValue: monitorSize,
        isInputValueValid: monitorSize !== 0,
      },
      {
        inputName: 'Monitor Resolution Horizontal',
        inputValue: monitorResolutionHorizontal,
        isInputValueValid: monitorResolutionHorizontal !== 0,
      },
      {
        inputName: 'Monitor Resolution Vertical',
        inputValue: monitorResolutionVertical,
        isInputValueValid: monitorResolutionVertical !== 0,
      },
      {
        inputName: 'Monitor Refresh Rate',
        inputValue: monitorRefreshRate,
        isInputValueValid: monitorRefreshRate !== 0,
      },
      {
        inputName: 'Monitor Panel Type',
        inputValue: monitorPanelType,
      },
      {
        inputName: 'Monitor Response Time',
        inputValue: monitorResponseTime,
        isInputValueValid: monitorResponseTime !== 0,
      },
      {
        inputName: 'Monitor Aspect Ratio',
        inputValue: monitorAspectRatio,
        isInputValueValid: isMonitorAspectRatioValid,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> keyboard
  const page2KeyboardFormReviewObject: FormReviewObject = {
    'Keyboard Specifications': [
      {
        inputName: 'Keyboard Switch',
        inputValue: keyboardSwitch,
      },
      {
        inputName: 'Keyboard Layout',
        inputValue: keyboardLayout,
      },
      {
        inputName: 'Keyboard Backlight',
        inputValue: keyboardBacklight,
      },
      {
        inputName: 'Keyboard Interface',
        inputValue: keyboardInterface,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> mouse
  const page2MouseFormReviewObject: FormReviewObject = {
    'Mouse Specifications': [
      {
        inputName: 'Mouse Sensor',
        inputValue: mouseSensor,
      },
      {
        inputName: 'Mouse DPI',
        inputValue: mouseDpi,
        isInputValueValid: mouseDpi !== 0,
      },
      {
        inputName: 'Mouse Buttons',
        inputValue: mouseButtons,
        isInputValueValid: mouseButtons !== 0,
      },
      {
        inputName: 'Mouse Color',
        inputValue: mouseColor,
        isInputValueValid: isMouseColorValid,
      },
      {
        inputName: 'Mouse Interface',
        inputValue: mouseInterface,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> headphone
  const page2HeadphoneFormReviewObject: FormReviewObject = {
    'Headphone Specifications': [
      {
        inputName: 'Headphone Type',
        inputValue: headphoneType,
      },
      {
        inputName: 'Headphone Driver',
        inputValue: headphoneDriver,
        isInputValueValid: headphoneDriver !== 0,
      },
      {
        inputName: 'Headphone Frequency Response',
        inputValue: headphoneFrequencyResponse,
        isInputValueValid: isHeadphoneFrequencyResponseValid,
      },
      {
        inputName: 'Headphone Impedance',
        inputValue: headphoneImpedance,
        isInputValueValid: headphoneImpedance !== 0,
      },
      {
        inputName: 'Headphone Color',
        inputValue: headphoneColor,
        isInputValueValid: isHeadphoneColorValid,
      },
      {
        inputName: 'Headphone Interface',
        inputValue: headphoneInterface,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> speaker
  const page2SpeakerFormReviewObject: FormReviewObject = {
    'Speaker Specifications': [
      {
        inputName: 'Speaker Type',
        inputValue: speakerType,
      },
      {
        inputName: 'Speaker Total Wattage',
        inputValue: speakerTotalWattage,
        isInputValueValid: speakerTotalWattage !== 0,
      },
      {
        inputName: 'Speaker Frequency Response',
        inputValue: speakerFrequencyResponse,
        isInputValueValid: isSpeakerFrequencyResponseValid,
      },
      {
        inputName: 'Speaker Color',
        inputValue: speakerColor,
        isInputValueValid: isSpeakerColorValid,
      },
      {
        inputName: 'Speaker Interface',
        inputValue: speakerInterface,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> smartphone
  const page2SmartphoneFormReviewObject: FormReviewObject = {
    'Smartphone Specifications': [
      {
        inputName: 'Smartphone OS',
        inputValue: smartphoneOs,
      },
      {
        inputName: 'Smartphone Chipset',
        inputValue: smartphoneChipset,
        isInputValueValid: isSmartphoneChipsetValid,
      },
      {
        inputName: 'Smartphone Display',
        inputValue: smartphoneDisplay,
        isInputValueValid: smartphoneDisplay !== 0,
      },
      {
        inputName: 'Smartphone Resolution Horizontal',
        inputValue: smartphoneResolutionHorizontal,
        isInputValueValid: smartphoneResolutionHorizontal !== 0,
      },
      {
        inputName: 'Smartphone Resolution Vertical',
        inputValue: smartphoneResolutionVertical,
        isInputValueValid: smartphoneResolutionVertical !== 0,
      },
      {
        inputName: 'Smartphone RAM Capacity',
        inputValue: smartphoneRamCapacity,
        isInputValueValid: smartphoneRamCapacity !== 0,
      },
      {
        inputName: 'Smartphone RAM Capacity Unit',
        inputValue: smartphoneRamCapacityUnit,
      },
      {
        inputName: 'Smartphone Storage Capacity',
        inputValue: smartphoneStorageCapacity,
        isInputValueValid: smartphoneStorageCapacity !== 0,
      },
      {
        inputName: 'Smartphone Battery Capacity',
        inputValue: smartphoneBatteryCapacity,
        isInputValueValid: smartphoneBatteryCapacity !== 0,
      },
      {
        inputName: 'Smartphone Camera',
        inputValue: smartphoneCamera,
        isInputValueValid: isSmartphoneCameraValid,
      },
      {
        inputName: 'Smartphone Color',
        inputValue: smartphoneColor,
        isInputValueValid: isSmartphoneColorValid,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> tablet
  const page2TabletFormReviewObject: FormReviewObject = {
    'Tablet Specifications': [
      {
        inputName: 'Tablet OS',
        inputValue: tabletOs,
      },
      {
        inputName: 'Tablet Chipset',
        inputValue: tabletChipset,
        isInputValueValid: isTabletChipsetValid,
      },
      {
        inputName: 'Tablet Display',
        inputValue: tabletDisplay,
        isInputValueValid: tabletDisplay !== 0,
      },
      {
        inputName: 'Tablet Resolution Horizontal',
        inputValue: tabletResolutionHorizontal,
        isInputValueValid: tabletResolutionHorizontal !== 0,
      },
      {
        inputName: 'Tablet Resolution Vertical',
        inputValue: tabletResolutionVertical,
        isInputValueValid: tabletResolutionVertical !== 0,
      },
      {
        inputName: 'Tablet RAM Capacity',
        inputValue: tabletRamCapacity,
        isInputValueValid: tabletRamCapacity !== 0,
      },
      {
        inputName: 'Tablet RAM Capacity Unit',
        inputValue: tabletRamCapacityUnit,
      },
      {
        inputName: 'Tablet Storage Capacity',
        inputValue: tabletStorageCapacity,
        isInputValueValid: tabletStorageCapacity !== 0,
      },
      {
        inputName: 'Tablet Battery Capacity',
        inputValue: tabletBatteryCapacity,
        isInputValueValid: tabletBatteryCapacity !== 0,
      },
      {
        inputName: 'Tablet Camera',
        inputValue: tabletCamera,
        isInputValueValid: isTabletCameraValid,
      },
      {
        inputName: 'Tablet Color',
        inputValue: tabletColor,
        isInputValueValid: isTabletColorValid,
      },
    ],
  };

  // form review object -> page 2 -> specifications -> accessory
  const page2AccessoryFormReviewObject: FormReviewObject = {
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
    ],
  };

  // form review object -> page 2 -> specifications -> desktop computers
  const page2DesktopComputerFormReviewObject: FormReviewObject = {
    ...page2CpuFormReviewObject,
    ...page2GpuFormReviewObject,
    ...page2MotherboardFormReviewObject,
    ...page2RamFormReviewObject,
    ...page2StorageFormReviewObject,
    ...page2PowerSupplyFormReviewObject,
    ...page2ComputerCaseFormReviewObject,
    ...page2MonitorFormReviewObject,
    ...page2KeyboardFormReviewObject,
    ...page2MouseFormReviewObject,
    ...page2SpeakerFormReviewObject,
  };

  // form review object -> page 2 -> specifications -> laptop computers
  const page2LaptopComputerFormReviewObject: FormReviewObject = {
    ...page2CpuFormReviewObject,
    ...page2GpuFormReviewObject,
    ...page2RamFormReviewObject,
    ...page2StorageFormReviewObject,
  };

  const page3ImageUploadsFormReviewObject: FormReviewObject = {
    'Upload Images': [
      {
        inputName: 'Images',
        inputValue: stepsInError.has(2) ? 'Error' : 'Valid',
        isInputValueValid: !stepsInError.has(2),
      },
    ],
  };

  const CREATE_PRODUCT_FORM_REVIEW_OBJECTS: FormReviewObject = {
    ...page1FormReviewObject,
    ...(productCategory === 'Accessories'
      ? page2AccessoryFormReviewObject
      : productCategory === 'Central Processing Units (CPUs)'
      ? page2CpuFormReviewObject
      : productCategory === 'Computer Cases'
      ? page2ComputerCaseFormReviewObject
      : productCategory === 'Desktop Computers'
      ? page2DesktopComputerFormReviewObject
      : productCategory === 'Graphics Processing Units (GPUs)'
      ? page2GpuFormReviewObject
      : productCategory === 'Headphones'
      ? page2HeadphoneFormReviewObject
      : productCategory === 'Keyboards'
      ? page2KeyboardFormReviewObject
      : productCategory === 'Laptops'
      ? page2LaptopComputerFormReviewObject
      : productCategory === 'Memory (RAM)'
      ? page2RamFormReviewObject
      : productCategory === 'Mice'
      ? page2MouseFormReviewObject
      : productCategory === 'Monitors'
      ? page2MonitorFormReviewObject
      : productCategory === 'Motherboards'
      ? page2MotherboardFormReviewObject
      : productCategory === 'Power Supplies'
      ? page2PowerSupplyFormReviewObject
      : productCategory === 'Smartphones'
      ? page2SmartphoneFormReviewObject
      : productCategory === 'Speakers'
      ? page2SpeakerFormReviewObject
      : productCategory === 'Storage'
      ? page2StorageFormReviewObject
      : page2TabletFormReviewObject),
    ...page3ImageUploadsFormReviewObject,
  };

  // ╭──────────────────────────────────────────────────────────────╮
  // │ Display Create Product Component                             │
  // ╰──────────────────────────────────────────────────────────────╯

  const displayCreateProductReviewPage = (
    <FormReviewPage
      formReviewObject={CREATE_PRODUCT_FORM_REVIEW_OBJECTS}
      formName="Create Product"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate('/home/dashboard/product/display');
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
      parentComponentName="create product form"
      setAreImagesValid={createProductAction.setAreImagesValid}
      setAreImagesValidDispatch={createProductDispatch}
      setImgFormDataArray={createProductAction.setImgFormDataArray}
      setImgFormDataArrayDispatch={createProductDispatch}
    />
  );

  const displayCreateProductForm =
    currentStepperPosition === 0
      ? displayCreateProductFormPage1
      : currentStepperPosition === 1
      ? displayCreateProductFormPage2
      : currentStepperPosition === 2
      ? displayImageUploadPage
      : currentStepperPosition === 3
      ? displayCreateProductReviewPage
      : displaySubmitButton;

  const displayCreateProductComponent = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_PRODUCT_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_PRODUCT_MAX_STEPPER_POSITION}
      setCurrentStepperPosition={createProductAction.setCurrentStepperPosition}
      stepsInError={stepsInError}
      parentComponentDispatch={createProductDispatch}
      childrenTitle="Create Product"
    >
      {displaySubmitSuccessNotificationModal}
      {displayCreateProductForm}
    </StepperWrapper>
  );

  return displayCreateProductComponent;
}

export default CreateProduct;
