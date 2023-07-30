import {
  faDollarSign,
  faEuro,
  faJpy,
  faPoundSign,
  faYen,
} from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, MouseEvent, useEffect, useReducer } from 'react';
import { TbUpload } from 'react-icons/tb';

import {
  DATE_NEAR_PAST_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
} from '../../../constants/regex';
import {
  returnAccessibleButtonElements,
  returnAccessibleCheckboxSingleInputElements,
  returnAccessibleDateTimeElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import type { Currency } from '../../../types';
import {
  returnDateNearPastValidationText,
  returnGrammarValidationText,
  returnNumberAmountValidationText,
} from '../../../utils';
import { CURRENCY_DATA } from '../../benefits/constants';
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
  EXPENSE_CLAIM_MAX_STEPPER_POSITION,
} from '../constants';
import {
  createExpenseClaimAction,
  createExpenseClaimReducer,
  initialCreateExpenseClaimState,
} from './state';
import type { ExpenseClaimKind } from './types';

function CreateExpenseClaim() {
  const [expenseClaimState, expenseClaimDispatch] = useReducer(
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
  } = expenseClaimState;

  // validate expenseClaimAmount on every change
  useEffect(() => {
    const isValid = MONEY_REGEX.test(expenseClaimAmount);

    expenseClaimDispatch({
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

      expenseClaimDispatch({
        type: createExpenseClaimAction.setExpenseClaimAmount,
        payload: expenseClaimAmountWithCommaAndNoLeadingZero,
      });
    }
    // if currency is not EUR, replace comma with decimal and remove leading zeros
    else {
      const expenseClaimAmountWithDecimalAndNoLeadingZero = expenseClaimAmount
        .replace(',', '.')
        .replace(/^0+/, '');

      expenseClaimDispatch({
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

    expenseClaimDispatch({
      type: createExpenseClaimAction.setIsValidExpenseClaimDate,
      payload: isValid,
    });
  }, [expenseClaimDate]);

  // validate expenseClaimDescription on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(expenseClaimDescription);

    expenseClaimDispatch({
      type: createExpenseClaimAction.setIsValidExpenseClaimDescription,
      payload: isValid,
    });
  }, [expenseClaimDescription]);

  // validate additionalComments on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(additionalComments);

    expenseClaimDispatch({
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

    expenseClaimDispatch({
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
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [expenseClaimAmountInputErrorText, expenseClaimAmountInputValidText] =
    returnAccessibleErrorValidTextElements({
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
    returnAccessibleErrorValidTextElements({
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
  ] = returnAccessibleErrorValidTextElements({
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
    returnAccessibleErrorValidTextElements({
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
    returnAccessibleSelectedDeselectedTextElements({
      isSelected: acknowledgement,
      semanticName: 'acknowledgement',
      selectedDescription: 'I acknowledge that the information is correct',
      deselectedDescription: 'I do not acknowledge',
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
          type: createExpenseClaimAction.setIsExpenseClaimAmountFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        expenseClaimDispatch({
          type: createExpenseClaimAction.setExpenseClaimAmount,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        expenseClaimDispatch({
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
      label: 'Expense claim kind',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        expenseClaimDispatch({
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
      label: 'Expense claim currency',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        expenseClaimDispatch({
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
      label: 'Expense claim date',
      onBlur: () => {
        expenseClaimDispatch({
          type: createExpenseClaimAction.setIsExpenseClaimDateFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        expenseClaimDispatch({
          type: createExpenseClaimAction.setExpenseClaimDate,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        expenseClaimDispatch({
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
      label: 'Expense claim description',
      onBlur: () => {
        expenseClaimDispatch({
          type: createExpenseClaimAction.setIsExpenseClaimDescriptionFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        expenseClaimDispatch({
          type: createExpenseClaimAction.setExpenseClaimDescription,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        expenseClaimDispatch({
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
      label: 'Additional comments',
      onBlur: () => {
        expenseClaimDispatch({
          type: createExpenseClaimAction.setIsAdditionalCommentsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        expenseClaimDispatch({
          type: createExpenseClaimAction.setAdditionalComments,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        expenseClaimDispatch({
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
        expenseClaimDispatch({
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
      expenseClaimDispatch({
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
    currentStepperPosition === EXPENSE_CLAIM_MAX_STEPPER_POSITION
      ? createdSubmitButton
      : null;

  const displayExpenseClaimDetailsFirstPage = (
    <FormLayoutWrapper>
      {createdExpenseClaimKindSelectInput}
      {createdExpenseClaimCurrencySelectInput}
      {createdExpenseClaimAmountTextInput}
      {createdExpenseClaimDateTextInput}
      {createdExpenseClaimDescriptionTextInput}
      {createdAdditionalCommentsTextInput}
      {createdAcknowledgementCheckboxInput}
    </FormLayoutWrapper>
  );

  const displayExpenseClaimReviewPage = <h3>expense claim review</h3>;

  const displayExpenseClaimForm =
    currentStepperPosition === 0
      ? displayExpenseClaimDetailsFirstPage
      : currentStepperPosition === 1
      ? displayExpenseClaimReviewPage
      : displaySubmitButton;

  const displayExpenseClaimComponent = (
    <StepperWrapper
      childrenTitle="Expense claim"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={EXPENSE_CLAIM_DESCRIPTION_OBJECTS}
      maxStepperPosition={EXPENSE_CLAIM_MAX_STEPPER_POSITION}
      parentComponentDispatch={expenseClaimDispatch}
      setCurrentStepperPosition={
        createExpenseClaimAction.setCurrentStepperPosition
      }
      stepsInError={stepsInError}
    >
      {displayExpenseClaimForm}
    </StepperWrapper>
  );

  useEffect(() => {
    async function handleExpenseClaimFormSubmit() {
      console.log('expense claim form submitted');
    }

    if (triggerFormSubmit) {
      handleExpenseClaimFormSubmit();
    }
  }, [triggerFormSubmit]);

  return <>{displayExpenseClaimComponent}</>;
}

export { CreateExpenseClaim };

/**
 * async function handleFileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    const file = document.getElementById('file') as HTMLInputElement;

    if (file?.files) {
      const image = file.files[0];
      const { name, type, size } = image;
      if (
        type === 'image/jpeg' ||
        type === 'image/jpg' ||
        type === 'image/png'
      ) {
        // const compressionFactor = size > 1000000 ? 0.2 : 0.5;
        const compressionFactor =
          size < 500000
            ? 0.5
            : size < 750000
            ? 0.4
            : size < 1000000
            ? 0.3
            : size < 1500000
            ? 0.2
            : 0.1;
        // compresses image to 50% of original size
        await compress(image, compressionFactor).then((compressedImage) => {
          console.log('image', compressedImage);
          formData.append('file', compressedImage, name);
        });
      } else {
        formData.append('file', image, name);
      }
    }

    console.log('formData', formData);

    const controller = new AbortController();
    const { signal } = controller;

    const axiosConfig: AxiosRequestConfig = {
      method: 'post',
      url: '/file-uploads',
      data: formData,
      signal,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };

    try {
      const response = await axiosInstance(axiosConfig);
      console.log('axiosresponse', response);
    } catch (error) {
      console.error(error);
    } finally {
      controller.abort();
    }
  }

  const [file, setFile] = useState<any>(null);

  async function fetchImage(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const controller = new AbortController();
    const { signal } = controller;

    const axiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: '/file-uploads/64a0b175543aa5594dcc9c01',
      signal,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };

    try {
      const response = await axiosInstance(axiosConfig);
      console.log('axiosresponse', response);
      setFile(response.data.fileUploads[0]);
    } catch (error) {
      console.error(error);
    } finally {
      controller.abort();
    }
  }
 */

/**
   * <form
        encType="multipart/form-data"
        method="post"
        onSubmit={handleFileSubmit}
        id="form"
      >
        <input type="file" name="file" id="file" />
        <button type="submit">submit</button>
      </form>
      <button onClick={fetchImage} type="button">
        Fetch
      </button>
      {file && (
        <Image
          src={`data:${file.fileMimetype};base64,${file.uploadedFile}`}
          alt="image"
          withPlaceholder
          h="100%"
          w="100%"
          fit="contain"
        />
      )}
   */
