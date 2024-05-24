import { Container, Stack, Text } from "@mantine/core";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { DEPARTMENT_DATA, JOB_POSITION_DATA } from "../../../constants/data";
import { useAuth } from "../../../hooks";
import { useFetchInterceptor } from "../../../hooks/useFetchInterceptor";
import { JobPosition, PhoneNumber, StepperPage } from "../../../types";
import { formSubmitPOST } from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleStepper } from "../../accessibleInputs/AccessibleStepper";
import { AccessibleSwitchInput } from "../../accessibleInputs/AccessibleSwitchInput";
import { AccessibleTextAreaInput } from "../../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import { REFERMENT_ROLE_ROUTE_PATHS, returnRefermentStepperPages } from "../constants";
import { RefermentAction, refermentAction } from "./actions";
import { refermentReducer } from "./reducers";
import { initialRefermentState } from "./state";
import { RefermentSchema } from "./types";

function Referment() {
  const [refermentState, refermentDispatch] = useReducer(
    refermentReducer,
    initialRefermentState
  );

  const {
    candidateFullName,
    candidateEmail,
    candidateContactNumber,
    candidateCurrentJobTitle,
    candidateCurrentCompany,
    candidateProfileUrl,
    departmentReferredFor,
    positionReferredFor,
    positionJobDescription,
    referralReason,
    additionalInformation,
    privacyConsent,
    triggerFormSubmit,
    pagesInError,
    isSubmitting,
    isSuccessful,
  } = refermentState;

  const {
    authState: { sessionId, userId, username },
  } = useAuth();
  const { fetchInterceptor } = useFetchInterceptor();
  const { showBoundary } = useErrorBoundary();

  const fetchAbortControllerRef = useRef<AbortController | null>(null);
  const preFetchAbortControllerRef = useRef<AbortController | null>(null);
  const isComponentMountedRef = useRef(false);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    preFetchAbortControllerRef.current?.abort();
    preFetchAbortControllerRef.current = new AbortController();
    const preFetchAbortController = preFetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    let isComponentMounted = isComponentMountedRef.current;

    if (triggerFormSubmit) {
      const refermentSchema: RefermentSchema = {
        additionalInformation,
        candidateContactNumber: candidateContactNumber as PhoneNumber,
        candidateCurrentCompany,
        candidateCurrentJobTitle,
        candidateEmail,
        candidateFullName,
        candidateProfileUrl,
        departmentReferredFor,
        positionJobDescription,
        positionReferredFor,
        privacyConsent,
        referralReason,
        userId,
        username,
        requestStatus: "pending",
      };

      formSubmitPOST({
        dispatch: refermentDispatch,
        fetchAbortController,
        fetchInterceptor,
        isComponentMounted,
        isSubmittingAction: refermentAction.setIsSubmitting,
        isSuccessfulAction: refermentAction.setIsSuccessful,
        preFetchAbortController,
        roleResourceRoutePaths: REFERMENT_ROLE_ROUTE_PATHS,
        schema: refermentSchema,
        schemaName: "refermentSchema",
        sessionId,
        showBoundary,
        userId,
        username,
        userRole: "manager",
      });
    }

    return () => {
      isComponentMountedRef.current = false;
      preFetchAbortController?.abort();
      fetchAbortController?.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  if (isSubmitting) {
    const submittingState = (
      <Stack>
        <Text size="md">Submitting address changes! Please wait...</Text>
      </Stack>
    );

    return submittingState;
  }

  if (isSuccessful) {
    const successfulState = (
      <Stack>
        <Text size="md">Address changes submitted successfully!</Text>
      </Stack>
    );

    return successfulState;
  }

  const REFERMENT_STEPPER_PAGES: StepperPage[] = returnRefermentStepperPages();

  const additionalInformationTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: refermentAction.setPageInError,
        name: "additionalInformation",
        parentDispatch: refermentDispatch,
        stepperPages: REFERMENT_STEPPER_PAGES,
        validValueAction: refermentAction.setAdditionalInformation,
        value: additionalInformation,
      }}
    />
  );

  const candidateContactNumberTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: refermentAction.setPageInError,
        name: "candidateContactNumber",
        parentDispatch: refermentDispatch,
        stepperPages: REFERMENT_STEPPER_PAGES,
        validValueAction: refermentAction.setCandidateContactNumber,
        value: candidateContactNumber,
      }}
    />
  );

  const candidateCurrentCompanyTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: refermentAction.setPageInError,
        name: "candidateCurrentCompany",
        parentDispatch: refermentDispatch,
        stepperPages: REFERMENT_STEPPER_PAGES,
        validValueAction: refermentAction.setCandidateCurrentCompany,
        value: candidateCurrentCompany,
      }}
    />
  );

  const candidateCurrentJobTitleTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: refermentAction.setPageInError,
        name: "candidateCurrentJobTitle",
        parentDispatch: refermentDispatch,
        stepperPages: REFERMENT_STEPPER_PAGES,
        validValueAction: refermentAction.setCandidateCurrentJobTitle,
        value: candidateCurrentJobTitle,
      }}
    />
  );

  const candidateEmailTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: refermentAction.setPageInError,
        name: "candidateEmail",
        parentDispatch: refermentDispatch,
        stepperPages: REFERMENT_STEPPER_PAGES,
        validValueAction: refermentAction.setCandidateEmail,
        value: candidateEmail,
      }}
    />
  );

  const candidateFullNameTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: refermentAction.setPageInError,
        name: "candidateFullName",
        parentDispatch: refermentDispatch,
        stepperPages: REFERMENT_STEPPER_PAGES,
        validValueAction: refermentAction.setCandidateFullName,
        value: candidateFullName,
      }}
    />
  );

  const candidateProfileUrlTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: refermentAction.setPageInError,
        name: "candidateProfileUrl",
        parentDispatch: refermentDispatch,
        stepperPages: REFERMENT_STEPPER_PAGES,
        validValueAction: refermentAction.setCandidateProfileUrl,
        value: candidateProfileUrl,
      }}
    />
  );

  const departmentReferredForSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: DEPARTMENT_DATA,
        name: "departmentReferredFor",
        parentDispatch: refermentDispatch,
        value: departmentReferredFor,
        validValueAction: refermentAction.setDepartmentReferredFor,
      }}
    />
  );

  const positionReferredForSelectInput = (
    <AccessibleSelectInput<RefermentAction["setPositionReferredFor"], JobPosition>
      attributes={{
        data: JOB_POSITION_DATA,
        name: "positionReferredFor",
        parentDispatch: refermentDispatch,
        value: positionReferredFor,
        validValueAction: refermentAction.setPositionReferredFor,
      }}
    />
  );

  const positionJobDescriptionTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: refermentAction.setPageInError,
        name: "positionJobDescription",
        parentDispatch: refermentDispatch,
        stepperPages: REFERMENT_STEPPER_PAGES,
        validValueAction: refermentAction.setPositionJobDescription,
        value: positionJobDescription,
      }}
    />
  );

  const referralReasonTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: refermentAction.setPageInError,
        name: "referralReason",
        parentDispatch: refermentDispatch,
        stepperPages: REFERMENT_STEPPER_PAGES,
        validValueAction: refermentAction.setReferralReason,
        value: referralReason,
      }}
    />
  );

  const privacyConsentSwitch = (
    <AccessibleSwitchInput
      attributes={{
        checked: privacyConsent,
        invalidValueAction: refermentAction.setPageInError,
        name: "privacyConsent",
        offLabel: "No",
        onLabel: "Yes",
        parentDispatch: refermentDispatch,
        switchOffDescription: "I do not acknowledge.",
        switchOnDescription: "I acknowledge to share candidate's personal information.",
        validValueAction: refermentAction.setPrivacyConsent,
        value: privacyConsent ? "Yes" : "No",
      }}
    />
  );

  const submitButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "All inputs are valid. Click to submit form.",
        disabledScreenreaderText: "Please fix errors before submitting form.",
        disabled: pagesInError.size > 0 || triggerFormSubmit,
        kind: "submit",
        name: "submit",
        onClick: (_event: React.MouseEvent<HTMLButtonElement>) => {
          refermentDispatch({
            action: refermentAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const firstPage = (
    <Stack>
      {candidateFullNameTextInput}
      {candidateEmailTextInput}
      {candidateContactNumberTextInput}
      {candidateCurrentJobTitleTextInput}
      {candidateCurrentCompanyTextInput}
      {candidateProfileUrlTextInput}
    </Stack>
  );

  const secondPage = (
    <Stack>
      {departmentReferredForSelectInput}
      {positionReferredForSelectInput}
      {positionJobDescriptionTextAreaInput}
      {referralReasonTextAreaInput}
      {additionalInformationTextAreaInput}
      {privacyConsentSwitch}
    </Stack>
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: refermentState,
        pageElements: [firstPage, secondPage],
        stepperPages: REFERMENT_STEPPER_PAGES,
        submitButton,
      }}
    />
  );

  return <Container w={700}>{stepper}</Container>;
}

