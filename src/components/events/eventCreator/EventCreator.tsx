import { useEffect, useReducer } from 'react';

import {
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  TIME_RAILWAY_REGEX,
} from '../../../constants/regex';
import {
  AccessibleSelectInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  returnAccessibleSelectInputElements,
  returnAccessibleTextElements,
  returnAccessibleTextInputElements,
} from '../../../jsxCreators';
import {
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
  returnTimeRailwayValidationText,
} from '../../../utils';
import {
  eventCreatorAction,
  eventCreatorReducer,
  initialEventCreatorState,
} from './state';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { EVENT_KIND_DATA } from './constants';
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

    eventDate,
    isValidEventDate,
    isEventDateFocused,

    eventStartTime,
    isValidEventStartTime,
    isEventStartTimeFocused,

    eventEndTime,
    isValidEventEndTime,
    isEventEndTimeFocused,

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

  // validate date on every change
  useEffect(() => {
    const isValid =
      DATE_NEAR_FUTURE_REGEX.test(eventDate) &&
      new Date(eventDate) > new Date();

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidEventDate,
      payload: isValid,
    });
  }, [eventDate]);

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
    const isValid =
      DATE_NEAR_FUTURE_REGEX.test(rsvpDeadline) &&
      new Date(rsvpDeadline) > new Date() &&
      new Date(rsvpDeadline) < new Date(eventDate);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidRsvpDeadline,
      payload: isValid,
    });
  }, [rsvpDeadline, eventDate]);

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

  const [eventDateErrorText, eventDateValidText] = returnAccessibleTextElements(
    {
      inputElementKind: 'event date',
      inputText: eventDate,
      isInputTextFocused: isEventDateFocused,
      isValidInputText: isValidEventDate,
      regexValidationText: returnDateNearFutureValidationText(eventDate),
    }
  );

  const [eventStartTimeErrorText, eventStartTimeValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'event start time',
      inputText: eventStartTime,
      isInputTextFocused: isEventStartTimeFocused,
      isValidInputText: isValidEventStartTime,
      regexValidationText: returnTimeRailwayValidationText({
        contentKind: 'event start time',
        content: eventStartTime,
        minLength: 4,
        maxLength: 5,
      }),
    });

  const [eventEndTimeErrorText, eventEndTimeValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'event end time',
      inputText: eventEndTime,
      isInputTextFocused: isEventEndTimeFocused,
      isValidInputText: isValidEventEndTime,
      regexValidationText: returnTimeRailwayValidationText({
        contentKind: 'event end time',
        content: eventEndTime,
        minLength: 4,
        maxLength: 5,
      }),
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

  const [rsvpDeadlineErrorText, rsvpDeadlineValidText] =
    returnAccessibleTextElements({
      inputElementKind: 'RSVP deadline',
      inputText: rsvpDeadline,
      isInputTextFocused: isRsvpDeadlineFocused,
      isValidInputText: isValidRsvpDeadline,
      regexValidationText: returnDateNearFutureValidationText(rsvpDeadline),
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

  const [createdTitleTextInput] = returnAccessibleTextInputElements([
    titleInputCreatorInfo,
  ]);

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

  const [createdEventKindSelectInput] = returnAccessibleSelectInputElements([
    eventKindInputCreatorInfo,
  ]);

  useEffect(() => {
    console.log('eventTitle: ', eventTitle);
  }, [eventTitle]);

  useEffect(() => {
    console.log('eventKind: ', eventKind);
  }, [eventKind]);

  return (
    <div>
      <h1>Event Creator</h1>
      {createdTitleTextInput}
      {createdEventKindSelectInput}
    </div>
  );
}

export { EventCreator };
