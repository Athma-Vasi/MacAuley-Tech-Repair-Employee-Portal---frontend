import { Container, Stack, Text, Title } from "@mantine/core";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { CURRENCY_DATA } from "../../../constants/data";
import { useAuth } from "../../../hooks";
import type { Currency, StepperPage } from "../../../types";
import {
  fetchRequestPOSTSafe,
  logState,
  removeUndefinedAndNull,
} from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleDateTimeInput } from "../../accessibleInputs/AccessibleDateTimeInput";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleStepper } from "../../accessibleInputs/AccessibleStepper";
import { AccessibleSwitchInput } from "../../accessibleInputs/AccessibleSwitchInput";
import { AccessibleTextAreaInput } from "../../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleImageInput } from "../../accessibleInputs/image";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import { NotificationModal } from "../../notificationModal";
import {
  EXPENSE_CLAIM_KIND_DATA,
  EXPENSE_CLAIM_ROLE_PATHS,
  returnExpenseClaimStepperPages,
} from "../constants";
import { type ExpenseClaimAction, expenseClaimAction } from "./actions";
import { expenseClaimReducer } from "./reducers";
import { initialExpenseClaimState } from "./state";
import type { ExpenseClaimKind, ExpenseClaimSchema } from "./types";

function ExpenseClaim() {
  const [expenseClaimState, expenseClaimDispatch] = useReducer(
    expenseClaimReducer,
    initialExpenseClaimState,
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
  } = expenseClaimState;

  const {
    authState: {
      accessToken,
      decodedToken: { userInfo: { userId, username, roles }, sessionId },
    },
  } = useAuth();

  const [
    openedSubmitFormModal,
    {
      open: openSubmitFormModal,
      close: closeSubmitFormModal,
    },
  ] = useDisclosure(false);

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const fetchAbortControllerRef = useRef<AbortController | null>(null);
  const isComponentMountedRef = useRef(false);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    const isComponentMounted = isComponentMountedRef.current;

    async function handleExpenseClaimFormSubmit() {
      const fileUploadsResult = await Promise.all(
        formData.map(async (formDataItem) => {
          const filesUploadResult = await fetchRequestPOSTSafe({
            closeSubmitFormModal,
            dispatch: expenseClaimDispatch,
            fetchAbortController,
            isComponentMounted,
            isSubmittingAction: expenseClaimAction.setIsSubmitting,
            isSuccessfulAction: expenseClaimAction.setIsSuccessful,
            openSubmitFormModal,
            requestBody: formDataItem,
            roleResourceRoutePaths: EXPENSE_CLAIM_ROLE_PATHS,
            roles,
            triggerFormSubmitAction: expenseClaimAction.setTriggerFormSubmit,
            accessToken,
            // TODO: change to actual url
            customUrl: "http://localhost:3000/api/v1/file-upload",
          });

          return filesUploadResult;
        }),
      );

      if (fileUploadsResult.some((result) => result.err)) {
        showBoundary(new Error("File uploads failed. Please try again."));
        return;
      }

      const fileUploadsServerResponse = fileUploadsResult.map((result) =>
        result.ok ? result.safeUnwrap().data : void 0
      );

      if (fileUploadsServerResponse.some((result) => result === undefined)) {
        showBoundary(new Error("File uploads failed. Please try again."));
        return;
      }

      const uploadedFilesIdsMaybe = fileUploadsServerResponse.map(
        (result) => result?.data[0]?._id,
      );

      if (uploadedFilesIdsMaybe.some((id) => id === undefined)) {
        showBoundary(new Error("File uploads failed. Please try again."));
        return;
      }

      const uploadedFilesIds = uploadedFilesIdsMaybe.map((idMaybe) =>
        removeUndefinedAndNull(idMaybe)
      ) as unknown as string[];

      const expenseClaimSchema: ExpenseClaimSchema = {
        acknowledgement,
        additionalComments,
        expenseClaimAmount: Number.parseInt(expenseClaimAmount),
        expenseClaimCurrency,
        expenseClaimDate,
        expenseClaimDescription,
        expenseClaimKind,
        requestStatus: "pending",
        uploadedFilesIds,
        userId,
        username,
      };

      await fetchRequestPOSTSafe({
        accessToken,
        closeSubmitFormModal,
        dispatch: expenseClaimDispatch,
        fetchAbortController,
        isComponentMounted,
        isSubmittingAction: expenseClaimAction.setIsSubmitting,
        isSuccessfulAction: expenseClaimAction.setIsSuccessful,
        openSubmitFormModal,
        roleResourceRoutePaths: EXPENSE_CLAIM_ROLE_PATHS,
        roles,
        schema: expenseClaimSchema,
        triggerFormSubmitAction: expenseClaimAction.setTriggerFormSubmit,
      });
    }

    if (triggerFormSubmit) {
    }

    return () => {
      isComponentMountedRef.current = false;
      fetchAbortController?.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  useEffect(() => {
    logState({
      state: expenseClaimState,
      groupLabel: "Create ExpenseClaim State",
    });
  }, [expenseClaimState]);

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

  const EXPENSE_CLAIM_STEPPER_PAGES: StepperPage[] =
    returnExpenseClaimStepperPages();

  const expenseClaimKindSelectInput = (
    <AccessibleSelectInput<
      ExpenseClaimAction["setExpenseClaimKind"],
      ExpenseClaimKind
    >
      attributes={{
        data: EXPENSE_CLAIM_KIND_DATA,
        name: "expenseClaimKind",
        parentDispatch: expenseClaimDispatch,
        validValueAction: expenseClaimAction.setExpenseClaimKind,
        value: expenseClaimKind,
      }}
    />
  );

  const expenseClaimCurrencySelectInput = (
    <AccessibleSelectInput<
      ExpenseClaimAction["setExpenseClaimCurrency"],
      Currency
    >
      attributes={{
        data: CURRENCY_DATA,
        name: "expenseClaimCurrency",
        parentDispatch: expenseClaimDispatch,
        validValueAction: expenseClaimAction.setExpenseClaimCurrency,
        value: expenseClaimCurrency,
      }}
    />
  );

  const expenseClaimAmountTextInput = (
    <AccessibleTextInput
      attributes={{
        name: "expenseClaimAmount",
        parentDispatch: expenseClaimDispatch,
        validValueAction: expenseClaimAction.setExpenseClaimAmount,
        value: expenseClaimAmount,
        invalidValueAction: expenseClaimAction.setPageInError,
        stepperPages: EXPENSE_CLAIM_STEPPER_PAGES,
      }}
    />
  );

  const expenseClaimDateTextInput = (
    <AccessibleDateTimeInput
      attributes={{
        dateKind: "date near past",
        inputKind: "date",
        invalidValueAction: expenseClaimAction.setPageInError,
        name: "expenseClaimDate",
        parentDispatch: expenseClaimDispatch,
        stepperPages: EXPENSE_CLAIM_STEPPER_PAGES,
        validValueAction: expenseClaimAction.setExpenseClaimDate,
        value: expenseClaimDate,
      }}
    />
  );

  const expenseClaimDescriptionTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: expenseClaimAction.setPageInError,
        name: "expenseClaimDescription",
        parentDispatch: expenseClaimDispatch,
        stepperPages: EXPENSE_CLAIM_STEPPER_PAGES,
        validValueAction: expenseClaimAction.setExpenseClaimDescription,
        value: expenseClaimDescription,
      }}
    />
  );

  const expenseClaimAdditionalCommentsTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: expenseClaimAction.setPageInError,
        required: false,
        name: "additionalComments",
        parentDispatch: expenseClaimDispatch,
        stepperPages: EXPENSE_CLAIM_STEPPER_PAGES,
        validValueAction: expenseClaimAction.setAdditionalComments,
        value: additionalComments,
      }}
    />
  );

  const acknowledgementSwitchInput = (
    <AccessibleSwitchInput
      attributes={{
        checked: acknowledgement,
        invalidValueAction: expenseClaimAction.setPageInError,
        name: "acknowledgement",
        offLabel: "No",
        onLabel: "Yes",
        parentDispatch: expenseClaimDispatch,
        switchOffDescription: "I do not acknowledge.",
        switchOnDescription: "I acknowledge that the information is correct.",
        validValueAction: expenseClaimAction.setAcknowledgement,
        value: acknowledgement,
      }}
    />
  );

  const firstPageElements = (
    <Stack>
      {expenseClaimKindSelectInput}
      {expenseClaimAmountTextInput}
      {expenseClaimCurrencySelectInput}
      {expenseClaimDateTextInput}
      {expenseClaimDescriptionTextAreaInput}
      {expenseClaimAdditionalCommentsTextAreaInput}
      {acknowledgementSwitchInput}
    </Stack>
  );

  const imageInput = (
    <AccessibleImageInput
      attributes={{
        invalidValueAction: expenseClaimAction.setPageInError,
        page: 1,
        parentDispatch: expenseClaimDispatch,
        storageKey: "expenseClaim",
        validValueAction: expenseClaimAction.setFormData,
      }}
    />
  );

  const submitButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "All inputs are valid. Click to submit form",
        disabledScreenreaderText: "Please fix errors before submitting form",
        disabled: pagesInError.size > 0 || triggerFormSubmit,
        kind: "submit",
        name: "submit",
        onClick: (_event: React.MouseEvent<HTMLButtonElement>) => {
          expenseClaimDispatch({
            action: expenseClaimAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[closeSubmitFormModal]}
      opened={openedSubmitFormModal}
      notificationProps={{
        isLoading: isSubmitting,
        text: "Document upload successful!",
      }}
      title={<Title order={4}>Submitting ...</Title>}
      withCloseButton={false}
    />
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: expenseClaimState,
        invalidValueAction: expenseClaimAction.setPageInError,
        pageElements: [firstPageElements, imageInput],
        parentDispatch: expenseClaimDispatch,
        stepsInError: pagesInError,
        stepperPages: EXPENSE_CLAIM_STEPPER_PAGES,
        submitButton,
      }}
    />
  );

  return (
    <Container w={700}>
      {stepper}
      {displaySubmitSuccessNotificationModal}
    </Container>
  );
}

