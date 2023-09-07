import { ChangeEvent, MouseEvent, useEffect, useReducer } from 'react';
import { TbUpload } from 'react-icons/tb';

import {
  DATE_NEAR_FUTURE_REGEX,
  FULL_NAME_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
} from '../../../constants/regex';
import {
  returnAccessibleButtonElements,
  returnAccessibleCheckboxSingleInputElements,
  returnAccessibleDateTimeElements,
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  filterFieldsFromObject,
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
} from '../../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../../wrappers';
import { ReasonForLeave } from '../types';
import {
  LEAVE_REQUEST_DESCRIPTION_OBJECTS,
  LEAVE_REQUEST_MAX_STEPPER_POSITION,
  REASON_FOR_LEAVE_DATA,
} from './constants';
import {
  createLeaveRequestAction,
  createLeaveRequestReducer,
  initialCreateLeaveRequestState,
} from './state';
import { Group, Tooltip, useMantineTheme } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import FormReviewPage, {
  FormReviewObject,
} from '../../formReviewPage/FormReviewPage';
import { CreateLeaveRequestState } from './types';

function CreateLeaveRequest() {
  const [leaveRequestState, leaveRequestDispatch] = useReducer(
    createLeaveRequestReducer,
    initialCreateLeaveRequestState
  );

  const {
    startDate,
    isValidStartDate,
    isStartDateFocused,

    endDate,
    isValidEndDate,
    isEndDateFocused,

    areValidLeaveDates,
    reasonForLeave,

    delegatedToEmployee,
    isValidDelegatedToEmployee,
    isDelegatedToEmployeeFocused,

    delegatedResponsibilities,
    isValidDelegatedResponsibilities,
    isDelegatedResponsibilitiesFocused,

    additionalComments,
    isValidAdditionalComments,
    isAdditionalCommentsFocused,

    isAcknowledged,
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
  } = leaveRequestState;

  // validate start date on every change
  useEffect(() => {
    const isValid = DATE_NEAR_FUTURE_REGEX.test(startDate);

    leaveRequestDispatch({
      type: createLeaveRequestAction.setIsValidStartDate,
      payload: isValid,
    });
  }, [startDate]);

  // validate end date on every change
  useEffect(() => {
    const isValid = DATE_NEAR_FUTURE_REGEX.test(endDate);

    leaveRequestDispatch({
      type: createLeaveRequestAction.setIsValidEndDate,
      payload: isValid,
    });
  }, [endDate]);

  // validate leave dates on every change
  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const currDate = new Date(currentMonth);
    const isValid =
      new Date(startDate) < new Date(endDate) && new Date(endDate) > currDate;

    leaveRequestDispatch({
      type: createLeaveRequestAction.setAreValidLeaveDates,
      payload: isValid,
    });
  }, [startDate, endDate, isValidStartDate, isValidEndDate]);

  // validate delegated to employee on every change
  useEffect(() => {
    const isValid = FULL_NAME_REGEX.test(delegatedToEmployee);

    leaveRequestDispatch({
      type: createLeaveRequestAction.setIsValidDelegatedToEmployee,
      payload: isValid,
    });
  }, [delegatedToEmployee]);

  // validate delegated responsibilities on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(
      delegatedResponsibilities
    );

    leaveRequestDispatch({
      type: createLeaveRequestAction.setIsValidDelegatedResponsibilities,
      payload: isValid,
    });
  }, [delegatedResponsibilities]);

  // validate additional comments on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalComments);

    leaveRequestDispatch({
      type: createLeaveRequestAction.setIsValidAdditionalComments,
      payload: isValid,
    });
  }, [additionalComments]);

  // update stepper wrapper state on every change
  useEffect(() => {
    const areRequiredInputsInError = !areValidLeaveDates || !isAcknowledged;

    const areOptionalInputsInError =
      (delegatedToEmployee !== '' && !isValidDelegatedToEmployee) ||
      (delegatedResponsibilities !== '' && !isValidDelegatedResponsibilities) ||
      (additionalComments !== '' && !isValidAdditionalComments);

    const isStepInError = areRequiredInputsInError || areOptionalInputsInError;

    leaveRequestDispatch({
      type: createLeaveRequestAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 0,
      },
    });
  }, [
    areValidLeaveDates,
    isAcknowledged,
    delegatedToEmployee,
    isValidDelegatedToEmployee,
    delegatedResponsibilities,
    isValidDelegatedResponsibilities,
    additionalComments,
    isValidAdditionalComments,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input

  const leaveDatesInvalidText = areValidLeaveDates
    ? ''
    : 'The leave start date must be before the leave end date and both must be in the future. ';
  const [startDateInputErrorText, startDateInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'start date',
      inputText: startDate,
      isInputTextFocused: isStartDateFocused,
      isValidInputText: isValidStartDate && areValidLeaveDates,
      regexValidationText: `${leaveDatesInvalidText}${returnDateNearFutureValidationText(
        startDate
      )}`,
    });

  const [endDateInputErrorText, endDateInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'end date',
      inputText: endDate,
      isInputTextFocused: isEndDateFocused,
      isValidInputText: isValidEndDate && areValidLeaveDates,
      regexValidationText: `${leaveDatesInvalidText}${returnDateNearFutureValidationText(
        endDate
      )}`,
    });

  const [delegatedToEmployeeInputErrorText, delegatedToEmployeeInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'delegated to employee',
      inputText: delegatedToEmployee,
      isInputTextFocused: isDelegatedToEmployeeFocused,
      isValidInputText: isValidDelegatedToEmployee,
      regexValidationText: returnGrammarValidationText({
        content: delegatedToEmployee,
        contentKind: 'delegated to employee',
        minLength: 2,
        maxLength: 100,
      }),
    });

  const [
    delegatedResponsibilitiesInputErrorText,
    delegatedResponsibilitiesInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'delegated responsibilities',
    inputText: delegatedResponsibilities,
    isInputTextFocused: isDelegatedResponsibilitiesFocused,
    isValidInputText: isValidDelegatedResponsibilities,
    regexValidationText: returnGrammarValidationText({
      content: delegatedResponsibilities,
      contentKind: 'delegated responsibilities',
      minLength: 2,
      maxLength: 2000,
    }),
  });

  const [additionalCommentsInputErrorText, additionalCommentsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'additional comments',
      inputText: additionalComments,
      isInputTextFocused: isAdditionalCommentsFocused,
      isValidInputText: isValidAdditionalComments,
      regexValidationText: returnGrammarValidationText({
        content: additionalComments,
        contentKind: 'additional comments',
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [acknowledgementInputSelectedText, acknowledgementInputDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: isAcknowledged,
      semanticName: 'acknowledgement',
      selectedDescription: 'I acknowledge that the information is correct',
      deselectedDescription: 'I do not acknowledge',
    });

  const startDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    dateKind: 'date near future',
    description: {
      error: startDateInputErrorText,
      valid: startDateInputValidText,
    },
    inputKind: 'date',
    inputText: startDate,
    isValidInputText: isValidStartDate && areValidLeaveDates,
    label: 'Leave start date',
    onBlur: () => {
      leaveRequestDispatch({
        type: createLeaveRequestAction.setIsStartDateFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      leaveRequestDispatch({
        type: createLeaveRequestAction.setStartDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      leaveRequestDispatch({
        type: createLeaveRequestAction.setIsStartDateFocused,
        payload: true,
      });
    },
    placeholder: 'DD-MM-YYYY',
    semanticName: 'start date',
    required: true,
    withAsterisk: true,
  };

  const endDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    dateKind: 'date near future',
    description: {
      error: endDateInputErrorText,
      valid: endDateInputValidText,
    },
    inputKind: 'date',
    inputText: endDate,
    isValidInputText: isValidEndDate && areValidLeaveDates,
    label: 'Leave end date',
    onBlur: () => {
      leaveRequestDispatch({
        type: createLeaveRequestAction.setIsEndDateFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      leaveRequestDispatch({
        type: createLeaveRequestAction.setEndDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      leaveRequestDispatch({
        type: createLeaveRequestAction.setIsEndDateFocused,
        payload: true,
      });
    },
    placeholder: 'DD-MM-YYYY',
    semanticName: 'end date',
    required: true,
    withAsterisk: true,
  };

  const reasonForLeaveSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: REASON_FOR_LEAVE_DATA,
      description: 'Select reason for leave',
      label: 'Reason for leave',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        leaveRequestDispatch({
          type: createLeaveRequestAction.setReasonForLeave,
          payload: event.currentTarget.value as ReasonForLeave,
        });
      },
      value: reasonForLeave,
      required: true,
      withAsterisk: true,
    };

  const delegatedToEmployeeTextInputCreatorInfo: AccessibleTextInputCreatorInfo =
    {
      description: {
        error: delegatedToEmployeeInputErrorText,
        valid: delegatedToEmployeeInputValidText,
      },
      inputText: delegatedToEmployee,
      isValidInputText: isValidDelegatedToEmployee,
      label: 'Delegated to employee',
      onBlur: () => {
        leaveRequestDispatch({
          type: createLeaveRequestAction.setIsDelegatedToEmployeeFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        leaveRequestDispatch({
          type: createLeaveRequestAction.setDelegatedToEmployee,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        leaveRequestDispatch({
          type: createLeaveRequestAction.setIsDelegatedToEmployeeFocused,
          payload: true,
        });
      },
      placeholder: 'Enter name of employee',
      semanticName: 'delegated to employee',
      minLength: 2,
      maxLength: 100,
    };

  const delegatedResponsibilitiesTextareaCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: delegatedResponsibilitiesInputErrorText,
        valid: delegatedResponsibilitiesInputValidText,
      },
      inputText: delegatedResponsibilities,
      isValidInputText: isValidDelegatedResponsibilities,
      label: 'Delegated responsibilities',
      onBlur: () => {
        leaveRequestDispatch({
          type: createLeaveRequestAction.setIsDelegatedResponsibilitiesFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        leaveRequestDispatch({
          type: createLeaveRequestAction.setDelegatedResponsibilities,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        leaveRequestDispatch({
          type: createLeaveRequestAction.setIsDelegatedResponsibilitiesFocused,
          payload: true,
        });
      },
      placeholder: 'Enter delegated responsibilities',
      semanticName: 'delegated responsibilities',
    };

  const additionalCommentsTextareaCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: additionalCommentsInputErrorText,
        valid: additionalCommentsInputValidText,
      },
      inputText: additionalComments,
      isValidInputText: isValidAdditionalComments,
      label: 'Additional comments',
      onBlur: () => {
        leaveRequestDispatch({
          type: createLeaveRequestAction.setIsAdditionalCommentsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        leaveRequestDispatch({
          type: createLeaveRequestAction.setAdditionalComments,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        leaveRequestDispatch({
          type: createLeaveRequestAction.setIsAdditionalCommentsFocused,
          payload: true,
        });
      },
      placeholder: 'Enter additional comments',
      semanticName: 'additional comments',
    };

  const acknowledgementCheckboxCreatorInfo: AccessibleCheckboxSingleInputCreatorInfo =
    {
      description: {
        selected: acknowledgementInputSelectedText,
        deselected: acknowledgementInputDeselectedText,
      },
      checked: isAcknowledged,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        leaveRequestDispatch({
          type: createLeaveRequestAction.setIsAcknowledged,
          payload: event.currentTarget.checked,
        });
      },
      semanticName: 'acknowledgement',
      label: 'Acknowledgement',
      required: true,
    };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'leave request form submit button',
    semanticName: 'submit button',
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      leaveRequestDispatch({
        type: createLeaveRequestAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const [createdDelegatedToEmployeeTextInput] =
    returnAccessibleTextInputElements([
      delegatedToEmployeeTextInputCreatorInfo,
    ]);

  const [
    createdDelegatedResponsibilitiesTextareaInput,
    createdAdditionalInformationTextareaInput,
  ] = returnAccessibleTextAreaInputElements([
    delegatedResponsibilitiesTextareaCreatorInfo,
    additionalCommentsTextareaCreatorInfo,
  ]);

  const [createdStartDateInput, createdEndDateInput] =
    returnAccessibleDateTimeElements([
      startDateInputCreatorInfo,
      endDateInputCreatorInfo,
    ]);

  const [createdReasonForLeaveSelectInput] =
    returnAccessibleSelectInputElements([reasonForLeaveSelectInputCreatorInfo]);

  const [createdAcknowledgementCheckbox] =
    returnAccessibleCheckboxSingleInputElements([
      acknowledgementCheckboxCreatorInfo,
    ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);
  const displaySubmitButton =
    currentStepperPosition === LEAVE_REQUEST_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? 'Please fix errors before submitting'
            : 'Submit Leave Request form'
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const displayCreateLeaveRequestFirstPage = (
    <FormLayoutWrapper>
      {createdStartDateInput}
      {createdEndDateInput}
      {createdReasonForLeaveSelectInput}
      {createdDelegatedToEmployeeTextInput}
      {createdDelegatedResponsibilitiesTextareaInput}
      {createdAdditionalInformationTextareaInput}
      {createdAcknowledgementCheckbox}
    </FormLayoutWrapper>
  );

  const LEAVE_REQUEST_REVIEW_OBJECT: FormReviewObject = {
    'Leave request details': [
      {
        inputName: 'Leave start date',
        inputValue: startDate,
        isInputValueValid: isValidStartDate,
      },
      {
        inputName: 'Leave end date',
        inputValue: endDate,
        isInputValueValid: isValidEndDate,
      },
      {
        inputName: 'Reason for leave',
        inputValue: reasonForLeave,
      },
      {
        inputName: 'Delegated to employee',
        inputValue: delegatedToEmployee,
        isInputValueValid: isValidDelegatedToEmployee,
      },
      {
        inputName: 'Delegated responsibilities',
        inputValue: delegatedResponsibilities,
        isInputValueValid: isValidDelegatedResponsibilities,
      },
      {
        inputName: 'Additional comments',
        inputValue: additionalComments,
        isInputValueValid: isValidAdditionalComments,
      },
      {
        inputName: 'Acknowledgement',
        isInputValueValid: isAcknowledged,
      },
    ],
  };

  const displayReviewPage = (
    <FormReviewPage
      formReviewObject={LEAVE_REQUEST_REVIEW_OBJECT}
      formName="Leave request"
    />
  );

  const displayCreateLeaveRequestForm =
    currentStepperPosition === 0
      ? displayCreateLeaveRequestFirstPage
      : currentStepperPosition === 1
      ? displayReviewPage
      : displaySubmitButton;

  const displayCreateLeaveRequestComponent = (
    <StepperWrapper
      childrenTitle="Create leave request"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={LEAVE_REQUEST_DESCRIPTION_OBJECTS}
      maxStepperPosition={LEAVE_REQUEST_MAX_STEPPER_POSITION}
      parentComponentDispatch={leaveRequestDispatch}
      setCurrentStepperPosition={
        createLeaveRequestAction.setCurrentStepperPosition
      }
      stepsInError={stepsInError}
    >
      {displayCreateLeaveRequestForm}
    </StepperWrapper>
  );

  useEffect(() => {
    async function handleCreateLeaveRequestFormSubmit() {
      console.log('leave request form submitted');
    }

    if (triggerFormSubmit) {
      handleCreateLeaveRequestFormSubmit();
    }
  }, [triggerFormSubmit]);

  return <>{displayCreateLeaveRequestComponent}</>;
}

export { CreateLeaveRequest };
