import { useEffect, useReducer } from 'react';

import {
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_REGEX,
  TIME_RAILWAY_REGEX,
} from '../../../constants/regex';
import {
  eventCreatorAction,
  eventCreatorReducer,
  initialEventCreatorState,
} from './state';

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
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(eventDescription);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidEventDescription,
      payload: isValid,
    });
  }, [eventDescription]);

  // validate attendees on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(eventAttendees);

    eventCreatorDispatch({
      type: eventCreatorAction.setIsValidEventAttendees,
      payload: isValid,
    });
  }, [eventAttendees]);

  // validate required items on every change
  useEffect(() => {
    const isValid = GRAMMAR_TEXTAREA_REGEX.test(requiredItems);

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
  }, [rsvpDeadline]);

  return (
    <div>
      <h1>Event Creator</h1>
    </div>
  );
}

export { EventCreator };
