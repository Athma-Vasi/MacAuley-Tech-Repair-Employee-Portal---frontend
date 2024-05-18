import { Container, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MouseEvent, useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { PROVINCES, STATES_US } from "../../../constants/data";
import { useFetchInterceptor } from "../../../hooks/useFetchInterceptor";
import {
  Country,
  Province,
  ResourceRequestServerResponse,
  StatesUS,
  StepperPage,
} from "../../../types";
import { logState, urlBuilder } from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleStepper } from "../../accessibleInputs/AccessibleStepper";
import { AccessibleSwitchInput } from "../../accessibleInputs/AccessibleSwitchInput";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import { NotificationModal } from "../../notificationModal";
import { COUNTRIES_DATA, returnAddressChangeStepperPages } from "../constants";
import { AddressChangeAction, addressChangeAction } from "./actions";
import { addressChangeReducer } from "./reducers";
import { initialAddressChangeState } from "./state";
import { AddressChangeDocument } from "./types";

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
    acknowledgement,
    triggerFormSubmit,
    pagesInError,
    isSubmitting,
    isSuccessful,
  } = addressChangeState;

  useEffect(() => {
    logState({
      state: addressChangeState,
      groupLabel: "AddressChange",
    });
  }, [addressChangeState]);

  const { fetchInterceptor } = useFetchInterceptor();
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  const fetchAbortControllerRef = useRef<AbortController | null>(null);
  const preFetchAbortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    fetchAbortControllerRef.current?.abort();
    fetchAbortControllerRef.current = new AbortController();
    const fetchAbortController = fetchAbortControllerRef.current;

    preFetchAbortControllerRef.current?.abort();
    preFetchAbortControllerRef.current = new AbortController();
    const preFetchAbortController = preFetchAbortControllerRef.current;

    let isMounted = true;

    async function addressChangeFormSubmit() {
      try {
        addressChangeDispatch({
          type: addressChangeAction.setIsSubmitting,
          payload: true,
        });

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
                },
        });

        const requestInit: RequestInit = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        };

        const response: Response = await fetchInterceptor({
          fetchAbortController,
          isMounted,
          preFetchAbortController,
          requestInit,
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
      fetchAbortController?.abort();
      preFetchAbortController?.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  useEffect(() => {
    if (isSuccessful) {
      setTimeout(() => {
        navigate("/home/company/address-change");
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessful]);

  const submittingState = (
    <Stack>
      <Text size="md">Submitting address changes! Please wait...</Text>
    </Stack>
  );

  if (isSubmitting) {
    return submittingState;
  }

  const successfulState = (
    <Stack>
      <Text size="md">Address changes submitted successfully!</Text>
    </Stack>
  );

  if (isSuccessful) {
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
        enabledScreenreaderText: "All inputs are valid. Click to submit form",
        disabledScreenreaderText: "Please fix errors before submitting form",
        disabled: pagesInError.size > 0 || triggerFormSubmit,
        name: "submit",
        onClick: (_event: MouseEvent<HTMLButtonElement>) => {
          addressChangeDispatch({
            type: addressChangeAction.setTriggerFormSubmit,
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
        pageElements: [addressChangeForm],
        stepperPages: ADDRESS_CHANGE_STEPPER_PAGES,
        submitButton,
        title: "Address Change",
      }}
    />
  );

  return <Container w={700}>{stepper}</Container>;
}

export default AddressChange;
