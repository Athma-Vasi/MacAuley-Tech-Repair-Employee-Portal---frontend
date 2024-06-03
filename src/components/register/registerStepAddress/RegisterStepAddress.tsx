import { ChangeEvent, KeyboardEvent, useEffect } from "react";

import { PROVINCES, STATES_US } from "../../../constants/data";
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
} from "../../../constants/regex";
import {
  AccessibleErrorValidTextElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextInputElements,
} from "../../../jsxCreators";
import { Country, Province, StatesUS } from "../../../types";
import {
  returnAddressValidationText,
  returnCityValidationText,
  returnPhoneNumberValidationText,
  returnPostalCodeValidationText,
} from "../../../utils";
import {
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
} from "../../wrappers";
import { RegisterStepAddressProps } from "./types";

function RegisterStepAddress({
  contactNumber,
  isValidContactNumber,
  isContactNumberFocused,
  addressLine,
  isValidAddressLine,
  isAddressLineFocused,
  city,
  isValidCity,
  isCityFocused,
  state,
  province,
  country,
  postalCode,
  isValidPostalCode,
  isPostalCodeFocused,
  registerAction,
  registerDispatch,
}: RegisterStepAddressProps) {}

export { RegisterStepAddress };

/**
 * // used to validate address line on every change
  useEffect(() => {
    const isValidAddress = ADDRESS_LINE_REGEX.test(addressLine);

    registerDispatch({
      type: registerAction.setIsValidAddressLine,
      payload: isValidAddress,
    });
  }, [addressLine, registerAction.setIsValidAddressLine, registerDispatch]);

  // used to validate city on every change
  useEffect(() => {
    const isValidPlace = CITY_REGEX.test(city);

    registerDispatch({
      type: registerAction.setIsValidCity,
      payload: isValidPlace,
    });
  }, [city, registerAction.setIsValidCity, registerDispatch]);

  // // resets address if country is changed
  // useEffect(() => {
  //   registerDispatch({
  //     type: registerAction.setAddressLine,
  //     payload: '',
  //   });
  //   registerDispatch({
  //     type: registerAction.setCity,
  //     payload: '',
  //   });
  //   registerDispatch({
  //     type: registerAction.setPostalCode,
  //     payload: '',
  //   });
  // }, [
  //   country,
  //   registerAction.setAddressLine,
  //   registerAction.setCity,
  //   registerAction.setPostalCode,
  //   registerDispatch,
  // ]);

  // used to validate contact number on every change
  useEffect(() => {
    const isValidContact = PHONE_NUMBER_REGEX.test(contactNumber);

    const contactLength = contactNumber.length;
    if (isContactNumberFocused) {
      switch (contactLength) {
        case 4: {
          registerDispatch({
            type: registerAction.setContactNumber,
            payload: `${contactNumber}(`,
          });
          break;
        }
        case 8: {
          registerDispatch({
            type: registerAction.setContactNumber,
            payload: `${contactNumber}) `,
          });
          break;
        }
        case 13: {
          registerDispatch({
            type: registerAction.setContactNumber,
            payload: `${contactNumber}-`,
          });
          break;
        }

        default:
          break;
      }
    }

    registerDispatch({
      type: registerAction.setIsValidContactNumber,
      payload: isValidContact,
    });
  }, [
    contactNumber,
    isContactNumberFocused,
    registerAction.setContactNumber,
    registerAction.setIsValidContactNumber,
    registerDispatch,
  ]);

  // used to validate postal code on every change
  useEffect(() => {
    const isValidPostal =
      country === "Canada"
        ? POSTAL_CODE_REGEX_CANADA.test(postalCode)
        : POSTAL_CODE_REGEX_US.test(postalCode);

    if (country === "Canada") {
      const postalCodeLength = postalCode.length;
      if (postalCodeLength === 3) {
        registerDispatch({
          type: registerAction.setPostalCode,
          payload: `${postalCode} `,
        });
      } else if (postalCodeLength === 7) {
        registerDispatch({
          type: registerAction.setPostalCode,
          payload: postalCode.trim(),
        });
      }
    } else {
      const postalCodeLength = postalCode.length;
      if (postalCodeLength === 6) {
        registerDispatch({
          type: registerAction.setPostalCode,
          payload: `${postalCode.slice(0, 5)}-${postalCode.slice(5)}`,
        });
      }
    }

    registerDispatch({
      type: registerAction.setIsValidPostalCode,
      payload: isValidPostal,
    });
  }, [
    postalCode,
    country,
    registerDispatch,
    registerAction.setIsValidPostalCode,
    registerAction.setPostalCode,
  ]);

  // update the corresponding pagesInError state if any of the inputs are in error
  useEffect(() => {
    const isStepInError =
      !isValidAddressLine || !isValidCity || !isValidPostalCode || !isValidContactNumber;

    registerDispatch({
      type: registerAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 2,
      },
    });
  }, [
    isValidAddressLine,
    isValidCity,
    isValidPostalCode,
    isValidContactNumber,
    registerDispatch,
    registerAction.setPageInError,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [addressLineInputErrorText, addressLineInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "address line",
      inputText: addressLine,
      isValidInputText: isValidAddressLine,
      isInputTextFocused: isAddressLineFocused,
      regexValidationText: returnAddressValidationText({
        content: addressLine,
        contentKind: "address line",
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [cityInputErrorText, cityInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "city",
    inputText: city,
    isValidInputText: isValidCity,
    isInputTextFocused: isCityFocused,
    regexValidationText: returnCityValidationText({
      content: city,
      contentKind: "city",
      minLength: 2,
      maxLength: 75,
    }),
  });

  const [postalCodeInputErrorText, postalCodeInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "postal code",
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
      inputElementKind: "contact number",
      inputText: contactNumber,
      isValidInputText: isValidContactNumber,
      isInputTextFocused: isContactNumberFocused,
      regexValidationText: returnPhoneNumberValidationText({
        content: contactNumber,
        contentKind: "contact number",
      }),
    });

  const contactNumberPhoneInputCreatorInfo: AccessiblePhoneNumberTextInputCreatorInfo = {
    description: {
      error: contactNumberInputErrorText,
      valid: contactNumberInputValidText,
    },
    inputText: contactNumber,
    isValidInputText: isValidContactNumber,
    label: "Contact number",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsContactNumberFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setContactNumber,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsContactNumberFocused,
        payload: true,
      });
    },
    placeholder: "Enter your contact number",
    required: true,
    rightSection: true,
    rightSectionOnClick: () => {
      registerDispatch({
        type: registerAction.setContactNumber,
        payload: "+(1)",
      });
    },
    withAsterisk: true,
    semanticName: "contact number",
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Backspace") {
        if (contactNumber.length === 14 || contactNumber.length === 9) {
          registerDispatch({
            type: registerAction.setContactNumber,
            payload: contactNumber.slice(0, -1),
          });
        }
      }
    },
  };

  const countrySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    description: "Select your country",
    label: "Country",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      registerDispatch({
        type: registerAction.setCountry,
        payload: event.currentTarget.value as Country,
      });
    },
    data: COUNTRIES_DATA,
    value: country,
    required: true,
    withAsterisk: true,
  };

  const addressLineTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: addressLineInputErrorText,
      valid: addressLineInputValidText,
    },
    inputText: addressLine,
    isValidInputText: isValidAddressLine,
    label: "Address line",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsAddressLineFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setAddressLine,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsAddressLineFocused,
        payload: true,
      });
    },
    placeholder: "Enter your address",
    required: true,
    withAsterisk: true,
    semanticName: "address line",
  };

  const cityTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: cityInputErrorText,
      valid: cityInputValidText,
    },
    inputText: city,
    isValidInputText: isValidCity,
    label: "City",
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsCityFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setCity,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsCityFocused,
        payload: true,
      });
    },
    placeholder: "Enter your city",
    required: true,
    withAsterisk: true,
    semanticName: "city",

    minLength: 2,
    maxLength: 75,
  };

  const provinceOrStateSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: country === "Canada" ? PROVINCES : STATES_US,
    description: country === "Canada" ? "Select your province" : "Select your state",
    label: country === "Canada" ? "Province" : "State",
    value: country === "Canada" ? province : state,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      country === "Canada"
        ? registerDispatch({
            type: registerAction.setProvince,
            payload: event.currentTarget.value as Province,
          })
        : registerDispatch({
            type: registerAction.setState,
            payload: event.currentTarget.value as StatesUS,
          });
    },
  };

  const zipOrPostalCodeTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: postalCodeInputErrorText,
      valid: postalCodeInputValidText,
    },
    inputText: postalCode,
    isValidInputText: isValidPostalCode,
    label: country === "Canada" ? "Postal code" : "Zip code",
    maxLength: country === "Canada" ? 7 : 10,
    minLength: country === "Canada" ? 6 : 5,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      registerDispatch({
        type: registerAction.setPostalCode,
        payload:
          country === "Canada"
            ? event.currentTarget.value.toUpperCase()
            : event.currentTarget.value,
      });
    },
    onBlur: () => {
      registerDispatch({
        type: registerAction.setIsPostalCodeFocused,
        payload: false,
      });
    },
    onFocus: () => {
      registerDispatch({
        type: registerAction.setIsPostalCodeFocused,
        payload: true,
      });
    },
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      switch (country) {
        case "Canada": {
          if (event.key === "Backspace" && postalCode.length === 4) {
            registerDispatch({
              type: registerAction.setPostalCode,
              payload: postalCode.slice(0, 3),
            });
          }
          break;
        }
        case "United States": {
          if (event.key === "Backspace" && postalCode.length === 7) {
            registerDispatch({
              type: registerAction.setPostalCode,
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
      country === "Canada" ? "Enter Canadian postal code" : "Enter US postal code",
    required: true,
    semanticName: "postal code",
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

  const [createdContactNumberTextInput] = returnAccessiblePhoneNumberTextInputElements([
    contactNumberPhoneInputCreatorInfo,
  ]);

  const [createdCountrySelectInput, createdProvinceOrStateSelectInput] =
    returnAccessibleSelectInputElements([
      countrySelectInputCreatorInfo,
      provinceOrStateSelectInputCreatorInfo,
    ]);

  const displayRegisterStepAddress = (
    <FormLayoutWrapper>
      {createdContactNumberTextInput}
      {createdCountrySelectInput}
      {createdAddressLineTextInput}
      {createdCityTextInput}
      {createdProvinceOrStateSelectInput}
      {createdZipOrPostalCodeTextInput}
    </FormLayoutWrapper>
  );

  return <>{displayRegisterStepAddress}</>;

 */
