import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Flex, NativeSelect, Textarea, TextInput } from '@mantine/core';
import { useEffect, useReducer, useRef } from 'react';

import { DEPARTMENTS, URGENCY_DATA } from '../../constants/data';
import {
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
} from '../../constants/regex';
import {
  returnAccessibleButtonElements,
  returnAccessibleDateTimeElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextElements,
  returnAccessibleTextInputElements,
} from '../../jsxCreators';
import { Department, Urgency } from '../../types';
import {
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
  returnMoneyValidationText,
} from '../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  ButtonWrapper,
} from '../wrappers';
import { StepperWrapper } from '../wrappers';
import {
  REQUEST_RESOURCE_DESCRIPTION_OBJECTS,
  REQUEST_RESOURCE_KIND_DATA,
  REQUEST_RESOURCE_MAX_STEPPER_POSITION,
} from './constants';
import {
  initialRequestResourceState,
  requestResourceAction,
  requestResourceReducer,
} from './state';
import { RequestResourceKind } from './types';

function RequestResource() {
  const [requestResourceState, requestResourceDispatch] = useReducer(
    requestResourceReducer,
    initialRequestResourceState
  );
  const {
    department,
    resourceType,

    resourceQuantity,
    isValidResourceQuantity,
    isResourceQuantityFocused,

    resourceDescription,
    isValidResourceDescription,
    isResourceDescriptionFocused,

    reasonForRequest,
    isValidReasonForRequest,
    isReasonForRequestFocused,

    urgency,

    dateNeededBy,
    isValidDateNeededBy,
    isDateNeededByFocused,

    additionalInformation,
    isValidAdditionalInformation,
    isAdditionalInformationFocused,

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
  } = requestResourceState;

  const departmentInputRef = useRef<HTMLSelectElement>(null);
  // sets focus on department input on first render
  useEffect(() => {
    departmentInputRef.current?.focus();
  }, []);

  // validate resource quantity input on every change
  useEffect(() => {
    // remove leading zeros
    const resourceQuantityWithoutLeadingZeros = resourceQuantity.replace(
      /^0+/,
      ''
    );

    requestResourceDispatch({
      type: requestResourceAction.setResourceQuantity,
      payload: resourceQuantityWithoutLeadingZeros,
    });

    const isValid = MONEY_REGEX.test(resourceQuantity);
    requestResourceDispatch({
      type: requestResourceAction.setIsValidResourceQuantity,
      payload: isValid,
    });
  }, [resourceQuantity]);

  // validate resource description input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(resourceDescription);

    requestResourceDispatch({
      type: requestResourceAction.setIsValidResourceDescription,
      payload: isValid,
    });
  }, [resourceDescription]);

  // validate reason for request input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(reasonForRequest);

    requestResourceDispatch({
      type: requestResourceAction.setIsValidReasonForRequest,
      payload: isValid,
    });
  }, [reasonForRequest]);

  // validate date needed by input on every change
  useEffect(() => {
    const dateRegexTest = DATE_NEAR_FUTURE_REGEX.test(dateNeededBy);
    const currentDate = new Date();
    const dateNeededByDate = new Date(dateNeededBy);
    const isValid =
      dateRegexTest && dateNeededByDate.getTime() > currentDate.getTime();

    requestResourceDispatch({
      type: requestResourceAction.setIsValidDateNeededBy,
      payload: isValid,
    });
  }, [dateNeededBy]);

  // validate additional information input on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalInformation);

    requestResourceDispatch({
      type: requestResourceAction.setIsValidAdditionalInformation,
      payload: isValid,
    });
  }, [additionalInformation]);

  // update stepper state on every change
  useEffect(() => {
    const isStepInError =
      !isValidResourceQuantity || !isValidResourceDescription;

    requestResourceDispatch({
      type: requestResourceAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 0,
      },
    });
  }, [isValidResourceQuantity, isValidResourceDescription]);

  // update stepper state on every change
  useEffect(() => {
    const areOptionalStepsInError =
      (reasonForRequest.length > 0 && !isValidReasonForRequest) ||
      (additionalInformation.length > 0 && !isValidAdditionalInformation);
    const isRequiredStepInError = !isValidDateNeededBy;
    const isStepInError = isRequiredStepInError || areOptionalStepsInError;

    requestResourceDispatch({
      type: requestResourceAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    isValidDateNeededBy,
    isValidReasonForRequest,
    isValidAdditionalInformation,
    reasonForRequest,
    additionalInformation,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [resourceQuantityInputErrorText, resourceQuantityInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'resource quantity',
      inputText: resourceQuantity,
      isInputTextFocused: isResourceQuantityFocused,
      isValidInputText: isValidResourceQuantity,
      regexValidationText: returnMoneyValidationText({
        kind: 'resource quantity',
        money: resourceQuantity,
      }),
    });

  const [resourceDescriptionInputErrorText, resourceDescriptionInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'resource description',
      inputText: resourceDescription,
      isInputTextFocused: isResourceDescriptionFocused,
      isValidInputText: isValidResourceDescription,
      regexValidationText: returnGrammarValidationText({
        content: resourceDescription,
        contentKind: 'resource description',
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [reasonForRequestInputErrorText, reasonForRequestInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'reason for request',
      inputText: reasonForRequest,
      isInputTextFocused: isReasonForRequestFocused,
      isValidInputText: isValidReasonForRequest,
      regexValidationText: returnGrammarValidationText({
        content: reasonForRequest,
        contentKind: 'reason for request',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [dateNeededByInputErrorText, dateNeededByInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'date needed by',
      inputText: dateNeededBy,
      isInputTextFocused: isDateNeededByFocused,
      isValidInputText: isValidDateNeededBy,
      regexValidationText: returnDateNearFutureValidationText(dateNeededBy),
    });

  const [
    additionalInformationInputErrorText,
    additionalInformationInputValidText,
  ] = returnAccessibleTextElements({
    inputElementKind: 'additional information',
    inputText: additionalInformation,
    isInputTextFocused: isAdditionalInformationFocused,
    isValidInputText: isValidAdditionalInformation,
    regexValidationText: returnGrammarValidationText({
      content: additionalInformation,
      contentKind: 'additional information',
      minLength: 2,
      maxLength: 2000,
    }),
  });

  const departmentSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: DEPARTMENTS,
    description:
      'Select the department for which you are requesting a resource.',
    label: 'Department',
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setDepartment,
        payload: event.currentTarget.value as Department,
      });
    },
    value: department,
    withAsterisk: true,
    required: true,
  };

  const resourceKindSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: REQUEST_RESOURCE_KIND_DATA,
    description: 'Select the kind of resource you are requesting.',
    label: 'Resource',
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setResourceType,
        payload: event.currentTarget.value as RequestResourceKind,
      });
    },
    value: resourceType,
    withAsterisk: true,
    required: true,
  };

  const resourceQuantityInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: resourceQuantityInputErrorText,
      valid: resourceQuantityInputValidText,
    },
    inputText: resourceQuantity,
    isValidInputText: isValidResourceQuantity,
    label: 'Quantity',
    onBlur: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsResourceQuantityFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setResourceQuantity,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsResourceQuantityFocused,
        payload: true,
      });
    },
    placeholder: 'Enter resource amount',
    semanticName: 'resource quantity',
    minLength: 3,
    maxLength: 9,
    required: true,
    withAsterisk: true,
  };

  const resourceDescriptionTextAreaCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: resourceDescriptionInputErrorText,
        valid: resourceDescriptionInputValidText,
      },
      inputText: resourceDescription,
      isValidInputText: isValidResourceDescription,
      label: 'Description',
      onBlur: () => {
        requestResourceDispatch({
          type: requestResourceAction.setIsResourceDescriptionFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        requestResourceDispatch({
          type: requestResourceAction.setResourceDescription,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        requestResourceDispatch({
          type: requestResourceAction.setIsResourceDescriptionFocused,
          payload: true,
        });
      },
      placeholder: 'Enter resource description',
      semanticName: 'resource description',
      required: true,
      withAsterisk: true,
    };

  const reasonForRequestTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: reasonForRequestInputErrorText,
      valid: reasonForRequestInputValidText,
    },
    inputText: reasonForRequest,
    isValidInputText: isValidReasonForRequest,
    label: 'Reason for request',
    onBlur: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsReasonForRequestFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setReasonForRequest,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsReasonForRequestFocused,
        payload: true,
      });
    },
    placeholder: 'Enter reason for request',
    semanticName: 'reason for request',
  };

  const urgencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: URGENCY_DATA,
    description: 'Select the urgency of your request.',
    label: 'Urgency',
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setUrgency,
        payload: event.currentTarget.value as Urgency,
      });
    },
    value: urgency,
    withAsterisk: true,
    required: true,
  };

  const additionalInformationTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: additionalInformationInputErrorText,
        valid: additionalInformationInputValidText,
      },
      inputText: additionalInformation,
      isValidInputText: isValidAdditionalInformation,
      label: 'Additional information',
      onBlur: () => {
        requestResourceDispatch({
          type: requestResourceAction.setIsAdditionalInformationFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        requestResourceDispatch({
          type: requestResourceAction.setAdditionalInformation,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        requestResourceDispatch({
          type: requestResourceAction.setIsAdditionalInformationFocused,
          payload: true,
        });
      },
      placeholder: 'Enter additional information',
      semanticName: 'additional information',
    };

  const dateNeededByDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: dateNeededByInputErrorText,
      valid: dateNeededByInputValidText,
    },
    inputText: dateNeededBy,
    isValidInputText: isValidDateNeededBy,
    label: 'Date needed by',
    onBlur: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsDateNeededByFocused,
        payload: false,
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setDateNeededBy,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsDateNeededByFocused,
        payload: true,
      });
    },
    placeholder: 'Enter date needed by',
    semanticName: 'date needed by',
    inputKind: 'date',
    dateKind: 'date near future',
    required: true,
    withAsterisk: true,
  };

  const formSubmitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    buttonOnClick: () => {},
    semanticDescription: 'submit resource request form',
    semanticName: 'submit request',
    buttonDisabled: stepsInError.size > 0,
  };

  const [
    createdDepartmentSelectInput,
    createdResourceKindSelectInput,
    createdUrgencySelectInput,
  ] = returnAccessibleSelectInputElements([
    departmentSelectInputCreatorInfo,
    resourceKindSelectInputCreatorInfo,
    urgencySelectInputCreatorInfo,
  ]);

  const [createdResourceQuantityTextInput, createdReasonForRequestTextInput] =
    returnAccessibleTextInputElements([
      resourceQuantityInputCreatorInfo,
      reasonForRequestTextInputCreatorInfo,
    ]);

  const [
    createdResourceDescriptionTextAreaInput,
    createdAdditionalInformationTextAreaInput,
  ] = returnAccessibleTextAreaInputElements([
    resourceDescriptionTextAreaCreatorInfo,
    additionalInformationTextAreaInputCreatorInfo,
  ]);

  const [createdDateNeededByDateInput] = returnAccessibleDateTimeElements([
    dateNeededByDateInputCreatorInfo,
  ]);

  const [createdFormSubmitButton] = returnAccessibleButtonElements([
    formSubmitButtonCreatorInfo,
  ]);

  const displayRequestResourceFormPageOne = (
    <>
      {createdDepartmentSelectInput}
      {createdResourceKindSelectInput}
      {createdResourceQuantityTextInput}
      {createdResourceDescriptionTextAreaInput}
    </>
  );

  const displayRequestResourceFormPageTwo = (
    <>
      {createdReasonForRequestTextInput}
      {createdUrgencySelectInput}
      {createdAdditionalInformationTextAreaInput}
      {createdDateNeededByDateInput}
    </>
  );

  const displayReviewFormPage = <h3>request resource review</h3>;

  const displayRequestResourceForm =
    currentStepperPosition === 0
      ? displayRequestResourceFormPageOne
      : currentStepperPosition === 1
      ? displayRequestResourceFormPageTwo
      : currentStepperPosition === 2
      ? displayReviewFormPage
      : null;

  const displayFormSubmitButton =
    currentStepperPosition === REQUEST_RESOURCE_MAX_STEPPER_POSITION
      ? createdFormSubmitButton
      : null;

  const displayRequestResourceComponent = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={REQUEST_RESOURCE_DESCRIPTION_OBJECTS}
      maxStepperPosition={REQUEST_RESOURCE_MAX_STEPPER_POSITION}
      parentComponentDispatch={requestResourceDispatch}
      setCurrentStepperPosition={
        requestResourceAction.setCurrentStepperPosition
      }
      stepsInError={stepsInError}
    >
      <form onSubmit={handleRequestResourceFormSubmit}>
        {displayRequestResourceForm}
        {displayFormSubmitButton}
      </form>
    </StepperWrapper>
  );

  async function handleRequestResourceFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
  }

  return (
    <Flex direction="column" align="center" justify="center" w="400px">
      {displayRequestResourceComponent}
    </Flex>
  );
}

