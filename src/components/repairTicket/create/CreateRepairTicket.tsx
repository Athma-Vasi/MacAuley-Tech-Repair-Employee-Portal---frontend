import { useDisclosure } from "@mantine/hooks";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { Container, Stack, Title } from "@mantine/core";
import { useAuth } from "../../../hooks";
import { HttpServerResponse } from "../../../types";
import {
  fetchRequestPOSTSafe,
  fetchSafe,
  logState,
  responseToJSONSafe,
  urlBuilder,
} from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleStepper } from "../../accessibleInputs/AccessibleStepper";
import {
  CUSTOMER_RESOURCE_ROUTE_PATHS,
  returnCustomerStepperPages,
} from "../../customer/constants";
import { CustomerDocument } from "../../customer/types";
import { NotificationModal } from "../../notificationModal";
import { Query } from "../../query/Query";
import type { RepairTicketInitialSchema } from "../types";
import { RepairTicketStepDetails } from "./RepairTicketStepDetails";
import { RepairTicketStepPart } from "./RepairTicketStepPart";
import { createRepairTicketAction } from "./actions";
import {
  CREATE_REPAIR_TICKET_ROLE_PATHS,
  returnCreateRepairNoteStepperPages,
} from "./constants";
import { createRepairTicketReducer } from "./reducers";
import { initialCreateRepairTicketState } from "./state";

