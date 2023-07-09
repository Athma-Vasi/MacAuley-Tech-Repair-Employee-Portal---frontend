import {
  EventCreatorAction,
  EventCreatorDispatch,
  EventCreatorState,
} from './types';

const initialEventCreatorState: EventCreatorState = {
  eventTitle: '',
  isValidEventTitle: false,
  isEventTitleFocused: false,

  eventKind: 'Webinar',

  eventDate: '',
  isValidEventDate: false,
  isEventDateFocused: false,

  eventStartTime: '',
  isValidEventStartTime: false,
  isEventStartTimeFocused: false,

  eventEndTime: '',
  isValidEventEndTime: false,
  isEventEndTimeFocused: false,

  eventLocation: '',
  isValidEventLocation: false,
  isEventLocationFocused: false,

  eventDescription: '',
  isValidEventDescription: false,
  isEventDescriptionFocused: false,

  eventAttendees: '',
  isValidEventAttendees: false,
  isEventAttendeesFocused: false,

  requiredItems: '',
  isValidRequiredItems: false,
  isRequiredItemsFocused: false,

  rsvpDeadline: '',
  isValidRsvpDeadline: false,
  isRsvpDeadlineFocused: false,

  currentStepperPosition: 0,
  stepsInError: new Set(),

  isError: false,
  errorMessage: '',
  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
};

const eventCreatorAction: EventCreatorAction = {
  setTitle: 'setTitle',
  setIsValidTitle: 'setIsValidTitle',
  setIsTitleFocused: 'setIsTitleFocused',

  setEventKind: 'setEventKind',

  setEventDate: 'setEventDate',
  setIsValidEventDate: 'setIsValidEventDate',
  setIsEventDateFocused: 'setIsEventDateFocused',

  setEventStartTime: 'setEventStartTime',
  setIsValidEventStartTime: 'setIsValidEventStartTime',
  setIsEventStartTimeFocused: 'setIsEventStartTimeFocused',

  setEventEndTime: 'setEventEndTime',
  setIsValidEventEndTime: 'setIsValidEventEndTime',
  setIsEventEndTimeFocused: 'setIsEventEndTimeFocused',

  setEventLocation: 'setEventLocation',
  setIsValidEventLocation: 'setIsValidEventLocation',
  setIsEventLocationFocused: 'setIsEventLocationFocused',

  setEventDescription: 'setEventDescription',
  setIsValidEventDescription: 'setIsValidEventDescription',
  setIsEventDescriptionFocused: 'setIsEventDescriptionFocused',

  setEventAttendees: 'setEventAttendees',
  setIsValidEventAttendees: 'setIsValidEventAttendees',
  setIsEventAttendeesFocused: 'setIsEventAttendeesFocused',

  setRequiredItems: 'setRequiredItems',
  setIsValidRequiredItems: 'setIsValidRequiredItems',
  setIsRequiredItemsFocused: 'setIsRequiredItemsFocused',

  setRsvpDeadline: 'setRsvpDeadline',
  setIsValidRsvpDeadline: 'setIsValidRsvpDeadline',
  setIsRsvpDeadlineFocused: 'setIsRsvpDeadlineFocused',

  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function eventCreatorReducer(
  state: EventCreatorState,
  action: EventCreatorDispatch
): EventCreatorState {
  switch (action.type) {
    case eventCreatorAction.setTitle:
      return {
        ...state,
        eventTitle: action.payload,
      };
    case eventCreatorAction.setIsValidTitle:
      return {
        ...state,
        isValidEventTitle: action.payload,
      };
    case eventCreatorAction.setIsTitleFocused:
      return {
        ...state,
        isEventTitleFocused: action.payload,
      };

    case eventCreatorAction.setEventKind:
      return {
        ...state,
        eventKind: action.payload,
      };

    case eventCreatorAction.setEventDate:
      return {
        ...state,
        eventDate: action.payload,
      };
    case eventCreatorAction.setIsValidEventDate:
      return {
        ...state,
        isValidEventDate: action.payload,
      };
    case eventCreatorAction.setIsEventDateFocused:
      return {
        ...state,
        isEventDateFocused: action.payload,
      };

    case eventCreatorAction.setEventStartTime:
      return {
        ...state,
        eventStartTime: action.payload,
      };
    case eventCreatorAction.setIsValidEventStartTime:
      return {
        ...state,
        isValidEventStartTime: action.payload,
      };
    case eventCreatorAction.setIsEventStartTimeFocused:
      return {
        ...state,
        isEventStartTimeFocused: action.payload,
      };

    case eventCreatorAction.setEventEndTime:
      return {
        ...state,
        eventEndTime: action.payload,
      };
    case eventCreatorAction.setIsValidEventEndTime:
      return {
        ...state,
        isValidEventEndTime: action.payload,
      };
    case eventCreatorAction.setIsEventEndTimeFocused:
      return {
        ...state,
        isEventEndTimeFocused: action.payload,
      };

    case eventCreatorAction.setEventLocation:
      return {
        ...state,
        eventLocation: action.payload,
      };
    case eventCreatorAction.setIsValidEventLocation:
      return {
        ...state,
        isValidEventLocation: action.payload,
      };
    case eventCreatorAction.setIsEventLocationFocused:
      return {
        ...state,
        isEventLocationFocused: action.payload,
      };

    case eventCreatorAction.setEventDescription:
      return {
        ...state,
        eventDescription: action.payload,
      };
    case eventCreatorAction.setIsValidEventDescription:
      return {
        ...state,
        isValidEventDescription: action.payload,
      };
    case eventCreatorAction.setIsEventDescriptionFocused:
      return {
        ...state,
        isEventDescriptionFocused: action.payload,
      };

    case eventCreatorAction.setEventAttendees:
      return {
        ...state,
        eventAttendees: action.payload,
      };
    case eventCreatorAction.setIsValidEventAttendees:
      return {
        ...state,
        isValidEventAttendees: action.payload,
      };
    case eventCreatorAction.setIsEventAttendeesFocused:
      return {
        ...state,
        isEventAttendeesFocused: action.payload,
      };

    case eventCreatorAction.setRequiredItems:
      return {
        ...state,
        requiredItems: action.payload,
      };
    case eventCreatorAction.setIsValidRequiredItems:
      return {
        ...state,
        isValidRequiredItems: action.payload,
      };
    case eventCreatorAction.setIsRequiredItemsFocused:
      return {
        ...state,
        isRequiredItemsFocused: action.payload,
      };

    case eventCreatorAction.setRsvpDeadline:
      return {
        ...state,
        rsvpDeadline: action.payload,
      };
    case eventCreatorAction.setIsValidRsvpDeadline:
      return {
        ...state,
        isValidRsvpDeadline: action.payload,
      };
    case eventCreatorAction.setIsRsvpDeadlineFocused:
      return {
        ...state,
        isRsvpDeadlineFocused: action.payload,
      };

    case eventCreatorAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case eventCreatorAction.setStepsInError:
      return {
        ...state,
        stepsInError: action.payload,
      };

    case eventCreatorAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case eventCreatorAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case eventCreatorAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case eventCreatorAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case eventCreatorAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case eventCreatorAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case eventCreatorAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case eventCreatorAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export { eventCreatorAction, eventCreatorReducer, initialEventCreatorState };