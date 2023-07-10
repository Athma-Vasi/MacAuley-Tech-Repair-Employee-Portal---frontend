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
  AccessibleTextInputCreatorInfo,
  returnAccessibleDateTimeElements,
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
import {
  faCalendarAlt,
  faCheck,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
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

    eventStartDate,
    isValidEventStartDate,
    isEventStartDateFocused,

    eventEndDate,
    isValidEventEndDate,
    isEventEndDateFocused,

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

  // validate start date on every change
  useEffect(() => {
    const isValid =
      DATE_NEAR_FUTURE_REGEX.test(eventStartDate) &&
      new Date(eventStartDate) > new Date();

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidEventStartDate,
      payload: isValid,
    });
  }, [eventStartDate]);

  // validate end date on every change
  useEffect(() => {
    const isValid =
      DATE_NEAR_FUTURE_REGEX.test(eventEndDate) &&
      new Date(eventEndDate) > new Date(eventStartDate);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidEventEndDate,
      payload: isValid,
    });
  }, [eventEndDate, eventStartDate]);

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
      new Date(rsvpDeadline) < new Date(eventStartDate);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidRsvpDeadline,
      payload: isValid,
    });
  }, [rsvpDeadline, eventStartDate]);

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
      inputText: eventStartDate,
      isInputTextFocused: isEventStartDateFocused,
      isValidInputText: isValidEventStartDate,
      regexValidationText: returnDateNearFutureValidationText(eventStartDate),
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

  const eventDateInputCreatorInfo: AccessibleDateInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: eventDateErrorText,
      valid: eventDateValidText,
    },
    dateKind: 'date near future',
    icon: faCalendarAlt,
    inputText: eventStartDate,
    inputKind: 'date',
    isValidInputText: isValidEventStartDate,
    label: 'Event date',
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
    semanticName: 'event date',
  };

  const eventStartTimeInputCreatorInfo: AccessibleDateInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: eventStartTimeErrorText,
      valid: eventStartTimeValidText,
    },
    icon: faClock,
    inputText: eventStartTime,
    inputKind: 'time',
    isValidInputText: isValidEventStartTime,
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
  };

  const eventEndTimeInputCreatorInfo: AccessibleDateInputCreatorInfo = {
    ariaRequired: true,
    description: {
      error: eventEndTimeErrorText,
      valid: eventEndTimeValidText,
    },
    icon: faClock,
    inputText: eventEndTime,
    inputKind: 'time',
    isValidInputText: isValidEventEndTime,
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
  };

  const [
    createdEventDateInput,
    createdEventStartTimeInput,
    createdEventEndTimeInput,
  ] = returnAccessibleDateTimeElements([
    eventDateInputCreatorInfo,
    eventStartTimeInputCreatorInfo,
    eventEndTimeInputCreatorInfo,
  ]);

  useEffect(() => {
    console.log('eventTitle: ', eventTitle);
  }, [eventTitle]);

  useEffect(() => {
    console.log('eventKind: ', eventKind);
  }, [eventKind]);

  useEffect(() => {
    console.log('new Date(eventStartDate): ', new Date(eventStartDate));
    console.log('new Date(): ', new Date());
    console.log('eventStartDate: ', eventStartDate);
    console.log('isValidEventStartDate: ', isValidEventStartDate);
  }, [eventStartDate, isValidEventStartDate]);

  useEffect(() => {
    console.log('eventStartTime: ', eventStartTime);
  }, [eventStartTime]);

  useEffect(() => {
    console.log('eventEndTime: ', eventEndTime);
  }, [eventEndTime]);

  return (
    <div>
      <h1>Event Creator</h1>
      {createdTitleTextInput}
      {createdEventKindSelectInput}
      {createdEventDateInput}
      {createdEventStartTimeInput}
      {createdEventEndTimeInput}
    </div>
  );
}

export { EventCreator };
