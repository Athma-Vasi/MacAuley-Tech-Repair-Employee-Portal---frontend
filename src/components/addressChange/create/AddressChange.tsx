import { Group, Title, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InvalidTokenError } from "jwt-decode";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { useErrorBoundary } from "react-error-boundary";
import { TbUpload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { PROVINCES, STATES_US } from "../../../constants/data";
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
} from "../../../constants/regex";
import { useGlobalState, useWrapFetch } from "../../../hooks";
import {
  Country,
  Province,
  ResourceRequestServerResponse,
  StatesUS,
} from "../../../types";
import { logState, urlBuilder } from "../../../utils";
import {
  InputsRegexes,
  createAddressValidationTexts,
  createCityValidationTexts,
  createPhoneNumberValidationTexts,
  createPostalCodeValidationTexts,
} from "../../../utils/validations";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleCheckboxInputSingle } from "../../accessibleInputs/AccessibleCheckboxInput";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import {
  AccessibleTextInput,
  AccessibleTextInputAttributes,
} from "../../accessibleInputs/text/AccessibleTextInput";
import { AccessibleTextInputPhone } from "../../accessibleInputs/AccessibleTextInputPhone";
import { AccessibleTextInputPostal } from "../../accessibleInputs/AccessibleTextInputPostal";
import { FormLayoutWrapper, StepperWrapper } from "../../wrappers";
import {
  ADDRESS_CHANGE_DESCRIPTION_OBJECTS,
  ADDRESS_CHANGE_MAX_STEPPER_POSITION,
  COUNTRIES_DATA,
} from "../constants";
import { AddressChangeAction, addressChangeAction } from "./actions";
import { addressChangeReducer } from "./reducers";
import { initialAddressChangeState } from "./state";
import { AddressChangeDocument } from "./types";
import { AccessibleSwitchInput } from "../../accessibleInputs/AccessibleSwitchInput";