function CreateRepairTicket() {
  const [createRepairTicketState, createRepairTicketDispatch] = useReducer(
    createRepairTicketReducer,
    initialCreateRepairTicketState,
  );

  const {
    // customer information search - page 1
    customerSearchField,
    customerSearchKeyword,
    selectedFieldData,
    selectedCustomer,

    // part information - page 2
    partName,
    partSerialId,
    dateReceived,
    descriptionOfIssue,
    initialInspectionNotes,

    // repair information - page 3
    repairCategory,
    requiredRepairs,
    partsNeeded,
    partsNeededModels,
    partUnderWarranty,
    estimatedRepairCost,
    estimatedRepairCostCurrency,
    estimatedCompletionDate,
    repairPriority,

    // work order id is generated by the system
    // rest of the information is updated by the repair technician after the initial repair note is created

    queryString,
    triggerCustomerSearchSubmit,
    triggerRepairFormSubmit,
    pagesInError,
    isSubmitting,
    isSuccessful,
    isLoading,
  } = createRepairTicketState;

  const {
    authState: {
      accessToken,
      decodedToken: { userInfo: { userId, username, roles }, sessionId },
    },
  } = useAuth();

  const [
    openedSubmitFormModal,
    {
      open: openSubmitFormModal,
      close: closeSubmitFormModal,
    },
  ] = useDisclosure(false);

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const fetchAbortControllerRef = useRef<AbortController | null>(null);
  const isComponentMountedRef = useRef(false);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    const isComponentMounted = isComponentMountedRef.current;

    async function handleCustomerSearchFormSubmit() {
      openSubmitFormModal();

      createRepairTicketDispatch({
        action: createRepairTicketAction.setIsSuccessful,
        payload: false,
      });
      createRepairTicketDispatch({
        action: createRepairTicketAction.setIsSubmitting,
        payload: true,
      });

      const userRole = roles.includes("Manager")
        ? "manager"
        : roles.includes("Admin")
        ? "admin"
        : "employee";

      const url = urlBuilder({
        path: CUSTOMER_RESOURCE_ROUTE_PATHS[userRole],
        query: queryString,
      });

      const requestInit: RequestInit = {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
        signal: fetchAbortController.signal,
      };

      const responseResult = await fetchSafe(url, requestInit);

      if (!isComponentMounted) {
        return;
      }

      if (responseResult.err) {
        showBoundary(responseResult.val.data);
        return;
      }

      const responseUnwrapped = responseResult.safeUnwrap().data;

      if (responseUnwrapped === undefined) {
        showBoundary(new Error("No data returned from server"));
        return;
      }

      const jsonResult = await responseToJSONSafe<
        HttpServerResponse<CustomerDocument>
      >(
        responseUnwrapped,
      );

      if (!isComponentMounted) {
        return;
      }

      if (jsonResult.err) {
        showBoundary(jsonResult.val.data);
        return;
      }

      const serverResponse = jsonResult.safeUnwrap().data;

      if (serverResponse === undefined) {
        showBoundary(new Error("No data returned from server"));
        return;
      }

      console.group("Customer Search Result");
      console.log(
        "serverResponse",
        serverResponse,
      );
      console.log("accessToken", accessToken);
      console.groupEnd();

      createRepairTicketDispatch({
        action: createRepairTicketAction.setCustomerSearchResults,
        payload: serverResponse.data,
      });
      createRepairTicketDispatch({
        action: createRepairTicketAction.setTotalDocuments,
        payload: serverResponse.totalDocuments,
      });
      createRepairTicketDispatch({
        action: createRepairTicketAction.setTotalPages,
        payload: serverResponse.pages,
      });
      createRepairTicketDispatch({
        action: createRepairTicketAction.setIsSubmitting,
        payload: false,
      });
      createRepairTicketDispatch({
        action: createRepairTicketAction.setIsSuccessful,
        payload: true,
      });
      createRepairTicketDispatch({
        action: createRepairTicketAction.setTriggerCustomerSearchSubmit,
        payload: false,
      });

      closeSubmitFormModal();
    }

    if (triggerCustomerSearchSubmit) {
      handleCustomerSearchFormSubmit();
    }

    return () => {
      fetchAbortController.abort();
      isComponentMountedRef.current = false;
    };
  }, [triggerCustomerSearchSubmit]);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    const isComponentMounted = isComponentMountedRef.current;

    async function repairTicketFormSubmit() {
      const repairTicketSchema: RepairTicketInitialSchema = {
        customerId: selectedCustomer?._id ?? "",
        // part information
        partName,
        partSerialId,
        dateReceived,
        descriptionOfIssue,
        initialInspectionNotes,
        // repair information
        repairCategory,
        requiredRepairs,
        partsNeeded,
        partsNeededModels,
        partUnderWarranty,
        estimatedRepairCost: Number.parseFloat(estimatedRepairCost),
        estimatedRepairCostCurrency,
        estimatedCompletionDate,
        repairPriority,
        // rest are fields updated as repair note progresses
      };

      await fetchRequestPOSTSafe({
        accessToken,
        closeSubmitFormModal,
        dispatch: createRepairTicketDispatch,
        fetchAbortController,
        isComponentMounted,
        isSubmittingAction: createRepairTicketAction.setIsSubmitting,
        isSuccessfulAction: createRepairTicketAction.setIsSuccessful,
        openSubmitFormModal,
        roleResourceRoutePaths: CREATE_REPAIR_TICKET_ROLE_PATHS,
        roles,
        schema: repairTicketSchema,
        triggerFormSubmitAction:
          createRepairTicketAction.setTriggerRepairFormSubmit,
      });
    }

    if (triggerRepairFormSubmit) {
      repairTicketFormSubmit();
    }

    return () => {
      fetchAbortController.abort();
      isComponentMountedRef.current = false;
    };
  }, [triggerRepairFormSubmit]);

  const submitCustomerSearchButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "All inputs are valid. Click to submit form",
        disabledScreenreaderText: "Please fix errors before submitting form",
        disabled: pagesInError.size > 0 || triggerCustomerSearchSubmit,
        kind: "submit",
        name: "submit",
        onClick: (_event: React.MouseEvent<HTMLButtonElement>) => {
          createRepairTicketDispatch({
            action: createRepairTicketAction.setTriggerCustomerSearchSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const submitRepairTicketButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "All inputs are valid. Click to submit form",
        disabledScreenreaderText: "Please fix errors before submitting form",
        disabled: pagesInError.size > 0 || triggerRepairFormSubmit,
        kind: "submit",
        name: "submit",
        onClick: (_event: React.MouseEvent<HTMLButtonElement>) => {
          createRepairTicketDispatch({
            action: createRepairTicketAction.setTriggerRepairFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[closeSubmitFormModal]}
      opened={openedSubmitFormModal}
      notificationProps={{
        loading: isSubmitting,
        text: "Submitting Repair Ticket form ...",
      }}
      title={<Title order={4}>Submitting request...</Title>}
      withCloseButton={false}
    />
  );

  const CREATE_REPAIR_TICKET_STEPPER_PAGES =
    returnCreateRepairNoteStepperPages();

  logState({
    state: createRepairTicketState,
    groupLabel: "Create Repair Ticket State",
  });

  // const firstPageElements = (
  //   <RepairTicketStepCustomer
  //     createRepairTicketAction={createRepairTicketAction}
  //     createRepairTicketDispatch={createRepairTicketDispatch}
  //     customerSearchField={customerSearchField}
  //     customerSearchKeyword={customerSearchKeyword}
  //     isLoading={isLoading}
  //     selectedCustomer={selectedCustomer}
  //     stepperPages={CREATE_REPAIR_TICKET_STEPPER_PAGES}
  //   />
  // );

  const firstPageElements = (
    <Stack>
      <Query
        collectionName="Customer"
        stepperPages={returnCustomerStepperPages()}
        invalidValueAction={createRepairTicketAction.setPageInError}
        parentDispatch={createRepairTicketDispatch}
        validValueAction={createRepairTicketAction.setQueryString}
      />
      {submitCustomerSearchButton}
    </Stack>
  );

  const secondPageElements = (
    <RepairTicketStepPart
      createRepairTicketAction={createRepairTicketAction}
      createRepairTicketDispatch={createRepairTicketDispatch}
      dateReceived={dateReceived}
      descriptionOfIssue={descriptionOfIssue}
      initialInspectionNotes={initialInspectionNotes}
      partName={partName}
      partSerialId={partSerialId}
      stepperPages={CREATE_REPAIR_TICKET_STEPPER_PAGES}
    />
  );

  const thirdPageElements = (
    <RepairTicketStepDetails
      createRepairTicketAction={createRepairTicketAction}
      createRepairTicketDispatch={createRepairTicketDispatch}
      estimatedCompletionDate={estimatedCompletionDate}
      estimatedRepairCost={estimatedRepairCost}
      estimatedRepairCostCurrency={estimatedRepairCostCurrency}
      partUnderWarranty={partUnderWarranty}
      partsNeeded={partsNeeded}
      partsNeededModels={partsNeededModels}
      repairPriority={repairPriority}
      requiredRepairs={requiredRepairs}
      stepperPages={CREATE_REPAIR_TICKET_STEPPER_PAGES}
    />
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: createRepairTicketState,
        invalidValueAction: createRepairTicketAction.setPageInError,
        pageElements: [
          firstPageElements,
          secondPageElements,
          thirdPageElements,
        ],
        parentDispatch: createRepairTicketDispatch,
        stepsInError: pagesInError,
        stepperPages: CREATE_REPAIR_TICKET_STEPPER_PAGES,
        submitButton: submitRepairTicketButton,
      }}
    />
  );

  return (
    <Container>
      {displaySubmitSuccessNotificationModal}
      {stepper}
    </Container>
  );
}

export default CreateRepairTicket;

/**
 * function CreateRepairTicket() {
  const [createRepairTicketState, createRepairTicketDispatch] = useReducer(
    createRepairTicketReducer,
    initialCreateRepairTicketState,
  );
  const {
    // customer search
    customerId,
    currentSearchObject,
    customerSearchResults,
    searchOperator,
    clearSearchInputs,
    currentSearchResultPage,
    deleteSearchObjectField,

    username,
    isValidUsername,
    isUsernameFocused,

    email,
    isValidEmail,
    isEmailFocused,

    firstName,
    isValidFirstName,
    isFirstNameFocused,

    middleName,
    isValidMiddleName,
    isMiddleNameFocused,

    lastName,
    isValidLastName,
    isLastNameFocused,

    preferredName,
    isValidPreferredName,
    isPreferredNameFocused,

    contactNumber,
    isValidContactNumber,
    isContactNumberFocused,

    addressLine,
    isValidAddressLine,
    isAddressLineFocused,

    city,
    isValidCity,
    isCityFocused,

    country,
    province,
    state,

    postalCode,
    isValidPostalCode,
    isPostalCodeFocused,

    // device info
    partName,
    isValidPartName,
    isPartNameFocused,

    partSerialId,
    isValidPartSerialId,
    isPartSerialIdFocused,

    dateReceived,
    isValidDateReceived,
    isDateReceivedFocused,

    descriptionOfIssue,
    isValidDescriptionOfIssue,
    isDescriptionOfIssueFocused,

    initialInspectionNotes,
    isValidInitialInspectionNotes,
    isInitialInspectionNotesFocused,

    // repair info
    repairCategory,
    requiredRepairs,
    partsNeeded,
    partsNeededModels,
    isValidPartsNeededModels,
    isPartsNeededModelsFocused,

    partUnderWarranty,
    estimatedRepairCost,
    isValidEstimatedRepairCost,
    isEstimatedRepairCostFocused,

    estimatedRepairCostCurrency,
    estimatedCompletionDate,
    isValidEstimatedCompletionDate,
    isEstimatedCompletionDateFocused,

    repairPriority,

    triggerRepairFormSubmit,
    currentStepperPosition,
    stepsInError,

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = createRepairTicketState;

  const {
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

  useEffect(() => {
    logState({
      state: createRepairTicketState,
      groupLabel: "Create Repair Ticket State",
    });
    // console.group("Create Repair Ticket State");
    // console.log("currentSearchTerm: ", currentSearchTerm);
    // console.log("currentSearchField: ", currentSearchField);
    // console.log("customerId: ", customerId);
    // console.groupEnd();
    // }, [currentSearchField, currentSearchTerm, customerId]);
  }, [createRepairTicketState]);

  // submit form
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function submitCreateRepairTicketForm() {
      createRepairTicketDispatch({
        type: createRepairTicketAction.setIsSubmitting,
        payload: true,
      });
      createRepairTicketDispatch({
        type: createRepairTicketAction.setSubmitMessage,
        payload: "Submitting repair note form ...",
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({ path: "repair-note" });

      const repairTicketSchema: RepairTicketInitialSchema = {
        customerId,
        // part information
        partName,
        partSerialId,
        dateReceived,
        descriptionOfIssue,
        initialInspectionNotes,
        // repair information
        repairCategory,
        requiredRepairs,
        partsNeeded,
        partsNeededModels,
        partUnderWarranty,
        estimatedRepairCost: Number.parseFloat(estimatedRepairCost),
        estimatedRepairCostCurrency,
        estimatedCompletionDate,
        repairPriority,
        // rest are fields updated as repair note progresses
      };

      const requestInit: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repairTicketSchema }),
      };

      try {
        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: controller.signal,
          url,
        });

        const data: ResourceRequestServerResponse<RepairTicketDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsSuccessful,
          payload: true,
        });
        createRepairTicketDispatch({
          type: createRepairTicketAction.setSuccessMessage,
          payload: data.message,
        });
      } catch (error: any) {
        if (!isMounted || error.name === "AbortError") {
          return;
        }

        const errorMessage = error instanceof InvalidTokenError
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
          createRepairTicketDispatch({
            type: createRepairTicketAction.setIsSubmitting,
            payload: false,
          });
          createRepairTicketDispatch({
            type: createRepairTicketAction.setTriggerRepairFormSubmit,
            payload: false,
          });
          createRepairTicketDispatch({
            type: createRepairTicketAction.setTriggerRepairFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerRepairFormSubmit) {
      submitCreateRepairTicketForm();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRepairFormSubmit]);

  const [createdSubmitButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Submit",
      semanticDescription: "Click button to submit repair note form",
      semanticName: "submit repair note button",
      buttonOnClick: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setTriggerRepairFormSubmit,
          payload: true,
        });
      },
      buttonDisabled: stepsInError.size > 0 || triggerRepairFormSubmit,
      leftIcon: <TbNote />,
      rightIcon: <TbUpload />,
    },
  ]);

  const selectedCustomerInformation =
    customerSearchResults.find((doc) => doc._id === customerId) ?? {};

  const customerInformationFormReviewObjects = Object.entries(
    flattenObjectIterative(selectedCustomerInformation),
  ).map(([key, value]) => {
    const formReviewObject: FormReviewObject = {
      inputName: splitCamelCase(key),
      inputValue: value?.toString() ?? "",
      isInputValueValid: true,
    };

    return formReviewObject;
  });

  const REPAIR_NOTE_REVIEW_OBJECT: FormReviewObjectArray = {
    // customer info page
    "Customer Information": customerInformationFormReviewObjects,
    // repair item info page
    "Repair Item Information": [
      {
        inputName: "Part Name",
        inputValue: partName,
        isInputValueValid: isValidPartName,
      },
      {
        inputName: "Part Serial ID",
        inputValue: partSerialId,
        isInputValueValid: isValidPartSerialId,
      },
      {
        inputName: "Date Received",
        inputValue: dateReceived,
        isInputValueValid: isValidDateReceived,
      },
      {
        inputName: "Description of Issue",
        inputValue: descriptionOfIssue,
        isInputValueValid: isValidDescriptionOfIssue,
      },
      {
        inputName: "Initial Inspection Notes",
        inputValue: initialInspectionNotes,
        isInputValueValid: isValidInitialInspectionNotes,
      },
    ],
    // repair details page
    "Repair Information": [
      {
        inputName: "Required Repairs",
        inputValue: replaceLastCommaWithAnd(requiredRepairs.join(", ")),
        isInputValueValid: true,
      },
      {
        inputName: "Parts Needed",
        inputValue: replaceLastCommaWithAnd(partsNeeded.join(", ")),
        isInputValueValid: true,
      },
      {
        inputName: "Parts Needed Models",
        inputValue: partsNeededModels,
        isInputValueValid: isValidPartsNeededModels,
      },
      {
        inputName: "Part Under Warranty",
        inputValue: partUnderWarranty ? "Yes" : "No",
        isInputValueValid: true,
      },
      {
        inputName: "Estimated Repair Cost",
        inputValue: estimatedRepairCost,
        isInputValueValid: isValidEstimatedRepairCost,
      },
      {
        inputName: "Estimated Repair Cost Currency",
        inputValue: estimatedRepairCostCurrency,
        isInputValueValid: true,
      },
      {
        inputName: "Estimated Completion Date",
        inputValue: estimatedCompletionDate,
        isInputValueValid: isValidEstimatedCompletionDate,
      },
      {
        inputName: "Repair Priority",
        inputValue: repairPriority,
        isInputValueValid: true,
      },
    ],
  };

  const displayReviewPage = (
    <FormReviewPage
      formReviewObject={REPAIR_NOTE_REVIEW_OBJECT}
      formName="Repair Note"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/repair-note/display");
        },
      ]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={
        <Title order={4}>{isSuccessful ? "Success!" : "Submitting ..."}</Title>
      }
    />
  );

  const displaySubmitButton = (
    <Tooltip
      label={stepsInError.size > 0
        ? "Please fix errors before submitting form"
        : "Submit Repair Note form"}
    >
      <Group w="100%" position="center">
        {createdSubmitButton}
      </Group>
    </Tooltip>
  );

  const displayRepairTicketComponentPage = currentStepperPosition === 0
    ? (
      <RepairTicketStepCustomer
        customerSearchResults={customerSearchResults}
        currentSearchObject={currentSearchObject}
        searchOperator={searchOperator}
        clearSearchInputs={clearSearchInputs}
        customerId={customerId}
        currentSearchResultPage={currentSearchResultPage}
        deleteSearchObjectField={deleteSearchObjectField}
        username={username}
        isValidUsername={isValidUsername}
        isUsernameFocused={isUsernameFocused}
        email={email}
        isValidEmail={isValidEmail}
        isEmailFocused={isEmailFocused}
        firstName={firstName}
        isValidFirstName={isValidFirstName}
        isFirstNameFocused={isFirstNameFocused}
        middleName={middleName}
        isValidMiddleName={isValidMiddleName}
        isMiddleNameFocused={isMiddleNameFocused}
        lastName={lastName}
        isValidLastName={isValidLastName}
        isLastNameFocused={isLastNameFocused}
        preferredName={preferredName}
        isValidPreferredName={isValidPreferredName}
        isPreferredNameFocused={isPreferredNameFocused}
        contactNumber={contactNumber}
        isValidContactNumber={isValidContactNumber}
        isContactNumberFocused={isContactNumberFocused}
        addressLine={addressLine}
        isValidAddressLine={isValidAddressLine}
        isAddressLineFocused={isAddressLineFocused}
        city={city}
        isValidCity={isValidCity}
        isCityFocused={isCityFocused}
        country={country}
        province={province}
        state={state}
        postalCode={postalCode}
        isValidPostalCode={isValidPostalCode}
        isPostalCodeFocused={isPostalCodeFocused}
        createRepairTicketAction={createRepairTicketAction}
        createRepairTicketDispatch={createRepairTicketDispatch}
      />
    )
    : currentStepperPosition === 1
    ? (
      <RepairTicketStepPart
        partName={partName}
        partSerialId={partSerialId}
        dateReceived={dateReceived}
        descriptionOfIssue={descriptionOfIssue}
        initialInspectionNotes={initialInspectionNotes}
        isPartNameFocused={isPartNameFocused}
        isPartSerialIdFocused={isPartSerialIdFocused}
        isDateReceivedFocused={isDateReceivedFocused}
        isDescriptionOfIssueFocused={isDescriptionOfIssueFocused}
        isInitialInspectionNotesFocused={isInitialInspectionNotesFocused}
        isValidPartName={isValidPartName}
        isValidPartSerialId={isValidPartSerialId}
        isValidDateReceived={isValidDateReceived}
        isValidDescriptionOfIssue={isValidDescriptionOfIssue}
        isValidInitialInspectionNotes={isValidInitialInspectionNotes}
        createRepairTicketAction={createRepairTicketAction}
        createRepairTicketDispatch={createRepairTicketDispatch}
      />
    )
    : currentStepperPosition === 2
    ? (
      <RepairTicketStepDetail
        requiredRepairs={requiredRepairs}
        partsNeeded={partsNeeded}
        partsNeededModels={partsNeededModels}
        partUnderWarranty={partUnderWarranty}
        estimatedRepairCost={estimatedRepairCost}
        estimatedCompletionDate={estimatedCompletionDate}
        repairPriority={repairPriority}
        isPartsNeededModelsFocused={isPartsNeededModelsFocused}
        isEstimatedRepairCostFocused={isEstimatedRepairCostFocused}
        isEstimatedCompletionDateFocused={isEstimatedCompletionDateFocused}
        isValidPartsNeededModels={isValidPartsNeededModels}
        estimatedRepairCostCurrency={estimatedRepairCostCurrency}
        isValidEstimatedRepairCost={isValidEstimatedRepairCost}
        isValidEstimatedCompletionDate={isValidEstimatedCompletionDate}
        createRepairTicketAction={createRepairTicketAction}
        createRepairTicketDispatch={createRepairTicketDispatch}
      />
    )
    : currentStepperPosition === 3
    ? displayReviewPage
    : displaySubmitButton;

  const displayRepairTicketForm = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_REPAIR_NOTE_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_REPAIR_NOTE_MAX_STEPPER_POSITION}
      parentComponentDispatch={createRepairTicketDispatch}
      setCurrentStepperPosition={createRepairTicketAction
        .setCurrentStepperPosition}
      stepsInError={stepsInError}
      childrenTitle="Create repair ticket"
    >
      {displayRepairTicketComponentPage}
    </StepperWrapper>
  );

  const displayRepairTicketComponent = (
    <Flex
      h="100%"
      w="100%"
      direction="column"
      align="center"
      justify="center"
      rowGap="lg"
    >
      {displaySubmitSuccessNotificationModal}
      {displayRepairTicketForm}
    </Flex>
  );

  return displayRepairTicketComponent;
}
 */
