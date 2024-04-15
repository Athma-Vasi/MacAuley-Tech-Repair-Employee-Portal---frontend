import {
  Group,
  Image,
  Modal,
  Pagination,
  Space,
  Stack,
  Switch,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, Fragment, KeyboardEvent, MouseEvent, useEffect } from "react";
import { TbClearAll, TbQuestionMark, TbSearch } from "react-icons/tb";

import { COLORS_SWATCHES, PROVINCES, STATES_US } from "../../../../constants/data";
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  NAME_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
  USERNAME_REGEX,
} from "../../../../constants/regex";
import { ActionsDocuments } from "../../../../context/globalProvider/types";
import { useGlobalState } from "../../../../hooks";
import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleRadioSingleInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextInputElements,
} from "../../../../jsxCreators";
import { Country, PhoneNumber, PostalCode, Province, StatesUS } from "../../../../types";
import {
  returnAddressValidationText,
  returnCityValidationText,
  returnEmailValidationText,
  returnNameValidationText,
  returnPhoneNumberValidationText,
  returnPostalCodeValidationText,
  returnThemeColors,
  returnUsernameRegexValidationText,
  splitCamelCase,
} from "../../../../utils";
import { COUNTRIES_DATA } from "../../../addressChange/constants";
import { CustomerDocument } from "../../../customer/types";
import { FormLayoutWrapper, ImageWrapper } from "../../../wrappers";
import {
  CreateRepairTicketAction,
  CreateRepairTicketDispatch,
  CurrentSearchObject,
  CustomerSearchOperator,
} from "../types";
import {
  displayResourceDocument,
  OPERATOR_SWITCH_HELP_MODAL_CONTENT,
  returnFilteredDocuments,
} from "../utils";
import { TiDelete } from "react-icons/ti";

type RepairTicketStepCustomerProps = {
  actionsDocuments: ActionsDocuments | null;
  currentSearchObject: CurrentSearchObject;
  customerSearchResults: Omit<CustomerDocument, "password" | "paymentInformation">[];
  searchOperator: CustomerSearchOperator;
  clearSearchInputs: boolean;
  customerId: string;
  currentSearchResultPage: number;
  deleteSearchObjectField: string;

  username: string;
  isValidUsername: boolean;
  isUsernameFocused: boolean;

  email: string;
  isValidEmail: boolean;
  isEmailFocused: boolean;

  firstName: string;
  isValidFirstName: boolean;
  isFirstNameFocused: boolean;

  middleName: string;
  isValidMiddleName: boolean;
  isMiddleNameFocused: boolean;

  lastName: string;
  isValidLastName: boolean;
  isLastNameFocused: boolean;

  preferredName: string;
  isValidPreferredName: boolean;
  isPreferredNameFocused: boolean;

  contactNumber: PhoneNumber | string;
  isValidContactNumber: boolean;
  isContactNumberFocused: boolean;

  addressLine: string;
  isValidAddressLine: boolean;
  isAddressLineFocused: boolean;

  city: string;
  isValidCity: boolean;
  isCityFocused: boolean;

  country: Country;
  province: Province;
  state: StatesUS;

  postalCode: PostalCode;
  isValidPostalCode: boolean;
  isPostalCodeFocused: boolean;

  createRepairTicketAction: CreateRepairTicketAction;
  createRepairTicketDispatch: React.Dispatch<CreateRepairTicketDispatch>;
};

