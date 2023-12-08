import { Flex, Group, Title, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InvalidTokenError } from "jwt-decode";
import { useEffect, useReducer } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { TbNote, TbUpload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { globalAction } from "../../../context/globalProvider/state";
import { useGlobalState, useWrapFetch } from "../../../hooks";
import { returnAccessibleButtonElements } from "../../../jsxCreators";
import { ResourceRequestServerResponse } from "../../../types";
import { replaceLastCommaWithAnd, urlBuilder } from "../../../utils";
import FormReviewPage, {
  FormReviewObjectArray,
} from "../../formReviewPage/FormReviewPage";
import { NotificationModal } from "../../notificationModal";
import { StepperWrapper } from "../../wrappers";
import { RepairTicketDocument, RepairTicketInitialSchema } from "../types";
import {
  CREATE_REPAIR_NOTE_DESCRIPTION_OBJECTS,
  CREATE_REPAIR_NOTE_MAX_STEPPER_POSITION,
} from "./constants";
import { RepairTicketStepCustomer } from "./repairTicketStepCustomer/RepairTicketStepCustomer";
import { RepairTicketStepDetail } from "./repairTicketStepDetails/RepairTicketStepDetails";
import { RepairTicketStepPart } from "./repairTicketStepPart/RepairTicketStepPart";
import {
  createRepairTicketAction,
  createRepairTicketReducer,
  initialCreateRepairTicketState,
} from "./state";

function CreateRepairTicket() {
  /** ------------- begin hooks ------------- */
  const [createRepairTicketState, createRepairTicketDispatch] = useReducer(
    createRepairTicketReducer,
    initialCreateRepairTicketState
  );
  const {
    customerId,
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

    triggerFormSubmit,
    currentStepperPosition,
    stepsInError,

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = createRepairTicketState;

  const { globalDispatch } = useGlobalState();

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
  /** ------------- end hooks ------------- */

  /** ------------- begin useEffects ------------- */
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

      const initialRepairTicket: RepairTicketInitialSchema = {
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
        estimatedRepairCost,
        estimatedRepairCostCurrency,
        estimatedCompletionDate,
        repairPriority,
        // rest are fields updated as repair note progresses
      };

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initialRepairTicket }),
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
          createRepairTicketDispatch({
            type: createRepairTicketAction.setIsSubmitting,
            payload: false,
          });
          createRepairTicketDispatch({
            type: createRepairTicketAction.setTriggerFormSubmit,
            payload: false,
          });
          createRepairTicketDispatch({
            type: createRepairTicketAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      submitCreateRepairTicketForm();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);
  /** ------------- end useEffects ------------- */

  /** ------------- begin input creators ------------- */
  const [createdSubmitButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Submit",
      semanticDescription: "Click button to submit repair note form",
      semanticName: "submit repair note button",
      buttonOnClick: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setTriggerFormSubmit,
          payload: true,
        });
      },
      buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
      leftIcon: <TbNote />,
      rightIcon: <TbUpload />,
    },
  ]);
  /** ------------- end input creators ------------- */

  /** ------------- begin input display ------------- */

  const REPAIR_NOTE_REVIEW_OBJECT: FormReviewObjectArray = {
    // customer info page
    "Customer Information": [],
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
    <FormReviewPage formReviewObject={REPAIR_NOTE_REVIEW_OBJECT} formName="Repair Note" />
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
      title={<Title order={4}>{isSuccessful ? "Success!" : "Submitting ..."}</Title>}
    />
  );

  const displaySubmitButton = (
    <Tooltip
      label={
        stepsInError.size > 0
          ? "Please fix errors before submitting form"
          : "Submit Repair Note form"
      }
    >
      <Group w="100%" position="center">
        {createdSubmitButton}
      </Group>
    </Tooltip>
  );

  const displayRepairTicketComponentPage =
    currentStepperPosition === 0 ? (
      <RepairTicketStepCustomer
        createRepairTicketAction={createRepairTicketAction}
        createRepairTicketDispatch={createRepairTicketDispatch}
      />
    ) : currentStepperPosition === 1 ? (
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
    ) : currentStepperPosition === 2 ? (
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
    ) : currentStepperPosition === 3 ? (
      displayReviewPage
    ) : (
      displaySubmitButton
    );

  const displayRepairTicketForm = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_REPAIR_NOTE_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_REPAIR_NOTE_MAX_STEPPER_POSITION}
      parentComponentDispatch={createRepairTicketDispatch}
      setCurrentStepperPosition={createRepairTicketAction.setCurrentStepperPosition}
      stepsInError={stepsInError}
      childrenTitle="Create repair note"
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
  /** ------------- end input display ------------- */
  return displayRepairTicketComponent;
}

export default CreateRepairTicket;
