import { Text, Title } from '@mantine/core';
import { ChangeEvent, KeyboardEvent, useEffect } from 'react';

import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
} from '../../../../constants/regex';
import {
  returnAccessibleErrorValidTextElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextInputElements,
} from '../../../../jsxCreators';
import {
  filterFieldsFromObject,
  logState,
  returnAddressValidationText,
  returnCityValidationText,
  returnEmailValidationText,
  returnNameValidationText,
  returnPhoneNumberValidationText,
  returnPostalCodeValidationText,
} from '../../../../utils';
import {
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
} from '../../../wrappers';
import type { RepairNoteStepCustomerProps } from './types';
import { PROVINCES, STATES_US } from '../../../../constants/data';
import { Country, Province, StatesUS } from '../../../../types';
import { COUNTRIES_DATA } from '../../../addressChange/constants';

function RepairNoteStepCustomer(parentState: RepairNoteStepCustomerProps) {
  const {
    customerName,
    isValidCustomerName,
    isCustomerNameFocused,

    customerPhone,
    isValidCustomerPhone,
    isCustomerPhoneFocused,

    customerEmail,
    isValidCustomerEmail,
    isCustomerEmailFocused,

    customerAddressLine,
    isValidCustomerAddressLine,
    isCustomerAddressLineFocused,

    customerCity,
    isValidCustomerCity,
    isCustomerCityFocused,

    customerState,
    customerProvince,
    customerCountry,

    customerPostalCode,
    isValidCustomerPostalCode,
    isCustomerPostalCodeFocused,

    createRepairNoteAction,
    createRepairNoteDispatch,
  } = parentState;

  // ------------- input validation ------------- //

  // validate customer name on every input change
  useEffect(() => {
    const isValid = FULL_NAME_REGEX.test(customerName);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidCustomerName,
      payload: isValid,
    });
  }, [
    createRepairNoteAction.setIsValidCustomerName,
    createRepairNoteDispatch,
    customerName,
  ]);

  // validate customer phone on every input change
  useEffect(() => {
    const isValid = PHONE_NUMBER_REGEX.test(customerPhone);

    const contactLength = customerPhone.length;
    if (isCustomerPhoneFocused) {
      switch (contactLength) {
        case 4: {
          createRepairNoteDispatch({
            type: createRepairNoteAction.setCustomerPhone,
            payload: `${customerPhone}(`,
          });
          break;
        }
        case 8: {
          createRepairNoteDispatch({
            type: createRepairNoteAction.setCustomerPhone,
            payload: `${customerPhone}) `,
          });
          break;
        }
        case 13: {
          createRepairNoteDispatch({
            type: createRepairNoteAction.setCustomerPhone,
            payload: `${customerPhone}-`,
          });
          break;
        }

        default:
          break;
      }
    }

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidCustomerPhone,
      payload: isValid,
    });
  }, [
    createRepairNoteAction.setCustomerPhone,
    createRepairNoteAction.setIsValidCustomerPhone,
    createRepairNoteDispatch,
    customerPhone,
    isCustomerPhoneFocused,
  ]);

  // validate customer email on every input change
  useEffect(() => {
    const isValid = EMAIL_REGEX.test(customerEmail);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidCustomerEmail,
      payload: isValid,
    });
  }, [
    createRepairNoteAction.setIsValidCustomerEmail,
    createRepairNoteDispatch,
    customerEmail,
  ]);

  // validate customer address line on every input change
  useEffect(() => {
    const isValid = ADDRESS_LINE_REGEX.test(customerAddressLine);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidCustomerAddressLine,
      payload: isValid,
    });
  }, [
    createRepairNoteAction.setIsValidCustomerAddressLine,
    createRepairNoteDispatch,
    customerAddressLine,
  ]);

  // validate customer city on every input change
  useEffect(() => {
    const isValid = CITY_REGEX.test(customerCity);

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidCustomerCity,
      payload: isValid,
    });
  }, [
    createRepairNoteAction.setIsValidCustomerCity,
    createRepairNoteDispatch,
    customerCity,
  ]);

  // validate customer postal code on every input change
  useEffect(() => {
    const isValidPostal =
      customerCountry === 'Canada'
        ? POSTAL_CODE_REGEX_CANADA.test(customerPostalCode)
        : POSTAL_CODE_REGEX_US.test(customerPostalCode);

    if (customerCountry === 'Canada') {
      const customerPostalCodeLength = customerPostalCode.length;
      if (customerPostalCodeLength === 3) {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setCustomerPostalCode,
          payload: `${customerPostalCode} `,
        });
      } else if (customerPostalCodeLength === 7) {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setCustomerPostalCode,
          payload: customerPostalCode.trim(),
        });
      }
    } else {
      const customerPostalCodeLength = customerPostalCode.length;
      if (customerPostalCodeLength === 6) {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setCustomerPostalCode,
          payload: `${customerPostalCode.slice(
            0,
            5
          )}-${customerPostalCode.slice(5)}`,
        });
      }
    }

    createRepairNoteDispatch({
      type: createRepairNoteAction.setIsValidCustomerPostalCode,
      payload: isValidPostal,
    });
  }, [
    createRepairNoteAction.setCustomerPostalCode,
    createRepairNoteAction.setIsValidCustomerPostalCode,
    createRepairNoteDispatch,
    customerCountry,
    customerPostalCode,
  ]);

  // reset address line, city, and postal code when country changes
  useEffect(() => {
    createRepairNoteDispatch({
      type: createRepairNoteAction.setCustomerAddressLine,
      payload: '',
    });
    createRepairNoteDispatch({
      type: createRepairNoteAction.setCustomerCity,
      payload: '',
    });
    createRepairNoteDispatch({
      type: createRepairNoteAction.setCustomerPostalCode,
      payload: '',
    });
  }, [
    createRepairNoteAction.setCustomerAddressLine,
    createRepairNoteAction.setCustomerCity,
    createRepairNoteAction.setCustomerPostalCode,
    createRepairNoteDispatch,
    customerCountry,
  ]);

  // update corresponding stepsInError state when customer info changes
  useEffect(() => {
    const isStepInError =
      !isValidCustomerName ||
      !isValidCustomerPhone ||
      !isValidCustomerEmail ||
      !isValidCustomerAddressLine ||
      !isValidCustomerCity ||
      !isValidCustomerPostalCode;

    createRepairNoteDispatch({
      type: createRepairNoteAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 0,
      },
    });
  }, [
    createRepairNoteAction.setStepsInError,
    createRepairNoteDispatch,
    isValidCustomerName,
    isValidCustomerPhone,
    isValidCustomerEmail,
    isValidCustomerAddressLine,
    isValidCustomerCity,
    isValidCustomerPostalCode,
  ]);
  // ------------- end input validation ------------- //

  // ------------- accessible error and valid texts ------------- //

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [customerNameInputErrorText, customerNameInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'customer name',
      inputText: customerName,
      isValidInputText: isValidCustomerName,
      isInputTextFocused: isCustomerNameFocused,
      regexValidationText: returnNameValidationText({
        content: customerName,
        contentKind: 'customer name',
        minLength: 2,
        maxLength: 100,
      }),
    });

  const [customerPhoneInputErrorText, customerPhoneInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'customer phone',
      inputText: customerPhone,
      isValidInputText: isValidCustomerPhone,
      isInputTextFocused: isCustomerPhoneFocused,
      regexValidationText: returnPhoneNumberValidationText(customerPhone),
    });

  const [customerEmailInputErrorText, customerEmailInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'customer email',
      inputText: customerEmail,
      isValidInputText: isValidCustomerEmail,
      isInputTextFocused: isCustomerEmailFocused,
      regexValidationText: returnEmailValidationText(customerEmail),
    });

  const [customerAddressLineInputErrorText, customerAddressLineInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'customer address line',
      inputText: customerAddressLine,
      isValidInputText: isValidCustomerAddressLine,
      isInputTextFocused: isCustomerAddressLineFocused,
      regexValidationText: returnAddressValidationText({
        content: customerAddressLine,
        contentKind: 'customer address line',
        maxLength: 75,
        minLength: 2,
      }),
    });

  const [customerCityInputErrorText, customerCityInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'customer city',
      inputText: customerCity,
      isValidInputText: isValidCustomerCity,
      isInputTextFocused: isCustomerCityFocused,
      regexValidationText: returnCityValidationText({
        content: customerCity,
        contentKind: 'customer city',
        maxLength: 75,
        minLength: 2,
      }),
    });

  const [customerPostalCodeInputErrorText, customerPostalCodeInputValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: 'customer postal code',
      inputText: customerPostalCode,
      isValidInputText: isValidCustomerPostalCode,
      isInputTextFocused: isCustomerPostalCodeFocused,
      regexValidationText: returnPostalCodeValidationText({
        country: customerCountry,
        postalCode: customerPostalCode,
      }),
    });

  // ------------- end accessible error and valid texts ------------- //

  // ------------- input creator info objects ------------- //

  const customerNameInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: customerNameInputErrorText,
      valid: customerNameInputValidText,
    },
    inputText: customerName,
    isValidInputText: isValidCustomerName,
    label: 'Customer name',
    onBlur: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsCustomerNameFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setCustomerName,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsCustomerNameFocused,
        payload: true,
      });
    },
    placeholder: 'Enter customer name',
    required: true,
    withAsterisk: true,
    semanticName: 'customer name',
  };

  const customerPhoneInputCreatorInfo: AccessiblePhoneNumberTextInputCreatorInfo =
    {
      description: {
        error: customerPhoneInputErrorText,
        valid: customerPhoneInputValidText,
      },
      inputText: customerPhone,
      isValidInputText: isValidCustomerPhone,
      label: 'Customer phone',
      onBlur: () => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsCustomerPhoneFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setCustomerPhone,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createRepairNoteDispatch({
          type: createRepairNoteAction.setIsCustomerPhoneFocused,
          payload: true,
        });
      },
      placeholder: 'Enter customer phone',
      required: true,
      withAsterisk: true,
      semanticName: 'customer phone',
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace') {
          if (customerPhone.length === 14 || customerPhone.length === 9) {
            createRepairNoteDispatch({
              type: createRepairNoteAction.setCustomerPhone,
              payload: customerPhone.slice(0, -1),
            });
          }
        }
      },
    };

  const customerEmailInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: customerEmailInputErrorText,
      valid: customerEmailInputValidText,
    },
    inputText: customerEmail,
    isValidInputText: isValidCustomerEmail,
    label: 'Customer email',
    onBlur: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsCustomerEmailFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setCustomerEmail,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsCustomerEmailFocused,
        payload: true,
      });
    },
    placeholder: 'Enter customer email',
    required: true,
    withAsterisk: true,
    semanticName: 'customer email',
  };

  const countrySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    description: 'Select your country',
    label: 'Country',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setCustomerCountry,
        payload: event.currentTarget.value as Country,
      });
    },
    data: COUNTRIES_DATA,
    value: customerCountry,
    required: true,
    withAsterisk: true,
  };

  const customerAddressLineInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: customerAddressLineInputErrorText,
      valid: customerAddressLineInputValidText,
    },
    inputText: customerAddressLine,
    isValidInputText: isValidCustomerAddressLine,
    label: 'Customer address line',
    onBlur: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsCustomerAddressLineFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setCustomerAddressLine,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsCustomerAddressLineFocused,
        payload: true,
      });
    },
    placeholder: 'Enter customer address line',
    required: true,
    withAsterisk: true,
    semanticName: 'customer address line',
  };

  const customerCityInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: customerCityInputErrorText,
      valid: customerCityInputValidText,
    },
    inputText: customerCity,
    isValidInputText: isValidCustomerCity,
    label: 'Customer city',
    onBlur: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsCustomerCityFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setCustomerCity,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsCustomerCityFocused,

        payload: true,
      });
    },
    placeholder: 'Enter customer city',
    required: true,
    withAsterisk: true,
    semanticName: 'customer city',
  };

  const provinceOrStateSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: customerCountry === 'Canada' ? PROVINCES : STATES_US,
      description:
        customerCountry === 'Canada'
          ? 'Select your province'
          : 'Select your state',
      label: customerCountry === 'Canada' ? 'Province' : 'State',
      value: customerCountry === 'Canada' ? customerProvince : customerState,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        customerCountry === 'Canada'
          ? createRepairNoteDispatch({
              type: createRepairNoteAction.setCustomerProvince,
              payload: event.currentTarget.value as Province,
            })
          : createRepairNoteDispatch({
              type: createRepairNoteAction.setCustomerState,
              payload: event.currentTarget.value as StatesUS,
            });
      },
    };

  const zipOrPostalCodeTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: customerPostalCodeInputErrorText,
      valid: customerPostalCodeInputValidText,
    },
    inputText: customerPostalCode,
    isValidInputText: isValidCustomerPostalCode,
    label: customerCountry === 'Canada' ? 'Postal code' : 'Zip code',
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setCustomerPostalCode,
        payload:
          customerCountry === 'Canada'
            ? event.currentTarget.value.toUpperCase()
            : event.currentTarget.value,
      });
    },
    onBlur: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsCustomerPostalCodeFocused,
        payload: false,
      });
    },
    onFocus: () => {
      createRepairNoteDispatch({
        type: createRepairNoteAction.setIsCustomerPostalCodeFocused,
        payload: true,
      });
    },
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      switch (customerCountry) {
        case 'Canada': {
          if (event.key === 'Backspace' && customerPostalCode.length === 4) {
            createRepairNoteDispatch({
              type: createRepairNoteAction.setCustomerPostalCode,
              payload: customerPostalCode.slice(0, 3),
            });
          }
          break;
        }
        case 'United States': {
          if (event.key === 'Backspace' && customerPostalCode.length === 7) {
            createRepairNoteDispatch({
              type: createRepairNoteAction.setCustomerPostalCode,
              payload: customerPostalCode.slice(0, 6),
            });
          }
          break;
        }
        default:
          break;
      }
    },
    placeholder:
      customerCountry === 'Canada'
        ? 'Enter Canadian postal code'
        : 'Enter US postal code',
    semanticName: 'postal code',

    minLength: customerCountry === 'Canada' ? 6 : 5,
    maxLength: customerCountry === 'Canada' ? 7 : 10,

    required: true,
    withAsterisk: true,
  };

  // ------------- end input creator info objects ------------- //

  // ------------- created inputs ------------- //

  const [
    createdCustomerNameInput,
    createdCustomerEmailInput,
    createdCustomerAddressLineInput,
    createdCustomerCityInput,
    createdCustomerPostalCodeInput,
  ] = returnAccessibleTextInputElements([
    customerNameInputCreatorInfo,
    customerEmailInputCreatorInfo,
    customerAddressLineInputCreatorInfo,
    customerCityInputCreatorInfo,
    zipOrPostalCodeTextInputCreatorInfo,
  ]);

  const [createdCustomerPhoneInput] =
    returnAccessiblePhoneNumberTextInputElements([
      customerPhoneInputCreatorInfo,
    ]);

  const [createdProvinceOrStateSelectInput, createdCountrySelectInput] =
    returnAccessibleSelectInputElements([
      provinceOrStateSelectInputCreatorInfo,
      countrySelectInputCreatorInfo,
    ]);

  // ------------- end created inputs ------------- //

  // ------------- display created inputs ------------- //

  const displayRepairNoteStepCustomer = (
    <FormLayoutWrapper>
      {createdCustomerNameInput}
      {createdCustomerPhoneInput}
      {createdCustomerEmailInput}
      {createdCountrySelectInput}
      {createdCustomerAddressLineInput}
      {createdCustomerCityInput}
      {createdProvinceOrStateSelectInput}
      {createdCustomerPostalCodeInput}
    </FormLayoutWrapper>
  );

  // ------------- end display created inputs ------------- //
  //
  //
  //
  useEffect(() => {
    const fieldsOmittedState = filterFieldsFromObject({
      object: parentState,
      fieldsToFilter: ['createRepairNoteAction', 'createRepairNoteDispatch'],
    });

    logState({
      state: fieldsOmittedState,
      groupLabel: 'RepairNoteStepCustomer',
    });
  }, [parentState]);

  return <>{displayRepairNoteStepCustomer}</>;
}

export { RepairNoteStepCustomer };
