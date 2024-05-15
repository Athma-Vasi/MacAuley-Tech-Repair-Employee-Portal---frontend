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
import { globalAction } from "../../../context/globalProvider/state";
import { useGlobalState, useWrapFetch } from "../../../hooks";

import {
  Country,
  Province,
  ResourceRequestServerResponse,
  StatesUS,
} from "../../../types";
import { logState, urlBuilder } from "../../../utils";
import FormReviewPage, {
  FormReviewObjectArray,
} from "../../formReviewPage/FormReviewPage";
import { NotificationModal } from "../../notificationModal";
import {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from "../../wrappers";
import {
  ADDRESS_CHANGE_DESCRIPTION_OBJECTS,
  ADDRESS_CHANGE_MAX_STEPPER_POSITION,
  COUNTRIES_DATA,
} from "../constants";
import { initialAddressChangeState } from "./state";
import { AddressChangeDocument, AddressChangeState } from "./types";
import {
  AccessibleTextInput,
  AccessibleTextInputAttributes,
} from "../../wrappers/AccessibleTextInput";
import { NumberInputWrapper } from "../../wrappers/NumberInputWrapper";
import { addressChangeReducer } from "./reducers";
import { AddressChangeAction, addressChangeAction } from "./actions";
import {
  createAddressValidationTexts,
  createCityValidationTexts,
  createPhoneNumberValidationTexts,
  createPostalCodeValidationTexts,
} from "../../../utils/validations";
import { AccessibleSelectInputAttributes } from "../../wrappers/AccessibleSelectInput";
import { AccessibleCheckboxInputSingleAttributes } from "../../wrappers/AccessibleCheckboxInput";
import { AccessibleButtonAttributes } from "../../wrappers/AccessibleButton";
import {
  createAccessibleButtons,
  createAccessibleCheckboxSingleInputs,
  createAccessibleSelectInputs,
  createAccessibleTextInputs,
  createAccessibleTextInputsPostal,
} from "../../wrappers/utils";
import { AccessibleTextInputPostal } from "../../wrappers/AccessibleTextInputPostal";

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

  useEffect(() => {
    if (province === "British Columbia") {
      throw new Error("ERROR from AddressChange");
    }
  }, [province]);

  useEffect(() => {
    logState({
      state: addressChangeState,
      groupLabel: "AddressChange",
    });
  }, [addressChangeState]);

  ////

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

  const postalCodeInputAttributes: AccessibleTextInputAttributes<
    AddressChangeAction["setPostalCode"],
    AddressChangeAction["setStepsInError"]
  > = {
    name: "postal code",
    value: postalCode,
    parentDispatch: addressChangeDispatch,
    invalidValueAction: addressChangeAction.setStepsInError,
    validValueAction: addressChangeAction.setPostalCode,
    regex: POSTAL_CODE_REGEX_CANADA,
    step: 0,
    validationTexts: createPostalCodeValidationTexts({
      country,
      name: "postal code",
      value: postalCode,
    }),
  };

  const contactNumberInputAttributes: AccessibleTextInputAttributes<
    AddressChangeAction["setContactNumber"],
    AddressChangeAction["setStepsInError"]
  > = {
    name: "contact number",
    value: contactNumber,
    parentDispatch: addressChangeDispatch,
    invalidValueAction: addressChangeAction.setStepsInError,
    validValueAction: addressChangeAction.setContactNumber,
    regex: PHONE_NUMBER_REGEX,
    step: 0,
    validationTexts: createPhoneNumberValidationTexts({
      name: "contact number",
      value: contactNumber,
    }),
  };

  const provinceSelectInputAttributes: AccessibleSelectInputAttributes<
    AddressChangeAction["setProvince"],
    Province
  > = {
    data: PROVINCES,
    name: "province",
    parentDispatch: addressChangeDispatch,
    validValueAction: addressChangeAction.setProvince,
    value: province,
  };

  const stateSelectInputAttributes: AccessibleSelectInputAttributes<
    AddressChangeAction["setState"],
    StatesUS
  > = {
    data: STATES_US,
    name: "state",
    parentDispatch: addressChangeDispatch,
    validValueAction: addressChangeAction.setState,
    value: state,
  };

  const countrySelectInputAttributes: AccessibleSelectInputAttributes<
    AddressChangeAction["setCountry"],
    Country
  > = {
    data: COUNTRIES_DATA,
    name: "country",
    parentDispatch: addressChangeDispatch,
    validValueAction: addressChangeAction.setCountry,
    value: country,
  };

  const submitButtonAttributes: AccessibleButtonAttributes = {
    name: "submit button",
    onClick: (_event: MouseEvent<HTMLButtonElement>) => {
      addressChangeDispatch({
        type: addressChangeAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    disabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const [addressLineTextInput, cityTextInput] = createAccessibleTextInputs([
    {
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
    },
    {
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
    },
  ]);

  const [acknowledgementCheckbox] = createAccessibleCheckboxSingleInputs([
    {
      checked: isAcknowledged,
      name: "acknowledgement",
      parentDispatch: addressChangeDispatch,
      validValueAction: addressChangeAction.setIsAcknowledged,
      value: isAcknowledged ? "true" : "false",
    },
  ]);

  const [countrySelectInput] = createAccessibleSelectInputs<
    AddressChangeAction["setCountry"],
    Country
  >([
    {
      data: COUNTRIES_DATA,
      name: "country",
      parentDispatch: addressChangeDispatch,
      validValueAction: addressChangeAction.setCountry,
    },
  ]);

  const [provinceOrStateSelectInput] =
    country === "Canada"
      ? createAccessibleSelectInputs<AddressChangeAction["setProvince"], Province>([
          {
            data: PROVINCES,
            name: "province",
            parentDispatch: addressChangeDispatch,
            validValueAction: addressChangeAction.setProvince,
          },
        ])
      : createAccessibleSelectInputs<AddressChangeAction["setState"], StatesUS>([
          {
            data: STATES_US,
            name: "state",
            parentDispatch: addressChangeDispatch,
            validValueAction: addressChangeAction.setState,
          },
        ]);

  const [submitButton] = createAccessibleButtons([
    {
      name: "submit",
      onClick: (_event: MouseEvent<HTMLButtonElement>) => {
        addressChangeDispatch({
          type: addressChangeAction.setTriggerFormSubmit,
          payload: true,
        });
      },
    },
  ]);

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
