import { Group, Stack, Text, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InvalidTokenError } from 'jwt-decode';
import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { TbPlus, TbTrash, TbUpload } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../../constants/data';
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
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { Currency, ResourceRequestServerResponse } from '../../../types';
import {
  returnBrandNameValidationText,
  returnColorVariantValidationText,
  returnCpuFrequencyValidationText,
  returnDimensionsValidationText,
  returnDisplayAspectRatioValidationText,
  returnFloatAmountValidationText,
  returnFormReviewObjectsFromUserDefinedFields,
  returnFrequencyResponseValidationText,
  returnGrammarValidationText,
  returnLargeIntegerValidationText,
  returnMediumIntegerValidationText,
  returnMobileCameraResolutionValidationText,
  returnObjectKeyValidationText,
  returnRamTimingValidationText,
  returnRamVoltageValidationText,
  returnSerialIdValidationText,
  returnSmallIntegerValidationText,
  returnSocketChipsetValidationText,
  returnThemeColors,
  returnUserDefinedFieldValueValidationText,
  returnWeightValidationText,
  urlBuilder,
} from '../../../utils';
import { CURRENCY_DATA } from '../../benefits/constants';
import { PRODUCT_CATEGORIES } from '../../dashboard/constants';
import { ProductCategory } from '../../dashboard/types';
import FormReviewPage, {
  FormReviewObjectArray,
} from '../../formReviewPage/FormReviewPage';
import { ImageUpload } from '../../imageUpload';
import { NotificationModal } from '../../notificationModal';
import {
  AccessibleTextAreaInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../../wrappers';
import {
  ACCESSORY_TYPE_REGEX,
  BRAND_REGEX,
  CASE_SIDE_PANEL_DATA,
  CASE_TYPE_DATA,
  COLOR_VARIANT_REGEX,
  CPU_FREQUENCY_REGEX,
  CPU_SOCKET_REGEX,
  CREATE_PRODUCT_DESCRIPTION_OBJECTS,
  CREATE_PRODUCT_MAX_IMG_AMOUNT,
  CREATE_PRODUCT_MAX_IMG_SIZE,
  CREATE_PRODUCT_MAX_STEPPER_POSITION,
  DIMENSION_UNIT_SELECT_INPUT_DATA,
  DIMENSIONS_REGEX,
  DISPLAY_ASPECT_RATIO_REGEX,
  DISPLAY_PANEL_TYPE_DATA,
  FREQUENCY_RESPONSE_REGEX,
  GPU_CHIPSET_REGEX,
  HEADPHONE_INTERFACE_DATA,
  HEADPHONE_TYPE_DATA,
  KEYBOARD_BACKLIGHT_DATA,
  KEYBOARD_LAYOUT_DATA,
  KEYBOARD_SWITCH_DATA,
  LARGE_INTEGER_REGEX,
  MEDIUM_INTEGER_REGEX,
  MEMORY_UNIT_SELECT_INPUT_DATA,
  MICROPHONE_INTERFACE_DATA,
  MICROPHONE_POLAR_PATTERN_DATA,
  MICROPHONE_TYPE_DATA,
  MOBILE_CAMERA_REGEX,
  MOBILE_OS_DATA,
  MOTHERBOARD_CHIPSET_REGEX,
  MOTHERBOARD_FORM_FACTOR_DATA,
  MOTHERBOARD_MEMORY_TYPE_DATA,
  MOTHERBOARD_SOCKET_REGEX,
  MOUSE_SENSOR_DATA,
  OBJECT_KEY_REGEX,
  PERIPHERALS_INTERFACE_DATA,
  PRODUCT_AVAILABILITY_DATA,
  PSU_EFFICIENCY_RATING_DATA,
  PSU_FORM_FACTOR_DATA,
  PSU_MODULARITY_DATA,
  RAM_MEMORY_TYPE_DATA,
  RAM_TIMING_REGEX,
  RAM_VOLTAGE_REGEX,
  SMALL_INTEGER_REGEX,
  SMARTPHONE_CHIPSET_REGEX,
  SPEAKER_INTERFACE_DATA,
  SPEAKER_TYPE_DATA,
  STORAGE_FORM_FACTOR_DATA,
  STORAGE_INTERFACE_DATA,
  STORAGE_TYPE_DATA,
  TABLET_CHIPSET_REGEX,
  USER_DEFINED_VALUE_REGEX,
  WEBCAM_FRAME_RATE_DATA,
  WEBCAM_INTERFACE_DATA,
  WEBCAM_MICROPHONE_DATA,
  WEBCAM_RESOLUTION_DATA,
  WEIGHT_REGEX,
  WEIGHT_UNIT_SELECT_INPUT_DATA,
} from '../constants';
import { createProductReducer } from './reducers';
import { createProductAction, initialCreateProductState } from './state';
import {
  CaseSidePanel,
  CaseType,
  DimensionUnit,
  DisplayPanelType,
  HeadphoneInterface,
  HeadphoneType,
  KeyboardBacklight,
  KeyboardLayout,
  KeyboardSwitch,
  MemoryType,
  MemoryUnit,
  MerchandiseAvailability,
  MicrophoneInterface,
  MicrophonePolarPattern,
  MicrophoneType,
  MobileOs,
  MotherboardFormFactor,
  MouseSensor,
  PeripheralsInterface,
  ProductDocument,
  PsuEfficiency,
  PsuFormFactor,
  PsuModularity,
  SpeakerInterface,
  SpeakerType,
  StorageFormFactor,
  StorageInterface,
  StorageType,
  WebcamFrameRate,
  WebcamInterface,
  WebcamMicrophone,
  WebcamResolution,
  WeightUnit,
} from './types';

function CreateProduct() {
  const [createProductState, createProductDispatch] = useReducer(
    createProductReducer,
    initialCreateProductState
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
    // page 1 -> model, product category
    model,
    isModelValid,
    isModelFocused,
    productCategory,
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

    // page 2

    // page 2 -> specifications

    // page 2 -> specifications -> cpu
    cpuSocket,
    isCpuSocketValid,
    isCpuSocketFocused,
    cpuFrequency,
    isCpuFrequencyFocused,
    isCpuFrequencyValid,
    cpuCores,
    isCpuCoresFocused,
    isCpuCoresValid,
    cpuL1CacheCapacity,
    isCpuL1CacheCapacityFocused,
    isCpuL1CacheCapacityValid,
    cpuL1CacheCapacityUnit,
    cpuL2CacheCapacity,
    isCpuL2CacheCapacityFocused,
    isCpuL2CacheCapacityValid,
    cpuL2CacheCapacityUnit,
    cpuL3CacheCapacity,
    isCpuL3CacheCapacityFocused,
    isCpuL3CacheCapacityValid,
    cpuL3CacheCapacityUnit,
    cpuWattage,
    isCpuWattageFocused,
    isCpuWattageValid,
    cpuFieldsAdditionalMap,
    areCpuFieldsAdditionalMapFocused,
    areCpuFieldsAdditionalMapValid,

    // page 2 -> specifications -> gpu
    gpuChipset,
    isGpuChipsetValid,
    isGpuChipsetFocused,
    gpuMemoryCapacity,
    isGpuMemoryCapacityFocused,
    isGpuMemoryCapacityValid,
    gpuMemoryCapacityUnit,
    gpuCoreClock,
    isGpuCoreClockFocused,
    isGpuCoreClockValid,
    gpuBoostClock,
    isGpuBoostClockFocused,
    isGpuBoostClockValid,
    gpuTdp,
    isGpuTdpFocused,
    isGpuTdpValid,
    gpuFieldsAdditionalMap,
    areGpuFieldsAdditionalMapFocused,
    areGpuFieldsAdditionalMapValid,

    // page 2 -> specifications -> motherboard
    motherboardSocket,
    isMotherboardSocketFocused,
    isMotherboardSocketValid,
    motherboardChipset,
    isMotherboardChipsetFocused,
    isMotherboardChipsetValid,
    motherboardFormFactor,
    motherboardMemoryMaxCapacity,
    isMotherboardMemoryMaxCapacityFocused,
    isMotherboardMemoryMaxCapacityValid,
    motherboardMemoryMaxCapacityUnit,
    motherboardMemorySlots,
    isMotherboardMemorySlotsFocused,
    isMotherboardMemorySlotsValid,
    motherboardMemoryType,
    motherboardSataPorts,
    isMotherboardSataPortsFocused,
    isMotherboardSataPortsValid,
    motherboardM2Slots,
    isMotherboardM2SlotsFocused,
    isMotherboardM2SlotsValid,
    motherboardPcie3Slots,
    isMotherboardPcie3SlotsFocused,
    isMotherboardPcie3SlotsValid,
    motherboardPcie4Slots,
    isMotherboardPcie4SlotsFocused,
    isMotherboardPcie4SlotsValid,
    motherboardPcie5Slots,
    isMotherboardPcie5SlotsFocused,
    isMotherboardPcie5SlotsValid,
    motherboardFieldsAdditionalMap,
    areMotherboardFieldsAdditionalMapFocused,
    areMotherboardFieldsAdditionalMapValid,

    // page 2 -> specifications -> ram
    ramDataRate,
    isRamDataRateFocused,
    isRamDataRateValid,
    ramModulesQuantity,
    isRamModulesQuantityFocused,
    isRamModulesQuantityValid,
    ramModulesCapacity,
    isRamModulesCapacityFocused,
    isRamModulesCapacityValid,
    ramModulesCapacityUnit,
    ramType,
    ramColor,
    isRamColorFocused,
    isRamColorValid,
    ramVoltage,
    isRamVoltageFocused,
    isRamVoltageValid,
    ramTiming,
    isRamTimingFocused,
    isRamTimingValid,
    ramFieldsAdditionalMap,
    areRamFieldsAdditionalMapFocused,
    areRamFieldsAdditionalMapValid,

    // page 2 -> specifications -> storage
    storageType,
    storageCapacity,
    isStorageCapacityFocused,
    isStorageCapacityValid,
    storageCapacityUnit,
    storageCacheCapacity,
    isStorageCacheCapacityFocused,
    isStorageCacheCapacityValid,
    storageCacheCapacityUnit,
    storageFormFactor,
    storageInterface,
    storageFieldsAdditionalMap,
    areStorageFieldsAdditionalMapFocused,
    areStorageFieldsAdditionalMapValid,

    // page 2 -> specifications -> psu
    psuWattage,
    isPsuWattageFocused,
    isPsuWattageValid,
    psuEfficiency,
    psuModularity,
    psuFormFactor,
    psuFieldsAdditionalMap,
    arePsuFieldsAdditionalMapFocused,
    arePsuFieldsAdditionalMapValid,

    // page 2 -> specifications -> case
    caseType,
    caseColor,
    isCaseColorFocused,
    isCaseColorValid,
    caseSidePanel,
    caseFieldsAdditionalMap,
    areCaseFieldsAdditionalMapFocused,
    areCaseFieldsAdditionalMapValid,

    // page 2 -> specifications -> display
    displaySize,
    isDisplaySizeFocused,
    isDisplaySizeValid,
    displayResolutionHorizontal,
    isDisplayResolutionHorizontalFocused,
    isDisplayResolutionHorizontalValid,
    displayResolutionVertical,
    isDisplayResolutionVerticalFocused,
    isDisplayResolutionVerticalValid,
    displayRefreshRate,
    isDisplayRefreshRateFocused,
    isDisplayRefreshRateValid,
    displayPanelType,
    displayResponseTime,
    isDisplayResponseTimeFocused,
    isDisplayResponseTimeValid,
    displayAspectRatio,
    isDisplayAspectRatioFocused,
    isDisplayAspectRatioValid,
    displayFieldsAdditionalMap,
    areDisplayFieldsAdditionalMapFocused,
    areDisplayFieldsAdditionalMapValid,

    // page 2 -> specifications -> keyboard
    keyboardSwitch,
    keyboardLayout,
    keyboardBacklight,
    keyboardInterface,
    keyboardFieldsAdditionalMap,
    areKeyboardFieldsAdditionalMapFocused,
    areKeyboardFieldsAdditionalMapValid,

    // page 2 -> specifications -> mouse
    mouseSensor,
    mouseDpi,
    isMouseDpiFocused,
    isMouseDpiValid,
    mouseButtons,
    isMouseButtonsFocused,
    isMouseButtonsValid,
    mouseColor,
    isMouseColorFocused,
    isMouseColorValid,
    mouseInterface,
    mouseFieldsAdditionalMap,
    areMouseFieldsAdditionalMapFocused,
    areMouseFieldsAdditionalMapValid,

    // page 2 -> specifications -> headphone
    headphoneType,
    headphoneColor,
    isHeadphoneColorFocused,
    isHeadphoneColorValid,
    headphoneDriver,
    isHeadphoneDriverFocused,
    isHeadphoneDriverValid,
    headphoneFrequencyResponse,
    isHeadphoneFrequencyResponseFocused,
    isHeadphoneFrequencyResponseValid,
    headphoneImpedance,
    isHeadphoneImpedanceFocused,
    isHeadphoneImpedanceValid,
    headphoneInterface,
    headphoneFieldsAdditionalMap,
    areHeadphoneFieldsAdditionalMapFocused,
    areHeadphoneFieldsAdditionalMapValid,

    // page 2 -> specifications -> speaker
    speakerType,
    speakerColor,
    isSpeakerColorFocused,
    isSpeakerColorValid,
    speakerFrequencyResponse,
    isSpeakerFrequencyResponseFocused,
    isSpeakerFrequencyResponseValid,
    speakerTotalWattage,
    isSpeakerTotalWattageFocused,
    isSpeakerTotalWattageValid,
    speakerInterface,
    speakerFieldsAdditionalMap,
    areSpeakerFieldsAdditionalMapFocused,
    areSpeakerFieldsAdditionalMapValid,

    // page 2 -> specifications -> smartphone
    smartphoneBatteryCapacity,
    isSmartphoneBatteryCapacityFocused,
    isSmartphoneBatteryCapacityValid,
    smartphoneCamera,
    isSmartphoneCameraFocused,
    isSmartphoneCameraValid,
    smartphoneChipset,
    isSmartphoneChipsetFocused,
    isSmartphoneChipsetValid,
    smartphoneColor,
    isSmartphoneColorFocused,
    isSmartphoneColorValid,
    smartphoneDisplay,
    isSmartphoneDisplayFocused,
    isSmartphoneDisplayValid,
    smartphoneResolutionHorizontal,
    isSmartphoneResolutionHorizontalFocused,
    isSmartphoneResolutionHorizontalValid,
    smartphoneResolutionVertical,
    isSmartphoneResolutionVerticalFocused,
    isSmartphoneResolutionVerticalValid,
    smartphoneOs,
    smartphoneRamCapacity,
    isSmartphoneRamCapacityFocused,
    isSmartphoneRamCapacityValid,
    smartphoneRamCapacityUnit,
    smartphoneStorageCapacity,
    isSmartphoneStorageCapacityFocused,
    isSmartphoneStorageCapacityValid,
    smartphoneFieldsAdditionalMap,
    areSmartphoneFieldsAdditionalMapFocused,
    areSmartphoneFieldsAdditionalMapValid,

    // page 2 -> specifications -> tablet
    tabletBatteryCapacity,
    isTabletBatteryCapacityFocused,
    isTabletBatteryCapacityValid,
    tabletCamera,
    isTabletCameraFocused,
    isTabletCameraValid,
    tabletChipset,
    isTabletChipsetFocused,
    isTabletChipsetValid,
    tabletColor,
    isTabletColorFocused,
    isTabletColorValid,
    tabletDisplay,
    isTabletDisplayFocused,
    isTabletDisplayValid,
    tabletResolutionHorizontal,
    isTabletResolutionHorizontalFocused,
    isTabletResolutionHorizontalValid,
    tabletResolutionVertical,
    isTabletResolutionVerticalFocused,
    isTabletResolutionVerticalValid,
    tabletOs,
    tabletRamCapacity,
    isTabletRamCapacityFocused,
    isTabletRamCapacityValid,
    tabletRamCapacityUnit,
    tabletStorageCapacity,
    isTabletStorageCapacityFocused,
    isTabletStorageCapacityValid,
    tabletFieldsAdditionalMap,
    areTabletFieldsAdditionalMapFocused,
    areTabletFieldsAdditionalMapValid,

    // page 2 -> specifications -> accessory
    accessoryType,
    isAccessoryTypeValid,
    isAccessoryTypeFocused,
    accessoryColor,
    isAccessoryColorFocused,
    isAccessoryColorValid,
    accessoryInterface,
    accessoryFieldsAdditionalMap,
    areAccessoryFieldsAdditionalMapFocused,
    areAccessoryFieldsAdditionalMapValid,
    currentlySelectedAdditionalFieldIndex,

    // page 2 -> specifications -> webcam
    webcamColor,
    isWebcamColorFocused,
    isWebcamColorValid,
    webcamFrameRate,
    webcamInterface,
    webcamMicrophone,
    webcamResolution,
    webcamFieldsAdditionalMap,
    areWebcamFieldsAdditionalMapFocused,
    areWebcamFieldsAdditionalMapValid,

    // page 2 -> specifications -> microphone
    microphoneColor,
    isMicrophoneColorFocused,
    isMicrophoneColorValid,
    microphoneInterface,
    microphoneType,
    microphonePolarPattern,
    microphoneFrequencyResponse,
    isMicrophoneFrequencyResponseFocused,
    isMicrophoneFrequencyResponseValid,
    microphoneFieldsAdditionalMap,
    areMicrophoneFieldsAdditionalMapFocused,
    areMicrophoneFieldsAdditionalMapValid,

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
      if (imgFormDataArray.length === 0) {
        return;
      }

      createProductDispatch({
        type: createProductAction.setIsSubmitting,
        payload: true,
      });
      createProductDispatch({
        type: createProductAction.setSubmitMessage,
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

          // request body -> page 2

          // request body -> page 2 -> specifications

          // request body -> page 2 -> specifications -> cpu
          const cpuRequestBody = {
            cpuSocket,
            cpuFrequency,
            cpuCores,
            cpuL1Cache: cpuL1CacheCapacity,
            cpuL1CacheUnit: cpuL1CacheCapacityUnit,
            cpuL2Cache: cpuL2CacheCapacity,
            cpuL2CacheUnit: cpuL2CacheCapacityUnit,
            cpuL3Cache: cpuL3CacheCapacity,
            cpuL3CacheUnit: cpuL3CacheCapacityUnit,
            cpuWattage,
          };

          // request body -> page 2 -> specifications -> gpu
          const gpuRequestBody = {
            gpuChipset,
            gpuMemory: gpuMemoryCapacity,
            gpuMemoryUnit: gpuMemoryCapacityUnit,
            gpuCoreClock,
            gpuBoostClock,
            gpuTdp,
          };

          // request body -> page 2 -> specifications -> motherboard
          const motherboardRequestBody = {
            motherboardSocket,
            motherboardChipset,
            motherboardFormFactor,
            motherboardMemoryMax: motherboardMemoryMaxCapacity,
            motherboardMemoryMaxUnit: motherboardMemoryMaxCapacityUnit,
            motherboardMemorySlots,
            motherboardMemoryType,
            motherboardSataPorts,
            motherboardM2Slots,
            motherboardPcie3Slots,
            motherboardPcie4Slots,
            motherboardPcie5Slots,
          };

          // request body -> page 2 -> specifications -> ram
          const ramRequestBody = {
            ramDataRate,
            ramModulesQuantity,
            ramModulesCapacity,
            ramModulesCapacityUnit,
            ramType,
            ramColor,
            ramVoltage,
            ramTiming,
          };

          // request body -> page 2 -> specifications -> storage
          const storageRequestBody = {
            storageType,
            storageCapacity,
            storageCapacityUnit,
            storageCache: storageCacheCapacity,
            storageCacheUnit: storageCacheCapacityUnit,
            storageFormFactor,
            storageInterface,
          };

          // request body -> page 2 -> specifications -> psu
          const psuRequestBody = {
            psuWattage,
            psuEfficiency,
            psuFormFactor,
            psuModularity,
          };

          // request body -> page 2 -> specifications -> case
          const caseRequestBody = {
            caseType,
            caseColor,
            caseSidePanel,
          };

          // request body -> page 2 -> specifications -> display
          const displayRequestBody = {
            displaySize,
            displayHorizontalResolution: displayResolutionHorizontal,
            displayVerticalResolution: displayResolutionVertical,
            displayRefreshRate,
            displayPanelType,
            displayResponseTime,
            displayAspectRatio,
          };

          // request body -> page 2 -> specifications -> keyboard
          const keyboardRequestBody = {
            keyboardSwitch,
            keyboardLayout,
            keyboardBacklight,
            keyboardInterface,
          };

          // request body -> page 2 -> specifications -> mouse
          const mouseRequestBody = {
            mouseSensor,
            mouseDpi,
            mouseButtons,
            mouseColor,
            mouseInterface,
          };

          // request body -> page 2 -> specifications -> headphone
          const headphoneRequestBody = {
            headphoneType,
            headphoneDriver,
            headphoneFrequencyResponse,
            headphoneImpedance,
            headphoneColor,
            headphoneInterface,
          };

          // request body -> page 2 -> specifications -> speaker
          const speakerRequestBody = {
            speakerType,
            speakerTotalWattage,
            speakerFrequencyResponse,
            speakerColor,
            speakerInterface,
          };

          // request body -> page 2 -> specifications -> smartphone
          const smartphoneRequestBody = {
            smartphoneOs,
            smartphoneChipset,
            smartphoneDisplay,
            smartphoneHorizontalResolution: smartphoneResolutionHorizontal,
            smartphoneVerticalResolution: smartphoneResolutionVertical,
            smartphoneRamCapacity,
            smartphoneRamCapacityUnit,
            smartphoneStorageCapacity,
            smartphoneBatteryCapacity,
            smartphoneCamera,
            smartphoneColor,
          };

          // request body -> page 2 -> specifications -> tablet
          const tabletRequestBody = {
            tabletOs,
            tabletChipset,
            tabletDisplay,
            tabletHorizontalResolution: tabletResolutionHorizontal,
            tabletVerticalResolution: tabletResolutionVertical,
            tabletRamCapacity,
            tabletRamCapacityUnit,
            tabletStorageCapacity,
            tabletBatteryCapacity,
            tabletCamera,
            tabletColor,
          };

          // request body -> page 2 -> specifications -> accessory
          const accessoryFieldsAdditionalMapRequestBody = Array.from(
            accessoryFieldsAdditionalMap
          ).reduce((acc, [key, tuple]) => {
            const [field, value] = tuple;
            acc[field] = value;

            return acc;
          }, Object.create(null));

          const accessoryRequestBody = {
            accessoryType,
            accessoryColor,
            accessoryInterface,
            userDefinedFields: {
              ...accessoryFieldsAdditionalMapRequestBody,
            },
          };

          // request body -> page 2 -> desktop computer
          const desktopComputerRequestBody = {
            cpu: cpuRequestBody,
            gpu: gpuRequestBody,
            motherboard: motherboardRequestBody,
            ram: ramRequestBody,
            storage: storageRequestBody,
            psu: psuRequestBody,
            case: caseRequestBody,
            display: displayRequestBody,
            keyboard: keyboardRequestBody,
            mouse: mouseRequestBody,
            speaker: speakerRequestBody,
          };

          // request body -> page 2 -> laptop
          const laptopRequestBody = {
            cpu: cpuRequestBody,
            gpu: gpuRequestBody,
            display: displayRequestBody,
            ram: ramRequestBody,
            storage: storageRequestBody,
          };

          const page2SpecificationsRequestBody =
            productCategory === 'Accessories'
              ? { accessory: accessoryRequestBody }
              : productCategory === 'Desktop Computers'
              ? { desktopComputer: desktopComputerRequestBody }
              : productCategory === 'Laptops'
              ? { laptop: laptopRequestBody }
              : productCategory === 'Central Processing Units (CPUs)'
              ? { cpu: cpuRequestBody }
              : productCategory === 'Computer Cases'
              ? { case: caseRequestBody }
              : productCategory === 'Graphics Processing Units (GPUs)'
              ? { gpu: gpuRequestBody }
              : productCategory === 'Headphones'
              ? { headphone: headphoneRequestBody }
              : productCategory === 'Keyboards'
              ? { keyboard: keyboardRequestBody }
              : productCategory === 'Memory (RAM)'
              ? { ram: ramRequestBody }
              : productCategory === 'Mice'
              ? { mouse: mouseRequestBody }
              : productCategory === 'Displays'
              ? { display: displayRequestBody }
              : productCategory === 'Motherboards'
              ? { motherboard: motherboardRequestBody }
              : productCategory === 'Power Supplies'
              ? { psu: psuRequestBody }
              : productCategory === 'Smartphones'
              ? { smartphone: smartphoneRequestBody }
              : productCategory === 'Speakers'
              ? { speaker: speakerRequestBody }
              : productCategory === 'Storage'
              ? { storage: storageRequestBody }
              : { tablet: tabletRequestBody };

          const createProductRequestBody = JSON.stringify({
            product: {
              ...page1RequestBody,
              productCategory,
              specifications: {
                ...page2SpecificationsRequestBody,
              },
              reviews: [],
              uploadedFilesIds: imgUploadResponseData
                .filter((item) => item !== undefined)
                .map((item) => item?.documentId),
            },
          });

          console.log('createProductRequestBody', createProductRequestBody);

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

  // page 1

  // page 1 -> validations

  // page 1 -> brand
  useEffect(() => {
    const isValid = BRAND_REGEX.test(brand);

    createProductDispatch({
      type: createProductAction.setIsBrandValid,
      payload: isValid,
    });
  }, [brand]);

  // page 1 -> model
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(model);

    createProductDispatch({
      type: createProductAction.setIsModelValid,
      payload: isValid,
    });
  }, [model]);

  // page 1 -> description
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(description);

    createProductDispatch({
      type: createProductAction.setIsDescriptionValid,
      payload: isValid,
    });
  }, [description]);

  // page 1 -> price
  useEffect(() => {
    const isValid = MONEY_REGEX.test(price);

    createProductDispatch({
      type: createProductAction.setIsPriceValid,
      payload: isValid,
    });
  }, [price]);

  // page 1 -> quantity
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(quantity);

    createProductDispatch({
      type: createProductAction.setIsQuantityValid,
      payload: isValid,
    });
  }, [quantity]);

  // page 1 -> weight
  useEffect(() => {
    const isValid = WEIGHT_REGEX.test(weight);

    createProductDispatch({
      type: createProductAction.setIsWeightValid,
      payload: isValid,
    });
  }, [weight]);

  // page 1 -> dimension length
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(dimensionLength);

    createProductDispatch({
      type: createProductAction.setIsDimensionLengthValid,
      payload: isValid,
    });
  }, [dimensionLength]);

  // page 1 -> dimension width
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(dimensionWidth);

    createProductDispatch({
      type: createProductAction.setIsDimensionWidthValid,
      payload: isValid,
    });
  }, [dimensionWidth]);

  // page 1 -> dimension height
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(dimensionHeight);

    createProductDispatch({
      type: createProductAction.setIsDimensionHeightValid,
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

  // page 1 -> additional comments
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalComments);

    createProductDispatch({
      type: createProductAction.setIsAdditionalCommentsValid,
      payload: isValid,
    });
  }, [additionalComments]);

  // page 2

  // page 2 -> cpu

  // page 2 -> cpu -> socket
  useEffect(() => {
    const isValid = CPU_SOCKET_REGEX.test(cpuSocket);

    createProductDispatch({
      type: createProductAction.setIsCpuSocketValid,
      payload: isValid,
    });
  }, [cpuSocket]);

  // page 2 -> cpu -> frequency
  useEffect(() => {
    const isValid = CPU_FREQUENCY_REGEX.test(cpuFrequency);

    createProductDispatch({
      type: createProductAction.setIsCpuFrequencyValid,
      payload: isValid,
    });
  }, [cpuFrequency]);

  // page 2 -> cpu -> cores
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(cpuCores);

    createProductDispatch({
      type: createProductAction.setIsCpuCoresValid,
      payload: isValid,
    });
  }, [cpuCores]);

  // page 2 -> cpu -> L1 cache capacity
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(cpuL1CacheCapacity);

    createProductDispatch({
      type: createProductAction.setIsCpuL1CacheCapacityValid,
      payload: isValid,
    });
  }, [cpuL1CacheCapacity]);

  // page 2 -> cpu -> L2 cache capacity
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(cpuL2CacheCapacity);

    createProductDispatch({
      type: createProductAction.setIsCpuL2CacheCapacityValid,
      payload: isValid,
    });
  }, [cpuL2CacheCapacity]);

  // page 2 -> cpu -> L3 cache capacity
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(cpuL3CacheCapacity);

    createProductDispatch({
      type: createProductAction.setIsCpuL3CacheCapacityValid,
      payload: isValid,
    });
  }, [cpuL3CacheCapacity]);

  // page 2 -> cpu -> wattage
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(cpuWattage);

    createProductDispatch({
      type: createProductAction.setIsCpuWattageValid,
      payload: isValid,
    });
  }, [cpuWattage]);

  // page 2 -> cpu -> additional fields
  useEffect(() => {
    const currentlyUpdatingCpuFieldAdditional = cpuFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingCpuFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingCpuFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreCpuFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreCpuFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, cpuFieldsAdditionalMap]);

  // page 2 -> gpu

  // page 2 -> gpu -> chipset
  useEffect(() => {
    const isValid = GPU_CHIPSET_REGEX.test(gpuChipset);

    createProductDispatch({
      type: createProductAction.setIsGpuChipsetValid,
      payload: isValid,
    });
  }, [gpuChipset]);

  // page 2 -> gpu -> memory capacity
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(gpuMemoryCapacity);

    createProductDispatch({
      type: createProductAction.setIsGpuMemoryCapacityValid,
      payload: isValid,
    });
  }, [gpuMemoryCapacity]);

  // page 2 -> gpu -> core clock
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(gpuCoreClock);

    createProductDispatch({
      type: createProductAction.setIsGpuCoreClockValid,
      payload: isValid,
    });
  }, [gpuCoreClock]);

  // page 2 -> gpu -> boost clock
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(gpuBoostClock);

    createProductDispatch({
      type: createProductAction.setIsGpuBoostClockValid,
      payload: isValid,
    });
  }, [gpuBoostClock]);

  // page 2 -> gpu -> tdp
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(gpuTdp);

    createProductDispatch({
      type: createProductAction.setIsGpuTdpValid,
      payload: isValid,
    });
  }, [gpuTdp]);

  // page 2 -> gpu -> additional fields
  useEffect(() => {
    const currentlyUpdatingGpuFieldAdditional = gpuFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingGpuFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingGpuFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreGpuFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreGpuFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, gpuFieldsAdditionalMap]);

  // page 2 -> motherboard

  // page 2 -> motherboard -> socket
  useEffect(() => {
    const isValid = MOTHERBOARD_SOCKET_REGEX.test(motherboardSocket);

    createProductDispatch({
      type: createProductAction.setIsMotherboardSocketValid,
      payload: isValid,
    });
  }, [motherboardSocket]);

  // page 2 -> motherboard -> chipset
  useEffect(() => {
    const isValid = MOTHERBOARD_CHIPSET_REGEX.test(motherboardChipset);

    createProductDispatch({
      type: createProductAction.setIsMotherboardChipsetValid,
      payload: isValid,
    });
  }, [motherboardChipset]);

  // page 2 -> motherboard -> memory max capacity
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(motherboardMemoryMaxCapacity);

    createProductDispatch({
      type: createProductAction.setIsMotherboardMemoryMaxCapacityValid,
      payload: isValid,
    });
  }, [motherboardMemoryMaxCapacity]);

  // page 2 -> motherboard -> memory slots
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(motherboardMemorySlots);

    createProductDispatch({
      type: createProductAction.setIsMotherboardMemorySlotsValid,
      payload: isValid,
    });
  }, [motherboardMemorySlots]);

  // page 2 -> motherboard -> sata ports
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(motherboardSataPorts);

    createProductDispatch({
      type: createProductAction.setIsMotherboardSataPortsValid,
      payload: isValid,
    });
  }, [motherboardSataPorts]);

  // page 2 -> motherboard -> m2 slots
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(motherboardM2Slots);

    createProductDispatch({
      type: createProductAction.setIsMotherboardM2SlotsValid,
      payload: isValid,
    });
  }, [motherboardM2Slots]);

  // page 2 -> motherboard -> pcie3 slots
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(motherboardPcie3Slots);

    createProductDispatch({
      type: createProductAction.setIsMotherboardPcie3SlotsValid,
      payload: isValid,
    });
  }, [motherboardPcie3Slots]);

  // page 2 -> motherboard -> pcie4 slots
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(motherboardPcie4Slots);

    createProductDispatch({
      type: createProductAction.setIsMotherboardPcie4SlotsValid,
      payload: isValid,
    });
  }, [motherboardPcie4Slots]);

  // page 2 -> motherboard -> pcie5 slots
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(motherboardPcie5Slots);

    createProductDispatch({
      type: createProductAction.setIsMotherboardPcie5SlotsValid,
      payload: isValid,
    });
  }, [motherboardPcie5Slots]);

  // page 2 -> motherboard -> additional fields
  useEffect(() => {
    const currentlyUpdatingMotherboardFieldAdditional =
      motherboardFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingMotherboardFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingMotherboardFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreMotherboardFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreMotherboardFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, motherboardFieldsAdditionalMap]);

  // page 2 -> ram

  // page 2 -> ram -> data rate
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(ramDataRate);

    createProductDispatch({
      type: createProductAction.setIsRamDataRateValid,
      payload: isValid,
    });
  }, [ramDataRate]);

  // page 2 -> ram -> modules quantity
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(ramModulesQuantity);

    createProductDispatch({
      type: createProductAction.setIsRamModulesQuantityValid,
      payload: isValid,
    });
  }, [ramModulesQuantity]);

  // page 2 -> ram -> modules capacity
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(ramModulesCapacity);

    createProductDispatch({
      type: createProductAction.setIsRamModulesCapacityValid,
      payload: isValid,
    });
  }, [ramModulesCapacity]);

  // page 2 -> ram -> voltage
  useEffect(() => {
    const isValid = RAM_VOLTAGE_REGEX.test(ramVoltage);

    createProductDispatch({
      type: createProductAction.setIsRamVoltageValid,
      payload: isValid,
    });
  }, [ramVoltage]);

  // page 2 -> ram -> color variant
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(ramColor);

    createProductDispatch({
      type: createProductAction.setIsRamColorValid,
      payload: isValid,
    });
  }, [ramColor]);

  // page 2 -> ram -> timing
  useEffect(() => {
    const isValid = RAM_TIMING_REGEX.test(ramTiming);

    createProductDispatch({
      type: createProductAction.setIsRamTimingValid,
      payload: isValid,
    });
  }, [ramTiming]);

  // page 2 -> ram -> additional fields
  useEffect(() => {
    const currentlyUpdatingRamFieldAdditional = ramFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingRamFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingRamFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreRamFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreRamFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, ramFieldsAdditionalMap]);

  // page 2 -> storage

  // page 2 -> storage -> capacity
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(storageCapacity);

    createProductDispatch({
      type: createProductAction.setIsStorageCapacityValid,
      payload: isValid,
    });
  }, [storageCapacity]);

  // page 2 -> storage -> cache capacity
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(storageCacheCapacity);

    createProductDispatch({
      type: createProductAction.setIsStorageCacheCapacityValid,
      payload: isValid,
    });
  }, [storageCacheCapacity]);

  // page 2 -> storage -> additional fields
  useEffect(() => {
    const currentlyUpdatingStorageFieldAdditional =
      storageFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingStorageFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingStorageFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreStorageFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreStorageFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, storageFieldsAdditionalMap]);

  // page 2 -> psu

  // page 2 -> psu -> wattage
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(psuWattage);

    createProductDispatch({
      type: createProductAction.setIsPsuWattageValid,
      payload: isValid,
    });
  }, [psuWattage]);

  // page 2 -> psu -> additional fields
  useEffect(() => {
    const currentlyUpdatingPsuFieldAdditional = psuFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingPsuFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingPsuFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setArePsuFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setArePsuFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, psuFieldsAdditionalMap]);

  // page 2 -> case

  // page 2 -> case -> color
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(caseColor);

    createProductDispatch({
      type: createProductAction.setIsCaseColorValid,
      payload: isValid,
    });
  }, [caseColor]);

  // page 2 -> case -> additional fields
  useEffect(() => {
    const currentlyUpdatingCaseFieldAdditional = caseFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingCaseFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingCaseFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreCaseFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreCaseFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, caseFieldsAdditionalMap]);

  // page 2 -> display

  // page 2 -> display -> size
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(displaySize);

    createProductDispatch({
      type: createProductAction.setIsDisplaySizeValid,
      payload: isValid,
    });
  }, [displaySize]);

  // page 2 -> display -> horizontal resolution
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(displayResolutionHorizontal);

    createProductDispatch({
      type: createProductAction.setIsDisplayResolutionHorizontalValid,
      payload: isValid,
    });
  }, [displayResolutionHorizontal]);

  // page 2 -> display -> vertical resolution
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(displayResolutionVertical);

    createProductDispatch({
      type: createProductAction.setIsDisplayResolutionVerticalValid,
      payload: isValid,
    });
  }, [displayResolutionVertical]);

  // page 2 -> display -> refresh rate
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(displayRefreshRate);

    createProductDispatch({
      type: createProductAction.setIsDisplayRefreshRateValid,
      payload: isValid,
    });
  }, [displayRefreshRate]);

  // page 2 -> display -> response time
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(displayResponseTime);

    createProductDispatch({
      type: createProductAction.setIsDisplayResponseTimeValid,
      payload: isValid,
    });
  }, [displayResponseTime]);

  // page 2 -> display -> aspect ratio
  useEffect(() => {
    const isValid = DISPLAY_ASPECT_RATIO_REGEX.test(displayAspectRatio);

    createProductDispatch({
      type: createProductAction.setIsDisplayAspectRatioValid,
      payload: isValid,
    });
  }, [displayAspectRatio]);

  // page 2 -> display -> additional fields
  useEffect(() => {
    const currentlyUpdatingDisplayFieldAdditional =
      displayFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingDisplayFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingDisplayFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreDisplayFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreDisplayFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, displayFieldsAdditionalMap]);

  // page 2 -> keyboard

  // page 2 -> keyboard -> additional fields
  useEffect(() => {
    const currentlyUpdatingKeyboardFieldAdditional =
      keyboardFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingKeyboardFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingKeyboardFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreKeyboardFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreKeyboardFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, keyboardFieldsAdditionalMap]);

  // page 2 -> mouse

  // page 2 -> mouse -> dpi
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(mouseDpi);

    createProductDispatch({
      type: createProductAction.setIsMouseDpiValid,
      payload: isValid,
    });
  }, [mouseDpi]);

  // page 2 -> mouse -> buttons
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(mouseButtons);

    createProductDispatch({
      type: createProductAction.setIsMouseButtonsValid,
      payload: isValid,
    });
  }, [mouseButtons]);

  // page 2 -> mouse -> color variant
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(mouseColor);

    createProductDispatch({
      type: createProductAction.setIsMouseColorValid,
      payload: isValid,
    });
  }, [mouseColor]);

  // page 2 -> mouse -> additional fields
  useEffect(() => {
    const currentlyUpdatingMouseFieldAdditional = mouseFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingMouseFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingMouseFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreMouseFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreMouseFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, mouseFieldsAdditionalMap]);

  // page 2 -> headphone

  // page 2 -> headphone -> driver
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(headphoneDriver);

    createProductDispatch({
      type: createProductAction.setIsHeadphoneDriverValid,
      payload: isValid,
    });
  }, [headphoneDriver]);

  // page 2 -> headphone -> frequency response
  useEffect(() => {
    const isValid = FREQUENCY_RESPONSE_REGEX.test(headphoneFrequencyResponse);

    createProductDispatch({
      type: createProductAction.setIsHeadphoneFrequencyResponseValid,
      payload: isValid,
    });
  }, [headphoneFrequencyResponse]);

  // page 2 -> headphone -> impedance
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(headphoneImpedance);

    createProductDispatch({
      type: createProductAction.setIsHeadphoneImpedanceValid,
      payload: isValid,
    });
  }, [headphoneImpedance]);

  // page 2 -> headphone -> color
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(headphoneColor);

    createProductDispatch({
      type: createProductAction.setIsHeadphoneColorValid,
      payload: isValid,
    });
  }, [headphoneColor]);

  // page 2 -> headphone -> additional fields
  useEffect(() => {
    const currentlyUpdatingHeadphoneFieldAdditional =
      headphoneFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingHeadphoneFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingHeadphoneFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreHeadphoneFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreHeadphoneFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, headphoneFieldsAdditionalMap]);

  // page 2 -> speaker

  // page 2 -> speaker -> total wattage
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(speakerTotalWattage);

    createProductDispatch({
      type: createProductAction.setIsSpeakerTotalWattageValid,
      payload: isValid,
    });
  }, [speakerTotalWattage]);

  // page 2 -> speaker -> frequency response
  useEffect(() => {
    const isValid = FREQUENCY_RESPONSE_REGEX.test(speakerFrequencyResponse);

    createProductDispatch({
      type: createProductAction.setIsSpeakerFrequencyResponseValid,
      payload: isValid,
    });
  }, [speakerFrequencyResponse]);

  // page 2 -> speaker -> color
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(speakerColor);

    createProductDispatch({
      type: createProductAction.setIsSpeakerColorValid,
      payload: isValid,
    });
  }, [speakerColor]);

  // page 2 -> speaker -> additional fields
  useEffect(() => {
    const currentlyUpdatingSpeakerFieldAdditional =
      speakerFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingSpeakerFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingSpeakerFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreSpeakerFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreSpeakerFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, speakerFieldsAdditionalMap]);

  // page 2 -> smartphone

  // page 2 -> smartphone -> chipset
  useEffect(() => {
    const isValid = SMARTPHONE_CHIPSET_REGEX.test(smartphoneChipset);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneChipsetValid,
      payload: isValid,
    });
  }, [smartphoneChipset]);

  // page 2 -> smartphone -> display
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(smartphoneDisplay);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneDisplayValid,
      payload: isValid,
    });
  }, [smartphoneDisplay]);

  // page 2 -> smartphone -> horizontal resolution
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(smartphoneResolutionHorizontal);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneResolutionHorizontalValid,
      payload: isValid,
    });
  }, [smartphoneResolutionHorizontal]);

  // page 2 -> smartphone -> vertical resolution
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(smartphoneResolutionVertical);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneResolutionVerticalValid,
      payload: isValid,
    });
  }, [smartphoneResolutionVertical]);

  // page 2 -> smartphone -> RAM capacity
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(smartphoneRamCapacity);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneRamCapacityValid,
      payload: isValid,
    });
  }, [smartphoneRamCapacity]);

  // page 2 -> smartphone -> storage capacity
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(smartphoneStorageCapacity);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneStorageCapacityValid,
      payload: isValid,
    });
  }, [smartphoneStorageCapacity]);

  // page 2 -> smartphone -> battery capacity
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(smartphoneBatteryCapacity);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneBatteryCapacityValid,
      payload: isValid,
    });
  }, [smartphoneBatteryCapacity]);

  // page 2 -> smartphone -> camera
  useEffect(() => {
    const isValid = MOBILE_CAMERA_REGEX.test(smartphoneCamera);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneCameraValid,
      payload: isValid,
    });
  }, [smartphoneCamera]);

  // page 2 -> smartphone -> color variant
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(smartphoneColor);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneColorValid,
      payload: isValid,
    });
  }, [smartphoneColor]);

  // page 2 -> smartphone -> additional fields
  useEffect(() => {
    const currentlyUpdatingSmartphoneFieldAdditional =
      smartphoneFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingSmartphoneFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingSmartphoneFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreSmartphoneFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreSmartphoneFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, smartphoneFieldsAdditionalMap]);

  // page 2 -> tablet

  // page 2 -> tablet -> chipset
  useEffect(() => {
    const isValid = TABLET_CHIPSET_REGEX.test(tabletChipset);

    createProductDispatch({
      type: createProductAction.setIsTabletChipsetValid,
      payload: isValid,
    });
  }, [tabletChipset]);

  // page 2 -> tablet -> display
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(tabletDisplay);

    createProductDispatch({
      type: createProductAction.setIsTabletDisplayValid,
      payload: isValid,
    });
  }, [tabletDisplay]);

  // page 2 -> tablet -> horizontal resolution
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(tabletResolutionHorizontal);

    createProductDispatch({
      type: createProductAction.setIsTabletResolutionHorizontalValid,
      payload: isValid,
    });
  }, [tabletResolutionHorizontal]);

  // page 2 -> tablet -> vertical resolution
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(tabletResolutionVertical);

    createProductDispatch({
      type: createProductAction.setIsTabletResolutionVerticalValid,
      payload: isValid,
    });
  }, [tabletResolutionVertical]);

  // page 2 -> tablet -> RAM capacity
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(tabletRamCapacity);

    createProductDispatch({
      type: createProductAction.setIsTabletRamCapacityValid,
      payload: isValid,
    });
  }, [tabletRamCapacity]);

  // page 2 -> tablet -> storage capacity
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(tabletStorageCapacity);

    createProductDispatch({
      type: createProductAction.setIsTabletStorageCapacityValid,
      payload: isValid,
    });
  }, [tabletStorageCapacity]);

  // page 2 -> tablet -> battery capacity
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(tabletBatteryCapacity);

    createProductDispatch({
      type: createProductAction.setIsTabletBatteryCapacityValid,
      payload: isValid,
    });
  }, [tabletBatteryCapacity]);

  // page 2 -> tablet -> camera
  useEffect(() => {
    const isValid = MOBILE_CAMERA_REGEX.test(tabletCamera);

    createProductDispatch({
      type: createProductAction.setIsTabletCameraValid,
      payload: isValid,
    });
  }, [tabletCamera]);

  // page 2 -> tablet -> color variant
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(tabletColor);

    createProductDispatch({
      type: createProductAction.setIsTabletColorValid,
      payload: isValid,
    });
  }, [tabletColor]);

  // page 2 -> tablet -> additional fields
  useEffect(() => {
    const currentlyUpdatingTabletFieldAdditional =
      tabletFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingTabletFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingTabletFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreTabletFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreTabletFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, tabletFieldsAdditionalMap]);

  // page 2 -> accessory

  // page 2 -> accessory -> type
  useEffect(() => {
    const isValid = ACCESSORY_TYPE_REGEX.test(accessoryType);

    createProductDispatch({
      type: createProductAction.setIsAccessoryTypeValid,
      payload: isValid,
    });
  }, [accessoryType]);

  // page 2 -> accessory -> color variant
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(accessoryColor);

    createProductDispatch({
      type: createProductAction.setIsAccessoryColorValid,
      payload: isValid,
    });
  }, [accessoryColor]);

  // page 2 -> accessory -> additional fields
  useEffect(() => {
    const currentlyUpdatingAccessoryFieldAdditional =
      accessoryFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);
    if (!currentlyUpdatingAccessoryFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingAccessoryFieldAdditional;
    const isKeyValid = OBJECT_KEY_REGEX.test(key);

    createProductDispatch({
      type: createProductAction.setAreAccessoryFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreAccessoryFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, accessoryFieldsAdditionalMap]);

  // page 2 -> webcam

  // page 2 -> webcam -> color variant
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(webcamColor);

    createProductDispatch({
      type: createProductAction.setIsWebcamColorValid,
      payload: isValid,
    });
  }, [webcamColor]);

  // page 2 -> webcam -> additional fields
  useEffect(() => {
    const currentlyUpdatingWebcamFieldAdditional =
      webcamFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingWebcamFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingWebcamFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreWebcamFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreWebcamFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, webcamFieldsAdditionalMap]);

  // page 2 -> microphone

  // page 2 -> microphone -> color variant
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(microphoneColor);

    createProductDispatch({
      type: createProductAction.setIsMicrophoneColorValid,
      payload: isValid,
    });
  }, [microphoneColor]);

  // page 2 -> microphone -> frequency response
  useEffect(() => {
    const isValid = FREQUENCY_RESPONSE_REGEX.test(microphoneFrequencyResponse);

    createProductDispatch({
      type: createProductAction.setIsMicrophoneFrequencyResponseValid,
      payload: isValid,
    });
  }, [microphoneFrequencyResponse]);

  // page 2 -> microphone -> additional fields
  useEffect(() => {
    const currentlyUpdatingMicrophoneFieldAdditional =
      microphoneFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingMicrophoneFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingMicrophoneFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreMicrophoneFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreMicrophoneFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [currentlySelectedAdditionalFieldIndex, microphoneFieldsAdditionalMap]);

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

    createProductDispatch({
      type: createProductAction.setStepsInError,
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
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

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

    const areDisplaySpecificationsInError =
      !displaySize ||
      !displayResolutionHorizontal ||
      !displayResolutionVertical ||
      !displayRefreshRate ||
      !displayResponseTime ||
      !isDisplayAspectRatioValid;

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
      areDisplaySpecificationsInError ||
      areMouseSpecificationsInError ||
      areSpeakerSpecificationsInError;

    const areLaptopSpecificationsInError =
      areCpuSpecificationsInError ||
      areGpuSpecificationsInError ||
      areRamSpecificationsInError ||
      areStorageSpecificationsInError ||
      areDisplaySpecificationsInError;

    const isWebcamSpecificationInError = !webcamColor;

    const areMicrophoneSpecificationsInError =
      !microphoneColor || !isMicrophoneFrequencyResponseValid;

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
        : productCategory === 'Displays'
        ? areDisplaySpecificationsInError
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
        : productCategory === 'Tablets'
        ? areTabletSpecificationsInError
        : productCategory === 'Webcams'
        ? isWebcamSpecificationInError
        : areMicrophoneSpecificationsInError;

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
    isDisplayAspectRatioValid,
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
    displayRefreshRate,
    displayResolutionHorizontal,
    displayResolutionVertical,
    displayResponseTime,
    displaySize,
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
    webcamColor,
    microphoneColor,
    isMicrophoneFrequencyResponseValid,
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
        createProductDispatch({
          type: createProductAction.setIsQuantityFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setQuantity,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsQuantityFocused,
          payload: true,
        });
      },
      placeholder: 'Enter product quantity',
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
        createProductDispatch({
          type: createProductAction.setIsWeightFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setWeight,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsWeightFocused,
          payload: true,
        });
      },
      placeholder: 'Enter product weight',
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
        createProductDispatch({
          type: createProductAction.setIsDimensionLengthFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setDimensionLength,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsDimensionLengthFocused,
          payload: true,
        });
      },
      placeholder: 'Enter product length',
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
          createProductDispatch({
            type: createProductAction.setDimensionLengthUnit,
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
        createProductDispatch({
          type: createProductAction.setIsDimensionWidthFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setDimensionWidth,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsDimensionWidthFocused,
          payload: true,
        });
      },
      placeholder: 'Enter product width',
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
          createProductDispatch({
            type: createProductAction.setDimensionWidthUnit,
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
        createProductDispatch({
          type: createProductAction.setIsDimensionHeightFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setDimensionHeight,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsDimensionHeightFocused,
          payload: true,
        });
      },
      placeholder: 'Enter product height',
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
        describedBy: 'Select a product category for your product.',
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

  // page 2 -> specifications -> cpu -> cpu frequency -> screenreader accessible text input elements
  const [cpuFrequencyInputErrorText, cpuFrequencyInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu frequency',
      inputText: cpuFrequency,
      isInputTextFocused: isCpuFrequencyFocused,
      isValidInputText: isCpuFrequencyValid,
      regexValidationText: returnCpuFrequencyValidationText({
        content: cpuFrequency,
        contentKind: 'cpu frequency',
      }),
    });

  // page 2 -> specifications -> cpu -> cpu frequency -> text input element creator
  const [createdCpuFrequencyTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: cpuFrequencyInputErrorText,
        valid: cpuFrequencyInputValidText,
      },
      inputText: cpuFrequency,
      isValidInputText: isCpuFrequencyValid,
      label: 'CPU Frequency (GHz)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuFrequencyFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setCpuFrequency,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuFrequencyFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 0.0 or 0.00',
      required: true,
      semanticName: 'cpu frequency',
    },
  ]);

  // page 2 -> specifications -> cpu -> cpu cores

  // page 2 -> specifications -> cpu -> cpu cores -> screenreader accessible text input elements
  const [cpuCoresInputErrorText, cpuCoresInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu cores',
      inputText: cpuCores,
      isInputTextFocused: isCpuCoresFocused,
      isValidInputText: isCpuCoresValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: cpuCores,
        contentKind: 'cpu cores',
      }),
    });

  // page 2 -> specifications -> cpu -> cpu cores -> text input element creator
  const [createdCpuCoresTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: cpuCoresInputErrorText,
        valid: cpuCoresInputValidText,
      },
      inputText: cpuCores,
      isValidInputText: isCpuCoresValid,
      label: 'CPU Cores',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuCoresFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setCpuCores,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuCoresFocused,
          payload: true,
        });
      },
      placeholder: 'Enter CPU cores',
      required: true,
      semanticName: 'cpu cores',
    },
  ]);

  // page 2 -> specifications -> cpu -> cpu L1 cache capacity

  // page 2 -> specifications -> cpu -> cpu L1 cache capacity -> screenreader accessible text input elements
  const [cpuL1CacheCapacityInputErrorText, cpuL1CacheCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu L1 cache capacity',
      inputText: cpuL1CacheCapacity,
      isInputTextFocused: isCpuL1CacheCapacityFocused,
      isValidInputText: isCpuL1CacheCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: cpuL1CacheCapacity,
        contentKind: 'cpu L1 cache capacity',
      }),
    });

  // page 2 -> specifications -> cpu -> cpu L1 cache capacity -> text input element creator
  const [createdCpuL1CacheCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: cpuL1CacheCapacityInputErrorText,
          valid: cpuL1CacheCapacityInputValidText,
        },
        inputText: cpuL1CacheCapacity,
        isValidInputText: isCpuL1CacheCapacityValid,
        label: 'CPU L1 Cache Capacity',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsCpuL1CacheCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuL1CacheCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsCpuL1CacheCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Enter CPU L1 cache capacity',
        required: true,
        semanticName: 'cpu L1 cache capacity',
      },
    ]);

  // page 2 -> specifications -> cpu -> cpu L1 cache capacity unit

  // page 2 -> specifications -> cpu -> cpu L1 cache capacity unit -> select input element
  const [createdCpuL1CacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
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

  // page 2 -> specifications -> cpu -> cpu L2 cache capacity -> screenreader accessible text input elements
  const [cpuL2CacheCapacityInputErrorText, cpuL2CacheCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu L2 cache capacity',
      inputText: cpuL2CacheCapacity,
      isInputTextFocused: isCpuL2CacheCapacityFocused,
      isValidInputText: isCpuL2CacheCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: cpuL2CacheCapacity,
        contentKind: 'cpu L2 cache capacity',
      }),
    });

  // page 2 -> specifications -> cpu -> cpu L2 cache capacity -> text input element creator
  const [createdCpuL2CacheCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: cpuL2CacheCapacityInputErrorText,
          valid: cpuL2CacheCapacityInputValidText,
        },
        inputText: cpuL2CacheCapacity,
        isValidInputText: isCpuL2CacheCapacityValid,
        label: 'CPU L2 Cache Capacity',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsCpuL2CacheCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuL2CacheCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsCpuL2CacheCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Enter CPU L2 cache capacity',
        required: true,
        semanticName: 'cpu L2 cache capacity',
      },
    ]);

  // page 2 -> specifications -> cpu -> cpu L2 cache capacity unit

  // page 2 -> specifications -> cpu -> cpu L2 cache capacity unit -> select input element
  const [createdCpuL2CacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
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

  // page 2 -> specifications -> cpu -> cpu L3 cache capacity -> screenreader accessible text input elements
  const [cpuL3CacheCapacityInputErrorText, cpuL3CacheCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu L3 cache capacity',
      inputText: cpuL3CacheCapacity,
      isInputTextFocused: isCpuL3CacheCapacityFocused,
      isValidInputText: isCpuL3CacheCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: cpuL3CacheCapacity,
        contentKind: 'cpu L3 cache capacity',
      }),
    });

  // page 2 -> specifications -> cpu -> cpu L3 cache capacity -> text input element creator
  const [createdCpuL3CacheCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: cpuL3CacheCapacityInputErrorText,
          valid: cpuL3CacheCapacityInputValidText,
        },
        inputText: cpuL3CacheCapacity,
        isValidInputText: isCpuL3CacheCapacityValid,
        label: 'CPU L3 Cache Capacity',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsCpuL3CacheCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuL3CacheCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsCpuL3CacheCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Enter CPU L3 cache capacity',
        required: true,
        semanticName: 'cpu L3 cache capacity',
      },
    ]);

  // page 2 -> specifications -> cpu -> cpu L3 cache capacity unit

  // page 2 -> specifications -> cpu -> cpu L3 cache capacity unit -> select input element
  const [createdCpuL3CacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
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

  // page 2 -> specifications -> cpu -> cpu wattage -> screenreader accessible text input elements
  const [cpuWattageInputErrorText, cpuWattageInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu wattage',
      inputText: cpuWattage,
      isInputTextFocused: isCpuWattageFocused,
      isValidInputText: isCpuWattageValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: cpuWattage,
        contentKind: 'cpu wattage',
      }),
    });

  // page 2 -> specifications -> cpu -> cpu wattage -> text input element creator
  const [createdCpuWattageTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: cpuWattageInputErrorText,
        valid: cpuWattageInputValidText,
      },
      inputText: cpuWattage,
      isValidInputText: isCpuWattageValid,
      label: 'CPU Wattage',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuWattageFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setCpuWattage,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuWattageFocused,
          payload: true,
        });
      },
      placeholder: 'Enter CPU wattage',
      required: true,
      semanticName: 'cpu wattage',
    },
  ]);

  // page 2 -> specifications -> cpu -> add new field button
  const [createdAddCpuFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> cpu -> cpu fields user defined

  // page 2 -> specifications -> cpu -> cpu fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> cpu -> cpu fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const cpuFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(cpuFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      cpuFieldsAdditionalMapKeysInputErrorText,
      cpuFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areCpuFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areCpuFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      cpuFieldsAdditionalMapKeysInputErrorText,
      cpuFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> cpu -> cpu fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const cpuFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(cpuFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      cpuFieldsAdditionalMapValuesInputErrorText,
      cpuFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areCpuFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areCpuFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      cpuFieldsAdditionalMapValuesInputErrorText,
      cpuFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> cpu -> cpu fields user defined -> text area input element creator
  const createdCpuFieldsAdditionalMapTextInputElements = Array.from(
    cpuFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const cpuFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: cpuFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: cpuFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areCpuFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapFocused,
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

    const cpuFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: cpuFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: cpuFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areCpuFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapFocused,
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
      createdCpuFieldsAdditionalMapKeysTextAreaInput,
      createdCpuFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      cpuFieldsAdditionalMapKeysTextInputCreatorInfo,
      cpuFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
      <Stack key={`cpuFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Cpu field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdCpuFieldsAdditionalMapKeysTextAreaInput}
          {createdCpuFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

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

  // page 2 -> specifications -> gpu -> gpu memory capacity -> screenreader accessible text input elements
  const [gpuMemoryCapacityInputErrorText, gpuMemoryCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'gpu memory capacity',
      inputText: gpuMemoryCapacity,
      isInputTextFocused: isGpuMemoryCapacityFocused,
      isValidInputText: isGpuMemoryCapacityValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: gpuMemoryCapacity,
        contentKind: 'gpu memory capacity',
      }),
    });

  // page 2 -> specifications -> gpu -> gpu memory capacity -> text input element creator
  const [createdGpuMemoryCapacityTextInput] = returnAccessibleTextInputElements(
    [
      {
        description: {
          error: gpuMemoryCapacityInputErrorText,
          valid: gpuMemoryCapacityInputValidText,
        },
        inputText: gpuMemoryCapacity,
        isValidInputText: isGpuMemoryCapacityValid,
        label: 'GPU Memory Capacity (GB)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsGpuMemoryCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setGpuMemoryCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsGpuMemoryCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 00',
        required: true,
        semanticName: 'gpu memory capacity',
      },
    ]
  );

  // page 2 -> specifications -> gpu -> gpu memory capacity unit

  // page 2 -> specifications -> gpu -> gpu memory capacity unit -> select input element
  const [createdGpuMemoryCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
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

  // page 2 -> specifications -> gpu -> gpu core clock -> screenreader accessible text input elements
  const [gpuCoreClockInputErrorText, gpuCoreClockInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'gpu core clock',
      inputText: gpuCoreClock,
      isInputTextFocused: isGpuCoreClockFocused,
      isValidInputText: isGpuCoreClockValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: gpuCoreClock,
        contentKind: 'gpu core clock',
      }),
    });

  // page 2 -> specifications -> gpu -> gpu core clock -> text input element creator
  const [createdGpuCoreClockTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: gpuCoreClockInputErrorText,
        valid: gpuCoreClockInputValidText,
      },
      inputText: gpuCoreClock,
      isValidInputText: isGpuCoreClockValid,
      label: 'GPU Core Clock (MHz)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuCoreClockFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setGpuCoreClock,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuCoreClockFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 0000',
      required: true,
      semanticName: 'gpu core clock',
    },
  ]);

  // page 2 -> specifications -> gpu -> gpu boost clock

  // page 2 -> specifications -> gpu -> gpu boost clock -> screenreader accessible text input elements
  const [gpuBoostClockInputErrorText, gpuBoostClockInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'gpu boost clock',
      inputText: gpuBoostClock,
      isInputTextFocused: isGpuBoostClockFocused,
      isValidInputText: isGpuBoostClockValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: gpuBoostClock,
        contentKind: 'gpu boost clock',
      }),
    });

  // page 2 -> specifications -> gpu -> gpu boost clock -> text input element creator
  const [createdGpuBoostClockTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: gpuBoostClockInputErrorText,
        valid: gpuBoostClockInputValidText,
      },
      inputText: gpuBoostClock,
      isValidInputText: isGpuBoostClockValid,
      label: 'GPU Boost Clock (MHz)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuBoostClockFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setGpuBoostClock,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuBoostClockFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 0000',
      required: true,
      semanticName: 'gpu boost clock',
    },
  ]);

  // page 2 -> specifications -> gpu -> gpu wattage

  // page 2 -> specifications -> gpu -> gpu wattage -> screenreader accessible text input elements
  const [gpuTdpInputErrorText, gpuTdpInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'gpu wattage',
      inputText: gpuTdp,
      isInputTextFocused: isGpuTdpFocused,
      isValidInputText: isGpuTdpValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: gpuTdp,
        contentKind: 'gpu wattage',
      }),
    });

  // page 2 -> specifications -> gpu -> gpu wattage -> text input element creator
  const [createdGpuWattageTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: gpuTdpInputErrorText,
        valid: gpuTdpInputValidText,
      },
      inputText: gpuTdp,
      isValidInputText: isGpuTdpValid,
      label: 'GPU Wattage (W)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuTdpFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setGpuTdp,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuTdpFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 0000',
      required: true,
      semanticName: 'gpu wattage',
    },
  ]);

  // page 2 -> specifications -> gpu -> add new field button
  const [createdAddGpuFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setGpuFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> gpu -> gpu fields user defined

  // page 2 -> specifications -> gpu -> gpu fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> gpu -> gpu fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const gpuFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(gpuFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      gpuFieldsAdditionalMapKeysInputErrorText,
      gpuFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areGpuFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areGpuFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      gpuFieldsAdditionalMapKeysInputErrorText,
      gpuFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> gpu -> gpu fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const gpuFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(gpuFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      gpuFieldsAdditionalMapValuesInputErrorText,
      gpuFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areGpuFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areGpuFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      gpuFieldsAdditionalMapValuesInputErrorText,
      gpuFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> gpu -> gpu fields user defined -> text area input element creator
  const createdGpuFieldsAdditionalMapTextInputElements = Array.from(
    gpuFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const gpuFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: gpuFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: gpuFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areGpuFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setGpuFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapFocused,
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

    const gpuFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: gpuFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: gpuFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areGpuFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setGpuFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapFocused,
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
      createdGpuFieldsAdditionalMapKeysTextAreaInput,
      createdGpuFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      gpuFieldsAdditionalMapKeysTextInputCreatorInfo,
      gpuFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setGpuFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
      <Stack key={`gpuFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Gpu field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdGpuFieldsAdditionalMapKeysTextAreaInput}
          {createdGpuFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

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

  // page 2 -> specifications -> motherboard -> motherboard memory max capacity -> screenreader accessible text input elements
  const [
    motherboardMemoryMaxCapacityInputErrorText,
    motherboardMemoryMaxCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'motherboard memory max capacity',
    inputText: motherboardMemoryMaxCapacity,
    isInputTextFocused: isMotherboardMemoryMaxCapacityFocused,
    isValidInputText: isMotherboardMemoryMaxCapacityValid,
    regexValidationText: returnMediumIntegerValidationText({
      content: motherboardMemoryMaxCapacity,
      contentKind: 'motherboard memory max capacity',
    }),
  });

  // page 2 -> specifications -> motherboard -> motherboard memory max capacity -> text input element creator
  const [createdMotherboardMemoryMaxCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: motherboardMemoryMaxCapacityInputErrorText,
          valid: motherboardMemoryMaxCapacityInputValidText,
        },
        inputText: motherboardMemoryMaxCapacity,
        isValidInputText: isMotherboardMemoryMaxCapacityValid,
        label: 'Motherboard Memory Max Capacity',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardMemoryMaxCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardMemoryMaxCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardMemoryMaxCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'motherboard memory max capacity',
      },
    ]);

  // page 2 -> specifications -> motherboard -> motherboard memory max capacity unit

  // page 2 -> specifications -> motherboard -> motherboard memory max capacity unit -> select input element
  const [createdMotherboardMemoryMaxCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
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

  // page 2 -> specifications -> motherboard -> motherboard memory slots ->screenreader accessible text input elements
  const [
    motherboardMemorySlotsInputErrorText,
    motherboardMemorySlotsInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'motherboard memory slots',
    inputText: motherboardMemorySlots,
    isInputTextFocused: isMotherboardMemorySlotsFocused,
    isValidInputText: isMotherboardMemorySlotsValid,
    regexValidationText: returnSmallIntegerValidationText({
      content: motherboardMemorySlots,
      contentKind: 'motherboard memory slots',
    }),
  });

  // page 2 -> specifications -> motherboard -> motherboard memory slots -> text input element creator
  const [createdMotherboardMemorySlotsTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: motherboardMemorySlotsInputErrorText,
          valid: motherboardMemorySlotsInputValidText,
        },
        inputText: motherboardMemorySlots,
        isValidInputText: isMotherboardMemorySlotsValid,
        label: 'Motherboard Memory Slots',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardMemorySlotsFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardMemorySlots,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardMemorySlotsFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 00',
        required: true,
        semanticName: 'motherboard memory slots',
      },
    ]);

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

  // page 2 -> specifications -> motherboard -> motherboard sata ports -> screenreader accessible text input elements
  const [
    motherboardSataPortsInputErrorText,
    motherboardSataPortsInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'motherboard sata ports',
    inputText: motherboardSataPorts,
    isInputTextFocused: isMotherboardSataPortsFocused,
    isValidInputText: isMotherboardSataPortsValid,
    regexValidationText: returnSmallIntegerValidationText({
      content: motherboardSataPorts,
      contentKind: 'motherboard sata ports',
    }),
  });

  // page 2 -> specifications -> motherboard -> motherboard sata ports -> text input element creator
  const [createdMotherboardSataPortsTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: motherboardSataPortsInputErrorText,
          valid: motherboardSataPortsInputValidText,
        },
        inputText: motherboardSataPorts,
        isValidInputText: isMotherboardSataPortsValid,
        label: 'Motherboard SATA Ports',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardSataPortsFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardSataPorts,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardSataPortsFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 00',
        required: true,
        semanticName: 'motherboard sata ports',
      },
    ]);

  // page 2 -> specifications -> motherboard -> motherboard m2 slots

  // page 2 -> specifications -> motherboard -> motherboard m2 slots -> screenreader accessible text input elements
  const [motherboardM2SlotsInputErrorText, motherboardM2SlotsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'motherboard m2 slots',
      inputText: motherboardM2Slots,
      isInputTextFocused: isMotherboardM2SlotsFocused,
      isValidInputText: isMotherboardM2SlotsValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: motherboardM2Slots,
        contentKind: 'motherboard m2 slots',
      }),
    });

  // page 2 -> specifications -> motherboard -> motherboard m2 slots -> text input element creator
  const [createdMotherboardM2SlotsTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: motherboardM2SlotsInputErrorText,
          valid: motherboardM2SlotsInputValidText,
        },
        inputText: motherboardM2Slots,
        isValidInputText: isMotherboardM2SlotsValid,
        label: 'Motherboard M.2 Slots',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardM2SlotsFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardM2Slots,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardM2SlotsFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 00',
        required: true,
        semanticName: 'motherboard m2 slots',
      },
    ]);

  // page 2 -> specifications -> motherboard -> motherboard pcie3 slots

  // page 2 -> specifications -> motherboard -> motherboard pcie3 slots -> screenreader accessible text input elements
  const [
    motherboardPcie3SlotsInputErrorText,
    motherboardPcie3SlotsInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'motherboard pcie3 slots',
    inputText: motherboardPcie3Slots,
    isInputTextFocused: isMotherboardPcie3SlotsFocused,
    isValidInputText: isMotherboardPcie3SlotsValid,
    regexValidationText: returnSmallIntegerValidationText({
      content: motherboardPcie3Slots,
      contentKind: 'motherboard pcie3 slots',
    }),
  });

  // page 2 -> specifications -> motherboard -> motherboard pcie3 slots -> text input element creator
  const [createdMotherboardPcie3SlotsTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: motherboardPcie3SlotsInputErrorText,
          valid: motherboardPcie3SlotsInputValidText,
        },
        inputText: motherboardPcie3Slots,
        isValidInputText: isMotherboardPcie3SlotsValid,
        label: 'Motherboard PCIe3 Slots',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardPcie3SlotsFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardPcie3Slots,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardPcie3SlotsFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 00',
        required: true,
        semanticName: 'motherboard pcie3 slots',
      },
    ]);

  // page 2 -> specifications -> motherboard -> motherboard pcie4 slots

  // page 2 -> specifications -> motherboard -> motherboard pcie4 slots -> screenreader accessible text input elements
  const [
    motherboardPcie4SlotsInputErrorText,
    motherboardPcie4SlotsInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'motherboard pcie4 slots',
    inputText: motherboardPcie4Slots,
    isInputTextFocused: isMotherboardPcie4SlotsFocused,
    isValidInputText: isMotherboardPcie4SlotsValid,
    regexValidationText: returnSmallIntegerValidationText({
      content: motherboardPcie4Slots,
      contentKind: 'motherboard pcie4 slots',
    }),
  });

  // page 2 -> specifications -> motherboard -> motherboard pcie4 slots -> text input element creator
  const [createdMotherboardPcie4SlotsTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: motherboardPcie4SlotsInputErrorText,
          valid: motherboardPcie4SlotsInputValidText,
        },
        inputText: motherboardPcie4Slots,
        isValidInputText: isMotherboardPcie4SlotsValid,
        label: 'Motherboard PCIe4 Slots',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardPcie4SlotsFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardPcie4Slots,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardPcie4SlotsFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 00',
        required: true,
        semanticName: 'motherboard pcie4 slots',
      },
    ]);

  // page 2 -> specifications -> motherboard -> motherboard pcie5 slots

  // page 2 -> specifications -> motherboard -> motherboard pcie5 slots -> screenreader accessible text input elements
  const [
    motherboardPcie5SlotsInputErrorText,
    motherboardPcie5SlotsInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'motherboard pcie5 slots',
    inputText: motherboardPcie5Slots,
    isInputTextFocused: isMotherboardPcie5SlotsFocused,
    isValidInputText: isMotherboardPcie5SlotsValid,
    regexValidationText: returnSmallIntegerValidationText({
      content: motherboardPcie5Slots,
      contentKind: 'motherboard pcie5 slots',
    }),
  });

  // page 2 -> specifications -> motherboard -> motherboard pcie5 slots -> text input element creator
  const [createdMotherboardPcie5SlotsTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: motherboardPcie5SlotsInputErrorText,
          valid: motherboardPcie5SlotsInputValidText,
        },
        inputText: motherboardPcie5Slots,
        isValidInputText: isMotherboardPcie5SlotsValid,
        label: 'Motherboard PCIe5 Slots',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardPcie5SlotsFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardPcie5Slots,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardPcie5SlotsFocused,
            payload: true,
          });
        },
        placeholder: '(Optional) Format: 00',
        required: false,
        semanticName: 'motherboard pcie5 slots',
      },
    ]);

  // page 2 -> specifications -> motherboard -> add new field button
  const [createdAddMotherboardFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> motherboard -> motherboard fields user defined

  // page 2 -> specifications -> motherboard -> motherboard fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> motherboard -> motherboard fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const motherboardFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(motherboardFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      motherboardFieldsAdditionalMapKeysInputErrorText,
      motherboardFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areMotherboardFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areMotherboardFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      motherboardFieldsAdditionalMapKeysInputErrorText,
      motherboardFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> motherboard -> motherboard fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const motherboardFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(motherboardFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      motherboardFieldsAdditionalMapValuesInputErrorText,
      motherboardFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areMotherboardFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areMotherboardFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      motherboardFieldsAdditionalMapValuesInputErrorText,
      motherboardFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> motherboard -> motherboard fields user defined -> text area input element creator
  const createdMotherboardFieldsAdditionalMapTextInputElements = Array.from(
    motherboardFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const motherboardFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            motherboardFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid:
            motherboardFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areMotherboardFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapFocused,
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

    const motherboardFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            motherboardFieldsAdditionalMapValuesErrorValidTextElements[
              mapKey
            ][0],
          valid:
            motherboardFieldsAdditionalMapValuesErrorValidTextElements[
              mapKey
            ][1],
        },
        inputText: value,
        isValidInputText:
          areMotherboardFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapFocused,
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
      createdMotherboardFieldsAdditionalMapKeysTextAreaInput,
      createdMotherboardFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      motherboardFieldsAdditionalMapKeysTextInputCreatorInfo,
      motherboardFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
        key={`motherboardFieldsAdditionalMap-${mapKey}`}
        pt={padding}
        w="100%"
      >
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Motherboard field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdMotherboardFieldsAdditionalMapKeysTextAreaInput}
          {createdMotherboardFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // page 2 -> specifications -> ram

  // page 2 -> specifications -> ram -> ram data rate

  // page 2 -> specifications -> ram -> ram data rate -> screenreader accessible text input elements
  const [ramDataRateInputErrorText, ramDataRateInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'ram data rate',
      inputText: ramDataRate,
      isInputTextFocused: isRamDataRateFocused,
      isValidInputText: isRamDataRateValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: ramDataRate,
        contentKind: 'ram data rate',
      }),
    });

  // page 2 -> specifications -> ram -> ram data rate -> text input element creator
  const [createdRamDataRateTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: ramDataRateInputErrorText,
        valid: ramDataRateInputValidText,
      },
      inputText: ramDataRate,
      isValidInputText: isRamDataRateValid,
      label: 'RAM Data Rate (MT/s)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsRamDataRateFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setRamDataRate,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsRamDataRateFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 0000',
      required: true,
      semanticName: 'ram data rate',
    },
  ]);

  // page 2 -> specifications -> ram -> ram modules quantity

  // page 2 -> specifications -> ram -> ram modules quantity -> screenreader accessible text input elements
  const [ramModulesQuantityInputErrorText, ramModulesQuantityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'ram modules quantity',
      inputText: ramModulesQuantity,
      isInputTextFocused: isRamModulesQuantityFocused,
      isValidInputText: isRamModulesQuantityValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: ramModulesQuantity,
        contentKind: 'ram modules quantity',
      }),
    });

  // page 2 -> specifications -> ram -> ram modules quantity -> text input element creator
  const [createdRamModulesQuantityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: ramModulesQuantityInputErrorText,
          valid: ramModulesQuantityInputValidText,
        },
        inputText: ramModulesQuantity,
        isValidInputText: isRamModulesQuantityValid,
        label: 'RAM Modules Quantity',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsRamModulesQuantityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setRamModulesQuantity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsRamModulesQuantityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 00',
        required: true,
        semanticName: 'ram modules quantity',
      },
    ]);

  // page 2 -> specifications -> ram -> ram modules capacity

  // page 2 -> specifications -> ram -> ram modules capacity -> screenreader accessible text input elements
  const [ramModulesCapacityInputErrorText, ramModulesCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'ram modules capacity',
      inputText: ramModulesCapacity,
      isInputTextFocused: isRamModulesCapacityFocused,
      isValidInputText: isRamModulesCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: ramModulesCapacity,
        contentKind: 'ram modules capacity',
      }),
    });

  // page 2 -> specifications -> ram -> ram modules capacity -> text input element creator
  const [createdRamModulesCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: ramModulesCapacityInputErrorText,
          valid: ramModulesCapacityInputValidText,
        },
        inputText: ramModulesCapacity,
        isValidInputText: isRamModulesCapacityValid,
        label: 'RAM Modules Capacity',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsRamModulesCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setRamModulesCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsRamModulesCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'ram modules capacity',
      },
    ]);

  // page 2 -> specifications -> ram -> ram modules capacity unit

  // page 2 -> specifications -> ram -> ram modules capacity unit -> select input element
  const [createdRamModulesCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
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

  // page 2 -> specifications -> ram -> ram voltage -> screenreader accessible text input elements
  const [ramVoltageInputErrorText, ramVoltageInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'ram voltage',
      inputText: ramVoltage,
      isInputTextFocused: isRamVoltageFocused,
      isValidInputText: isRamVoltageValid,
      regexValidationText: returnRamVoltageValidationText({
        content: ramVoltage,
        contentKind: 'ram voltage',
      }),
    });

  // page 2 -> specifications -> ram -> ram voltage -> text input element creator
  const [createdRamVoltageTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: ramVoltageInputErrorText,
        valid: ramVoltageInputValidText,
      },
      inputText: ramVoltage,
      isValidInputText: isRamVoltageValid,
      label: 'RAM Voltage (V)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsRamVoltageFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setRamVoltage,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsRamVoltageFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 0.00',
      required: true,
      semanticName: 'ram voltage',
    },
  ]);

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
      placeholder: 'Format: 00-00-00-00 or 0-0-0-0',
      required: true,
      semanticName: 'ram timing',
    },
  ]);

  // page 2 -> specifications -> ram -> add new field button
  const [createdAddRamFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setRamFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreRamFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreRamFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> ram -> ram fields user defined

  // page 2 -> specifications -> ram -> ram fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> ram -> ram fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const ramFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(ramFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      ramFieldsAdditionalMapKeysInputErrorText,
      ramFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areRamFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areRamFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      ramFieldsAdditionalMapKeysInputErrorText,
      ramFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> ram -> ram fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const ramFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(ramFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      ramFieldsAdditionalMapValuesInputErrorText,
      ramFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areRamFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areRamFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      ramFieldsAdditionalMapValuesInputErrorText,
      ramFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> ram -> ram fields user defined -> text area input element creator
  const createdRamFieldsAdditionalMapTextInputElements = Array.from(
    ramFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const ramFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: ramFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: ramFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areRamFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreRamFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setRamFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreRamFieldsAdditionalMapFocused,
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

    const ramFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: ramFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: ramFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areRamFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreRamFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setRamFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreRamFieldsAdditionalMapFocused,
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
      createdRamFieldsAdditionalMapKeysTextAreaInput,
      createdRamFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      ramFieldsAdditionalMapKeysTextInputCreatorInfo,
      ramFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setRamFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreRamFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreRamFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
      <Stack key={`ramFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Ram field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdRamFieldsAdditionalMapKeysTextAreaInput}
          {createdRamFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

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

  // page 2 -> specifications -> storage -> storage capacity -> screenreader accessible text input elements
  const [storageCapacityInputErrorText, storageCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'storage capacity',
      inputText: storageCapacity,
      isInputTextFocused: isStorageCapacityFocused,
      isValidInputText: isStorageCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: storageCapacity,
        contentKind: 'storage capacity',
      }),
    });

  // page 2 -> specifications -> storage -> storage capacity -> text input element creator
  const [createdStorageCapacityTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: storageCapacityInputErrorText,
        valid: storageCapacityInputValidText,
      },
      inputText: storageCapacity,
      isValidInputText: isStorageCapacityValid,
      label: 'Storage Capacity',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsStorageCapacityFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setStorageCapacity,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsStorageCapacityFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 0000',
      required: true,
      semanticName: 'storage capacity',
    },
  ]);

  // page 2 -> specifications -> storage -> storage capacity unit

  // page 2 -> specifications -> storage -> storage capacity unit -> select input element
  const [createdStorageCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
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

  // page 2 -> specifications -> storage -> storage cache capacity -> screenreader accessible text input elements
  const [
    storageCacheCapacityInputErrorText,
    storageCacheCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'storage cache capacity',
    inputText: storageCacheCapacity,
    isInputTextFocused: isStorageCacheCapacityFocused,
    isValidInputText: isStorageCacheCapacityValid,
    regexValidationText: returnMediumIntegerValidationText({
      content: storageCacheCapacity,
      contentKind: 'storage cache capacity',
    }),
  });

  // page 2 -> specifications -> storage -> storage cache capacity -> text input element creator
  const [createdStorageCacheCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: storageCacheCapacityInputErrorText,
          valid: storageCacheCapacityInputValidText,
        },
        inputText: storageCacheCapacity,
        isValidInputText: isStorageCacheCapacityValid,
        label: 'Storage Cache Capacity',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsStorageCacheCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setStorageCacheCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsStorageCacheCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'storage cache capacity',
      },
    ]);

  // page 2 -> specifications -> storage -> storage cache capacity unit

  // page 2 -> specifications -> storage -> storage cache capacity unit -> select input element
  const [createdStorageCacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
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

  // page 2 -> specifications -> storage -> add new field button
  const [createdAddStorageFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setStorageFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreStorageFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreStorageFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> storage -> storage fields user defined

  // page 2 -> specifications -> storage -> storage fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> storage -> storage fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const storageFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(storageFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      storageFieldsAdditionalMapKeysInputErrorText,
      storageFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areStorageFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areStorageFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      storageFieldsAdditionalMapKeysInputErrorText,
      storageFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> storage -> storage fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const storageFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(storageFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      storageFieldsAdditionalMapValuesInputErrorText,
      storageFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areStorageFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areStorageFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      storageFieldsAdditionalMapValuesInputErrorText,
      storageFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> storage -> storage fields user defined -> text area input element creator
  const createdStorageFieldsAdditionalMapTextInputElements = Array.from(
    storageFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const storageFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            storageFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid:
            storageFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areStorageFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreStorageFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setStorageFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreStorageFieldsAdditionalMapFocused,
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

    const storageFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            storageFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            storageFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areStorageFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreStorageFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setStorageFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreStorageFieldsAdditionalMapFocused,
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
      createdStorageFieldsAdditionalMapKeysTextAreaInput,
      createdStorageFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      storageFieldsAdditionalMapKeysTextInputCreatorInfo,
      storageFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setStorageFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreStorageFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreStorageFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
      <Stack key={`storageFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Storage field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdStorageFieldsAdditionalMapKeysTextAreaInput}
          {createdStorageFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // page 2 -> specifications -> psu

  // page 2 -> specifications -> psu -> psu wattage

  // page 2 -> specifications -> psu -> psu wattage -> screenreader accessible text input elements
  const [psuWattageInputErrorText, psuWattageInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'psu wattage',
      inputText: psuWattage,
      isInputTextFocused: isPsuWattageFocused,
      isValidInputText: isPsuWattageValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: psuWattage,
        contentKind: 'psu wattage',
      }),
    });

  // page 2 -> specifications -> psu -> psu wattage -> text input element creator
  const [createdPsuWattageTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: psuWattageInputErrorText,
        valid: psuWattageInputValidText,
      },
      inputText: psuWattage,
      isValidInputText: isPsuWattageValid,
      label: 'PSU Wattage',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsPsuWattageFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setPsuWattage,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsPsuWattageFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 0000',
      required: true,
      semanticName: 'psu wattage',
    },
  ]);

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

  // page 2 -> specifications -> psu -> add new field button
  const [createdAddPsuFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> psu -> psu fields user defined

  // page 2 -> specifications -> psu -> psu fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> psu -> psu fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const psuFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(psuFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      psuFieldsAdditionalMapKeysInputErrorText,
      psuFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        arePsuFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        arePsuFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      psuFieldsAdditionalMapKeysInputErrorText,
      psuFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> psu -> psu fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const psuFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(psuFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      psuFieldsAdditionalMapValuesInputErrorText,
      psuFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        arePsuFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        arePsuFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      psuFieldsAdditionalMapValuesInputErrorText,
      psuFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> psu -> psu fields user defined -> text area input element creator
  const createdPsuFieldsAdditionalMapTextInputElements = Array.from(
    psuFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const psuFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: psuFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: psuFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          arePsuFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapFocused,
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

    const psuFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: psuFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: psuFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          arePsuFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapFocused,
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
      createdPsuFieldsAdditionalMapKeysTextAreaInput,
      createdPsuFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      psuFieldsAdditionalMapKeysTextInputCreatorInfo,
      psuFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setPsuFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setArePsuFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
      <Stack key={`psuFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Psu field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdPsuFieldsAdditionalMapKeysTextAreaInput}
          {createdPsuFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

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

  // page 2 -> specifications -> case -> add new field button
  const [createdAddCaseFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setCaseFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> case -> case fields user defined

  // page 2 -> specifications -> case -> case fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> case -> case fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const caseFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(caseFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      caseFieldsAdditionalMapKeysInputErrorText,
      caseFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areCaseFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areCaseFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      caseFieldsAdditionalMapKeysInputErrorText,
      caseFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> case -> case fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const caseFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(caseFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      caseFieldsAdditionalMapValuesInputErrorText,
      caseFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areCaseFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areCaseFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      caseFieldsAdditionalMapValuesInputErrorText,
      caseFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> case -> case fields user defined -> text area input element creator
  const createdCaseFieldsAdditionalMapTextInputElements = Array.from(
    caseFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const caseFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: caseFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: caseFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areCaseFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setCaseFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapFocused,
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

    const caseFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: caseFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: caseFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areCaseFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setCaseFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapFocused,
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
      createdCaseFieldsAdditionalMapKeysTextAreaInput,
      createdCaseFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      caseFieldsAdditionalMapKeysTextInputCreatorInfo,
      caseFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setCaseFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCaseFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
      <Stack key={`caseFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Case field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdCaseFieldsAdditionalMapKeysTextAreaInput}
          {createdCaseFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // page 2 -> specifications -> display

  // page 2 -> specifications -> display -> display size

  // page 2 -> specifications -> display -> display size -> screenreader accessible text input elements
  const [displaySizeInputErrorText, displaySizeInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'display size',
      inputText: displaySize,
      isInputTextFocused: isDisplaySizeFocused,
      isValidInputText: isDisplaySizeValid,
      regexValidationText: returnDimensionsValidationText({
        content: displaySize,
        contentKind: 'display size',
      }),
    });

  // page 2 -> specifications -> display -> display size -> text input element creator
  const [createdDisplaySizeTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: displaySizeInputErrorText,
        valid: displaySizeInputValidText,
      },
      inputText: displaySize,
      isValidInputText: isDisplaySizeValid,
      label: 'Display Size (inches)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsDisplaySizeFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setDisplaySize,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsDisplaySizeFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 000.00',
      required: true,
      semanticName: 'display size',
    },
  ]);

  // page 2 -> specifications -> display -> display resolution

  // page 2 -> specifications -> display -> display resolution -> horizontal

  // page 2 -> specifications -> display -> display resolution -> horizontal -> screenreader accessible text input elements
  const [
    displayResolutionHorizontalInputErrorText,
    displayResolutionHorizontalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'display resolution horizontal',
    inputText: displayResolutionHorizontal,
    isInputTextFocused: isDisplayResolutionHorizontalFocused,
    isValidInputText: isDisplayResolutionHorizontalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: displayResolutionHorizontal,
      contentKind: 'display resolution horizontal',
    }),
  });

  // page 2 -> specifications -> display -> display resolution -> horizontal -> text input element creator
  const [createdDisplayResolutionHorizontalTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: displayResolutionHorizontalInputErrorText,
          valid: displayResolutionHorizontalInputValidText,
        },
        inputText: displayResolutionHorizontal,
        isValidInputText: isDisplayResolutionHorizontalValid,
        label: 'Display Resolution Horizontal (pixels)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsDisplayResolutionHorizontalFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setDisplayResolutionHorizontal,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsDisplayResolutionHorizontalFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'display resolution horizontal',
      },
    ]);

  // page 2 -> specifications -> display -> display resolution -> vertical

  // page 2 -> specifications -> display -> display resolution -> vertical -> screenreader accessible text input elements
  const [
    displayResolutionVerticalInputErrorText,
    displayResolutionVerticalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'display resolution vertical',
    inputText: displayResolutionVertical,
    isInputTextFocused: isDisplayResolutionVerticalFocused,
    isValidInputText: isDisplayResolutionVerticalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: displayResolutionVertical,
      contentKind: 'display resolution vertical',
    }),
  });

  // page 2 -> specifications -> display -> display resolution -> vertical -> text input element creator
  const [createdDisplayResolutionVerticalTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: displayResolutionVerticalInputErrorText,
          valid: displayResolutionVerticalInputValidText,
        },
        inputText: displayResolutionVertical,
        isValidInputText: isDisplayResolutionVerticalValid,
        label: 'Display Resolution Vertical (pixels)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsDisplayResolutionVerticalFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setDisplayResolutionVertical,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsDisplayResolutionVerticalFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'display resolution vertical',
      },
    ]);

  // page 2 -> specifications -> display -> display refresh rate

  // page 2 -> specifications -> display -> display refresh rate -> screenreader accessible text input elements
  const [displayRefreshRateInputErrorText, displayRefreshRateInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'display refresh rate',
      inputText: displayRefreshRate,
      isInputTextFocused: isDisplayRefreshRateFocused,
      isValidInputText: isDisplayRefreshRateValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: displayRefreshRate,
        contentKind: 'display refresh rate',
      }),
    });

  // page 2 -> specifications -> display -> display refresh rate -> text input element creator
  const [createdDisplayRefreshRateTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: displayRefreshRateInputErrorText,
          valid: displayRefreshRateInputValidText,
        },
        inputText: displayRefreshRate,
        isValidInputText: isDisplayRefreshRateValid,
        label: 'Display Refresh Rate (Hz)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsDisplayRefreshRateFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setDisplayRefreshRate,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsDisplayRefreshRateFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'display refresh rate',
      },
    ]);

  // page 2 -> specifications -> display -> display panel type

  // page 2 -> specifications -> display -> display panel type -> select input element
  const [createdDisplayPanelTypeSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: DISPLAY_PANEL_TYPE_DATA,
        description: '',
        label: 'Display Panel Type',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setDisplayPanelType,
            payload: event.currentTarget.value as DisplayPanelType,
          });
        },
        value: displayPanelType,
        required: true,
      },
    ]);

  // page 2 -> specifications -> display -> display response time

  // page 2 -> specifications -> display -> display response time -> screenreader accessible text input elements
  const [displayResponseTimeInputErrorText, displayResponseTimeInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'display response time',
      inputText: displayResponseTime,
      isInputTextFocused: isDisplayResponseTimeFocused,
      isValidInputText: isDisplayResponseTimeValid,
      regexValidationText: returnDimensionsValidationText({
        content: displayResponseTime,
        contentKind: 'display response time',
      }),
    });

  // page 2 -> specifications -> display -> display response time -> text input element creator
  const [createdDisplayResponseTimeTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: displayResponseTimeInputErrorText,
          valid: displayResponseTimeInputValidText,
        },
        inputText: displayResponseTime,
        isValidInputText: isDisplayResponseTimeValid,
        label: 'Display Response Time (ms)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsDisplayResponseTimeFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setDisplayResponseTime,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsDisplayResponseTimeFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 000.00',
        required: true,
        semanticName: 'display response time',
      },
    ]);

  // page 2 -> specifications -> display -> display aspect ratio

  // page 2 -> specifications -> display -> display aspect ratio -> accessible screen reader text elements
  const [displayAspectRatioInputErrorText, displayAspectRatioInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'display aspect ratio',
      inputText: displayAspectRatio,
      isInputTextFocused: isDisplayAspectRatioFocused,
      isValidInputText: isDisplayAspectRatioValid,
      regexValidationText: returnDisplayAspectRatioValidationText({
        content: displayAspectRatio,
        contentKind: 'display aspect ratio',
        maxLength: 5,
        minLength: 3,
      }),
    });

  // page 2 -> specifications -> display -> display aspect ratio -> text input element creator
  const [createdDisplayAspectRatioTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: displayAspectRatioInputErrorText,
          valid: displayAspectRatioInputValidText,
        },
        inputText: displayAspectRatio,
        isValidInputText: isDisplayAspectRatioValid,
        label: 'Display Aspect Ratio',
        maxLength: 5,
        minLength: 3,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsDisplayAspectRatioFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setDisplayAspectRatio,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsDisplayAspectRatioFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 00:00',
        required: true,
        semanticName: 'display aspect ratio',
      },
    ]);

  // page 2 -> specifications -> display -> add new field button
  const [createdAddDisplayFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setDisplayFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreDisplayFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreDisplayFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> display -> display fields user defined

  // page 2 -> specifications -> display -> display fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> display -> display fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const displayFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(displayFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      displayFieldsAdditionalMapKeysInputErrorText,
      displayFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areDisplayFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areDisplayFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      displayFieldsAdditionalMapKeysInputErrorText,
      displayFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> display -> display fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const displayFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(displayFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      displayFieldsAdditionalMapValuesInputErrorText,
      displayFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areDisplayFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areDisplayFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      displayFieldsAdditionalMapValuesInputErrorText,
      displayFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> display -> display fields user defined -> text area input element creator
  const createdDisplayFieldsAdditionalMapTextInputElements = Array.from(
    displayFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const displayFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            displayFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid:
            displayFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areDisplayFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreDisplayFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setDisplayFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreDisplayFieldsAdditionalMapFocused,
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

    const displayFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            displayFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            displayFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areDisplayFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreDisplayFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setDisplayFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreDisplayFieldsAdditionalMapFocused,
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
      createdDisplayFieldsAdditionalMapKeysTextAreaInput,
      createdDisplayFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      displayFieldsAdditionalMapKeysTextInputCreatorInfo,
      displayFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setDisplayFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreDisplayFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreDisplayFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
      <Stack key={`displayFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Display field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdDisplayFieldsAdditionalMapKeysTextAreaInput}
          {createdDisplayFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

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

  // page 2 -> specifications -> keyboard -> add new field button
  const [createdAddKeyboardFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> keyboard -> keyboard fields user defined

  // page 2 -> specifications -> keyboard -> keyboard fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> keyboard -> keyboard fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const keyboardFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(keyboardFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      keyboardFieldsAdditionalMapKeysInputErrorText,
      keyboardFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areKeyboardFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areKeyboardFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      keyboardFieldsAdditionalMapKeysInputErrorText,
      keyboardFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> keyboard -> keyboard fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const keyboardFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(keyboardFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      keyboardFieldsAdditionalMapValuesInputErrorText,
      keyboardFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areKeyboardFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areKeyboardFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      keyboardFieldsAdditionalMapValuesInputErrorText,
      keyboardFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> keyboard -> keyboard fields user defined -> text area input element creator
  const createdKeyboardFieldsAdditionalMapTextInputElements = Array.from(
    keyboardFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const keyboardFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            keyboardFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid:
            keyboardFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areKeyboardFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapFocused,
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

    const keyboardFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            keyboardFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            keyboardFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areKeyboardFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapFocused,
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
      createdKeyboardFieldsAdditionalMapKeysTextAreaInput,
      createdKeyboardFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      keyboardFieldsAdditionalMapKeysTextInputCreatorInfo,
      keyboardFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
        key={`keyboardFieldsAdditionalMap-${mapKey}`}
        pt={padding}
        w="100%"
      >
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Keyboard field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdKeyboardFieldsAdditionalMapKeysTextAreaInput}
          {createdKeyboardFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

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

  // page 2 -> specifications -> mouse -> mouse dpi -> screenreader accessible text input elements
  const [mouseDpiInputErrorText, mouseDpiInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'mouse dpi',
      inputText: mouseDpi,
      isInputTextFocused: isMouseDpiFocused,
      isValidInputText: isMouseDpiValid,
      regexValidationText: returnLargeIntegerValidationText({
        content: mouseDpi,
        contentKind: 'mouse dpi',
      }),
    });

  // page 2 -> specifications -> mouse -> mouse dpi -> text input element creator
  const [createdMouseDpiTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: mouseDpiInputErrorText,
        valid: mouseDpiInputValidText,
      },
      inputText: mouseDpi,
      isValidInputText: isMouseDpiValid,
      label: 'Mouse DPI (dots per inch)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMouseDpiFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMouseDpi,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMouseDpiFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 000000',
      required: true,
      semanticName: 'mouse dpi',
    },
  ]);

  // page 2 -> specifications -> mouse -> mouse buttons quantity

  // page 2 -> specifications -> mouse -> mouse buttons quantity -> screenreader accessible text input elements
  const [mouseButtonsInputErrorText, mouseButtonsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'mouse buttons quantity',
      inputText: mouseButtons,
      isInputTextFocused: isMouseButtonsFocused,
      isValidInputText: isMouseButtonsValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: mouseButtons,
        contentKind: 'mouse buttons quantity',
      }),
    });

  // page 2 -> specifications -> mouse -> mouse buttons quantity -> text input element creator
  const [createdMouseButtonsTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: mouseButtonsInputErrorText,
        valid: mouseButtonsInputValidText,
      },
      inputText: mouseButtons,
      isValidInputText: isMouseButtonsValid,
      label: 'Mouse Buttons Quantity',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMouseButtonsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMouseButtons,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMouseButtonsFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 00',
      required: true,
      semanticName: 'mouse buttons quantity',
    },
  ]);

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

  // page 2 -> specifications -> mouse -> add new field button
  const [createdAddMouseFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setMouseFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> mouse -> mouse fields user defined

  // page 2 -> specifications -> mouse -> mouse fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> mouse -> mouse fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const mouseFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(mouseFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      mouseFieldsAdditionalMapKeysInputErrorText,
      mouseFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areMouseFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areMouseFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      mouseFieldsAdditionalMapKeysInputErrorText,
      mouseFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> mouse -> mouse fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const mouseFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(mouseFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      mouseFieldsAdditionalMapValuesInputErrorText,
      mouseFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areMouseFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areMouseFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      mouseFieldsAdditionalMapValuesInputErrorText,
      mouseFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> mouse -> mouse fields user defined -> text area input element creator
  const createdMouseFieldsAdditionalMapTextInputElements = Array.from(
    mouseFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const mouseFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: mouseFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: mouseFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areMouseFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setMouseFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapFocused,
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

    const mouseFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            mouseFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            mouseFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areMouseFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setMouseFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapFocused,
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
      createdMouseFieldsAdditionalMapKeysTextAreaInput,
      createdMouseFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      mouseFieldsAdditionalMapKeysTextInputCreatorInfo,
      mouseFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setMouseFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
      <Stack key={`mouseFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Mouse field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdMouseFieldsAdditionalMapKeysTextAreaInput}
          {createdMouseFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

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

  // page 2 -> specifications -> headphone -> headphone driver -> screenreader accessible text input elements
  const [headphoneDriverInputErrorText, headphoneDriverInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'headphone driver',
      inputText: headphoneDriver,
      isInputTextFocused: isHeadphoneDriverFocused,
      isValidInputText: isHeadphoneDriverValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: headphoneDriver,
        contentKind: 'headphone driver',
      }),
    });

  // page 2 -> specifications -> headphone -> headphone driver -> text input element creator
  const [createdHeadphoneDriverTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: headphoneDriverInputErrorText,
        valid: headphoneDriverInputValidText,
      },
      inputText: headphoneDriver,
      isValidInputText: isHeadphoneDriverValid,
      label: 'Headphone Driver (mm)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsHeadphoneDriverFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setHeadphoneDriver,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsHeadphoneDriverFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 00',
      required: true,
      semanticName: 'headphone driver',
    },
  ]);

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
        label: 'Headphone Frequency Response (Hz - kHz)',
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
        placeholder: 'Format: 00 Hz - 00 kHz or 0Hz-0kHz',
        required: true,
        semanticName: 'headphone frequency response',
      },
    ]);

  // page 2 -> specifications -> headphone -> headphone impedance

  // page 2 -> specifications -> headphone -> headphone impedance -> screenreader accessible text input elements
  const [headphoneImpedanceInputErrorText, headphoneImpedanceInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'headphone impedance',
      inputText: headphoneImpedance,
      isInputTextFocused: isHeadphoneImpedanceFocused,
      isValidInputText: isHeadphoneImpedanceValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: headphoneImpedance,
        contentKind: 'headphone impedance',
      }),
    });

  // page 2 -> specifications -> headphone -> headphone impedance -> text input element creator
  const [createdHeadphoneImpedanceTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: headphoneImpedanceInputErrorText,
          valid: headphoneImpedanceInputValidText,
        },
        inputText: headphoneImpedance,
        isValidInputText: isHeadphoneImpedanceValid,
        label: 'Headphone Impedance (Ω)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsHeadphoneImpedanceFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneImpedance,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsHeadphoneImpedanceFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'headphone impedance',
      },
    ]);

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

  // page 2 -> specifications -> headphone -> add new field button
  const [createdAddHeadphoneFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> headphone -> headphone fields user defined

  // page 2 -> specifications -> headphone -> headphone fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> headphone -> headphone fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const headphoneFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(headphoneFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      headphoneFieldsAdditionalMapKeysInputErrorText,
      headphoneFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areHeadphoneFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areHeadphoneFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      headphoneFieldsAdditionalMapKeysInputErrorText,
      headphoneFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> headphone -> headphone fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const headphoneFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(headphoneFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      headphoneFieldsAdditionalMapValuesInputErrorText,
      headphoneFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areHeadphoneFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areHeadphoneFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      headphoneFieldsAdditionalMapValuesInputErrorText,
      headphoneFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> headphone -> headphone fields user defined -> text area input element creator
  const createdHeadphoneFieldsAdditionalMapTextInputElements = Array.from(
    headphoneFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const headphoneFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            headphoneFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid:
            headphoneFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areHeadphoneFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapFocused,
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

    const headphoneFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            headphoneFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            headphoneFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areHeadphoneFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapFocused,
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
      createdHeadphoneFieldsAdditionalMapKeysTextAreaInput,
      createdHeadphoneFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      headphoneFieldsAdditionalMapKeysTextInputCreatorInfo,
      headphoneFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
        key={`headphoneFieldsAdditionalMap-${mapKey}`}
        pt={padding}
        w="100%"
      >
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Headphone field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdHeadphoneFieldsAdditionalMapKeysTextAreaInput}
          {createdHeadphoneFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

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

  // page 2 -> specifications -> speaker -> speaker total wattage -> screenreader accessible text input elements
  const [speakerTotalWattageInputErrorText, speakerTotalWattageInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'speaker total wattage',
      inputText: speakerTotalWattage,
      isInputTextFocused: isSpeakerTotalWattageFocused,
      isValidInputText: isSpeakerTotalWattageValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: speakerTotalWattage,
        contentKind: 'speaker total wattage',
      }),
    });

  // page 2 -> specifications -> speaker -> speaker total wattage -> text input element creator
  const [createdSpeakerTotalWattageTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: speakerTotalWattageInputErrorText,
          valid: speakerTotalWattageInputValidText,
        },
        inputText: speakerTotalWattage,
        isValidInputText: isSpeakerTotalWattageValid,
        label: 'Speaker Total Wattage (W)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsSpeakerTotalWattageFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setSpeakerTotalWattage,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsSpeakerTotalWattageFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'speaker total wattage',
      },
    ]);

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

  // page 2 -> specifications -> speaker -> add new field button
  const [createdAddSpeakerFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setSpeakerFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> speaker -> speaker fields user defined

  // page 2 -> specifications -> speaker -> speaker fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> speaker -> speaker fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const speakerFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(speakerFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      speakerFieldsAdditionalMapKeysInputErrorText,
      speakerFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areSpeakerFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areSpeakerFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      speakerFieldsAdditionalMapKeysInputErrorText,
      speakerFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> speaker -> speaker fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const speakerFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(speakerFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      speakerFieldsAdditionalMapValuesInputErrorText,
      speakerFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areSpeakerFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areSpeakerFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      speakerFieldsAdditionalMapValuesInputErrorText,
      speakerFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> speaker -> speaker fields user defined -> text area input element creator
  const createdSpeakerFieldsAdditionalMapTextInputElements = Array.from(
    speakerFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const speakerFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            speakerFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid:
            speakerFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areSpeakerFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setSpeakerFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapFocused,
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

    const speakerFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            speakerFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            speakerFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areSpeakerFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setSpeakerFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapFocused,
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
      createdSpeakerFieldsAdditionalMapKeysTextAreaInput,
      createdSpeakerFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      speakerFieldsAdditionalMapKeysTextInputCreatorInfo,
      speakerFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setSpeakerFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
      <Stack key={`speakerFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Speaker field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdSpeakerFieldsAdditionalMapKeysTextAreaInput}
          {createdSpeakerFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

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

  // page 2 -> specifications -> smartphone -> smartphone display -> screenreader accessible text input elements
  const [smartphoneDisplayInputErrorText, smartphoneDisplayInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'smartphone display',
      inputText: smartphoneDisplay,
      isInputTextFocused: isSmartphoneDisplayFocused,
      isValidInputText: isSmartphoneDisplayValid,
      regexValidationText: returnDimensionsValidationText({
        content: smartphoneDisplay,
        contentKind: 'smartphone display',
      }),
    });

  // page 2 -> specifications -> smartphone -> smartphone display -> text input element creator
  const [createdSmartphoneDisplayTextInput] = returnAccessibleTextInputElements(
    [
      {
        description: {
          error: smartphoneDisplayInputErrorText,
          valid: smartphoneDisplayInputValidText,
        },
        inputText: smartphoneDisplay,
        isValidInputText: isSmartphoneDisplayValid,
        label: 'Smartphone Display (inches)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneDisplayFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneDisplay,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneDisplayFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 000.00',
        required: true,
        semanticName: 'smartphone display',
      },
    ]
  );

  // page 2 -> specifications -> smartphone -> smartphone resolution

  // page 2 -> specifications -> smartphone -> smartphone resolution -> horizontal

  // page 2 -> specifications -> smartphone -> smartphone resolution -> horizontal -> screenreader accessible text input elements
  const [
    smartphoneResolutionHorizontalInputErrorText,
    smartphoneResolutionHorizontalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'smartphone resolution horizontal',
    inputText: smartphoneResolutionHorizontal,
    isInputTextFocused: isSmartphoneResolutionHorizontalFocused,
    isValidInputText: isSmartphoneResolutionHorizontalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: smartphoneResolutionHorizontal,
      contentKind: 'smartphone resolution horizontal',
    }),
  });

  // page 2 -> specifications -> smartphone -> smartphone resolution -> horizontal -> text input element creator
  const [createdSmartphoneResolutionHorizontalTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: smartphoneResolutionHorizontalInputErrorText,
          valid: smartphoneResolutionHorizontalInputValidText,
        },
        inputText: smartphoneResolutionHorizontal,
        isValidInputText: isSmartphoneResolutionHorizontalValid,
        label: 'Smartphone Resolution Horizontal (pixels)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneResolutionHorizontalFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneResolutionHorizontal,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneResolutionHorizontalFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'smartphone resolution horizontal',
      },
    ]);

  // page 2 -> specifications -> smartphone -> smartphone resolution -> vertical

  // page 2 -> specifications -> smartphone -> smartphone resolution -> vertical -> screenreader accessible text input elements
  const [
    smartphoneResolutionVerticalInputErrorText,
    smartphoneResolutionVerticalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'smartphone resolution vertical',
    inputText: smartphoneResolutionVertical,
    isInputTextFocused: isSmartphoneResolutionVerticalFocused,
    isValidInputText: isSmartphoneResolutionVerticalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: smartphoneResolutionVertical,
      contentKind: 'smartphone resolution vertical',
    }),
  });

  // page 2 -> specifications -> smartphone -> smartphone resolution -> vertical -> text input element creator
  const [createdSmartphoneResolutionVerticalTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: smartphoneResolutionVerticalInputErrorText,
          valid: smartphoneResolutionVerticalInputValidText,
        },
        inputText: smartphoneResolutionVertical,
        isValidInputText: isSmartphoneResolutionVerticalValid,
        label: 'Smartphone Resolution Vertical (pixels)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneResolutionVerticalFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneResolutionVertical,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneResolutionVerticalFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'smartphone resolution vertical',
      },
    ]);

  // page 2 -> specifications -> smartphone -> smartphone ram capacity

  // page 2 -> specifications -> smartphone -> smartphone ram capacity -> screenreader accessible text input elements
  const [
    smartphoneRamCapacityInputErrorText,
    smartphoneRamCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'smartphone ram capacity',
    inputText: smartphoneRamCapacity,
    isInputTextFocused: isSmartphoneRamCapacityFocused,
    isValidInputText: isSmartphoneRamCapacityValid,
    regexValidationText: returnMediumIntegerValidationText({
      content: smartphoneRamCapacity,
      contentKind: 'smartphone ram capacity',
    }),
  });

  // page 2 -> specifications -> smartphone -> smartphone ram capacity -> text input element creator
  const [createdSmartphoneRamCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: smartphoneRamCapacityInputErrorText,
          valid: smartphoneRamCapacityInputValidText,
        },
        inputText: smartphoneRamCapacity,
        isValidInputText: isSmartphoneRamCapacityValid,
        label: 'Smartphone RAM Capacity (GB)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneRamCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneRamCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneRamCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'smartphone ram capacity',
      },
    ]);

  // page 2 -> specifications -> smartphone -> smartphone ram capacity unit

  // page 2 -> specifications -> smartphone -> smartphone ram capacity unit -> select input element
  const [createdSmartphoneRamCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
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

  // page 2 -> specifications -> smartphone -> smartphone storage capacity -> screenreader accessible text input elements
  const [
    smartphoneStorageCapacityInputErrorText,
    smartphoneStorageCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'smartphone storage capacity',
    inputText: smartphoneStorageCapacity,
    isInputTextFocused: isSmartphoneStorageCapacityFocused,
    isValidInputText: isSmartphoneStorageCapacityValid,
    regexValidationText: returnMediumIntegerValidationText({
      content: smartphoneStorageCapacity,
      contentKind: 'smartphone storage capacity',
    }),
  });

  // page 2 -> specifications -> smartphone -> smartphone storage capacity -> text input element creator
  const [createdSmartphoneStorageCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: smartphoneStorageCapacityInputErrorText,
          valid: smartphoneStorageCapacityInputValidText,
        },
        inputText: smartphoneStorageCapacity,
        isValidInputText: isSmartphoneStorageCapacityValid,
        label: 'Smartphone Storage Capacity (GB)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneStorageCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneStorageCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneStorageCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'smartphone storage capacity',
      },
    ]);

  // page 2 -> specifications -> smartphone -> smartphone battery capacity

  // page 2 -> specifications -> smartphone -> smartphone battery capacity -> screenreader accessible text input elements
  const [
    smartphoneBatteryCapacityInputErrorText,
    smartphoneBatteryCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'smartphone battery capacity',
    inputText: smartphoneBatteryCapacity,
    isInputTextFocused: isSmartphoneBatteryCapacityFocused,
    isValidInputText: isSmartphoneBatteryCapacityValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: smartphoneBatteryCapacity,
      contentKind: 'smartphone battery capacity',
    }),
  });

  // page 2 -> specifications -> smartphone -> smartphone battery capacity -> text input element creator
  const [createdSmartphoneBatteryCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: smartphoneBatteryCapacityInputErrorText,
          valid: smartphoneBatteryCapacityInputValidText,
        },
        inputText: smartphoneBatteryCapacity,
        isValidInputText: isSmartphoneBatteryCapacityValid,
        label: 'Smartphone Battery Capacity (mAh)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneBatteryCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneBatteryCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneBatteryCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'smartphone battery capacity',
      },
    ]);

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
        maxLength: 84,
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
      maxLength: 84,
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

  // page 2 -> specifications -> smartphone -> add new field button
  const [createdAddSmartphoneFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> smartphone -> smartphone fields user defined

  // page 2 -> specifications -> smartphone -> smartphone fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> smartphone -> smartphone fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const smartphoneFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(smartphoneFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      smartphoneFieldsAdditionalMapKeysInputErrorText,
      smartphoneFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areSmartphoneFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areSmartphoneFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      smartphoneFieldsAdditionalMapKeysInputErrorText,
      smartphoneFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> smartphone -> smartphone fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const smartphoneFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(smartphoneFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      smartphoneFieldsAdditionalMapValuesInputErrorText,
      smartphoneFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areSmartphoneFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areSmartphoneFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      smartphoneFieldsAdditionalMapValuesInputErrorText,
      smartphoneFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> smartphone -> smartphone fields user defined -> text area input element creator
  const createdSmartphoneFieldsAdditionalMapTextInputElements = Array.from(
    smartphoneFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const smartphoneFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            smartphoneFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid:
            smartphoneFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areSmartphoneFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapFocused,
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

    const smartphoneFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            smartphoneFieldsAdditionalMapValuesErrorValidTextElements[
              mapKey
            ][0],
          valid:
            smartphoneFieldsAdditionalMapValuesErrorValidTextElements[
              mapKey
            ][1],
        },
        inputText: value,
        isValidInputText:
          areSmartphoneFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapFocused,
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
      createdSmartphoneFieldsAdditionalMapKeysTextAreaInput,
      createdSmartphoneFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      smartphoneFieldsAdditionalMapKeysTextInputCreatorInfo,
      smartphoneFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
        key={`smartphoneFieldsAdditionalMap-${mapKey}`}
        pt={padding}
        w="100%"
      >
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Smartphone field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdSmartphoneFieldsAdditionalMapKeysTextAreaInput}
          {createdSmartphoneFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

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

  // page 2 -> specifications -> tablet -> tablet display -> screenreader accessible text input elements
  const [tabletDisplayInputErrorText, tabletDisplayInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'tablet display',
      inputText: tabletDisplay,
      isInputTextFocused: isTabletDisplayFocused,
      isValidInputText: isTabletDisplayValid,
      regexValidationText: returnDimensionsValidationText({
        content: tabletDisplay,
        contentKind: 'tablet display',
      }),
    });

  // page 2 -> specifications -> tablet -> tablet display -> text input element creator
  const [createdTabletDisplayTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: tabletDisplayInputErrorText,
        valid: tabletDisplayInputValidText,
      },
      inputText: tabletDisplay,
      isValidInputText: isTabletDisplayValid,
      label: 'Tablet Display (inches)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletDisplayFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setTabletDisplay,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletDisplayFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 000.00',
      required: true,
      semanticName: 'tablet display',
    },
  ]);

  // page 2 -> specifications -> tablet -> tablet resolution

  // page 2 -> specifications -> tablet -> tablet resolution -> horizontal

  // page 2 -> specifications -> tablet -> tablet resolution -> horizontal -> screenreader accessible text input elements
  const [
    tabletResolutionHorizontalInputErrorText,
    tabletResolutionHorizontalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'tablet resolution horizontal',
    inputText: tabletResolutionHorizontal,
    isInputTextFocused: isTabletResolutionHorizontalFocused,
    isValidInputText: isTabletResolutionHorizontalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: tabletResolutionHorizontal,
      contentKind: 'tablet resolution horizontal',
    }),
  });

  // page 2 -> specifications -> tablet -> tablet resolution -> horizontal -> text input element creator
  const [createdTabletResolutionHorizontalTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: tabletResolutionHorizontalInputErrorText,
          valid: tabletResolutionHorizontalInputValidText,
        },
        inputText: tabletResolutionHorizontal,
        isValidInputText: isTabletResolutionHorizontalValid,
        label: 'Tablet Resolution Horizontal (pixels)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletResolutionHorizontalFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletResolutionHorizontal,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletResolutionHorizontalFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'tablet resolution horizontal',
      },
    ]);

  // page 2 -> specifications -> tablet -> tablet resolution -> vertical

  // page 2 -> specifications -> tablet -> tablet resolution -> vertical -> screenreader accessible text input elements
  const [
    tabletResolutionVerticalInputErrorText,
    tabletResolutionVerticalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'tablet resolution vertical',
    inputText: tabletResolutionVertical,
    isInputTextFocused: isTabletResolutionVerticalFocused,
    isValidInputText: isTabletResolutionVerticalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: tabletResolutionVertical,
      contentKind: 'tablet resolution vertical',
    }),
  });

  // page 2 -> specifications -> tablet -> tablet resolution -> vertical -> text input element creator
  const [createdTabletResolutionVerticalTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: tabletResolutionVerticalInputErrorText,
          valid: tabletResolutionVerticalInputValidText,
        },
        inputText: tabletResolutionVertical,
        isValidInputText: isTabletResolutionVerticalValid,
        label: 'Tablet Resolution Vertical (pixels)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletResolutionVerticalFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletResolutionVertical,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletResolutionVerticalFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'tablet resolution vertical',
      },
    ]);

  // page 2 -> specifications -> tablet -> tablet ram capacity

  // page 2 -> specifications -> tablet -> tablet ram capacity -> screenreader accessible text input elements
  const [tabletRamCapacityInputErrorText, tabletRamCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'tablet ram capacity',
      inputText: tabletRamCapacity,
      isInputTextFocused: isTabletRamCapacityFocused,
      isValidInputText: isTabletRamCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: tabletRamCapacity,
        contentKind: 'tablet ram capacity',
      }),
    });

  // page 2 -> specifications -> tablet -> tablet ram capacity -> text input element creator
  const [createdTabletRamCapacityTextInput] = returnAccessibleTextInputElements(
    [
      {
        description: {
          error: tabletRamCapacityInputErrorText,
          valid: tabletRamCapacityInputValidText,
        },
        inputText: tabletRamCapacity,
        isValidInputText: isTabletRamCapacityValid,
        label: 'Tablet RAM Capacity (GB)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletRamCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletRamCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletRamCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'tablet ram capacity',
      },
    ]
  );

  // page 2 -> specifications -> tablet -> tablet ram capacity unit

  // page 2 -> specifications -> tablet -> tablet ram capacity unit -> select input element
  const [createdTabletRamCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
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

  // page 2 -> specifications -> tablet -> tablet storage capacity -> screenreader accessible text input elements
  const [
    tabletStorageCapacityInputErrorText,
    tabletStorageCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'tablet storage capacity',
    inputText: tabletStorageCapacity,
    isInputTextFocused: isTabletStorageCapacityFocused,
    isValidInputText: isTabletStorageCapacityValid,
    regexValidationText: returnMediumIntegerValidationText({
      content: tabletStorageCapacity,
      contentKind: 'tablet storage capacity',
    }),
  });

  // page 2 -> specifications -> tablet -> tablet storage capacity -> text input element creator
  const [createdTabletStorageCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: tabletStorageCapacityInputErrorText,
          valid: tabletStorageCapacityInputValidText,
        },
        inputText: tabletStorageCapacity,
        isValidInputText: isTabletStorageCapacityValid,
        label: 'Tablet Storage Capacity (GB)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletStorageCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletStorageCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletStorageCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'tablet storage capacity',
      },
    ]);

  // page 2 -> specifications -> tablet -> tablet battery capacity

  // page 2 -> specifications -> tablet -> tablet battery capacity -> screenreader accessible text input elements
  const [
    tabletBatteryCapacityInputErrorText,
    tabletBatteryCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'tablet battery capacity',
    inputText: tabletBatteryCapacity,
    isInputTextFocused: isTabletBatteryCapacityFocused,
    isValidInputText: isTabletBatteryCapacityValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: tabletBatteryCapacity,
      contentKind: 'tablet battery capacity',
    }),
  });

  // page 2 -> specifications -> tablet -> tablet battery capacity -> text input element creator
  const [createdTabletBatteryCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: tabletBatteryCapacityInputErrorText,
          valid: tabletBatteryCapacityInputValidText,
        },
        inputText: tabletBatteryCapacity,
        isValidInputText: isTabletBatteryCapacityValid,
        label: 'Tablet Battery Capacity (mAh)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletBatteryCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletBatteryCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletBatteryCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'tablet battery capacity',
      },
    ]);

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
        maxLength: 84,
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
      maxLength: 84,
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

  // page 2 -> specifications -> tablet -> add new field button
  const [createdAddTabletFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> tablet -> tablet fields user defined

  // page 2 -> specifications -> tablet -> tablet fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> tablet -> tablet fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const tabletFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(tabletFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      tabletFieldsAdditionalMapKeysInputErrorText,
      tabletFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areTabletFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areTabletFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      tabletFieldsAdditionalMapKeysInputErrorText,
      tabletFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> tablet -> tablet fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const tabletFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(tabletFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      tabletFieldsAdditionalMapValuesInputErrorText,
      tabletFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areTabletFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areTabletFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      tabletFieldsAdditionalMapValuesInputErrorText,
      tabletFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> tablet -> tablet fields user defined -> text area input element creator
  const createdTabletFieldsAdditionalMapTextInputElements = Array.from(
    tabletFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const tabletFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: tabletFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: tabletFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areTabletFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapFocused,
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

    const tabletFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            tabletFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            tabletFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areTabletFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapFocused,
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
      createdTabletFieldsAdditionalMapKeysTextAreaInput,
      createdTabletFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      tabletFieldsAdditionalMapKeysTextInputCreatorInfo,
      tabletFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
      <Stack key={`tabletFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Tablet field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdTabletFieldsAdditionalMapKeysTextAreaInput}
          {createdTabletFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

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

  // page 2 -> specifications -> accessory -> add new field button
  const [createdAddAccessoryFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setAccessoryFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreAccessoryFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreAccessoryFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> accessory -> accessory fields user defined

  // page 2 -> specifications -> accessory -> accessory fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> accessory -> accessory fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const accessoryFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(accessoryFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      accessoryFieldsAdditionalMapKeysInputErrorText,
      accessoryFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areAccessoryFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areAccessoryFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      accessoryFieldsAdditionalMapKeysInputErrorText,
      accessoryFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> accessory -> accessory fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const accessoryFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(accessoryFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      accessoryFieldsAdditionalMapValuesInputErrorText,
      accessoryFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areAccessoryFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areAccessoryFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      accessoryFieldsAdditionalMapValuesInputErrorText,
      accessoryFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> accessory -> accessory fields user defined -> text area input element creator
  const createdAccessoryFieldsAdditionalMapTextInputElements = Array.from(
    accessoryFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const accessoryFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            accessoryFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid:
            accessoryFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areAccessoryFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreAccessoryFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setAccessoryFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreAccessoryFieldsAdditionalMapFocused,
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

    const accessoryFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            accessoryFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            accessoryFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areAccessoryFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreAccessoryFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setAccessoryFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreAccessoryFieldsAdditionalMapFocused,
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
      createdAccessoryFieldsAdditionalMapKeysTextAreaInput,
      createdAccessoryFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      accessoryFieldsAdditionalMapKeysTextInputCreatorInfo,
      accessoryFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setAccessoryFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreAccessoryFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreAccessoryFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
        key={`accessoryFieldsAdditionalMap-${mapKey}`}
        pt={padding}
        w="100%"
      >
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Accessory field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdAccessoryFieldsAdditionalMapKeysTextAreaInput}
          {createdAccessoryFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // page 2 -> specifications -> webcam

  // page 2 -> specifications -> webcam -> webcam resolution

  // page 2 -> specifications -> webcam -> webcam resolution -> select input element
  const [createdWebcamResolutionSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: WEBCAM_RESOLUTION_DATA,
        description: '',
        label: 'Webcam Resolution',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setWebcamResolution,
            payload: event.currentTarget.value as WebcamResolution,
          });
        },
        value: webcamResolution,
        required: true,
      },
    ]);

  // page 2 -> specifications -> webcam -> webcam color

  // page 2 -> specifications -> webcam -> webcam color -> accessible screen reader text elements
  const [webcamColorInputErrorText, webcamColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'webcam color',
      inputText: webcamColor,
      isInputTextFocused: isWebcamColorFocused,
      isValidInputText: isWebcamColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: webcamColor,
        contentKind: 'webcam color',
      }),
    });

  // page 2 -> specifications -> webcam -> webcam color -> text input element creator
  const [createdWebcamColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: webcamColorInputErrorText,
        valid: webcamColorInputValidText,
      },
      inputText: webcamColor,
      isValidInputText: isWebcamColorValid,
      label: 'Webcam Color',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsWebcamColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setWebcamColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsWebcamColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter webcam color',
      required: true,
      semanticName: 'webcam color',
    },
  ]);

  // page 2 -> specifications -> webcam -> webcam microphone

  // page 2 -> specifications -> webcam -> webcam microphone -> select input element
  const [createdWebcamMicrophoneSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: WEBCAM_MICROPHONE_DATA,
        description: '',
        label: 'Webcam Microphone',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setWebcamMicrophone,
            payload: event.currentTarget.value as WebcamMicrophone,
          });
        },
        value: webcamMicrophone,
        required: true,
      },
    ]);

  // page 2 -> specifications -> webcam -> webcam interface

  // page 2 -> specifications -> webcam -> webcam interface -> select input element
  const [createdWebcamInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: WEBCAM_INTERFACE_DATA,
        description: '',
        label: 'Webcam Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setWebcamInterface,
            payload: event.currentTarget.value as WebcamInterface,
          });
        },
        value: webcamInterface,
        required: true,
      },
    ]);

  // page 2 -> specifications -> webcam -> webcam frame rate

  // page 2 -> specifications -> webcam -> webcam frame rate -> select input element
  const [createdWebcamFrameRateSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: WEBCAM_FRAME_RATE_DATA,
        description: '',
        label: 'Webcam Frame Rate',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setWebcamFrameRate,
            payload: event.currentTarget.value as WebcamFrameRate,
          });
        },
        value: webcamFrameRate,
        required: true,
      },
    ]);

  // page 2 -> specifications -> webcam -> add new field button
  const [createdAddWebcamFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setWebcamFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreWebcamFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreWebcamFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> webcam -> webcam fields user defined

  // page 2 -> specifications -> webcam -> webcam fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> webcam -> webcam fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const webcamFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(webcamFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      webcamFieldsAdditionalMapKeysInputErrorText,
      webcamFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areWebcamFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areWebcamFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      webcamFieldsAdditionalMapKeysInputErrorText,
      webcamFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> webcam -> webcam fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const webcamFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(webcamFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      webcamFieldsAdditionalMapValuesInputErrorText,
      webcamFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areWebcamFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areWebcamFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      webcamFieldsAdditionalMapValuesInputErrorText,
      webcamFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> webcam -> webcam fields user defined -> text area input element creator
  const createdWebcamFieldsAdditionalMapTextInputElements = Array.from(
    webcamFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const webcamFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: webcamFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: webcamFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areWebcamFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreWebcamFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setWebcamFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreWebcamFieldsAdditionalMapFocused,
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

    const webcamFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            webcamFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            webcamFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areWebcamFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreWebcamFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setWebcamFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreWebcamFieldsAdditionalMapFocused,
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
      createdWebcamFieldsAdditionalMapKeysTextAreaInput,
      createdWebcamFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      webcamFieldsAdditionalMapKeysTextInputCreatorInfo,
      webcamFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setWebcamFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreWebcamFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreWebcamFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
      <Stack key={`webcamFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Webcam field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdWebcamFieldsAdditionalMapKeysTextAreaInput}
          {createdWebcamFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // page 2 -> specifications -> microphone

  // page 2 -> specifications -> microphone -> microphone type

  // page 2 -> specifications -> microphone -> microphone type -> select input element
  const [createdMicrophoneTypeSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MICROPHONE_TYPE_DATA,
        description: '',
        label: 'Microphone Type',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneType,
            payload: event.currentTarget.value as MicrophoneType,
          });
        },
        value: microphoneType,
        required: true,
      },
    ]);

  // page 2 -> specifications -> microphone -> microphone color

  // page 2 -> specifications -> microphone -> microphone color -> accessible screen reader text elements
  const [microphoneColorInputErrorText, microphoneColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'microphone color',
      inputText: microphoneColor,
      isInputTextFocused: isMicrophoneColorFocused,
      isValidInputText: isMicrophoneColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: microphoneColor,
        contentKind: 'microphone color',
      }),
    });

  // page 2 -> specifications -> microphone -> microphone color -> text input element creator
  const [createdMicrophoneColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: microphoneColorInputErrorText,
        valid: microphoneColorInputValidText,
      },
      inputText: microphoneColor,
      isValidInputText: isMicrophoneColorValid,
      label: 'Microphone Color',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMicrophoneColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMicrophoneColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMicrophoneColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter microphone color',
      required: true,
      semanticName: 'microphone color',
    },
  ]);

  // page 2 -> specifications -> microphone -> microphone interface

  // page 2 -> specifications -> microphone -> microphone interface -> select input element
  const [createdMicrophoneInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MICROPHONE_INTERFACE_DATA,
        description: '',
        label: 'Microphone Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneInterface,
            payload: event.currentTarget.value as MicrophoneInterface,
          });
        },
        value: microphoneInterface,
        required: true,
      },
    ]);

  // page 2 -> specifications -> microphone -> microphone polar pattern

  // page 2 -> specifications -> microphone -> microphone polar pattern -> select input element
  const [createdMicrophonePolarPatternSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MICROPHONE_POLAR_PATTERN_DATA,
        description: '',
        label: 'Microphone Polar Pattern',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophonePolarPattern,
            payload: event.currentTarget.value as MicrophonePolarPattern,
          });
        },
        value: microphonePolarPattern,
        required: true,
      },
    ]);

  // page 2 -> specifications -> microphone -> microphone frequency response

  // page 2 -> specifications -> microphone -> microphone frequency response -> screenreader accessible text input elements
  const [
    microphoneFrequencyResponseInputErrorText,
    microphoneFrequencyResponseInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'microphone frequency response',
    inputText: microphoneFrequencyResponse,
    isInputTextFocused: isMicrophoneFrequencyResponseFocused,
    isValidInputText: isMicrophoneFrequencyResponseValid,
    regexValidationText: returnFrequencyResponseValidationText({
      content: microphoneFrequencyResponse,
      contentKind: 'microphone frequency response',
    }),
  });

  // page 2 -> specifications -> microphone -> microphone frequency response -> text input element creator
  const [createdMicrophoneFrequencyResponseTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: microphoneFrequencyResponseInputErrorText,
          valid: microphoneFrequencyResponseInputValidText,
        },
        inputText: microphoneFrequencyResponse,
        isValidInputText: isMicrophoneFrequencyResponseValid,
        label: 'Microphone Frequency Response (Hz-kHz)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsMicrophoneFrequencyResponseFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneFrequencyResponse,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsMicrophoneFrequencyResponseFocused,
            payload: true,
          });
        },
        placeholder: 'Enter microphone frequency response',
        required: true,
        semanticName: 'microphone frequency response',
      },
    ]);

  // page 2 -> specifications -> microphone -> add new field button
  const [createdAddMicrophoneFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // page 2 -> specifications -> microphone -> microphone fields user defined

  // page 2 -> specifications -> microphone -> microphone fields user defined -> accessible screen reader text elements

  // page 2 -> specifications -> microphone -> microphone fields user defined -> accessible screen reader text elements -> field names

  // returns an array of tuples containing the error and valid text elements for each field name
  const microphoneFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(microphoneFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      microphoneFieldsAdditionalMapKeysInputErrorText,
      microphoneFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areMicrophoneFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areMicrophoneFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      microphoneFieldsAdditionalMapKeysInputErrorText,
      microphoneFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // page 2 -> specifications -> microphone -> microphone fields user defined -> accessible screen reader text elements -> field values

  // returns an array of tuples containing the error and valid text elements for each field value
  const microphoneFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(microphoneFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      microphoneFieldsAdditionalMapValuesInputErrorText,
      microphoneFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areMicrophoneFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areMicrophoneFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      microphoneFieldsAdditionalMapValuesInputErrorText,
      microphoneFieldsAdditionalMapValuesInputValidText,
    ];
  });

  // page 2 -> specifications -> microphone -> microphone fields user defined -> text area input element creator
  const createdMicrophoneFieldsAdditionalMapTextInputElements = Array.from(
    microphoneFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    const microphoneFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            microphoneFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid:
            microphoneFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areMicrophoneFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalMapFocused,
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

    const microphoneFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            microphoneFieldsAdditionalMapValuesErrorValidTextElements[
              mapKey
            ][0],
          valid:
            microphoneFieldsAdditionalMapValuesErrorValidTextElements[
              mapKey
            ][1],
        },
        inputText: value,
        isValidInputText:
          areMicrophoneFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneFieldsAdditionalMap,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalMapFocused,
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
      createdMicrophoneFieldsAdditionalMapKeysTextAreaInput,
      createdMicrophoneFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      microphoneFieldsAdditionalMapKeysTextInputCreatorInfo,
      microphoneFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalMapValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
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
        key={`microphoneFieldsAdditionalMap-${mapKey}`}
        pt={padding}
        w="100%"
      >
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Microphone field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdMicrophoneFieldsAdditionalMapKeysTextAreaInput}
          {createdMicrophoneFieldsAdditionalMapValuesTextAreaInput}
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

  // page 1

  const displayCreateProductFormPage1 = (
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

  // page 2

  // page 2 -> specifications

  // page 2 -> specifications -> cpu

  // page 2 -> specifications -> cpu -> add new button
  const displayCpuFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${cpuFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddCpuFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> cpu -> display
  const displayCpuSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group position="apart" w="100%">
        <Title order={4}>CPU Specifications</Title>
        {displayCpuFieldsAdditionalMapButton}
      </Group>
      {createdCpuSocketTextInput}
      {createdCpuWattageTextInput}
      {createdCpuFrequencyTextInput}
      {createdCpuCoresTextInput}
      {createdCpuL1CacheCapacityTextInput}
      {createdCpuL1CacheCapacityUnitSelectInput}
      {createdCpuL2CacheCapacityTextInput}
      {createdCpuL2CacheCapacityUnitSelectInput}
      {createdCpuL3CacheCapacityTextInput}
      {createdCpuL3CacheCapacityUnitSelectInput}
      {createdCpuFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> gpu chipset

  // page 2 -> specifications -> gpu -> add new button
  const displayGpuFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${gpuFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddGpuFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> gpu -> display
  const displayGpuSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>GPU Specifications</Title>
        {displayGpuFieldsAdditionalMapButton}
      </Group>
      {createdGpuChipsetTextInput}
      {createdGpuMemoryCapacityTextInput}
      {createdGpuMemoryCapacityUnitSelectInput}
      {createdGpuWattageTextInput}
      {createdGpuCoreClockTextInput}
      {createdGpuBoostClockTextInput}
      {createdGpuFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> motherboard

  // page 2 -> specifications -> motherboard -> add new button
  const displayMotherboardFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${
        motherboardFieldsAdditionalMap.size + 1
      }`}
    >
      <Group>{createdAddMotherboardFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> motherboard -> display
  const displayMotherboardSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Motherboard Specifications</Title>
        {displayMotherboardFieldsAdditionalMapButton}
      </Group>
      {createdMotherboardSocketTextInput}
      {createdMotherboardChipsetTextInput}
      {createdMotherboardFormFactorSelectInput}
      {createdMotherboardMemoryMaxCapacityTextInput}
      {createdMotherboardMemoryMaxCapacityUnitSelectInput}
      {createdMotherboardMemorySlotsTextInput}
      {createdMotherboardMemoryTypeSelectInput}
      {createdMotherboardSataPortsTextInput}
      {createdMotherboardM2SlotsTextInput}
      {createdMotherboardPcie3SlotsTextInput}
      {createdMotherboardPcie4SlotsTextInput}
      {createdMotherboardPcie5SlotsTextInput}
      {createdMotherboardFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> ram

  // page 2 -> specifications -> ram -> add new button
  const displayRamFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${ramFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddRamFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> ram -> display
  const displayRamSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Memory (RAM) Specifications</Title>
        {displayRamFieldsAdditionalMapButton}
      </Group>
      {createdRamDataRateTextInput}
      {createdRamModulesQuantityTextInput}
      {createdRamModulesCapacityTextInput}
      {createdRamModulesCapacityUnitSelectInput}
      {createdRamTypeSelectInput}
      {createdRamColorTextInput}
      {createdRamVoltageTextInput}
      {createdRamTimingTextInput}
      {createdRamFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> storage

  // page 2 -> specifications -> storage -> add new button
  const displayStorageFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${storageFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddStorageFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> storage -> display
  const displayStorageSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Storage Specifications</Title>
        {displayStorageFieldsAdditionalMapButton}
      </Group>
      {createdStorageTypeSelectInput}
      {createdStorageInterfaceSelectInput}
      {createdStorageCapacityTextInput}
      {createdStorageCapacityUnitSelectInput}
      {createdStorageCacheCapacityTextInput}
      {createdStorageCacheCapacityUnitSelectInput}
      {createdStorageFormFactorSelectInput}
      {createdStorageFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> power supply

  // page 2 -> specifications -> power supply -> add new button
  const displayPsuFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${psuFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddPsuFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> power supply -> display
  const displayPowerSupplySpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Power Supply Unit (PSU) Specifications</Title>
        {displayPsuFieldsAdditionalMapButton}
      </Group>
      {createdPsuWattageTextInput}
      {createdPsuEfficiencyRatingSelectInput}
      {createdPsuFormFactorSelectInput}
      {createdPsuModularitySelectInput}
      {createdPsuFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> computer case

  // page 2 -> specifications -> computer case -> add new button
  const displayCaseFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${caseFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddCaseFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> computer case -> display
  const displayComputerCaseSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Case Specifications</Title>
        {displayCaseFieldsAdditionalMapButton}
      </Group>
      {createdCaseTypeSelectInput}
      {createdCaseColorTextInput}
      {createdCaseSidePanelSelectInput}
      {createdCaseFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> display

  // page 2 -> specifications -> display -> add new button
  const displayDisplayFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${displayFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddDisplayFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> display -> display
  const displayDisplaySpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Display Specifications</Title>
        {displayDisplayFieldsAdditionalMapButton}
      </Group>
      {createdDisplaySizeTextInput}
      {createdDisplayResolutionHorizontalTextInput}
      {createdDisplayResolutionVerticalTextInput}
      {createdDisplayRefreshRateTextInput}
      {createdDisplayPanelTypeSelectInput}
      {createdDisplayResponseTimeTextInput}
      {createdDisplayAspectRatioTextInput}
      {createdDisplayFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> keyboard

  // page 2 -> specifications -> keyboard -> add new button
  const displayKeyboardFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${keyboardFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddKeyboardFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> keyboard -> display
  const displayKeyboardSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Keyboard Specifications</Title>
        {displayKeyboardFieldsAdditionalMapButton}
      </Group>
      {createdKeyboardSwitchSelectInput}
      {createdKeyboardLayoutSelectInput}
      {createdKeyboardBacklightSelectInput}
      {createdKeyboardInterfaceSelectInput}
      {createdKeyboardFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> mouse

  // page 2 -> specifications -> mouse -> add new button
  const displayMouseFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${mouseFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddMouseFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> mouse -> display
  const displayMouseSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Mouse Specifications</Title>
        {displayMouseFieldsAdditionalMapButton}
      </Group>
      {createdMouseSensorSelectInput}
      {createdMouseDpiTextInput}
      {createdMouseButtonsTextInput}
      {createdMouseColorTextInput}
      {createdMouseInterfaceSelectInput}
      {createdMouseFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> headphone

  // page 2 -> specifications -> headphone -> add new button
  const displayHeadphoneFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${
        headphoneFieldsAdditionalMap.size + 1
      }`}
    >
      <Group>{createdAddHeadphoneFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> headphone -> display
  const displayHeadphoneSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Headphone Specifications</Title>
        {displayHeadphoneFieldsAdditionalMapButton}
      </Group>
      {createdHeadphoneTypeSelectInput}
      {createdHeadphoneDriverTextInput}
      {createdHeadphoneFrequencyResponseTextInput}
      {createdHeadphoneImpedanceTextInput}
      {createdHeadphoneColorTextInput}
      {createdHeadphoneInterfaceSelectInput}
      {createdHeadphoneFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> speaker

  // page 2 -> specifications -> speaker -> add new button
  const displaySpeakerFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${speakerFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddSpeakerFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> speaker -> display
  const displaySpeakerSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Speaker Specifications</Title>
        {displaySpeakerFieldsAdditionalMapButton}
      </Group>
      {createdSpeakerTypeSelectInput}
      {createdSpeakerTotalWattageTextInput}
      {createdSpeakerFrequencyResponseTextInput}
      {createdSpeakerColorTextInput}
      {createdSpeakerInterfaceSelectInput}
      {createdSpeakerFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> smartphone

  // page 2 -> specifications -> smartphone -> add new button
  const displaySmartphoneFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${
        smartphoneFieldsAdditionalMap.size + 1
      }`}
    >
      <Group>{createdAddSmartphoneFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> smartphone -> display
  const displaySmartphoneSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Smartphone Specifications</Title>
        {displaySmartphoneFieldsAdditionalMapButton}
      </Group>
      {createdSmartphoneOsSelectInput}
      {createdSmartphoneChipsetTextInput}
      {createdSmartphoneDisplayTextInput}
      {createdSmartphoneResolutionHorizontalTextInput}
      {createdSmartphoneResolutionVerticalTextInput}
      {createdSmartphoneColorTextInput}
      {createdSmartphoneRamCapacityTextInput}
      {createdSmartphoneRamCapacityUnitSelectInput}
      {createdSmartphoneStorageCapacityTextInput}
      {createdSmartphoneBatteryCapacityTextInput}
      {createdSmartphoneCameraTextInput}
      {createdSmartphoneFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> tablet

  // page 2 -> specifications -> tablet -> add new button
  const displayTabletFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${tabletFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddTabletFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> tablet -> display
  const displayTabletSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Tablet Specifications</Title>
        {displayTabletFieldsAdditionalMapButton}
      </Group>
      {createdTabletOsSelectInput}
      {createdTabletChipsetTextInput}
      {createdTabletDisplayTextInput}
      {createdTabletResolutionHorizontalTextInput}
      {createdTabletResolutionVerticalTextInput}
      {createdTabletColorTextInput}
      {createdTabletRamCapacityTextInput}
      {createdTabletRamCapacityUnitSelectInput}
      {createdTabletStorageCapacityTextInput}
      {createdTabletBatteryCapacityTextInput}
      {createdTabletCameraTextInput}
      {createdTabletFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> accessory

  // page 2 -> specifications -> accessory -> add new button
  const displayAccessoryFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${
        accessoryFieldsAdditionalMap.size + 1
      }`}
    >
      <Group>{createdAddAccessoryFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> accessory -> display
  const displayAccessorySpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Accessory Specifications</Title>
        {displayAccessoryFieldsAdditionalMapButton}
      </Group>
      {createdAccessoryTypeTextInput}
      {createdAccessoryColorTextInput}
      {createdAccessoryInterfaceSelectInput}
      {createdAccessoryFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> desktop computers
  const displayDesktopComputersSpecificationsInputs = (
    <Stack w="100%">
      {displayCpuSpecificationsInputs}
      {displayGpuSpecificationsInputs}
      {displayMotherboardSpecificationsInputs}
      {displayRamSpecificationsInputs}
      {displayStorageSpecificationsInputs}
      {displayPowerSupplySpecificationsInputs}
      {displayComputerCaseSpecificationsInputs}
      {displayDisplaySpecificationsInputs}
      {displayKeyboardSpecificationsInputs}
      {displayMouseSpecificationsInputs}
      {displaySpeakerSpecificationsInputs}
    </Stack>
  );

  // page 2 -> specifications -> laptop computers
  const displayLaptopComputersSpecificationsInputs = (
    <Stack w="100%">
      {displayCpuSpecificationsInputs}
      {displayGpuSpecificationsInputs}
      {displayDisplaySpecificationsInputs}
      {displayRamSpecificationsInputs}
      {displayStorageSpecificationsInputs}
    </Stack>
  );

  // page 2 -> specifications -> webcams

  // page 2 -> specifications -> webcams -> add new button
  const displayWebcamFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${webcamFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddWebcamFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> webcams -> display
  const displayWebcamSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Webcam Specifications</Title>
        {displayWebcamFieldsAdditionalMapButton}
      </Group>
      {createdWebcamResolutionSelectInput}
      {createdWebcamColorTextInput}
      {createdWebcamMicrophoneSelectInput}
      {createdWebcamInterfaceSelectInput}
      {createdWebcamFrameRateSelectInput}
      {createdWebcamFieldsAdditionalMapTextInputElements}
    </Group>
  );

  // page 2 -> specifications -> microphones

  // page 2 -> specifications -> microphones -> add new button
  const displayMicrophoneFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${
        microphoneFieldsAdditionalMap.size + 1
      }`}
    >
      <Group>{createdAddMicrophoneFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  // page 2 -> specifications -> microphones -> display
  const displayMicrophoneSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Microphone Specifications</Title>
        {displayMicrophoneFieldsAdditionalMapButton}
      </Group>
      {createdMicrophoneTypeSelectInput}
      {createdMicrophoneColorTextInput}
      {createdMicrophoneInterfaceSelectInput}
      {createdMicrophonePolarPatternSelectInput}
      {createdMicrophoneFrequencyResponseTextInput}
      {createdMicrophoneFieldsAdditionalMapTextInputElements}
    </Group>
  );

  const displayCreateProductFormPage2 = (
    <FormLayoutWrapper>
      <Group
        position="apart"
        py={padding}
        style={{ borderBottom: borderColor }}
        w="100%"
      >
        {createdProductCategorySelectInput}
      </Group>
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
        : productCategory === 'Displays'
        ? displayDisplaySpecificationsInputs
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
        : productCategory === 'Webcams'
        ? displayWebcamSpecificationsInputs
        : displayMicrophoneSpecificationsInputs}
    </FormLayoutWrapper>
  );

  // ╭──────────────────────────────────────────────────────────────╮
  // │ Form Review Objects                                          │
  // ╰──────────────────────────────────────────────────────────────╯

  // page 1
  const page1FormReviewObject: FormReviewObjectArray = {
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

  // page 2

  // page 2 -> specifications

  // page 2 -> specifications -> cpu

  // page 2 -> specifications -> cpu -> cpu fields user defined -> form review objs
  const cpuFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: cpuFieldsAdditionalMap,
      areAdditionalFieldsValid: areCpuFieldsAdditionalMapValid,
    });

  // page 2 -> specifications -> cpu -> cpu fields hardcoded -> form review objs
  const page2CpuFormReviewObject: FormReviewObjectArray = {
    'CPU Specifications': [
      {
        inputName: 'CPU Socket',
        inputValue: cpuSocket,
        isInputValueValid: isCpuSocketValid,
      },
      {
        inputName: 'CPU Frequency',
        inputValue: cpuFrequency,
        isInputValueValid: isCpuFrequencyValid,
      },
      {
        inputName: 'CPU Cores',
        inputValue: cpuCores,
        isInputValueValid: isCpuCoresValid,
      },
      {
        inputName: 'CPU L1 Cache Capacity',
        inputValue: cpuL1CacheCapacity,
        isInputValueValid: isCpuL1CacheCapacityValid,
      },
      {
        inputName: 'CPU L1 Cache Capacity Unit',
        inputValue: cpuL1CacheCapacityUnit,
      },
      {
        inputName: 'CPU L2 Cache Capacity',
        inputValue: cpuL2CacheCapacity,
        isInputValueValid: isCpuL2CacheCapacityValid,
      },
      {
        inputName: 'CPU L2 Cache Capacity Unit',
        inputValue: cpuL2CacheCapacityUnit,
      },
      {
        inputName: 'CPU L3 Cache Capacity',
        inputValue: cpuL3CacheCapacity,
        isInputValueValid: isCpuL3CacheCapacityValid,
      },
      {
        inputName: 'CPU L3 Cache Capacity Unit',
        inputValue: cpuL3CacheCapacityUnit,
      },
      {
        inputName: 'CPU Wattage',
        inputValue: cpuWattage,
        isInputValueValid: isCpuWattageValid,
      },
      ...cpuFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> gpu chipset

  // page 2 -> specifications -> gpu -> gpu fields user defined -> form review objs
  const gpuFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: gpuFieldsAdditionalMap,
      areAdditionalFieldsValid: areGpuFieldsAdditionalMapValid,
    });

  const page2GpuFormReviewObject: FormReviewObjectArray = {
    'GPU Specifications': [
      {
        inputName: 'GPU Chipset',
        inputValue: gpuChipset,
        isInputValueValid: isGpuChipsetValid,
      },
      {
        inputName: 'GPU Memory Capacity',
        inputValue: gpuMemoryCapacity,
        isInputValueValid: isGpuMemoryCapacityValid,
      },
      {
        inputName: 'GPU Memory Capacity Unit',
        inputValue: gpuMemoryCapacityUnit,
      },
      {
        inputName: 'GPU Core Clock',
        inputValue: gpuCoreClock,
        isInputValueValid: isGpuCoreClockValid,
      },
      {
        inputName: 'GPU Boost Clock',
        inputValue: gpuBoostClock,
        isInputValueValid: isGpuBoostClockValid,
      },
      {
        inputName: 'GPU Wattage',
        inputValue: gpuTdp,
        isInputValueValid: isGpuTdpValid,
      },
      ...gpuFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> motherboard

  // page 2 -> specifications -> motherboard -> motherboard fields user defined -> form review objs
  const motherboardFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: motherboardFieldsAdditionalMap,
      areAdditionalFieldsValid: areMotherboardFieldsAdditionalMapValid,
    });

  const page2MotherboardFormReviewObject: FormReviewObjectArray = {
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
        isInputValueValid: isMotherboardMemoryMaxCapacityValid,
      },
      {
        inputName: 'Motherboard Memory Max Capacity Unit',
        inputValue: motherboardMemoryMaxCapacityUnit,
      },
      {
        inputName: 'Motherboard Memory Slots',
        inputValue: motherboardMemorySlots,
        isInputValueValid: isMotherboardMemorySlotsValid,
      },
      {
        inputName: 'Motherboard Memory Type',
        inputValue: motherboardMemoryType,
      },
      {
        inputName: 'Motherboard SATA Ports',
        inputValue: motherboardSataPorts,
        isInputValueValid: isMotherboardSataPortsValid,
      },
      {
        inputName: 'Motherboard M.2 Slots',
        inputValue: motherboardM2Slots,
        isInputValueValid: isMotherboardM2SlotsValid,
      },
      {
        inputName: 'Motherboard PCIe 3.0 Slots',
        inputValue: motherboardPcie3Slots,
        isInputValueValid: isMotherboardPcie3SlotsValid,
      },
      {
        inputName: 'Motherboard PCIe 4.0 Slots',
        inputValue: motherboardPcie4Slots,
        isInputValueValid: isMotherboardPcie4SlotsValid,
      },
      {
        inputName: 'Motherboard PCIe 5.0 Slots',
        inputValue: motherboardPcie5Slots,
        isInputValueValid: motherboardPcie5Slots
          ? isMotherboardPcie5SlotsValid
          : true,
      },
      ...motherboardFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> ram

  // page 2 -> specifications -> ram -> ram fields user defined -> form review objs
  const ramFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: ramFieldsAdditionalMap,
      areAdditionalFieldsValid: areRamFieldsAdditionalMapValid,
    });

  const page2RamFormReviewObject: FormReviewObjectArray = {
    'Memory (RAM) Specifications': [
      {
        inputName: 'RAM Data Rate',
        inputValue: ramDataRate,
        isInputValueValid: isRamDataRateValid,
      },
      {
        inputName: 'RAM Modules Quantity',
        inputValue: ramModulesQuantity,
        isInputValueValid: isRamModulesQuantityValid,
      },
      {
        inputName: 'RAM Modules Capacity',
        inputValue: ramModulesCapacity,
        isInputValueValid: isRamModulesCapacityValid,
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
        isInputValueValid: isRamVoltageValid,
      },
      {
        inputName: 'RAM Timing',
        inputValue: ramTiming,
        isInputValueValid: isRamTimingValid,
      },
      ...ramFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> storage

  // page 2 -> specifications -> storage -> storage fields user defined -> form review objs
  const storageFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: storageFieldsAdditionalMap,
      areAdditionalFieldsValid: areStorageFieldsAdditionalMapValid,
    });

  const page2StorageFormReviewObject: FormReviewObjectArray = {
    'Storage Specifications': [
      {
        inputName: 'Storage Type',
        inputValue: storageType,
      },
      {
        inputName: 'Storage Capacity',
        inputValue: storageCapacity,
        isInputValueValid: isStorageCapacityValid,
      },
      {
        inputName: 'Storage Capacity Unit',
        inputValue: storageCapacityUnit,
      },
      {
        inputName: 'Storage Cache Capacity',
        inputValue: storageCacheCapacity,
        isInputValueValid: isStorageCacheCapacityValid,
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
      ...storageFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> power supply

  // page 2 -> specifications -> power supply -> power supply fields user defined -> form review objs
  const psuFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: psuFieldsAdditionalMap,
      areAdditionalFieldsValid: arePsuFieldsAdditionalMapValid,
    });

  const page2PowerSupplyFormReviewObject: FormReviewObjectArray = {
    'Power Supply Unit (PSU) Specifications': [
      {
        inputName: 'PSU Wattage',
        inputValue: psuWattage,
        isInputValueValid: isPsuWattageValid,
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
      ...psuFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> computer case

  // page 2 -> specifications -> computer case -> computer case fields user defined -> form review objs
  const caseFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: caseFieldsAdditionalMap,
      areAdditionalFieldsValid: areCaseFieldsAdditionalMapValid,
    });

  const page2ComputerCaseFormReviewObject: FormReviewObjectArray = {
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
      ...caseFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> display

  // page 2 -> specifications -> display -> display fields user defined -> form review objs
  const displayFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: displayFieldsAdditionalMap,
      areAdditionalFieldsValid: areDisplayFieldsAdditionalMapValid,
    });

  const page2DisplayFormReviewObject: FormReviewObjectArray = {
    'Display Specifications': [
      {
        inputName: 'Display Size',
        inputValue: displaySize,
        isInputValueValid: isDisplaySizeValid,
      },
      {
        inputName: 'Display Resolution Horizontal',
        inputValue: displayResolutionHorizontal,
        isInputValueValid: isDisplayResolutionHorizontalValid,
      },
      {
        inputName: 'Display Resolution Vertical',
        inputValue: displayResolutionVertical,
        isInputValueValid: isDisplayResolutionVerticalValid,
      },
      {
        inputName: 'Display Refresh Rate',
        inputValue: displayRefreshRate,
        isInputValueValid: isDisplayRefreshRateValid,
      },
      {
        inputName: 'Display Panel Type',
        inputValue: displayPanelType,
      },
      {
        inputName: 'Display Response Time',
        inputValue: displayResponseTime,
        isInputValueValid: isDisplayResponseTimeValid,
      },
      {
        inputName: 'Display Aspect Ratio',
        inputValue: displayAspectRatio,
        isInputValueValid: isDisplayAspectRatioValid,
      },
      ...displayFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> keyboard

  // page 2 -> specifications -> keyboard -> keyboard fields user defined -> form review objs
  const keyboardFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: keyboardFieldsAdditionalMap,
      areAdditionalFieldsValid: areKeyboardFieldsAdditionalMapValid,
    });

  const page2KeyboardFormReviewObject: FormReviewObjectArray = {
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
      ...keyboardFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> mouse

  // page 2 -> specifications -> mouse -> mouse fields user defined -> form review objs
  const mouseFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: mouseFieldsAdditionalMap,
      areAdditionalFieldsValid: areMouseFieldsAdditionalMapValid,
    });

  const page2MouseFormReviewObject: FormReviewObjectArray = {
    'Mouse Specifications': [
      {
        inputName: 'Mouse Sensor',
        inputValue: mouseSensor,
      },
      {
        inputName: 'Mouse DPI',
        inputValue: mouseDpi,
        isInputValueValid: isMouseDpiValid,
      },
      {
        inputName: 'Mouse Buttons',
        inputValue: mouseButtons,
        isInputValueValid: isMouseButtonsValid,
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
      ...mouseFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> headphone

  // page 2 -> specifications -> headphone -> headphone fields user defined -> form review objs
  const headphoneFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: headphoneFieldsAdditionalMap,
      areAdditionalFieldsValid: areHeadphoneFieldsAdditionalMapValid,
    });

  const page2HeadphoneFormReviewObject: FormReviewObjectArray = {
    'Headphone Specifications': [
      {
        inputName: 'Headphone Type',
        inputValue: headphoneType,
      },
      {
        inputName: 'Headphone Driver',
        inputValue: headphoneDriver,
        isInputValueValid: isHeadphoneDriverValid,
      },
      {
        inputName: 'Headphone Frequency Response',
        inputValue: headphoneFrequencyResponse,
        isInputValueValid: isHeadphoneFrequencyResponseValid,
      },
      {
        inputName: 'Headphone Impedance',
        inputValue: headphoneImpedance,
        isInputValueValid: isHeadphoneImpedanceValid,
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
      ...headphoneFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> speaker

  // page 2 -> specifications -> speaker -> speaker fields user defined -> form review objs
  const speakerFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: speakerFieldsAdditionalMap,
      areAdditionalFieldsValid: areSpeakerFieldsAdditionalMapValid,
    });

  const page2SpeakerFormReviewObject: FormReviewObjectArray = {
    'Speaker Specifications': [
      {
        inputName: 'Speaker Type',
        inputValue: speakerType,
      },
      {
        inputName: 'Speaker Total Wattage',
        inputValue: speakerTotalWattage,
        isInputValueValid: isSpeakerTotalWattageValid,
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
      ...speakerFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> smartphone

  // page 2 -> specifications -> smartphone -> smartphone fields user defined -> form review objs
  const smartphoneFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: smartphoneFieldsAdditionalMap,
      areAdditionalFieldsValid: areSmartphoneFieldsAdditionalMapValid,
    });
  const page2SmartphoneFormReviewObject: FormReviewObjectArray = {
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
        isInputValueValid: isSmartphoneDisplayValid,
      },
      {
        inputName: 'Smartphone Resolution Horizontal',
        inputValue: smartphoneResolutionHorizontal,
        isInputValueValid: isSmartphoneResolutionHorizontalValid,
      },
      {
        inputName: 'Smartphone Resolution Vertical',
        inputValue: smartphoneResolutionVertical,
        isInputValueValid: isSmartphoneResolutionVerticalValid,
      },
      {
        inputName: 'Smartphone RAM Capacity',
        inputValue: smartphoneRamCapacity,
        isInputValueValid: isSmartphoneRamCapacityValid,
      },
      {
        inputName: 'Smartphone RAM Capacity Unit',
        inputValue: smartphoneRamCapacityUnit,
      },
      {
        inputName: 'Smartphone Storage Capacity',
        inputValue: smartphoneStorageCapacity,
        isInputValueValid: isSmartphoneStorageCapacityValid,
      },
      {
        inputName: 'Smartphone Battery Capacity',
        inputValue: smartphoneBatteryCapacity,
        isInputValueValid: isSmartphoneBatteryCapacityValid,
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
      ...smartphoneFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> tablet

  // page 2 -> specifications -> tablet -> tablet fields user defined -> form review objs
  const tabletFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: tabletFieldsAdditionalMap,
      areAdditionalFieldsValid: areTabletFieldsAdditionalMapValid,
    });

  const page2TabletFormReviewObject: FormReviewObjectArray = {
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
        isInputValueValid: isTabletDisplayValid,
      },
      {
        inputName: 'Tablet Resolution Horizontal',
        inputValue: tabletResolutionHorizontal,
        isInputValueValid: isTabletResolutionHorizontalValid,
      },
      {
        inputName: 'Tablet Resolution Vertical',
        inputValue: tabletResolutionVertical,
        isInputValueValid: isTabletResolutionVerticalValid,
      },
      {
        inputName: 'Tablet RAM Capacity',
        inputValue: tabletRamCapacity,
        isInputValueValid: isTabletRamCapacityValid,
      },
      {
        inputName: 'Tablet RAM Capacity Unit',
        inputValue: tabletRamCapacityUnit,
      },
      {
        inputName: 'Tablet Storage Capacity',
        inputValue: tabletStorageCapacity,
        isInputValueValid: isTabletStorageCapacityValid,
      },
      {
        inputName: 'Tablet Battery Capacity',
        inputValue: tabletBatteryCapacity,
        isInputValueValid: isTabletBatteryCapacityValid,
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
      ...tabletFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> accessory

  // page 2 -> specifications -> accessory -> accessory fields user defined -> form review objs
  const accessoryFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: accessoryFieldsAdditionalMap,
      areAdditionalFieldsValid: areAccessoryFieldsAdditionalMapValid,
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
      ...accessoryFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> webcams

  // page 2 -> specifications -> webcams -> webcam fields user defined -> form review objs
  const webcamFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: webcamFieldsAdditionalMap,
      areAdditionalFieldsValid: areWebcamFieldsAdditionalMapValid,
    });

  const page2WebcamFormReviewObject: FormReviewObjectArray = {
    'Webcam Specifications': [
      {
        inputName: 'Webcam Resolution',
        inputValue: webcamResolution,
      },
      {
        inputName: 'Webcam Color',
        inputValue: webcamColor,
        isInputValueValid: isWebcamColorValid,
      },
      {
        inputName: 'Webcam Microphone',
        inputValue: webcamMicrophone,
      },
      {
        inputName: 'Webcam Interface',
        inputValue: webcamInterface,
      },
      {
        inputName: 'Webcam Frame Rate',
        inputValue: webcamFrameRate,
      },
      ...webcamFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> microphones

  // page 2 -> specifications -> microphones -> microphone fields user defined -> form review objs
  const microphoneFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFields: microphoneFieldsAdditionalMap,
      areAdditionalFieldsValid: areMicrophoneFieldsAdditionalMapValid,
    });

  const page2MicrophoneFormReviewObject: FormReviewObjectArray = {
    'Microphone Specifications': [
      {
        inputName: 'Microphone Type',
        inputValue: microphoneType,
      },
      {
        inputName: 'Microphone Color',
        inputValue: microphoneColor,
        isInputValueValid: isMicrophoneColorValid,
      },
      {
        inputName: 'Microphone Interface',
        inputValue: microphoneInterface,
      },
      {
        inputName: 'Microphone Polar Pattern',
        inputValue: microphonePolarPattern,
      },
      {
        inputName: 'Microphone Frequency Response',
        inputValue: microphoneFrequencyResponse,
        isInputValueValid: isMicrophoneFrequencyResponseValid,
      },
      ...microphoneFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // page 2 -> specifications -> desktop computers
  const page2DesktopComputerFormReviewObject: FormReviewObjectArray = {
    ...page2CpuFormReviewObject,
    ...page2GpuFormReviewObject,
    ...page2MotherboardFormReviewObject,
    ...page2RamFormReviewObject,
    ...page2StorageFormReviewObject,
    ...page2PowerSupplyFormReviewObject,
    ...page2ComputerCaseFormReviewObject,
    ...page2DisplayFormReviewObject,
    ...page2KeyboardFormReviewObject,
    ...page2MouseFormReviewObject,
    ...page2SpeakerFormReviewObject,
  };

  // page 2 -> specifications -> laptop computers
  const page2LaptopComputerFormReviewObject: FormReviewObjectArray = {
    ...page2CpuFormReviewObject,
    ...page2GpuFormReviewObject,
    ...page2RamFormReviewObject,
    ...page2StorageFormReviewObject,
  };

  const page3ImageUploadsFormReviewObject: FormReviewObjectArray = {
    'Upload Images': [
      {
        inputName: 'Images',
        inputValue: stepsInError.has(2) ? 'Error' : 'Valid',
        isInputValueValid: !stepsInError.has(2),
      },
    ],
  };

  const CREATE_PRODUCT_FORM_REVIEW_OBJECTS: FormReviewObjectArray = {
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
      : productCategory === 'Displays'
      ? page2DisplayFormReviewObject
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
      : productCategory === 'Tablets'
      ? page2TabletFormReviewObject
      : productCategory === 'Webcams'
      ? page2WebcamFormReviewObject
      : page2MicrophoneFormReviewObject),
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

  //
  //
  //
  //
  //
  //

  // // product category select input
  // const [createdProductCategorySelectInput] =
  //   returnAccessibleSelectInputElements([
  //     {
  //       data: PRODUCT_CATEGORIES,
  //       description: '',
  //       label: 'Product Category',
  //       onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
  //         selectProductCategoryDispatch(
  //           event.currentTarget.value as ProductCategory
  //         );
  //         navigate(
  //           `/home/dashboard/product/create/${event.currentTarget.value}`
  //         );
  //       },
  //       value: productCategory,
  //       required: true,
  //     },
  //   ]);

  // return (
  //   <Stack w="100%">
  //     {createdProductCategorySelectInput}
  //     <Outlet />
  //   </Stack>
  // );
}

export default CreateProduct;
