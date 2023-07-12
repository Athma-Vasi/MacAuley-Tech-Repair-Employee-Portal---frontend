import { useEffect, useReducer } from 'react';
import {
  expenseClaimAction,
  expenseClaimReducer,
  initialExpenseClaimState,
} from './state';
import {
  DATE_NEAR_PAST_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
} from '../../constants/regex';

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
    const isStepInError =
      !isValidExpenseClaimAmount ||
      !isValidExpenseClaimDate ||
      !isValidExpenseClaimDescription ||
      !isValidAdditionalComments ||
      !acknowledgement;

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
  ]);

  return <h3>expense claim</h3>;
}

export { ExpenseClaim };
