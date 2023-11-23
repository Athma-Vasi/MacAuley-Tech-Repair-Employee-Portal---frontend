import { Group, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InvalidTokenError } from 'jwt-decode';
import { ChangeEvent, MouseEvent, useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { TbUpload } from 'react-icons/tb';
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
  returnDimensionsValidationText,
  returnFloatAmountValidationText,
  returnFormReviewObjectsFromUserDefinedFields,
  returnGrammarValidationText,
  returnLargeIntegerValidationText,
  returnSerialIdValidationText,
  returnThemeColors,
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
import { FormLayoutWrapper, StepperWrapper } from '../../wrappers';
import {
  BRAND_REGEX,
  CREATE_PRODUCT_DESCRIPTION_OBJECTS,
  CREATE_PRODUCT_MAX_IMG_AMOUNT,
  CREATE_PRODUCT_MAX_IMG_SIZE,
  CREATE_PRODUCT_MAX_STEPPER_POSITION,
  DIMENSION_UNIT_SELECT_INPUT_DATA,
  DIMENSIONS_REGEX,
  LARGE_INTEGER_REGEX,
  PRODUCT_AVAILABILITY_DATA,
  WEIGHT_REGEX,
  WEIGHT_UNIT_SELECT_INPUT_DATA,
} from '../constants';
import CreateAccessory from './productCategory/CreateAccessory';
import CreateCase from './productCategory/CreateCase';
import CreateCpu from './productCategory/CreateCpu';
import CreateDesktopComputer from './productCategory/CreateDesktopComputer';
import CreateDisplay from './productCategory/CreateDisplay';
import CreateGpu from './productCategory/CreateGpu';
import CreateHeadphone from './productCategory/CreateHeadphone';
import CreateKeyboard from './productCategory/CreateKeyboard';
import CreateLaptop from './productCategory/CreateLaptop';
import CreateMicrophone from './productCategory/CreateMicrophone';
import CreateMotherboard from './productCategory/CreateMotherboard';
import CreateMouse from './productCategory/CreateMouse';
import CreatePsu from './productCategory/CreatePsu';
import CreateRam from './productCategory/CreateRam';
import CreateSmartphone from './productCategory/CreateSmartphone';
import CreateSpeaker from './productCategory/CreateSpeaker';
import CreateStorage from './productCategory/CreateStorage';
import CreateTablet from './productCategory/CreateTablet';
import CreateWebcam from './productCategory/CreateWebcam';
import { createProductReducer } from './reducers';
import { createProductAction, initialCreateProductState } from './state';
import {
  DimensionUnit,
  ProductAvailability,
  ProductDocument,
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
            productCategory === 'Accessory'
              ? { accessory: accessoryRequestBody }
              : productCategory === 'Desktop Computer'
              ? { desktopComputer: desktopComputerRequestBody }
              : productCategory === 'Laptop'
              ? { laptop: laptopRequestBody }
              : productCategory === 'Central Processing Unit (CPU)'
              ? { cpu: cpuRequestBody }
              : productCategory === 'Computer Case'
              ? { case: caseRequestBody }
              : productCategory === 'Graphics Processing Unit (GPU)'
              ? { gpu: gpuRequestBody }
              : productCategory === 'Headphone'
              ? { headphone: headphoneRequestBody }
              : productCategory === 'Keyboard'
              ? { keyboard: keyboardRequestBody }
              : productCategory === 'Memory (RAM)'
              ? { ram: ramRequestBody }
              : productCategory === 'Mouse'
              ? { mouse: mouseRequestBody }
              : productCategory === 'Display'
              ? { display: displayRequestBody }
              : productCategory === 'Motherboard'
              ? { motherboard: motherboardRequestBody }
              : productCategory === 'Power Supply Unit (PSU)'
              ? { psu: psuRequestBody }
              : productCategory === 'Smartphone'
              ? { smartphone: smartphoneRequestBody }
              : productCategory === 'Speaker'
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
          payload: event.currentTarget.value as ProductAvailability,
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

  // page 4 -> submit button -> with tooltip
  const createdSubmitButtonWithTooltip =
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

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

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

  const displaySelectedProductCategoryInputs =
    productCategory === 'Accessory' ? (
      <CreateAccessory
        accessoryColor={accessoryColor}
        accessoryFieldsAdditionalMap={accessoryFieldsAdditionalMap}
        accessoryInterface={accessoryInterface}
        accessoryType={accessoryType}
        areAccessoryFieldsAdditionalMapFocused={
          areAccessoryFieldsAdditionalMapFocused
        }
        areAccessoryFieldsAdditionalMapValid={
          areAccessoryFieldsAdditionalMapValid
        }
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        isAccessoryColorFocused={isAccessoryColorFocused}
        isAccessoryColorValid={isAccessoryColorValid}
        isAccessoryTypeFocused={isAccessoryTypeFocused}
        isAccessoryTypeValid={isAccessoryTypeValid}
        padding={padding}
      />
    ) : productCategory === 'Central Processing Unit (CPU)' ? (
      <CreateCpu
        areCpuFieldsAdditionalMapFocused={areCpuFieldsAdditionalMapFocused}
        areCpuFieldsAdditionalMapValid={areCpuFieldsAdditionalMapValid}
        borderColor={borderColor}
        cpuCores={cpuCores}
        cpuFieldsAdditionalMap={cpuFieldsAdditionalMap}
        cpuFrequency={cpuFrequency}
        cpuL1CacheCapacity={cpuL1CacheCapacity}
        cpuL1CacheCapacityUnit={cpuL1CacheCapacityUnit}
        cpuL2CacheCapacity={cpuL2CacheCapacity}
        cpuL2CacheCapacityUnit={cpuL2CacheCapacityUnit}
        cpuL3CacheCapacity={cpuL3CacheCapacity}
        cpuL3CacheCapacityUnit={cpuL3CacheCapacityUnit}
        cpuSocket={cpuSocket}
        cpuWattage={cpuWattage}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        isCpuCoresFocused={isCpuCoresFocused}
        isCpuCoresValid={isCpuCoresValid}
        isCpuFrequencyFocused={isCpuFrequencyFocused}
        isCpuFrequencyValid={isCpuFrequencyValid}
        isCpuL1CacheCapacityFocused={isCpuL1CacheCapacityFocused}
        isCpuL1CacheCapacityValid={isCpuL1CacheCapacityValid}
        isCpuL2CacheCapacityFocused={isCpuL2CacheCapacityFocused}
        isCpuL2CacheCapacityValid={isCpuL2CacheCapacityValid}
        isCpuL3CacheCapacityFocused={isCpuL3CacheCapacityFocused}
        isCpuL3CacheCapacityValid={isCpuL3CacheCapacityValid}
        isCpuSocketFocused={isCpuSocketFocused}
        isCpuSocketValid={isCpuSocketValid}
        isCpuWattageFocused={isCpuWattageFocused}
        isCpuWattageValid={isCpuWattageValid}
        padding={padding}
      />
    ) : productCategory === 'Computer Case' ? (
      <CreateCase
        areCaseFieldsAdditionalMapFocused={areCaseFieldsAdditionalMapFocused}
        areCaseFieldsAdditionalMapValid={areCaseFieldsAdditionalMapValid}
        borderColor={borderColor}
        caseColor={caseColor}
        caseFieldsAdditionalMap={caseFieldsAdditionalMap}
        caseSidePanel={caseSidePanel}
        caseType={caseType}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        isCaseColorFocused={isCaseColorFocused}
        isCaseColorValid={isCaseColorValid}
        padding={padding}
      />
    ) : productCategory === 'Desktop Computer' ? (
      <CreateDesktopComputer
        // case
        areCaseFieldsAdditionalMapFocused={areCaseFieldsAdditionalMapFocused}
        areCaseFieldsAdditionalMapValid={areCaseFieldsAdditionalMapValid}
        caseColor={caseColor}
        caseFieldsAdditionalMap={caseFieldsAdditionalMap}
        caseSidePanel={caseSidePanel}
        caseType={caseType}
        isCaseColorFocused={isCaseColorFocused}
        isCaseColorValid={isCaseColorValid}
        // cpu
        isCpuWattageValid={isCpuWattageValid}
        isCpuWattageFocused={isCpuWattageFocused}
        isCpuSocketValid={isCpuSocketValid}
        isCpuSocketFocused={isCpuSocketFocused}
        isCpuL3CacheCapacityValid={isCpuL3CacheCapacityValid}
        isCpuL3CacheCapacityFocused={isCpuL3CacheCapacityFocused}
        isCpuL2CacheCapacityValid={isCpuL2CacheCapacityValid}
        isCpuL2CacheCapacityFocused={isCpuL2CacheCapacityFocused}
        isCpuL1CacheCapacityValid={isCpuL1CacheCapacityValid}
        isCpuL1CacheCapacityFocused={isCpuL1CacheCapacityFocused}
        isCpuFrequencyValid={isCpuFrequencyValid}
        isCpuFrequencyFocused={isCpuFrequencyFocused}
        isCpuCoresValid={isCpuCoresValid}
        isCpuCoresFocused={isCpuCoresFocused}
        cpuWattage={cpuWattage}
        cpuSocket={cpuSocket}
        cpuL3CacheCapacityUnit={cpuL3CacheCapacityUnit}
        cpuL3CacheCapacity={cpuL3CacheCapacity}
        cpuL2CacheCapacityUnit={cpuL2CacheCapacityUnit}
        cpuL2CacheCapacity={cpuL2CacheCapacity}
        cpuL1CacheCapacityUnit={cpuL1CacheCapacityUnit}
        cpuL1CacheCapacity={cpuL1CacheCapacity}
        cpuFrequency={cpuFrequency}
        cpuFieldsAdditionalMap={cpuFieldsAdditionalMap}
        cpuCores={cpuCores}
        areCpuFieldsAdditionalMapValid={areCpuFieldsAdditionalMapValid}
        areCpuFieldsAdditionalMapFocused={areCpuFieldsAdditionalMapFocused}
        areDisplayFieldsAdditionalMapFocused={
          areDisplayFieldsAdditionalMapFocused
        }
        // display
        areDisplayFieldsAdditionalMapValid={areDisplayFieldsAdditionalMapValid}
        displayAspectRatio={displayAspectRatio}
        displayFieldsAdditionalMap={displayFieldsAdditionalMap}
        displayPanelType={displayPanelType}
        displayRefreshRate={displayRefreshRate}
        displayResolutionHorizontal={displayResolutionHorizontal}
        displayResolutionVertical={displayResolutionVertical}
        displayResponseTime={displayResponseTime}
        displaySize={displaySize}
        isDisplayAspectRatioFocused={isDisplayAspectRatioFocused}
        isDisplayAspectRatioValid={isDisplayAspectRatioValid}
        isDisplayRefreshRateFocused={isDisplayRefreshRateFocused}
        isDisplayRefreshRateValid={isDisplayRefreshRateValid}
        isDisplayResolutionHorizontalFocused={
          isDisplayResolutionHorizontalFocused
        }
        isDisplayResolutionHorizontalValid={isDisplayResolutionHorizontalValid}
        isDisplayResolutionVerticalFocused={isDisplayResolutionVerticalFocused}
        isDisplayResolutionVerticalValid={isDisplayResolutionVerticalValid}
        isDisplayResponseTimeFocused={isDisplayResponseTimeFocused}
        isDisplayResponseTimeValid={isDisplayResponseTimeValid}
        isDisplaySizeFocused={isDisplaySizeFocused}
        isDisplaySizeValid={isDisplaySizeValid}
        // gpu
        areGpuFieldsAdditionalMapFocused={areGpuFieldsAdditionalMapFocused}
        areGpuFieldsAdditionalMapValid={areGpuFieldsAdditionalMapValid}
        gpuBoostClock={gpuBoostClock}
        gpuChipset={gpuChipset}
        gpuCoreClock={gpuCoreClock}
        gpuFieldsAdditionalMap={gpuFieldsAdditionalMap}
        gpuMemoryCapacity={gpuMemoryCapacity}
        gpuMemoryCapacityUnit={gpuMemoryCapacityUnit}
        gpuTdp={gpuTdp}
        isGpuBoostClockFocused={isGpuBoostClockFocused}
        isGpuBoostClockValid={isGpuBoostClockValid}
        isGpuChipsetFocused={isGpuChipsetFocused}
        isGpuChipsetValid={isGpuChipsetValid}
        isGpuCoreClockFocused={isGpuCoreClockFocused}
        isGpuCoreClockValid={isGpuCoreClockValid}
        isGpuMemoryCapacityFocused={isGpuMemoryCapacityFocused}
        isGpuMemoryCapacityValid={isGpuMemoryCapacityValid}
        isGpuTdpFocused={isGpuTdpFocused}
        isGpuTdpValid={isGpuTdpValid}
        // keyboard
        areKeyboardFieldsAdditionalMapFocused={
          areKeyboardFieldsAdditionalMapFocused
        }
        areKeyboardFieldsAdditionalMapValid={
          areKeyboardFieldsAdditionalMapValid
        }
        keyboardBacklight={keyboardBacklight}
        keyboardFieldsAdditionalMap={keyboardFieldsAdditionalMap}
        keyboardInterface={keyboardInterface}
        keyboardLayout={keyboardLayout}
        keyboardSwitch={keyboardSwitch}
        // motherboard
        areMotherboardFieldsAdditionalMapFocused={
          areMotherboardFieldsAdditionalMapFocused
        }
        areMotherboardFieldsAdditionalMapValid={
          areMotherboardFieldsAdditionalMapValid
        }
        isMotherboardChipsetFocused={isMotherboardChipsetFocused}
        isMotherboardChipsetValid={isMotherboardChipsetValid}
        isMotherboardM2SlotsFocused={isMotherboardM2SlotsFocused}
        isMotherboardM2SlotsValid={isMotherboardM2SlotsValid}
        isMotherboardMemoryMaxCapacityFocused={
          isMotherboardMemoryMaxCapacityFocused
        }
        isMotherboardMemoryMaxCapacityValid={
          isMotherboardMemoryMaxCapacityValid
        }
        isMotherboardMemorySlotsFocused={isMotherboardMemorySlotsFocused}
        isMotherboardMemorySlotsValid={isMotherboardMemorySlotsValid}
        isMotherboardPcie3SlotsFocused={isMotherboardPcie3SlotsFocused}
        isMotherboardPcie3SlotsValid={isMotherboardPcie3SlotsValid}
        isMotherboardPcie4SlotsFocused={isMotherboardPcie4SlotsFocused}
        isMotherboardPcie4SlotsValid={isMotherboardPcie4SlotsValid}
        isMotherboardPcie5SlotsFocused={isMotherboardPcie5SlotsFocused}
        isMotherboardPcie5SlotsValid={isMotherboardPcie5SlotsValid}
        isMotherboardSataPortsFocused={isMotherboardSataPortsFocused}
        isMotherboardSataPortsValid={isMotherboardSataPortsValid}
        isMotherboardSocketFocused={isMotherboardSocketFocused}
        isMotherboardSocketValid={isMotherboardSocketValid}
        motherboardChipset={motherboardChipset}
        motherboardFieldsAdditionalMap={motherboardFieldsAdditionalMap}
        motherboardFormFactor={motherboardFormFactor}
        motherboardM2Slots={motherboardM2Slots}
        motherboardMemoryMaxCapacity={motherboardMemoryMaxCapacity}
        motherboardMemoryMaxCapacityUnit={motherboardMemoryMaxCapacityUnit}
        motherboardMemorySlots={motherboardMemorySlots}
        motherboardMemoryType={motherboardMemoryType}
        motherboardPcie3Slots={motherboardPcie3Slots}
        motherboardPcie4Slots={motherboardPcie4Slots}
        motherboardPcie5Slots={motherboardPcie5Slots}
        motherboardSataPorts={motherboardSataPorts}
        motherboardSocket={motherboardSocket}
        // mouse
        areMouseFieldsAdditionalMapFocused={areMouseFieldsAdditionalMapFocused}
        areMouseFieldsAdditionalMapValid={areMouseFieldsAdditionalMapValid}
        isMouseButtonsFocused={isMouseButtonsFocused}
        isMouseButtonsValid={isMouseButtonsValid}
        isMouseColorFocused={isMouseColorFocused}
        isMouseColorValid={isMouseColorValid}
        isMouseDpiFocused={isMouseDpiFocused}
        isMouseDpiValid={isMouseDpiValid}
        mouseButtons={mouseButtons}
        mouseColor={mouseColor}
        mouseDpi={mouseDpi}
        mouseFieldsAdditionalMap={mouseFieldsAdditionalMap}
        mouseInterface={mouseInterface}
        mouseSensor={mouseSensor}
        // psu
        arePsuFieldsAdditionalMapFocused={arePsuFieldsAdditionalMapFocused}
        arePsuFieldsAdditionalMapValid={arePsuFieldsAdditionalMapValid}
        isPsuWattageFocused={isPsuWattageFocused}
        isPsuWattageValid={isPsuWattageValid}
        psuEfficiency={psuEfficiency}
        psuFieldsAdditionalMap={psuFieldsAdditionalMap}
        psuFormFactor={psuFormFactor}
        psuModularity={psuModularity}
        psuWattage={psuWattage}
        // ram
        areRamFieldsAdditionalMapFocused={areRamFieldsAdditionalMapFocused}
        areRamFieldsAdditionalMapValid={areRamFieldsAdditionalMapValid}
        isRamColorFocused={isRamColorFocused}
        isRamColorValid={isRamColorValid}
        isRamDataRateFocused={isRamDataRateFocused}
        isRamDataRateValid={isRamDataRateValid}
        isRamModulesCapacityFocused={isRamModulesCapacityFocused}
        isRamModulesCapacityValid={isRamModulesCapacityValid}
        isRamModulesQuantityFocused={isRamModulesQuantityFocused}
        isRamModulesQuantityValid={isRamModulesQuantityValid}
        isRamTimingFocused={isRamTimingFocused}
        isRamTimingValid={isRamTimingValid}
        isRamVoltageFocused={isRamVoltageFocused}
        isRamVoltageValid={isRamVoltageValid}
        ramColor={ramColor}
        ramDataRate={ramDataRate}
        ramFieldsAdditionalMap={ramFieldsAdditionalMap}
        ramModulesCapacity={ramModulesCapacity}
        ramModulesCapacityUnit={ramModulesCapacityUnit}
        ramModulesQuantity={ramModulesQuantity}
        ramTiming={ramTiming}
        ramType={ramType}
        ramVoltage={ramVoltage}
        // speaker
        areSpeakerFieldsAdditionalMapFocused={
          areSpeakerFieldsAdditionalMapFocused
        }
        areSpeakerFieldsAdditionalMapValid={areSpeakerFieldsAdditionalMapValid}
        isSpeakerColorFocused={isSpeakerColorFocused}
        isSpeakerColorValid={isSpeakerColorValid}
        isSpeakerFrequencyResponseFocused={isSpeakerFrequencyResponseFocused}
        isSpeakerFrequencyResponseValid={isSpeakerFrequencyResponseValid}
        isSpeakerTotalWattageFocused={isSpeakerTotalWattageFocused}
        isSpeakerTotalWattageValid={isSpeakerTotalWattageValid}
        speakerColor={speakerColor}
        speakerFieldsAdditionalMap={speakerFieldsAdditionalMap}
        speakerFrequencyResponse={speakerFrequencyResponse}
        speakerInterface={speakerInterface}
        speakerTotalWattage={speakerTotalWattage}
        speakerType={speakerType}
        // storage
        areStorageFieldsAdditionalMapFocused={
          areStorageFieldsAdditionalMapFocused
        }
        areStorageFieldsAdditionalMapValid={areStorageFieldsAdditionalMapValid}
        isStorageCacheCapacityFocused={isStorageCacheCapacityFocused}
        isStorageCacheCapacityValid={isStorageCacheCapacityValid}
        isStorageCapacityFocused={isStorageCapacityFocused}
        isStorageCapacityValid={isStorageCapacityValid}
        storageCacheCapacity={storageCacheCapacity}
        storageCacheCapacityUnit={storageCacheCapacityUnit}
        storageCapacity={storageCapacity}
        storageCapacityUnit={storageCapacityUnit}
        storageFieldsAdditionalMap={storageFieldsAdditionalMap}
        storageFormFactor={storageFormFactor}
        storageInterface={storageInterface}
        storageType={storageType}
        // misc.
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        padding={padding}
      />
    ) : productCategory === 'Display' ? (
      <CreateDisplay
        areDisplayFieldsAdditionalMapFocused={
          areDisplayFieldsAdditionalMapFocused
        }
        areDisplayFieldsAdditionalMapValid={areDisplayFieldsAdditionalMapValid}
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        displayAspectRatio={displayAspectRatio}
        displayFieldsAdditionalMap={displayFieldsAdditionalMap}
        displayPanelType={displayPanelType}
        displayRefreshRate={displayRefreshRate}
        displayResolutionHorizontal={displayResolutionHorizontal}
        displayResolutionVertical={displayResolutionVertical}
        displayResponseTime={displayResponseTime}
        displaySize={displaySize}
        isDisplayAspectRatioFocused={isDisplayAspectRatioFocused}
        isDisplayAspectRatioValid={isDisplayAspectRatioValid}
        isDisplayRefreshRateFocused={isDisplayRefreshRateFocused}
        isDisplayRefreshRateValid={isDisplayRefreshRateValid}
        isDisplayResolutionHorizontalFocused={
          isDisplayResolutionHorizontalFocused
        }
        isDisplayResolutionHorizontalValid={isDisplayResolutionHorizontalValid}
        isDisplayResolutionVerticalFocused={isDisplayResolutionVerticalFocused}
        isDisplayResolutionVerticalValid={isDisplayResolutionVerticalValid}
        isDisplayResponseTimeFocused={isDisplayResponseTimeFocused}
        isDisplayResponseTimeValid={isDisplayResponseTimeValid}
        isDisplaySizeFocused={isDisplaySizeFocused}
        isDisplaySizeValid={isDisplaySizeValid}
        padding={padding}
      />
    ) : productCategory === 'Graphics Processing Unit (GPU)' ? (
      <CreateGpu
        areGpuFieldsAdditionalMapFocused={areGpuFieldsAdditionalMapFocused}
        areGpuFieldsAdditionalMapValid={areGpuFieldsAdditionalMapValid}
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        gpuBoostClock={gpuBoostClock}
        gpuChipset={gpuChipset}
        gpuCoreClock={gpuCoreClock}
        gpuFieldsAdditionalMap={gpuFieldsAdditionalMap}
        gpuMemoryCapacity={gpuMemoryCapacity}
        gpuMemoryCapacityUnit={gpuMemoryCapacityUnit}
        gpuTdp={gpuTdp}
        isGpuBoostClockFocused={isGpuBoostClockFocused}
        isGpuBoostClockValid={isGpuBoostClockValid}
        isGpuChipsetFocused={isGpuChipsetFocused}
        isGpuChipsetValid={isGpuChipsetValid}
        isGpuCoreClockFocused={isGpuCoreClockFocused}
        isGpuCoreClockValid={isGpuCoreClockValid}
        isGpuMemoryCapacityFocused={isGpuMemoryCapacityFocused}
        isGpuMemoryCapacityValid={isGpuMemoryCapacityValid}
        isGpuTdpFocused={isGpuTdpFocused}
        isGpuTdpValid={isGpuTdpValid}
        padding={padding}
      />
    ) : productCategory === 'Headphone' ? (
      <CreateHeadphone
        areHeadphoneFieldsAdditionalMapFocused={
          areHeadphoneFieldsAdditionalMapFocused
        }
        areHeadphoneFieldsAdditionalMapValid={
          areHeadphoneFieldsAdditionalMapValid
        }
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        headphoneColor={headphoneColor}
        headphoneDriver={headphoneDriver}
        headphoneFieldsAdditionalMap={headphoneFieldsAdditionalMap}
        headphoneFrequencyResponse={headphoneFrequencyResponse}
        headphoneImpedance={headphoneImpedance}
        headphoneInterface={headphoneInterface}
        headphoneType={headphoneType}
        isHeadphoneColorFocused={isHeadphoneColorFocused}
        isHeadphoneColorValid={isHeadphoneColorValid}
        isHeadphoneDriverFocused={isHeadphoneDriverFocused}
        isHeadphoneDriverValid={isHeadphoneDriverValid}
        isHeadphoneFrequencyResponseFocused={
          isHeadphoneFrequencyResponseFocused
        }
        isHeadphoneFrequencyResponseValid={isHeadphoneFrequencyResponseValid}
        isHeadphoneImpedanceFocused={isHeadphoneImpedanceFocused}
        isHeadphoneImpedanceValid={isHeadphoneImpedanceValid}
        padding={padding}
      />
    ) : productCategory === 'Keyboard' ? (
      <CreateKeyboard
        areKeyboardFieldsAdditionalMapFocused={
          areKeyboardFieldsAdditionalMapFocused
        }
        areKeyboardFieldsAdditionalMapValid={
          areKeyboardFieldsAdditionalMapValid
        }
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        keyboardBacklight={keyboardBacklight}
        keyboardFieldsAdditionalMap={keyboardFieldsAdditionalMap}
        keyboardInterface={keyboardInterface}
        keyboardLayout={keyboardLayout}
        keyboardSwitch={keyboardSwitch}
        padding={padding}
      />
    ) : productCategory === 'Laptop' ? (
      <CreateLaptop
        // cpu
        isCpuWattageValid={isCpuWattageValid}
        isCpuWattageFocused={isCpuWattageFocused}
        isCpuSocketValid={isCpuSocketValid}
        isCpuSocketFocused={isCpuSocketFocused}
        isCpuL3CacheCapacityValid={isCpuL3CacheCapacityValid}
        isCpuL3CacheCapacityFocused={isCpuL3CacheCapacityFocused}
        isCpuL2CacheCapacityValid={isCpuL2CacheCapacityValid}
        isCpuL2CacheCapacityFocused={isCpuL2CacheCapacityFocused}
        isCpuL1CacheCapacityValid={isCpuL1CacheCapacityValid}
        isCpuL1CacheCapacityFocused={isCpuL1CacheCapacityFocused}
        isCpuFrequencyValid={isCpuFrequencyValid}
        isCpuFrequencyFocused={isCpuFrequencyFocused}
        isCpuCoresValid={isCpuCoresValid}
        isCpuCoresFocused={isCpuCoresFocused}
        cpuWattage={cpuWattage}
        cpuSocket={cpuSocket}
        cpuL3CacheCapacityUnit={cpuL3CacheCapacityUnit}
        cpuL3CacheCapacity={cpuL3CacheCapacity}
        cpuL2CacheCapacityUnit={cpuL2CacheCapacityUnit}
        cpuL2CacheCapacity={cpuL2CacheCapacity}
        cpuL1CacheCapacityUnit={cpuL1CacheCapacityUnit}
        cpuL1CacheCapacity={cpuL1CacheCapacity}
        cpuFrequency={cpuFrequency}
        cpuFieldsAdditionalMap={cpuFieldsAdditionalMap}
        cpuCores={cpuCores}
        areCpuFieldsAdditionalMapValid={areCpuFieldsAdditionalMapValid}
        areCpuFieldsAdditionalMapFocused={areCpuFieldsAdditionalMapFocused}
        areDisplayFieldsAdditionalMapFocused={
          areDisplayFieldsAdditionalMapFocused
        }
        // display
        areDisplayFieldsAdditionalMapValid={areDisplayFieldsAdditionalMapValid}
        displayAspectRatio={displayAspectRatio}
        displayFieldsAdditionalMap={displayFieldsAdditionalMap}
        displayPanelType={displayPanelType}
        displayRefreshRate={displayRefreshRate}
        displayResolutionHorizontal={displayResolutionHorizontal}
        displayResolutionVertical={displayResolutionVertical}
        displayResponseTime={displayResponseTime}
        displaySize={displaySize}
        isDisplayAspectRatioFocused={isDisplayAspectRatioFocused}
        isDisplayAspectRatioValid={isDisplayAspectRatioValid}
        isDisplayRefreshRateFocused={isDisplayRefreshRateFocused}
        isDisplayRefreshRateValid={isDisplayRefreshRateValid}
        isDisplayResolutionHorizontalFocused={
          isDisplayResolutionHorizontalFocused
        }
        isDisplayResolutionHorizontalValid={isDisplayResolutionHorizontalValid}
        isDisplayResolutionVerticalFocused={isDisplayResolutionVerticalFocused}
        isDisplayResolutionVerticalValid={isDisplayResolutionVerticalValid}
        isDisplayResponseTimeFocused={isDisplayResponseTimeFocused}
        isDisplayResponseTimeValid={isDisplayResponseTimeValid}
        isDisplaySizeFocused={isDisplaySizeFocused}
        isDisplaySizeValid={isDisplaySizeValid}
        // gpu
        areGpuFieldsAdditionalMapFocused={areGpuFieldsAdditionalMapFocused}
        areGpuFieldsAdditionalMapValid={areGpuFieldsAdditionalMapValid}
        gpuBoostClock={gpuBoostClock}
        gpuChipset={gpuChipset}
        gpuCoreClock={gpuCoreClock}
        gpuFieldsAdditionalMap={gpuFieldsAdditionalMap}
        gpuMemoryCapacity={gpuMemoryCapacity}
        gpuMemoryCapacityUnit={gpuMemoryCapacityUnit}
        gpuTdp={gpuTdp}
        isGpuBoostClockFocused={isGpuBoostClockFocused}
        isGpuBoostClockValid={isGpuBoostClockValid}
        isGpuChipsetFocused={isGpuChipsetFocused}
        isGpuChipsetValid={isGpuChipsetValid}
        isGpuCoreClockFocused={isGpuCoreClockFocused}
        isGpuCoreClockValid={isGpuCoreClockValid}
        isGpuMemoryCapacityFocused={isGpuMemoryCapacityFocused}
        isGpuMemoryCapacityValid={isGpuMemoryCapacityValid}
        isGpuTdpFocused={isGpuTdpFocused}
        isGpuTdpValid={isGpuTdpValid}
        // ram
        areRamFieldsAdditionalMapFocused={areRamFieldsAdditionalMapFocused}
        areRamFieldsAdditionalMapValid={areRamFieldsAdditionalMapValid}
        isRamColorFocused={isRamColorFocused}
        isRamColorValid={isRamColorValid}
        isRamDataRateFocused={isRamDataRateFocused}
        isRamDataRateValid={isRamDataRateValid}
        isRamModulesCapacityFocused={isRamModulesCapacityFocused}
        isRamModulesCapacityValid={isRamModulesCapacityValid}
        isRamModulesQuantityFocused={isRamModulesQuantityFocused}
        isRamModulesQuantityValid={isRamModulesQuantityValid}
        isRamTimingFocused={isRamTimingFocused}
        isRamTimingValid={isRamTimingValid}
        isRamVoltageFocused={isRamVoltageFocused}
        isRamVoltageValid={isRamVoltageValid}
        ramColor={ramColor}
        ramDataRate={ramDataRate}
        ramFieldsAdditionalMap={ramFieldsAdditionalMap}
        ramModulesCapacity={ramModulesCapacity}
        ramModulesCapacityUnit={ramModulesCapacityUnit}
        ramModulesQuantity={ramModulesQuantity}
        ramTiming={ramTiming}
        ramType={ramType}
        ramVoltage={ramVoltage}
        // storage
        areStorageFieldsAdditionalMapFocused={
          areStorageFieldsAdditionalMapFocused
        }
        areStorageFieldsAdditionalMapValid={areStorageFieldsAdditionalMapValid}
        isStorageCacheCapacityFocused={isStorageCacheCapacityFocused}
        isStorageCacheCapacityValid={isStorageCacheCapacityValid}
        isStorageCapacityFocused={isStorageCapacityFocused}
        isStorageCapacityValid={isStorageCapacityValid}
        storageCacheCapacity={storageCacheCapacity}
        storageCacheCapacityUnit={storageCacheCapacityUnit}
        storageCapacity={storageCapacity}
        storageCapacityUnit={storageCapacityUnit}
        storageFieldsAdditionalMap={storageFieldsAdditionalMap}
        storageFormFactor={storageFormFactor}
        storageInterface={storageInterface}
        storageType={storageType}
        // misc.
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        padding={padding}
      />
    ) : productCategory === 'Memory (RAM)' ? (
      <CreateRam
        areRamFieldsAdditionalMapFocused={areRamFieldsAdditionalMapFocused}
        areRamFieldsAdditionalMapValid={areRamFieldsAdditionalMapValid}
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        isRamColorFocused={isRamColorFocused}
        isRamColorValid={isRamColorValid}
        isRamDataRateFocused={isRamDataRateFocused}
        isRamDataRateValid={isRamDataRateValid}
        isRamModulesCapacityFocused={isRamModulesCapacityFocused}
        isRamModulesCapacityValid={isRamModulesCapacityValid}
        isRamModulesQuantityFocused={isRamModulesQuantityFocused}
        isRamModulesQuantityValid={isRamModulesQuantityValid}
        isRamTimingFocused={isRamTimingFocused}
        isRamTimingValid={isRamTimingValid}
        isRamVoltageFocused={isRamVoltageFocused}
        isRamVoltageValid={isRamVoltageValid}
        padding={padding}
        ramColor={ramColor}
        ramDataRate={ramDataRate}
        ramFieldsAdditionalMap={ramFieldsAdditionalMap}
        ramModulesCapacity={ramModulesCapacity}
        ramModulesCapacityUnit={ramModulesCapacityUnit}
        ramModulesQuantity={ramModulesQuantity}
        ramTiming={ramTiming}
        ramType={ramType}
        ramVoltage={ramVoltage}
      />
    ) : productCategory === 'Mouse' ? (
      <CreateMouse
        areMouseFieldsAdditionalMapFocused={areMouseFieldsAdditionalMapFocused}
        areMouseFieldsAdditionalMapValid={areMouseFieldsAdditionalMapValid}
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        isMouseButtonsFocused={isMouseButtonsFocused}
        isMouseButtonsValid={isMouseButtonsValid}
        isMouseColorFocused={isMouseColorFocused}
        isMouseColorValid={isMouseColorValid}
        isMouseDpiFocused={isMouseDpiFocused}
        isMouseDpiValid={isMouseDpiValid}
        mouseButtons={mouseButtons}
        mouseColor={mouseColor}
        mouseDpi={mouseDpi}
        mouseFieldsAdditionalMap={mouseFieldsAdditionalMap}
        mouseInterface={mouseInterface}
        mouseSensor={mouseSensor}
        padding={padding}
      />
    ) : productCategory === 'Motherboard' ? (
      <CreateMotherboard
        areMotherboardFieldsAdditionalMapFocused={
          areMotherboardFieldsAdditionalMapFocused
        }
        areMotherboardFieldsAdditionalMapValid={
          areMotherboardFieldsAdditionalMapValid
        }
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        isMotherboardChipsetFocused={isMotherboardChipsetFocused}
        isMotherboardChipsetValid={isMotherboardChipsetValid}
        isMotherboardM2SlotsFocused={isMotherboardM2SlotsFocused}
        isMotherboardM2SlotsValid={isMotherboardM2SlotsValid}
        isMotherboardMemoryMaxCapacityFocused={
          isMotherboardMemoryMaxCapacityFocused
        }
        isMotherboardMemoryMaxCapacityValid={
          isMotherboardMemoryMaxCapacityValid
        }
        isMotherboardMemorySlotsFocused={isMotherboardMemorySlotsFocused}
        isMotherboardMemorySlotsValid={isMotherboardMemorySlotsValid}
        isMotherboardPcie3SlotsFocused={isMotherboardPcie3SlotsFocused}
        isMotherboardPcie3SlotsValid={isMotherboardPcie3SlotsValid}
        isMotherboardPcie4SlotsFocused={isMotherboardPcie4SlotsFocused}
        isMotherboardPcie4SlotsValid={isMotherboardPcie4SlotsValid}
        isMotherboardPcie5SlotsFocused={isMotherboardPcie5SlotsFocused}
        isMotherboardPcie5SlotsValid={isMotherboardPcie5SlotsValid}
        isMotherboardSataPortsFocused={isMotherboardSataPortsFocused}
        isMotherboardSataPortsValid={isMotherboardSataPortsValid}
        isMotherboardSocketFocused={isMotherboardSocketFocused}
        isMotherboardSocketValid={isMotherboardSocketValid}
        motherboardChipset={motherboardChipset}
        motherboardFieldsAdditionalMap={motherboardFieldsAdditionalMap}
        motherboardFormFactor={motherboardFormFactor}
        motherboardM2Slots={motherboardM2Slots}
        motherboardMemoryMaxCapacity={motherboardMemoryMaxCapacity}
        motherboardMemoryMaxCapacityUnit={motherboardMemoryMaxCapacityUnit}
        motherboardMemorySlots={motherboardMemorySlots}
        motherboardMemoryType={motherboardMemoryType}
        motherboardPcie3Slots={motherboardPcie3Slots}
        motherboardPcie4Slots={motherboardPcie4Slots}
        motherboardPcie5Slots={motherboardPcie5Slots}
        motherboardSataPorts={motherboardSataPorts}
        motherboardSocket={motherboardSocket}
        padding={padding}
      />
    ) : productCategory === 'Power Supply Unit (PSU)' ? (
      <CreatePsu
        arePsuFieldsAdditionalMapFocused={arePsuFieldsAdditionalMapFocused}
        arePsuFieldsAdditionalMapValid={arePsuFieldsAdditionalMapValid}
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        isPsuWattageFocused={isPsuWattageFocused}
        isPsuWattageValid={isPsuWattageValid}
        padding={padding}
        psuEfficiency={psuEfficiency}
        psuFieldsAdditionalMap={psuFieldsAdditionalMap}
        psuFormFactor={psuFormFactor}
        psuModularity={psuModularity}
        psuWattage={psuWattage}
      />
    ) : productCategory === 'Smartphone' ? (
      <CreateSmartphone
        areSmartphoneFieldsAdditionalMapFocused={
          areSmartphoneFieldsAdditionalMapFocused
        }
        areSmartphoneFieldsAdditionalMapValid={
          areSmartphoneFieldsAdditionalMapValid
        }
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        isSmartphoneBatteryCapacityFocused={isSmartphoneBatteryCapacityFocused}
        isSmartphoneBatteryCapacityValid={isSmartphoneBatteryCapacityValid}
        isSmartphoneCameraFocused={isSmartphoneCameraFocused}
        isSmartphoneCameraValid={isSmartphoneCameraValid}
        isSmartphoneChipsetFocused={isSmartphoneChipsetFocused}
        isSmartphoneChipsetValid={isSmartphoneChipsetValid}
        isSmartphoneColorFocused={isSmartphoneColorFocused}
        isSmartphoneColorValid={isSmartphoneColorValid}
        isSmartphoneDisplayFocused={isSmartphoneDisplayFocused}
        isSmartphoneDisplayValid={isSmartphoneDisplayValid}
        isSmartphoneRamCapacityFocused={isSmartphoneRamCapacityFocused}
        isSmartphoneRamCapacityValid={isSmartphoneRamCapacityValid}
        isSmartphoneResolutionHorizontalFocused={
          isSmartphoneResolutionHorizontalFocused
        }
        isSmartphoneResolutionHorizontalValid={
          isSmartphoneResolutionHorizontalValid
        }
        isSmartphoneResolutionVerticalFocused={
          isSmartphoneResolutionVerticalFocused
        }
        isSmartphoneResolutionVerticalValid={
          isSmartphoneResolutionVerticalValid
        }
        isSmartphoneStorageCapacityFocused={isSmartphoneStorageCapacityFocused}
        isSmartphoneStorageCapacityValid={isSmartphoneStorageCapacityValid}
        padding={padding}
        smartphoneBatteryCapacity={smartphoneBatteryCapacity}
        smartphoneCamera={smartphoneCamera}
        smartphoneChipset={smartphoneChipset}
        smartphoneColor={smartphoneColor}
        smartphoneDisplay={smartphoneDisplay}
        smartphoneFieldsAdditionalMap={smartphoneFieldsAdditionalMap}
        smartphoneOs={smartphoneOs}
        smartphoneRamCapacity={smartphoneRamCapacity}
        smartphoneRamCapacityUnit={smartphoneRamCapacityUnit}
        smartphoneResolutionHorizontal={smartphoneResolutionHorizontal}
        smartphoneResolutionVertical={smartphoneResolutionVertical}
        smartphoneStorageCapacity={smartphoneStorageCapacity}
      />
    ) : productCategory === 'Speaker' ? (
      <CreateSpeaker
        areSpeakerFieldsAdditionalMapFocused={
          areSpeakerFieldsAdditionalMapFocused
        }
        areSpeakerFieldsAdditionalMapValid={areSpeakerFieldsAdditionalMapValid}
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        isSpeakerColorFocused={isSpeakerColorFocused}
        isSpeakerColorValid={isSpeakerColorValid}
        isSpeakerFrequencyResponseFocused={isSpeakerFrequencyResponseFocused}
        isSpeakerFrequencyResponseValid={isSpeakerFrequencyResponseValid}
        isSpeakerTotalWattageFocused={isSpeakerTotalWattageFocused}
        isSpeakerTotalWattageValid={isSpeakerTotalWattageValid}
        padding={padding}
        speakerColor={speakerColor}
        speakerFieldsAdditionalMap={speakerFieldsAdditionalMap}
        speakerFrequencyResponse={speakerFrequencyResponse}
        speakerInterface={speakerInterface}
        speakerTotalWattage={speakerTotalWattage}
        speakerType={speakerType}
      />
    ) : productCategory === 'Storage' ? (
      <CreateStorage
        areStorageFieldsAdditionalMapFocused={
          areStorageFieldsAdditionalMapFocused
        }
        areStorageFieldsAdditionalMapValid={areStorageFieldsAdditionalMapValid}
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        isStorageCacheCapacityFocused={isStorageCacheCapacityFocused}
        isStorageCacheCapacityValid={isStorageCacheCapacityValid}
        isStorageCapacityFocused={isStorageCapacityFocused}
        isStorageCapacityValid={isStorageCapacityValid}
        padding={padding}
        storageCacheCapacity={storageCacheCapacity}
        storageCacheCapacityUnit={storageCacheCapacityUnit}
        storageCapacity={storageCapacity}
        storageCapacityUnit={storageCapacityUnit}
        storageFieldsAdditionalMap={storageFieldsAdditionalMap}
        storageFormFactor={storageFormFactor}
        storageInterface={storageInterface}
        storageType={storageType}
      />
    ) : productCategory === 'Tablet' ? (
      <CreateTablet
        areTabletFieldsAdditionalMapFocused={
          areTabletFieldsAdditionalMapFocused
        }
        areTabletFieldsAdditionalMapValid={areTabletFieldsAdditionalMapValid}
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        isTabletBatteryCapacityFocused={isTabletBatteryCapacityFocused}
        isTabletBatteryCapacityValid={isTabletBatteryCapacityValid}
        isTabletCameraFocused={isTabletCameraFocused}
        isTabletCameraValid={isTabletCameraValid}
        isTabletChipsetFocused={isTabletChipsetFocused}
        isTabletChipsetValid={isTabletChipsetValid}
        isTabletColorFocused={isTabletColorFocused}
        isTabletColorValid={isTabletColorValid}
        isTabletDisplayFocused={isTabletDisplayFocused}
        isTabletDisplayValid={isTabletDisplayValid}
        isTabletRamCapacityFocused={isTabletRamCapacityFocused}
        isTabletRamCapacityValid={isTabletRamCapacityValid}
        isTabletResolutionHorizontalFocused={
          isTabletResolutionHorizontalFocused
        }
        isTabletResolutionHorizontalValid={isTabletResolutionHorizontalValid}
        isTabletResolutionVerticalFocused={isTabletResolutionVerticalFocused}
        isTabletResolutionVerticalValid={isTabletResolutionVerticalValid}
        isTabletStorageCapacityFocused={isTabletStorageCapacityFocused}
        isTabletStorageCapacityValid={isTabletStorageCapacityValid}
        padding={padding}
        tabletBatteryCapacity={tabletBatteryCapacity}
        tabletCamera={tabletCamera}
        tabletChipset={tabletChipset}
        tabletColor={tabletColor}
        tabletDisplay={tabletDisplay}
        tabletFieldsAdditionalMap={tabletFieldsAdditionalMap}
        tabletOs={tabletOs}
        tabletRamCapacity={tabletRamCapacity}
        tabletRamCapacityUnit={tabletRamCapacityUnit}
        tabletResolutionHorizontal={tabletResolutionHorizontal}
        tabletResolutionVertical={tabletResolutionVertical}
        tabletStorageCapacity={tabletStorageCapacity}
      />
    ) : productCategory === 'Webcam' ? (
      <CreateWebcam
        areWebcamFieldsAdditionalMapFocused={
          areWebcamFieldsAdditionalMapFocused
        }
        areWebcamFieldsAdditionalMapValid={areWebcamFieldsAdditionalMapValid}
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        isWebcamColorFocused={isWebcamColorFocused}
        isWebcamColorValid={isWebcamColorValid}
        padding={padding}
        webcamColor={webcamColor}
        webcamFieldsAdditionalMap={webcamFieldsAdditionalMap}
        webcamFrameRate={webcamFrameRate}
        webcamInterface={webcamInterface}
        webcamMicrophone={webcamMicrophone}
        webcamResolution={webcamResolution}
      />
    ) : (
      <CreateMicrophone
        areMicrophoneFieldsAdditionalMapFocused={
          areMicrophoneFieldsAdditionalMapFocused
        }
        areMicrophoneFieldsAdditionalMapValid={
          areMicrophoneFieldsAdditionalMapValid
        }
        borderColor={borderColor}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={
          currentlySelectedAdditionalFieldIndex
        }
        isMicrophoneColorFocused={isMicrophoneColorFocused}
        isMicrophoneColorValid={isMicrophoneColorValid}
        isMicrophoneFrequencyResponseFocused={
          isMicrophoneFrequencyResponseFocused
        }
        isMicrophoneFrequencyResponseValid={isMicrophoneFrequencyResponseValid}
        microphoneColor={microphoneColor}
        microphoneFieldsAdditionalMap={microphoneFieldsAdditionalMap}
        microphoneFrequencyResponse={microphoneFrequencyResponse}
        microphoneInterface={microphoneInterface}
        microphonePolarPattern={microphonePolarPattern}
        microphoneType={microphoneType}
        padding={padding}
      />
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
        {displaySelectedProductCategoryInputs}
      </Group>
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
    ...(productCategory === 'Accessory'
      ? page2AccessoryFormReviewObject
      : productCategory === 'Central Processing Unit (CPU)'
      ? page2CpuFormReviewObject
      : productCategory === 'Computer Case'
      ? page2ComputerCaseFormReviewObject
      : productCategory === 'Desktop Computer'
      ? page2DesktopComputerFormReviewObject
      : productCategory === 'Graphics Processing Unit (GPU)'
      ? page2GpuFormReviewObject
      : productCategory === 'Headphone'
      ? page2HeadphoneFormReviewObject
      : productCategory === 'Keyboard'
      ? page2KeyboardFormReviewObject
      : productCategory === 'Laptop'
      ? page2LaptopComputerFormReviewObject
      : productCategory === 'Memory (RAM)'
      ? page2RamFormReviewObject
      : productCategory === 'Mouse'
      ? page2MouseFormReviewObject
      : productCategory === 'Display'
      ? page2DisplayFormReviewObject
      : productCategory === 'Motherboard'
      ? page2MotherboardFormReviewObject
      : productCategory === 'Power Supply Unit (PSU)'
      ? page2PowerSupplyFormReviewObject
      : productCategory === 'Smartphone'
      ? page2SmartphoneFormReviewObject
      : productCategory === 'Speaker'
      ? page2SpeakerFormReviewObject
      : productCategory === 'Storage'
      ? page2StorageFormReviewObject
      : productCategory === 'Tablet'
      ? page2TabletFormReviewObject
      : productCategory === 'Webcam'
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
      : createdSubmitButtonWithTooltip;

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