function AddressChange() {
  const [addressChangeState, addressChangeDispatch] = useReducer(
    addressChangeReducer,
    initialAddressChangeState
  );

  const {
    contactNumber,
    addressLine,
    city,
    province,
    state,
    country,
    postalCode,
    isAcknowledged,
    triggerFormSubmit,
    currentStepperPosition,
    stepsInError,
    isSubmitting,
    isSuccessful,
  } = addressChangeState;

  ////

  // useEffect(() => {
  //   if (province === "British Columbia") {
  //     throw new Error("ERROR from AddressChange");
  //   }
  // }, [province]);

  useEffect(() => {
    logState({
      state: addressChangeState,
      groupLabel: "AddressChange",
    });
  }, [addressChangeState]);

  ////

  const {
    globalState: { themeObject },
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

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let isMounted = true;
    // TODO UNCOMMENT BELOW AFTER USEWRAPFETCH REFACTOR
    // abortControllerRef.current?.abort();
    // abortControllerRef.current = new AbortController();
    const controller = new AbortController();

    async function addressChangeFormSubmit() {
      try {
        addressChangeDispatch({
          type: addressChangeAction.setIsSubmitting,
          payload: true,
        });

        openSubmitSuccessNotificationModal();

        const url: URL = urlBuilder({
          path: "actions/company/address-change",
        });

        const body = JSON.stringify({
          addressChangeSchema:
            country === "Canada"
              ? {
                  contactNumber,
                  addressLine,
                  city,
                  province,
                  country,
                  postalCode,
                  acknowledgement: isAcknowledged,
                }
              : {
                  contactNumber,
                  addressLine,
                  city,
                  state,
                  country,
                  postalCode,
                  acknowledgement: isAcknowledged,
                },
        });

        const requestInit: RequestInit = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        };

        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: controller.signal,
          url,
        });

        const data: ResourceRequestServerResponse<AddressChangeDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data?.message ?? "Unknown error. Please try again later.");
        }

        addressChangeDispatch({
          type: addressChangeAction.setIsSuccessful,
          payload: true,
        });
        addressChangeDispatch({
          type: addressChangeAction.setIsSubmitting,
          payload: false,
        });
        addressChangeDispatch({
          type: addressChangeAction.setTriggerFormSubmit,
          payload: false,
        });
      } catch (error: any) {
        if (!isMounted || error?.name === "AbortError") {
          return;
        }

        showBoundary(error);
      }
    }

    if (triggerFormSubmit) {
      addressChangeFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  useEffect(() => {
    const isStepInError =
      !addressLine.length ||
      !city.length ||
      !postalCode.length ||
      !contactNumber ||
      !isAcknowledged;

    addressChangeDispatch({
      type: addressChangeAction.setStepsInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 0,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addressLineTextInput = (
    <AccessibleTextInput
      attributes={{
        name: "address line",
        value: addressLine,
        parentDispatch: addressChangeDispatch,
        invalidValueAction: addressChangeAction.setStepsInError,
        validValueAction: addressChangeAction.setAddressLine,
        regex: ADDRESS_LINE_REGEX,
        step: 0,
        validationTexts: createAddressValidationTexts({
          name: "address line",
          value: addressLine,
        }),
      }}
    />
  );

  const cityTextInput = (
    <AccessibleTextInput
      attributes={{
        name: "city",
        value: city,
        parentDispatch: addressChangeDispatch,
        invalidValueAction: addressChangeAction.setStepsInError,
        validValueAction: addressChangeAction.setCity,
        regex: CITY_REGEX,
        step: 0,
        validationTexts: createCityValidationTexts({
          name: "city",
          value: city,
        }),
      }}
    />
  );

  const contactNumberInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: addressChangeAction.setStepsInError,
        name: "contact number",
        parentDispatch: addressChangeDispatch,
        regex: PHONE_NUMBER_REGEX,
        step: 0,
        validationTexts: createPhoneNumberValidationTexts({
          name: "contact number",
          value: contactNumber,
        }),
        validValueAction: addressChangeAction.setContactNumber,
        value: contactNumber,
      }}
    />
  );

  const postalCodeInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: addressChangeAction.setStepsInError,
        name: "postal code",
        parentDispatch: addressChangeDispatch,
        regex: country === "Canada" ? POSTAL_CODE_REGEX_CANADA : POSTAL_CODE_REGEX_US,
        step: 0,
        validationTexts: createPostalCodeValidationTexts({
          country,
          name: "postal code",
          value: postalCode,
        }),
        validValueAction: addressChangeAction.setPostalCode,
        value: postalCode,
      }}
    />
  );

  // const acknowledgementCheckbox = (
  //   <AccessibleCheckboxInputSingle
  //     attributes={{
  //       checked: isAcknowledged,
  //       invalidValueAction: addressChangeAction.setStepsInError,
  //       name: "acknowledgement",
  //       parentDispatch: addressChangeDispatch,
  //       step: 0,
  //       validValueAction: addressChangeAction.setIsAcknowledged,
  //       value: isAcknowledged ? "true" : "false",
  //     }}
  //   />
  // );
  const acknowledgementSwitch = (
    <AccessibleSwitchInput<
      AddressChangeAction["setIsAcknowledged"],
      AddressChangeAction["setStepsInError"]
    >
      attributes={{
        checked: isAcknowledged,
        invalidValueAction: addressChangeAction.setStepsInError,
        name: "acknowledgement",
        offLabel: "No",
        onLabel: "Yes",
        parentDispatch: addressChangeDispatch,
        step: 0,
        switchOffDescription: "I do not acknowledge",
        switchOnDescription: "I acknowledge that the information entered is correct",
        validValueAction: addressChangeAction.setIsAcknowledged,
        value: isAcknowledged ? "Yes" : "No",
      }}
    />
  );

  const countrySelectInput = (
    <AccessibleSelectInput<AddressChangeAction["setCountry"], Country>
      attributes={{
        data: COUNTRIES_DATA,
        name: "country",
        parentDispatch: addressChangeDispatch,
        validValueAction: addressChangeAction.setCountry,
      }}
    />
  );

  const provinceOrStateSelectInput =
    country === "Canada" ? (
      <AccessibleSelectInput<AddressChangeAction["setProvince"], Province>
        attributes={{
          data: PROVINCES,
          name: "province",
          parentDispatch: addressChangeDispatch,
          validValueAction: addressChangeAction.setProvince,
        }}
      />
    ) : (
      <AccessibleSelectInput<AddressChangeAction["setState"], StatesUS>
        attributes={{
          data: STATES_US,
          name: "state",
          parentDispatch: addressChangeDispatch,
          validValueAction: addressChangeAction.setState,
        }}
      />
    );

  const submitButton = (
    <AccessibleButton
      attributes={{
        name: "submit",
        onClick: (_event: MouseEvent<HTMLButtonElement>) => {
          addressChangeDispatch({
            type: addressChangeAction.setTriggerFormSubmit,
            payload: true,
          });
        },
        disabled: stepsInError.size > 0 || triggerFormSubmit,
        enabledTooltipText: "All inputs are valid. Click to submit form",
        disabledTooltipText: "Please fix errors before submitting form",
      }}
    />
  );

  const createdAddressChangeForm = (
    <FormLayoutWrapper>
      {contactNumberInput}
      {countrySelectInput}
      {addressLineTextInput}
      {cityTextInput}
      {provinceOrStateSelectInput}
      {postalCodeInput}
      {acknowledgementSwitch}
    </FormLayoutWrapper>
  );

  const displayAddressChangeForm =
    currentStepperPosition === 0 ? createdAddressChangeForm : submitButton;

  // declared here as postal code regex is dependent on country
  const ADDRESS_CHANGE_INPUTS_REGEXES: InputsRegexes = {
    "address line": {
      fullRegex: ADDRESS_LINE_REGEX,
      partialRegexes: [
        [
          // (?=.{2,75}$) - positive lookahead assertion ensures that the string is between 2 and 75 characters long
          /^(?=.{2,75}$)/,
          "Address line must be between 2 and 75 characters length",
        ],
        [
          /^[A-Za-z0-9\s.,#-]+$/,
          "Address line must contain only letters, numbers, spaces, and special characters: . , # -",
        ],
      ],
    },
    city: {
      fullRegex: CITY_REGEX,
      partialRegexes: [
        [/^(?=.{2,75}$)/, "City must be between 2 and 75 characters length"],
        [
          /^[A-Za-z\s.\-']+$/,
          "Can only contain alphabetical characters, spaces, periods, or hyphens.",
        ],
      ],
    },
    "contact number": {
      fullRegex: /^(?=.{10,15}$)/,
      partialRegexes: [
        [/^(?=.{10,15}$)/, "Contact number must be between 10 and 15 digits length."],
        [/^\d{10,15}$/, "Contact number must only contain numbers."],
      ],
    },
    "postal code":
      country === "Canada"
        ? {
            fullRegex: /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/i,
            partialRegexes: [
              [
                /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/i,
                "Postal code must be in the format A1A 1A1.",
              ],
              [/^[A-Za-z0-9]+$/, "Must only contain letters and numbers."],
            ],
          }
        : {
            fullRegex: /^\d{5}(?:[-]\d{4})?$/,
            partialRegexes: [
              [/^\d{5}$/, "Must be a valid US zip code of five digits."],
              [
                /^\d{5}[-]\d{4}$/,
                "Must be a valid US zip code of the ZIP+4 format with five digits, a hyphen, and four additional digits.",
              ],
              [/^[0-9-]+$/, "Must only contain numbers and a hyphen."],
            ],
          },
    acknowledgement: {
      fullRegex: /^(true)$/,
      partialRegexes: [
        [/^(true)$/, "Must acknowledge that the information entered is correct."],
      ],
    },
  };

  const addressChange = (
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

  return addressChange;

  //
  //
}

export default AddressChange;

/**
 * // following are the accessible text elements for screen readers to read out based on the state of the input
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

  const [acknowledgementInputSelectedText, acknowledgementInputDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: isAcknowledged,
      semanticName: "acknowledgement",
      selectedDescription: "I acknowledge that the information is correct",
      deselectedDescription: "I do not acknowledge",
    });
 * // following are info objects for input creators
  const countrySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: COUNTRIES_DATA,
    description: "Select your country",
    label: "Country",
    value: country,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      addressChangeDispatch({
        type: addressChangeAction.setCountry,
        payload: event.currentTarget.value as Country,
      });
      addressChangeDispatch({
        type: addressChangeAction.setAddressLine,
        payload: "",
      });
      addressChangeDispatch({
        type: addressChangeAction.setCity,
        payload: "",
      });
      addressChangeDispatch({
        type: addressChangeAction.setPostalCode,
        payload: "",
      });
    },
    required: true,
    withAsterisk: true,
  };

  const provinceOrStateSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: country === "Canada" ? PROVINCES : STATES_US,
    description: country === "Canada" ? "Select your province" : "Select your state",
    label: country === "Canada" ? "Province" : "State",
    value: country === "Canada" ? province : state,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      country === "Canada"
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
    label: "Address Line",
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
    placeholder: "Enter your city",
    required: true,
    withAsterisk: true,
    semanticName: "city",

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
    label: country === "Canada" ? "Postal Code" : "Zip Code",
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      const isValidPostal =
        country === "Canada"
          ? POSTAL_CODE_REGEX_CANADA.test(postalCode)
          : POSTAL_CODE_REGEX_US.test(postalCode);

      if (country === "Canada") {
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
        type: addressChangeAction.setPostalCode,
        payload:
          country === "Canada"
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
        case "Canada": {
          if (event.key === "Backspace" && postalCode.length === 4) {
            addressChangeDispatch({
              type: addressChangeAction.setPostalCode,
              payload: postalCode.slice(0, 3),
            });
          }
          break;
        }
        case "United States": {
          if (event.key === "Backspace" && postalCode.length === 7) {
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
      country === "Canada" ? "Enter Canadian postal code" : "Enter US postal code",
    semanticName: "postal code",

    minLength: country === "Canada" ? 6 : 5,
    maxLength: country === "Canada" ? 7 : 10,

    required: true,
    withAsterisk: true,
  };

  const contactNumberTextInputCreatorInfo: AccessiblePhoneNumberTextInputCreatorInfo = {
    description: {
      error: contactNumberInputErrorText,
      valid: contactNumberInputValidText,
    },
    inputText: contactNumber,
    isValidInputText: isValidContactNumber,
    label: "Personal Contact Number",
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      const isValidContact = PHONE_NUMBER_REGEX.test(contactNumber);

      const contactLength = contactNumber.length;
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
      if (event.key === "Backspace") {
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
    placeholder: "Enter personal contact number",
    rightSection: true,
    rightSectionOnClick: () => {
      addressChangeDispatch({
        type: addressChangeAction.setContactNumber,
        payload: "+(1)",
      });
    },
    semanticName: "contact number",
    minLength: 18,
    maxLength: 18,

    required: true,
    withAsterisk: true,
    initialInputValue: "+(1)",
  };

  const acknowledgementCheckboxCreatorInfo: AccessibleCheckboxSingleInputCreatorInfo = {
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
    semanticName: "acknowledgement",
    label: "Acknowledgement",
    required: true,
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "address change form submit button",
    semanticName: "submit button",
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

  const [createdContactNumberTextInput] = returnAccessiblePhoneNumberTextInputElements([
    contactNumberTextInputCreatorInfo,
  ]);

  const [createdCountrySelectInput, createdProvinceOrStateSelectInput] =
    returnAccessibleSelectInputElements([
      countrySelectInputCreatorInfo,
      provinceOrStateSelectInputCreatorInfo,
    ]);

  const [createdAcknowledgementCheckbox] = returnAccessibleCheckboxSingleInputElements([
    acknowledgementCheckboxCreatorInfo,
  ]);

  const ADDRESS_CHANGE_REVIEW_OBJECT: FormReviewObjectArray = {
    "Contact Details": [
      {
        inputName: "Personal Contact Number",
        inputValue: contactNumber,
        isInputValueValid: isValidContactNumber,
      },
      {
        inputName: "Country",
        inputValue: country,
        isInputValueValid: true,
      },
      {
        inputName: "Address Line",
        inputValue: addressLine,
        isInputValueValid: isValidAddressLine,
      },
      {
        inputName: "City",
        inputValue: city,
        isInputValueValid: isValidCity,
      },
      {
        inputName: country === "Canada" ? "Province" : "State",
        inputValue: country === "Canada" ? province : state,
        isInputValueValid: true,
      },
      {
        inputName: country === "Canada" ? "Postal Code" : "Zip Code",
        inputValue: postalCode,
        isInputValueValid: isValidPostalCode,
      },
      {
        inputName: "Acknowledgement",
        inputValue: isAcknowledged ? "Yes" : "No",
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

  const [createdSubmitButton] = returnAccessibleButtonElements([submitButtonCreatorInfo]);
  const displaySubmitButton =
    currentStepperPosition === ADDRESS_CHANGE_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? "Please fix errors before submitting form"
            : "Submit Address Change form"
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/company/address-change/display");
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

  const textInputAccessible = (
    <AccessibleTextInput
      attributes={{
        inputText: addressLine,
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          addressChangeDispatch({
            type: addressChangeAction.setAddressLine,
            payload: event.currentTarget.value,
          });
        },
        placeholder: "Enter your address",
        regex: ADDRESS_LINE_REGEX,
        regexValidationText: returnAddressValidationText({
          content: addressLine,
          contentKind: "address line",
          minLength: 2,
          maxLength: 75,
        }),
        semanticName: "address line",
      }}
    />
  );

  const createdAddressChangeForm = (
    <FormLayoutWrapper>
      {createdContactNumberTextInput}
      {createdCountrySelectInput}
      {textInputAccessible}
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

  const addressChange = (
    <StepperWrapper
      childrenTitle="Address change"
      currentStepperPosition={currentStepperPosition}
      setCurrentStepperPosition={addressChangeAction.setCurrentStepperPosition}
      descriptionObjectsArray={ADDRESS_CHANGE_DESCRIPTION_OBJECTS}
      maxStepperPosition={ADDRESS_CHANGE_MAX_STEPPER_POSITION}
      parentComponentDispatch={addressChangeDispatch}
      stepsInError={stepsInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayAddressChangeForm}
    </StepperWrapper>
  );

  return addressChange;
 */
