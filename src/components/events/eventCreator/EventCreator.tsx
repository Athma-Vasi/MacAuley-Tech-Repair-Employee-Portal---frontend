import {
  faCalendarAlt,
  faCheck,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Flex } from '@mantine/core';
import { createEvent } from '@testing-library/react';
import { useEffect, useReducer } from 'react';

import {
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  TIME_RAILWAY_REGEX,
} from '../../../constants/regex';
import {
  AccessibleDateInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  returnAccessibleDateTimeElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
  returnTimeRailwayValidationText,
} from '../../../utils';
import { StepperWrapper } from '../../stepperWrapper';
import {
  EVENT_CREATOR_DESCRIPTION_MAP,
  EVENT_CREATOR_MAX_STEPPER_POSITION,
  EVENT_KIND_DATA,
} from './constants';
import {
  eventCreatorAction,
  eventCreatorReducer,
  initialEventCreatorState,
} from './state';
import { EventKind } from './types';

function EventCreator() {
  const [eventCreatorState, eventCreatorDispatch] = useReducer(
    eventCreatorReducer,
    initialEventCreatorState
  );
  const {
    eventTitle,
    isValidEventTitle,
    isEventTitleFocused,

    eventKind,

    eventStartDate,
    isValidEventStartDate,
    isEventStartDateFocused,

    eventEndDate,
    isValidEventEndDate,
    isEventEndDateFocused,

    areValidEventDates,

    eventStartTime,
    isValidEventStartTime,
    isEventStartTimeFocused,

    eventEndTime,
    isValidEventEndTime,
    isEventEndTimeFocused,

    areValidEventTimes,

    eventLocation,
    isValidEventLocation,
    isEventLocationFocused,

    eventDescription,
    isValidEventDescription,
    isEventDescriptionFocused,

    eventAttendees,
    isValidEventAttendees,
    isEventAttendeesFocused,

    requiredItems,
    isValidRequiredItems,
    isRequiredItemsFocused,

    rsvpDeadline,
    isValidRsvpDeadline,
    isRsvpDeadlineFocused,

    currentStepperPosition,
    stepsInError,

    isError,
    errorMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
    isLoading,
    loadingMessage,
  } = eventCreatorState;

  // validate title on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(eventTitle);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidTitle,
      payload: isValid,
    });
  }, [eventTitle]);

  // validate start date on every change
  useEffect(() => {
    const isValid = DATE_NEAR_FUTURE_REGEX.test(eventStartDate);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidEventStartDate,
      payload: isValid,
    });
  }, [eventStartDate]);

  // validate end date on every change
  useEffect(() => {
    const isValid = DATE_NEAR_FUTURE_REGEX.test(eventEndDate);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidEventEndDate,
      payload: isValid,
    });
  }, [eventEndDate]);

  // validate event dates on every change
  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const currDate = new Date(currentMonth);
    const isValid =
      new Date(eventStartDate) <= new Date(eventEndDate) &&
      new Date(eventEndDate) > currDate;

    eventCreatorDispatch({
      type: eventCreatorAction.setAreValidEventDates,
      payload: isValid,
    });
  }, [
    eventStartDate,
    eventEndDate,
    isValidEventStartDate,
    isValidEventEndDate,
  ]);

  // validate start time on every change
  useEffect(() => {
    const isValid = TIME_RAILWAY_REGEX.test(eventStartTime);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidEventStartTime,
      payload: isValid,
    });
  }, [eventStartTime]);

  // validate end time on every change
  useEffect(() => {
    const isValid = TIME_RAILWAY_REGEX.test(eventEndTime);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidEventEndTime,
      payload: isValid,
    });
  }, [eventEndTime]);

  // validate event times on every change
  useEffect(() => {
    const startTimeHour = parseInt(eventStartTime.split(':')[0]);
    const startTimeMinute = parseInt(eventStartTime.split(':')[1]);

    const endTimeHour = parseInt(eventEndTime.split(':')[0]);
    const endTimeMinute = parseInt(eventEndTime.split(':')[1]);

    const isValid = areValidEventDates
      ? startTimeHour === endTimeHour
        ? startTimeMinute < endTimeMinute
        : startTimeHour < endTimeHour
      : false;

    eventCreatorDispatch({
      type: eventCreatorAction.setAreValidEventTimes,
      payload: isValid,
    });
  }, [
    eventStartTime,
    eventEndTime,
    isValidEventStartTime,
    isValidEventEndTime,
    areValidEventDates,
  ]);

  // validate location on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXT_INPUT_REGEX.test(eventLocation);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidEventLocation,
      payload: isValid,
    });
  }, [eventLocation]);

  // validate description on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(eventDescription);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidEventDescription,
      payload: isValid,
    });
  }, [eventDescription]);

  // validate attendees on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(eventAttendees);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidEventAttendees,
      payload: isValid,
    });
  }, [eventAttendees]);

  // validate required items on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_INPUT_REGEX.test(requiredItems);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidRequiredItems,
      payload: isValid,
    });
  }, [requiredItems]);

  // validate RSVP deadline on every change
  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const rsvpMonth = new Date(rsvpDeadline).getMonth() + 1;

    const currDate = new Date().getDate();
    const rsvpDate = parseInt(rsvpDeadline.split('-')[2]);

    const isValid =
      DATE_NEAR_FUTURE_REGEX.test(rsvpDeadline) &&
      new Date(rsvpDeadline) < new Date(eventStartDate) &&
      rsvpMonth === currentMonth &&
      rsvpDate >= currDate;

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidRsvpDeadline,
      payload: isValid,
    });
  }, [rsvpDeadline, eventStartDate]);

  // update for stepper wrapper state
  useEffect(() => {
    const isStepInError =
      !isValidEventTitle ||
      !areValidEventDates ||
      !areValidEventTimes ||
      !isValidRsvpDeadline;

    // if current step is in error, add it to stepsInError Set else remove it
    eventCreatorDispatch({
      type: eventCreatorAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    isValidEventTitle,
    areValidEventDates,
    areValidEventTimes,
    isValidRsvpDeadline,
  ]);

  // update for stepper wrapper state
  useEffect(() => {
    const isStepInError =
      !isValidEventLocation ||
      !isValidEventDescription ||
      !isValidEventAttendees ||
      !isValidRequiredItems;

    // if current step is in error, add it to stepsInError Set else remove it
    eventCreatorDispatch({
      type: eventCreatorAction.setStepsInError,
      payload: {
        kind: isStepInError ? 'add' : 'delete',
        step: 2,
      },
    });
  }, [
    isValidEventLocation,
    isValidEventDescription,
    isValidEventAttendees,
    isValidRequiredItems,
  ]);

  // following are the accessible text elements for screen readers to read out based on the state of the input
  const [eventTitleErrorText, eventTitleValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'event title',
      inputText: eventTitle,
      isInputTextFocused: isEventTitleFocused,
      isValidInputText: isValidEventTitle,
      regexValidationText: returnGrammarValidationText({
        contentKind: 'event title',
        content: eventTitle,
        minLength: 2,
        maxLength: 75,
      }),
    });

  const eventDatesInvalidText = areValidEventDates
    ? ''
    : 'The event start date must be before the event end date and both must be in the future. ';
  const [eventStartDateErrorText, eventStartDateValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'event start date',
      inputText: eventStartDate,
      isInputTextFocused: isEventStartDateFocused,
      isValidInputText: isValidEventStartDate && areValidEventDates,
      regexValidationText: `${eventDatesInvalidText}${returnDateNearFutureValidationText(
        eventStartDate
      )}`,
    });

  const [eventEndDateErrorText, eventEndDateValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'event end date',
      inputText: eventEndDate,
      isInputTextFocused: isEventEndDateFocused,
      isValidInputText: isValidEventEndDate && areValidEventDates,
      regexValidationText: `${eventDatesInvalidText}${returnDateNearFutureValidationText(
        eventEndDate
      )}`,
    });

  const eventTimesInvalidText = areValidEventTimes
    ? ''
    : 'The event start time must be before the event end time and both must be in the future.';

  const [eventStartTimeErrorText, eventStartTimeValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'event start time',
      inputText: eventStartTime,
      isInputTextFocused: isEventStartTimeFocused,
      isValidInputText: isValidEventStartTime,
      regexValidationText: `${eventTimesInvalidText}${returnTimeRailwayValidationText(
        {
          contentKind: 'event start time',
          content: eventStartTime,
          minLength: 4,
          maxLength: 5,
        }
      )}`,
    });

  const [eventEndTimeErrorText, eventEndTimeValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'event end time',
      inputText: eventEndTime,
      isInputTextFocused: isEventEndTimeFocused,
      isValidInputText: isValidEventEndTime,
      regexValidationText: `${eventTimesInvalidText}${returnTimeRailwayValidationText(
        {
          contentKind: 'event end time',
          content: eventEndTime,
          minLength: 4,
          maxLength: 5,
        }
      )}`,
    });

  const [eventLocationErrorText, eventLocationValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'event location',
      inputText: eventLocation,
      isInputTextFocused: isEventLocationFocused,
      isValidInputText: isValidEventLocation,
      regexValidationText: returnGrammarValidationText({
        contentKind: 'event location',
        content: eventLocation,
        minLength: 2,
        maxLength: 75,
      }),
    });

  const [eventDescriptionErrorText, eventDescriptionValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'event description',
      inputText: eventDescription,
      isInputTextFocused: isEventDescriptionFocused,
      isValidInputText: isValidEventDescription,
      regexValidationText: returnGrammarValidationText({
        contentKind: 'event description',
        content: eventDescription,
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [eventAttendeesErrorText, eventAttendeesValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'event attendees',
      inputText: eventAttendees,
      isInputTextFocused: isEventAttendeesFocused,
      isValidInputText: isValidEventAttendees,
      regexValidationText: returnGrammarValidationText({
        contentKind: 'event attendees',
        content: eventAttendees,
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const [requiredItemsErrorText, requiredItemsValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'required items',
      inputText: requiredItems,
      isInputTextFocused: isRequiredItemsFocused,
      isValidInputText: isValidRequiredItems,
      regexValidationText: returnGrammarValidationText({
        contentKind: 'required items',
        content: requiredItems,
        minLength: 2,
        maxLength: 2000,
      }),
    });

  const rsvpDeadlineInvalidText = isValidRsvpDeadline
    ? ''
    : 'The RSVP deadline must be before the event start date and after today.';
  const [rsvpDeadlineErrorText, rsvpDeadlineValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'rsvp deadline',
      inputText: rsvpDeadline,
      isInputTextFocused: isRsvpDeadlineFocused,
      isValidInputText: isValidRsvpDeadline,
      regexValidationText: `${rsvpDeadlineInvalidText}${returnDateNearFutureValidationText(
        rsvpDeadline
      )}`,
    });

  const titleInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: eventTitleErrorText,
      valid: eventTitleValidText,
    },
    icon: faCheck,
    inputText: eventTitle,
    isValidInputText: isValidEventTitle,
    label: 'Event title',
    onBlur: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsTitleFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      eventCreatorDispatch({
        type: eventCreatorAction.setTitle,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsTitleFocused,
        payload: true,
      });
    },
    placeholder: 'Enter title of event',
    semanticName: 'event title',
    required: true,
    withAsterisk: true,
  };

  const locationInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: eventLocationErrorText,
      valid: eventLocationValidText,
    },
    icon: faCheck,
    inputText: eventLocation,
    isValidInputText: isValidEventLocation,
    label: 'Event location',
    onBlur: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventLocationFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      eventCreatorDispatch({
        type: eventCreatorAction.setEventLocation,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventLocationFocused,
        payload: true,
      });
    },
    placeholder: 'Enter location of event',
    semanticName: 'event location',
    required: true,
    withAsterisk: true,
  };

  const eventKindInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: EVENT_KIND_DATA,
    description: 'Select the kind of event',
    label: 'Event kind',
    onChange: (event) => {
      eventCreatorDispatch({
        type: eventCreatorAction.setEventKind,
        payload: event.target.value as EventKind,
      });
    },
    value: eventKind,
    required: true,
    withAsterisk: true,
  };

  const eventDescriptionInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: eventDescriptionErrorText,
      valid: eventDescriptionValidText,
    },
    icon: faCheck,
    inputText: eventDescription,
    isValidInputText: isValidEventDescription,
    label: 'Event description',
    onBlur: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventDescriptionFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      eventCreatorDispatch({
        type: eventCreatorAction.setEventDescription,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventDescriptionFocused,
        payload: true,
      });
    },
    placeholder: 'Enter description of event',
    semanticName: 'event description',
    required: true,
    withAsterisk: true,
  };

  const eventAttendeesInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: eventAttendeesErrorText,
      valid: eventAttendeesValidText,
    },
    icon: faCheck,
    inputText: eventAttendees,
    isValidInputText: isValidEventAttendees,
    label: 'Event attendees',
    onBlur: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventAttendeesFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      eventCreatorDispatch({
        type: eventCreatorAction.setEventAttendees,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventAttendeesFocused,
        payload: true,
      });
    },
    placeholder: 'Enter attendees of event',
    semanticName: 'event attendees',
    required: true,
    withAsterisk: true,
  };

  const requiredItemsInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: requiredItemsErrorText,
      valid: requiredItemsValidText,
    },
    icon: faCheck,
    inputText: requiredItems,
    isValidInputText: isValidRequiredItems,
    label: 'Required items',
    onBlur: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsRequiredItemsFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      eventCreatorDispatch({
        type: eventCreatorAction.setRequiredItems,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsRequiredItemsFocused,
        payload: true,
      });
    },
    placeholder: 'Enter required items for event',
    semanticName: 'required items',
    required: true,
    withAsterisk: true,
  };

  const eventStartDateInputCreatorInfo: AccessibleDateInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: eventStartDateErrorText,
      valid: eventStartDateValidText,
    },
    dateKind: 'date near future',
    icon: faCheck,
    inputText: eventStartDate,
    inputKind: 'date',
    isValidInputText: isValidEventStartDate && areValidEventDates,
    label: 'Event start date',
    onBlur: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventStartDateFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      eventCreatorDispatch({
        type: eventCreatorAction.setEventStartDate,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventStartDateFocused,
        payload: true,
      });
    },
    placeholder: 'DD-MM-YYYY',
    semanticName: 'event start date',
    required: true,
    withAsterisk: true,
  };

  const eventEndDateInputCreatorInfo: AccessibleDateInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: eventEndDateErrorText,
      valid: eventEndDateValidText,
    },
    dateKind: 'date near future',
    icon: faCheck,
    inputText: eventEndDate,
    inputKind: 'date',
    isValidInputText: isValidEventEndDate && areValidEventDates,
    label: 'Event end date',
    onBlur: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventEndDateFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      eventCreatorDispatch({
        type: eventCreatorAction.setEventEndDate,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventEndDateFocused,
        payload: true,
      });
    },
    placeholder: 'DD-MM-YYYY',
    semanticName: 'event end date',
    required: true,
    withAsterisk: true,
  };

  const eventStartTimeInputCreatorInfo: AccessibleDateInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: eventStartTimeErrorText,
      valid: eventStartTimeValidText,
    },
    icon: faCheck,
    inputText: eventStartTime,
    inputKind: 'time',
    isValidInputText: isValidEventStartTime && areValidEventTimes,
    label: 'Event start time',
    onBlur: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventStartTimeFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      eventCreatorDispatch({
        type: eventCreatorAction.setEventStartTime,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventStartTimeFocused,
        payload: true,
      });
    },
    placeholder: 'HH:MM',
    semanticName: 'event start time',
    required: true,
    withAsterisk: true,
  };

  const eventEndTimeInputCreatorInfo: AccessibleDateInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: eventEndTimeErrorText,
      valid: eventEndTimeValidText,
    },
    icon: faCheck,
    inputText: eventEndTime,
    inputKind: 'time',
    isValidInputText: isValidEventEndTime && areValidEventTimes,
    label: 'Event end time',
    onBlur: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventEndTimeFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      eventCreatorDispatch({
        type: eventCreatorAction.setEventEndTime,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsEventEndTimeFocused,
        payload: true,
      });
    },
    placeholder: 'HH:MM',
    semanticName: 'event end time',
    required: true,
    withAsterisk: true,
  };

  const rsvpDeadlineInputCreatorInfo: AccessibleDateInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: rsvpDeadlineErrorText,
      valid: rsvpDeadlineValidText,
    },
    dateKind: 'date near future',
    icon: faCheck,
    inputText: rsvpDeadline,
    inputKind: 'date',
    isValidInputText: isValidRsvpDeadline && areValidEventDates,
    label: 'RSVP deadline',
    onBlur: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsRsvpDeadlineFocused,
        payload: false,
      });
    },
    onChange: (event) => {
      eventCreatorDispatch({
        type: eventCreatorAction.setRsvpDeadline,
        payload: event.target.value,
      });
    },
    onFocus: () => {
      eventCreatorDispatch({
        type: eventCreatorAction.setIsRsvpDeadlineFocused,
        payload: true,
      });
    },
    placeholder: 'DD-MM-YYYY',
    semanticName: 'rsvp deadline',
    required: true,
    withAsterisk: true,
  };

  const [createdTitleTextInput, createdLocationTextInput] =
    returnAccessibleTextInputElements([
      titleInputCreatorInfo,
      locationInputCreatorInfo,
    ]);

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
    rsvpDeadlineInputCreatorInfo,
  ]);

  const displayEventDatesFormPage = (
    <>
      {createdTitleTextInput}
      {createdEventStartDateInput}
      {createdEventEndDateInput}
      {createdEventStartTimeInput}
      {createdEventEndTimeInput}
      {createdRsvpDeadlineDateInput}
    </>
  );

  const displayEventDetailsFormPage = (
    <>
      {createdEventKindSelectInput}
      {createdLocationTextInput}
      {createdEventDescriptionTextAreaInput}
      {createdEventAttendeesTextAreaInput}
      {createdRequiredItemsTextAreaInput}
    </>
  );

  const displayReviewFormPage = <h3>review form page</h3>;

  const displayEventCreatorForm =
    currentStepperPosition === 0
      ? displayEventDatesFormPage
      : currentStepperPosition === 1
      ? displayEventDetailsFormPage
      : currentStepperPosition === 2
      ? displayReviewFormPage
      : null;

  const displaySubmitButton =
    currentStepperPosition === EVENT_CREATOR_MAX_STEPPER_POSITION ? (
      <Button type="button" variant="filled" disabled={stepsInError.size > 0}>
        Submit
      </Button>
    ) : null;

  async function handleEventCreatorFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
  }

  const displayEventCreatorComponent = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionMap={EVENT_CREATOR_DESCRIPTION_MAP}
      maxStepperPosition={EVENT_CREATOR_MAX_STEPPER_POSITION}
      parentComponentDispatch={eventCreatorDispatch}
      setCurrentStepperPosition={eventCreatorAction.setCurrentStepperPosition}
      stepsInError={stepsInError}
    >
      <form onSubmit={handleEventCreatorFormSubmit}>
        {displayEventCreatorForm}
        {displaySubmitButton}
      </form>
    </StepperWrapper>
  );

  useEffect(() => {
    console.log('eventStartDate', eventStartDate);
    console.log('eventEndDate', eventEndDate);
    console.log('eventStartTime', eventStartTime);
    console.log('eventEndTime', eventEndTime);
  }, [eventStartDate, eventEndDate, eventStartTime, eventEndTime]);

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      rowGap="lg"
      w="400px"
    >
      <h1>Event Creator</h1>
      {displayEventCreatorComponent}
    </Flex>
  );
}

export { EventCreator };
