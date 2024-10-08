import { Stack } from "@mantine/core";
import { useReducer } from "react";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleCheckboxInputGroup } from "../accessibleInputs/AccessibleCheckboxInput";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleStepper } from "../accessibleInputs/AccessibleStepper";
import { PRODUCT_CATEGORIES_DATA } from "../dashboard/constants";
import { Accessory } from "./Accessory";
import { CPU } from "./CPU";
import { Case } from "./Case";
import { Display } from "./Display";
import { GPU } from "./GPU";
import { Headphone } from "./Headphone";
import { Keyboard } from "./Keyboard";
import { Microphone } from "./Microphone";
import { Motherboard } from "./Motherboard";
import { Mouse } from "./Mouse";
import { PSU } from "./PSU";
import { ProductPageOne } from "./ProductPageOne";
import { RAM } from "./RAM";
import { Speaker } from "./Speaker";
import { Storage } from "./Storage";
import { Webcam } from "./Webcam";
import { createProductReducer } from "./reducers";
import { createProductAction, initialCreateProductState } from "./state";
import {
  createPagesForStepper,
  returnCreateProductPageElements,
} from "./utils";

function CreateProduct() {
  const [createProductState, createProductDispatch] = useReducer(
    createProductReducer,
    initialCreateProductState,
  );

  const {
    brand,
    model,
    description,
    price,
    currency,
    availability,
    quantity,
    weight,
    weightUnit,
    dimensionLength,
    dimensionLengthUnit,
    dimensionWidth,
    dimensionWidthUnit,
    dimensionHeight,
    dimensionHeightUnit,
    additionalComments,

    additionalFieldsMap,
    // additionalFieldsFormDataMap,
    desktopComponents,
    productCategory,
    stepperPages,

    accessoryType,
    accessoryColor,
    accessoryInterface,

    cpuSocket,
    cpuFrequency,
    cpuCores,
    cpuL1CacheCapacity,
    cpuL1CacheCapacityUnit,
    cpuL2CacheCapacity,
    cpuL2CacheCapacityUnit,
    cpuL3CacheCapacity,
    cpuL3CacheCapacityUnit,
    cpuWattage,

    caseType,
    caseColor,
    caseSidePanel,

    displaySize,
    displayResolutionHorizontal,
    displayResolutionVertical,
    displayRefreshRate,
    displayPanelType,
    displayResponseTime,
    displayAspectRatio,

    gpuChipset,
    gpuMemoryCapacity,
    gpuMemoryCapacityUnit,
    gpuCoreClock,
    gpuBoostClock,
    gpuTdp,

    headphoneType,
    headphoneColor,
    headphoneDriver,
    headphoneFrequencyResponse,
    headphoneImpedance,
    headphoneInterface,

    keyboardSwitch,
    keyboardLayout,
    keyboardBacklight,
    keyboardInterface,

    ramDataRate,
    ramModulesQuantity,
    ramModulesCapacity,
    ramModulesCapacityUnit,
    ramType,
    ramColor,
    ramVoltage,
    ramTiming,

    mouseSensor,
    mouseDpi,
    mouseButtons,
    mouseColor,
    mouseInterface,

    microphoneColor,
    microphoneInterface,
    microphoneType,
    microphonePolarPattern,
    microphoneFrequencyResponse,

    motherboardSocket,
    motherboardChipset,
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

    psuWattage,
    psuEfficiency,
    psuModularity,
    psuFormFactor,

    speakerType,
    speakerColor,
    speakerFrequencyResponse,
    speakerTotalWattage,
    speakerInterface,

    storageType,
    storageCapacity,
    storageCapacityUnit,
    storageCacheCapacity,
    storageCacheCapacityUnit,
    storageFormFactor,
    storageInterface,

    webcamColor,
    webcamFrameRate,
    webcamInterface,
    webcamMicrophone,
    webcamResolution,

    triggerFormSubmit,
    pagesInError,
    isSubmitting,
    isSuccessful,
  } = createProductState;

  const firstPage = (
    <ProductPageOne
      additionalComments={additionalComments}
      availability={availability}
      brand={brand}
      currency={currency}
      description={description}
      dimensionHeight={dimensionHeight}
      dimensionHeightUnit={dimensionHeightUnit}
      dimensionLength={dimensionLength}
      dimensionLengthUnit={dimensionLengthUnit}
      dimensionWidth={dimensionWidth}
      dimensionWidthUnit={dimensionWidthUnit}
      model={model}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      price={price}
      quantity={quantity}
      stepperPages={stepperPages}
      weight={weight}
      weightUnit={weightUnit}
    />
  );

  const productCategorySelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: PRODUCT_CATEGORIES_DATA,
        name: "productCategory",
        parentDispatch: createProductDispatch,
        validValueAction: createProductAction.setProductCategory,
        value: productCategory,
      }}
    />
  );

  const desktopComponentsCheckboxInput = (
    <AccessibleCheckboxInputGroup
      attributes={{
        label: "Desktop Components Exclusion",
        inputData: PRODUCT_CATEGORIES_DATA.filter((category) =>
          category.label !== "Desktop Computer"
        ),
        name: "desktopComponents",
        parentDispatch: createProductDispatch,
        validValueAction: createProductAction.setDesktopComponents,
        value: desktopComponents,
        disabledValuesSet: new Set(),
      }}
    />
  );

  const accessoryPage = (
    <Accessory
      accessoryColor={accessoryColor}
      accessoryInterface={accessoryInterface}
      accessoryType={accessoryType}
      additionalFields={additionalFieldsMap.get("Accessory") ?? []}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Accessory"
      stepperPages={stepperPages}
    />
  );

  const casePage = (
    <Case
      additionalFields={additionalFieldsMap.get("Computer Case") ?? []}
      caseColor={caseColor}
      caseSidePanel={caseSidePanel}
      caseType={caseType}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Computer Case"
      stepperPages={stepperPages}
    />
  );

  const cpuPage = (
    <CPU
      additionalFields={additionalFieldsMap.get(
        "Central Processing Unit (CPU)",
      ) ?? []}
      cpuCores={cpuCores}
      cpuFrequency={cpuFrequency}
      cpuL1CacheCapacity={cpuL1CacheCapacity}
      cpuL1CacheCapacityUnit={cpuL1CacheCapacityUnit}
      cpuL2CacheCapacity={cpuL2CacheCapacity}
      cpuL2CacheCapacityUnit={cpuL2CacheCapacityUnit}
      cpuL3CacheCapacity={cpuL3CacheCapacity}
      cpuL3CacheCapacityUnit={cpuL3CacheCapacityUnit}
      cpuSocket={cpuSocket}
      cpuWattage={cpuWattage}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Central Processing Unit (CPU)"
      stepperPages={stepperPages}
    />
  );

  const displayPage = (
    <Display
      additionalFields={additionalFieldsMap.get("Display") ?? []}
      displayAspectRatio={displayAspectRatio}
      displayPanelType={displayPanelType}
      displayRefreshRate={displayRefreshRate}
      displayResolutionHorizontal={displayResolutionHorizontal}
      displayResolutionVertical={displayResolutionVertical}
      displayResponseTime={displayResponseTime}
      displaySize={displaySize}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Display"
      stepperPages={stepperPages}
    />
  );

  const gpuPage = (
    <GPU
      additionalFields={additionalFieldsMap.get(
        "Graphics Processing Unit (GPU)",
      ) ?? []}
      gpuBoostClock={gpuBoostClock}
      gpuChipset={gpuChipset}
      gpuCoreClock={gpuCoreClock}
      gpuMemoryCapacity={gpuMemoryCapacity}
      gpuMemoryCapacityUnit={gpuMemoryCapacityUnit}
      gpuTdp={gpuTdp}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Graphics Processing Unit (GPU)"
      stepperPages={stepperPages}
    />
  );

  const headphonePage = (
    <Headphone
      additionalFields={additionalFieldsMap.get("Headphone") ?? []}
      headphoneColor={headphoneColor}
      headphoneDriver={headphoneDriver}
      headphoneFrequencyResponse={headphoneFrequencyResponse}
      headphoneImpedance={headphoneImpedance}
      headphoneInterface={headphoneInterface}
      headphoneType={headphoneType}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Headphone"
      stepperPages={stepperPages}
    />
  );

  const keyboardPage = (
    <Keyboard
      additionalFields={additionalFieldsMap.get("Keyboard") ?? []}
      keyboardBacklight={keyboardBacklight}
      keyboardInterface={keyboardInterface}
      keyboardLayout={keyboardLayout}
      keyboardSwitch={keyboardSwitch}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Keyboard"
      stepperPages={stepperPages}
    />
  );

  const microphonePage = (
    <Microphone
      additionalFields={additionalFieldsMap.get("Microphone") ?? []}
      microphoneColor={microphoneColor}
      microphoneFrequencyResponse={microphoneFrequencyResponse}
      microphoneInterface={microphoneInterface}
      microphonePolarPattern={microphonePolarPattern}
      microphoneType={microphoneType}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Microphone"
      stepperPages={stepperPages}
    />
  );

  const motherboardPage = (
    <Motherboard
      additionalFields={additionalFieldsMap.get("Motherboard") ?? []}
      motherboardChipset={motherboardChipset}
      motherboardFormFactor={motherboardFormFactor}
      motherboardMemoryMaxCapacity={motherboardMemoryMaxCapacity}
      motherboardMemoryMaxCapacityUnit={motherboardMemoryMaxCapacityUnit}
      motherboardMemorySlots={motherboardMemorySlots}
      motherboardMemoryType={motherboardMemoryType}
      motherboardPcie3Slots={motherboardPcie3Slots}
      motherboardPcie4Slots={motherboardPcie4Slots}
      motherboardPcie5Slots={motherboardPcie5Slots}
      motherboardSataPorts={motherboardSataPorts}
      motherboardSocket={motherboardSocket}
      motherboardM2Slots={motherboardM2Slots}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Motherboard"
      stepperPages={stepperPages}
    />
  );

  const mousePage = (
    <Mouse
      additionalFields={additionalFieldsMap.get("Mouse") ?? []}
      mouseButtons={mouseButtons}
      mouseColor={mouseColor}
      mouseDpi={mouseDpi}
      mouseInterface={mouseInterface}
      mouseSensor={mouseSensor}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Mouse"
      stepperPages={stepperPages}
    />
  );

  const psuPage = (
    <PSU
      additionalFields={additionalFieldsMap.get("Power Supply Unit (PSU)") ??
        []}
      psuEfficiency={psuEfficiency}
      psuFormFactor={psuFormFactor}
      psuModularity={psuModularity}
      psuWattage={psuWattage}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Power Supply Unit (PSU)"
      stepperPages={stepperPages}
    />
  );

  const ramPage = (
    <RAM
      additionalFields={additionalFieldsMap.get("Memory (RAM)") ?? []}
      ramColor={ramColor}
      ramDataRate={ramDataRate}
      ramModulesCapacity={ramModulesCapacity}
      ramModulesCapacityUnit={ramModulesCapacityUnit}
      ramModulesQuantity={ramModulesQuantity}
      ramTiming={ramTiming}
      ramType={ramType}
      ramVoltage={ramVoltage}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Memory (RAM)"
      stepperPages={stepperPages}
    />
  );

  const speakerPage = (
    <Speaker
      additionalFields={additionalFieldsMap.get("Speaker") ?? []}
      speakerColor={speakerColor}
      speakerFrequencyResponse={speakerFrequencyResponse}
      speakerInterface={speakerInterface}
      speakerTotalWattage={speakerTotalWattage}
      speakerType={speakerType}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Speaker"
      stepperPages={stepperPages}
    />
  );

  const storagePage = (
    <Storage
      additionalFields={additionalFieldsMap.get("Storage") ?? []}
      storageCacheCapacity={storageCacheCapacity}
      storageCacheCapacityUnit={storageCacheCapacityUnit}
      storageCapacity={storageCapacity}
      storageCapacityUnit={storageCapacityUnit}
      storageFormFactor={storageFormFactor}
      storageInterface={storageInterface}
      storageType={storageType}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Storage"
      stepperPages={stepperPages}
    />
  );

  const webcamPage = (
    <Webcam
      additionalFields={additionalFieldsMap.get("Webcam") ?? []}
      webcamColor={webcamColor}
      webcamFrameRate={webcamFrameRate}
      webcamInterface={webcamInterface}
      webcamMicrophone={webcamMicrophone}
      webcamResolution={webcamResolution}
      parentAction={createProductAction}
      parentDispatch={createProductDispatch}
      productCategory="Webcam"
      stepperPages={stepperPages}
    />
  );

  const productCategoryPage = (
    <Stack>
      {productCategorySelectInput}
      {productCategory === "Desktop Computer"
        ? desktopComponentsCheckboxInput
        : null}
    </Stack>
  );

  const submitButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "All inputs are valid. Click to submit form",
        disabledScreenreaderText: "Please fix errors before submitting form",
        disabled: pagesInError.size > 0 || triggerFormSubmit,
        kind: "submit",
        name: "submit",
        onClick: (_event: React.MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            action: createProductAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const pageElements = returnCreateProductPageElements({
    Accessory: accessoryPage,
    "Computer Case": casePage,
    "Central Processing Unit (CPU)": cpuPage,
    desktopComponents,
    Display: displayPage,
    firstPage,
    "Graphics Processing Unit (GPU)": gpuPage,
    Headphone: headphonePage,
    Keyboard: keyboardPage,
    "Memory (RAM)": ramPage,
    Microphone: microphonePage,
    Motherboard: motherboardPage,
    Mouse: mousePage,
    productCategory,
    productCategoryPage,
    "Power Supply Unit (PSU)": psuPage,
    Speaker: speakerPage,
    Storage: storagePage,
    Webcam: webcamPage,
  });

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: createProductState,
        invalidValueAction: createProductAction.setPageInError,
        pageElements,
        parentDispatch: createProductDispatch,
        stepperPages: createPagesForStepper({
          desktopComponents,
          productCategory,
          stepperPages,
        }),
        stepsInError: pagesInError,
        submitButton,
      }}
    />
  );

  return stepper;
}

