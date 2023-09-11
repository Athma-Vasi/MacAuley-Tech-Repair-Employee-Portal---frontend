import {
  faDollarSign,
  faEuro,
  faJpy,
  faPoundSign,
  faYen,
} from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, MouseEvent, useEffect, useReducer } from 'react';
import {
  TbCurrencyDollar,
  TbCurrencyEuro,
  TbCurrencyPound,
  TbCurrencyRenminbi,
  TbCurrencyYen,
  TbUpload,
} from 'react-icons/tb';

import {
  DATE_NEAR_PAST_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
} from '../../../constants/regex';
import { useAuth, useGlobalState } from '../../../hooks';
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
import type { Currency, ResourceRequestServerResponse } from '../../../types';
import {
  logState,
  returnDateNearPastValidationText,
  returnGrammarValidationText,
  returnNumberAmountValidationText,
  urlBuilder,
} from '../../../utils';
import { CURRENCY_DATA } from '../../benefits/constants';
import { ImageUpload } from '../../imageUpload';
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
import {
  EXPENSE_CLAIM_DESCRIPTION_OBJECTS,
  EXPENSE_CLAIM_KIND_DATA,
  EXPENSE_CLAIM_MAX_IMG_AMOUNT,
  EXPENSE_CLAIM_MAX_IMG_SIZE,
  EXPENSE_CLAIM_MAX_STEPPER_POSITION,
} from '../constants';
import {
  createExpenseClaimAction,
  createExpenseClaimReducer,
  initialCreateExpenseClaimState,
} from './state';
import type { ExpenseClaimDocument, ExpenseClaimKind } from './types';
import { Group, Tooltip, useMantineTheme } from '@mantine/core';
import FormReviewPage, {
  FormReviewObject,
} from '../../formReviewPage/FormReviewPage';

