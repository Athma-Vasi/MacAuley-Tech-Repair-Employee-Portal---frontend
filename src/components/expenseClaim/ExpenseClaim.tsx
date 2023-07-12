import {
  faDollarSign,
  faEuro,
  faJpy,
  faPoundSign,
  faYen,
} from '@fortawesome/free-solid-svg-icons';
import { Flex } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import {
  DATE_NEAR_PAST_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
} from '../../constants/regex';
import {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  returnAccessibleButtonElements,
  returnAccessibleCheckboxInputElements,
  returnAccessibleDateTimeElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextElements,
  returnAccessibleTextInputElements,
} from '../../jsxCreators';
import { Currency } from '../../types';
import {
  returnDateNearPastValidationText,
  returnGrammarValidationText,
  returnMoneyValidationText,
} from '../../utils';
import { CURRENCY_DATA } from '../benefits/constants';
import { StepperWrapper } from '../wrappers';
import {
  EXPENSE_CLAIM_DESCRIPTION_MAP,
  EXPENSE_CLAIM_KIND_DATA,
  EXPENSE_CLAIM_MAX_STEPPER_POSITION,
} from './constants';
import {
  expenseClaimAction,
  expenseClaimReducer,
  initialExpenseClaimState,
} from './state';
import { ExpenseClaimKind } from './types';