function RepairTicketStepCustomer(parentState: RepairTicketStepCustomerProps) {
  const {
    actionsDocuments,
    currentSearchObject,
    customerSearchResults,
    searchOperator,
    clearSearchInputs,
    customerId,
    currentSearchResultPage,
    deleteSearchObjectField,

    username,
    isValidUsername,
    isUsernameFocused,

    email,
    isValidEmail,
    isEmailFocused,

    firstName,
    isValidFirstName,
    isFirstNameFocused,

    middleName,
    isValidMiddleName,
    isMiddleNameFocused,

    lastName,
    isValidLastName,
    isLastNameFocused,

    preferredName,
    isValidPreferredName,
    isPreferredNameFocused,

    contactNumber,
    isValidContactNumber,
    isContactNumberFocused,

    addressLine,
    isValidAddressLine,
    isAddressLineFocused,

    city,
    isValidCity,
    isCityFocused,

    country,
    province,
    state,

    postalCode,
    isValidPostalCode,
    isPostalCodeFocused,

    createRepairTicketAction,
    createRepairTicketDispatch,
  } = parentState;

  const {
    globalState: { themeObject, padding, width },
  } = useGlobalState();

  const [
    openedOperatorSwitchHelpModal,
    { open: openOperatorSwitchHelpModal, close: closeOperatorSwitchHelpModal },
  ] = useDisclosure(false);

  // input validations

  useEffect(() => {
    const isValid = USERNAME_REGEX.test(username);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidUsername,
      payload: isValid,
    });
  }, [createRepairTicketAction.setIsValidUsername, createRepairTicketDispatch, username]);

  useEffect(() => {
    const isValid = EMAIL_REGEX.test(email);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidEmail,
      payload: isValid,
    });
  }, [createRepairTicketAction.setIsValidEmail, createRepairTicketDispatch, email]);

  useEffect(() => {
    const isValid = NAME_REGEX.test(firstName);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidFirstName,
      payload: isValid,
    });
  }, [
    createRepairTicketAction.setIsValidFirstName,
    createRepairTicketDispatch,
    firstName,
  ]);

  useEffect(() => {
    const isValid = NAME_REGEX.test(middleName);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidMiddleName,
      payload: isValid,
    });
  }, [
    createRepairTicketAction.setIsValidMiddleName,
    createRepairTicketDispatch,
    middleName,
  ]);

  useEffect(() => {
    const isValid = NAME_REGEX.test(lastName);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidLastName,
      payload: isValid,
    });
  }, [createRepairTicketAction.setIsValidLastName, createRepairTicketDispatch, lastName]);

  useEffect(() => {
    const isValid = FULL_NAME_REGEX.test(preferredName);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidPreferredName,
      payload: isValid,
    });
  }, [
    createRepairTicketAction.setIsValidPreferredName,
    createRepairTicketDispatch,
    preferredName,
  ]);

  useEffect(() => {
    const isValidContact = PHONE_NUMBER_REGEX.test(contactNumber);

    const contactLength = contactNumber.length;
    if (isContactNumberFocused) {
      switch (contactLength) {
        case 4: {
          createRepairTicketDispatch({
            type: createRepairTicketAction.setContactNumber,
            payload: `${contactNumber}(`,
          });
          break;
        }
        case 8: {
          createRepairTicketDispatch({
            type: createRepairTicketAction.setContactNumber,
            payload: `${contactNumber}) `,
          });
          break;
        }
        case 13: {
          createRepairTicketDispatch({
            type: createRepairTicketAction.setContactNumber,
            payload: `${contactNumber}-`,
          });
          break;
        }

        default:
          break;
      }
    }

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidContactNumber,
      payload: isValidContact,
    });
  }, [
    contactNumber,
    createRepairTicketAction.setContactNumber,
    createRepairTicketAction.setIsValidContactNumber,
    createRepairTicketDispatch,
    isContactNumberFocused,
  ]);

  useEffect(() => {
    const isValid = ADDRESS_LINE_REGEX.test(addressLine);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidAddressLine,
      payload: isValid,
    });
  }, [
    addressLine,
    createRepairTicketAction.setIsValidAddressLine,
    createRepairTicketDispatch,
  ]);

  useEffect(() => {
    const isValid = CITY_REGEX.test(city);

    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidCity,
      payload: isValid,
    });
  }, [city, createRepairTicketAction.setIsValidCity, createRepairTicketDispatch]);

  useEffect(() => {
    const isValid =
      country === "Canada"
        ? POSTAL_CODE_REGEX_CANADA.test(postalCode)
        : POSTAL_CODE_REGEX_US.test(postalCode);

    if (country === "Canada") {
      const postalCodeLength = postalCode.length;
      if (postalCodeLength === 3) {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setPostalCode,
          payload: `${postalCode} `,
        });
      } else if (postalCodeLength === 7) {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setPostalCode,
          payload: postalCode.trim(),
        });
      }
    } else {
      const postalCodeLength = postalCode.length;
      if (postalCodeLength === 6) {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setPostalCode,
          payload: `${postalCode.slice(0, 5)}-${postalCode.slice(5)}`,
        });
      }
    }
    createRepairTicketDispatch({
      type: createRepairTicketAction.setIsValidPostalCode,
      payload: isValid,
    });
  }, [
    country,
    createRepairTicketAction.setIsValidPostalCode,
    createRepairTicketAction.setPostalCode,
    createRepairTicketDispatch,
    postalCode,
  ]);

  useEffect(() => {
    const areCustomerSearchFieldsInError =
      (username !== "" && !isValidUsername) ||
      (email !== "" && !isValidEmail) ||
      (firstName !== "" && !isValidFirstName) ||
      (middleName !== "" && !isValidMiddleName) ||
      (lastName !== "" && !isValidLastName) ||
      (preferredName !== "" && !isValidPreferredName) ||
      (contactNumber !== "+(1)" && !isValidContactNumber) ||
      (addressLine !== "" && !isValidAddressLine) ||
      (city !== "" && !isValidCity) ||
      (postalCode !== "" && !isValidPostalCode);

    const isPage1InError =
      !areCustomerSearchFieldsInError && customerId.length ? false : true;

    createRepairTicketDispatch({
      type: createRepairTicketAction.setStepsInError,
      payload: {
        kind: isPage1InError ? "add" : "delete",
        step: 0,
      },
    });
  }, [
    addressLine,
    city,
    contactNumber,
    createRepairTicketAction.setStepsInError,
    createRepairTicketDispatch,
    customerId,
    email,
    firstName,
    isValidAddressLine,
    isValidCity,
    isValidContactNumber,
    isValidEmail,
    isValidFirstName,
    isValidLastName,
    isValidMiddleName,
    isValidPostalCode,
    isValidPreferredName,
    isValidUsername,
    lastName,
    middleName,
    postalCode,
    preferredName,
    username,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //    input creation
  // ╚═════════════════════════════════════════════════════════════════╝

  const {
    appThemeColors: { borderColor },
    generalColors: { themeColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  const [usernameInputErrorText, usernameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "username",
      inputText: username,
      isInputTextFocused: isUsernameFocused,
      isValidInputText: isValidUsername,
      regexValidationText: returnUsernameRegexValidationText({
        content: username,
        contentKind: "username",
      }),
    });

  const [createdUsernameTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: usernameInputErrorText,
        valid: usernameInputValidText,
      },
      inputText: username,
      isValidInputText: isValidUsername,
      label: "Username",
      maxLength: 30,
      minLength: 3,
      onBlur: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsUsernameFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setUsername,
          payload: event.currentTarget.value,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCurrentSearchObject,
          payload: {
            [event.currentTarget.name]: event.currentTarget.value,
          } as CurrentSearchObject,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: [],
        });
      },
      onFocus: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsUsernameFocused,
          payload: true,
        });
      },
      placeholder: "Enter username",
      required: true,
      semanticName: "username",
    },
  ]);

  const [emailInputErrorText, emailInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "email",
    inputText: email,
    isInputTextFocused: isEmailFocused,
    isValidInputText: isValidEmail,
    regexValidationText: returnEmailValidationText({
      content: email,
      contentKind: "email",
    }),
  });

  const [createdEmailTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: emailInputErrorText,
        valid: emailInputValidText,
      },
      inputText: email,
      isValidInputText: isValidEmail,
      label: "Email",
      onBlur: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsEmailFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setEmail,
          payload: event.currentTarget.value,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCurrentSearchObject,
          payload: {
            [event.currentTarget.name]: event.currentTarget.value,
          } as CurrentSearchObject,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: [],
        });
      },
      onFocus: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsEmailFocused,
          payload: true,
        });
      },
      placeholder: "Enter email",
      required: true,
      semanticName: "email",
    },
  ]);

  const [firstNameInputErrorText, firstNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "first name",
      inputText: firstName,
      isInputTextFocused: isFirstNameFocused,
      isValidInputText: isValidFirstName,
      regexValidationText: returnNameValidationText({
        content: firstName,
        contentKind: "first name",
        maxLength: 30,
        minLength: 2,
      }),
    });

  const [createdFirstNameTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: firstNameInputErrorText,
        valid: firstNameInputValidText,
      },
      inputText: firstName,
      isValidInputText: isValidFirstName,
      label: "First Name",
      maxLength: 30,
      minLength: 2,
      name: "firstName",
      onBlur: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsFirstNameFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setFirstName,
          payload: event.currentTarget.value,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCurrentSearchObject,
          payload: {
            [event.currentTarget.name]: event.currentTarget.value,
          } as CurrentSearchObject,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: [],
        });
      },
      onFocus: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsFirstNameFocused,
          payload: true,
        });
      },
      placeholder: "Enter first name",
      required: true,
      semanticName: "first name",
    },
  ]);

  const [middleNameInputErrorText, middleNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "middle name",
      inputText: middleName,
      isInputTextFocused: isMiddleNameFocused,
      isValidInputText: isValidMiddleName,
      regexValidationText: returnNameValidationText({
        content: middleName,
        contentKind: "middle name",
        maxLength: 30,
        minLength: 2,
      }),
    });

  const [createdMiddleNameTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: middleNameInputErrorText,
        valid: middleNameInputValidText,
      },
      inputText: middleName,
      isValidInputText: isValidMiddleName,
      label: "Middle Name",
      maxLength: 30,
      minLength: 2,
      name: "middleName",
      onBlur: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsMiddleNameFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setMiddleName,
          payload: event.currentTarget.value,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCurrentSearchObject,
          payload: {
            [event.currentTarget.name]: event.currentTarget.value,
          } as CurrentSearchObject,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: [],
        });
      },
      onFocus: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsMiddleNameFocused,
          payload: true,
        });
      },
      placeholder: "Enter middle name",
      required: true,
      semanticName: "middle name",
    },
  ]);

  const [lastNameInputErrorText, lastNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "last name",
      inputText: lastName,
      isInputTextFocused: isLastNameFocused,
      isValidInputText: isValidLastName,
      regexValidationText: returnNameValidationText({
        content: lastName,
        contentKind: "last name",
        maxLength: 30,
        minLength: 2,
      }),
    });

  const [createdLastNameTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: lastNameInputErrorText,
        valid: lastNameInputValidText,
      },
      inputText: lastName,
      isValidInputText: isValidLastName,
      label: "Last Name",
      maxLength: 30,
      minLength: 2,
      name: "lastName",
      onBlur: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsLastNameFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setLastName,
          payload: event.currentTarget.value,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCurrentSearchObject,
          payload: {
            [event.currentTarget.name]: event.currentTarget.value,
          } as CurrentSearchObject,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: [],
        });
      },
      onFocus: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsLastNameFocused,
          payload: true,
        });
      },
      placeholder: "Enter last name",
      required: true,
      semanticName: "last name",
    },
  ]);

  const [preferredNameInputErrorText, preferredNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "preferred name",
      inputText: preferredName,
      isInputTextFocused: isPreferredNameFocused,
      isValidInputText: isValidPreferredName,
      regexValidationText: returnNameValidationText({
        content: preferredName,
        contentKind: "preferred name",
        maxLength: 100,
        minLength: 2,
      }),
    });

  const [createdPreferredNameTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: preferredNameInputErrorText,
        valid: preferredNameInputValidText,
      },
      inputText: preferredName,
      isValidInputText: isValidPreferredName,
      label: "Preferred Name",
      maxLength: 100,
      minLength: 2,
      name: "preferredName",
      onBlur: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsPreferredNameFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setPreferredName,
          payload: event.currentTarget.value,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCurrentSearchObject,
          payload: {
            [event.currentTarget.name]: event.currentTarget.value,
          } as CurrentSearchObject,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: [],
        });
      },
      onFocus: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsPreferredNameFocused,
          payload: true,
        });
      },
      placeholder: "Enter preferred name",
      required: true,
      semanticName: "preferred name",
    },
  ]);

  const [contactNumberInputErrorText, contactNumberInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "contact number",
      inputText: contactNumber,
      isInputTextFocused: isContactNumberFocused,
      isValidInputText: isValidContactNumber,
      regexValidationText: returnPhoneNumberValidationText({
        content: contactNumber,
        contentKind: "contact number",
      }),
    });

  const [createdContactNumberTextInput] = returnAccessiblePhoneNumberTextInputElements([
    {
      description: {
        error: contactNumberInputErrorText,
        valid: contactNumberInputValidText,
      },
      inputText: contactNumber,
      isValidInputText: isValidContactNumber,
      label: "Contact Number",
      name: "contactNumber",
      onBlur: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsContactNumberFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setContactNumber,
          payload: event.currentTarget.value,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCurrentSearchObject,
          payload: {
            [event.currentTarget.name]: event.currentTarget.value,
          } as CurrentSearchObject,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: [],
        });
      },
      onFocus: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsContactNumberFocused,
          payload: true,
        });
      },
      placeholder: "Enter contact number",
      required: true,
      rightSection: true,
      rightSectionOnClick: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setContactNumber,
          payload: "+(1)",
        });
      },
      withAsterisk: true,
      semanticName: "contact number",
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace") {
          if (contactNumber.length === 14 || contactNumber.length === 9) {
            createRepairTicketDispatch({
              type: createRepairTicketAction.setContactNumber,
              payload: contactNumber.slice(0, -1),
            });
          }
        }
      },
    },
  ]);

  // error/valid text elements
  const [addressLineInputErrorText, addressLineInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "address line",
      inputText: addressLine,
      isInputTextFocused: isAddressLineFocused,
      isValidInputText: isValidAddressLine,
      regexValidationText: returnAddressValidationText({
        content: addressLine,
        contentKind: "address line",
      }),
    });

  const [createdAddressLineTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: addressLineInputErrorText,
        valid: addressLineInputValidText,
      },
      inputText: addressLine,
      isValidInputText: isValidAddressLine,
      label: "Address Line",
      name: "addressLine",
      onBlur: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsAddressLineFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setAddressLine,
          payload: event.currentTarget.value,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCurrentSearchObject,
          payload: {
            [event.currentTarget.name]: event.currentTarget.value,
          } as CurrentSearchObject,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: [],
        });
      },
      onFocus: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsAddressLineFocused,
          payload: true,
        });
      },
      placeholder: "Enter address line",
      required: true,
      semanticName: "address line",
    },
  ]);

  const [cityInputErrorText, cityInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "city",
    inputText: city,
    isInputTextFocused: isCityFocused,
    isValidInputText: isValidCity,
    regexValidationText: returnCityValidationText({
      content: city,
      contentKind: "city",
    }),
  });

  const [createdCityTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: cityInputErrorText,
        valid: cityInputValidText,
      },
      inputText: city,
      isValidInputText: isValidCity,
      label: "City",
      name: "city",
      onBlur: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsCityFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setCity,
          payload: event.currentTarget.value,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCurrentSearchObject,
          payload: {
            [event.currentTarget.name]: event.currentTarget.value,
          } as CurrentSearchObject,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: [],
        });
      },
      onFocus: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsCityFocused,
          payload: true,
        });
      },
      placeholder: "Enter city",
      required: true,
      semanticName: "city",
    },
  ]);

  const [createdProvinceStateSelectInput] = returnAccessibleSelectInputElements([
    {
      data: country === "Canada" ? PROVINCES : STATES_US,
      description: country === "Canada" ? "Select your province" : "Select your state",
      label: country === "Canada" ? "Province" : "State",
      name: country === "Canada" ? "province" : "state",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        country === "Canada"
          ? createRepairTicketDispatch({
              type: createRepairTicketAction.setProvince,
              payload: event.currentTarget.value as Province,
            })
          : createRepairTicketDispatch({
              type: createRepairTicketAction.setState,
              payload: event.currentTarget.value as StatesUS,
            });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCurrentSearchObject,
          payload: {
            [event.currentTarget.name]: event.currentTarget.value,
          } as CurrentSearchObject,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: [],
        });
      },
      value: country === "Canada" ? province : state,
    },
  ]);

  const [createdCountrySelectInput] = returnAccessibleSelectInputElements([
    {
      description: "Select your country",
      label: "Country",
      name: "country",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setCountry,
          payload: event.currentTarget.value as Country,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCurrentSearchObject,
          payload: {
            [event.currentTarget.name]: event.currentTarget.value,
          } as CurrentSearchObject,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: [],
        });
      },
      data: COUNTRIES_DATA,
      value: country,
      required: true,
    },
  ]);

  const [postalCodeInputErrorText, postalCodeInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "postal code",
      inputText: postalCode,
      isInputTextFocused: isPostalCodeFocused,
      isValidInputText: isValidPostalCode,
      regexValidationText: returnPostalCodeValidationText({
        postalCode,
        country,
      }),
    });

  const [createdPostalCodeTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: postalCodeInputErrorText,
        valid: postalCodeInputValidText,
      },
      inputText: postalCode,
      isValidInputText: isValidPostalCode,
      label: "Postal Code",
      maxLength: country === "Canada" ? 7 : 10,
      minLength: country === "Canada" ? 6 : 5,
      name: "postalCode",
      onBlur: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsPostalCodeFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setPostalCode,
          payload:
            country === "Canada"
              ? event.currentTarget.value.toUpperCase()
              : event.currentTarget.value,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCurrentSearchObject,
          payload: {
            [event.currentTarget.name]: event.currentTarget.value,
          } as CurrentSearchObject,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: [],
        });
      },
      onFocus: () => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setIsPostalCodeFocused,
          payload: true,
        });
      },
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        switch (country) {
          case "Canada": {
            if (event.key === "Backspace" && postalCode.length === 4) {
              createRepairTicketDispatch({
                type: createRepairTicketAction.setPostalCode,
                payload: postalCode.slice(0, 3),
              });
            }
            break;
          }
          case "United States": {
            if (event.key === "Backspace" && postalCode.length === 7) {
              createRepairTicketDispatch({
                type: createRepairTicketAction.setPostalCode,
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
    },
  ]);

  const [
    createdSearchButton,
    createdOperatorSwitchHelpButton,
    createdClearSearchInputsButton,
  ] = returnAccessibleButtonElements([
    // search button
    {
      buttonLabel: "Search",
      buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
        const customerData = actionsDocuments?.customerData ?? [];
        const filteredCustomerDocs = returnFilteredDocuments({
          currentSearchObject,
          documents: customerData,
          searchOperator,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: filteredCustomerDocs,
        });
      },
      leftIcon: <TbSearch />,
      semanticDescription: "Search for customer",
      semanticName: "search button",
    },
    // operator switch help button
    {
      buttonLabel: <TbQuestionMark />,
      buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
        openOperatorSwitchHelpModal();
      },
      semanticDescription: "Help with search chain",
      semanticName: "search chain help button",
    },
    // clear search button
    {
      buttonLabel: "Clear",
      buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.clearSearchInputs,
          payload: !clearSearchInputs,
        });

        createRepairTicketDispatch({
          type: createRepairTicketAction.setCustomerSearchResults,
          payload: [],
        });
      },
      leftIcon: <TbClearAll />,
      semanticDescription: "Clear search inputs",
      semanticName: "clear search inputs button",
    },
  ]);

  const createdSearchButtonWithTooltip = (
    <Tooltip label={"Search for a customer"}>
      <Group>{createdSearchButton}</Group>
    </Tooltip>
  );

  const createdOperatorSwitchInput = (
    <Switch
      checked={searchOperator === "AND"}
      offLabel="OR"
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setSearchOperator,
          payload: event.currentTarget.checked ? "AND" : "OR",
        });
      }}
      onLabel="AND"
      size="lg"
    />
  );

  const createdOperatorSwitchInputWithTooltip = (
    <Tooltip label="Choose between 'AND' and 'OR' operators">
      <Group>{createdOperatorSwitchInput}</Group>
    </Tooltip>
  );

  const createdOperatorSwitchHelpButtonWithTooltip = (
    <Tooltip label="Help with search chain">
      <Group>{createdOperatorSwitchHelpButton}</Group>
    </Tooltip>
  );

  const operatorSwitchModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedOperatorSwitchHelpModal}
      onClose={closeOperatorSwitchHelpModal}
      size={width <= 1024 ? "auto" : 1024 - 200}
      title={<Title order={4}>Search Chain help</Title>}
    >
      {OPERATOR_SWITCH_HELP_MODAL_CONTENT}
    </Modal>
  );
  const clearSearchInputsButtonWithTooltip = (
    <Tooltip label="Clear search inputs">
      <Group>{createdClearSearchInputsButton}</Group>
    </Tooltip>
  );

  const displaySearchInputsButtons = (
    <Group position="apart" spacing={padding} w="100%">
      <Group>
        {createdOperatorSwitchInputWithTooltip}
        {createdOperatorSwitchHelpButtonWithTooltip}
      </Group>

      <Group>
        {clearSearchInputsButtonWithTooltip}
        {createdSearchButtonWithTooltip}
      </Group>
    </Group>
  );

  // input display
  const customerSearchInputs = (
    <FormLayoutWrapper>
      {createdUsernameTextInput}
      {createdEmailTextInput}
      {createdFirstNameTextInput}
      {createdMiddleNameTextInput}
      {createdLastNameTextInput}
      {createdPreferredNameTextInput}
      {createdContactNumberTextInput}
      {createdAddressLineTextInput}
      {createdCityTextInput}
      {createdProvinceStateSelectInput}
      {createdCountrySelectInput}
      {createdPostalCodeTextInput}
      {displaySearchInputsButtons}
    </FormLayoutWrapper>
  );

  const filteredCustomerDocs: Map<[string, string], JSX.Element[]> =
    displayResourceDocument({
      padding,
      documents:
        currentSearchResultPage === 1
          ? customerSearchResults.slice(0, 10)
          : customerSearchResults.slice(
              (currentSearchResultPage - 1) * 10,
              currentSearchResultPage * 10
            ),
      themeObject,
    });

  const customerSearchResultsElements = Array.from(filteredCustomerDocs).map(
    (tuple, index) => {
      const [[documentId, profilePictureUrl], documentElement] = tuple;

      const [customerSelectRadioSingleInput] = returnAccessibleRadioSingleInputElements([
        {
          checked: documentId === customerId,
          description: "",
          semanticName: "customer",
          label: "",
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            createRepairTicketDispatch({
              type: createRepairTicketAction.setCustomerId,
              payload: documentId,
            });
          },
          width: "fit-content",
        },
      ]);

      const customerSelectRadioSingleInputWithTooltip = (
        <Tooltip
          label={
            documentId === customerId
              ? `You have selected customer with id: ${documentId}`
              : `Select customer with id: ${documentId}`
          }
        >
          <Group pr={6}>{customerSelectRadioSingleInput}</Group>
        </Tooltip>
      );

      const themeBorder = `1px solid ${themeColorShade}`;

      const documentHeader = (
        <Group w="100%">
          <Group position="left">
            <ImageWrapper
              creatorInfoObject={{
                customHeight: 125,
                customWidth: 125,
                customRadius: 9999,
                imageAlt: "profile picture",
                imageSrc: profilePictureUrl,
                fit: "cover",
              }}
            />
          </Group>
          <Group position="right">{customerSelectRadioSingleInputWithTooltip}</Group>
        </Group>
      );

      return (
        <Fragment>
          <Stack
            key={index}
            style={{
              border: customerId === documentId ? themeBorder : borderColor,
              borderRadius: 4,
            }}
            p={padding}
            onClick={(_event: MouseEvent<HTMLDivElement>) => {
              createRepairTicketDispatch({
                type: createRepairTicketAction.setCustomerId,
                payload: documentId,
              });
            }}
          >
            <Stack>
              {documentHeader}
              {documentElement}
            </Stack>
          </Stack>
          <Space h="xs" />
        </Fragment>
      );
    }
  );

  const searchObjLen = Object.keys(currentSearchObject).length;
  const searchResultsLen = customerSearchResults.length;

  const displayCustomerSearchResults =
    searchObjLen && searchResultsLen ? (
      customerSearchResultsElements
    ) : searchObjLen && !searchResultsLen ? (
      <Group>
        <Text>There are no search results</Text>
      </Group>
    ) : (
      <Group>
        <Text>Search for a customer to see results</Text>
      </Group>
    );

  const displaySearchObject = Object.entries(currentSearchObject).map((tuple, index) => {
    const [key, value] = tuple;

    const [deleteFieldButton] = returnAccessibleButtonElements([
      {
        buttonLabel: <TiDelete size={20} />,
        buttonOnClick: (_event: MouseEvent<HTMLButtonElement>) => {
          createRepairTicketDispatch({
            type: createRepairTicketAction.deleteSearchObjectField,
            payload: key,
          });
        },
        semanticDescription: "Delete search field",
        semanticName: "delete search field button",
      },
    ]);

    const deleteFieldButtonWithTooltip = (
      <Tooltip label={`Delete field: ${splitCamelCase(key)}`}>
        <Group>{deleteFieldButton}</Group>
      </Tooltip>
    );

    return (
      <Group key={index} pl={padding}>
        {deleteFieldButtonWithTooltip}
        <Text>{splitCamelCase(key)}: </Text>
        <Text>{value}</Text>
      </Group>
    );
  });

  const displaySearchObjectAndOperator = (
    <Stack>
      <Group>
        <Title order={4}>Search Operator</Title>
        <Text>{searchOperator}</Text>
      </Group>
      <Space h="xs" />
      <Stack>
        <Title order={4}>Search Fields</Title>
        {displaySearchObject}
        <Space h="xs" />
      </Stack>
    </Stack>
  );

  const createdPagination = filteredCustomerDocs.size ? (
    <Pagination
      onChange={(value: number) => {
        createRepairTicketDispatch({
          type: createRepairTicketAction.setCurrentSearchResultPage,
          payload: value,
        });
      }}
      total={customerSearchResults.length / 10 + 1}
      value={currentSearchResultPage}
    />
  ) : null;

  const displayRepairTicketStepCustomer = (
    <Group position="apart" w="100%">
      <Title order={4}>Search Customers</Title>
      {customerSearchInputs}
      <Stack>
        {operatorSwitchModal}
        {displaySearchObjectAndOperator}
        <Stack>
          <Title order={4}>Search Results</Title>
          {createdPagination}
          {displayCustomerSearchResults}
        </Stack>
      </Stack>
    </Group>
  );

  return displayRepairTicketStepCustomer;
}

export { RepairTicketStepCustomer };