export default ExpenseClaim;

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
      expenseClaimDispatch({
        type: expenseClaimAction.setIsSubmitting,
        payload: true,
      });
      expenseClaimDispatch({
        type: expenseClaimAction.setSubmitMessage,
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

            expenseClaimDispatch({
              type: expenseClaimAction.setIsSubmitting,
              payload: false,
            });
            expenseClaimDispatch({
              type: expenseClaimAction.setSubmitMessage,
              payload: "",
            });

            expenseClaimDispatch({
              type: expenseClaimAction.setIsSuccessful,
              payload: true,
            });
            expenseClaimDispatch({
              type: expenseClaimAction.setSuccessMessage,
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
          expenseClaimDispatch({
            type: expenseClaimAction.setIsSubmitting,
            payload: true,
          });
          expenseClaimDispatch({
            type: expenseClaimAction.setSubmitMessage,
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

            expenseClaimDispatch({
              type: expenseClaimAction.setIsSuccessful,
              payload: true,
            });
            expenseClaimDispatch({
              type: expenseClaimAction.setSuccessMessage,
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
              expenseClaimDispatch({
                type: expenseClaimAction.setIsSubmitting,
                payload: false,
              });
              expenseClaimDispatch({
                type: expenseClaimAction.setSubmitMessage,
                payload: "",
              });
              expenseClaimDispatch({
                type: expenseClaimAction.setImgFormDataArray,
                payload: [],
              });
              expenseClaimDispatch({
                type: expenseClaimAction.setTriggerFormSubmit,
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
      state: expenseClaimState,
      groupLabel: "create expense claim state",
    });
  }, [expenseClaimState]);

  // validate expenseClaimAmount on every change
  useEffect(() => {
    const isValid = MONEY_REGEX.test(expenseClaimAmount);

    expenseClaimDispatch({
      type: expenseClaimAction.setIsValidExpenseClaimAmount,
      payload: isValid,
    });
  }, [expenseClaimAmount]);

  // validate expenseClaimDate on every change
  useEffect(() => {
    const isValid =
      DATE_NEAR_PAST_REGEX.test(expenseClaimDate) &&
      new Date(expenseClaimDate) <= new Date();

    expenseClaimDispatch({
      type: expenseClaimAction.setIsValidExpenseClaimDate,
      payload: isValid,
    });
  }, [expenseClaimDate]);

  // validate expenseClaimDescription on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(expenseClaimDescription);

    expenseClaimDispatch({
      type: expenseClaimAction.setIsValidExpenseClaimDescription,
      payload: isValid,
    });
  }, [expenseClaimDescription]);

  // validate additionalComments on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalComments);

    expenseClaimDispatch({
      type: expenseClaimAction.setIsValidAdditionalComments,
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

    expenseClaimDispatch({
      type: expenseClaimAction.setPageInError,
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

    expenseClaimDispatch({
      type: expenseClaimAction.setPageInError,
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
      expenseClaimDispatch({
        type: expenseClaimAction.setIsExpenseClaimAmountFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      expenseClaimDispatch({
        type: expenseClaimAction.setExpenseClaimAmount,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      expenseClaimDispatch({
        type: expenseClaimAction.setIsExpenseClaimAmountFocused,
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
      expenseClaimDispatch({
        type: expenseClaimAction.setExpenseClaimKind,
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
      expenseClaimDispatch({
        type: expenseClaimAction.setExpenseClaimCurrency,
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
      expenseClaimDispatch({
        type: expenseClaimAction.setIsExpenseClaimDateFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      expenseClaimDispatch({
        type: expenseClaimAction.setExpenseClaimDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      expenseClaimDispatch({
        type: expenseClaimAction.setIsExpenseClaimDateFocused,
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
        expenseClaimDispatch({
          type: expenseClaimAction.setIsExpenseClaimDescriptionFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        expenseClaimDispatch({
          type: expenseClaimAction.setExpenseClaimDescription,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        expenseClaimDispatch({
          type: expenseClaimAction.setIsExpenseClaimDescriptionFocused,
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
      expenseClaimDispatch({
        type: expenseClaimAction.setIsAdditionalCommentsFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      expenseClaimDispatch({
        type: expenseClaimAction.setAdditionalComments,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      expenseClaimDispatch({
        type: expenseClaimAction.setIsAdditionalCommentsFocused,
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
        expenseClaimDispatch({
          type: expenseClaimAction.setAcknowledgement,
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
      expenseClaimDispatch({
        type: expenseClaimAction.setTriggerFormSubmit,
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
        setImgFormDataArray={expenseClaimAction.setImgFormDataArray}
        setImgFormDataArrayDispatch={expenseClaimDispatch}
        setAreImagesValid={expenseClaimAction.setAreImagesValid}
        setAreImagesValidDispatch={expenseClaimDispatch}
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
      parentComponentDispatch={expenseClaimDispatch}
      setCurrentStepperPosition={expenseClaimAction.setCurrentStepperPosition}
      pagesInError={pagesInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayExpenseClaimForm}
    </StepperWrapper>
  );

  return displayExpenseClaimComponent;

 */
