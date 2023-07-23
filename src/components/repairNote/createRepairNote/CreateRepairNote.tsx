import { Flex, Text, Title } from '@mantine/core';
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
import { logState } from '../../../utils';

function CreateRepairNote() {
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

  const displayRepairNoteStepCustomer = (
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
  );

  const displayRepairNoteComponentPage =
    currentStepperPosition === 0 ? (
      displayRepairNoteStepCustomer
    ) : currentStepperPosition === 1 ? (
      <Text>Device information</Text>
    ) : currentStepperPosition === 2 ? (
      <Text>Repair information</Text>
    ) : currentStepperPosition === 3 ? (
      <Text>Review</Text>
    ) : (
      <Text>Submit</Text>
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

  return <>{displayRepairNoteComponent}</>;
}

export { CreateRepairNote };
