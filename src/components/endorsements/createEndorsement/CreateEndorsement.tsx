import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox, Flex, Textarea, TextInput } from '@mantine/core';
import { useEffect, useReducer, useRef } from 'react';

import {
  FULL_NAME_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_REGEX,
} from '../../../constants/regex';
import { returnAccessibleTextElements } from '../../../jsxCreators';
import {
  returnGrammarValidationText,
  returnNameValidationText,
} from '../../../utils';
import { StepperWrapper } from '../../stepperWrapper';
import {
  CREATE_ENDORSEMENT_DESCRIPTION_MAP,
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
    isUserToBeEndorsedFocused,
    isValidSummaryOfEndorsement,
    isValidTitle,
    isValidUserToBeEndorsed,
    loadingMessage,
    stepsInError,
    submitMessage,
    successMessage,
    title,
    userToBeEndorsed,
    summaryOfEndorsement,
  } = createEndorsementState;

  const titleInputRef = useRef<HTMLInputElement>(null);
  // sets focus on title input on page load
  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  // validate title input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(title);
    createEndorsementDispatch({
      type: createEndorsementAction.setIsValidTitle,
      payload: isValid,
    });
  }, [title]);

  // validate userToBeEndorsed input on every change
  useEffect(() => {
    const isValid = FULL_NAME_REGEX.test(userToBeEndorsed);

    createEndorsementDispatch({
      type: createEndorsementAction.setIsValidUserToBeEndorsed,
      payload: isValid,
    });
  }, [userToBeEndorsed]);

  // validate summaryOfEndorsement input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(summaryOfEndorsement);

    createEndorsementDispatch({
      type: createEndorsementAction.setIsValidSummaryOfEndorsement,
      payload: isValid,
    });
  }, [summaryOfEndorsement]);

  // update stepsInError for stepper wrapper
  useEffect(() => {
    const isStepInError =
      !isValidTitle || !isValidUserToBeEndorsed || !isValidSummaryOfEndorsement;

    createEndorsementDispatch({
      type: createEndorsementAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [isValidTitle, isValidUserToBeEndorsed, isValidSummaryOfEndorsement]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [titleInputErrorText, titleInputValidText] =
    returnAccessibleTextElements({
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

  const [userToBeEndorsedInputErrorText, userToBeEndorsedInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'employee name',
      inputText: userToBeEndorsed,
      isInputTextFocused: isUserToBeEndorsedFocused,
      isValidInputText: isValidUserToBeEndorsed,
      regexValidationText: returnNameValidationText({
        content: userToBeEndorsed,
        contentKind: 'employee name',
        minLength: 2,
        maxLength: 100,
      }),
    });

  const [
    summaryOfEndorsementInputErrorText,
    summaryOfEndorsementInputValidText,
  ] = returnAccessibleTextElements({
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

  // DELETE LATER
  useEffect(() => {
    console.log({ attributeEndorsed });
  }, [attributeEndorsed]);

  const displayCreateEndorsementForm =
    currentStepperPosition === 0 ? (
      <Flex
        direction="column"
        align="flex-start"
        justify="center"
        rowGap="lg"
        w="100%"
      >
        {/* title text input */}
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

        {/* userToBeEndorsed text input */}
        <TextInput
          size="sm"
          w="100%"
          color="dark"
          label="Employee to be endorsed"
          placeholder="Enter full or preferred name"
          autoComplete="off"
          aria-required
          aria-describedby={
            isValidUserToBeEndorsed
              ? 'employee-name-input-note-valid'
              : 'employee-name-input-note-error'
          }
          aria-invalid={isValidUserToBeEndorsed ? false : true}
          value={userToBeEndorsed}
          icon={
            isValidUserToBeEndorsed ? (
              <FontAwesomeIcon icon={faCheck} color="green" />
            ) : null
          }
          error={!isValidUserToBeEndorsed && userToBeEndorsed !== ''}
          description={
            isValidUserToBeEndorsed
              ? userToBeEndorsedInputValidText
              : userToBeEndorsedInputErrorText
          }
          onChange={(event) => {
            createEndorsementDispatch({
              type: createEndorsementAction.setUserToBeEndorsed,
              payload: event.currentTarget.value,
            });
          }}
          onFocus={() => {
            createEndorsementDispatch({
              type: createEndorsementAction.setIsUserToBeEndorsedFocused,
              payload: true,
            });
          }}
          onBlur={() => {
            createEndorsementDispatch({
              type: createEndorsementAction.setIsUserToBeEndorsedFocused,
              payload: false,
            });
          }}
          withAsterisk
          required
          minLength={2}
          maxLength={100}
        />

        {/* summaryOfEndorsement textarea input */}
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

        {/* employee attributes checkbox input */}
        <Checkbox.Group
          value={attributeEndorsed}
          onChange={(event) => {
            createEndorsementDispatch({
              type: createEndorsementAction.setAttributeEndorsed,
              payload: event as EmployeeAttributes,
            });
          }}
        >
          <Flex
            direction="column"
            align="flex-start"
            justify="center"
            rowGap="lg"
            w="100%"
          >
            {EMPLOYEE_ATTRIBUTES_DATA.map(({ value, label }) => (
              <Checkbox
                key={label}
                value={value}
                label={label}
                color="dark"
                size="sm"
              />
            ))}
          </Flex>
        </Checkbox.Group>
      </Flex>
    ) : null;

  const displayCreateEndorsementReview =
    currentStepperPosition === 1 ? <h2>Review</h2> : null;

  async function handleCreateEndorsementFormSubmit(
    event: React.FormEvent<HTMLFormElement>
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
      <StepperWrapper
        currentStepperPosition={currentStepperPosition}
        descriptionMap={CREATE_ENDORSEMENT_DESCRIPTION_MAP}
        maxStepperPosition={CREATE_ENDORSEMENT_MAX_STEPPER_POSITION}
        parentComponentDispatch={createEndorsementDispatch}
        setCurrentStepperPosition="setCurrentStepperPosition"
        stepsInError={stepsInError}
      >
        <form onSubmit={handleCreateEndorsementFormSubmit}>
          {displayCreateEndorsementForm}
          {displayCreateEndorsementReview}

          {/* submit button */}
          <Button
            type="button"
            variant="filled"
            disabled={
              stepsInError.size > 0 ||
              currentStepperPosition < CREATE_ENDORSEMENT_MAX_STEPPER_POSITION
            }
          >
            Submit
          </Button>
        </form>
      </StepperWrapper>
    </Flex>
  );
}

export { CreateEndorsement };
