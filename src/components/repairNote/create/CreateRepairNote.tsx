import { Flex, Group, Text, Title, Tooltip } from '@mantine/core';
import { useEffect, useReducer } from 'react';
import {
  createRepairNoteAction,
  createRepairNoteReducer,
  initialCreateRepairNoteState,
} from './state';
import { StepperWrapper } from '../../wrappers';
import {
  CREATE_REPAIR_NOTE_DESCRIPTION_OBJECTS,
  CREATE_REPAIR_NOTE_MAX_STEPPER_POSITION,
} from './constants';
import { RepairNoteStepCustomer } from './repairNoteStepCustomer/RepairNoteStepCustomer';
import { logState, urlBuilder } from '../../../utils';
import { RepairNoteStepPart } from './repairNoteStepPart/RepairNoteStepPart';
import { RepairNoteStepDetail } from './repairNoteStepDetails/RepairNoteStepDetails';
import { returnAccessibleButtonElements } from '../../../jsxCreators';
import { TbNote, TbUpload } from 'react-icons/tb';
import { create } from 'domain';
import {
  RepairNoteDocument,
  RepairNoteInitialSchema,
  RepairNoteSchema,
} from '../types';
import { useAuth, useGlobalState } from '../../../hooks';
import { ResourceRequestServerResponse } from '../../../types';
import { InvalidTokenError } from 'jwt-decode';

