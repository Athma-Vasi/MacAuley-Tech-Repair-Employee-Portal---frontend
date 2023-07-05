import { useEffect, useRef, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Group, Text, Title } from '@mantine/core';

import {
  COLORS,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from '../../constants';
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  DATE_REGEX,
  FULL_NAME_REGEX,
  NAME_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
  REGISTER_URL,
} from './constants';
import { initialRegisterState, registerAction, registerReducer } from './state';
import '../../index.css';
import { axiosInstance } from '../../api/axios';
import { RegisterResponse } from './types';
import { Loading } from '../loading';
import { CustomError } from '../customError';
import { Success } from '../success';
import { StepperWrapper } from './stepperWrapper/StepperWrapper';
import { RegisterStepAuthentication } from './registerStepAuthentication/RegisterStepAuthentication';
import { RegisterStepPersonal } from './registerStepPersonal/RegisterStepPersonal';
import { RegisterStepAddress } from './registerStepAddress/RegisterStepAddress';
import { RegisterStepAdditional } from './registerStepAdditional/RegisterStepAdditional';

function Register() {
  const [
    {
      email,
      isValidEmail,
      isEmailFocused,

      username,
      isValidUsername,
      isUsernameFocused,

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

      address,
      contactNumber,
      isValidContactNumber,
      isContactNumberFocused,

      jobPosition,
      department,
      emergencyContact,

      startDate,
      isValidStartDate,
      isStartDateFocused,

      currentStepperPosition,
      isError,
      errorMessage,
      isSuccessful,
      successMessage,
      isLoading,
      loadingMessage,
      isSubmitting,
      submitMessage,
    },
    registerDispatch,
  ] = useReducer(registerReducer, initialRegisterState);
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

  const errorRef = useRef<HTMLDivElement>(null);

  // removes error message after every change in values of input fields in dependency array
  useEffect(() => {
    registerDispatch({
      type: registerAction.setErrorMessage,
      payload: '',
    });
  }, [
    email,
    username,
    password,
    confirmPassword,
    firstName,
    middleName,
    lastName,
    preferredName,
    contactNumber,
    addressLine,
    city,
    postalCode,
    fullName,
    phoneNumber,
    startDate,
  ]);

  const displayError = (
    <CustomError
      ref={errorRef}
      message={errorMessage}
      link={{
        address: '/login',
        text: 'Back to login',
      }}
      isError={errorMessage ? true : false}
    />
  );

  const displaySuccess = (
    <Success
      message="You have successfully registered!"
      link={{ address: '/login', text: 'Click here to login' }}
      isSuccessful={isSuccessful}
    />
  );

  const displayLoading = <Loading dataDirection="load" />;

  async function handleRegisterFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    // ~sanity~ safety check
    const finalRegexTest = [
      EMAIL_REGEX.test(email),
      USERNAME_REGEX.test(username),
      PASSWORD_REGEX.test(password),
      password === confirmPassword,
      NAME_REGEX.test(firstName),
      NAME_REGEX.test(middleName),
      NAME_REGEX.test(lastName),
      NAME_REGEX.test(preferredName),
      PHONE_NUMBER_REGEX.test(contactNumber),
      ADDRESS_LINE_REGEX.test(addressLine),
      CITY_REGEX.test(city),
      country === 'Canada'
        ? POSTAL_CODE_REGEX_CANADA.test(postalCode)
        : POSTAL_CODE_REGEX_US.test(postalCode),
      FULL_NAME_REGEX.test(fullName),
      PHONE_NUMBER_REGEX.test(phoneNumber),
      DATE_REGEX.test(startDate),
    ];

    // if any field is invalid, display error message and return
    if (finalRegexTest.includes(false)) {
      registerDispatch({
        type: registerAction.setErrorMessage,
        payload: 'Please fill out all fields correctly',
      });
      return;
    }

    const newUserObj = {
      email,
      username,
      password,
    };

    const controller = new AbortController();
    const { signal } = controller;

    try {
      registerDispatch({
        type: registerAction.setIsSubmitting,
        payload: true,
      });

      const axiosConfig = {
        method: 'post',
        signal,
        url: REGISTER_URL,
        data: newUserObj,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const response = await axiosInstance<RegisterResponse>(axiosConfig);

      const { status } = response;

      if (status === 201) {
        registerDispatch({
          type: registerAction.setIsSuccessful,
          payload: true,
        });
        registerDispatch({
          type: registerAction.setErrorMessage,
          payload: '',
        });
        return;
      }
    } catch (error: any) {
      if (!error.response) {
        registerDispatch({
          type: registerAction.setErrorMessage,
          payload: 'Network error',
        });
      } else {
        registerDispatch({
          type: registerAction.setErrorMessage,
          payload: error.response.data.message,
        });
      }

      errorRef.current?.focus();
    } finally {
      registerDispatch({
        type: registerAction.setIsSubmitting,
        payload: false,
      });

      controller.abort();
    }
  }

  const displayAuthenticationStep =
    currentStepperPosition === 0 ? (
      <RegisterStepAuthentication
        email={email}
        isValidEmail={isValidEmail}
        isEmailFocused={isEmailFocused}
        username={username}
        isValidUsername={isValidUsername}
        isUsernameFocused={isUsernameFocused}
        password={password}
        isValidPassword={isValidPassword}
        isPasswordFocused={isPasswordFocused}
        confirmPassword={confirmPassword}
        isValidConfirmPassword={isValidConfirmPassword}
        isConfirmPasswordFocused={isConfirmPasswordFocused}
        registerAction={registerAction}
        registerDispatch={registerDispatch}
      />
    ) : null;

  const displayPersonalStep =
    currentStepperPosition === 1 ? (
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
        registerAction={registerAction}
        registerDispatch={registerDispatch}
      />
    ) : null;

  const displayAddressStep =
    currentStepperPosition === 2 ? (
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
    ) : null;

  const displayAdditionalStep =
    currentStepperPosition === 3 ? (
      <RegisterStepAdditional
        jobPosition={jobPosition}
        department={department}
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
    ) : null;

  const { buttonTextColor } = COLORS;

  const displayRegisterForm = (
    <Flex
      direction="column"
      align="flex-start"
      justify="space-between"
      rowGap="lg"
      w="100%"
      h="100%"
    >
      <StepperWrapper
        currentStepperPosition={currentStepperPosition}
        registerAction={registerAction}
        registerDispatch={registerDispatch}
      />
      <form onSubmit={handleRegisterFormSubmit} style={{ width: '100%' }}>
        <Flex
          direction="column"
          align="flex-start"
          justify="center"
          rowGap="lg"
          w="100%"
        >
          <Title
            order={3}
            color={buttonTextColor}
            style={{ letterSpacing: '0.10rem' }}
          >
            Register
          </Title>
          {/* first step */}
          {displayAuthenticationStep}

          {/* second step */}
          {displayPersonalStep}

          {/* third step : address*/}
          {displayAddressStep}

          {/* fourth step */}
          {displayAdditionalStep}

          {/* stepper nav buttons */}
          <Group position="center" mt="xl">
            <Button
              variant="default"
              disabled={currentStepperPosition === 0}
              onClick={() => {
                const currentStep = currentStepperPosition;
                registerDispatch({
                  type: registerAction.setCurrentStepperPosition,
                  payload: currentStep > 0 ? currentStep - 1 : currentStep + 1,
                });
              }}
            >
              Back
            </Button>
            <Button
              disabled={currentStepperPosition === 4}
              onClick={() => {
                const currentStep = currentStepperPosition;
                registerDispatch({
                  type: registerAction.setCurrentStepperPosition,
                  payload: currentStep < 4 ? currentStep + 1 : currentStep - 1,
                });
              }}
            >
              Next step
            </Button>
          </Group>

          {/* register button */}
          <Flex w="100%" justify="flex-end">
            <Button
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.currentTarget.click();
                }
              }}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  event.currentTarget.blur();
                }
              }}
              tabIndex={0}
              type="submit"
              disabled={
                !isValidEmail ||
                !isValidUsername ||
                !isValidPassword ||
                !isValidConfirmPassword
                  ? true
                  : false
              }
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </form>

      {/*  */}
      <Flex align="center" justify="center" columnGap="sm" w="100%">
        <Text color="dark">Already have an account?</Text>
        <Text color="blue">
          <Link to="/login">Login</Link>
        </Text>
      </Flex>
    </Flex>
  );

  return (
    <Flex w={375} p="sm" h="100%">
      {errorMessage
        ? displayError
        : isSubmitting
        ? displayLoading
        : isSuccessful
        ? displaySuccess
        : displayRegisterForm}
    </Flex>
  );
}

export { Register };
