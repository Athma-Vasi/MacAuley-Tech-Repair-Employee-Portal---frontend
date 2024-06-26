import { Container, Group, Stack, Text } from "@mantine/core";
import { MouseEvent, useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { COUNTRIES_DATA, PROVINCES, STATES_US } from "../../../constants/data";
import { useAuth } from "../../../hooks";
import { useFetchInterceptor } from "../../../hooks/useFetchInterceptor";
import { Country, Province, StatesUS, StepperPage } from "../../../types";
import { formSubmitPOST, logState } from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleStepper } from "../../accessibleInputs/AccessibleStepper";
import { AccessibleSwitchInput } from "../../accessibleInputs/AccessibleSwitchInput";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import { ADDRESS_CHANGE_ROLE_PATHS, returnAddressChangeStepperPages } from "../constants";
import { AddressChangeAction, addressChangeAction } from "./actions";
import { addressChangeReducer } from "./reducers";
import { initialAddressChangeState } from "./state";

function AddressChange() {
  const [addressChangeState, addressChangeDispatch] = useReducer(
    addressChangeReducer,
    initialAddressChangeState
  );

  const {
    acknowledgement,
    addressLine,
    city,
    contactNumber,
    country,
    isSubmitting,
    isSuccessful,
    pagesInError,
    postalCode,
    province,
    state,
    triggerFormSubmit,
  } = addressChangeState;

  useEffect(() => {
    logState({
      state: addressChangeState,
      groupLabel: "AddressChange",
    });
  }, [addressChangeState]);

  const {
    authState: { sessionId, userId, username },
  } = useAuth();
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
      const schema =
        country === "Canada"
          ? {
              contactNumber,
              addressLine,
              city,
              province,
              country,
              postalCode,
              acknowledgement: acknowledgement,
            }
          : {
              contactNumber,
              addressLine,
              city,
              state,
              country,
              postalCode,
              acknowledgement: acknowledgement,
            };

      formSubmitPOST({
        dispatch: addressChangeDispatch,
        fetchAbortController,
        fetchInterceptor,
        isComponentMounted,
        isSubmittingAction: addressChangeAction.setIsSubmitting,
        isSuccessfulAction: addressChangeAction.setIsSuccessful,
        preFetchAbortController,
        roleResourceRoutePaths: ADDRESS_CHANGE_ROLE_PATHS,
        schema,
        schemaName: "addressChangeSchema",
        sessionId,
        showBoundary,
        userId,
        username,
        userRole: "manager",
      });
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

  const ADDRESS_CHANGE_STEPPER_PAGES: StepperPage[] =
    returnAddressChangeStepperPages(country);

  const addressLineTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: ADDRESS_CHANGE_STEPPER_PAGES,
        invalidValueAction: addressChangeAction.setPageInError,
        name: "addressLine",
        parentDispatch: addressChangeDispatch,
        validValueAction: addressChangeAction.setAddressLine,
        value: addressLine,
      }}
    />
  );

  const cityTextInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: ADDRESS_CHANGE_STEPPER_PAGES,
        invalidValueAction: addressChangeAction.setPageInError,
        name: "city",
        parentDispatch: addressChangeDispatch,
        validValueAction: addressChangeAction.setCity,
        value: city,
      }}
    />
  );

  const contactNumberInput = (
    <AccessibleTextInput
      attributes={{
        stepperPages: ADDRESS_CHANGE_STEPPER_PAGES,
        invalidValueAction: addressChangeAction.setPageInError,
        name: "contactNumber",
        parentDispatch: addressChangeDispatch,
        validValueAction: addressChangeAction.setContactNumber,
        value: contactNumber,
      }}
    />
  );

  const postalCodeInput = (
    <AccessibleTextInput
      attributes={{
        validValueAction: addressChangeAction.setPostalCode,
        stepperPages: ADDRESS_CHANGE_STEPPER_PAGES,
        invalidValueAction: addressChangeAction.setPageInError,
        name: "postalCode",
        parentDispatch: addressChangeDispatch,
        value: postalCode,
      }}
    />
  );

  const acknowledgementSwitch = (
    <AccessibleSwitchInput<
      AddressChangeAction["setAcknowledgement"],
      AddressChangeAction["setPageInError"]
    >
      attributes={{
        checked: acknowledgement,
        invalidValueAction: addressChangeAction.setPageInError,
        name: "acknowledgement",
        offLabel: "No",
        onLabel: "Yes",
        parentDispatch: addressChangeDispatch,
        switchOffDescription: "I do not acknowledge",
        switchOnDescription: "I acknowledge that the information entered is correct",
        validValueAction: addressChangeAction.setAcknowledgement,
        value: acknowledgement ? "Yes" : "No",
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
        value: country,
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
          value: province,
        }}
      />
    ) : (
      <AccessibleSelectInput<AddressChangeAction["setState"], StatesUS>
        attributes={{
          data: STATES_US,
          name: "state",
          parentDispatch: addressChangeDispatch,
          validValueAction: addressChangeAction.setState,
          value: state,
        }}
      />
    );

  const submitButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "All inputs are valid. Click to submit form",
        disabledScreenreaderText: "Please fix errors before submitting form",
        disabled: pagesInError.size > 0 || triggerFormSubmit,
        kind: "submit",
        name: "submit",
        onClick: (_event: MouseEvent<HTMLButtonElement>) => {
          addressChangeDispatch({
            action: addressChangeAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const addressChangeForm = (
    <Group w="100%">
      {contactNumberInput}
      {countrySelectInput}
      {addressLineTextInput}
      {cityTextInput}
      {provinceOrStateSelectInput}
      {postalCodeInput}
      {acknowledgementSwitch}
    </Group>
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: addressChangeState,
        invalidValueAction: addressChangeAction.setPageInError,
        pageElements: [addressChangeForm],
        parentDispatch: addressChangeDispatch,
        stepperPages: ADDRESS_CHANGE_STEPPER_PAGES,
        submitButton,
        title: "Address Change",
      }}
    />
  );

  return <Container w={700}>{stepper}</Container>;
}

export default AddressChange;