function CreateRepairNote() {
  /** ------------- begin hooks ------------- */
  const [createRepairNoteState, createRepairNoteDispatch] = useReducer(
    createRepairNoteReducer,
    initialCreateRepairNoteState
  );
  const {
    // customer info
    customerName,
    isValidCustomerName,
    isCustomerNameFocused,

    customerPhone,
    isValidCustomerPhone,
    isCustomerPhoneFocused,

    customerEmail,
    isValidCustomerEmail,
    isCustomerEmailFocused,

    customerAddressLine,
    isValidCustomerAddressLine,
    isCustomerAddressLineFocused,

    customerCity,
    isValidCustomerCity,
    isCustomerCityFocused,

    customerState,
    customerProvince,
    customerCountry,
    customerPostalCode,
    isValidCustomerPostalCode,
    isCustomerPostalCodeFocused,

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

    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = createRepairNoteState;

  const {
    authState: { accessToken, userId, username },
  } = useAuth();
  /** ------------- end hooks ------------- */

  /** ------------- begin useEffects ------------- */
  // submit form
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function submitCreateRepairNoteForm() {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsSubmitting,
        payload: true,
      });

      const url: URL = urlBuilder({
        path: '/api/v1/repair-note/',
      });

      const repairNote: RepairNoteInitialSchema = {
        // customer info
        customerName,
        customerPhone,
        customerEmail,
        customerAddressLine,
        customerCity,
        customerState,
        customerProvince,
        customerCountry,
        customerPostalCode,
        // part information
        partName,
        partSerialId,
        dateReceived,
        descriptionOfIssue,
        initialInspectionNotes,
        // repair information
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

      const request: Request = new Request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ repairNote }),
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
        const data: ResourceRequestServerResponse<RepairNoteDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }

        const { ok } = response;
        if (!ok) {
          createRepairNoteDispatch({
            type: createRepairNoteAction.setIsError,
            payload: true,
          });
          createRepairNoteDispatch({
            type: createRepairNoteAction.setErrorMessage,
            payload: data.message,
          });
          return;
        }

        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsSuccessful,
          payload: true,
        });
        createRepairNoteDispatch({
          type: createRepairNoteAction.setSuccessMessage,
          payload: data.message,
        });
      } catch (error: any) {
        if (!isMounted) {
          return;
        }
        if (error.name === 'AbortError') {
          return;
        }

        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsError,
          payload: true,
        });

        error instanceof InvalidTokenError
          ? createRepairNoteDispatch({
              type: createRepairNoteAction.setErrorMessage,
              payload: 'Invalid token',
            })
          : !error.response
          ? createRepairNoteDispatch({
              type: createRepairNoteAction.setErrorMessage,
              payload: 'No response from server',
            })
          : createRepairNoteDispatch({
              type: createRepairNoteAction.setErrorMessage,
              payload:
                error.message ?? 'Unknown error occurred. Please try again.',
            });
      } finally {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsSubmitting,
          payload: false,
        });
        createRepairNoteDispatch({
          type: createRepairNoteAction.setTriggerFormSubmit,
          payload: false,
        });
      }
    }

    if (triggerFormSubmit) {
      submitCreateRepairNoteForm();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerFormSubmit]);
  /** ------------- end useEffects ------------- */

  /** ------------- begin input creators ------------- */
  const [createdSubmitButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Submit',
      semanticDescription: 'Click button to submit repair note form',
      semanticName: 'submit repair note button',
      buttonOnClick: () => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setTriggerFormSubmit,
          payload: true,
        });
      },
      buttonDisabled: stepsInError.size > 0,
      leftIcon: <TbNote />,
      rightIcon: <TbUpload />,
    },
  ]);
  /** ------------- end input creators ------------- */

  /** ------------- begin input display ------------- */

  const displaySubmitButton = (
    <Tooltip
      label={
        stepsInError.size > 0
          ? 'Please fix errors to submit repair note'
          : 'Submit repair note'
      }
    >
      <Group>{createdSubmitButton}</Group>
    </Tooltip>
  );

  const displayRepairNoteComponentPage =
    currentStepperPosition === 0 ? (
      <RepairNoteStepCustomer
        customerAddressLine={customerAddressLine}
        customerCity={customerCity}
        customerCountry={customerCountry}
        customerEmail={customerEmail}
        customerName={customerName}
        customerPhone={customerPhone}
        customerPostalCode={customerPostalCode}
        customerProvince={customerProvince}
        customerState={customerState}
        isCustomerAddressLineFocused={isCustomerAddressLineFocused}
        isCustomerCityFocused={isCustomerCityFocused}
        isCustomerEmailFocused={isCustomerEmailFocused}
        isCustomerNameFocused={isCustomerNameFocused}
        isCustomerPhoneFocused={isCustomerPhoneFocused}
        isCustomerPostalCodeFocused={isCustomerPostalCodeFocused}
        isValidCustomerAddressLine={isValidCustomerAddressLine}
        isValidCustomerCity={isValidCustomerCity}
        isValidCustomerEmail={isValidCustomerEmail}
        isValidCustomerName={isValidCustomerName}
        isValidCustomerPhone={isValidCustomerPhone}
        isValidCustomerPostalCode={isValidCustomerPostalCode}
        createRepairNoteAction={createRepairNoteAction}
        createRepairNoteDispatch={createRepairNoteDispatch}
      />
    ) : currentStepperPosition === 1 ? (
      <RepairNoteStepPart
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
        createRepairNoteAction={createRepairNoteAction}
        createRepairNoteDispatch={createRepairNoteDispatch}
      />
    ) : currentStepperPosition === 2 ? (
      <RepairNoteStepDetail
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
        createRepairNoteAction={createRepairNoteAction}
        createRepairNoteDispatch={createRepairNoteDispatch}
      />
    ) : currentStepperPosition === 3 ? (
      <Text>Review</Text>
    ) : (
      <Group w="100%" position="right">
        {displaySubmitButton}
      </Group>
    );

  const displayRepairNoteForm = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_REPAIR_NOTE_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_REPAIR_NOTE_MAX_STEPPER_POSITION}
      parentComponentDispatch={createRepairNoteDispatch}
      setCurrentStepperPosition={
        createRepairNoteAction.setCurrentStepperPosition
      }
      stepsInError={stepsInError}
      childrenTitle="Create repair note"
    >
      {displayRepairNoteComponentPage}
    </StepperWrapper>
  );

  const displayRepairNoteComponent = (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      rowGap="lg"
      w="100%"
      h="100%"
    >
      {/* display form */}
      {displayRepairNoteForm}
    </Flex>
  );
  /** ------------- end input display ------------- */
  return <>{displayRepairNoteComponent}</>;
}

export { CreateRepairNote };
