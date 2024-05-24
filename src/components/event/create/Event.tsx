import { Container, Stack, Text } from "@mantine/core";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { useAuth } from "../../../hooks";
import { useFetchInterceptor } from "../../../hooks/useFetchInterceptor";
import { StepperPage } from "../../../types";
import { formSubmitPOST } from "../../../utils";
import { AccessibleButton } from "../../accessibleInputs/AccessibleButton";
import { AccessibleDateTimeInput } from "../../accessibleInputs/AccessibleDateTimeInput";
import { AccessibleSelectInput } from "../../accessibleInputs/AccessibleSelectInput";
import { AccessibleStepper } from "../../accessibleInputs/AccessibleStepper";
import { AccessibleTextAreaInput } from "../../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../../accessibleInputs/text/AccessibleTextInput";
import {
  EVENT_KIND_DATA,
  EVENT_ROLE_ROUTE_PATHS,
  returnEventStepperPages,
} from "../constants";
import { eventAction } from "./actions";
import { eventReducer } from "./reducers";
import { initialEventState } from "./state";
import { EventSchema } from "./types";

function Event() {
  const [eventCreatorState, eventDispatch] = useReducer(eventReducer, initialEventState);

  const {
    title,
    kind,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    description,
    attendees,
    requiredItems,
    rsvpDeadline,
    triggerFormSubmit,
    pagesInError,
    isSubmitting,
    isSuccessful,
  } = eventCreatorState;

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
      const eventSchema: EventSchema = {
        attendees,
        description,
        endDate,
        endTime,
        kind,
        location,
        requiredItems,
        rsvpDeadline,
        startDate,
        startTime,
        title,
        userId,
        username,
        userRole: "manager",
      };

      formSubmitPOST({
        dispatch: eventDispatch,
        fetchAbortController,
        fetchInterceptor,
        isComponentMounted,
        isSubmittingAction: eventAction.setIsSubmitting,
        isSuccessfulAction: eventAction.setIsSuccessful,
        preFetchAbortController,
        roleResourceRoutePaths: EVENT_ROLE_ROUTE_PATHS,
        schema: eventSchema,
        schemaName: "eventSchema",
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

  const EVENT_STEPPER_PAGES: StepperPage[] = returnEventStepperPages();

  /**
   * type EventState = {
  attendees: string;
  description: string;
  endDate: string;
  endTime: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
  kind: EventKind;
  location: string;
  pagesInError: Set<number>;
  requiredItems: string;
  rsvpDeadline: string;
  startDate: string;
  startTime: string;
  title: string;
  triggerFormSubmit: boolean;
};
   */

  const attendeesTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: eventAction.setPageInError,
        name: "attendees",
        parentDispatch: eventDispatch,
        stepperPages: EVENT_STEPPER_PAGES,
        validValueAction: eventAction.setAttendees,
        value: attendees,
      }}
    />
  );

  const descriptionTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: eventAction.setPageInError,
        name: "description",
        parentDispatch: eventDispatch,
        stepperPages: EVENT_STEPPER_PAGES,
        validValueAction: eventAction.setDescription,
        value: description,
      }}
    />
  );

  const endDateInput = (
    <AccessibleDateTimeInput
      attributes={{
        dateKind: "date near future",
        inputKind: "date",
        invalidValueAction: eventAction.setPageInError,
        name: "endDate",
        parentDispatch: eventDispatch,
        stepperPages: EVENT_STEPPER_PAGES,
        validValueAction: eventAction.setEndDate,
        value: endDate,
      }}
    />
  );

  const endTimeInput = (
    <AccessibleDateTimeInput
      attributes={{
        inputKind: "time",
        invalidValueAction: eventAction.setPageInError,
        name: "endTime",
        parentDispatch: eventDispatch,
        stepperPages: EVENT_STEPPER_PAGES,
        validValueAction: eventAction.setEndTime,
        value: endTime,
      }}
    />
  );

  const eventKindSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: EVENT_KIND_DATA,
        name: "kind",
        parentDispatch: eventDispatch,
        validValueAction: eventAction.setKind,
        value: kind,
      }}
    />
  );

  const locationTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: eventAction.setPageInError,
        name: "location",
        parentDispatch: eventDispatch,
        stepperPages: EVENT_STEPPER_PAGES,
        validValueAction: eventAction.setLocation,
        value: location,
      }}
    />
  );

  const requiredItemsTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: eventAction.setPageInError,
        name: "requiredItems",
        parentDispatch: eventDispatch,
        stepperPages: EVENT_STEPPER_PAGES,
        validValueAction: eventAction.setRequiredItems,
        value: requiredItems,
      }}
    />
  );

  const rsvpDeadlineDateInput = (
    <AccessibleDateTimeInput
      attributes={{
        dateKind: "date near future",
        inputKind: "date",
        invalidValueAction: eventAction.setPageInError,
        name: "rsvpDeadline",
        parentDispatch: eventDispatch,
        stepperPages: EVENT_STEPPER_PAGES,
        validValueAction: eventAction.setRsvpDeadline,
        value: rsvpDeadline,
      }}
    />
  );

  const startDateInput = (
    <AccessibleDateTimeInput
      attributes={{
        dateKind: "date near future",
        inputKind: "date",
        invalidValueAction: eventAction.setPageInError,
        name: "startDate",
        parentDispatch: eventDispatch,
        stepperPages: EVENT_STEPPER_PAGES,
        validValueAction: eventAction.setStartDate,
        value: startDate,
      }}
    />
  );

  const startTimeInput = (
    <AccessibleDateTimeInput
      attributes={{
        inputKind: "time",
        invalidValueAction: eventAction.setPageInError,
        name: "startTime",
        parentDispatch: eventDispatch,
        stepperPages: EVENT_STEPPER_PAGES,
        validValueAction: eventAction.setStartTime,
        value: startTime,
      }}
    />
  );

  const titleTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: eventAction.setPageInError,
        name: "title",
        parentDispatch: eventDispatch,
        stepperPages: EVENT_STEPPER_PAGES,
        validValueAction: eventAction.setTitle,
        value: title,
      }}
    />
  );

  const eventDateAndTimePage = (
    <Stack>
      {titleTextInput}
      {eventKindSelectInput}
      {startDateInput}
      {endDateInput}
      {startTimeInput}
      {endTimeInput}
    </Stack>
  );

  const eventLocationAndDescriptionPage = (
    <Stack>
      {descriptionTextAreaInput}
      {locationTextInput}
      {attendeesTextAreaInput}
      {requiredItemsTextAreaInput}
      {rsvpDeadlineDateInput}
    </Stack>
  );

  const submitButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "All inputs are valid. Click to submit form",
        disabledScreenreaderText: "Please fix errors before submitting form",
        disabled: pagesInError.size > 0 || triggerFormSubmit,
        kind: "submit",
        name: "submit",
        onClick: (_event: React.MouseEvent<HTMLButtonElement>) => {
          eventDispatch({
            action: eventAction.setTriggerFormSubmit,
            payload: true,
          });
        },
      }}
    />
  );

  const stepper = (
    <AccessibleStepper
      attributes={{
        componentState: eventCreatorState,
        pageElements: [eventDateAndTimePage, eventLocationAndDescriptionPage],
        stepperPages: EVENT_STEPPER_PAGES,
        submitButton,
      }}
    />
  );

  return <Container w={700}>{stepper}</Container>;
}

