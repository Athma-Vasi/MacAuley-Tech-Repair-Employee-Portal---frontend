import { Group, Tooltip } from '@mantine/core';
import { InvalidTokenError } from 'jwt-decode';
import { ChangeEvent, MouseEvent, useEffect, useReducer, useRef } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { TbUpload } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { DEPARTMENT_DATA, URGENCY_DATA } from '../../../constants/data';
import {
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
} from '../../../constants/regex';
import { globalAction } from '../../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../../hooks';
import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessibleDateTimeElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  Department,
  ResourceRequestServerResponse,
  Urgency,
} from '../../../types';
import {
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
  returnNumberAmountValidationText,
  urlBuilder,
} from '../../../utils';
import { CustomNotification } from '../../customNotification';
import FormReviewPage, {
  FormReviewObject,
} from '../../formReviewPage/FormReviewPage';
import {
  AccessibleButtonCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
} from '../../wrappers';
import { StepperWrapper } from '../../wrappers';
import {
  REQUEST_RESOURCE_DESCRIPTION_OBJECTS,
  REQUEST_RESOURCE_KIND_DATA,
  REQUEST_RESOURCE_MAX_STEPPER_POSITION,
} from '../constants';
import {
  initialRequestResourceState,
  requestResourceAction,
  requestResourceReducer,
} from './state';
import { RequestResourceDocument, RequestResourceKind } from './types';

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

    triggerFormSubmit,
    currentStepperPosition,
    stepsInError,

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = requestResourceState;

  const { globalDispatch } = useGlobalState();

  const {
    authState: { accessToken },
  } = useAuth();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function handleRequestResourceFormSubmit() {
      requestResourceDispatch({
        type: requestResourceAction.setIsSubmitting,
        payload: true,
      });
      requestResourceDispatch({
        type: requestResourceAction.setSubmitMessage,
        payload: `Submitting Request ${resourceType} Resource form ...`,
      });

      const url: URL = urlBuilder({ path: 'actions/company/request-resource' });

      const body = JSON.stringify({
        requestResource: {
          department,
          resourceType,
          resourceQuantity,
          resourceDescription,
          reasonForRequest,
          urgency,
          dateNeededBy,
          additionalInformation,
        },
      });

      const request: Request = new Request(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body,
        signal: controller.signal,
      });

      try {
        const response: Response = await fetch(request);
        const data: ResourceRequestServerResponse<RequestResourceDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        requestResourceDispatch({
          type: requestResourceAction.setIsSuccessful,
          payload: false,
        });
        requestResourceDispatch({
          type: requestResourceAction.setSuccessMessage,
          payload:
            data.message ??
            `New request resource of kind ${resourceType} for ${department} created`,
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
          requestResourceDispatch({
            type: requestResourceAction.setIsSubmitting,
            payload: false,
          });
          requestResourceDispatch({
            type: requestResourceAction.setSubmitMessage,
            payload: '',
          });
          requestResourceDispatch({
            type: requestResourceAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleRequestResourceFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // only run on triggerFormSubmit change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  const departmentInputRef = useRef<HTMLSelectElement>(null);
  // sets focus on department input on first render
  useEffect(() => {
    departmentInputRef.current?.focus();
  }, []);

  // validate resource quantity input on every change
  useEffect(() => {
    // remove leading zeros
    const resourceQuantityWithoutLeadingZeros = resourceQuantity.replace(
      /^0+(?=\d)/,
      ''
    ); // removes leading zeros if amount !== '0.00'

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

  if (isLoading || isSubmitting || isSuccessful) {
    return (
      <CustomNotification
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        isSuccessful={isSuccessful}
        loadingMessage={loadingMessage}
        successMessage={successMessage}
        submitMessage={submitMessage}
        parentDispatch={requestResourceDispatch}
        navigateTo={{ successPath: '/home/company/request-resource/display' }}
      />
    );
  }

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [resourceQuantityInputErrorText, resourceQuantityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'resource quantity',
      inputText: resourceQuantity,
      isInputTextFocused: isResourceQuantityFocused,
      isValidInputText: isValidResourceQuantity,
      regexValidationText: returnNumberAmountValidationText({
        content: resourceQuantity,
        contentKind: 'resource quantity',
      }),
    });

  const [resourceDescriptionInputErrorText, resourceDescriptionInputValidText] =
    AccessibleErrorValidTextElements({
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
    AccessibleErrorValidTextElements({
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
    AccessibleErrorValidTextElements({
      inputElementKind: 'date needed by',
      inputText: dateNeededBy,
      isInputTextFocused: isDateNeededByFocused,
      isValidInputText: isValidDateNeededBy,
      regexValidationText: returnDateNearFutureValidationText({
        content: dateNeededBy,
        contentKind: 'date needed by',
      }),
    });

  const [
    additionalInformationInputErrorText,
    additionalInformationInputValidText,
  ] = AccessibleErrorValidTextElements({
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
    data: DEPARTMENT_DATA,
    description:
      'Select the department for which you are requesting a resource.',
    label: 'Department',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
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
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
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
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
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
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
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
    label: 'Reason for Request',
    onBlur: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsReasonForRequestFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
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
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
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
      label: 'Additional Information',
      onBlur: () => {
        requestResourceDispatch({
          type: requestResourceAction.setIsAdditionalInformationFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
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
    label: 'Date Needed by',
    onBlur: () => {
      requestResourceDispatch({
        type: requestResourceAction.setIsDateNeededByFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
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

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'request resource form submit button',
    semanticName: 'submit button',
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      requestResourceDispatch({
        type: requestResourceAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
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

  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);
  const displaySubmitButton =
    currentStepperPosition === REQUEST_RESOURCE_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? 'Please fix errors before submitting form'
            : 'Submit Request Resource form'
        }
      >
        <Group position="center" w="100%">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const displayRequestResourceFormPageOne = (
    <FormLayoutWrapper>
      {createdDepartmentSelectInput}
      {createdResourceKindSelectInput}
      {createdResourceQuantityTextInput}
      {createdResourceDescriptionTextAreaInput}
    </FormLayoutWrapper>
  );

  const displayRequestResourceFormPageTwo = (
    <FormLayoutWrapper>
      {createdReasonForRequestTextInput}
      {createdUrgencySelectInput}
      {createdAdditionalInformationTextAreaInput}
      {createdDateNeededByDateInput}
    </FormLayoutWrapper>
  );

  const REQUEST_RESOURCE_REVIEW_OBJECT: FormReviewObject = {
    'Resource Details': [
      {
        inputName: 'Department',
        inputValue: department,
        isInputValueValid: true,
      },
      {
        inputName: 'Resource',
        inputValue: resourceType,
        isInputValueValid: true,
      },
      {
        inputName: 'Quantity',
        inputValue: resourceQuantity,
        isInputValueValid: isValidResourceQuantity,
      },
      {
        inputName: 'Description',
        inputValue: resourceDescription,
        isInputValueValid: isValidResourceDescription,
      },
    ],
    'Reason and Urgency': [
      {
        inputName: 'Reason for Request',
        inputValue: reasonForRequest,
        isInputValueValid: isValidReasonForRequest,
      },
      {
        inputName: 'Urgency',
        inputValue: urgency,
        isInputValueValid: true,
      },
      {
        inputName: 'Additional Information',
        inputValue: additionalInformation,
        isInputValueValid: isValidAdditionalInformation,
      },
      {
        inputName: 'Date Needed by',
        inputValue: dateNeededBy,
        isInputValueValid: isValidDateNeededBy,
      },
    ],
  };

  const displayReviewFormPage = (
    <FormReviewPage
      formReviewObject={REQUEST_RESOURCE_REVIEW_OBJECT}
      formName="Request Resource"
    />
  );

  const displayRequestResourceForm =
    currentStepperPosition === 0
      ? displayRequestResourceFormPageOne
      : currentStepperPosition === 1
      ? displayRequestResourceFormPageTwo
      : currentStepperPosition === 2
      ? displayReviewFormPage
      : displaySubmitButton;

  const displayRequestResourceComponent = (
    <StepperWrapper
      childrenTitle="Request resource"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={REQUEST_RESOURCE_DESCRIPTION_OBJECTS}
      maxStepperPosition={REQUEST_RESOURCE_MAX_STEPPER_POSITION}
      parentComponentDispatch={requestResourceDispatch}
      setCurrentStepperPosition={
        requestResourceAction.setCurrentStepperPosition
      }
      stepsInError={stepsInError}
    >
      {displayRequestResourceForm}
    </StepperWrapper>
  );

  return displayRequestResourceComponent;
}

export default RequestResource;
