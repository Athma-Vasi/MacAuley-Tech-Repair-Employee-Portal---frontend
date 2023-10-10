import { Group, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InvalidTokenError } from 'jwt-decode';
import { ChangeEvent, MouseEvent, useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { TbUpload } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import {
  FULL_NAME_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
} from '../../../constants/regex';
import { globalAction } from '../../../context/globalProvider/state';
import { useAuth, useGlobalState } from '../../../hooks';
import {
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleButtonElements,
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import { ResourceRequestServerResponse } from '../../../types';
import {
  replaceLastCommaWithAnd,
  returnGrammarValidationText,
  returnNameValidationText,
  urlBuilder,
} from '../../../utils';
import FormReviewPage, {
  FormReviewObject,
} from '../../formReviewPage/FormReviewPage';
import { NotificationModal } from '../../notificationModal';
import {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../../wrappers';
import {
  CREATE_ENDORSEMENT_DESCRIPTION_OBJECTS,
  CREATE_ENDORSEMENT_MAX_STEPPER_POSITION,
  EMPLOYEE_ATTRIBUTES_DATA,
} from '../constants';
import {
  createEndorsementAction,
  createEndorsementReducer,
  initialCreateEndorsementState,
} from './state';
import { EmployeeAttributes, EndorsementDocument } from './types';

function CreateEndorsement() {
  const [createEndorsementState, createEndorsementDispatch] = useReducer(
    createEndorsementReducer,
    initialCreateEndorsementState
  );
  const {
    title,
    isValidTitle,
    isTitleFocused,

    employeeToBeEndorsed,
    isValidEmployeeToBeEndorsed,
    isEmployeeToBeEndorsedFocused,

    summaryOfEndorsement,
    isValidSummaryOfEndorsement,
    isSummaryOfEndorsementFocused,

    attributeEndorsed,

    triggerFormSubmit,
    currentStepperPosition,
    stepsInError,

    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = createEndorsementState;

  const { globalDispatch } = useGlobalState();
  const {
    authState: { accessToken, isAccessTokenExpired },
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
    if (isAccessTokenExpired) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function handleCreateEndorsementFormSubmit() {
      createEndorsementDispatch({
        type: createEndorsementAction.setIsSubmitting,
        payload: true,
      });
      createEndorsementDispatch({
        type: createEndorsementAction.setSubmitMessage,
        payload: 'Submitting Endorsement form ...',
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({
        path: 'actions/general/endorsement',
      });

      const body = JSON.stringify({
        endorsement: {
          title,
          userToBeEndorsed: employeeToBeEndorsed,
          summaryOfEndorsement,
          attributeEndorsed,
          requestStatus: 'pending',
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
        const data: ResourceRequestServerResponse<EndorsementDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        createEndorsementDispatch({
          type: createEndorsementAction.setIsSuccessful,
          payload: true,
        });
        createEndorsementDispatch({
          type: createEndorsementAction.setSuccessMessage,
          payload: data.message ?? 'Endorsement form submitted successfully!',
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
          createEndorsementDispatch({
            type: createEndorsementAction.setIsSubmitting,
            payload: false,
          });
          createEndorsementDispatch({
            type: createEndorsementAction.setSubmitMessage,
            payload: '',
          });
          createEndorsementDispatch({
            type: createEndorsementAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleCreateEndorsementFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit, isAccessTokenExpired]);

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
    AccessibleErrorValidTextElements({
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
  ] = AccessibleErrorValidTextElements({
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
  ] = AccessibleErrorValidTextElements({
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

  const attributeEndorsedStrCapitalized = attributeEndorsed.map((str) => {
    const splitStr = str.split(' and ');
    if (splitStr.length > 1) {
      return splitStr
        .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
        .join(' and ');
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  const attributeEndorsedStr = replaceLastCommaWithAnd(
    attributeEndorsedStrCapitalized.join(', ')
  );

  const [
    attributeEndorsedInputSelectedText,
    attributeEndorsedInputDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: attributeEndorsed.length > 0,
    semanticName: 'attributes endorsed',
    selectedDescription: `You have chosen: ${attributeEndorsedStr} attribute${
      attributeEndorsed.length > 1 ? 's' : ''
    } to endorse`,
    deselectedDescription: 'Please select one or more attributes to endorse',
    theme: 'muted',
  });

  const titleTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: titleInputErrorText,
      valid: titleInputValidText,
    },
    inputText: title,
    isValidInputText: isValidTitle,
    label: 'Endorsement Title',
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
    label: 'Employee to be Endorsed',
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
      label: 'Summary of Endorsement',
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
      label: 'Employee Attribute(s)',
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

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'create endorsement form submit button',
    semanticName: 'submit button',
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      createEndorsementDispatch({
        type: createEndorsementAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
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

  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);
  const displaySubmitButton =
    currentStepperPosition === CREATE_ENDORSEMENT_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? 'Please correct errors before submitting'
            : 'Submit Endorsement form'
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const displayEndorsementFirstPage = (
    <FormLayoutWrapper>
      {createdTitleTextInput}
      {createdEmployeeToBeEndorsedTextInput}
      {createdSummaryOfEndorsementTextAreaInput}
    </FormLayoutWrapper>
  );

  const displayEndorsementSecondPage = (
    <FormLayoutWrapper>
      {createdEmployeeAttributesCheckboxInput}
    </FormLayoutWrapper>
  );

  const CREATE_ENDORSEMENT_REVIEW_OBJECT: FormReviewObject = {
    'Employee Endorsement': [
      {
        inputName: 'Endorsement Title',
        inputValue: title,
        isInputValueValid: isValidTitle,
      },
      {
        inputName: 'Employee to be Endorsed',
        inputValue: employeeToBeEndorsed,
        isInputValueValid: isValidEmployeeToBeEndorsed,
      },
      {
        inputName: 'Summary of Endorsement',
        inputValue: summaryOfEndorsement,
        isInputValueValid: isValidSummaryOfEndorsement,
      },
    ],
    'Attribute(s) Endorsed': [
      {
        inputName: 'Employee Attribute(s)',
        inputValue: attributeEndorsedStr,
        isInputValueValid: attributeEndorsed.length > 0,
      },
    ],
  };

  const displayCreateEndorsementReview = (
    <FormReviewPage
      formReviewObject={CREATE_ENDORSEMENT_REVIEW_OBJECT}
      formName="Endorsement"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate('/home/general/endorsement/display');
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

  const displayCreateEndorsementForm =
    currentStepperPosition === 0
      ? displayEndorsementFirstPage
      : currentStepperPosition === 1
      ? displayEndorsementSecondPage
      : currentStepperPosition === 2
      ? displayCreateEndorsementReview
      : displaySubmitButton;

  const displayEndorsementComponent = (
    <StepperWrapper
      childrenTitle="Endorsement"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_ENDORSEMENT_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_ENDORSEMENT_MAX_STEPPER_POSITION}
      parentComponentDispatch={createEndorsementDispatch}
      setCurrentStepperPosition="setCurrentStepperPosition"
      stepsInError={stepsInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayCreateEndorsementForm}
    </StepperWrapper>
  );

  return displayEndorsementComponent;
}

export default CreateEndorsement;
