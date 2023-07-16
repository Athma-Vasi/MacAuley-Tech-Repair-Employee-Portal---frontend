import { Button, Flex } from '@mantine/core';
import { ChangeEvent, FormEvent, useEffect, useReducer } from 'react';

import {
  FULL_NAME_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
} from '../../../constants/regex';
import {
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleSelectedDeselectedTextElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  returnGrammarValidationText,
  returnNameValidationText,
} from '../../../utils';
import {
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  StepperWrapper,
} from '../../wrappers';
import {
  CREATE_ENDORSEMENT_DESCRIPTION_OBJECTS,
  CREATE_ENDORSEMENT_MAX_STEPPER_POSITION,
  EMPLOYEE_ATTRIBUTES_DATA,
} from './constants';
import {
  createEndorsementAction,
  createEndorsementReducer,
  initialCreateEndorsementState,
} from './state';
import { EmployeeAttributes } from './types';

function CreateEndorsement() {
  const [createEndorsementState, createEndorsementDispatch] = useReducer(
    createEndorsementReducer,
    initialCreateEndorsementState
  );
  const {
    attributeEndorsed,
    currentStepperPosition,
    errorMessage,
    isError,
    isLoading,
    isSubmitting,
    isSuccessful,
    isSummaryOfEndorsementFocused,
    isTitleFocused,
    isEmployeeToBeEndorsedFocused,
    isValidSummaryOfEndorsement,
    isValidTitle,
    isValidEmployeeToBeEndorsed,
    loadingMessage,
    stepsInError,
    submitMessage,
    successMessage,
    title,
    employeeToBeEndorsed,
    summaryOfEndorsement,
  } = createEndorsementState;

  // validate title input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(title);
    createEndorsementDispatch({
      type: createEndorsementAction.setIsValidTitle,
      payload: isValid,
    });
  }, [title]);

  // validate employeeToBeEndorsed input on every change
  useEffect(() => {
    const isValid = FULL_NAME_REGEX.test(employeeToBeEndorsed);

    createEndorsementDispatch({
      type: createEndorsementAction.setIsValidEmployeeToBeEndorsed,
      payload: isValid,
    });
  }, [employeeToBeEndorsed]);

  // validate summaryOfEndorsement input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(summaryOfEndorsement);

    createEndorsementDispatch({
      type: createEndorsementAction.setIsValidSummaryOfEndorsement,
      payload: isValid,
    });
  }, [summaryOfEndorsement]);

  // update stepsInError for stepper wrapper
  useEffect(() => {
    const isStepInError =
      !isValidTitle ||
      !isValidEmployeeToBeEndorsed ||
      !isValidSummaryOfEndorsement;

    createEndorsementDispatch({
      type: createEndorsementAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 0,
      },
    });
  }, [isValidTitle, isValidEmployeeToBeEndorsed, isValidSummaryOfEndorsement]);

  // update currentStepperPosition for stepper wrapper
  useEffect(() => {
    const isStepInError = attributeEndorsed?.length === 0;

    createEndorsementDispatch({
      type: createEndorsementAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [attributeEndorsed]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [titleInputErrorText, titleInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'title',
      inputText: title,
      isInputTextFocused: isTitleFocused,
      isValidInputText: isValidTitle,
      regexValidationText: returnGrammarValidationText({
        content: title,
        contentKind: 'title',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [
    employeeToBeEndorsedInputErrorText,
    employeeToBeEndorsedInputValidText,
  ] = returnAccessibleErrorValidTextElements({
    inputElementKind: 'employee to be endorsed',
    inputText: employeeToBeEndorsed,
    isInputTextFocused: isEmployeeToBeEndorsedFocused,
    isValidInputText: isValidEmployeeToBeEndorsed,
    regexValidationText: returnNameValidationText({
      content: employeeToBeEndorsed,
      contentKind: 'employee to be endorsed',
      minLength: 2,
      maxLength: 100,
    }),
  });

  const [
    summaryOfEndorsementInputErrorText,
    summaryOfEndorsementInputValidText,
  ] = returnAccessibleErrorValidTextElements({
    inputElementKind: 'summary of endorsement',
    inputText: summaryOfEndorsement,
    isInputTextFocused: isSummaryOfEndorsementFocused,
    isValidInputText: isValidSummaryOfEndorsement,
    regexValidationText: returnGrammarValidationText({
      content: summaryOfEndorsement,
      contentKind: 'summary of endorsement',
      minLength: 2,
      maxLength: 2000,
    }),
  });

  const [
    attributeEndorsedInputSelectedText,
    attributeEndorsedInputDeselectedText,
  ] = returnAccessibleSelectedDeselectedTextElements({
    isSelected: attributeEndorsed.length > 0,
    semanticName: 'attributes endorsed',
    selectedDescription: `You have chosen: ${attributeEndorsed.join(
      ', '
    )} attribute${attributeEndorsed.length > 1 ? 's' : ''} to endorse`,
    deselectedDescription: 'Please select one or more attributes to endorse',
  });

  const titleTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: titleInputErrorText,
      valid: titleInputValidText,
    },
    inputText: title,
    isValidInputText: isValidTitle,
    label: 'Endorsement title',
    onBlur: () => {
      createEndorsementDispatch({
        type: createEndorsementAction.setIsTitleFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createEndorsementDispatch({
        type: createEndorsementAction.setTitle,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createEndorsementDispatch({
        type: createEndorsementAction.setIsTitleFocused,
        payload: true,
      });
    },
    placeholder: 'Enter title of endorsement',
    semanticName: 'title',
    withAsterisk: true,
    required: true,
  };

  const employeeToBeEndorsedInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: employeeToBeEndorsedInputErrorText,
      valid: employeeToBeEndorsedInputValidText,
    },
    inputText: employeeToBeEndorsed,
    isValidInputText: isValidEmployeeToBeEndorsed,
    label: 'Employee to be endorsed',
    onBlur: () => {
      createEndorsementDispatch({
        type: createEndorsementAction.setIsEmployeeToBeEndorsedFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createEndorsementDispatch({
        type: createEndorsementAction.setEmployeeToBeEndorsed,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createEndorsementDispatch({
        type: createEndorsementAction.setIsEmployeeToBeEndorsedFocused,
        payload: true,
      });
    },
    placeholder: 'Enter name of employee to be endorsed',
    semanticName: 'employee to be endorsed',
    minLength: 2,
    maxLength: 100,
    withAsterisk: true,
    required: true,
  };

  const summaryOfEndorsementInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: summaryOfEndorsementInputErrorText,
        valid: summaryOfEndorsementInputValidText,
      },
      inputText: summaryOfEndorsement,
      isValidInputText: isValidSummaryOfEndorsement,
      label: 'Summary of endorsement',
      onBlur: () => {
        createEndorsementDispatch({
          type: createEndorsementAction.setIsSummaryOfEndorsementFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        createEndorsementDispatch({
          type: createEndorsementAction.setSummaryOfEndorsement,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createEndorsementDispatch({
          type: createEndorsementAction.setIsSummaryOfEndorsementFocused,
          payload: true,
        });
      },
      placeholder: 'Enter summary of endorsement',
      semanticName: 'summary of endorsement',
      required: true,
      withAsterisk: true,
    };

  const employeeAttributesInputCreatorInfo: AccessibleCheckboxGroupInputCreatorInfo =
    {
      dataObjectArray: EMPLOYEE_ATTRIBUTES_DATA,
      description: {
        selected: attributeEndorsedInputSelectedText,
        deselected: attributeEndorsedInputDeselectedText,
      },
      label: 'Employee attributes',
      semanticName: 'employee attributes',
      value: attributeEndorsed,
      required: true,
      onChange: (event: string[]) => {
        createEndorsementDispatch({
          type: createEndorsementAction.setAttributeEndorsed,
          payload: event as EmployeeAttributes,
        });
      },
    };

  const [createdTitleTextInput, createdEmployeeToBeEndorsedTextInput] =
    returnAccessibleTextInputElements([
      titleTextInputCreatorInfo,
      employeeToBeEndorsedInputCreatorInfo,
    ]);

  const [createdSummaryOfEndorsementTextAreaInput] =
    returnAccessibleTextAreaInputElements([
      summaryOfEndorsementInputCreatorInfo,
    ]);

  const [createdEmployeeAttributesCheckboxInput] =
    returnAccessibleCheckboxGroupInputsElements([
      employeeAttributesInputCreatorInfo,
    ]);

  const displayEndorsementFirstPage = (
    <>
      {createdTitleTextInput}
      {createdEmployeeToBeEndorsedTextInput}
      {createdSummaryOfEndorsementTextAreaInput}
    </>
  );

  const displayEndorsementSecondPage = (
    <>{createdEmployeeAttributesCheckboxInput}</>
  );

  const displayCreateEndorsementReview = <h2>Review</h2>;

  const displayCreateEndorsementForm =
    currentStepperPosition === 0
      ? displayEndorsementFirstPage
      : currentStepperPosition === 1
      ? displayEndorsementSecondPage
      : currentStepperPosition === 2
      ? displayCreateEndorsementReview
      : null;

  const displayFormSubmitButton =
    currentStepperPosition === CREATE_ENDORSEMENT_MAX_STEPPER_POSITION ? (
      <Button type="button" variant="filled" disabled={stepsInError.size > 0}>
        Submit
      </Button>
    ) : null;

  const displayEndorsementComponent = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_ENDORSEMENT_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_ENDORSEMENT_MAX_STEPPER_POSITION}
      parentComponentDispatch={createEndorsementDispatch}
      setCurrentStepperPosition="setCurrentStepperPosition"
      stepsInError={stepsInError}
    >
      <form onSubmit={handleCreateEndorsementFormSubmit}>
        {displayCreateEndorsementForm}
        {displayFormSubmitButton}
      </form>
    </StepperWrapper>
  );

  async function handleCreateEndorsementFormSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
  }

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w={400}
      h="100%"
    >
      {displayEndorsementComponent}
    </Flex>
  );
}

export { CreateEndorsement };

/**
 * const displayCreateEndorsementForm =
    currentStepperPosition === 0 ? (
      <Flex
        direction="column"
        align="flex-start"
        justify="center"
        rowGap="lg"
        w="100%"
      >
        <TextInput
          size="sm"
          w="100%"
          color="dark"
          label="Endorsement title"
          placeholder="Enter title of endorsement"
          autoComplete="off"
          aria-required
          aria-describedby={
            isValidTitle ? 'title-input-note-valid' : 'title-input-note-error'
          }
          aria-invalid={isValidTitle ? false : true}
          value={title}
          icon={
            isValidTitle ? (
              <FontAwesomeIcon icon={faCheck} color="green" />
            ) : null
          }
          error={!isValidTitle && title !== ''}
          description={isValidTitle ? titleInputValidText : titleInputErrorText}
          onChange={(event) => {
            createEndorsementDispatch({
              type: createEndorsementAction.setTitle,
              payload: event.currentTarget.value,
            });
          }}
          onFocus={() => {
            createEndorsementDispatch({
              type: createEndorsementAction.setIsTitleFocused,
              payload: true,
            });
          }}
          onBlur={() => {
            createEndorsementDispatch({
              type: createEndorsementAction.setIsTitleFocused,
              payload: false,
            });
          }}
          withAsterisk
          required
          minLength={2}
          maxLength={75}
        />

        <TextInput
          size="sm"
          w="100%"
          color="dark"
          label="Employee to be endorsed"
          placeholder="Enter first, preferred or full name"
          autoComplete="off"
          aria-required
          aria-describedby={
            isValidEmployeeToBeEndorsed
              ? 'employee-to-be-endorsed-input-note-valid'
              : 'employee-to-be-endorsed-input-note-error'
          }
          aria-invalid={isValidEmployeeToBeEndorsed ? false : true}
          value={employeeToBeEndorsed}
          icon={
            isValidEmployeeToBeEndorsed ? (
              <FontAwesomeIcon icon={faCheck} color="green" />
            ) : null
          }
          error={!isValidEmployeeToBeEndorsed && employeeToBeEndorsed !== ''}
          description={
            isValidEmployeeToBeEndorsed
              ? employeeToBeEndorsedInputValidText
              : employeeToBeEndorsedInputErrorText
          }
          onChange={(event) => {
            createEndorsementDispatch({
              type: createEndorsementAction.setEmployeeToBeEndorsed,
              payload: event.currentTarget.value,
            });
          }}
          onFocus={() => {
            createEndorsementDispatch({
              type: createEndorsementAction.setIsEmployeeToBeEndorsedFocused,
              payload: true,
            });
          }}
          onBlur={() => {
            createEndorsementDispatch({
              type: createEndorsementAction.setIsEmployeeToBeEndorsedFocused,
              payload: false,
            });
          }}
          withAsterisk
          required
          minLength={2}
          maxLength={100}
        />

        <Textarea
          size="sm"
          w="100%"
          color="dark"
          label="Summary of endorsement"
          placeholder="Enter summary of endorsement"
          autoComplete="off"
          aria-required
          aria-describedby={
            isValidSummaryOfEndorsement
              ? 'summary-of-endorsement-input-note-valid'
              : 'summary-of-endorsement-input-note-error'
          }
          aria-invalid={isValidSummaryOfEndorsement ? false : true}
          value={summaryOfEndorsement}
          icon={
            isValidSummaryOfEndorsement ? (
              <FontAwesomeIcon icon={faCheck} color="green" />
            ) : null
          }
          error={!isValidSummaryOfEndorsement && summaryOfEndorsement !== ''}
          description={
            isValidSummaryOfEndorsement
              ? summaryOfEndorsementInputValidText
              : summaryOfEndorsementInputErrorText
          }
          onChange={(event) => {
            createEndorsementDispatch({
              type: createEndorsementAction.setSummaryOfEndorsement,
              payload: event.currentTarget.value,
            });
          }}
          onFocus={() => {
            createEndorsementDispatch({
              type: createEndorsementAction.setIsSummaryOfEndorsementFocused,
              payload: true,
            });
          }}
          onBlur={() => {
            createEndorsementDispatch({
              type: createEndorsementAction.setIsSummaryOfEndorsementFocused,
              payload: false,
            });
          }}
          withAsterisk
          autosize
          minRows={3}
          maxRows={10}
          required
          minLength={2}
          maxLength={2000}
        />

        <Checkbox.Group
          label="Employee attributes"
          description="Select all attributes that apply"
          value={attributeEndorsed}
          onChange={(event) => {
            createEndorsementDispatch({
              type: createEndorsementAction.setAttributeEndorsed,
              payload: event as EmployeeAttributes,
            });
          }}
        >
          <Flex
            pt="lg"
            direction="column"
            align="flex-start"
            justify="center"
            rowGap="md"
            w="100%"
          >
            {EMPLOYEE_ATTRIBUTES_DATA.map(({ value, label }) => (
              <Checkbox
                key={label}
                value={value}
                label={label}
                // color="dark"
                size="sm"
              />
            ))}
          </Flex>
        </Checkbox.Group>
      </Flex>
    ) : null;
 */