export { RequestResource };

/**
 * <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w={400}
    >
      <NativeSelect
        size="sm"
        data={DEPARTMENTS}
        label="Department"
        description="
          Select the department for which you are requesting a resource."
        value={department}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setDepartment,
            payload: event.currentTarget.value as Department,
          });
        }}
        withAsterisk
        required
      />

      <NativeSelect
        size="sm"
        data={REQUEST_RESOURCE_KIND_DATA}
        label="Resource"
        description="
          Select the kind of resource you are requesting."
        value={resourceType}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setResourceType,
            payload: event.currentTarget.value as RequestResourceKind,
          });
        }}
        withAsterisk
        required
      />

      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Resource quantity"
        placeholder="Enter resource amount"
        value={resourceQuantity}
        aria-required
        aria-describedby={
          isValidResourceQuantity
            ? 'resource-quantity-input-note-valid'
            : 'resource-quantity-input-note-error'
        }
        description={
          isValidResourceQuantity
            ? resourceQuantityInputValidText
            : resourceQuantityInputErrorText
        }
        aria-invalid={isValidResourceQuantity ? 'false' : 'true'}
        icon={
          isValidResourceQuantity ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidResourceQuantity && resourceQuantity !== ''}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setResourceQuantity,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsResourceQuantityFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsResourceQuantityFocused,
            payload: false,
          });
        }}
        minLength={1}
        maxLength={9}
        required
        withAsterisk
      />

      <Textarea
        size="sm"
        w="100%"
        color="dark"
        label="Resource description"
        placeholder="Enter description of resource requested"
        value={resourceDescription}
        aria-required
        aria-describedby={
          isValidResourceDescription
            ? 'resource-description-input-note-valid'
            : 'resource-description-input-note-error'
        }
        description={
          isValidResourceDescription
            ? resourceDescriptionInputValidText
            : resourceDescriptionInputErrorText
        }
        aria-invalid={isValidResourceDescription ? 'false' : 'true'}
        icon={
          isValidResourceDescription ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidResourceDescription && resourceDescription !== ''}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setResourceDescription,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsResourceDescriptionFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsResourceDescriptionFocused,
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

      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Reason for request"
        placeholder="Enter reason for request"
        value={reasonForRequest}
        aria-required
        aria-describedby={
          isValidReasonForRequest
            ? 'reason-for-request-input-note-valid'
            : 'reason-for-request-input-note-error'
        }
        description={
          isValidReasonForRequest
            ? reasonForRequestInputValidText
            : reasonForRequestInputErrorText
        }
        aria-invalid={isValidReasonForRequest ? 'false' : 'true'}
        icon={
          isValidReasonForRequest ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidReasonForRequest && reasonForRequest !== ''}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setReasonForRequest,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsReasonForRequestFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsReasonForRequestFocused,
            payload: false,
          });
        }}
        minLength={2}
        maxLength={75}
        required
        withAsterisk
      />

      <NativeSelect
        size="sm"
        data={URGENCY_DATA}
        label="Urgency"
        description="
          Select the urgency of your request."
        value={urgency}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setUrgency,
            payload: event.currentTarget.value as Urgency,
          });
        }}
        withAsterisk
        required
      />

      <Textarea
        size="sm"
        w="100%"
        color="dark"
        label="Additional information"
        placeholder="Enter additional information"
        value={additionalInformation}
        aria-required
        aria-describedby={
          isValidAdditionalInformation
            ? 'additional-information-input-note-valid'
            : 'additional-information-input-note-error'
        }
        description={
          isValidAdditionalInformation
            ? additionalInformationInputValidText
            : additionalInformationInputErrorText
        }
        aria-invalid={isValidAdditionalInformation ? 'false' : 'true'}
        icon={
          isValidAdditionalInformation ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidAdditionalInformation && additionalInformation !== ''}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setAdditionalInformation,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsAdditionalInformationFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsAdditionalInformationFocused,
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

      <TextInput
        type="date"
        size="sm"
        w="100%"
        color="dark"
        label="Date needed by"
        placeholder="DD-MM-YYYY"
        autoComplete="off"
        aria-required
        aria-label='Please enter resource needed by date in format "date-date-month-month-year-year-year-year" from start year 1900 to end year 2024'
        aria-describedby={
          isValidDateNeededBy
            ? 'date-needed-by-input-note-valid'
            : 'date-needed-by-input-note-error'
        }
        aria-invalid={isValidDateNeededBy ? false : true}
        value={dateNeededBy}
        icon={
          isValidDateNeededBy ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidDateNeededBy && dateNeededBy !== ''}
        description={
          isValidDateNeededBy
            ? dateNeededByInputValidText
            : dateNeededByInputErrorText
        }
        // current date for min
        min={new Date().toISOString().split('T')[0]}
        max={new Date(2026, 11, 31).toISOString().split('T')[0]}
        onChange={(event) => {
          requestResourceDispatch({
            type: requestResourceAction.setDateNeededBy,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsDateNeededByFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          requestResourceDispatch({
            type: requestResourceAction.setIsDateNeededByFocused,
            payload: false,
          });
        }}
        maxLength={10}
        withAsterisk
        required
      />

      <Button
        type="button"
        variant="filled"
        disabled={
          !isValidResourceQuantity ||
          !isValidResourceDescription ||
          !isValidDateNeededBy
        }
      >
        Submit
      </Button>
    </Flex>
  
 */
