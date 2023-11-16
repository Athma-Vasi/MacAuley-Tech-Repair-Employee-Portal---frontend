import { Group, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InvalidTokenError } from 'jwt-decode';
import { ChangeEvent, MouseEvent, useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import {
  TbCurrencyDollar,
  TbCurrencyEuro,
  TbCurrencyPound,
  TbCurrencyRenminbi,
  TbCurrencyYen,
} from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { COLORS_SWATCHES } from '../../../constants/data';
import { MONEY_REGEX, NOTE_TEXT_AREA_REGEX } from '../../../constants/regex';
import { globalAction } from '../../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../../hooks';
import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { Currency, ResourceRequestServerResponse } from '../../../types';
import {
  returnNoteTextValidationText,
  returnFloatAmountValidationText,
  returnThemeColors,
  urlBuilder,
} from '../../../utils';
import { CURRENCY_DATA } from '../../benefits/constants';
import FormReviewPage, {
  FormReviewObject,
} from '../../formReviewPage/FormReviewPage';
import { NotificationModal } from '../../notificationModal';
import { RepairNoteDocument, RepairStatus } from '../../repairNote/types';
import {
  AccessibleButtonCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../../wrappers';
import { EditRepairNoteInput } from '../displayQueryDesktop/types';
import {
  EDIT_REPAIR_NOTE_DESCRIPTION_OBJECTS,
  EDIT_REPAIR_NOTE_MAX_STEPPER_POSITION,
  REPAIR_NOTE_REPAIR_STATUS_DATA,
} from './constants';
import { editRepairNoteAction, editRepairNoteReducer } from './state';
import { EditRepairNoteState } from './types';

type EditRepairNoteProps = {
  editRepairNoteInput: EditRepairNoteInput;
  parentComponentCallbacks?: Array<() => void>;
};

function EditRepairNote({
  editRepairNoteInput,
  parentComponentCallbacks,
}: EditRepairNoteProps) {
  const { repairNoteFormId } = editRepairNoteInput;

  const initialEditRepairNoteState: EditRepairNoteState = {
    repairNotes: editRepairNoteInput.repairNotes ?? '',
    isRepairNotesValid: false,
    isRepairNotesFocused: false,

    testingResults: editRepairNoteInput.testingResults ?? '',
    isTestingResultsValid: false,
    isTestingResultsFocused: false,

    finalRepairCost: editRepairNoteInput.finalRepairCost ?? '',
    isFinalRepairCostValid: false,
    isFinalRepairCostFocused: false,

    finalRepairCostCurrency:
      editRepairNoteInput.finalRepairCostCurrency ?? 'CAD',
    repairStatus: editRepairNoteInput.repairStatus ?? 'In progress',

    currentStepperPosition: 0,
    stepsInError: new Set<number>(),

    triggerFormSubmit: false,

    isLoading: false,
    loadingMessage: '',
    isSubmitting: false,
    submitMessage: '',
    isSuccessful: false,
    successMessage: '',
  };

  const [editRepairNoteState, editRepairNoteDispatch] = useReducer(
    editRepairNoteReducer,
    initialEditRepairNoteState
  );
  const {
    repairNotes,
    isRepairNotesValid,
    isRepairNotesFocused,
    testingResults,
    isTestingResultsValid,
    isTestingResultsFocused,
    finalRepairCost,
    isFinalRepairCostValid,
    isFinalRepairCostFocused,
    finalRepairCostCurrency,
    repairStatus,
    currentStepperPosition,
    stepsInError,
    triggerFormSubmit,
    isLoading,
    loadingMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
  } = editRepairNoteState;

  const {
    globalState: { themeObject },
    globalDispatch,
  } = useGlobalState();

  const {
    authState: { accessToken },
  } = useAuth();

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
    let isMounted = true;
    const controller = new AbortController();

    async function handleEditRepairNoteFormSubmit() {
      editRepairNoteDispatch({
        type: editRepairNoteAction.setIsSubmitting,
        payload: true,
      });
      editRepairNoteDispatch({
        type: editRepairNoteAction.setSubmitMessage,
        payload: 'Submitting Edit Repair Note form ...',
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({ path: `repair-note/${repairNoteFormId}` });

      const body = JSON.stringify({
        repairNote: {
          repairNotes,
          testingResults,
          finalRepairCost,
          finalRepairCostCurrency,
          repairStatus,
        },
      });

      const request: Request = new Request(url.toString(), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body,
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

        editRepairNoteDispatch({
          type: editRepairNoteAction.setIsSuccessful,
          payload: true,
        });
        editRepairNoteDispatch({
          type: editRepairNoteAction.setSuccessMessage,
          payload:
            data.message ?? 'Edit Repair Note form submitted successfully!',
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
          editRepairNoteDispatch({
            type: editRepairNoteAction.setIsSubmitting,
            payload: false,
          });
          editRepairNoteDispatch({
            type: editRepairNoteAction.setSubmitMessage,
            payload: '',
          });
          editRepairNoteDispatch({
            type: editRepairNoteAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleEditRepairNoteFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [triggerFormSubmit]);

  useEffect(() => {
    const isValid = NOTE_TEXT_AREA_REGEX.test(repairNotes);

    editRepairNoteDispatch({
      type: editRepairNoteAction.setIsRepairNotesValid,
      payload: isValid,
    });
  }, [repairNotes]);

  useEffect(() => {
    const isValid = NOTE_TEXT_AREA_REGEX.test(testingResults);

    editRepairNoteDispatch({
      type: editRepairNoteAction.setIsTestingResultsValid,
      payload: isValid,
    });
  }, [testingResults]);

  useEffect(() => {
    const isValid = MONEY_REGEX.test(finalRepairCost);

    editRepairNoteDispatch({
      type: editRepairNoteAction.setIsFinalRepairCostValid,
      payload: isValid,
    });
  }, [finalRepairCost]);

  // insert comma if currency is EUR
  useEffect(() => {
    // if currency is EUR, replace decimal with comma and remove leading zeros

    if (finalRepairCostCurrency === 'EUR') {
      const finalRepairCostWithCommaAndNoLeadingZero = finalRepairCost
        .replace('.', ',')
        .replace(/^0+(?=\d)/, ''); // removes leading zeros if amount !== '0.00'

      editRepairNoteDispatch({
        type: editRepairNoteAction.setFinalRepairCost,
        payload: finalRepairCostWithCommaAndNoLeadingZero,
      });
    }

    // if currency is not EUR, replace comma with decimal and remove leading zeros
    else {
      const finalRepairCostWithDecimalAndNoLeadingZero = finalRepairCost
        .replace(',', '.')
        .replace(/^0+(?=\d)/, '');

      editRepairNoteDispatch({
        type: editRepairNoteAction.setFinalRepairCost,
        payload: finalRepairCostWithDecimalAndNoLeadingZero,
      });
    }
  }, [finalRepairCostCurrency, finalRepairCost]);

  // update stepper wrapper state on every change
  useEffect(() => {
    const areOptionalInputsInError =
      (repairNotes.length > 0 && !isRepairNotesValid) ||
      (testingResults.length > 0 && !isTestingResultsValid) ||
      (finalRepairCost.length > 0 && !isFinalRepairCostValid);

    // has any input been modified
    const isAnyInputModified =
      repairNotes === editRepairNoteInput.repairNotes &&
      testingResults === editRepairNoteInput.testingResults &&
      finalRepairCost === editRepairNoteInput.finalRepairCost &&
      finalRepairCostCurrency === editRepairNoteInput.finalRepairCostCurrency &&
      repairStatus === editRepairNoteInput.repairStatus
        ? false
        : true;

    const isStepInError = areOptionalInputsInError || !isAnyInputModified;

    editRepairNoteDispatch({
      type: editRepairNoteAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 0,
      },
    });
  }, [
    isRepairNotesValid,
    isTestingResultsValid,
    isFinalRepairCostValid,
    repairNotes.length,
    testingResults.length,
    finalRepairCost.length,
    repairNotes,
    testingResults,
    finalRepairCost,
    editRepairNoteInput.repairNotes,
    editRepairNoteInput.testingResults,
    editRepairNoteInput.finalRepairCost,
    editRepairNoteInput.finalRepairCostCurrency,
    editRepairNoteInput.repairStatus,
    finalRepairCostCurrency,
    repairStatus,
  ]);

  const [repairNotesInputErrorText, repairNotesInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'repair notes',
      inputText: repairNotes,
      isValidInputText: isRepairNotesValid,
      isInputTextFocused: isRepairNotesFocused,
      regexValidationText: returnNoteTextValidationText({
        content: repairNotes,
        contentKind: 'repair notes',
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [testingResultsInputErrorText, testingResultsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'testing results',
      inputText: testingResults,
      isValidInputText: isTestingResultsValid,
      isInputTextFocused: isTestingResultsFocused,
      regexValidationText: returnNoteTextValidationText({
        content: testingResults,
        contentKind: 'testing results',
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [finalRepairCostInputErrorText, finalRepairCostInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'final repair cost',
      inputText: finalRepairCost,
      isValidInputText: isFinalRepairCostValid,
      isInputTextFocused: isFinalRepairCostFocused,
      regexValidationText: returnFloatAmountValidationText({
        content: finalRepairCost,
        contentKind: 'final repair cost',
      }),
    });

  const repairNotesTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: repairNotesInputErrorText,
        valid: repairNotesInputValidText,
      },
      inputText: repairNotes,
      isValidInputText: isRepairNotesValid,
      label: 'Repair Notes',
      onBlur: () => {
        editRepairNoteDispatch({
          type: editRepairNoteAction.setIsRepairNotesFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        editRepairNoteDispatch({
          type: editRepairNoteAction.setRepairNotes,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        editRepairNoteDispatch({
          type: editRepairNoteAction.setIsRepairNotesFocused,
          payload: true,
        });
      },
      placeholder: 'Enter repair notes',
      semanticName: 'repair notes',
      minLength: 2,
      maxLength: 2000,
    };

  const testingResultsTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: testingResultsInputErrorText,
        valid: testingResultsInputValidText,
      },
      inputText: testingResults,
      isValidInputText: isTestingResultsValid,
      label: 'Testing Results',
      onBlur: () => {
        editRepairNoteDispatch({
          type: editRepairNoteAction.setIsTestingResultsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        editRepairNoteDispatch({
          type: editRepairNoteAction.setTestingResults,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        editRepairNoteDispatch({
          type: editRepairNoteAction.setIsTestingResultsFocused,
          payload: true,
        });
      },
      placeholder: 'Enter testing results',
      semanticName: 'testing results',
      minLength: 2,
      maxLength: 2000,
    };

  const {
    generalColors: { grayColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });
  const currencyIcon =
    finalRepairCostCurrency === 'CNY' ? (
      <TbCurrencyRenminbi size={14} color={grayColorShade} />
    ) : finalRepairCostCurrency === 'GBP' ? (
      <TbCurrencyPound size={14} color={grayColorShade} />
    ) : finalRepairCostCurrency === 'EUR' ? (
      <TbCurrencyEuro size={14} color={grayColorShade} />
    ) : finalRepairCostCurrency === 'JPY' ? (
      <TbCurrencyYen size={14} color={grayColorShade} />
    ) : (
      <TbCurrencyDollar size={14} color={grayColorShade} />
    );

  const finalRepairCostTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: finalRepairCostInputErrorText,
      valid: finalRepairCostInputValidText,
    },
    inputText: finalRepairCost,
    isValidInputText: isFinalRepairCostValid,
    label: 'Final Repair Cost',
    onBlur: () => {
      editRepairNoteDispatch({
        type: editRepairNoteAction.setIsFinalRepairCostFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      editRepairNoteDispatch({
        type: editRepairNoteAction.setFinalRepairCost,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      editRepairNoteDispatch({
        type: editRepairNoteAction.setIsFinalRepairCostFocused,
        payload: true,
      });
    },
    rightSection: true,
    rightSectionIcon: currencyIcon,
    placeholder: 'Enter final repair cost',
    semanticName: 'final repair cost',
    minLength: 3,
    maxLength: 9,
  };

  const finalRepairCostCurrencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: CURRENCY_DATA,
      description: 'Select the currency for final repair cost.',
      label: 'Final Repair Cost Currency',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        editRepairNoteDispatch({
          type: editRepairNoteAction.setFinalRepairCostCurrency,
          payload: event.currentTarget.value as Currency,
        });
      },
      value: finalRepairCostCurrency,
    };

  const repairStatusSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: REPAIR_NOTE_REPAIR_STATUS_DATA,
    description: 'Select the repair status.',
    label: 'Repair Status',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      editRepairNoteDispatch({
        type: editRepairNoteAction.setRepairStatus,
        payload: event.currentTarget.value as RepairStatus,
      });
    },
    value: repairStatus,
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'repair note form submit button',
    semanticName: 'submit button',
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      editRepairNoteDispatch({
        type: editRepairNoteAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const [createdRepairNotesTextAreaInput, createdTestingResultsTextAreaInput] =
    returnAccessibleTextAreaInputElements([
      repairNotesTextAreaInputCreatorInfo,
      testingResultsTextAreaInputCreatorInfo,
    ]);

  const [createdFinalRepairCostTextInput] = returnAccessibleTextInputElements([
    finalRepairCostTextInputCreatorInfo,
  ]);

  const [
    createdFinalRepairCostCurrencySelectInput,
    createdRepairStatusSelectInput,
  ] = returnAccessibleSelectInputElements([
    finalRepairCostCurrencySelectInputCreatorInfo,
    repairStatusSelectInputCreatorInfo,
  ]);

  // has any input been modified
  const isAnyInputModified =
    repairNotes === editRepairNoteInput.repairNotes &&
    testingResults === editRepairNoteInput.testingResults &&
    finalRepairCost === editRepairNoteInput.finalRepairCost &&
    finalRepairCostCurrency === editRepairNoteInput.finalRepairCostCurrency &&
    repairStatus === editRepairNoteInput.repairStatus
      ? false
      : true;
  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);
  const displaySubmitButton =
    currentStepperPosition === EDIT_REPAIR_NOTE_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          !isAnyInputModified
            ? 'Please modify at least one input before submitting form.'
            : stepsInError.size > 0
            ? 'Please fix errors before submitting form.'
            : 'Submit edit repair note form'
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const EDIT_REPAIR_NOTE_REVIEW_OBJECT: FormReviewObject = {
    'Repair Note Details': [
      {
        inputName: 'Repair Notes',
        inputValue: repairNotes,
        isInputValueValid: isRepairNotesValid,
      },
      {
        inputName: 'Testing Results',
        inputValue: testingResults,
        isInputValueValid: isTestingResultsValid,
      },
      {
        inputName: 'Final Repair Cost',
        inputValue: finalRepairCost,
        isInputValueValid: isFinalRepairCostValid,
      },
      {
        inputName: 'Final Repair Cost Currency',
        inputValue: finalRepairCostCurrency,
        isInputValueValid: true,
      },
      {
        inputName: 'Repair Status',
        inputValue: repairStatus,
        isInputValueValid: true,
      },
    ],
  };

  const displayEditRepairNoteReviewPage = (
    <FormReviewPage
      formReviewObject={EDIT_REPAIR_NOTE_REVIEW_OBJECT}
      formName="Repair Note"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate('/home/repair-note/display');
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

  const displayEditRepairNoteFirstPage = (
    <FormLayoutWrapper>
      {createdRepairNotesTextAreaInput}
      {createdTestingResultsTextAreaInput}
      {createdFinalRepairCostTextInput}
      {createdFinalRepairCostCurrencySelectInput}
      {createdRepairStatusSelectInput}
    </FormLayoutWrapper>
  );

  const displayEditRepairNoteForm =
    currentStepperPosition === 0
      ? displayEditRepairNoteFirstPage
      : currentStepperPosition === 1
      ? displayEditRepairNoteReviewPage
      : displaySubmitButton;

  const displayEditRepairNoteComponent = (
    <StepperWrapper
      childrenTitle="Repair Note"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={EDIT_REPAIR_NOTE_DESCRIPTION_OBJECTS}
      maxStepperPosition={EDIT_REPAIR_NOTE_MAX_STEPPER_POSITION}
      parentComponentDispatch={editRepairNoteDispatch}
      setCurrentStepperPosition={editRepairNoteAction.setCurrentStepperPosition}
      stepsInError={stepsInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayEditRepairNoteForm}
    </StepperWrapper>
  );

  return displayEditRepairNoteComponent;
}

export default EditRepairNote;
