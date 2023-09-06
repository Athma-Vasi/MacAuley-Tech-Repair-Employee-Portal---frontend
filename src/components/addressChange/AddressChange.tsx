import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useReducer,
} from 'react';
import { TbUpload } from 'react-icons/tb';

import { PROVINCES, STATES_US } from '../../constants/data';
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
} from '../../constants/regex';
import {
  returnAccessibleButtonElements,
  returnAccessibleCheckboxSingleInputElements,
  AccessibleErrorValidTextElements,
  returnAccessiblePhoneNumberTextInputElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextInputElements,
} from '../../jsxCreators';
import { Country, Province, StatesUS } from '../../types';
import {
  returnAddressValidationText,
  returnCityValidationText,
  returnPhoneNumberValidationText,
  returnPostalCodeValidationText,
} from '../../utils';
import {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../wrappers';
import {
  ADDRESS_CHANGE_DESCRIPTION_OBJECTS,
  ADDRESS_CHANGE_MAX_STEPPER_POSITION,
  COUNTRIES_DATA,
} from './constants';
import {
  addressChangeAction,
  addressChangeReducer,
  initialAddressChangeState,
} from './state';
import FormReviewPage, {
  FormReviewObject,
} from '../formReviewPage/FormReviewPage';
import { Group, Tooltip } from '@mantine/core';

function AddressChange() {
  const [addressChangeState, addressChangeDispatch] = useReducer(
    addressChangeReducer,
    initialAddressChangeState
  );
  const {
    contactNumber,
    isValidContactNumber,
    isContactNumberFocused,

    addressLine,
    isValidAddressLine,
    isAddressLineFocused,

    city,
    isValidCity,
    isCityFocused,

    province,
    state,
    country,

    postalCode,
    isValidPostalCode,
    isPostalCodeFocused,
    isAcknowledged,

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
  } = addressChangeState;

  // used to validate address line on every change
  useEffect(() => {
    const isValidAddress = ADDRESS_LINE_REGEX.test(addressLine);

    addressChangeDispatch({
      type: addressChangeAction.setIsValidAddressLine,
      payload: isValidAddress,
    });
  }, [addressLine]);

  // used to validate city on every change
  useEffect(() => {
    const isValidPlace = CITY_REGEX.test(city);

    addressChangeDispatch({
      type: addressChangeAction.setIsValidCity,
      payload: isValidPlace,
    });
  }, [city]);

  // resets addressline, city & postalcode if country is changed
  useEffect(() => {
    addressChangeDispatch({
      type: addressChangeAction.setAddressLine,
      payload: '',
    });
    addressChangeDispatch({
      type: addressChangeAction.setCity,
      payload: '',
    });
    addressChangeDispatch({
      type: addressChangeAction.setPostalCode,
      payload: '',
    });
  }, [country]);

  // used to validate contact number on every change
  useEffect(() => {
    const isValidContact = PHONE_NUMBER_REGEX.test(contactNumber);

    const contactLength = contactNumber.length;
    if (isContactNumberFocused) {
      switch (contactLength) {
        case 4: {
          addressChangeDispatch({
            type: addressChangeAction.setContactNumber,
            payload: `${contactNumber}(`,
          });
          break;
        }
        case 8: {
          addressChangeDispatch({
            type: addressChangeAction.setContactNumber,
            payload: `${contactNumber}) `,
          });
          break;
        }
        case 13: {
          addressChangeDispatch({
            type: addressChangeAction.setContactNumber,
            payload: `${contactNumber}-`,
          });
          break;
        }

        default:
          break;
      }
    }

    addressChangeDispatch({
      type: addressChangeAction.setIsValidContactNumber,
      payload: isValidContact,
    });
  }, [contactNumber, isContactNumberFocused]);

  // used to validate postal code on every change
  useEffect(() => {
    const isValidPostal =
      country === 'Canada'
        ? POSTAL_CODE_REGEX_CANADA.test(postalCode)
        : POSTAL_CODE_REGEX_US.test(postalCode);

    if (country === 'Canada') {
      const postalCodeLength = postalCode.length;
      if (postalCodeLength === 3) {
        addressChangeDispatch({
          type: addressChangeAction.setPostalCode,
          payload: `${postalCode} `,
        });
      } else if (postalCodeLength === 7) {
        addressChangeDispatch({
          type: addressChangeAction.setPostalCode,
          payload: postalCode.trim(),
        });
      }
    } else {
      const postalCodeLength = postalCode.length;
      if (postalCodeLength === 6) {
        addressChangeDispatch({
          type: addressChangeAction.setPostalCode,
          payload: `${postalCode.slice(0, 5)}-${postalCode.slice(5)}`,
        });
      }
    }

    addressChangeDispatch({
      type: addressChangeAction.setIsValidPostalCode,
      payload: isValidPostal,
    });
  }, [postalCode, country]);

  // update for stepper wrapper state
  useEffect(() => {
    const isStepInError =
      !isValidContactNumber ||
      !isValidAddressLine ||
      !isValidCity ||
      !isValidPostalCode ||
      !isAcknowledged;

    addressChangeDispatch({
      type: addressChangeAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 0,
      },
    });
  }, [
    isValidContactNumber,
    isValidAddressLine,
    isValidCity,
    isValidPostalCode,
    isAcknowledged,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [addressLineInputErrorText, addressLineInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'address line',
      inputText: addressLine,
      isValidInputText: isValidAddressLine,
      isInputTextFocused: isAddressLineFocused,
      regexValidationText: returnAddressValidationText({
        content: addressLine,
        contentKind: 'address line',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [cityInputErrorText, cityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'city',
      inputText: city,
      isValidInputText: isValidCity,
      isInputTextFocused: isCityFocused,
      regexValidationText: returnCityValidationText({
        content: city,
        contentKind: 'city',
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [postalCodeInputErrorText, postalCodeInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'postal code',
      inputText: postalCode,
      isValidInputText: isValidPostalCode,
      isInputTextFocused: isPostalCodeFocused,
      regexValidationText: returnPostalCodeValidationText({
        postalCode,
        country,
      }),
    });

  const [contactNumberInputErrorText, contactNumberInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'contact number',
      inputText: contactNumber,
      isValidInputText: isValidContactNumber,
      isInputTextFocused: isContactNumberFocused,
      regexValidationText: returnPhoneNumberValidationText(contactNumber),
    });

  const [acknowledgementInputSelectedText, acknowledgementInputDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: isAcknowledged,
      semanticName: 'acknowledgement',
      selectedDescription: 'I acknowledge that the information is correct',
      deselectedDescription: 'I do not acknowledge',
    });

  // following are info objects for input creators
  const countrySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: COUNTRIES_DATA,
    description: 'Select your country',
    label: 'Country',
    value: country,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      addressChangeDispatch({
        type: addressChangeAction.setCountry,
        payload: event.currentTarget.value as Country,
      });
    },
    required: true,
    withAsterisk: true,
  };

  const provinceOrStateSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: country === 'Canada' ? PROVINCES : STATES_US,
      description:
        country === 'Canada' ? 'Select your province' : 'Select your state',
      label: country === 'Canada' ? 'Province' : 'State',
      value: country === 'Canada' ? province : state,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        country === 'Canada'
          ? addressChangeDispatch({
              type: addressChangeAction.setProvince,
              payload: event.currentTarget.value as Province,
            })
          : addressChangeDispatch({
              type: addressChangeAction.setState,
              payload: event.currentTarget.value as StatesUS,
            });
      },
    };

  const addressLineTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: addressLineInputErrorText,
      valid: addressLineInputValidText,
    },
    inputText: addressLine,
    isValidInputText: isValidAddressLine,
    label: 'Address Line',
    onBlur: () => {
      addressChangeDispatch({
        type: addressChangeAction.setIsAddressLineFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      addressChangeDispatch({
        type: addressChangeAction.setAddressLine,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      addressChangeDispatch({
        type: addressChangeAction.setIsAddressLineFocused,
        payload: true,
      });
    },
    placeholder: 'Enter your address',
    required: true,
    withAsterisk: true,
    semanticName: 'address line',
  };

  const cityTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: cityInputErrorText,
      valid: cityInputValidText,
    },
    inputText: city,
    isValidInputText: isValidCity,
    label: 'City',
    onBlur: () => {
      addressChangeDispatch({
        type: addressChangeAction.setIsCityFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      addressChangeDispatch({
        type: addressChangeAction.setCity,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      addressChangeDispatch({
        type: addressChangeAction.setIsCityFocused,
        payload: true,
      });
    },
    placeholder: 'Enter your city',
    required: true,
    withAsterisk: true,
    semanticName: 'city',

    minLength: 2,
    maxLength: 75,
  };

  const zipOrPostalCodeTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: postalCodeInputErrorText,
      valid: postalCodeInputValidText,
    },
    inputText: postalCode,
    isValidInputText: isValidPostalCode,
    label: country === 'Canada' ? 'Postal Code' : 'Zip Code',
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      addressChangeDispatch({
        type: addressChangeAction.setPostalCode,
        payload:
          country === 'Canada'
            ? event.currentTarget.value.toUpperCase()
            : event.currentTarget.value,
      });
    },
    onBlur: () => {
      addressChangeDispatch({
        type: addressChangeAction.setIsPostalCodeFocused,
        payload: false,
      });
    },
    onFocus: () => {
      addressChangeDispatch({
        type: addressChangeAction.setIsPostalCodeFocused,
        payload: true,
      });
    },
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      switch (country) {
        case 'Canada': {
          if (event.key === 'Backspace' && postalCode.length === 4) {
            addressChangeDispatch({
              type: addressChangeAction.setPostalCode,
              payload: postalCode.slice(0, 3),
            });
          }
          break;
        }
        case 'United States': {
          if (event.key === 'Backspace' && postalCode.length === 7) {
            addressChangeDispatch({
              type: addressChangeAction.setPostalCode,
              payload: postalCode.slice(0, 6),
            });
          }
          break;
        }
        default:
          break;
      }
    },
    placeholder:
      country === 'Canada'
        ? 'Enter Canadian postal code'
        : 'Enter US postal code',
    semanticName: 'postal code',

    minLength: country === 'Canada' ? 6 : 5,
    maxLength: country === 'Canada' ? 7 : 10,

    required: true,
    withAsterisk: true,
  };

  const contactNumberTextInputCreatorInfo: AccessiblePhoneNumberTextInputCreatorInfo =
    {
      description: {
        error: contactNumberInputErrorText,
        valid: contactNumberInputValidText,
      },
      inputText: contactNumber,
      isValidInputText: isValidContactNumber,
      label: 'Personal Contact Number',
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        addressChangeDispatch({
          type: addressChangeAction.setContactNumber,
          payload: event.currentTarget.value,
        });
      },
      onBlur: () => {
        addressChangeDispatch({
          type: addressChangeAction.setIsContactNumberFocused,
          payload: false,
        });
      },
      onFocus: () => {
        addressChangeDispatch({
          type: addressChangeAction.setIsContactNumberFocused,
          payload: true,
        });
      },
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace') {
          if (contactNumber.length === 14) {
            addressChangeDispatch({
              type: addressChangeAction.setContactNumber,
              payload: contactNumber.slice(0, -1),
            });
          } else if (contactNumber.length === 9) {
            addressChangeDispatch({
              type: addressChangeAction.setContactNumber,
              payload: contactNumber.slice(0, -1),
            });
          }
        }
      },
      placeholder: 'Enter personal contact number',
      rightSection: true,
      rightSectionOnClick: () => {
        addressChangeDispatch({
          type: addressChangeAction.setContactNumber,
          payload: '+(1)',
        });
      },
      semanticName: 'contact number',
      minLength: 18,
      maxLength: 18,

      required: true,
      withAsterisk: true,
      initialInputValue: '+(1)',
    };

  const acknowledgementCheckboxCreatorInfo: AccessibleCheckboxSingleInputCreatorInfo =
    {
      description: {
        selected: acknowledgementInputSelectedText,
        deselected: acknowledgementInputDeselectedText,
      },
      checked: isAcknowledged,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        addressChangeDispatch({
          type: addressChangeAction.setIsAcknowledged,
          payload: event.currentTarget.checked,
        });
      },
      semanticName: 'acknowledgement',
      label: 'Acknowledgement',
      required: true,
    };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'address change form submit button',
    semanticName: 'submit button',
    leftIcon: <TbUpload />,
    buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
      addressChangeDispatch({
        type: addressChangeAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  // following are the created accessible input elements
  const [
    createdAddressLineTextInput,
    createdCityTextInput,
    createdZipOrPostalCodeTextInput,
  ] = returnAccessibleTextInputElements([
    addressLineTextInputCreatorInfo,
    cityTextInputCreatorInfo,
    zipOrPostalCodeTextInputCreatorInfo,
  ]);

  const [createdContactNumberTextInput] =
    returnAccessiblePhoneNumberTextInputElements([
      contactNumberTextInputCreatorInfo,
    ]);

  const [createdCountrySelectInput, createdProvinceOrStateSelectInput] =
    returnAccessibleSelectInputElements([
      countrySelectInputCreatorInfo,
      provinceOrStateSelectInputCreatorInfo,
    ]);

  const [createdAcknowledgementCheckbox] =
    returnAccessibleCheckboxSingleInputElements([
      acknowledgementCheckboxCreatorInfo,
    ]);

  const ADDRESS_CHANGE_REVIEW_OBJECT: FormReviewObject = {
    'Contact Details': [
      {
        inputName: 'Personal Contact Number',
        inputValue: contactNumber,
        isInputValueValid: isValidContactNumber,
      },
      {
        inputName: 'Country',
        inputValue: country,
        isInputValueValid: true,
      },
      {
        inputName: 'Address Line',
        inputValue: addressLine,
        isInputValueValid: isValidAddressLine,
      },
      {
        inputName: 'City',
        inputValue: city,
        isInputValueValid: isValidCity,
      },
      {
        inputName: country === 'Canada' ? 'Province' : 'State',
        inputValue: country === 'Canada' ? province : state,
        isInputValueValid: true,
      },
      {
        inputName: country === 'Canada' ? 'Postal Code' : 'Zip Code',
        inputValue: postalCode,
        isInputValueValid: isValidPostalCode,
      },
      {
        inputName: 'Acknowledgement',
        inputValue: isAcknowledged ? 'Yes' : 'No',
        isInputValueValid: isAcknowledged,
      },
    ],
  };

  const displayAddressChangeReviewPage = (
    <FormReviewPage
      formReviewObject={ADDRESS_CHANGE_REVIEW_OBJECT}
      formName="Address Change"
    />
  );

  useEffect(() => {
    async function addressChangeFormSubmit() {}

    if (triggerFormSubmit) {
      addressChangeFormSubmit();
    }
  }, [triggerFormSubmit]);

  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);
  const displaySubmitButton =
    currentStepperPosition === ADDRESS_CHANGE_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? 'Please fix errors before submitting form form'
            : 'Submit Address Change form'
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const createdAddressChangeForm = (
    <FormLayoutWrapper>
      {createdContactNumberTextInput}
      {createdCountrySelectInput}
      {createdAddressLineTextInput}
      {createdCityTextInput}
      {createdProvinceOrStateSelectInput}
      {createdZipOrPostalCodeTextInput}
      {createdAcknowledgementCheckbox}
    </FormLayoutWrapper>
  );

  const displayAddressChangeForm =
    currentStepperPosition === 0
      ? createdAddressChangeForm
      : currentStepperPosition === 1
      ? displayAddressChangeReviewPage
      : displaySubmitButton;

  const displayAddressChangeComponent = (
    <StepperWrapper
      childrenTitle="Address change"
      currentStepperPosition={currentStepperPosition}
      setCurrentStepperPosition={addressChangeAction.setCurrentStepperPosition}
      descriptionObjectsArray={ADDRESS_CHANGE_DESCRIPTION_OBJECTS}
      maxStepperPosition={ADDRESS_CHANGE_MAX_STEPPER_POSITION}
      parentComponentDispatch={addressChangeDispatch}
      stepsInError={stepsInError}
    >
      {displayAddressChangeForm}
    </StepperWrapper>
  );

  return <>{displayAddressChangeComponent}</>;
}

export { AddressChange };
