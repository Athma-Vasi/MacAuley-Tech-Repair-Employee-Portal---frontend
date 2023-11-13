import { useDisclosure } from '@mantine/hooks';
import { useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { useGlobalState, useWrapFetch } from '../../../hooks';
import {
  createProductAction,
  createProductReducer,
  initialCreateProductState,
} from './state';
import { logState, urlBuilder } from '../../../utils';
import { InvalidTokenError } from 'jwt-decode';
import { globalAction } from '../../../context/globalProvider/state';
import { ResourceRequestServerResponse } from '../../../types';
import { ProductDocument } from './types';
import {
  ACCESSORY_TYPE_REGEX,
  BRAND_REGEX,
  CPU_SOCKET_REGEX,
  GPU_CHIPSET_REGEX,
  HEADPHONE_FREQUENCY_RESPONSE_REGEX,
  MONITOR_ASPECT_RATIO_REGEX,
  MOTHERBOARD_CHIPSET_REGEX,
  MOTHERBOARD_SOCKET_REGEX,
  RAM_TIMING_REGEX,
  SMARTPHONE_CHIPSET_REGEX,
  SPEAKER_FREQUENCY_RESPONSE_REGEX,
  TABLET_CHIPSET_REGEX,
} from '../constants';
import {
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
  SERIAL_ID_REGEX,
} from '../../../constants/regex';

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

  return <></>;
}

export default CreateProduct;
