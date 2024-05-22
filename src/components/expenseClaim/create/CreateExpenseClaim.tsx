import { Stack, Text } from "@mantine/core";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { useAuth } from "../../../hooks";
import { useFetchInterceptor } from "../../../hooks/useFetchInterceptor";
import { logState } from "../../../utils";
import { AccessibleImageInput } from "../../accessibleInputs/image";
import { createExpenseClaimAction } from "./actions";
import { createExpenseClaimReducer } from "./reducers";
import { initialCreateExpenseClaimState } from "./state";
import { StepperPage } from "../../../types";
import { returnCreateBenefitStepperPages } from "../../benefit/constants";

function CreateExpenseClaim() {
  const [createExpenseClaimState, createExpenseClaimDispatch] = useReducer(
    createExpenseClaimReducer,
    initialCreateExpenseClaimState
  );

  const {
    acknowledgement,
    additionalComments,
    expenseClaimAmount,
    expenseClaimCurrency,
    expenseClaimDate,
    expenseClaimDescription,
    expenseClaimKind,
    formData,
    isSubmitting,
    isSuccessful,
    pagesInError,
    triggerFormSubmit,
  } = createExpenseClaimState;

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

    // if (triggerFormSubmit) {
    //   formSubmitPOST({
    //     dispatch: createExpenseClaimDispatch,
    //     fetchAbortController,
    //     fetchInterceptor,
    //     isComponentMounted,
    //     isSubmittingAction: createExpenseClaimAction.setIsSubmitting,
    //     isSuccessfulAction: createExpenseClaimAction.setIsSuccessful,
    //     preFetchAbortController,
    //     roleResourceRoutePaths: CREATE_BENEFIT_ROLE_PATHS,
    //     schema: benefitsSchema,
    //     schemaName: "createExpenseClaimSchema",
    //     sessionId,
    //     showBoundary,
    //     userId,
    //     username,
    //     userRole: "manager",
    //   });
    // }

    return () => {
      isComponentMountedRef.current = false;
      preFetchAbortController?.abort();
      fetchAbortController?.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  useEffect(() => {
    logState({
      state: createExpenseClaimState,
      groupLabel: "Create ExpenseClaim State",
    });
  }, [createExpenseClaimState]);

  if (isSubmitting) {
    const submittingState = (
      <Stack>
        <Text size="md">Submitting benefit! Please wait...</Text>
      </Stack>
    );

    return submittingState;
  }

  if (isSuccessful) {
    const successfulState = (
      <Stack>
        <Text size="md">ExpenseClaim submitted successfully!</Text>
      </Stack>
    );

    return successfulState;
  }

  const CREATE_BENEFIT_STEPPER_PAGES: StepperPage[] = returnCreateBenefitStepperPages();

  return (
    <AccessibleImageInput
      formData={formData}
      invalidValueAction={createExpenseClaimAction.setPageInError}
      page={1}
      parentDispatch={createExpenseClaimDispatch}
      stepperPages={CREATE_BENEFIT_STEPPER_PAGES}
      validValueAction={createExpenseClaimAction.setFormData}
    />
  );
}

export default CreateExpenseClaim;

/**
 * const {
    globalState: { themeObject },
    globalDispatch,
  } = useGlobalState();

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

    async function imagesUploadRequest() {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setIsSubmitting,
        payload: true,
      });
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setSubmitMessage,
        payload: "File uploads are being processed...",
      });
      openSubmitSuccessNotificationModal();

      if (files.length === 0) {
        return;
      }

      await Promise.all(
        files.map(async (formData) => {
          const fileUploadUrl: URL = urlBuilder({
            path: "file-upload",
          });

          const imgUpLoadRequestInit: RequestInit = {
            method: "POST",
            headers: {
              Authorization: "",
            },
            body: formData,
          };

          try {
            const imgUploadResponse: Response = await wrappedFetch({
              isMounted,
              requestInit: imgUpLoadRequestInit,
              signal: controller.signal,
              url: fileUploadUrl,
            });

            const imgUploadResponseData: {
              message: string;
              documentId: string;
            } = await imgUploadResponse.json();

            if (!isMounted) {
              return;
            }
            if (!imgUploadResponse.ok) {
              throw new Error(imgUploadResponseData.message);
            }

            createExpenseClaimDispatch({
              type: createExpenseClaimAction.setIsSubmitting,
              payload: false,
            });
            createExpenseClaimDispatch({
              type: createExpenseClaimAction.setSubmitMessage,
              payload: "",
            });

            createExpenseClaimDispatch({
              type: createExpenseClaimAction.setIsSuccessful,
              payload: true,
            });
            createExpenseClaimDispatch({
              type: createExpenseClaimAction.setSuccessMessage,
              payload: imgUploadResponseData.message ?? "File uploads successful.",
            });

            return imgUploadResponseData;
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
          }
        })
      ).then((imgUploadResponseData) => {
        if (!imgUploadResponseData) {
          return;
        }

        async function expenseClaimFormRequest() {
          createExpenseClaimDispatch({
            type: createExpenseClaimAction.setIsSubmitting,
            payload: true,
          });
          createExpenseClaimDispatch({
            type: createExpenseClaimAction.setSubmitMessage,
            payload: `Expense claim: ${expenseClaimKind} is being processed...`,
          });

          const expenseUrl: URL = urlBuilder({
            path: "actions/company/expense-claim",
          });

          const expenseClaimRequestBody = JSON.stringify({
            expenseClaimSchema: {
              uploadedFilesIds: imgUploadResponseData
                .filter((item) => item !== undefined)
                .map((item) => item?.documentId),
              expenseClaimKind,
              expenseClaimCurrency,
              expenseClaimAmount: Number(expenseClaimAmount.replace(",", ".")),
              expenseClaimDate,
              expenseClaimDescription,
              additionalComments,
              acknowledgement,
              requestStatus: "pending",
            },
          });

          const expenseClaimRequestInit: RequestInit = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: expenseClaimRequestBody,
          };

          try {
            const expenseClaimResponse = await wrappedFetch({
              isMounted,
              requestInit: expenseClaimRequestInit,
              signal: controller.signal,
              url: expenseUrl,
            });

            const expenseClaimResponseData: ResourceRequestServerResponse<ExpenseClaimDocument> =
              await expenseClaimResponse.json();

            if (!isMounted) {
              return;
            }
            if (!expenseClaimResponse.ok) {
              throw new Error(expenseClaimResponseData.message);
            }

            createExpenseClaimDispatch({
              type: createExpenseClaimAction.setIsSuccessful,
              payload: true,
            });
            createExpenseClaimDispatch({
              type: createExpenseClaimAction.setSuccessMessage,
              payload: expenseClaimResponseData.message ?? "Expense claim successful.",
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
              createExpenseClaimDispatch({
                type: createExpenseClaimAction.setIsSubmitting,
                payload: false,
              });
              createExpenseClaimDispatch({
                type: createExpenseClaimAction.setSubmitMessage,
                payload: "",
              });
              createExpenseClaimDispatch({
                type: createExpenseClaimAction.setImgFormDataArray,
                payload: [],
              });
              createExpenseClaimDispatch({
                type: createExpenseClaimAction.setTriggerFormSubmit,
                payload: false,
              });
            }
          }
        }

        if (imgUploadResponseData.every((item) => item !== undefined)) {
          expenseClaimFormRequest();
        }
      });
    }

    if (triggerFormSubmit && files.length > 0) {
      imagesUploadRequest();
    }

    return () => {
      controller.abort();
      isMounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  useEffect(() => {
    logState({
      state: createExpenseClaimState,
      groupLabel: "create expense claim state",
    });
  }, [createExpenseClaimState]);

  // validate expenseClaimAmount on every change
  useEffect(() => {
    const isValid = MONEY_REGEX.test(expenseClaimAmount);

    createExpenseClaimDispatch({
      type: createExpenseClaimAction.setIsValidExpenseClaimAmount,
      payload: isValid,
    });
  }, [expenseClaimAmount]);

  // validate expenseClaimDate on every change
  useEffect(() => {
    const isValid =
      DATE_NEAR_PAST_REGEX.test(expenseClaimDate) &&
      new Date(expenseClaimDate) <= new Date();

    createExpenseClaimDispatch({
      type: createExpenseClaimAction.setIsValidExpenseClaimDate,
      payload: isValid,
    });
  }, [expenseClaimDate]);

  // validate expenseClaimDescription on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(expenseClaimDescription);

    createExpenseClaimDispatch({
      type: createExpenseClaimAction.setIsValidExpenseClaimDescription,
      payload: isValid,
    });
  }, [expenseClaimDescription]);

  // validate additionalComments on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalComments);

    createExpenseClaimDispatch({
      type: createExpenseClaimAction.setIsValidAdditionalComments,
      payload: isValid,
    });
  }, [additionalComments]);

  // update stepper wrapper state on every change
  useEffect(() => {
    const areRequiredInputsInError =
      !isValidExpenseClaimAmount ||
      !isValidExpenseClaimDate ||
      !isValidExpenseClaimDescription ||
      !acknowledgement;

    const isOptionalInputInError =
      additionalComments !== "" && !isValidAdditionalComments;

    const isStepInError = areRequiredInputsInError || isOptionalInputInError;

    createExpenseClaimDispatch({
      type: createExpenseClaimAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 0,
      },
    });
  }, [
    isValidExpenseClaimAmount,
    isValidExpenseClaimDate,
    isValidExpenseClaimDescription,
    isValidAdditionalComments,
    acknowledgement,
    additionalComments,
    areImagesValid,
  ]);

  // update stepper wrapper state on every change
  useEffect(() => {
    const isStepInError = !areImagesValid || files.length === 0;

    createExpenseClaimDispatch({
      type: createExpenseClaimAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [areImagesValid, files]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [expenseClaimAmountInputErrorText, expenseClaimAmountInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "expense claim amount",
      inputText: expenseClaimAmount,
      isInputTextFocused: isExpenseClaimAmountFocused,
      isValidInputText: isValidExpenseClaimAmount,
      regexValidationText: returnFloatAmountValidationText({
        content: expenseClaimAmount,
        contentKind: "expense claim amount",
      }),
    });

  const expenseClaimInvalidText =
    new Date(expenseClaimDate) > new Date()
      ? "Expense claim date cannot be in the future."
      : "";
  const [expenseClaimDateInputErrorText, expenseClaimDateInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "expense claim date",
      inputText: expenseClaimDate,
      isInputTextFocused: isExpenseClaimDateFocused,
      isValidInputText: isValidExpenseClaimDate,
      regexValidationText: `${expenseClaimInvalidText}${returnDateNearPastValidationText({
        content: expenseClaimDate,
        contentKind: "expense claim date",
      })}`,
    });

  const [expenseClaimDescriptionInputErrorText, expenseClaimDescriptionInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "expense claim description",
      inputText: expenseClaimDescription,
      isInputTextFocused: isExpenseClaimDescriptionFocused,
      isValidInputText: isValidExpenseClaimDescription,
      regexValidationText: returnGrammarValidationText({
        content: expenseClaimDescription,
        contentKind: "expense claim description",
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [additionalCommentsInputErrorText, additionalCommentsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "additional comments",
      inputText: additionalComments,
      isInputTextFocused: isAdditionalCommentsFocused,
      isValidInputText: isValidAdditionalComments,
      regexValidationText: returnGrammarValidationText({
        content: additionalComments,
        contentKind: "additional comments",
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [acknowledgementInputSelectedText, acknowledgementInputDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: acknowledgement,
      semanticName: "acknowledgement",
      selectedDescription: "I acknowledge that the information is correct",
      deselectedDescription: "I do not acknowledge",
    });

  const {
    generalColors: { grayColorShade },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const expenseClaimAmountTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: expenseClaimAmountInputErrorText,
      valid: expenseClaimAmountInputValidText,
    },
    inputText: expenseClaimAmount,
    isValidInputText: isValidExpenseClaimAmount,
    label: "Expense Claim Amount",
    onBlur: () => {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setIsExpenseClaimAmountFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setExpenseClaimAmount,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setIsExpenseClaimAmountFocused,
        payload: true,
      });
    },
    rightSection: true,
    placeholder: "Enter expense claim amount",
    semanticName: "expense claim amount",
    minLength: 3,
    maxLength: 9,
    required: true,
    withAsterisk: true,
  };

  const expenseClaimKindSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: EXPENSE_CLAIM_KIND_DATA,
    description: "Select a category for your expense claim.",
    label: "Expense Claim Kind",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setExpenseClaimKind,
        payload: event.currentTarget.value as ExpenseClaimKind,
      });
    },
    value: expenseClaimKind,
    required: true,
    withAsterisk: true,
  };

  const expenseClaimCurrencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: CURRENCY_DATA,
    description: "Select the currency for your expense claim.",
    label: "Expense Claim Currency",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setExpenseClaimCurrency,
        payload: event.currentTarget.value as Currency,
      });
    },
    value: expenseClaimCurrency,
    required: true,
    withAsterisk: true,
  };

  const expenseClaimDateTextInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: expenseClaimDateInputErrorText,
      valid: expenseClaimDateInputValidText,
    },
    inputText: expenseClaimDate,
    isValidInputText: isValidExpenseClaimDate,
    label: "Expense Claim Date",
    onBlur: () => {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setIsExpenseClaimDateFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setExpenseClaimDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setIsExpenseClaimDateFocused,
        payload: true,
      });
    },
    placeholder: "Enter expense claim date",
    semanticName: "expense claim date",
    inputKind: "date",
    dateKind: "date near past",
    required: true,
    withAsterisk: true,
  };

  const expenseClaimDescriptionTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: expenseClaimDescriptionInputErrorText,
        valid: expenseClaimDescriptionInputValidText,
      },
      inputText: expenseClaimDescription,
      isValidInputText: isValidExpenseClaimDescription,
      label: "Expense Claim Description",
      onBlur: () => {
        createExpenseClaimDispatch({
          type: createExpenseClaimAction.setIsExpenseClaimDescriptionFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        createExpenseClaimDispatch({
          type: createExpenseClaimAction.setExpenseClaimDescription,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createExpenseClaimDispatch({
          type: createExpenseClaimAction.setIsExpenseClaimDescriptionFocused,
          payload: true,
        });
      },
      placeholder: "Enter expense claim description",
      semanticName: "expense claim description",
      required: true,
      withAsterisk: true,
    };

  const additionalCommentsTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: additionalCommentsInputErrorText,
      valid: additionalCommentsInputValidText,
    },
    inputText: additionalComments,
    isValidInputText: isValidAdditionalComments,
    label: "Additional Comments",
    onBlur: () => {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setIsAdditionalCommentsFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setAdditionalComments,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setIsAdditionalCommentsFocused,
        payload: true,
      });
    },
    placeholder: "Enter additional comments",
    semanticName: "additional comments",
  };

  const acknowledgementCheckboxInputCreatorInfo: AccessibleCheckboxSingleInputCreatorInfo =
    {
      description: {
        selected: acknowledgementInputSelectedText,
        deselected: acknowledgementInputDeselectedText,
      },
      checked: acknowledgement,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createExpenseClaimDispatch({
          type: createExpenseClaimAction.setAcknowledgement,
          payload: event.currentTarget.checked,
        });
      },
      semanticName: "acknowledgement",
      label: "Acknowledgement",
      required: true,
    };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "expense claim form submit button",
    semanticName: "submit button",
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: pagesInError.size > 0 || triggerFormSubmit,
  };

  const [createdExpenseClaimAmountTextInput] = returnAccessibleTextInputElements([
    expenseClaimAmountTextInputCreatorInfo,
  ]);

  const [createdExpenseClaimKindSelectInput, createdExpenseClaimCurrencySelectInput] =
    returnAccessibleSelectInputElements([
      expenseClaimKindSelectInputCreatorInfo,
      expenseClaimCurrencySelectInputCreatorInfo,
    ]);

  const [createdExpenseClaimDateTextInput] = returnAccessibleDateTimeElements([
    expenseClaimDateTextInputCreatorInfo,
  ]);

  const [createdExpenseClaimDescriptionTextInput, createdAdditionalCommentsTextInput] =
    returnAccessibleTextAreaInputElements([
      expenseClaimDescriptionTextInputCreatorInfo,
      additionalCommentsTextInputCreatorInfo,
    ]);

  const [createdAcknowledgementCheckboxInput] =
    returnAccessibleCheckboxSingleInputElements([
      acknowledgementCheckboxInputCreatorInfo,
    ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([submitButtonCreatorInfo]);
  const displaySubmitButton =
    currentStepperPosition === EXPENSE_CLAIM_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          pagesInError.size > 0
            ? "Please fix errors before submitting form."
            : "Submit expense claim form"
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const EXPENSE_CLAIM_REVIEW_OBJECT: FormReviewObjectArray = {
    "Expense Details": [
      {
        inputName: "Expense Claim Kind",
        inputValue: expenseClaimKind,
        isInputValueValid: true,
      },
      {
        inputName: "Expense Claim Currency",
        inputValue: expenseClaimCurrency,
        isInputValueValid: true,
      },
      {
        inputName: "Expense Claim Amount",
        inputValue: expenseClaimAmount,
        isInputValueValid: isValidExpenseClaimAmount,
      },
      {
        inputName: "Expense Claim Date",
        inputValue: expenseClaimDate,
        isInputValueValid: isValidExpenseClaimDate,
      },
      {
        inputName: "Expense Claim Description",
        inputValue: expenseClaimDescription,
        isInputValueValid: isValidExpenseClaimDescription,
      },
      {
        inputName: "Additional Comments",
        inputValue: additionalComments,
        isInputValueValid: isValidExpenseClaimDescription,
      },
    ],
    "Upload Receipts": [
      {
        inputName: "Receipts",
        inputValue: pagesInError.has(1) ? "Error" : "Valid",
        isInputValueValid: !pagesInError.has(1),
      },
    ],
  };

  const displayExpenseClaimReviewPage = (
    <FormReviewPage
      formReviewObject={EXPENSE_CLAIM_REVIEW_OBJECT}
      formName="Expense Claim"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/company/expense-claim/display");
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

  const displayExpenseClaimForm =
    currentStepperPosition === 0 ? (
      <FormLayoutWrapper>
        {createdExpenseClaimKindSelectInput}
        {createdExpenseClaimCurrencySelectInput}
        {createdExpenseClaimAmountTextInput}
        {createdExpenseClaimDateTextInput}
        {createdExpenseClaimDescriptionTextInput}
        {createdAdditionalCommentsTextInput}
        {createdAcknowledgementCheckboxInput}
      </FormLayoutWrapper>
    ) : currentStepperPosition === 1 ? (
      <ImageUpload
        isParentComponentFormSubmitted={triggerFormSubmit}
        parentComponentName="create expense claim form"
        maxImageSize={EXPENSE_CLAIM_MAX_IMG_SIZE}
        maxImages={EXPENSE_CLAIM_MAX_IMG_AMOUNT}
        setImgFormDataArray={createExpenseClaimAction.setImgFormDataArray}
        setImgFormDataArrayDispatch={createExpenseClaimDispatch}
        setAreImagesValid={createExpenseClaimAction.setAreImagesValid}
        setAreImagesValidDispatch={createExpenseClaimDispatch}
      />
    ) : currentStepperPosition === 2 ? (
      displayExpenseClaimReviewPage
    ) : (
      displaySubmitButton
    );

  const displayExpenseClaimComponent = (
    <StepperWrapper
      childrenTitle="Expense Claim"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={EXPENSE_CLAIM_DESCRIPTION_OBJECTS}
      maxStepperPosition={EXPENSE_CLAIM_MAX_STEPPER_POSITION}
      parentComponentDispatch={createExpenseClaimDispatch}
      setCurrentStepperPosition={createExpenseClaimAction.setCurrentStepperPosition}
      pagesInError={pagesInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayExpenseClaimForm}
    </StepperWrapper>
  );

  return displayExpenseClaimComponent;

 */