export default Referment;

/**
 * 
  const { globalDispatch } = useGlobalState();

  const { wrappedFetch } = useWrapFetch();

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

    async function handleRefermentFormSubmit() {
      refermentDispatch({
        type: refermentAction.setIsSubmitting,
        payload: true,
      });
      refermentDispatch({
        type: refermentAction.setSubmitMessage,
        payload: `Submitting candidate ${candidateFullName} for referment...`,
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({ path: "actions/general/referment" });

      const body = JSON.stringify({
        refermentSchema: {
          candidateFullName,
          candidateEmail,
          candidateContactNumber,
          candidateCurrentJobTitle,
          candidateCurrentCompany,
          candidateProfileUrl,
          departmentReferredFor,
          positionReferredFor,
          positionJobDescription,
          referralReason,
          additionalInformation,
          privacyConsent,
          requestStatus: "pending",
        },
      });

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      };

      try {
        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: controller.signal,
          url,
        });

        const data: ResourceRequestServerResponse<RefermentDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        refermentDispatch({
          type: refermentAction.setIsSuccessful,
          payload: true,
        });
        refermentDispatch({
          type: refermentAction.setSuccessMessage,
          payload:
            data.message ??
            `Successfully submitted candidate ${candidateFullName} for referment.`,
        });
      } catch (error: any) {
        if (!isMounted || error.name === "AbortError") {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? "Invalid token. Please login again."
            : !error.response
            ? "Network error. Please try again."
            : error?.message ?? "Unknown error occurred. Please try again.";

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate("/home");

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: "",
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          refermentDispatch({
            type: refermentAction.setIsSubmitting,
            payload: false,
          });
          refermentDispatch({
            type: refermentAction.setSubmitMessage,
            payload: "",
          });
          refermentDispatch({
            type: refermentAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleRefermentFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  // validate candidateFullName on every change
  useEffect(() => {
    const isValid = FULL_NAME_REGEX.test(candidateFullName);

    refermentDispatch({
      type: refermentAction.setIsValidCandidateFullName,
      payload: isValid,
    });
  }, [candidateFullName]);

  // validate candidateEmail on every change
  useEffect(() => {
    const isValid = EMAIL_REGEX.test(candidateEmail);

    refermentDispatch({
      type: refermentAction.setIsValidCandidateEmail,
      payload: isValid,
    });
  }, [candidateEmail]);

  // validate candidateContactNumber on every change
  useEffect(() => {
    const isValid = PHONE_NUMBER_REGEX.test(candidateContactNumber);

    const contactLength = candidateContactNumber.length;
    if (isCandidateContactNumberFocused) {
      switch (contactLength) {
        case 4: {
          refermentDispatch({
            type: refermentAction.setCandidateContactNumber,
            payload: `${candidateContactNumber}(` as PhoneNumber | string,
          });
          break;
        }
        case 8: {
          refermentDispatch({
            type: refermentAction.setCandidateContactNumber,
            payload: `${candidateContactNumber}) ` as PhoneNumber | string,
          });
          break;
        }
        case 13: {
          refermentDispatch({
            type: refermentAction.setCandidateContactNumber,
            payload: `${candidateContactNumber}-` as PhoneNumber | string,
          });
          break;
        }

        default:
          break;
      }
    }

    refermentDispatch({
      type: refermentAction.setIsValidCandidateContactNumber,
      payload: isValid,
    });
  }, [candidateContactNumber, isCandidateContactNumberFocused]);

  // validate candidateCurrentJobTitle on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(candidateCurrentJobTitle);

    refermentDispatch({
      type: refermentAction.setIsValidCandidateCurrentJobTitle,
      payload: isValid,
    });
  }, [candidateCurrentJobTitle]);

  // validate candidateCurrentCompany on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(candidateCurrentCompany);

    refermentDispatch({
      type: refermentAction.setIsValidCandidateCurrentCompany,
      payload: isValid,
    });
  }, [candidateCurrentCompany]);

  // validate candidateProfileUrl on every change
  useEffect(() => {
    const isValid = URL_REGEX.test(candidateProfileUrl);

    refermentDispatch({
      type: refermentAction.setIsValidCandidateProfileUrl,
      payload: isValid,
    });
  }, [candidateProfileUrl]);

  // validate positionJobDescription on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(positionJobDescription);

    refermentDispatch({
      type: refermentAction.setIsValidPositionJobDescription,
      payload: isValid,
    });
  }, [positionJobDescription]);

  // validate referralReason on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(referralReason);

    refermentDispatch({
      type: refermentAction.setIsValidReferralReason,
      payload: isValid,
    });
  }, [referralReason]);

  // validate additionalInformation on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalInformation);

    refermentDispatch({
      type: refermentAction.setIsValidAdditionalInformation,
      payload: isValid,
    });
  }, [additionalInformation]);

  // used to indicate stepper wrapper state
  useEffect(() => {
    const areRequiredStepsInError =
      !isValidCandidateFullName ||
      !isValidCandidateEmail ||
      !isValidCandidateContactNumber ||
      !isValidCandidateCurrentJobTitle ||
      !isValidCandidateCurrentCompany;

    const isOptionalStepInError =
      candidateProfileUrl !== "" && !isValidCandidateProfileUrl;

    const isStepInError = areRequiredStepsInError || isOptionalStepInError;

    // if any of the steps are in error, add step 1 to the pagesInError set
    refermentDispatch({
      type: refermentAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 0,
      },
    });
  }, [
    isValidCandidateFullName,
    isValidCandidateEmail,
    isValidCandidateContactNumber,
    isValidCandidateCurrentJobTitle,
    isValidCandidateCurrentCompany,
    isValidCandidateProfileUrl,
    candidateProfileUrl,
  ]);

  // used to indicate stepper wrapper state
  useEffect(() => {
    const areRequiredStepsInError = !isValidReferralReason || !privacyConsent;

    const areOptionalStepsInError =
      (positionJobDescription !== "" && !isValidPositionJobDescription) ||
      (additionalInformation !== "" && !isValidAdditionalInformation);

    const isStepInError = areRequiredStepsInError || areOptionalStepsInError;

    // if any of the steps are in error, add step 2 to the pagesInError set
    refermentDispatch({
      type: refermentAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [
    isValidPositionJobDescription,
    isValidReferralReason,
    isValidAdditionalInformation,
    positionJobDescription,
    additionalInformation,
    privacyConsent,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [candidateFullNameInputErrorText, candidateFullNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "candidate full name",
      inputText: candidateFullName,
      isInputTextFocused: isCandidateFullNameFocused,
      isValidInputText: isValidCandidateFullName,
      regexValidationText: returnGrammarValidationText({
        content: candidateFullName,
        contentKind: "candidate full name",
        minLength: 2,
        maxLength: 100,
      }),
    });

  const [candidateEmailInputErrorText, candidateEmailInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "candidate email",
      inputText: candidateEmail,
      isInputTextFocused: isCandidateEmailFocused,
      isValidInputText: isValidCandidateEmail,
      regexValidationText: returnEmailValidationText({
        content: candidateEmail,
        contentKind: "candidate email",
      }),
    });

  const [candidateContactNumberInputErrorText, candidateContactNumberInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "candidate contact number",
      inputText: candidateContactNumber,
      isInputTextFocused: isCandidateContactNumberFocused,
      isValidInputText: isValidCandidateContactNumber,
      regexValidationText: returnPhoneNumberValidationText({
        content: candidateContactNumber,
        contentKind: "candidate contact number",
      }),
    });

  const [candidateCurrentJobTitleInputErrorText, candidateCurrentJobTitleInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "candidate current job title",
      inputText: candidateCurrentJobTitle,
      isInputTextFocused: isCandidateCurrentJobTitleFocused,
      isValidInputText: isValidCandidateCurrentJobTitle,
      regexValidationText: returnGrammarValidationText({
        content: candidateCurrentJobTitle,
        contentKind: "candidate current job title",
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [candidateCurrentCompanyInputErrorText, candidateCurrentCompanyInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "candidate current company",
      inputText: candidateCurrentCompany,
      isInputTextFocused: isCandidateCurrentCompanyFocused,
      isValidInputText: isValidCandidateCurrentCompany,
      regexValidationText: returnGrammarValidationText({
        content: candidateCurrentCompany,
        contentKind: "candidate current company",
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [candidateProfileUrlInputErrorText, candidateProfileUrlInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "candidate profile url",
      inputText: candidateProfileUrl,
      isInputTextFocused: isCandidateProfileUrlFocused,
      isValidInputText: isValidCandidateProfileUrl,
      regexValidationText: returnUrlValidationText({
        content: candidateProfileUrl,
        contentKind: "candidate profile url",
      }),
    });

  const [positionJobDescriptionInputErrorText, positionJobDescriptionInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "position job description",
      inputText: positionJobDescription,
      isInputTextFocused: isPositionJobDescriptionFocused,
      isValidInputText: isValidPositionJobDescription,
      regexValidationText: returnGrammarValidationText({
        content: positionJobDescription,
        contentKind: "position job description",
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [referralReasonInputErrorText, referralReasonInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "referral reason",
      inputText: referralReason,
      isInputTextFocused: isReferralReasonFocused,
      isValidInputText: isValidReferralReason,
      regexValidationText: returnGrammarValidationText({
        content: referralReason,
        contentKind: "referral reason",
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [additionalInformationInputErrorText, additionalInformationInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "additional information",
      inputText: additionalInformation,
      isInputTextFocused: isAdditionalInformationFocused,
      isValidInputText: isValidAdditionalInformation,
      regexValidationText: returnGrammarValidationText({
        content: additionalInformation,
        contentKind: "additional information",
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [acknowledgementInputSelectedText, acknowledgementInputDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: privacyConsent,
      semanticName: "privacy consent",
      selectedDescription:
        "I acknowledge that the candidate has given consent for me to share their personal information with MacAuley Tech Repair Ltd. for the purpose of this referral.",
      deselectedDescription:
        "I have not received consent from the candidate to share their personal information with MacAuley Tech Repair Ltd. for the purpose of this referral.",
    });

  const candidateNameTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: candidateFullNameInputErrorText,
      valid: candidateFullNameInputValidText,
    },
    inputText: candidateFullName,
    isValidInputText: isValidCandidateFullName,
    label: "Candidate Name",
    onBlur: () => {
      refermentDispatch({
        type: refermentAction.setIsCandidateFullNameFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      refermentDispatch({
        type: refermentAction.setCandidateFullName,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      refermentDispatch({
        type: refermentAction.setIsCandidateFullNameFocused,
        payload: true,
      });
    },
    placeholder: "Enter full name",
    semanticName: "candidate full name",
    minLength: 2,
    maxLength: 100,
    required: true,
    withAsterisk: true,
  };

  const candidateEmailTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: candidateEmailInputErrorText,
      valid: candidateEmailInputValidText,
    },
    inputText: candidateEmail,
    isValidInputText: isValidCandidateEmail,
    label: "Candidate Email",
    onBlur: () => {
      refermentDispatch({
        type: refermentAction.setIsCandidateEmailFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      refermentDispatch({
        type: refermentAction.setCandidateEmail,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      refermentDispatch({
        type: refermentAction.setIsCandidateEmailFocused,
        payload: true,
      });
    },
    placeholder: "Enter email",
    semanticName: "candidate email",
    required: true,
    withAsterisk: true,
  };

  const candidateContactNumberPhoneInputCreatorInfo: AccessiblePhoneNumberTextInputCreatorInfo =
    {
      description: {
        error: candidateContactNumberInputErrorText,
        valid: candidateContactNumberInputValidText,
      },
      inputText: candidateContactNumber,
      isValidInputText: isValidCandidateContactNumber,
      label: "Candidate Contact Number",
      onBlur: () => {
        refermentDispatch({
          type: refermentAction.setIsCandidateContactNumberFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        refermentDispatch({
          type: refermentAction.setCandidateContactNumber,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        refermentDispatch({
          type: refermentAction.setIsCandidateContactNumberFocused,
          payload: true,
        });
      },
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace") {
          if (
            candidateContactNumber.length === 14 ||
            candidateContactNumber.length === 9
          ) {
            refermentDispatch({
              type: refermentAction.setCandidateContactNumber,
              payload: candidateContactNumber.slice(0, -1) as PhoneNumber | string,
            });
          }
        }
      },
      placeholder: "Enter contact number",
      semanticName: "candidate contact number",
      required: true,
      withAsterisk: true,
    };

  const candidateProfileUrlTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: candidateProfileUrlInputErrorText,
      valid: candidateProfileUrlInputValidText,
    },
    inputText: candidateProfileUrl,
    isValidInputText: isValidCandidateProfileUrl,
    label: "Candidate Profile URL",
    onBlur: () => {
      refermentDispatch({
        type: refermentAction.setIsCandidateProfileUrlFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      refermentDispatch({
        type: refermentAction.setCandidateProfileUrl,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      refermentDispatch({
        type: refermentAction.setIsCandidateProfileUrlFocused,
        payload: true,
      });
    },
    placeholder: "Enter profile URL",
    semanticName: "candidate profile URL",
  };

  const candidateCurrentJobTitleTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: candidateCurrentJobTitleInputErrorText,
      valid: candidateCurrentJobTitleInputValidText,
    },
    inputText: candidateCurrentJobTitle,
    isValidInputText: isValidCandidateCurrentJobTitle,
    label: "Candidate Current Job Title",
    onBlur: () => {
      refermentDispatch({
        type: refermentAction.setIsCandidateCurrentJobTitleFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      refermentDispatch({
        type: refermentAction.setCandidateCurrentJobTitle,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      refermentDispatch({
        type: refermentAction.setIsCandidateCurrentJobTitleFocused,
        payload: true,
      });
    },
    placeholder: "Enter current job title",
    semanticName: "candidate current job title",
    required: true,
    withAsterisk: true,
  };

  const candidateCurrentCompanyTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: candidateCurrentCompanyInputErrorText,
      valid: candidateCurrentCompanyInputValidText,
    },
    inputText: candidateCurrentCompany,
    isValidInputText: isValidCandidateCurrentCompany,
    label: "Candidate Current Company",
    onBlur: () => {
      refermentDispatch({
        type: refermentAction.setIsCandidateCurrentCompanyFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      refermentDispatch({
        type: refermentAction.setCandidateCurrentCompany,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      refermentDispatch({
        type: refermentAction.setIsCandidateCurrentCompanyFocused,
        payload: true,
      });
    },
    placeholder: "Enter current company",
    semanticName: "candidate current company",
    required: true,
    withAsterisk: true,
  };

  const departmentReferredForSelectCreatorInfo: AccessibleSelectInputCreatorInfo = {
    description: "Department referred for",
    label: "Department",
    data: DEPARTMENT_DATA,
    value: departmentReferredFor,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      refermentDispatch({
        type: refermentAction.setDepartmentReferredFor,
        payload: event.currentTarget.value as Department,
      });
    },
    required: true,
    withAsterisk: true,
  };

  const positionReferredForSelectCreatorInfo: AccessibleSelectInputCreatorInfo = {
    description: "Position referred for",
    label: "Job Position",
    data: DEPARTMENT_JOB_POSITION_MAP.get(departmentReferredFor) ?? [],
    value: positionReferredFor,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      refermentDispatch({
        type: refermentAction.setPositionReferredFor,
        payload: event.currentTarget.value as JobPosition,
      });
    },
    required: true,
    withAsterisk: true,
  };

  const positionJobDescriptionTextareaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: positionJobDescriptionInputErrorText,
        valid: positionJobDescriptionInputValidText,
      },
      inputText: positionJobDescription,
      isValidInputText: isValidPositionJobDescription,
      label: "Job Description",
      onBlur: () => {
        refermentDispatch({
          type: refermentAction.setIsPositionJobDescriptionFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        refermentDispatch({
          type: refermentAction.setPositionJobDescription,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        refermentDispatch({
          type: refermentAction.setIsPositionJobDescriptionFocused,
          payload: true,
        });
      },
      placeholder: "Enter job description",
      semanticName: "job description",
    };

  const referralReasonTextareaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: referralReasonInputErrorText,
      valid: referralReasonInputValidText,
    },
    inputText: referralReason,
    isValidInputText: isValidReferralReason,
    label: "Referral Reason",
    onBlur: () => {
      refermentDispatch({
        type: refermentAction.setIsReferralReasonFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      refermentDispatch({
        type: refermentAction.setReferralReason,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      refermentDispatch({
        type: refermentAction.setIsReferralReasonFocused,
        payload: true,
      });
    },
    placeholder: "Enter referral reason",
    semanticName: "referral reason",
    required: true,
    withAsterisk: true,
  };

  const additionalInformationTextareaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: additionalInformationInputErrorText,
        valid: additionalInformationInputValidText,
      },
      inputText: additionalInformation,
      isValidInputText: isValidAdditionalInformation,
      label: "Additional Information",
      onBlur: () => {
        refermentDispatch({
          type: refermentAction.setIsAdditionalInformationFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        refermentDispatch({
          type: refermentAction.setAdditionalInformation,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        refermentDispatch({
          type: refermentAction.setIsAdditionalInformationFocused,
          payload: true,
        });
      },
      placeholder: "Enter additional information",
      semanticName: "additional information",
    };

  const privacyConsentCheckboxInputCreatorInfo: AccessibleCheckboxSingleInputCreatorInfo =
    {
      description: {
        selected: acknowledgementInputSelectedText,
        deselected: acknowledgementInputDeselectedText,
      },
      checked: privacyConsent,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        refermentDispatch({
          type: refermentAction.setPrivacyConsent,
          payload: event.currentTarget.checked,
        });
      },
      semanticName: "privacy consent",
      label: "Privacy consent",
      required: true,
    };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "create referment form submit button",
    semanticName: "submit button",
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      refermentDispatch({
        type: refermentAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: pagesInError.size > 0 || triggerFormSubmit,
  };

  const [
    createdCandidateNameTextInput,
    createdCandidateEmailTextInput,
    createdCandidateProfileUrlTextInput,
    createdCandidateCurrentJobTitleTextInput,
    createdCandidateCurrentCompanyTextInput,
  ] = returnAccessibleTextInputElements([
    candidateNameTextInputCreatorInfo,
    candidateEmailTextInputCreatorInfo,
    candidateProfileUrlTextInputCreatorInfo,
    candidateCurrentJobTitleTextInputCreatorInfo,
    candidateCurrentCompanyTextInputCreatorInfo,
  ]);

  const [createdCandidateContactNumberPhoneInput] =
    returnAccessiblePhoneNumberTextInputElements([
      candidateContactNumberPhoneInputCreatorInfo,
    ]);

  const [
    createdPositionJobDescriptionTextareaInput,
    createdReferralReasonTextareaInput,
    createdAdditionalInformationTextareaInput,
  ] = returnAccessibleTextAreaInputElements([
    positionJobDescriptionTextareaInputCreatorInfo,
    referralReasonTextareaInputCreatorInfo,
    additionalInformationTextareaInputCreatorInfo,
  ]);

  const [createdPrivacyConsentCheckboxInput] =
    returnAccessibleCheckboxSingleInputElements([privacyConsentCheckboxInputCreatorInfo]);

  const [createdDepartmentReferredForSelectInput, createdPositionReferredForSelectInput] =
    returnAccessibleSelectInputElements([
      departmentReferredForSelectCreatorInfo,
      positionReferredForSelectCreatorInfo,
    ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([submitButtonCreatorInfo]);
  const displaySubmitButton =
    currentStepperPosition === CREATE_REFERMENT_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          pagesInError.size > 0
            ? "Please fix errors before submitting"
            : "Submit Referment form"
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const displayCandidateDetailsFormPage = (
    <FormLayoutWrapper>
      {createdCandidateNameTextInput}
      {createdCandidateEmailTextInput}
      {createdCandidateContactNumberPhoneInput}
      {createdCandidateProfileUrlTextInput}
      {createdCandidateCurrentJobTitleTextInput}
      {createdCandidateCurrentCompanyTextInput}
    </FormLayoutWrapper>
  );

  const displayPositionDetailsFormPage = (
    <FormLayoutWrapper>
      {createdDepartmentReferredForSelectInput}
      {createdPositionReferredForSelectInput}
      {createdPositionJobDescriptionTextareaInput}
      {createdReferralReasonTextareaInput}
      {createdAdditionalInformationTextareaInput}
      {createdPrivacyConsentCheckboxInput}
    </FormLayoutWrapper>
  );

  const REFERMENT_REVIEW_OBJECT: FormReviewObjectArray = {
    "Candidate Details": [
      {
        inputName: "Candidate Name",
        inputValue: candidateFullName,
        isInputValueValid: isValidCandidateFullName,
      },
      {
        inputName: "Candidate Email",
        inputValue: candidateEmail,
        isInputValueValid: isValidCandidateEmail,
      },
      {
        inputName: "Candidate Contact Number",
        inputValue: candidateContactNumber,
        isInputValueValid: isValidCandidateContactNumber,
      },
      {
        inputName: "Candidate Profile URL",
        inputValue: candidateProfileUrl,
        isInputValueValid: isValidCandidateProfileUrl,
      },
      {
        inputName: "Candidate Current Job Title",
        inputValue: candidateCurrentJobTitle,
        isInputValueValid: isValidCandidateCurrentJobTitle,
      },
      {
        inputName: "Candidate Current Company",
        inputValue: candidateCurrentCompany,
        isInputValueValid: isValidCandidateCurrentCompany,
      },
    ],
    "Position Details": [
      {
        inputName: "Department",
        inputValue: departmentReferredFor,
        isInputValueValid: true,
      },
      {
        inputName: "Job Position",
        inputValue: positionReferredFor,
        isInputValueValid: true,
      },
      {
        inputName: "Job Description",
        inputValue: positionJobDescription,
        isInputValueValid: isValidPositionJobDescription,
      },
      {
        inputName: "Referral Reason",
        inputValue: referralReason,
        isInputValueValid: isValidReferralReason,
      },
      {
        inputName: "Additional Information",
        inputValue: additionalInformation,
        isInputValueValid: isValidAdditionalInformation,
      },
      {
        inputName: "Privacy Consent",
        inputValue: privacyConsent ? "Yes" : "No",
        isInputValueValid: privacyConsent,
      },
    ],
  };

  const displayReviewFormPage = (
    <FormReviewPage formReviewObject={REFERMENT_REVIEW_OBJECT} formName="Referment" />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/general/referment/display");
        },
      ]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={<Title order={4}>{isSuccessful ? "Success!" : "Submitting ..."}</Title>}
    />
  );

  const displayRefermentForm =
    currentStepperPosition === 0
      ? displayCandidateDetailsFormPage
      : currentStepperPosition === 1
      ? displayPositionDetailsFormPage
      : currentStepperPosition === 2
      ? displayReviewFormPage
      : displaySubmitButton;

  const displayRefermentComponent = (
    <StepperWrapper
      childrenTitle="Referment"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_REFERMENT_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_REFERMENT_MAX_STEPPER_POSITION}
      parentComponentDispatch={refermentDispatch}
      setCurrentStepperPosition={refermentAction.setCurrentStepperPosition}
      pagesInError={pagesInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayRefermentForm}
    </StepperWrapper>
  );

  return displayRefermentComponent;

 */