function CreateExpenseClaim() {
  const [createExpenseClaimState, createExpenseClaimDispatch] = useReducer(
    createExpenseClaimReducer,
    initialCreateExpenseClaimState
  );
  const {
    expenseClaimAmount,
    isValidExpenseClaimAmount,
    isExpenseClaimAmountFocused,

    expenseClaimKind,
    expenseClaimCurrency,

    expenseClaimDate,
    isValidExpenseClaimDate,
    isExpenseClaimDateFocused,

    expenseClaimDescription,
    isValidExpenseClaimDescription,
    isExpenseClaimDescriptionFocused,

    additionalComments,
    isValidAdditionalComments,
    isAdditionalCommentsFocused,
    acknowledgement,

    imgFormDataArray,
    areImagesValid,
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
  } = createExpenseClaimState;

  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
    },
  } = useGlobalState();

  const {
    authState: { accessToken },
  } = useAuth();

  const { colors } = useMantineTheme();

  // validate expenseClaimAmount on every change
  useEffect(() => {
    const isValid = MONEY_REGEX.test(expenseClaimAmount);

    createExpenseClaimDispatch({
      type: createExpenseClaimAction.setIsValidExpenseClaimAmount,
      payload: isValid,
    });
  }, [expenseClaimAmount]);

  // insert comma if currency is EUR
  useEffect(() => {
    // if currency is EUR, replace decimal with comma and remove leading zeros
    if (expenseClaimCurrency === 'EUR') {
      const expenseClaimAmountWithCommaAndNoLeadingZero = expenseClaimAmount
        .replace('.', ',')
        .replace(/^0+/, '');

      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setExpenseClaimAmount,
        payload: expenseClaimAmountWithCommaAndNoLeadingZero,
      });
    }
    // if currency is not EUR, replace comma with decimal and remove leading zeros
    else {
      const expenseClaimAmountWithDecimalAndNoLeadingZero = expenseClaimAmount
        .replace(',', '.')
        .replace(/^0+/, '');

      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setExpenseClaimAmount,
        payload: expenseClaimAmountWithDecimalAndNoLeadingZero,
      });
    }
  }, [expenseClaimCurrency, expenseClaimAmount]);

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
      additionalComments !== '' && !isValidAdditionalComments;

    const isStepInError = areRequiredInputsInError || isOptionalInputInError;

    createExpenseClaimDispatch({
      type: createExpenseClaimAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
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
    const isStepInError = !areImagesValid;

    createExpenseClaimDispatch({
      type: createExpenseClaimAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [areImagesValid]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [expenseClaimAmountInputErrorText, expenseClaimAmountInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'expense claim amount',
      inputText: expenseClaimAmount,
      isInputTextFocused: isExpenseClaimAmountFocused,
      isValidInputText: isValidExpenseClaimAmount,
      regexValidationText: returnNumberAmountValidationText({
        kind: 'expense claim amount',
        amount: expenseClaimAmount,
      }),
    });

  const expenseClaimInvalidText =
    new Date(expenseClaimDate) > new Date()
      ? 'Expense claim date cannot be in the future.'
      : '';
  const [expenseClaimDateInputErrorText, expenseClaimDateInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'expense claim date',
      inputText: expenseClaimDate,
      isInputTextFocused: isExpenseClaimDateFocused,
      isValidInputText: isValidExpenseClaimDate,
      regexValidationText: `${expenseClaimInvalidText}${returnDateNearPastValidationText(
        expenseClaimDate
      )}`,
    });

  const [
    expenseClaimDescriptionInputErrorText,
    expenseClaimDescriptionInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'expense claim description',
    inputText: expenseClaimDescription,
    isInputTextFocused: isExpenseClaimDescriptionFocused,
    isValidInputText: isValidExpenseClaimDescription,
    regexValidationText: returnGrammarValidationText({
      content: expenseClaimDescription,
      contentKind: 'expense claim description',
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
      isSelected: acknowledgement,
      semanticName: 'acknowledgement',
      selectedDescription: 'I acknowledge that the information is correct',
      deselectedDescription: 'I do not acknowledge',
    });

  const colorShade =
    colorScheme === 'light' ? primaryShade.light : primaryShade.dark;
  const currencyIcon =
    expenseClaimCurrency === 'CNY' ? (
      <TbCurrencyRenminbi size={14} color={colors.gray[colorShade]} />
    ) : expenseClaimCurrency === 'GBP' ? (
      <TbCurrencyPound size={14} color={colors.gray[colorShade]} />
    ) : expenseClaimCurrency === 'EUR' ? (
      <TbCurrencyEuro size={14} color={colors.gray[colorShade]} />
    ) : expenseClaimCurrency === 'JPY' ? (
      <TbCurrencyYen size={14} color={colors.gray[colorShade]} />
    ) : (
      <TbCurrencyDollar size={14} color={colors.gray[colorShade]} />
    );

  const expenseClaimAmountTextInputCreatorInfo: AccessibleTextInputCreatorInfo =
    {
      description: {
        error: expenseClaimAmountInputErrorText,
        valid: expenseClaimAmountInputValidText,
      },
      inputText: expenseClaimAmount,
      isValidInputText: isValidExpenseClaimAmount,
      label: 'Expense Claim Amount',
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
      rightSectionIcon: currencyIcon,
      placeholder: 'Enter expense claim amount',
      semanticName: 'expense claim amount',
      minLength: 3,
      maxLength: 9,
      required: true,
      withAsterisk: true,
    };

  const expenseClaimKindSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: EXPENSE_CLAIM_KIND_DATA,
      description: 'Select a category for your expense claim.',
      label: 'Expense Claim Kind',
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

  const expenseClaimCurrencySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: CURRENCY_DATA,
      description: 'Select the currency for your expense claim.',
      label: 'Expense Claim Currency',
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

  const expenseClaimDateTextInputCreatorInfo: AccessibleDateTimeInputCreatorInfo =
    {
      description: {
        error: expenseClaimDateInputErrorText,
        valid: expenseClaimDateInputValidText,
      },
      inputText: expenseClaimDate,
      isValidInputText: isValidExpenseClaimDate,
      label: 'Expense Claim Date',
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
      placeholder: 'Enter expense claim date',
      semanticName: 'expense claim date',
      inputKind: 'date',
      dateKind: 'date near past',
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
      label: 'Expense Claim Description',
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
      placeholder: 'Enter expense claim description',
      semanticName: 'expense claim description',
      required: true,
      withAsterisk: true,
    };

  const additionalCommentsTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
    {
      description: {
        error: additionalCommentsInputErrorText,
        valid: additionalCommentsInputValidText,
      },
      inputText: additionalComments,
      isValidInputText: isValidAdditionalComments,
      label: 'Additional Comments',
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
      placeholder: 'Enter additional comments',
      semanticName: 'additional comments',
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
      semanticName: 'acknowledgement',
      label: 'Acknowledgement',
      required: true,
    };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'expense claim form submit button',
    semanticName: 'submit button',
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const [createdExpenseClaimAmountTextInput] =
    returnAccessibleTextInputElements([expenseClaimAmountTextInputCreatorInfo]);

  const [
    createdExpenseClaimKindSelectInput,
    createdExpenseClaimCurrencySelectInput,
  ] = returnAccessibleSelectInputElements([
    expenseClaimKindSelectInputCreatorInfo,
    expenseClaimCurrencySelectInputCreatorInfo,
  ]);

  const [createdExpenseClaimDateTextInput] = returnAccessibleDateTimeElements([
    expenseClaimDateTextInputCreatorInfo,
  ]);

  const [
    createdExpenseClaimDescriptionTextInput,
    createdAdditionalCommentsTextInput,
  ] = returnAccessibleTextAreaInputElements([
    expenseClaimDescriptionTextInputCreatorInfo,
    additionalCommentsTextInputCreatorInfo,
  ]);

  const [createdAcknowledgementCheckboxInput] =
    returnAccessibleCheckboxSingleInputElements([
      acknowledgementCheckboxInputCreatorInfo,
    ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);
  const displaySubmitButton =
    currentStepperPosition === EXPENSE_CLAIM_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? 'Please fix errors before submitting form.'
            : 'Submit expense claim form'
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const EXPENSE_CLAIM_REVIEW_OBJECT: FormReviewObject = {
    'Expense Details': [
      {
        inputName: 'Expense Claim Kind',
        inputValue: expenseClaimKind,
        isInputValueValid: true,
      },
      {
        inputName: 'Expense Claim Currency',
        inputValue: expenseClaimCurrency,
        isInputValueValid: true,
      },
      {
        inputName: 'Expense Claim Amount',
        inputValue: expenseClaimAmount,
        isInputValueValid: true,
      },
      {
        inputName: 'Expense Claim Date',
        inputValue: expenseClaimDate,
        isInputValueValid: true,
      },
      {
        inputName: 'Expense Claim Description',
        inputValue: expenseClaimDescription,
        isInputValueValid: true,
      },
      {
        inputName: 'Additional Comments',
        inputValue: additionalComments,
        isInputValueValid: true,
      },
    ],
    'Upload Receipts': [
      {
        inputName: 'Receipts',
        inputValue: stepsInError.has(1) ? 'Error' : 'Valid',
        isInputValueValid: !stepsInError.has(1),
      },
    ],
  };

  const displayExpenseClaimReviewPage = (
    <FormReviewPage
      formReviewObject={EXPENSE_CLAIM_REVIEW_OBJECT}
      formName="Expense Claim"
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
      setCurrentStepperPosition={
        createExpenseClaimAction.setCurrentStepperPosition
      }
      stepsInError={stepsInError}
    >
      {displayExpenseClaimForm}
    </StepperWrapper>
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function imagesUploadRequest() {
      const urlString: URL = urlBuilder({
        path: '/api/v1/file-upload',
      });

      if (imgFormDataArray.length === 0) {
        console.log('no file to upload');
        return;
      }

      await Promise.all(
        imgFormDataArray.map(async (formData) => {
          const imgUploadrequest: Request = new Request(urlString, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            signal,
            body: formData,
          });

          try {
            const imgUploadResponse = await fetch(imgUploadrequest);
            const data: { message: string; documentId: string } =
              await imgUploadResponse.json();
            console.log('data', data);

            if (imgUploadResponse.ok) {
              return data;
            }
          } catch (error: any) {
            console.log('imgFormDataArray async map', error);
          }
        })
      ).then((data) => {
        async function expenseClaimFormRequest() {
          const expenseUrlString = urlBuilder({
            path: '/api/v1/actions/company/expense-claim',
          });

          const expenseClaimRequest: Request = new Request(expenseUrlString, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            signal,
            body: JSON.stringify({
              expenseClaim: {
                uploadedFilesIds: data
                  .filter((item) => item !== undefined)
                  .map((item) => item?.documentId),
                expenseClaimKind,
                expenseClaimCurrency,
                expenseClaimAmount,
                expenseClaimDate,
                expenseClaimDescription,
                additionalComments,
                acknowledgement,
              },
            }),
          });

          try {
            const expenseClaimResponse = await fetch(expenseClaimRequest);
            const expenseClaimData: ResourceRequestServerResponse<ExpenseClaimDocument> =
              await expenseClaimResponse.json();

            if (expenseClaimResponse.ok) {
              console.log('expense claim response', expenseClaimData);
            } else {
              console.error(expenseClaimData);
            }
          } catch (error: any) {
            console.error('expense claim error', error);
          }
        }

        if (data.every((item) => item !== undefined)) {
          expenseClaimFormRequest();
        }

        console.log('data from then', data);
      });
    }

    if (triggerFormSubmit && imgFormDataArray.length > 0) {
      imagesUploadRequest();
    }

    return () => {
      controller.abort();

      createExpenseClaimDispatch({
        type: createExpenseClaimAction.setImgFormDataArray,
        payload: [],
      });
    };
  }, [triggerFormSubmit]);

  useEffect(() => {
    logState({
      state: createExpenseClaimState,
      groupLabel: 'create expense claim state',
    });
  }, [createExpenseClaimState]);

  return displayExpenseClaimComponent;
}

export default CreateExpenseClaim;