export default Event;

/**
 *   const { globalDispatch } = useGlobalState();
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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function handleEventFormSubmit() {
      eventDispatch({
        type: eventCreatorAction.setIsSubmitting,
        payload: true,
      });
      eventDispatch({
        type: eventCreatorAction.setSubmitMessage,
        payload: `Creating event: ${title}`,
      });
      openSubmitSuccessNotificationModal();

      const url: URL = urlBuilder({
        path: "actions/outreach/event-creator",
      });

      const body = JSON.stringify({
        eventSchema: {
          title,
          description,
          kind,
          startDate,
          endDate,
          startTime,
          endTime,
          location,
          attendees,
          requiredItems,
          rsvpDeadline,
        },
      });

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      };

      try {
        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: controller.signal,
          url,
        });

        const data: ResourceRequestServerResponse<EventDocument> = await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        eventDispatch({
          type: eventCreatorAction.setIsSuccessful,
          payload: true,
        });
        eventDispatch({
          type: eventCreatorAction.setSuccessMessage,
          payload: data.message ?? `Successfully created event: ${title}`,
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
              navigate("/home");

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
          eventDispatch({
            type: eventCreatorAction.setIsSubmitting,
            payload: false,
          });
          eventDispatch({
            type: eventCreatorAction.setSubmitMessage,
            payload: "",
          });
          eventDispatch({
            type: eventCreatorAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      handleEventFormSubmit();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  // validate title on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(title);

    eventDispatch({
      type: eventCreatorAction.setIsValidTitle,
      payload: isValid,
    });
  }, [title]);

  // validate start date on every change
  useEffect(() => {
    const isValid = DATE_NEAR_FUTURE_REGEX.test(startDate);

    eventDispatch({
      type: eventCreatorAction.setIsValidEventStartDate,
      payload: isValid,
    });
  }, [startDate]);

  // validate end date on every change
  useEffect(() => {
    const isValid = DATE_NEAR_FUTURE_REGEX.test(endDate);

    eventDispatch({
      type: eventCreatorAction.setIsValidEventEndDate,
      payload: isValid,
    });
  }, [endDate]);

  // validate event dates on every change
  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const currDate = new Date(currentMonth);
    const isValid =
      new Date(startDate) <= new Date(endDate) && new Date(endDate) > currDate;

    eventDispatch({
      type: eventCreatorAction.setAreValidEventDates,
      payload: isValid,
    });
  }, [startDate, endDate, isValidEventStartDate, isValidEventEndDate]);

  // validate start time on every change
  useEffect(() => {
    const isValid = TIME_RAILWAY_REGEX.test(startTime);

    eventDispatch({
      type: eventCreatorAction.setIsValidEventStartTime,
      payload: isValid,
    });
  }, [startTime]);

  // validate end time on every change
  useEffect(() => {
    const isValid = TIME_RAILWAY_REGEX.test(endTime);

    eventDispatch({
      type: eventCreatorAction.setIsValidEventEndTime,
      payload: isValid,
    });
  }, [endTime]);

  // validate event times on every change
  useEffect(() => {
    const startTimeHour = parseInt(startTime.split(":")[0]);
    const startTimeMinute = parseInt(startTime.split(":")[1]);

    const endTimeHour = parseInt(endTime.split(":")[0]);
    const endTimeMinute = parseInt(endTime.split(":")[1]);

    const isValid = areValidEventDates
      ? startTimeHour === endTimeHour
        ? startTimeMinute < endTimeMinute
        : startTimeHour < endTimeHour
      : false;

    eventDispatch({
      type: eventCreatorAction.setAreValidEventTimes,
      payload: isValid,
    });
  }, [
    startTime,
    endTime,
    isValidEventStartTime,
    isValidEventEndTime,
    areValidEventDates,
  ]);

  // validate location on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(location);

    eventDispatch({
      type: eventCreatorAction.setIsValidEventLocation,
      payload: isValid,
    });
  }, [location]);

  // validate description on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(description);

    eventDispatch({
      type: eventCreatorAction.setIsValidEventDescription,
      payload: isValid,
    });
  }, [description]);

  // validate attendees on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(attendees);

    eventDispatch({
      type: eventCreatorAction.setIsValidEventAttendees,
      payload: isValid,
    });
  }, [attendees]);

  // validate required items on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(requiredItems);

    eventDispatch({
      type: eventCreatorAction.setIsValidRequiredItems,
      payload: isValid,
    });
  }, [requiredItems]);

  // validate RSVP deadline on every change
  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const rsvpMonth = new Date(rsvpDeadline).getMonth() + 1;

    const currDate = new Date().getDate();
    const rsvpDate = parseInt(rsvpDeadline.split("-")[2]);

    const isValid =
      DATE_NEAR_FUTURE_REGEX.test(rsvpDeadline) &&
      new Date(rsvpDeadline) < new Date(startDate) &&
      rsvpMonth === currentMonth &&
      rsvpDate >= currDate;

    eventDispatch({
      type: eventCreatorAction.setIsValidRsvpDeadline,
      payload: isValid,
    });
  }, [rsvpDeadline, startDate]);

  // update for stepper wrapper state
  useEffect(() => {
    const isStepInError =
      !isValidEventTitle ||
      !areValidEventDates ||
      !areValidEventTimes ||
      !isValidRsvpDeadline;

    // if current step is in error, add it to pagesInError Set else remove it
    eventDispatch({
      type: eventCreatorAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 0,
      },
    });
  }, [isValidEventTitle, areValidEventDates, areValidEventTimes, isValidRsvpDeadline]);

  // update for stepper wrapper state
  useEffect(() => {
    const isRequiredInputInError = !isValidEventLocation || !isValidEventDescription;
    const areOptionalInputsInError =
      (!isValidEventAttendees && attendees !== "") ||
      (!isValidRequiredItems && requiredItems !== "");
    const isStepInError = isRequiredInputInError || areOptionalInputsInError;

    // if current step is in error, add it to pagesInError Set else remove it
    eventDispatch({
      type: eventCreatorAction.setPageInError,
      payload: {
        kind: isStepInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [
    isValidEventLocation,
    isValidEventDescription,
    isValidEventAttendees,
    isValidRequiredItems,
    description,
    attendees,
    requiredItems,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [eventTitleErrorText, eventTitleValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "event title",
    inputText: title,
    isInputTextFocused: isEventTitleFocused,
    isValidInputText: isValidEventTitle,
    regexValidationText: returnGrammarValidationText({
      contentKind: "event title",
      content: title,
      minLength: 2,
      maxLength: 75,
    }),
  });

  const eventDatesInvalidText = areValidEventDates
    ? ""
    : "The event start date must be before the event end date and both must be in the future. ";
  const [eventStartDateErrorText, eventStartDateValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "event start date",
      inputText: startDate,
      isInputTextFocused: isEventStartDateFocused,
      isValidInputText: isValidEventStartDate && areValidEventDates,
      regexValidationText: `${eventDatesInvalidText}${returnDateNearFutureValidationText({
        content: startDate,
        contentKind: "event start date",
      })}`,
    });

  const [eventEndDateErrorText, eventEndDateValidText] = AccessibleErrorValidTextElements(
    {
      inputElementKind: "event end date",
      inputText: endDate,
      isInputTextFocused: isEventEndDateFocused,
      isValidInputText: isValidEventEndDate && areValidEventDates,
      regexValidationText: `${eventDatesInvalidText}${returnDateNearFutureValidationText({
        content: endDate,
        contentKind: "event end date",
      })}`,
    }
  );

  const eventTimesInvalidText = areValidEventTimes
    ? ""
    : "The event start time must be before the event end time and both must be in the future.";

  const [eventStartTimeErrorText, eventStartTimeValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "event start time",
      inputText: startTime,
      isInputTextFocused: isEventStartTimeFocused,
      isValidInputText: isValidEventStartTime,
      regexValidationText: `${eventTimesInvalidText}${returnTimeRailwayValidationText({
        contentKind: "event start time",
        content: startTime,
        minLength: 4,
        maxLength: 5,
      })}`,
    });

  const [eventEndTimeErrorText, eventEndTimeValidText] = AccessibleErrorValidTextElements(
    {
      inputElementKind: "event end time",
      inputText: endTime,
      isInputTextFocused: isEventEndTimeFocused,
      isValidInputText: isValidEventEndTime,
      regexValidationText: `${eventTimesInvalidText}${returnTimeRailwayValidationText({
        contentKind: "event end time",
        content: endTime,
        minLength: 4,
        maxLength: 5,
      })}`,
    }
  );

  const [eventLocationErrorText, eventLocationValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "event location",
      inputText: location,
      isInputTextFocused: isEventLocationFocused,
      isValidInputText: isValidEventLocation,
      regexValidationText: returnGrammarValidationText({
        contentKind: "event location",
        content: location,
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [eventDescriptionErrorText, eventDescriptionValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "event description",
      inputText: description,
      isInputTextFocused: isEventDescriptionFocused,
      isValidInputText: isValidEventDescription,
      regexValidationText: returnGrammarValidationText({
        contentKind: "event description",
        content: description,
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [eventAttendeesErrorText, eventAttendeesValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "event attendees",
      inputText: attendees,
      isInputTextFocused: isEventAttendeesFocused,
      isValidInputText: isValidEventAttendees,
      regexValidationText: returnGrammarValidationText({
        contentKind: "event attendees",
        content: attendees,
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [requiredItemsErrorText, requiredItemsValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "required items",
      inputText: requiredItems,
      isInputTextFocused: isRequiredItemsFocused,
      isValidInputText: isValidRequiredItems,
      regexValidationText: returnGrammarValidationText({
        contentKind: "required items",
        content: requiredItems,
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const rsvpDeadlineInvalidText = isValidRsvpDeadline
    ? ""
    : "The RSVP deadline must be before the event start date and after today.";
  const [rsvpDeadlineErrorText, rsvpDeadlineValidText] = AccessibleErrorValidTextElements(
    {
      inputElementKind: "rsvp deadline",
      inputText: rsvpDeadline,
      isInputTextFocused: isRsvpDeadlineFocused,
      isValidInputText: isValidRsvpDeadline,
      regexValidationText: `${rsvpDeadlineInvalidText}${returnDateNearFutureValidationText(
        {
          content: rsvpDeadline,
          contentKind: "rsvp deadline",
        }
      )}`,
    }
  );

  const titleInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: eventTitleErrorText,
      valid: eventTitleValidText,
    },
    inputText: title,
    isValidInputText: isValidEventTitle,
    label: "Event Title",
    onBlur: () => {
      eventDispatch({
        type: eventCreatorAction.setIsTitleFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      eventDispatch({
        type: eventCreatorAction.setTitle,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      eventDispatch({
        type: eventCreatorAction.setIsTitleFocused,
        payload: true,
      });
    },
    placeholder: "Enter title of event",
    semanticName: "event title",
    required: true,
    withAsterisk: true,
  };

  const locationInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: eventLocationErrorText,
      valid: eventLocationValidText,
    },
    inputText: location,
    isValidInputText: isValidEventLocation,
    label: "Event Location",
    onBlur: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventLocationFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      eventDispatch({
        type: eventCreatorAction.setLocation,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventLocationFocused,
        payload: true,
      });
    },
    placeholder: "Enter location of event",
    semanticName: "event location",
    required: true,
    withAsterisk: true,
  };

  const eventKindInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: EVENT_KIND_DATA,
    description: "Select the kind of event",
    label: "Event Kind",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      eventDispatch({
        type: eventCreatorAction.setKind,
        payload: event.currentTarget.value as EventKind,
      });
    },
    value: kind,
    required: true,
    withAsterisk: true,
  };

  const eventDescriptionInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: eventDescriptionErrorText,
      valid: eventDescriptionValidText,
    },
    inputText: description,
    isValidInputText: isValidEventDescription,
    label: "Event Description",
    onBlur: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventDescriptionFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      eventDispatch({
        type: eventCreatorAction.setDescription,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventDescriptionFocused,
        payload: true,
      });
    },
    placeholder: "Enter description of event",
    semanticName: "event description",
    required: true,
    withAsterisk: true,
  };

  const eventAttendeesInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    ariaRequired: false,
    description: {
      error: eventAttendeesErrorText,
      valid: eventAttendeesValidText,
    },
    inputText: attendees,
    isValidInputText: isValidEventAttendees,
    label: "Event Attendees",
    onBlur: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventAttendeesFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      eventDispatch({
        type: eventCreatorAction.setAttendees,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventAttendeesFocused,
        payload: true,
      });
    },
    placeholder: "Enter attendees of event",
    semanticName: "event attendees",
  };

  const requiredItemsInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    description: {
      error: requiredItemsErrorText,
      valid: requiredItemsValidText,
    },
    inputText: requiredItems,
    isValidInputText: isValidRequiredItems,
    label: "Required Items",
    onBlur: () => {
      eventDispatch({
        type: eventCreatorAction.setIsRequiredItemsFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      eventDispatch({
        type: eventCreatorAction.setRequiredItems,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      eventDispatch({
        type: eventCreatorAction.setIsRequiredItemsFocused,
        payload: true,
      });
    },
    placeholder: "Enter required items for event",
    semanticName: "required items",
  };

  const eventStartDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: eventStartDateErrorText,
      valid: eventStartDateValidText,
    },
    dateKind: "date near future",
    inputText: startDate,
    inputKind: "date",
    isValidInputText: isValidEventStartDate && areValidEventDates,
    label: "Event Start Date",
    onBlur: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventStartDateFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      eventDispatch({
        type: eventCreatorAction.setStartDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventStartDateFocused,
        payload: true,
      });
    },
    placeholder: "DD-MM-YYYY",
    semanticName: "event start date",
    required: true,
    withAsterisk: true,
  };

  const eventEndDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: eventEndDateErrorText,
      valid: eventEndDateValidText,
    },
    dateKind: "date near future",
    inputText: endDate,
    inputKind: "date",
    isValidInputText: isValidEventEndDate && areValidEventDates,
    label: "Event End Date",
    onBlur: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventEndDateFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      eventDispatch({
        type: eventCreatorAction.setEndDate,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventEndDateFocused,
        payload: true,
      });
    },
    placeholder: "DD-MM-YYYY",
    semanticName: "event end date",
    required: true,
    withAsterisk: true,
  };

  const eventStartTimeInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: eventStartTimeErrorText,
      valid: eventStartTimeValidText,
    },
    inputText: startTime,
    inputKind: "time",
    isValidInputText: isValidEventStartTime && areValidEventTimes,
    label: "Event Start Time",
    onBlur: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventStartTimeFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      eventDispatch({
        type: eventCreatorAction.setStartTime,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventStartTimeFocused,
        payload: true,
      });
    },
    placeholder: "HH:MM",
    semanticName: "event start time",
    required: true,
    withAsterisk: true,
  };

  const eventEndTimeInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: eventEndTimeErrorText,
      valid: eventEndTimeValidText,
    },
    inputText: endTime,
    inputKind: "time",
    isValidInputText: isValidEventEndTime && areValidEventTimes,
    label: "Event End Time",
    onBlur: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventEndTimeFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      eventDispatch({
        type: eventCreatorAction.setEndTime,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      eventDispatch({
        type: eventCreatorAction.setIsEventEndTimeFocused,
        payload: true,
      });
    },
    placeholder: "HH:MM",
    semanticName: "event end time",
    required: true,
    withAsterisk: true,
  };

  const rsvpDeadlineDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    description: {
      error: rsvpDeadlineErrorText,
      valid: rsvpDeadlineValidText,
    },
    dateKind: "date near future",
    inputText: rsvpDeadline,
    inputKind: "date",
    isValidInputText: isValidRsvpDeadline && areValidEventDates,
    label: "RSVP Deadline",
    onBlur: () => {
      eventDispatch({
        type: eventCreatorAction.setIsRsvpDeadlineFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      eventDispatch({
        type: eventCreatorAction.setRsvpDeadline,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      eventDispatch({
        type: eventCreatorAction.setIsRsvpDeadlineFocused,
        payload: true,
      });
    },
    placeholder: "DD-MM-YYYY",
    semanticName: "rsvp deadline",
    required: true,
    withAsterisk: true,
  };

  const submitButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    semanticDescription: "event creator form submit button",
    semanticName: "submit button",
    leftIcon: <TbUpload />,
    buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
      eventDispatch({
        type: eventCreatorAction.setTriggerFormSubmit,
        payload: true,
      });
    },
    // ensures form submit happens only once
    buttonDisabled: pagesInError.size > 0 || triggerFormSubmit,
  };

  const [createdTitleTextInput, createdLocationTextInput] =
    returnAccessibleTextInputElements([titleInputCreatorInfo, locationInputCreatorInfo]);

  const [createdEventKindSelectInput] = returnAccessibleSelectInputElements([
    eventKindInputCreatorInfo,
  ]);

  const [
    createdEventDescriptionTextAreaInput,
    createdEventAttendeesTextAreaInput,
    createdRequiredItemsTextAreaInput,
  ] = returnAccessibleTextAreaInputElements([
    eventDescriptionInputCreatorInfo,
    eventAttendeesInputCreatorInfo,
    requiredItemsInputCreatorInfo,
  ]);

  const [
    createdEventStartDateInput,
    createdEventEndDateInput,
    createdEventStartTimeInput,
    createdEventEndTimeInput,
    createdRsvpDeadlineDateInput,
  ] = returnAccessibleDateTimeElements([
    eventStartDateInputCreatorInfo,
    eventEndDateInputCreatorInfo,
    eventStartTimeInputCreatorInfo,
    eventEndTimeInputCreatorInfo,
    rsvpDeadlineDateInputCreatorInfo,
  ]);

  const [createdSubmitButton] = returnAccessibleButtonElements([submitButtonCreatorInfo]);
  const displaySubmitButton =
    currentStepperPosition === EVENT_CREATOR_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          pagesInError.size > 0
            ? "Please fix errors before submitting"
            : "Submit Event Creator form"
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  const displayEventDatesFormPage = (
    <FormLayoutWrapper>
      {createdTitleTextInput}
      {createdEventStartDateInput}
      {createdEventEndDateInput}
      {createdEventStartTimeInput}
      {createdEventEndTimeInput}
      {createdRsvpDeadlineDateInput}
    </FormLayoutWrapper>
  );

  const displayEventDetailsFormPage = (
    <FormLayoutWrapper>
      {createdEventKindSelectInput}
      {createdLocationTextInput}
      {createdEventDescriptionTextAreaInput}
      {createdEventAttendeesTextAreaInput}
      {createdRequiredItemsTextAreaInput}
    </FormLayoutWrapper>
  );

  const EVENT_CREATOR_REVIEW_OBJECT: FormReviewObjectArray = {
    "Event Date and Time": [
      {
        inputName: "Event Title",
        inputValue: title,
        isInputValueValid: isValidEventTitle,
      },
      {
        inputName: "Event Start Date",
        inputValue: startDate,
        isInputValueValid: isValidEventStartDate,
      },
      {
        inputName: "Event End Date",
        inputValue: endDate,
        isInputValueValid: isValidEventEndDate,
      },
      {
        inputName: "Event Start Time",
        inputValue: startTime,
        isInputValueValid: isValidEventStartTime,
      },
      {
        inputName: "Event End Time",
        inputValue: endTime,
        isInputValueValid: isValidEventEndTime,
      },
      {
        inputName: "RSVP Deadline",
        inputValue: rsvpDeadline,
        isInputValueValid: isValidRsvpDeadline,
      },
    ],
    "Event Location and Attendees": [
      {
        inputName: "Event Kind",
        inputValue: kind,
        isInputValueValid: true,
      },
      {
        inputName: "Event Location",
        inputValue: location,
        isInputValueValid: isValidEventLocation,
      },
      {
        inputName: "Event Description",
        inputValue: description,
        isInputValueValid: isValidEventDescription,
      },
      {
        inputName: "Event Attendees",
        inputValue: attendees,
        isInputValueValid: isValidEventAttendees,
      },
      {
        inputName: "Required Items",
        inputValue: requiredItems,
        isInputValueValid: isValidRequiredItems,
      },
    ],
  };

  const displayReviewFormPage = (
    <FormReviewPage
      formReviewObject={EVENT_CREATOR_REVIEW_OBJECT}
      formName="Event Creator"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/outreach/event-creator/display");
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

  const displayEventForm =
    currentStepperPosition === 0
      ? displayEventDatesFormPage
      : currentStepperPosition === 1
      ? displayEventDetailsFormPage
      : currentStepperPosition === 2
      ? displayReviewFormPage
      : displaySubmitButton;

  const displayEventComponent = (
    <StepperWrapper
      childrenTitle="Event Creator"
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={EVENT_CREATOR_DESCRIPTION_OBJECTS}
      maxStepperPosition={EVENT_CREATOR_MAX_STEPPER_POSITION}
      parentComponentDispatch={eventDispatch}
      setCurrentStepperPosition={eventCreatorAction.setCurrentStepperPosition}
      pagesInError={pagesInError}
    >
      {displaySubmitSuccessNotificationModal}
      {displayEventForm}
    </StepperWrapper>
  );

  return displayEventComponent;

 */