export default CreateProduct;

/**
 *
 * // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //     CREATE PRODUCT HOOKS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

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

 *
 *  const location = useLocation();

  // because page 2 of the stepper component is displayed based on productCategory, and by default it will display 'Accessory'. The productCategory is set based on the location.pathname.
  useEffect(() => {
    const splitLocation = location.pathname.split("/");
    const productCategoryFromPath = splitLocation[splitLocation.length - 2];
    const productCategoryProper = LOCATION_PRODUCT_CATEGORY_OBJ[productCategoryFromPath];

    createProductDispatch({
      type: createProductAction.setProductCategory,
      payload: productCategoryProper,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepperPosition]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //     CREATE PRODUCT EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    TRIGGER FORM SUBMIT EFFECT
  // ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
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
        payload: "File uploads are being processed...",
      });
      openSubmitSuccessNotificationModal();

      await Promise.all(
        imgFormDataArray.map(async (formData) => {
          const fileUploadUrl: URL = urlBuilder({
            path: "file-upload",
          });

          const imgUpLoadRequestInit: RequestInit = {
            method: "POST",
            headers: {
              Authorization: "", // will be added in wrappedFetch
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
                imgUploadResponseData.message ?? "File uploads failed. Please try again."
              );
            }

            createProductDispatch({
              type: createProductAction.setIsSubmitting,
              payload: false,
            });
            createProductDispatch({
              type: createProductAction.setSubmitMessage,
              payload: "",
            });

            createProductDispatch({
              type: createProductAction.setIsSuccessful,
              payload: true,
            });
            createProductDispatch({
              type: createProductAction.setSuccessMessage,
              payload: imgUploadResponseData.message ?? "File uploads successful.",
            });

            return imgUploadResponseData;
          } catch (error: any) {
            if (!isMounted || error.name === "AbortError") {
              return;
            }

            const errorMessage =
              error instanceof InvalidTokenError
                ? "Invalid token. Please login again."
                : !error.response
                ? "Network error. Please try again."
                : error?.message ?? "Unknown error occurred. Please try again.";

            globalDispatch({
              type: globalAction.setErrorState,
              payload: {
                isError: true,
                errorMessage,
                errorCallback: () => {
                  navigate("/home");

                  globalDispatch({
                    type: globalAction.setErrorState,
                    payload: {
                      isError: false,
                      errorMessage: "",
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
            path: `actions/dashboard/product-category/${PRODUCT_CATEGORY_ROUTE_NAME_OBJ[productCategory]}`,
          });

          // ╔═════════════════════════════════════════════════════════════════╗
          //    REQUEST BODY
          // ╚═════════════════════════════════════════════════════════════════╝

          const page1Specifications: ProductCategoryPage1Specifications = {
            sku: Array.from({ length: parseInt(quantity) }, () => uuidv4()),
            brand,
            model,
            price: parseFloat(price),
            currency,
            availability,
            quantity: parseInt(quantity),
            weight: parseFloat(weight),
            weightUnit,
            length: parseFloat(dimensionLength),
            lengthUnit: dimensionLengthUnit,
            width: parseFloat(dimensionWidth),
            widthUnit: dimensionWidthUnit,
            height: parseFloat(dimensionHeight),
            heightUnit: dimensionHeightUnit,
            description,
            additionalComments,
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    ACCESSORY
          // ╰─────────────────────────────────────────────────────────────────╯
          const accessorySpecifications: AccessorySpecifications = {
            accessoryType,
            accessoryColor,
            accessoryInterface,
          };

          const accessoryAdditionalFieldsObj = returnRequestBodyfromUserDefinedFields(
            accessoryFieldsAdditionalMap
          );

          const accessoryRequestBody: AccessoryRequestBody = {
            ...page1Specifications,
            ...accessorySpecifications,
            additionalFields: {
              ...accessoryAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    CENTRAL PROCESSING UNIT (CPU)
          // ╰─────────────────────────────────────────────────────────────────╯
          const cpuSpecifications: CpuSpecifications = {
            cpuSocket,
            cpuFrequency: parseFloat(cpuFrequency),
            cpuCores: parseInt(cpuCores),
            cpuL1Cache: parseFloat(cpuL1CacheCapacity),
            cpuL1CacheUnit: cpuL1CacheCapacityUnit,
            cpuL2Cache: parseFloat(cpuL2CacheCapacity),
            cpuL2CacheUnit: cpuL2CacheCapacityUnit,
            cpuL3Cache: parseFloat(cpuL3CacheCapacity),
            cpuL3CacheUnit: cpuL3CacheCapacityUnit,
            cpuWattage: parseInt(cpuWattage),
          };

          const cpuAdditionalFieldsObj =
            returnRequestBodyfromUserDefinedFields(cpuFieldsAdditionalMap);

          const cpuRequestBody: CpuRequestBody = {
            ...page1Specifications,
            ...cpuSpecifications,
            additionalFields: {
              ...cpuAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    COMPUTER CASE
          // ╰─────────────────────────────────────────────────────────────────╯
          const caseSpecifications: CaseSpecifications = {
            caseType,
            caseColor,
            caseSidePanel,
          };

          const caseAdditionalFieldsObj = returnRequestBodyfromUserDefinedFields(
            caseFieldsAdditionalMap
          );

          const caseRequestBody: ComputerCaseRequestBody = {
            ...page1Specifications,
            ...caseSpecifications,
            additionalFields: {
              ...caseAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    DISPLAY
          // ╰─────────────────────────────────────────────────────────────────╯
          const displaySpecifications: DisplaySpecifications = {
            displaySize: parseFloat(displaySize),
            displayHorizontalResolution: parseInt(displayResolutionHorizontal),
            displayVerticalResolution: parseInt(displayResolutionVertical),
            displayRefreshRate: parseInt(displayRefreshRate),
            displayPanelType,
            displayResponseTime: parseFloat(displayResponseTime),
            displayAspectRatio,
          };

          const displayAdditionalFieldsObj = returnRequestBodyfromUserDefinedFields(
            displayFieldsAdditionalMap
          );

          const displayRequestBody: DisplayRequestBody = {
            ...page1Specifications,
            ...displaySpecifications,
            additionalFields: {
              ...displayAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    GRAPHICS PROCESSING UNIT (GPU)
          // ╰─────────────────────────────────────────────────────────────────╯
          const gpuSpecifications: GpuSpecifications = {
            gpuChipset,
            gpuMemory: parseInt(gpuMemoryCapacity),
            gpuMemoryUnit: gpuMemoryCapacityUnit,
            gpuCoreClock: parseInt(gpuCoreClock),
            gpuBoostClock: parseInt(gpuBoostClock),
            gpuTdp: parseInt(gpuTdp),
          };

          const gpuAdditionalFieldsObj =
            returnRequestBodyfromUserDefinedFields(gpuFieldsAdditionalMap);

          const gpuRequestBody: GpuRequestBody = {
            ...page1Specifications,
            ...gpuSpecifications,
            additionalFields: {
              ...gpuAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    HEADPHONE
          // ╰─────────────────────────────────────────────────────────────────╯
          const headphoneSpecifications: HeadphoneSpecifications = {
            headphoneType,
            headphoneDriver: parseInt(headphoneDriver),
            headphoneFrequencyResponse,
            headphoneImpedance: parseInt(headphoneImpedance),
            headphoneColor,
            headphoneInterface,
          };

          const headphoneAdditionalFieldsObj = returnRequestBodyfromUserDefinedFields(
            headphoneFieldsAdditionalMap
          );

          const headphoneRequestBody: HeadphoneRequestBody = {
            ...page1Specifications,
            ...headphoneSpecifications,
            additionalFields: {
              ...headphoneAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    KEYBOARD
          // ╰─────────────────────────────────────────────────────────────────╯
          const keyboardSpecifications: KeyboardSpecifications = {
            keyboardSwitch,
            keyboardLayout,
            keyboardBacklight,
            keyboardInterface,
          };

          const keyboardAdditionalFieldsObj = returnRequestBodyfromUserDefinedFields(
            keyboardFieldsAdditionalMap
          );

          const keyboardRequestBody: KeyboardRequestBody = {
            ...page1Specifications,
            ...keyboardSpecifications,
            additionalFields: {
              ...keyboardAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    MEMORY (RAM)
          // ╰─────────────────────────────────────────────────────────────────╯
          const ramSpecifications: RamSpecifications = {
            ramDataRate: parseInt(ramDataRate),
            ramModulesQuantity: parseInt(ramModulesQuantity),
            ramModulesCapacity: parseInt(ramModulesCapacity),
            ramModulesCapacityUnit,
            ramType,
            ramColor,
            ramVoltage: parseFloat(ramVoltage),
            ramTiming,
          };

          const ramAdditionalFieldsObj =
            returnRequestBodyfromUserDefinedFields(ramFieldsAdditionalMap);

          const ramRequestBody: RamRequestBody = {
            ...page1Specifications,
            ...ramSpecifications,
            additionalFields: {
              ...ramAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    MOUSE
          // ╰─────────────────────────────────────────────────────────────────╯
          const mouseSpecifications: MouseSpecifications = {
            mouseSensor,
            mouseDpi: parseInt(mouseDpi),
            mouseButtons: parseInt(mouseButtons),
            mouseColor,
            mouseInterface,
          };

          const mouseAdditionalFieldsObj = returnRequestBodyfromUserDefinedFields(
            mouseFieldsAdditionalMap
          );

          const mouseRequestBody: MouseRequestBody = {
            ...page1Specifications,
            ...mouseSpecifications,
            additionalFields: {
              ...mouseAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    MICROPHONE
          // ╰─────────────────────────────────────────────────────────────────╯
          const microphoneSpecifications: MicrophoneSpecifications = {
            microphoneType,
            microphonePolarPattern,
            microphoneFrequencyResponse,
            microphoneColor,
            microphoneInterface,
          };

          const microphoneAdditionalFieldsObj = returnRequestBodyfromUserDefinedFields(
            microphoneFieldsAdditionalMap
          );

          const microphoneRequestBody: MicrophoneRequestBody = {
            ...page1Specifications,
            ...microphoneSpecifications,
            additionalFields: {
              ...microphoneAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item?.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    MOTHERBOARD
          // ╰─────────────────────────────────────────────────────────────────╯
          const motherboardSpecifications: MotherboardSpecifications = {
            motherboardSocket,
            motherboardChipset,
            motherboardFormFactor,
            motherboardMemoryMax: parseInt(motherboardMemoryMaxCapacity),
            motherboardMemoryMaxUnit: motherboardMemoryMaxCapacityUnit,
            motherboardMemorySlots: parseInt(motherboardMemorySlots),
            motherboardMemoryType,
            motherboardSataPorts: parseInt(motherboardSataPorts),
            motherboardM2Slots: parseInt(motherboardM2Slots),
            motherboardPcie3Slots: parseInt(motherboardPcie3Slots),
            motherboardPcie4Slots: parseInt(motherboardPcie4Slots),
            motherboardPcie5Slots: parseInt(motherboardPcie5Slots),
          };

          const motherboardAdditionalFieldsObj = returnRequestBodyfromUserDefinedFields(
            motherboardFieldsAdditionalMap
          );

          const motherboardRequestBody: MotherboardRequestBody = {
            ...page1Specifications,
            ...motherboardSpecifications,
            additionalFields: {
              ...motherboardAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    POWER SUPPLY UNIT (PSU)
          // ╰─────────────────────────────────────────────────────────────────╯
          const psuSpecifications: PsuSpecifications = {
            psuWattage: parseInt(psuWattage),
            psuEfficiency,
            psuFormFactor,
            psuModularity,
          };

          const psuAdditionalFieldsObj =
            returnRequestBodyfromUserDefinedFields(psuFieldsAdditionalMap);

          const psuRequestBody: PsuRequestBody = {
            ...page1Specifications,
            ...psuSpecifications,
            additionalFields: {
              ...psuAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    SMARTPHONE
          // ╰─────────────────────────────────────────────────────────────────╯
          const smartphoneSpecifications: SmartphoneSpecifications = {
            smartphoneOs,
            smartphoneChipset,
            smartphoneDisplay: parseFloat(smartphoneDisplay),
            smartphoneHorizontalResolution: parseInt(smartphoneResolutionHorizontal),
            smartphoneVerticalResolution: parseInt(smartphoneResolutionVertical),
            smartphoneRamCapacity: parseInt(smartphoneRamCapacity),
            smartphoneRamCapacityUnit,
            smartphoneStorage: parseInt(smartphoneStorageCapacity),
            smartphoneBattery: parseInt(smartphoneBatteryCapacity),
            smartphoneCamera,
            smartphoneColor,
          };

          const smartphoneAdditionalFieldsObj = returnRequestBodyfromUserDefinedFields(
            smartphoneFieldsAdditionalMap
          );

          const smartphoneRequestBody: SmartphoneRequestBody = {
            ...page1Specifications,
            ...smartphoneSpecifications,
            additionalFields: {
              ...smartphoneAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item?.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    SPEAKER
          // ╰─────────────────────────────────────────────────────────────────╯
          const speakerSpecifications: SpeakerSpecifications = {
            speakerType,
            speakerTotalWattage: parseInt(speakerTotalWattage),
            speakerFrequencyResponse,
            speakerColor,
            speakerInterface,
          };

          const speakerAdditionalFieldsObj = returnRequestBodyfromUserDefinedFields(
            speakerFieldsAdditionalMap
          );

          const speakerRequestBody: SpeakerRequestBody = {
            ...page1Specifications,
            ...speakerSpecifications,
            additionalFields: {
              ...speakerAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item?.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    STORAGE
          // ╰─────────────────────────────────────────────────────────────────╯
          const storageSpecifications: StorageSpecifications = {
            storageType,
            storageCapacity: parseInt(storageCapacity),
            storageCapacityUnit,
            storageCache: parseInt(storageCacheCapacity),
            storageCacheUnit: storageCacheCapacityUnit,
            storageFormFactor,
            storageInterface,
          };

          const storageAdditionalFieldsObj = returnRequestBodyfromUserDefinedFields(
            storageFieldsAdditionalMap
          );

          const storageRequestBody: StorageRequestBody = {
            ...page1Specifications,
            ...storageSpecifications,
            additionalFields: {
              ...storageAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    TABLET
          // ╰─────────────────────────────────────────────────────────────────╯
          const tabletSpecifications: TabletSpecifications = {
            tabletOs,
            tabletChipset,
            tabletDisplay: parseFloat(tabletDisplay),
            tabletHorizontalResolution: parseInt(tabletResolutionHorizontal),
            tabletVerticalResolution: parseInt(tabletResolutionVertical),
            tabletRamCapacity: parseInt(tabletRamCapacity),
            tabletRamCapacityUnit,
            tabletStorage: parseInt(tabletStorageCapacity),
            tabletBattery: parseInt(tabletBatteryCapacity),
            tabletCamera,
            tabletColor,
          };

          const tabletAdditionalFieldsObj = returnRequestBodyfromUserDefinedFields(
            tabletFieldsAdditionalMap
          );

          const tabletRequestBody: TabletRequestBody = {
            ...page1Specifications,
            ...tabletSpecifications,
            additionalFields: {
              ...tabletAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item?.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    WEBCAM
          // ╰─────────────────────────────────────────────────────────────────╯
          const webcamSpecifications: WebcamSpecifications = {
            webcamColor,
            webcamFrameRate,
            webcamInterface,
            webcamMicrophone,
            webcamResolution,
          };

          const webcamAdditionalFieldsObj = returnRequestBodyfromUserDefinedFields(
            webcamFieldsAdditionalMap
          );

          const webcamRequestBody: WebcamRequestBody = {
            ...page1Specifications,
            ...webcamSpecifications,
            additionalFields: {
              ...webcamAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item?.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    DESKTOP COMPUTER
          // ╰─────────────────────────────────────────────────────────────────╯
          const desktopComputerSpecifications: DesktopComputerSpecifications = {
            ...caseSpecifications,
            ...cpuSpecifications,
            ...displaySpecifications,
            ...gpuSpecifications,
            ...keyboardSpecifications,
            ...motherboardSpecifications,
            ...mouseSpecifications,
            ...psuSpecifications,
            ...ramSpecifications,
            ...speakerSpecifications,
            ...storageSpecifications,
          };

          const desktopComputerAdditionalFieldsObj = {
            ...caseAdditionalFieldsObj,
            ...cpuAdditionalFieldsObj,
            ...displayAdditionalFieldsObj,
            ...gpuAdditionalFieldsObj,
            ...keyboardAdditionalFieldsObj,
            ...motherboardAdditionalFieldsObj,
            ...mouseAdditionalFieldsObj,
            ...psuAdditionalFieldsObj,
            ...ramAdditionalFieldsObj,
            ...speakerAdditionalFieldsObj,
            ...storageAdditionalFieldsObj,
          };

          const desktopComputerRequestBody: DesktopComputerRequestBody = {
            ...page1Specifications,
            ...desktopComputerSpecifications,
            additionalFields: {
              ...desktopComputerAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item?.documentId),
          };

          // ╭─────────────────────────────────────────────────────────────────╮
          //    LAPTOP
          // ╰─────────────────────────────────────────────────────────────────╯
          const laptopSpecifications: LaptopSpecifications = {
            ...cpuSpecifications,
            ...displaySpecifications,
            ...gpuSpecifications,
            ...ramSpecifications,
            ...storageSpecifications,
          };

          const laptopAdditionalFieldsObj = {
            ...cpuAdditionalFieldsObj,
            ...displayAdditionalFieldsObj,
            ...gpuAdditionalFieldsObj,
            ...ramAdditionalFieldsObj,
            ...storageAdditionalFieldsObj,
          };

          const laptopRequestBody: LaptopRequestBody = {
            ...page1Specifications,
            ...laptopSpecifications,
            additionalFields: {
              ...laptopAdditionalFieldsObj,
            },
            productReviewsIds: [],
            uploadedFilesIds: imgUploadResponseData
              .filter(removeUndefinedAndNull)
              .map((item) => item?.documentId),
          };

          const createProductFormRequestBody =
            productCategory === "Accessory"
              ? { accessorySchema: accessoryRequestBody }
              : productCategory === "Central Processing Unit (CPU)"
              ? { cpuSchema: cpuRequestBody }
              : productCategory === "Computer Case"
              ? { computerCaseSchema: caseRequestBody }
              : productCategory === "Desktop Computer"
              ? { desktopComputerSchema: desktopComputerRequestBody }
              : productCategory === "Display"
              ? { displaySchema: displayRequestBody }
              : productCategory === "Graphics Processing Unit (GPU)"
              ? { gpuSchema: gpuRequestBody }
              : productCategory === "Headphone"
              ? { headphoneSchema: headphoneRequestBody }
              : productCategory === "Keyboard"
              ? { keyboardSchema: keyboardRequestBody }
              : productCategory === "Laptop"
              ? { laptopSchema: laptopRequestBody }
              : productCategory === "Memory (RAM)"
              ? { ramSchema: ramRequestBody }
              : productCategory === "Microphone"
              ? { microphoneSchema: microphoneRequestBody }
              : productCategory === "Motherboard"
              ? {
                  motherboardSchema: motherboardRequestBody,
                }
              : productCategory === "Mouse"
              ? { mouseSchema: mouseRequestBody }
              : productCategory === "Power Supply Unit (PSU)"
              ? { psuSchema: psuRequestBody }
              : productCategory === "Smartphone"
              ? {
                  smartphoneSchema: smartphoneRequestBody,
                }
              : productCategory === "Speaker"
              ? {
                  speakerSchema: speakerRequestBody,
                }
              : productCategory === "Storage"
              ? {
                  storageSchema: storageRequestBody,
                }
              : productCategory === "Tablet"
              ? {
                  tabletSchema: tabletRequestBody,
                }
              : {
                  webcamSchema: webcamRequestBody,
                };

          const createProductRequestInit: RequestInit = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(createProductFormRequestBody),
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
            // delete uploaded file if error occurs
            const deleteFileUploadUrl = urlBuilder({
              path: `file-upload/${imgUploadResponseData[0]?.documentId}`,
            });

            const imgDeleteRequestInit: RequestInit = {
              method: "DELETE",
              headers: {
                Authorization: "", // will be added in wrappedFetch
              },
            };

            try {
              const imgDeleteResponse: Response = await wrappedFetch({
                isMounted,
                requestInit: imgDeleteRequestInit,
                signal: controller.signal,
                url: deleteFileUploadUrl,
              });

              if (!imgDeleteResponse.ok) {
                throw new Error("File uploads failed. Please try again.");
              }
            } catch (error: any) {
              const errorMessage =
                error instanceof InvalidTokenError
                  ? "Invalid token. Please login again."
                  : !error.response
                  ? "Network error. Please try again."
                  : error?.message ?? "Unknown error occurred. Please try again.";

              throw new Error(errorMessage);
            }

            if (!isMounted || error.name === "AbortError") {
              return;
            }

            const errorMessage =
              error instanceof InvalidTokenError
                ? "Invalid token. Please login again."
                : !error.response
                ? "Network error. Please try again."
                : error?.message ?? "Unknown error occurred. Please try again.";

            globalDispatch({
              type: globalAction.setErrorState,
              payload: {
                isError: true,
                errorMessage,
                errorCallback: () => {
                  navigate("/home");

                  globalDispatch({
                    type: globalAction.setErrorState,
                    payload: {
                      isError: false,
                      errorMessage: "",
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
                payload: "",
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

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //     VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //     BRAND
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = BRAND_REGEX.test(brand);

    createProductDispatch({
      type: createProductAction.setIsBrandValid,
      payload: isValid,
    });
  }, [brand]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     MODEL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(model);

    createProductDispatch({
      type: createProductAction.setIsModelValid,
      payload: isValid,
    });
  }, [model]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DESCRIPTION
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(description);

    createProductDispatch({
      type: createProductAction.setIsDescriptionValid,
      payload: isValid,
    });
  }, [description]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     PRICE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MONEY_REGEX.test(price);

    createProductDispatch({
      type: createProductAction.setIsPriceValid,
      payload: isValid,
    });
  }, [price]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     QUANTITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(quantity);

    createProductDispatch({
      type: createProductAction.setIsQuantityValid,
      payload: isValid,
    });
  }, [quantity]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     WEIGHT
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = WEIGHT_REGEX.test(weight);

    createProductDispatch({
      type: createProductAction.setIsWeightValid,
      payload: isValid,
    });
  }, [weight]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DIMENSION LENGTH
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(dimensionLength);

    createProductDispatch({
      type: createProductAction.setIsDimensionLengthValid,
      payload: isValid,
    });
  }, [dimensionLength]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DIMENSION WIDTH
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(dimensionWidth);

    createProductDispatch({
      type: createProductAction.setIsDimensionWidthValid,
      payload: isValid,
    });
  }, [dimensionWidth]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DIMENSION HEIGHT
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(dimensionHeight);

    createProductDispatch({
      type: createProductAction.setIsDimensionHeightValid,
      payload: isValid,
    });
  }, [dimensionHeight]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CURRENCY
  // ╰─────────────────────────────────────────────────────────────────╯

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DIMENSION LENGTH UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalComments);

    createProductDispatch({
      type: createProductAction.setIsAdditionalCommentsValid,
      payload: isValid,
    });
  }, [additionalComments]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //    STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  // ╭─────────────────────────────────────────────────────────────────╮
  //     PAGE 1
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const arePage1RequiredInputsInError =
      !isBrandValid ||
      !isModelValid ||
      !isPriceValid ||
      !quantity ||
      !price ||
      !isDescriptionValid;

    const isPage1OptionalInputInError =
      additionalComments !== "" && !isAdditionalCommentsValid;

    const arePage1InputsInError =
      arePage1RequiredInputsInError || isPage1OptionalInputInError;

    createProductDispatch({
      type: createProductAction.setPageInError,
      payload: {
        kind: arePage1InputsInError ? "add" : "delete",
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

  // page 2 inputs are validated in their respective components

  // ╭─────────────────────────────────────────────────────────────────╮
  //     PAGE 3
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    // can have no images associated
    const arePage3InputsInError = !areImagesValid || imgFormDataArray.length < 1;

    createProductDispatch({
      type: createProductAction.setPageInError,
      payload: {
        kind: arePage3InputsInError ? "add" : "delete",
        step: 2,
      },
    });
  }, [areImagesValid, imgFormDataArray.length]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //     INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  // ╔═════════════════════════════════════════════════════════════════╗
  //    PAGE 1
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //     BRAND
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [brandInputErrorText, brandInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "brand",
    inputText: brand,
    isValidInputText: isBrandValid,
    regexValidationText: returnBrandNameValidationText({
      content: brand,
      contentKind: "brand",
      maxLength: 30,
      minLength: 2,
    }),
  });

  // screenreader accessible text input element
  const [createdBrandTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: brandInputErrorText,
        valid: brandInputValidText,
      },
      inputText: brand,
      isValidInputText: isBrandValid,
      label: "Brand",
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
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
          payload: true,
        });
      },
      placeholder: "Enter brand name",
      required: true,
      semanticName: "brand",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     MODEL
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [modelInputErrorText, modelInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "model",
    inputText: model,
    isValidInputText: isModelValid,
    regexValidationText: returnSerialIdValidationText({
      content: model,
      contentKind: "model",
      maxLength: 30,
      minLength: 2,
    }),
  });

  // screenreader accessible text input element
  const [createdModelTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: modelInputErrorText,
        valid: modelInputValidText,
      },
      inputText: model,
      isValidInputText: isModelValid,
      label: "Model",
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
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
          payload: true,
        });
      },
      placeholder: "Enter model name",
      required: true,
      semanticName: "model",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DESCRIPTION
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [descriptionInputErrorText, descriptionInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "description",
      inputText: description,
      isValidInputText: isDescriptionValid,
      regexValidationText: returnGrammarValidationText({
        content: description,
        contentKind: "description",
        maxLength: 2000,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdDescriptionTextAreaInput] = returnAccessibleTextAreaInputElements([
    {
      description: {
        error: descriptionInputErrorText,
        valid: descriptionInputValidText,
      },
      inputText: description,
      isValidInputText: isDescriptionValid,
      label: "Product Description",
      maxLength: 2000,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
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
          payload: true,
        });
      },
      placeholder: "Enter product description",
      required: true,
      semanticName: "description",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     PRICE
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [priceInputErrorText, priceInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "price",
    inputText: price,
    isValidInputText: isPriceValid,
    regexValidationText: returnFloatAmountValidationText({
      content: price,
      contentKind: "price",
    }),
  });

  // screenreader accessible text input element
  const [createdPriceTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: priceInputErrorText,
        valid: priceInputValidText,
      },
      inputText: price,
      isValidInputText: isPriceValid,
      label: "Price",
      onBlur: () => {
        createProductDispatch({
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
          payload: true,
        });
      },
      placeholder: "Enter product price",
      required: true,
      semanticName: "price",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CURRENCY
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdCurrencySelectInput] = returnAccessibleSelectInputElements([
    {
      data: CURRENCY_DATA,
      description: "",
      label: "Currency",
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

  // ╭─────────────────────────────────────────────────────────────────╮
  //     AVAILABILITY
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAvailabilitySelectInput] = returnAccessibleSelectInputElements([
    {
      data: PRODUCT_AVAILABILITY_DATA,
      description: "",
      label: "Availability",
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

  // ╭─────────────────────────────────────────────────────────────────╮
  //     QUANTITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [quantityInputErrorText, quantityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "quantity",
      inputText: quantity,
      isValidInputText: isQuantityValid,
      regexValidationText: returnLargeIntegerValidationText({
        content: quantity,
        contentKind: "quantity",
      }),
    });

  // screenreader accessible text input element
  const [createdQuantityTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: quantityInputErrorText,
        valid: quantityInputValidText,
      },
      inputText: quantity,
      isValidInputText: isQuantityValid,
      label: "Quantity",
      onBlur: () => {
        createProductDispatch({
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
          payload: true,
        });
      },
      placeholder: "Enter product quantity",
      required: true,
      semanticName: "quantity",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     WEIGHT
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [weightInputErrorText, weightInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "weight",
    inputText: weight,
    isValidInputText: isWeightValid,
    regexValidationText: returnWeightValidationText({
      content: weight,
      contentKind: "weight",
    }),
  });

  // screenreader accessible text input element
  const [createdWeightTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: weightInputErrorText,
        valid: weightInputValidText,
      },
      inputText: weight,
      isValidInputText: isWeightValid,
      label: "Weight",
      onBlur: () => {
        createProductDispatch({
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
          payload: true,
        });
      },
      placeholder: "Enter product weight",
      required: true,
      semanticName: "weight",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     WEIGHT UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdWeightUnitSelectInput] = returnAccessibleSelectInputElements([
    {
      data: WEIGHT_UNIT_SELECT_INPUT_DATA,
      description: "",
      label: "Weight Unit",
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

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DIMENSION LENGTH
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [dimensionLengthInputErrorText, dimensionLengthInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "dimension length",
      inputText: dimensionLength,
      isValidInputText: isDimensionLengthValid,
      regexValidationText: returnDimensionsValidationText({
        content: dimensionLength,
        contentKind: "dimension length",
      }),
    });

  // screenreader accessible text input element
  const [createdDimensionLengthTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: dimensionLengthInputErrorText,
        valid: dimensionLengthInputValidText,
      },
      inputText: dimensionLength,
      isValidInputText: isDimensionLengthValid,
      label: "Length",
      onBlur: () => {
        createProductDispatch({
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
          payload: true,
        });
      },
      placeholder: "Enter product length",
      required: true,
      semanticName: "dimension length",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DIMENSION LENGTH UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdDimensionLengthUnitSelectInput] = returnAccessibleSelectInputElements([
    {
      data: DIMENSION_UNIT_SELECT_INPUT_DATA,
      description: "",
      label: "Length Unit",
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

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DIMENSION WIDTH
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [dimensionWidthInputErrorText, dimensionWidthInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "dimension width",
      inputText: dimensionWidth,
      isValidInputText: isDimensionWidthValid,
      regexValidationText: returnDimensionsValidationText({
        content: dimensionWidth,
        contentKind: "dimension width",
      }),
    });

  // screenreader accessible text input element
  const [createdDimensionWidthTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: dimensionWidthInputErrorText,
        valid: dimensionWidthInputValidText,
      },
      inputText: dimensionWidth,
      isValidInputText: isDimensionWidthValid,
      label: "Width",
      onBlur: () => {
        createProductDispatch({
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
          payload: true,
        });
      },
      placeholder: "Enter product width",
      required: true,
      semanticName: "dimension width",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DIMENSION WIDTH UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdDimensionWidthUnitSelectInput] = returnAccessibleSelectInputElements([
    {
      data: DIMENSION_UNIT_SELECT_INPUT_DATA,
      description: "",
      label: "Width Unit",
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

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DIMENSION HEIGHT
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [dimensionHeightInputErrorText, dimensionHeightInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "dimension height",
      inputText: dimensionHeight,
      isValidInputText: isDimensionHeightValid,
      regexValidationText: returnDimensionsValidationText({
        content: dimensionHeight,
        contentKind: "dimension height",
      }),
    });

  // screenreader accessible text input element
  const [createdDimensionHeightTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: dimensionHeightInputErrorText,
        valid: dimensionHeightInputValidText,
      },
      inputText: dimensionHeight,
      isValidInputText: isDimensionHeightValid,
      label: "Height",
      onBlur: () => {
        createProductDispatch({
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
          payload: true,
        });
      },
      placeholder: "Enter product height",
      required: true,
      semanticName: "dimension height",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DIMENSION HEIGHT UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdDimensionHeightUnitSelectInput] = returnAccessibleSelectInputElements([
    {
      data: DIMENSION_UNIT_SELECT_INPUT_DATA,
      description: "",
      label: "Height Unit",
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

  // ╭─────────────────────────────────────────────────────────────────╮
  //     ADDITIONAL COMMENTS
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [additionalCommentsInputErrorText, additionalCommentsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "additional comments",
      inputText: additionalComments,
      isValidInputText: isAdditionalCommentsValid,
      regexValidationText: returnGrammarValidationText({
        content: additionalComments,
        contentKind: "additional comments",
        maxLength: 2000,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdAdditionalCommentsTextAreaInput] = returnAccessibleTextAreaInputElements([
    {
      description: {
        error: additionalCommentsInputErrorText,
        valid: additionalCommentsInputValidText,
      },
      inputText: additionalComments,
      isValidInputText: isAdditionalCommentsValid,
      label: "Additional Comments",
      maxLength: 2000,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
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
          payload: true,
        });
      },
      placeholder: "Enter additional comments",
      semanticName: "additional comments",
    },
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //    PAGE 2
  // ╚═════════════════════════════════════════════════════════════════╝

  // // ╭─────────────────────────────────────────────────────────────────╮
  // //     PRODUCT CATEGORY
  // // ╰─────────────────────────────────────────────────────────────────╯
  // const [createdProductCategorySelectInput] = returnAccessibleSelectInputElements([
  //   {
  //     data: PRODUCT_CATEGORIES,
  //     description: "",
  //     describedBy: "Select a product category for your product.",
  //     label: "Product Category",
  //     onChange: (event: ChangeEvent<HTMLSelectElement>) => {
  //       createProductDispatch({
  //         type: createProductAction.setProductCategory,
  //         payload: event.currentTarget.value as ProductCategory,
  //       });
  //     },
  //     value: productCategory,
  //     required: true,
  //   },
  // ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //    PAGE 4
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //     SUBMIT FORM BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdSubmitButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Submit",
      buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
        createProductDispatch({
          type: createProductAction.setTriggerFormSubmit,
          payload: true,
        });
      },
      buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
      leftIcon: <TbUpload />,
      semanticDescription: "create product form submit button",
      semanticName: "submit button",
    },
  ]);

  const createdSubmitButtonWithTooltip =
    currentStepperPosition === CREATE_PRODUCT_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? "Please fix errors before submitting form."
            : "Submit create product form"
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //     INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayCreateProductFormPage1 = (
    <FormLayoutWrapper>
      {createdBrandTextInput}
      {createdModelTextInput}
      {createdPriceTextInput}
      {createdCurrencySelectInput}
      {createdQuantityTextInput}
      {createdAvailabilitySelectInput}
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
    productCategory === "Accessory" ? (
      <CreateAccessory
        accessoryColor={accessoryColor}
        accessoryFieldsAdditionalMap={accessoryFieldsAdditionalMap}
        accessoryInterface={accessoryInterface}
        accessoryType={accessoryType}
        areAccessoryFieldsAdditionalMapFocused={areAccessoryFieldsAdditionalMapFocused}
        areAccessoryFieldsAdditionalMapValid={areAccessoryFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
        isAccessoryColorFocused={isAccessoryColorFocused}
        isAccessoryColorValid={isAccessoryColorValid}
        isAccessoryTypeFocused={isAccessoryTypeFocused}
        isAccessoryTypeValid={isAccessoryTypeValid}
        padding={padding}
      />
    ) : productCategory === "Central Processing Unit (CPU)" ? (
      <CreateCpu
        areCpuFieldsAdditionalMapFocused={areCpuFieldsAdditionalMapFocused}
        areCpuFieldsAdditionalMapValid={areCpuFieldsAdditionalMapValid}
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
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
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
    ) : productCategory === "Computer Case" ? (
      <CreateCase
        areCaseFieldsAdditionalMapFocused={areCaseFieldsAdditionalMapFocused}
        areCaseFieldsAdditionalMapValid={areCaseFieldsAdditionalMapValid}
        caseColor={caseColor}
        caseFieldsAdditionalMap={caseFieldsAdditionalMap}
        caseSidePanel={caseSidePanel}
        caseType={caseType}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
        isCaseColorFocused={isCaseColorFocused}
        isCaseColorValid={isCaseColorValid}
        padding={padding}
      />
    ) : productCategory === "Desktop Computer" ? (
      <CreateDesktopComputer
        // case
        areCaseFieldsAdditionalMapFocused={areCaseFieldsAdditionalMapFocused}
        areCaseFieldsAdditionalMapValid={areCaseFieldsAdditionalMapValid}
        borderColor={borderColor}
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
        areDisplayFieldsAdditionalMapFocused={areDisplayFieldsAdditionalMapFocused}
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
        isDisplayResolutionHorizontalFocused={isDisplayResolutionHorizontalFocused}
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
        areKeyboardFieldsAdditionalMapFocused={areKeyboardFieldsAdditionalMapFocused}
        areKeyboardFieldsAdditionalMapValid={areKeyboardFieldsAdditionalMapValid}
        keyboardBacklight={keyboardBacklight}
        keyboardFieldsAdditionalMap={keyboardFieldsAdditionalMap}
        keyboardInterface={keyboardInterface}
        keyboardLayout={keyboardLayout}
        keyboardSwitch={keyboardSwitch}
        // motherboard
        areMotherboardFieldsAdditionalMapFocused={
          areMotherboardFieldsAdditionalMapFocused
        }
        areMotherboardFieldsAdditionalMapValid={areMotherboardFieldsAdditionalMapValid}
        isMotherboardChipsetFocused={isMotherboardChipsetFocused}
        isMotherboardChipsetValid={isMotherboardChipsetValid}
        isMotherboardM2SlotsFocused={isMotherboardM2SlotsFocused}
        isMotherboardM2SlotsValid={isMotherboardM2SlotsValid}
        isMotherboardMemoryMaxCapacityFocused={isMotherboardMemoryMaxCapacityFocused}
        isMotherboardMemoryMaxCapacityValid={isMotherboardMemoryMaxCapacityValid}
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
        areSpeakerFieldsAdditionalMapFocused={areSpeakerFieldsAdditionalMapFocused}
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
        areStorageFieldsAdditionalMapFocused={areStorageFieldsAdditionalMapFocused}
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
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
        padding={padding}
      />
    ) : productCategory === "Display" ? (
      <CreateDisplay
        areDisplayFieldsAdditionalMapFocused={areDisplayFieldsAdditionalMapFocused}
        areDisplayFieldsAdditionalMapValid={areDisplayFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
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
        isDisplayResolutionHorizontalFocused={isDisplayResolutionHorizontalFocused}
        isDisplayResolutionHorizontalValid={isDisplayResolutionHorizontalValid}
        isDisplayResolutionVerticalFocused={isDisplayResolutionVerticalFocused}
        isDisplayResolutionVerticalValid={isDisplayResolutionVerticalValid}
        isDisplayResponseTimeFocused={isDisplayResponseTimeFocused}
        isDisplayResponseTimeValid={isDisplayResponseTimeValid}
        isDisplaySizeFocused={isDisplaySizeFocused}
        isDisplaySizeValid={isDisplaySizeValid}
        padding={padding}
      />
    ) : productCategory === "Graphics Processing Unit (GPU)" ? (
      <CreateGpu
        areGpuFieldsAdditionalMapFocused={areGpuFieldsAdditionalMapFocused}
        areGpuFieldsAdditionalMapValid={areGpuFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
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
    ) : productCategory === "Headphone" ? (
      <CreateHeadphone
        areHeadphoneFieldsAdditionalMapFocused={areHeadphoneFieldsAdditionalMapFocused}
        areHeadphoneFieldsAdditionalMapValid={areHeadphoneFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
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
        isHeadphoneFrequencyResponseFocused={isHeadphoneFrequencyResponseFocused}
        isHeadphoneFrequencyResponseValid={isHeadphoneFrequencyResponseValid}
        isHeadphoneImpedanceFocused={isHeadphoneImpedanceFocused}
        isHeadphoneImpedanceValid={isHeadphoneImpedanceValid}
        padding={padding}
      />
    ) : productCategory === "Keyboard" ? (
      <CreateKeyboard
        areKeyboardFieldsAdditionalMapFocused={areKeyboardFieldsAdditionalMapFocused}
        areKeyboardFieldsAdditionalMapValid={areKeyboardFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
        keyboardBacklight={keyboardBacklight}
        keyboardFieldsAdditionalMap={keyboardFieldsAdditionalMap}
        keyboardInterface={keyboardInterface}
        keyboardLayout={keyboardLayout}
        keyboardSwitch={keyboardSwitch}
        padding={padding}
      />
    ) : productCategory === "Laptop" ? (
      <CreateLaptop
        // cpu
        borderColor={borderColor}
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
        areDisplayFieldsAdditionalMapFocused={areDisplayFieldsAdditionalMapFocused}
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
        isDisplayResolutionHorizontalFocused={isDisplayResolutionHorizontalFocused}
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
        areStorageFieldsAdditionalMapFocused={areStorageFieldsAdditionalMapFocused}
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
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
        padding={padding}
      />
    ) : productCategory === "Memory (RAM)" ? (
      <CreateRam
        areRamFieldsAdditionalMapFocused={areRamFieldsAdditionalMapFocused}
        areRamFieldsAdditionalMapValid={areRamFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
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
    ) : productCategory === "Mouse" ? (
      <CreateMouse
        areMouseFieldsAdditionalMapFocused={areMouseFieldsAdditionalMapFocused}
        areMouseFieldsAdditionalMapValid={areMouseFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
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
    ) : productCategory === "Motherboard" ? (
      <CreateMotherboard
        areMotherboardFieldsAdditionalMapFocused={
          areMotherboardFieldsAdditionalMapFocused
        }
        areMotherboardFieldsAdditionalMapValid={areMotherboardFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
        isMotherboardChipsetFocused={isMotherboardChipsetFocused}
        isMotherboardChipsetValid={isMotherboardChipsetValid}
        isMotherboardM2SlotsFocused={isMotherboardM2SlotsFocused}
        isMotherboardM2SlotsValid={isMotherboardM2SlotsValid}
        isMotherboardMemoryMaxCapacityFocused={isMotherboardMemoryMaxCapacityFocused}
        isMotherboardMemoryMaxCapacityValid={isMotherboardMemoryMaxCapacityValid}
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
    ) : productCategory === "Power Supply Unit (PSU)" ? (
      <CreatePsu
        arePsuFieldsAdditionalMapFocused={arePsuFieldsAdditionalMapFocused}
        arePsuFieldsAdditionalMapValid={arePsuFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
        isPsuWattageFocused={isPsuWattageFocused}
        isPsuWattageValid={isPsuWattageValid}
        padding={padding}
        psuEfficiency={psuEfficiency}
        psuFieldsAdditionalMap={psuFieldsAdditionalMap}
        psuFormFactor={psuFormFactor}
        psuModularity={psuModularity}
        psuWattage={psuWattage}
      />
    ) : productCategory === "Smartphone" ? (
      <CreateSmartphone
        areSmartphoneFieldsAdditionalMapFocused={areSmartphoneFieldsAdditionalMapFocused}
        areSmartphoneFieldsAdditionalMapValid={areSmartphoneFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
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
        isSmartphoneResolutionHorizontalFocused={isSmartphoneResolutionHorizontalFocused}
        isSmartphoneResolutionHorizontalValid={isSmartphoneResolutionHorizontalValid}
        isSmartphoneResolutionVerticalFocused={isSmartphoneResolutionVerticalFocused}
        isSmartphoneResolutionVerticalValid={isSmartphoneResolutionVerticalValid}
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
    ) : productCategory === "Speaker" ? (
      <CreateSpeaker
        areSpeakerFieldsAdditionalMapFocused={areSpeakerFieldsAdditionalMapFocused}
        areSpeakerFieldsAdditionalMapValid={areSpeakerFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
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
    ) : productCategory === "Storage" ? (
      <CreateStorage
        areStorageFieldsAdditionalMapFocused={areStorageFieldsAdditionalMapFocused}
        areStorageFieldsAdditionalMapValid={areStorageFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
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
    ) : productCategory === "Tablet" ? (
      <CreateTablet
        areTabletFieldsAdditionalMapFocused={areTabletFieldsAdditionalMapFocused}
        areTabletFieldsAdditionalMapValid={areTabletFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
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
        isTabletResolutionHorizontalFocused={isTabletResolutionHorizontalFocused}
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
    ) : productCategory === "Webcam" ? (
      <CreateWebcam
        areWebcamFieldsAdditionalMapFocused={areWebcamFieldsAdditionalMapFocused}
        areWebcamFieldsAdditionalMapValid={areWebcamFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
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
        areMicrophoneFieldsAdditionalMapFocused={areMicrophoneFieldsAdditionalMapFocused}
        areMicrophoneFieldsAdditionalMapValid={areMicrophoneFieldsAdditionalMapValid}
        createProductAction={createProductAction}
        createProductDispatch={createProductDispatch}
        currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
        isMicrophoneColorFocused={isMicrophoneColorFocused}
        isMicrophoneColorValid={isMicrophoneColorValid}
        isMicrophoneFrequencyResponseFocused={isMicrophoneFrequencyResponseFocused}
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

      {displaySelectedProductCategoryInputs}
    </FormLayoutWrapper>
  );

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    FORM REVIEW OBJECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // - used to display the input values in the form review page of the Stepper component
  // - inputs whose values are in error are highlighted in red
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  // ╔═════════════════════════════════════════════════════════════════╗
  //    PAGE 1
  // ╚═════════════════════════════════════════════════════════════════╝
  const page1FormReviewObject: FormReviewObjectArray = {
    "Product Details": [
      {
        inputName: "Brand",
        inputValue: brand,
        isInputValueValid: isBrandValid,
      },
      {
        inputName: "Model",
        inputValue: model,
        isInputValueValid: isModelValid,
      },
      {
        inputName: "Description",
        inputValue: description,
        isInputValueValid: isDescriptionValid,
      },
      {
        inputName: "Price",
        inputValue: price,
        isInputValueValid: isPriceValid,
      },
      {
        inputName: "Currency",
        inputValue: currency,
      },
      {
        inputName: "Availability",
        inputValue: availability,
      },
      {
        inputName: "Quantity",
        inputValue: quantity,
        isInputValueValid: isQuantityValid,
      },
      {
        inputName: "Weight",
        inputValue: weight,
        isInputValueValid: isWeightValid,
      },
      {
        inputName: "Dimension Length",
        inputValue: dimensionLength,
        isInputValueValid: isDimensionLengthValid,
      },
      {
        inputName: "Dimension Length Unit",
        inputValue: dimensionLengthUnit,
      },
      {
        inputName: "Dimension Height",
        inputValue: dimensionHeight,
        isInputValueValid: isDimensionHeightValid,
      },
      {
        inputName: "Dimension Height Unit",
        inputValue: dimensionHeightUnit,
      },
      {
        inputName: "Dimension Width",
        inputValue: dimensionWidth,
        isInputValueValid: isDimensionWidthValid,
      },
      {
        inputName: "Dimension Width Unit",
        inputValue: dimensionWidthUnit,
      },
      {
        inputName: "Additional Comments",
        inputValue: additionalComments,
        isInputValueValid: additionalComments.length ? isAdditionalCommentsValid : true,
      },
    ],
  };

  // ╔═════════════════════════════════════════════════════════════════╗
  //    PAGE 2
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ACCESSORY
  // ╰─────────────────────────────────────────────────────────────────╯
  const accessoryFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: accessoryFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areAccessoryFieldsAdditionalMapValid,
      productCategorySimple: "Accessory",
    });

  const page2AccessoryFormReviewObject: FormReviewObjectArray = {
    "Accessory Specifications": [
      {
        inputName: "Accessory Type",
        inputValue: accessoryType,
        isInputValueValid: isAccessoryTypeValid,
      },
      {
        inputName: "Accessory Color",
        inputValue: accessoryColor,
        isInputValueValid: isAccessoryColorValid,
      },
      {
        inputName: "Accessory Interface",
        inputValue: accessoryInterface,
      },
      ...accessoryFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CENTRAL PROCESSING UNIT (CPU)
  // ╰─────────────────────────────────────────────────────────────────╯
  const cpuFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: cpuFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areCpuFieldsAdditionalMapValid,
      productCategorySimple: "CPU",
    });

  const page2CpuFormReviewObject: FormReviewObjectArray = {
    "CPU Specifications": [
      {
        inputName: "CPU Socket",
        inputValue: cpuSocket,
        isInputValueValid: isCpuSocketValid,
      },
      {
        inputName: "CPU Frequency",
        inputValue: cpuFrequency,
        isInputValueValid: isCpuFrequencyValid,
      },
      {
        inputName: "CPU Cores",
        inputValue: cpuCores,
        isInputValueValid: isCpuCoresValid,
      },
      {
        inputName: "CPU L1 Cache Capacity",
        inputValue: cpuL1CacheCapacity,
        isInputValueValid: isCpuL1CacheCapacityValid,
      },
      {
        inputName: "CPU L1 Cache Capacity Unit",
        inputValue: cpuL1CacheCapacityUnit,
      },
      {
        inputName: "CPU L2 Cache Capacity",
        inputValue: cpuL2CacheCapacity,
        isInputValueValid: isCpuL2CacheCapacityValid,
      },
      {
        inputName: "CPU L2 Cache Capacity Unit",
        inputValue: cpuL2CacheCapacityUnit,
      },
      {
        inputName: "CPU L3 Cache Capacity",
        inputValue: cpuL3CacheCapacity,
        isInputValueValid: isCpuL3CacheCapacityValid,
      },
      {
        inputName: "CPU L3 Cache Capacity Unit",
        inputValue: cpuL3CacheCapacityUnit,
      },
      {
        inputName: "CPU Wattage",
        inputValue: cpuWattage,
        isInputValueValid: isCpuWattageValid,
      },
      ...cpuFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    COMPUTER CASE
  // ╰─────────────────────────────────────────────────────────────────╯
  const caseFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: caseFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areCaseFieldsAdditionalMapValid,
      productCategorySimple: "Case",
    });

  const page2ComputerCaseFormReviewObject: FormReviewObjectArray = {
    "Case Specifications": [
      {
        inputName: "Case Type",
        inputValue: caseType,
      },
      {
        inputName: "Case Color",
        inputValue: caseColor,
        isInputValueValid: isCaseColorValid,
      },
      {
        inputName: "Case Side Panel",
        inputValue: caseSidePanel,
      },
      ...caseFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯
  const displayFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: displayFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areDisplayFieldsAdditionalMapValid,
      productCategorySimple: "Display",
    });

  const page2DisplayFormReviewObject: FormReviewObjectArray = {
    "Display Specifications": [
      {
        inputName: "Display Size",
        inputValue: displaySize,
        isInputValueValid: isDisplaySizeValid,
      },
      {
        inputName: "Display Resolution Horizontal",
        inputValue: displayResolutionHorizontal,
        isInputValueValid: isDisplayResolutionHorizontalValid,
      },
      {
        inputName: "Display Resolution Vertical",
        inputValue: displayResolutionVertical,
        isInputValueValid: isDisplayResolutionVerticalValid,
      },
      {
        inputName: "Display Refresh Rate",
        inputValue: displayRefreshRate,
        isInputValueValid: isDisplayRefreshRateValid,
      },
      {
        inputName: "Display Panel Type",
        inputValue: displayPanelType,
      },
      {
        inputName: "Display Response Time",
        inputValue: displayResponseTime,
        isInputValueValid: isDisplayResponseTimeValid,
      },
      {
        inputName: "Display Aspect Ratio",
        inputValue: displayAspectRatio,
        isInputValueValid: isDisplayAspectRatioValid,
      },
      ...displayFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GRAPHICS PROCESSING UNIT (GPU)
  // ╰─────────────────────────────────────────────────────────────────╯
  const gpuFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: gpuFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areGpuFieldsAdditionalMapValid,
      productCategorySimple: "GPU",
    });

  const page2GpuFormReviewObject: FormReviewObjectArray = {
    "GPU Specifications": [
      {
        inputName: "GPU Chipset",
        inputValue: gpuChipset,
        isInputValueValid: isGpuChipsetValid,
      },
      {
        inputName: "GPU Memory Capacity",
        inputValue: gpuMemoryCapacity,
        isInputValueValid: isGpuMemoryCapacityValid,
      },
      {
        inputName: "GPU Memory Capacity Unit",
        inputValue: gpuMemoryCapacityUnit,
      },
      {
        inputName: "GPU Core Clock",
        inputValue: gpuCoreClock,
        isInputValueValid: isGpuCoreClockValid,
      },
      {
        inputName: "GPU Boost Clock",
        inputValue: gpuBoostClock,
        isInputValueValid: isGpuBoostClockValid,
      },
      {
        inputName: "GPU Wattage",
        inputValue: gpuTdp,
        isInputValueValid: isGpuTdpValid,
      },
      ...gpuFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  const headphoneFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: headphoneFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areHeadphoneFieldsAdditionalMapValid,
      productCategorySimple: "Headphone",
    });

  const page2HeadphoneFormReviewObject: FormReviewObjectArray = {
    "Headphone Specifications": [
      {
        inputName: "Headphone Type",
        inputValue: headphoneType,
      },
      {
        inputName: "Headphone Driver",
        inputValue: headphoneDriver,
        isInputValueValid: isHeadphoneDriverValid,
      },
      {
        inputName: "Headphone Frequency Response",
        inputValue: headphoneFrequencyResponse,
        isInputValueValid: isHeadphoneFrequencyResponseValid,
      },
      {
        inputName: "Headphone Impedance",
        inputValue: headphoneImpedance,
        isInputValueValid: isHeadphoneImpedanceValid,
      },
      {
        inputName: "Headphone Color",
        inputValue: headphoneColor,
        isInputValueValid: isHeadphoneColorValid,
      },
      {
        inputName: "Headphone Interface",
        inputValue: headphoneInterface,
      },
      ...headphoneFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    KEYBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  const keyboardFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: keyboardFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areKeyboardFieldsAdditionalMapValid,
      productCategorySimple: "Keyboard",
    });

  const page2KeyboardFormReviewObject: FormReviewObjectArray = {
    "Keyboard Specifications": [
      {
        inputName: "Keyboard Switch",
        inputValue: keyboardSwitch,
      },
      {
        inputName: "Keyboard Layout",
        inputValue: keyboardLayout,
      },
      {
        inputName: "Keyboard Backlight",
        inputValue: keyboardBacklight,
      },
      {
        inputName: "Keyboard Interface",
        inputValue: keyboardInterface,
      },
      ...keyboardFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MEMORY (RAM)
  // ╰─────────────────────────────────────────────────────────────────╯
  const ramFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: ramFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areRamFieldsAdditionalMapValid,
      productCategorySimple: "RAM",
    });

  const page2RamFormReviewObject: FormReviewObjectArray = {
    "Memory (RAM) Specifications": [
      {
        inputName: "RAM Data Rate",
        inputValue: ramDataRate,
        isInputValueValid: isRamDataRateValid,
      },
      {
        inputName: "RAM Modules Quantity",
        inputValue: ramModulesQuantity,
        isInputValueValid: isRamModulesQuantityValid,
      },
      {
        inputName: "RAM Modules Capacity",
        inputValue: ramModulesCapacity,
        isInputValueValid: isRamModulesCapacityValid,
      },
      {
        inputName: "RAM Modules Capacity Unit",
        inputValue: ramModulesCapacityUnit,
      },
      {
        inputName: "RAM Type",
        inputValue: ramType,
      },
      {
        inputName: "RAM Color",
        inputValue: ramColor,
        isInputValueValid: isRamColorValid,
      },
      {
        inputName: "RAM Voltage",
        inputValue: ramVoltage,
        isInputValueValid: isRamVoltageValid,
      },
      {
        inputName: "RAM Timing",
        inputValue: ramTiming,
        isInputValueValid: isRamTimingValid,
      },
      ...ramFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOUSE
  // ╰─────────────────────────────────────────────────────────────────╯
  const mouseFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: mouseFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areMouseFieldsAdditionalMapValid,
      productCategorySimple: "Mouse",
    });

  const page2MouseFormReviewObject: FormReviewObjectArray = {
    "Mouse Specifications": [
      {
        inputName: "Mouse Sensor",
        inputValue: mouseSensor,
      },
      {
        inputName: "Mouse DPI",
        inputValue: mouseDpi,
        isInputValueValid: isMouseDpiValid,
      },
      {
        inputName: "Mouse Buttons",
        inputValue: mouseButtons,
        isInputValueValid: isMouseButtonsValid,
      },
      {
        inputName: "Mouse Color",
        inputValue: mouseColor,
        isInputValueValid: isMouseColorValid,
      },
      {
        inputName: "Mouse Interface",
        inputValue: mouseInterface,
      },
      ...mouseFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MICROPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  const microphoneFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: microphoneFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areMicrophoneFieldsAdditionalMapValid,
      productCategorySimple: "Microphone",
    });

  const page2MicrophoneFormReviewObject: FormReviewObjectArray = {
    "Microphone Specifications": [
      {
        inputName: "Microphone Type",
        inputValue: microphoneType,
      },
      {
        inputName: "Microphone Color",
        inputValue: microphoneColor,
        isInputValueValid: isMicrophoneColorValid,
      },
      {
        inputName: "Microphone Interface",
        inputValue: microphoneInterface,
      },
      {
        inputName: "Microphone Polar Pattern",
        inputValue: microphonePolarPattern,
      },
      {
        inputName: "Microphone Frequency Response",
        inputValue: microphoneFrequencyResponse,
        isInputValueValid: isMicrophoneFrequencyResponseValid,
      },
      ...microphoneFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD
  // ╰─────────────────────────────────────────────────────────────────╯
  const motherboardFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: motherboardFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areMotherboardFieldsAdditionalMapValid,
      productCategorySimple: "Motherboard",
    });

  const page2MotherboardFormReviewObject: FormReviewObjectArray = {
    "Motherboard Specifications": [
      {
        inputName: "Motherboard Socket",
        inputValue: motherboardSocket,
        isInputValueValid: isMotherboardSocketValid,
      },
      {
        inputName: "Motherboard Chipset",
        inputValue: motherboardChipset,
        isInputValueValid: isMotherboardChipsetValid,
      },
      {
        inputName: "Motherboard Form Factor",
        inputValue: motherboardFormFactor,
      },
      {
        inputName: "Motherboard Memory Max Capacity",
        inputValue: motherboardMemoryMaxCapacity,
        isInputValueValid: isMotherboardMemoryMaxCapacityValid,
      },
      {
        inputName: "Motherboard Memory Max Capacity Unit",
        inputValue: motherboardMemoryMaxCapacityUnit,
      },
      {
        inputName: "Motherboard Memory Slots",
        inputValue: motherboardMemorySlots,
        isInputValueValid: isMotherboardMemorySlotsValid,
      },
      {
        inputName: "Motherboard Memory Type",
        inputValue: motherboardMemoryType,
      },
      {
        inputName: "Motherboard SATA Ports",
        inputValue: motherboardSataPorts,
        isInputValueValid: isMotherboardSataPortsValid,
      },
      {
        inputName: "Motherboard M.2 Slots",
        inputValue: motherboardM2Slots,
        isInputValueValid: isMotherboardM2SlotsValid,
      },
      {
        inputName: "Motherboard PCIe 3.0 Slots",
        inputValue: motherboardPcie3Slots,
        isInputValueValid: isMotherboardPcie3SlotsValid,
      },
      {
        inputName: "Motherboard PCIe 4.0 Slots",
        inputValue: motherboardPcie4Slots,
        isInputValueValid: isMotherboardPcie4SlotsValid,
      },
      {
        inputName: "Motherboard PCIe 5.0 Slots",
        inputValue: motherboardPcie5Slots,
        isInputValueValid: motherboardPcie5Slots ? isMotherboardPcie5SlotsValid : true,
      },
      ...motherboardFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    POWER SUPPLY UNIT (PSU)
  // ╰─────────────────────────────────────────────────────────────────╯
  const psuFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: psuFieldsAdditionalMap,
      areAdditionalFieldsValidMap: arePsuFieldsAdditionalMapValid,
      productCategorySimple: "PSU",
    });

  const page2PowerSupplyFormReviewObject: FormReviewObjectArray = {
    "Power Supply Unit (PSU) Specifications": [
      {
        inputName: "PSU Wattage",
        inputValue: psuWattage,
        isInputValueValid: isPsuWattageValid,
      },
      {
        inputName: "PSU Efficiency Rating",
        inputValue: psuEfficiency,
      },
      {
        inputName: "PSU Form Factor",
        inputValue: psuFormFactor,
      },
      {
        inputName: "PSU Modularity",
        inputValue: psuModularity,
      },
      ...psuFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  const smartphoneFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: smartphoneFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areSmartphoneFieldsAdditionalMapValid,
      productCategorySimple: "Smartphone",
    });
  const page2SmartphoneFormReviewObject: FormReviewObjectArray = {
    "Smartphone Specifications": [
      {
        inputName: "Smartphone OS",
        inputValue: smartphoneOs,
      },
      {
        inputName: "Smartphone Chipset",
        inputValue: smartphoneChipset,
        isInputValueValid: isSmartphoneChipsetValid,
      },
      {
        inputName: "Smartphone Display",
        inputValue: smartphoneDisplay,
        isInputValueValid: isSmartphoneDisplayValid,
      },
      {
        inputName: "Smartphone Resolution Horizontal",
        inputValue: smartphoneResolutionHorizontal,
        isInputValueValid: isSmartphoneResolutionHorizontalValid,
      },
      {
        inputName: "Smartphone Resolution Vertical",
        inputValue: smartphoneResolutionVertical,
        isInputValueValid: isSmartphoneResolutionVerticalValid,
      },
      {
        inputName: "Smartphone RAM Capacity",
        inputValue: smartphoneRamCapacity,
        isInputValueValid: isSmartphoneRamCapacityValid,
      },
      {
        inputName: "Smartphone RAM Capacity Unit",
        inputValue: smartphoneRamCapacityUnit,
      },
      {
        inputName: "Smartphone Storage Capacity",
        inputValue: smartphoneStorageCapacity,
        isInputValueValid: isSmartphoneStorageCapacityValid,
      },
      {
        inputName: "Smartphone Battery Capacity",
        inputValue: smartphoneBatteryCapacity,
        isInputValueValid: isSmartphoneBatteryCapacityValid,
      },
      {
        inputName: "Smartphone Camera",
        inputValue: smartphoneCamera,
        isInputValueValid: isSmartphoneCameraValid,
      },
      {
        inputName: "Smartphone Color",
        inputValue: smartphoneColor,
        isInputValueValid: isSmartphoneColorValid,
      },
      ...smartphoneFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SPEAKER
  // ╰─────────────────────────────────────────────────────────────────╯
  const speakerFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: speakerFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areSpeakerFieldsAdditionalMapValid,
      productCategorySimple: "Speaker",
    });

  const page2SpeakerFormReviewObject: FormReviewObjectArray = {
    "Speaker Specifications": [
      {
        inputName: "Speaker Type",
        inputValue: speakerType,
      },
      {
        inputName: "Speaker Total Wattage",
        inputValue: speakerTotalWattage,
        isInputValueValid: isSpeakerTotalWattageValid,
      },
      {
        inputName: "Speaker Frequency Response",
        inputValue: speakerFrequencyResponse,
        isInputValueValid: isSpeakerFrequencyResponseValid,
      },
      {
        inputName: "Speaker Color",
        inputValue: speakerColor,
        isInputValueValid: isSpeakerColorValid,
      },
      {
        inputName: "Speaker Interface",
        inputValue: speakerInterface,
      },
      ...speakerFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE
  // ╰─────────────────────────────────────────────────────────────────╯
  const storageFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: storageFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areStorageFieldsAdditionalMapValid,
      productCategorySimple: "Storage",
    });

  const page2StorageFormReviewObject: FormReviewObjectArray = {
    "Storage Specifications": [
      {
        inputName: "Storage Type",
        inputValue: storageType,
      },
      {
        inputName: "Storage Capacity",
        inputValue: storageCapacity,
        isInputValueValid: isStorageCapacityValid,
      },
      {
        inputName: "Storage Capacity Unit",
        inputValue: storageCapacityUnit,
      },
      {
        inputName: "Storage Cache Capacity",
        inputValue: storageCacheCapacity,
        isInputValueValid: isStorageCacheCapacityValid,
      },
      {
        inputName: "Storage Cache Capacity Unit",
        inputValue: storageCacheCapacityUnit,
      },
      {
        inputName: "Storage Form Factor",
        inputValue: storageFormFactor,
      },
      {
        inputName: "Storage Interface",
        inputValue: storageInterface,
      },
      ...storageFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET
  // ╰─────────────────────────────────────────────────────────────────╯
  const tabletFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: tabletFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areTabletFieldsAdditionalMapValid,
      productCategorySimple: "Tablet",
    });

  const page2TabletFormReviewObject: FormReviewObjectArray = {
    "Tablet Specifications": [
      {
        inputName: "Tablet OS",
        inputValue: tabletOs,
      },
      {
        inputName: "Tablet Chipset",
        inputValue: tabletChipset,
        isInputValueValid: isTabletChipsetValid,
      },
      {
        inputName: "Tablet Display",
        inputValue: tabletDisplay,
        isInputValueValid: isTabletDisplayValid,
      },
      {
        inputName: "Tablet Resolution Horizontal",
        inputValue: tabletResolutionHorizontal,
        isInputValueValid: isTabletResolutionHorizontalValid,
      },
      {
        inputName: "Tablet Resolution Vertical",
        inputValue: tabletResolutionVertical,
        isInputValueValid: isTabletResolutionVerticalValid,
      },
      {
        inputName: "Tablet RAM Capacity",
        inputValue: tabletRamCapacity,
        isInputValueValid: isTabletRamCapacityValid,
      },
      {
        inputName: "Tablet RAM Capacity Unit",
        inputValue: tabletRamCapacityUnit,
      },
      {
        inputName: "Tablet Storage Capacity",
        inputValue: tabletStorageCapacity,
        isInputValueValid: isTabletStorageCapacityValid,
      },
      {
        inputName: "Tablet Battery Capacity",
        inputValue: tabletBatteryCapacity,
        isInputValueValid: isTabletBatteryCapacityValid,
      },
      {
        inputName: "Tablet Camera",
        inputValue: tabletCamera,
        isInputValueValid: isTabletCameraValid,
      },
      {
        inputName: "Tablet Color",
        inputValue: tabletColor,
        isInputValueValid: isTabletColorValid,
      },
      ...tabletFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    WEBCAM
  // ╰─────────────────────────────────────────────────────────────────╯
  const webcamFieldsAdditionalMapFormReviewObjects =
    returnFormReviewObjectsFromUserDefinedFields({
      additionalFieldsMap: webcamFieldsAdditionalMap,
      areAdditionalFieldsValidMap: areWebcamFieldsAdditionalMapValid,
      productCategorySimple: "Webcam",
    });

  const page2WebcamFormReviewObject: FormReviewObjectArray = {
    "Webcam Specifications": [
      {
        inputName: "Webcam Resolution",
        inputValue: webcamResolution,
      },
      {
        inputName: "Webcam Color",
        inputValue: webcamColor,
        isInputValueValid: isWebcamColorValid,
      },
      {
        inputName: "Webcam Microphone",
        inputValue: webcamMicrophone,
      },
      {
        inputName: "Webcam Interface",
        inputValue: webcamInterface,
      },
      {
        inputName: "Webcam Frame Rate",
        inputValue: webcamFrameRate,
      },
      ...webcamFieldsAdditionalMapFormReviewObjects,
    ],
  };

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DESKTOP COMPUTER
  // ╰─────────────────────────────────────────────────────────────────╯
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

  // ╭─────────────────────────────────────────────────────────────────╮
  //    LAPTOP
  // ╰─────────────────────────────────────────────────────────────────╯
  const page2LaptopComputerFormReviewObject: FormReviewObjectArray = {
    ...page2CpuFormReviewObject,
    ...page2GpuFormReviewObject,
    ...page2RamFormReviewObject,
    ...page2StorageFormReviewObject,
  };

  // ╔═════════════════════════════════════════════════════════════════╗
  //    PAGE 3
  // ╚═════════════════════════════════════════════════════════════════╝
  const page3ImageUploadsFormReviewObject: FormReviewObjectArray = {
    "Upload Images": [
      {
        inputName: "Images",
        inputValue: stepsInError.has(2) ? "Error" : "Valid",
        isInputValueValid: !stepsInError.has(2),
      },
    ],
  };

  const CREATE_PRODUCT_FORM_REVIEW_OBJECTS: FormReviewObjectArray = {
    ...page1FormReviewObject,
    ...(productCategory === "Accessory"
      ? page2AccessoryFormReviewObject
      : productCategory === "Central Processing Unit (CPU)"
      ? page2CpuFormReviewObject
      : productCategory === "Computer Case"
      ? page2ComputerCaseFormReviewObject
      : productCategory === "Desktop Computer"
      ? page2DesktopComputerFormReviewObject
      : productCategory === "Graphics Processing Unit (GPU)"
      ? page2GpuFormReviewObject
      : productCategory === "Headphone"
      ? page2HeadphoneFormReviewObject
      : productCategory === "Keyboard"
      ? page2KeyboardFormReviewObject
      : productCategory === "Laptop"
      ? page2LaptopComputerFormReviewObject
      : productCategory === "Memory (RAM)"
      ? page2RamFormReviewObject
      : productCategory === "Mouse"
      ? page2MouseFormReviewObject
      : productCategory === "Display"
      ? page2DisplayFormReviewObject
      : productCategory === "Motherboard"
      ? page2MotherboardFormReviewObject
      : productCategory === "Power Supply Unit (PSU)"
      ? page2PowerSupplyFormReviewObject
      : productCategory === "Smartphone"
      ? page2SmartphoneFormReviewObject
      : productCategory === "Speaker"
      ? page2SpeakerFormReviewObject
      : productCategory === "Storage"
      ? page2StorageFormReviewObject
      : productCategory === "Tablet"
      ? page2TabletFormReviewObject
      : productCategory === "Webcam"
      ? page2WebcamFormReviewObject
      : page2MicrophoneFormReviewObject),
    ...page3ImageUploadsFormReviewObject,
  };

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
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
          navigate("/home/product/display");
        },
      ]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={<Title order={4}>{isSuccessful ? "Success!" : "Submitting ..."}</Title>}
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

 */