function ExpenseClaim() {
  const [expenseClaimState, expenseClaimDispatch] = useReducer(
    expenseClaimReducer,
    initialExpenseClaimState
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
  } = expenseClaimState;

  // validate expenseClaimAmount on every change
  useEffect(() => {
    const isValid = MONEY_REGEX.test(expenseClaimAmount);

    expenseClaimDispatch({
      type: expenseClaimAction.setIsValidExpenseClaimAmount,
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

      expenseClaimDispatch({
        type: expenseClaimAction.setExpenseClaimAmount,
        payload: expenseClaimAmountWithCommaAndNoLeadingZero,
      });
    }
    // if currency is not EUR, replace comma with decimal and remove leading zeros
    else {
      const expenseClaimAmountWithDecimalAndNoLeadingZero = expenseClaimAmount
        .replace(',', '.')
        .replace(/^0+/, '');

      expenseClaimDispatch({
        type: expenseClaimAction.setExpenseClaimAmount,
        payload: expenseClaimAmountWithDecimalAndNoLeadingZero,
      });
    }
  }, [expenseClaimCurrency, expenseClaimAmount]);

  // validate expenseClaimDate on every change
  useEffect(() => {
    const isValid = DATE_NEAR_PAST_REGEX.test(expenseClaimDate);

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
      additionalComments !== '' && !isValidAdditionalComments;

    const isStepInError = areRequiredInputsInError || isOptionalInputInError;

    expenseClaimDispatch({
      type: expenseClaimAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    isValidExpenseClaimAmount,
    isValidExpenseClaimDate,
    isValidExpenseClaimDescription,
    isValidAdditionalComments,
    acknowledgement,
    additionalComments,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [expenseClaimAmountInputErrorText, expenseClaimAmountInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'expense claim amount',
      inputText: expenseClaimAmount,
      isInputTextFocused: isExpenseClaimAmountFocused,
      isValidInputText: isValidExpenseClaimAmount,
      regexValidationText: returnMoneyValidationText({
        kind: 'expense claim amount',
        money: expenseClaimAmount,
      }),
    });

  const [expenseClaimDateInputErrorText, expenseClaimDateInputValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'expense claim date',
      inputText: expenseClaimDate,
      isInputTextFocused: isExpenseClaimDateFocused,
      isValidInputText: isValidExpenseClaimDate,
      regexValidationText: returnDateNearPastValidationText(expenseClaimDate),
    });

  const [
    expenseClaimDescriptionInputErrorText,
    expenseClaimDescriptionInputValidText,
  ] = returnAccessibleTextElements({
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
    returnAccessibleTextElements({
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

  const currencyIcon =
    expenseClaimCurrency === 'CNY'
      ? faYen
      : expenseClaimCurrency === 'GBP'
      ? faPoundSign
      : expenseClaimCurrency === 'EUR'
      ? faEuro
      : expenseClaimCurrency === 'JPY'
      ? faJpy
      : faDollarSign;

  const expenseClaimAmountTextInputCreatorInfo: AccessibleTextInputCreatorInfo =
    {
      description: {
        error: expenseClaimAmountInputErrorText,
        valid: expenseClaimAmountInputValidText,
      },
      inputText: expenseClaimAmount,
      isValidInputText: isValidExpenseClaimAmount,
      label: 'Expense claim amount',
      onBlur: () => {
        expenseClaimDispatch({
          type: expenseClaimAction.setIsExpenseClaimAmountFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
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
      label: 'Expense claim kind',
      onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
        expenseClaimDispatch({
          type: expenseClaimAction.setExpenseClaimKind,
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
      label: 'Expense claim currency',
      onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
        expenseClaimDispatch({
          type: expenseClaimAction.setExpenseClaimCurrency,
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
      label: 'Expense claim date',
      onBlur: () => {
        expenseClaimDispatch({
          type: expenseClaimAction.setIsExpenseClaimDateFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
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
      label: 'Expense claim description',
      onBlur: () => {
        expenseClaimDispatch({
          type: expenseClaimAction.setIsExpenseClaimDescriptionFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      label: 'Additional comments',
      onBlur: () => {
        expenseClaimDispatch({
          type: expenseClaimAction.setIsAdditionalCommentsFocused,
          payload: false,
        });
      },
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      placeholder: 'Enter additional comments',
      semanticName: 'additional comments',
    };

  const acknowledgementCheckboxInputCreatorInfo: AccessibleCheckboxInputCreatorInfo =
    {
      description: {
        selected:
          'I acknowledge that the information I have provided is accurate.',
        deselected: 'I do not acknowledge.',
      },
      checkboxKind: 'single',
      label: 'Acknowledgement',
      semanticName: 'acknowledgement',
      accessibleDescription: {
        selected:
          'Checkbox is selected. I acknowledge that the information I have provided is accurate.',
        deselected: 'Checkbox is deselected. I do not acknowledge.',
      },
      onChangeSingle: (event: React.ChangeEvent<HTMLInputElement>) => {
        expenseClaimDispatch({
          type: expenseClaimAction.setAcknowledgement,
          payload: event.currentTarget.checked,
        });
      },
      checked: acknowledgement,
      onClick: () => {
        expenseClaimDispatch({
          type: expenseClaimAction.setAcknowledgement,
          payload: !acknowledgement,
        });
      },
      required: true,
    };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    buttonOnClick: () => {},
    buttonType: 'submit',
    buttonDisabled: stepsInError.size > 0,
    semanticName: 'submit button',
    semanticDescription: 'expense claim form submit button',
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
    returnAccessibleCheckboxInputElements([
      acknowledgementCheckboxInputCreatorInfo,
    ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);

  const displayExpenseClaimDetailsFirstPage = (
    <>
      {createdExpenseClaimKindSelectInput}
      {createdExpenseClaimCurrencySelectInput}
      {createdExpenseClaimAmountTextInput}
      {createdExpenseClaimDateTextInput}
      {createdExpenseClaimDescriptionTextInput}
      {createdAdditionalCommentsTextInput}
      {createdAcknowledgementCheckboxInput}
    </>
  );

  const displayExpenseClaimReviewPage = <h3>expense claim review</h3>;

  const displayExpenseClaimForm =
    currentStepperPosition === 0
      ? displayExpenseClaimDetailsFirstPage
      : currentStepperPosition === 1
      ? displayExpenseClaimReviewPage
      : null;

  const displayFormSubmitButton =
    currentStepperPosition === EXPENSE_CLAIM_MAX_STEPPER_POSITION
      ? createdSubmitButton
      : null;

  const displayExpenseClaimComponent = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionMap={EXPENSE_CLAIM_DESCRIPTION_MAP}
      maxStepperPosition={EXPENSE_CLAIM_MAX_STEPPER_POSITION}
      parentComponentDispatch={expenseClaimDispatch}
      setCurrentStepperPosition={expenseClaimAction.setCurrentStepperPosition}
      stepsInError={stepsInError}
    >
      <form onSubmit={handleExpenseClaimFormSubmit}>
        {displayExpenseClaimForm}
        {displayFormSubmitButton}
      </form>
    </StepperWrapper>
  );

  async function handleExpenseClaimFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
  }

  useEffect(() => {
    console.group('expenseClaim useEffect');
    Object.entries(expenseClaimState).forEach(([key, value]) => {
      console.log(key, value);
    });
    console.groupEnd();
  }, [expenseClaimState]);

  return (
    <Flex direction="column" align="center" justify="center" w="400px">
      {displayExpenseClaimComponent}
    </Flex>
  );
}

export { ExpenseClaim };
