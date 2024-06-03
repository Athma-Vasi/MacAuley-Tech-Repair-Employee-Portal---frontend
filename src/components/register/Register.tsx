import { Container, Stack, Text } from "@mantine/core";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import {
  COUNTRIES_DATA,
  DEPARTMENT_DATA,
  JOB_POSITION_DATA,
  PROVINCES,
  STATES_US,
  STORE_LOCATION_DATA,
} from "../../constants/data";
import { useFetchInterceptor } from "../../hooks/useFetchInterceptor";
import {
  Country,
  Department,
  JobPosition,
  PreferredPronouns,
  Province,
  StatesUS,
  StoreLocation,
} from "../../types";
import { formSubmitPOST, logState } from "../../utils";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleDateTimeInput } from "../accessibleInputs/AccessibleDateTimeInput";
import { AccessiblePasswordInput } from "../accessibleInputs/AccessiblePasswordInput";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleStepper } from "../accessibleInputs/AccessibleStepper";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { RegisterAction, registerAction } from "./actions";
import { PREFERRED_PRONOUNS_DATA, returnRegisterStepperPages } from "./constants";
import { registerReducer } from "./reducers";
import { initialRegisterState } from "./state";

function Register() {
  const [registerState, registerDispatch] = useReducer(
    registerReducer,
    initialRegisterState
  );

  const {
    addressLine,
    city,
    confirmPassword,
    contactNumber,
    country,
    dateOfBirth,
    department,
    email,
    emergencyContactName,
    emergencyContactNumber,
    firstName,
    isSubmitting,
    isSuccessful,
    jobPosition,
    lastName,
    middleName,
    pagesInError,
    password,
    postalCode,
    preferredName,
    preferredPronouns,
    profilePictureUrl,
    province,
    startDate,
    state,
    storeLocation,
    triggerFormSubmit,
    username,
  } = registerState;

  const { fetchInterceptor } = useFetchInterceptor();
  const { showBoundary } = useErrorBoundary();

  const fetchAbortControllerRef = useRef<AbortController | null>(null);
  const preFetchAbortControllerRef = useRef<AbortController | null>(null);
  const isComponentMountedRef = useRef(false);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    preFetchAbortControllerRef.current?.abort();
    preFetchAbortControllerRef.current = new AbortController();
    const preFetchAbortController = preFetchAbortControllerRef.current;

    isComponentMountedRef.current = true;
    let isComponentMounted = isComponentMountedRef.current;

    if (triggerFormSubmit) {
      // const schema =
      // formSubmitPOST({
      //   dispatch: registerDispatch,
      //   fetchAbortController,
      //   fetchInterceptor,
      //   isComponentMounted,
      //   isSubmittingAction: registerAction.setIsSubmitting,
      //   isSuccessfulAction: registerAction.setIsSuccessful,
      //   preFetchAbortController,
      //   roleResourceRoutePaths: ADDRESS_CHANGE_ROLE_PATHS,
      //   schema,
      //   schemaName: "registerSchema",
      //   sessionId,
      //   showBoundary,
      //   userId,
      //   username,
      //   userRole: "manager",
      // });
    }

    return () => {
      isComponentMountedRef.current = false;
      preFetchAbortController?.abort();
      fetchAbortController?.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  if (isSubmitting) {
    const submittingState = (
      <Stack>
        <Text size="md">Submitting address changes! Please wait...</Text>
      </Stack>
    );

    return submittingState;
  }

  if (isSuccessful) {
    const successfulState = (
      <Stack>
        <Text size="md">Address changes submitted successfully!</Text>
      </Stack>
    );

    return successfulState;
  }

  const registerStepperPages = returnRegisterStepperPages(country);

  const addressLineTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "addressLine",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setAddressLine,
        value: addressLine,
      }}
    />
  );

  const cityTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "city",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setCity,
        value: city,
      }}
    />
  );

  const confirmPasswordTextInput = (
    <AccessiblePasswordInput<
      RegisterAction["setConfirmPassword"],
      RegisterAction["setPageInError"]
    >
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "confirmPassword",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setConfirmPassword,
        value: confirmPassword,
      }}
    />
  );

  const contactNumberTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "contactNumber",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setContactNumber,
        value: contactNumber,
      }}
    />
  );

  const countrySelectInput = (
    <AccessibleSelectInput<RegisterAction["setCountry"], Country>
      attributes={{
        data: COUNTRIES_DATA,
        name: "country",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setCountry,
        value: country,
      }}
    />
  );

  const dateOfBirthTextInput = (
    <AccessibleDateTimeInput
      attributes={{
        dateKind: "full date",
        inputKind: "date",
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "dateOfBirth",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setDateOfBirth,
        value: dateOfBirth,
      }}
    />
  );

  const departmentSelectInput = (
    <AccessibleSelectInput<RegisterAction["setDepartment"], Department>
      attributes={{
        data: DEPARTMENT_DATA,
        name: "department",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setDepartment,
        value: department,
      }}
    />
  );

  const emailTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "email",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setEmail,
        value: email,
      }}
    />
  );

  const emergencyContactNameTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "emergencyContactName",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setEmergencyContactName,
        value: emergencyContactName,
      }}
    />
  );

  const emergencyContactNumberTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "emergencyContactNumber",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setEmergencyContactNumber,
        value: emergencyContactNumber,
      }}
    />
  );

  const firstNameTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "firstName",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setFirstName,
        value: firstName,
      }}
    />
  );

  const jobPositionSelectInput = (
    <AccessibleSelectInput<RegisterAction["setJobPosition"], JobPosition>
      attributes={{
        data: JOB_POSITION_DATA,
        name: "jobPosition",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setJobPosition,
        value: jobPosition,
      }}
    />
  );

  const lastNameTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "lastName",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setLastName,
        value: lastName,
      }}
    />
  );

  const middleNameTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "middleName",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setMiddleName,
        value: middleName,
      }}
    />
  );

  const passwordTextInput = (
    <AccessiblePasswordInput<
      RegisterAction["setPassword"],
      RegisterAction["setPageInError"]
    >
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "password",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setPassword,
        value: password,
      }}
    />
  );

  const postalCodeTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "postalCode",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setPostalCode,
        value: postalCode,
      }}
    />
  );

  const preferredNameTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "preferredName",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setPreferredName,
        value: preferredName,
      }}
    />
  );

  const preferredPronounsSelectInput = (
    <AccessibleSelectInput<RegisterAction["setPreferredPronouns"], PreferredPronouns>
      attributes={{
        data: PREFERRED_PRONOUNS_DATA,
        name: "preferredPronouns",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setPreferredPronouns,
        value: preferredPronouns,
      }}
    />
  );

  const profilePictureUrlTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "profilePictureUrl",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setProfilePictureUrl,
        value: profilePictureUrl,
      }}
    />
  );

  const provinceOrStateSelectInput =
    country === "Canada" ? (
      <AccessibleSelectInput<RegisterAction["setProvince"], Province>
        attributes={{
          data: PROVINCES,
          name: "province",
          parentDispatch: registerDispatch,
          validValueAction: registerAction.setProvince,
          value: province,
        }}
      />
    ) : (
      <AccessibleSelectInput<RegisterAction["setState"], StatesUS>
        attributes={{
          data: STATES_US,
          name: "state",
          parentDispatch: registerDispatch,
          validValueAction: registerAction.setState,
          value: state,
        }}
      />
    );

  const startDateTextInput = (
    <AccessibleDateTimeInput
      attributes={{
        dateKind: "date near future",
        inputKind: "date",
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "startDate",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setStartDate,
        value: startDate,
      }}
    />
  );

  const storeLocationSelectInput = (
    <AccessibleSelectInput<RegisterAction["setStoreLocation"], StoreLocation>
      attributes={{
        data: STORE_LOCATION_DATA,
        name: "storeLocation",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setStoreLocation,
        value: storeLocation,
      }}
    />
  );

  const usernameTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: registerStepperPages,
        invalidValueAction: registerAction.setPageInError,
        name: "username",
        parentDispatch: registerDispatch,
        validValueAction: registerAction.setUsername,
        value: username,
      }}
    />
  );

  const authenticationPage = (
    <Stack>
      {emailTextInput}
      {usernameTextInput}
      {passwordTextInput}
      {confirmPasswordTextInput}
    </Stack>
  );

  const personalPage = (
    <Stack>
      {firstNameTextInput}
      {middleNameTextInput}
      {lastNameTextInput}
      {preferredNameTextInput}
      {preferredPronounsSelectInput}
      {profilePictureUrlTextInput}
      {dateOfBirthTextInput}
    </Stack>
  );

  const addressPage = (
    <Stack>
      {addressLineTextInput}
      {cityTextInput}
      {provinceOrStateSelectInput}
      {postalCodeTextInput}
      {countrySelectInput}
      {contactNumberTextInput}
    </Stack>
  );

  const additionalPage = (
    <Stack>
      {jobPositionSelectInput}
      {departmentSelectInput}
      {storeLocationSelectInput}
      {emergencyContactNameTextInput}
      {emergencyContactNumberTextInput}
      {startDateTextInput}
    </Stack>
  );

  const submitButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "All inputs are valid. Click to Register.",
        disabledScreenreaderText: "Please fix errors before registering.",
        disabled: pagesInError.size > 0 || triggerFormSubmit,
        kind: "submit",
        name: "submit",
        onClick: (_event: React.MouseEvent<HTMLButtonElement>) => {
          registerDispatch({
            action: registerAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: registerState,
        pageElements: [authenticationPage, personalPage, addressPage, additionalPage],
        stepperPages: registerStepperPages,
        submitButton,
      }}
    />
  );

  logState({
    state: registerState,
    groupLabel: "Register State",
  });

  return <Container w={700}>{stepper}</Container>;
}

