import '../../index.css';

import { Button, Flex, Group, Text } from '@mantine/core';
import { MouseEvent, useEffect, useReducer } from 'react';
import { TbUpload } from 'react-icons/tb';
import { Link } from 'react-router-dom';

import { axiosInstance } from '../../api/axios';
import {
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  DATE_OF_BIRTH_REGEX,
  DATE_REGEX,
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
  USERNAME_REGEX,
} from '../../constants/regex';
import { returnAccessibleButtonElements } from '../../jsxCreators';
import { UserSchema } from '../../types';
import { Loading } from '../loading';
import {
  AccessibleButtonCreatorInfo,
  FormLayoutWrapper,
  StepperWrapper,
} from '../wrappers';
import {
  REGISTER_DESCRIPTION_OBJECTS,
  REGISTER_MAX_STEPPER_POSITION,
  REGISTER_URL,
} from './constants';
import { RegisterStepAdditional } from './registerStepAdditional/RegisterStepAdditional';
import { RegisterStepAddress } from './registerStepAddress/RegisterStepAddress';
import { RegisterStepAuthentication } from './registerStepAuthentication/RegisterStepAuthentication';
import { RegisterStepPersonal } from './registerStepPersonal/RegisterStepPersonal';
import { RegisterStepReview } from './registerStepReview/RegisterStepReview';
import { initialRegisterState, registerAction, registerReducer } from './state';

function Register() {
  const [registerState, registerDispatch] = useReducer(
    registerReducer,
    initialRegisterState
  );
  const {
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
    stepsInError,

    isError,
    errorMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
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
    dateOfBirth,
    contactNumber,
    addressLine,
    city,
    postalCode,
    fullName,
    phoneNumber,
    startDate,
  ]);

  useEffect(() => {
    async function handleRegisterFormSubmit() {
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
        DATE_OF_BIRTH_REGEX.test(dateOfBirth),
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

      console.log('finalRegexTest', finalRegexTest);

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
        roles: ['Employee'],
        active: true,
        completedSurveys: [],
        isPrefersReducedMotion: false,
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

        const response = await axiosInstance(axiosConfig);

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
      } finally {
        registerDispatch({
          type: registerAction.setIsSubmitting,
          payload: false,
        });

        controller.abort();
      }
    }

    if (triggerFormSubmit) {
      handleRegisterFormSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Submit',
    semanticDescription: 'register form submit button',
    semanticName: 'submit button',
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      registerDispatch({
        type: registerAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
  };

  const [createdSubmitButton] = returnAccessibleButtonElements([
    submitButtonCreatorInfo,
  ]);
  const displaySubmitButton =
    currentStepperPosition === REGISTER_MAX_STEPPER_POSITION ? (
      <Flex align="center" justify="center" w="100%">
        {createdSubmitButton}
      </Flex>
    ) : null;

  const displayRegisterComponentPage =
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
      stepsInError={stepsInError}
      descriptionObjectsArray={REGISTER_DESCRIPTION_OBJECTS}
      maxStepperPosition={REGISTER_MAX_STEPPER_POSITION}
      currentStepperPosition={currentStepperPosition}
      setCurrentStepperPosition={registerAction.setCurrentStepperPosition}
      parentComponentDispatch={registerDispatch}
    >
      {displayRegisterComponentPage}
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
      {/* display form */}
      {displayRegisterForm}

      {/* display login link */}
      <Flex align="center" justify="center" columnGap="sm" w="100%">
        <Text color="dark">Already have an account?</Text>
        <Text color="blue">
          <Link to="/login">Login</Link>
        </Text>
      </Flex>
    </Flex>
  );

  useEffect(() => {
    console.group('Register component mounted');
    Object.entries(registerState).forEach(([key, value]) => {
      console.log(`${key}: `, JSON.stringify(value, null, 2));
    });
    console.groupEnd();
  }, [registerState]);

  return <>{displayRegisterComponent}</>;
}

export default Register;
