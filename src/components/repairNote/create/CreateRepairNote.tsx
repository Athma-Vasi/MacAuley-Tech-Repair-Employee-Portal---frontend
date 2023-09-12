import { Flex, Group, Tooltip } from '@mantine/core';
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
import { replaceLastCommaWithAnd, urlBuilder } from '../../../utils';
import { RepairNoteStepPart } from './repairNoteStepPart/RepairNoteStepPart';
import { RepairNoteStepDetail } from './repairNoteStepDetails/RepairNoteStepDetails';
import { returnAccessibleButtonElements } from '../../../jsxCreators';
import { TbNote, TbUpload } from 'react-icons/tb';
import { RepairNoteDocument, RepairNoteInitialSchema } from '../types';
import { useAuth, useGlobalState } from '../../../hooks';
import { ResourceRequestServerResponse } from '../../../types';
import { InvalidTokenError } from 'jwt-decode';
import FormReviewPage, {
  FormReviewObject,
} from '../../formReviewPage/FormReviewPage';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { globalAction } from '../../../context/globalProvider/state';

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

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = createRepairNoteState;

  const { globalDispatch } = useGlobalState();

  const {
    authState: { accessToken },
  } = useAuth();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
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
      createRepairNoteDispatch({
        type: createRepairNoteAction.setSubmitMessage,
        payload: `Submitting repair note form for ${customerName}...`,
      });

      const url: URL = urlBuilder({ path: 'repair-note/' });

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

      const request: Request = new Request(url.toString(), {
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
        if (!response.ok) {
          throw new Error(data.message);
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
          createRepairNoteDispatch({
            type: createRepairNoteAction.setIsSubmitting,
            payload: false,
          });
          createRepairNoteDispatch({
            type: createRepairNoteAction.setTriggerFormSubmit,
            payload: false,
          });
          createRepairNoteDispatch({
            type: createRepairNoteAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      submitCreateRepairNoteForm();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // only run when triggerFormSubmit changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
      leftIcon: <TbNote />,
      rightIcon: <TbUpload />,
    },
  ]);
  /** ------------- end input creators ------------- */

  /** ------------- begin input display ------------- */

  const REPAIR_NOTE_REVIEW_OBJECT: FormReviewObject = {
    // customer info page
    'Customer Information': [
      {
        inputName: 'Name',
        inputValue: customerName,
        isInputValueValid: isValidCustomerName,
      },
      {
        inputName: 'Phone Number',
        inputValue: customerPhone,
        isInputValueValid: isValidCustomerPhone,
      },
      {
        inputName: 'Email',
        inputValue: customerEmail,
        isInputValueValid: isValidCustomerEmail,
      },
      {
        inputName: 'Address Line',
        inputValue: customerAddressLine,
        isInputValueValid: isValidCustomerAddressLine,
      },
      {
        inputName: 'City',
        inputValue: customerCity,
        isInputValueValid: isValidCustomerCity,
      },
      {
        inputName: customerCountry === 'United States' ? 'State' : 'Province',
        inputValue:
          customerCountry === 'United States'
            ? customerState
            : customerProvince,
        isInputValueValid: true,
      },
      {
        inputName: 'Postal Code',
        inputValue: customerPostalCode,
        isInputValueValid: isValidCustomerPostalCode,
      },
    ],
    // repair item info page
    'Repair Item Information': [
      {
        inputName: 'Part Name',
        inputValue: partName,
        isInputValueValid: isValidPartName,
      },
      {
        inputName: 'Part Serial ID',
        inputValue: partSerialId,
        isInputValueValid: isValidPartSerialId,
      },
      {
        inputName: 'Date Received',
        inputValue: dateReceived,
        isInputValueValid: isValidDateReceived,
      },
      {
        inputName: 'Description of Issue',
        inputValue: descriptionOfIssue,
        isInputValueValid: isValidDescriptionOfIssue,
      },
      {
        inputName: 'Initial Inspection Notes',
        inputValue: initialInspectionNotes,
        isInputValueValid: isValidInitialInspectionNotes,
      },
    ],
    // repair details page
    'Repair Information': [
      {
        inputName: 'Required Repairs',
        inputValue: replaceLastCommaWithAnd(requiredRepairs.join(', ')),
        isInputValueValid: true,
      },
      {
        inputName: 'Parts Needed',
        inputValue: replaceLastCommaWithAnd(partsNeeded.join(', ')),
        isInputValueValid: true,
      },
      {
        inputName: 'Parts Needed Models',
        inputValue: partsNeededModels,
        isInputValueValid: isValidPartsNeededModels,
      },
      {
        inputName: 'Part Under Warranty',
        inputValue: partUnderWarranty ? 'Yes' : 'No',
        isInputValueValid: true,
      },
      {
        inputName: 'Estimated Repair Cost',
        inputValue: estimatedRepairCost,
        isInputValueValid: isValidEstimatedRepairCost,
      },
      {
        inputName: 'Estimated Repair Cost Currency',
        inputValue: estimatedRepairCostCurrency,
        isInputValueValid: true,
      },
      {
        inputName: 'Estimated Completion Date',
        inputValue: estimatedCompletionDate,
        isInputValueValid: isValidEstimatedCompletionDate,
      },
      {
        inputName: 'Repair Priority',
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

  const displaySubmitButton = (
    <Tooltip
      label={
        stepsInError.size > 0
          ? 'Please fix errors before submitting form'
          : 'Submit Repair Note form'
      }
    >
      <Group w="100%" position="center">
        {createdSubmitButton}
      </Group>
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
      displayReviewPage
    ) : (
      displaySubmitButton
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
  return displayRepairNoteComponent;
}

export default CreateRepairNote;