export default Register;

/**
 * const {
    email,
    isValidEmail,
    isEmailFocused,
    isEmailExists,

    username,
    isValidUsername,
    isUsernameFocused,
    isUsernameExists,

    password,
    isValidPassword,
    isPasswordFocused,

    confirmPassword,
    isValidConfirmPassword,
    isConfirmPasswordFocused,

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

    preferredPronouns,
    profilePictureUrl,
    isValidProfilePictureUrl,
    isProfilePictureUrlFocused,

    dateOfBirth,
    isValidDateOfBirth,
    isDateOfBirthFocused,

    address,
    contactNumber,
    isValidContactNumber,
    isContactNumberFocused,

    jobPosition,
    department,
    storeLocation,
    emergencyContact,

    startDate,
    isValidStartDate,
    isStartDateFocused,

    triggerFormSubmit,
    currentStepperPosition,
    pagesInError,

    isSuccessful,
    successMessage,
    isSubmitting,
    submitMessage,
  } = registerState;
  const {
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
  } = address;
  const {
    fullName,
    isValidFullName,
    isFullNameFocused,
    phoneNumber,
    isValidPhoneNumber,
    isPhoneNumberFocused,
  } = emergencyContact;

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let isMounted = true;
    // before submitting form, abort any previous requests
    abortControllerRef.current?.abort();
    // create new abort controller for current request
    abortControllerRef.current = new AbortController();

    async function handleRegisterFormSubmit() {
      registerDispatch({
        type: registerAction.setIsSubmitting,
        payload: true,
      });
      openSubmitSuccessNotificationModal();

      const newUserObj: UserSchema = {
        email,
        username,
        password,
        firstName,
        middleName,
        lastName,
        preferredName,
        preferredPronouns,
        profilePictureUrl,
        dateOfBirth,
        contactNumber,
        address: { addressLine, city, province, state, postalCode, country },
        jobPosition,
        department,
        storeLocation,
        emergencyContact: { fullName, contactNumber },
        startDate,
        roles: ["Employee"],
        active: true,
        completedSurveys: [],
        isPrefersReducedMotion: false,
      };

      const url: URL = urlBuilder({
        path: "user",
      });

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userSchema: newUserObj,
        }),
        signal: abortControllerRef.current?.signal,
      };

      try {
        const request: Request = new Request(url.toString(), requestInit);
        const response: Response = await fetch(request);

        const data: ResourceRequestServerResponse<UserDocument> = await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        registerDispatch({
          type: registerAction.setIsSuccessful,
          payload: true,
        });

        registerDispatch({
          type: registerAction.setSuccessMessage,
          payload: data.message ?? "User created successfully!",
        });
      } catch (error: any) {
        if (!isMounted || error.name === "AbortError") {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? "Invalid token. Please login again."
            : !error.response
            ? "Network error. Please try again."
            : error?.message ?? "Unknown error occurred. Please try again.";

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate("/register");

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: "",
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          registerDispatch({
            type: registerAction.setIsSubmitting,
            payload: false,
          });
          registerDispatch({
            type: registerAction.setSubmitMessage,
            payload: "",
          });
          registerDispatch({
            type: registerAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleRegisterFormSubmit();
    }

    return () => {
      isMounted = false;
      abortControllerRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  // check if username exists on every valid state change
  useEffect(() => {
    let isMounted = true;
    // before submitting form, abort any previous requests
    abortControllerRef.current?.abort();
    // create new abort controller for current request
    abortControllerRef.current = new AbortController();

    async function handleCheckUsernameExists() {
      registerDispatch({
        type: registerAction.setIsSubmitting,
        payload: true,
      });

      const url: URL = urlBuilder({
        path: "username-email-set/check",
      });

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: { username },
        }),
        signal: abortControllerRef.current?.signal,
      };

      try {
        const request: Request = new Request(url.toString(), requestInit);
        const response: Response = await fetch(request);

        const data: { status: "error" | "success"; message: string } =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        data.status === "error"
          ? registerDispatch({
              type: registerAction.setIsUsernameExists,
              payload: true,
            })
          : registerDispatch({
              type: registerAction.setIsUsernameExists,
              payload: false,
            });
      } catch (error: any) {
        if (!isMounted || error.name === "AbortError") {
          return;
        }

        const errorMessage = !error.response
          ? "Network error. Please try again."
          : error?.message ?? "Unknown error occurred. Please try again.";

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate("/register");

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: "",
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          registerDispatch({
            type: registerAction.setIsSubmitting,
            payload: false,
          });
        }
      }
    }

    if (USERNAME_REGEX.test(username) && username.length > 0) {
      handleCheckUsernameExists();
    }

    return () => {
      isMounted = false;
      abortControllerRef.current?.abort();
    };
  }, [username, isValidUsername, globalDispatch, showBoundary, navigate]);

  // check if email exists on every valid state change
  useEffect(() => {
    let isMounted = true;
    // before submitting form, abort any previous requests
    abortControllerRef.current?.abort();
    // create new abort controller for current request
    abortControllerRef.current = new AbortController();

    async function handleCheckEmailExists() {
      registerDispatch({
        type: registerAction.setIsSubmitting,
        payload: true,
      });

      const url: URL = urlBuilder({
        path: "username-email-set/check",
      });

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: { email },
        }),
        signal: abortControllerRef.current?.signal,
      };

      try {
        const request: Request = new Request(url.toString(), requestInit);
        const response: Response = await fetch(request);

        const data: { status: "error" | "success"; message: string } =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        data.status === "error"
          ? registerDispatch({
              type: registerAction.setIsEmailExists,
              payload: true,
            })
          : registerDispatch({
              type: registerAction.setIsEmailExists,
              payload: false,
            });
      } catch (error: any) {
        if (!isMounted || error.name === "AbortError") {
          return;
        }

        const errorMessage = !error.response
          ? "Network error. Please try again."
          : error?.message ?? "Unknown error occurred. Please try again.";

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate("/register");

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: "",
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          registerDispatch({
            type: registerAction.setIsSubmitting,
            payload: false,
          });
        }
      }
    }

    if (EMAIL_REGEX.test(email) && email.length > 0) {
      handleCheckEmailExists();
    }

    return () => {
      isMounted = false;
      abortControllerRef.current?.abort();
    };
  }, [email, isValidEmail, globalDispatch, showBoundary, navigate]);

  useEffect(() => {
    logState({
      state: registerState,
      groupLabel: "Register State",
    });
  }, [registerState]);

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "register form submit button",
    semanticName: "submit button",
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      registerDispatch({
        type: registerAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: pagesInError.size > 0 || triggerFormSubmit,
  };

  const [createdSubmitButton] = returnAccessibleButtonElements([submitButtonCreatorInfo]);
  const displaySubmitButton =
    currentStepperPosition === REGISTER_MAX_STEPPER_POSITION ? (
      <Flex align="center" justify="center" w="100%">
        {createdSubmitButton}
      </Flex>
    ) : null;

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/login");
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

  const displayRegisterComponentPage =
    currentStepperPosition === 0 ? (
      <RegisterStepAuthentication
        email={email}
        isValidEmail={isValidEmail}
        isEmailFocused={isEmailFocused}
        isEmailExists={isEmailExists}
        username={username}
        isValidUsername={isValidUsername}
        isUsernameFocused={isUsernameFocused}
        isUsernameExists={isUsernameExists}
        password={password}
        isValidPassword={isValidPassword}
        isPasswordFocused={isPasswordFocused}
        confirmPassword={confirmPassword}
        isValidConfirmPassword={isValidConfirmPassword}
        isConfirmPasswordFocused={isConfirmPasswordFocused}
        registerAction={registerAction}
        registerDispatch={registerDispatch}
      />
    ) : currentStepperPosition === 1 ? (
      <RegisterStepPersonal
        firstName={firstName}
        isValidFirstName={isValidFirstName}
        isFirstNameFocused={isFirstNameFocused}
        middleName={middleName}
        isValidMiddleName={isValidMiddleName}
        isMiddleNameFocused={isMiddleNameFocused}
        lastName={lastName}
        isValidLastName={isValidLastName}
        isLastNameFocused={isLastNameFocused}
        preferredName={preferredName}
        isValidPreferredName={isValidPreferredName}
        isPreferredNameFocused={isPreferredNameFocused}
        preferredPronouns={preferredPronouns}
        profilePictureUrl={profilePictureUrl}
        isValidProfilePictureUrl={isValidProfilePictureUrl}
        isProfilePictureUrlFocused={isProfilePictureUrlFocused}
        dateOfBirth={dateOfBirth}
        isValidDateOfBirth={isValidDateOfBirth}
        isDateOfBirthFocused={isDateOfBirthFocused}
        registerAction={registerAction}
        registerDispatch={registerDispatch}
      />
    ) : currentStepperPosition === 2 ? (
      <RegisterStepAddress
        contactNumber={contactNumber}
        isValidContactNumber={isValidContactNumber}
        isContactNumberFocused={isContactNumberFocused}
        addressLine={addressLine}
        isValidAddressLine={isValidAddressLine}
        isAddressLineFocused={isAddressLineFocused}
        city={city}
        isValidCity={isValidCity}
        isCityFocused={isCityFocused}
        state={state}
        province={province}
        country={country}
        postalCode={postalCode}
        isValidPostalCode={isValidPostalCode}
        isPostalCodeFocused={isPostalCodeFocused}
        registerAction={registerAction}
        registerDispatch={registerDispatch}
      />
    ) : currentStepperPosition === 3 ? (
      <RegisterStepAdditional
        jobPosition={jobPosition}
        department={department}
        storeLocation={storeLocation}
        fullName={fullName}
        isValidFullName={isValidFullName}
        isFullNameFocused={isFullNameFocused}
        phoneNumber={phoneNumber}
        isValidPhoneNumber={isValidPhoneNumber}
        isPhoneNumberFocused={isPhoneNumberFocused}
        startDate={startDate}
        isValidStartDate={isValidStartDate}
        isStartDateFocused={isStartDateFocused}
        registerAction={registerAction}
        registerDispatch={registerDispatch}
      />
    ) : currentStepperPosition === 4 ? (
      <RegisterStepReview
        email={email}
        username={username}
        firstName={firstName}
        middleName={middleName}
        lastName={lastName}
        preferredName={preferredName}
        preferredPronouns={preferredPronouns}
        profilePictureUrl={profilePictureUrl}
        contactNumber={contactNumber}
        addressLine={addressLine}
        city={city}
        state={state}
        province={province}
        country={country}
        postalCode={postalCode}
        jobPosition={jobPosition}
        department={department}
        fullName={fullName}
        phoneNumber={phoneNumber}
        startDate={startDate}
      />
    ) : (
      displaySubmitButton
    );

  const displayRegisterForm = (
    <StepperWrapper
      childrenTitle="Register"
      pagesInError={pagesInError}
      descriptionObjectsArray={REGISTER_DESCRIPTION_OBJECTS}
      maxStepperPosition={REGISTER_MAX_STEPPER_POSITION}
      currentStepperPosition={currentStepperPosition}
      setCurrentStepperPosition={registerAction.setCurrentStepperPosition}
      parentComponentDispatch={registerDispatch}
    >
      {displayRegisterComponentPage}
      {displaySubmitSuccessNotificationModal}
    </StepperWrapper>
  );

  const displayRegisterComponent = (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      rowGap="lg"
      w="100%"
      h="100%"
    >
      {displayRegisterForm}

      <Flex align="center" justify="center" columnGap="sm" w="100%">
        <Text color="dark">Already have an account?</Text>
        <Text color="blue">
          <Link to="/login">Login</Link>
        </Text>
      </Flex>
    </Flex>
  );

  return displayRegisterComponent;

 */
