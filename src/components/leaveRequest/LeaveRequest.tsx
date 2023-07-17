import { ChangeEvent, MouseEvent, useEffect, useReducer } from 'react';
import { TbUpload } from 'react-icons/tb';

import {
  DATE_NEAR_FUTURE_REGEX,
  FULL_NAME_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
} from '../../constants/regex';
import {
  returnAccessibleButtonElements,
  returnAccessibleCheckboxSingleInputElements,
  returnAccessibleDateTimeElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../jsxCreators';
import {
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
} from '../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../wrappers';
import {
  LEAVE_REQUEST_DESCRIPTION_OBJECTS,
  LEAVE_REQUEST_MAX_STEPPER_POSITION,
  REASON_FOR_LEAVE_DATA,
} from './constants';
import {
  initialLeaveRequestState,
  leaveRequestAction,
  leaveRequestReducer,
} from './state';
import { ReasonForLeave } from './types';

function LeaveRequest() {
  const [leaveRequestState, leaveRequestDispatch] = useReducer(
    leaveRequestReducer,
    initialLeaveRequestState
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
      type: leaveRequestAction.setIsValidStartDate,
      payload: isValid,
    });
  }, [startDate]);

  // validate end date on every change
  useEffect(() => {
    const isValid = DATE_NEAR_FUTURE_REGEX.test(endDate);

    leaveRequestDispatch({
      type: leaveRequestAction.setIsValidEndDate,
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
      type: leaveRequestAction.setAreValidLeaveDates,
      payload: isValid,
    });
  }, [startDate, endDate, isValidStartDate, isValidEndDate]);

  // validate delegated to employee on every change
  useEffect(() => {
    const isValid = FULL_NAME_REGEX.test(delegatedToEmployee);

    leaveRequestDispatch({
      type: leaveRequestAction.setIsValidDelegatedToEmployee,
      payload: isValid,
    });
  }, [delegatedToEmployee]);

  // validate delegated responsibilities on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(
      delegatedResponsibilities
    );

    leaveRequestDispatch({
      type: leaveRequestAction.setIsValidDelegatedResponsibilities,
      payload: isValid,
    });
  }, [delegatedResponsibilities]);

  // validate additional comments on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalComments);

    leaveRequestDispatch({
      type: leaveRequestAction.setIsValidAdditionalComments,
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
      type: leaveRequestAction.setStepsInError,
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
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'start date',
      inputText: startDate,
      isInputTextFocused: isStartDateFocused,
      isValidInputText: isValidStartDate && areValidLeaveDates,
      regexValidationText: `${leaveDatesInvalidText}${returnDateNearFutureValidationText(
        startDate
      )}`,
    });

  const [endDateInputErrorText, endDateInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'end date',
      inputText: endDate,
      isInputTextFocused: isEndDateFocused,
      isValidInputText: isValidEndDate && areValidLeaveDates,
      regexValidationText: `${leaveDatesInvalidText}${returnDateNearFutureValidationText(
        endDate
      )}`,
    });

  const [delegatedToEmployeeInputErrorText, delegatedToEmployeeInputValidText] =
    returnAccessibleErrorValidTextElements({
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
  ] = returnAccessibleErrorValidTextElements({
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
    returnAccessibleErrorValidTextElements({
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
    returnAccessibleSelectedDeselectedTextElements({
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
        type: leaveRequestAction.setIsStartDateFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      leaveRequestDispatch({
        type: leaveRequestAction.setStartDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      leaveRequestDispatch({
        type: leaveRequestAction.setIsStartDateFocused,
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
        type: leaveRequestAction.setIsEndDateFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      leaveRequestDispatch({
        type: leaveRequestAction.setEndDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      leaveRequestDispatch({
        type: leaveRequestAction.setIsEndDateFocused,
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
          type: leaveRequestAction.setReasonForLeave,
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
          type: leaveRequestAction.setIsDelegatedToEmployeeFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        leaveRequestDispatch({
          type: leaveRequestAction.setDelegatedToEmployee,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        leaveRequestDispatch({
          type: leaveRequestAction.setIsDelegatedToEmployeeFocused,
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
          type: leaveRequestAction.setIsDelegatedResponsibilitiesFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        leaveRequestDispatch({
          type: leaveRequestAction.setDelegatedResponsibilities,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        leaveRequestDispatch({
          type: leaveRequestAction.setIsDelegatedResponsibilitiesFocused,
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
          type: leaveRequestAction.setIsAdditionalCommentsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        leaveRequestDispatch({
          type: leaveRequestAction.setAdditionalComments,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        leaveRequestDispatch({
          type: leaveRequestAction.setIsAdditionalCommentsFocused,
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
          type: leaveRequestAction.setIsAcknowledged,
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
        type: leaveRequestAction.setTriggerFormSubmit,
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
    currentStepperPosition === LEAVE_REQUEST_MAX_STEPPER_POSITION
      ? createdSubmitButton
      : null;

  const displayLeaveRequestFirstPage = (
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

  const displayReviewPage = <h3>review page</h3>;

  const displayLeaveRequestForm =
    currentStepperPosition === 0
      ? displayLeaveRequestFirstPage
      : currentStepperPosition === 1
      ? displayReviewPage
      : displaySubmitButton;

  const displayLeaveRequestComponent = (
    <StepperWrapper
      childrenTitle="Leave request"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={LEAVE_REQUEST_DESCRIPTION_OBJECTS}
      maxStepperPosition={LEAVE_REQUEST_MAX_STEPPER_POSITION}
      parentComponentDispatch={leaveRequestDispatch}
      setCurrentStepperPosition={leaveRequestAction.setCurrentStepperPosition}
      stepsInError={stepsInError}
    >
      {displayLeaveRequestForm}
    </StepperWrapper>
  );

  useEffect(() => {
    async function handleLeaveRequestFormSubmit() {
      console.log('leave request form submitted');
    }

    if (triggerFormSubmit) {
      handleLeaveRequestFormSubmit();
    }
  }, [triggerFormSubmit]);

  return <>{displayLeaveRequestComponent}</>;
}

export { LeaveRequest };

/**
 * <TextInput
        type="date"
        size="sm"
        w="100%"
        color="dark"
        label="Leave start date"
        placeholder="DD-MM-YYYY"
        autoComplete="off"
        aria-required
        aria-label='Please enter start date of leave in format "date-date-month-month-year-year-year-year" from start year 1900 to end year 2024'
        aria-describedby={
          isValidStartDate
            ? 'start-date-input-note-valid'
            : 'start-date-input-note-error'
        }
        aria-invalid={isValidStartDate ? false : true}
        value={startDate}
        icon={
          isValidStartDate ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidStartDate && startDate !== ''}
        description={
          isValidStartDate ? startDateInputValidText : startDateInputErrorText
        }
        min={new Date(1900, 0, 1).toISOString().split('T')[0]}
        max={new Date(2024, 11, 31).toISOString().split('T')[0]}
        onChange={(event) => {
          leaveRequestDispatch({
            type: leaveRequestAction.setStartDate,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsStartDateFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsStartDateFocused,
            payload: false,
          });
        }}
        maxLength={10}
        withAsterisk
        required
      />

      <TextInput
        type="date"
        size="sm"
        w="100%"
        color="dark"
        label="Leave end date"
        placeholder="DD-MM-YYYY"
        autoComplete="off"
        aria-required
        aria-label='Please enter end date of leave in format "date-date-month-month-year-year-year-year" from start year 1900 to end year 2024'
        aria-describedby={
          isValidEndDate
            ? 'end-date-input-note-valid'
            : 'end-date-input-note-error'
        }
        aria-invalid={isValidEndDate ? false : true}
        value={endDate}
        icon={
          isValidEndDate ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidEndDate && endDate !== ''}
        description={
          isValidEndDate ? endDateInputValidText : endDateInputErrorText
        }
        min={new Date(1900, 0, 1).toISOString().split('T')[0]}
        max={new Date(2024, 11, 31).toISOString().split('T')[0]}
        onChange={(event) => {
          leaveRequestDispatch({
            type: leaveRequestAction.setEndDate,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsEndDateFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsEndDateFocused,
            payload: false,
          });
        }}
        maxLength={10}
        withAsterisk
        required
      />

      <NativeSelect
        size="sm"
        data={REASON_FOR_LEAVE_DATA}
        label="Reason for leave"
        description="Select reason for leave"
        value={reasonForLeave}
        onChange={(event) => {
          leaveRequestDispatch({
            type: leaveRequestAction.setReasonForLeave,
            payload: event.currentTarget.value as ReasonForLeave,
          });
        }}
        withAsterisk
        required
      />

      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Delegated to employee"
        placeholder="Enter name of employee"
        value={delegatedToEmployee}
        aria-required
        aria-describedby={
          isValidDelegatedToEmployee
            ? 'delegated-to-employee-input-note-valid'
            : 'delegated-to-employee-input-note-error'
        }
        description={
          isValidDelegatedToEmployee
            ? delegatedToEmployeeInputValidText
            : delegatedToEmployeeInputErrorText
        }
        aria-invalid={isValidDelegatedToEmployee ? 'false' : 'true'}
        icon={
          isValidDelegatedToEmployee ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidDelegatedToEmployee && delegatedToEmployee !== ''}
        onChange={(event) => {
          leaveRequestDispatch({
            type: leaveRequestAction.setDelegatedToEmployee,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsDelegatedToEmployeeFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsDelegatedToEmployeeFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={100}
        required
        withAsterisk
      />

      <Textarea
        size="sm"
        w="100%"
        color="dark"
        label="Delegated responsibilities"
        placeholder="Enter delegated responsibilities"
        value={delegatedResponsibilities}
        aria-required
        aria-describedby={
          isValidDelegatedResponsibilities
            ? 'delegated-responsibilities-input-note-valid'
            : 'delegated-responsibilities-input-note-error'
        }
        description={
          isValidDelegatedResponsibilities
            ? delegatedResponsibilitiesInputValidText
            : delegatedResponsibilitiesInputErrorText
        }
        aria-invalid={isValidDelegatedResponsibilities ? 'false' : 'true'}
        icon={
          isValidDelegatedResponsibilities ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={
          !isValidDelegatedResponsibilities && delegatedResponsibilities !== ''
        }
        onChange={(event) => {
          leaveRequestDispatch({
            type: leaveRequestAction.setDelegatedResponsibilities,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsDelegatedResponsibilitiesFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsDelegatedResponsibilitiesFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={2000}
        autosize
        minRows={3}
        maxRows={10}
        required
        withAsterisk
      />

      <Textarea
        size="sm"
        w="100%"
        color="dark"
        label="Additional comments"
        placeholder="Enter additional comments"
        value={additionalComments}
        aria-required
        aria-describedby={
          isValidAdditionalComments
            ? 'additional-comments-input-note-valid'
            : 'additional-comments-input-note-error'
        }
        description={
          isValidAdditionalComments
            ? additionalCommentsInputValidText
            : additionalCommentsInputErrorText
        }
        aria-invalid={isValidAdditionalComments ? 'false' : 'true'}
        icon={
          isValidAdditionalComments ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidAdditionalComments && additionalComments !== ''}
        onChange={(event) => {
          leaveRequestDispatch({
            type: leaveRequestAction.setAdditionalComments,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsAdditionalCommentsFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsAdditionalCommentsFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={2000}
        autosize
        minRows={3}
        maxRows={10}
      />

      <Checkbox
        size="sm"
        color="dark"
        label="I acknowledge that the information provided is accurate."
        aria-label={
          isAcknowledged
            ? 'Acknowledgement checkbox is checked. I acknowledge that the information provided is accurate.'
            : 'Acknowledgement checkbox is unchecked. I do not acknowledge.'
        }
        checked={isAcknowledged}
        onChange={(event) => {
          leaveRequestDispatch({
            type: leaveRequestAction.setIsAcknowledged,
            payload: event.currentTarget.checked,
          });
        }}
      />

      <Button
        type="button"
        variant="filled"
        disabled={
          !isValidStartDate ||
          !isValidEndDate ||
          !isValidDelegatedToEmployee ||
          !isValidDelegatedResponsibilities ||
          (!isValidAdditionalComments && additionalComments !== '') ||
          !isAcknowledged
        }
      >
        Submit
      </Button>
 */
