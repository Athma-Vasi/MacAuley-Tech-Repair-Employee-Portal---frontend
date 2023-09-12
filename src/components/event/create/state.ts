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

  eventStartDate: '',
  isValidEventStartDate: false,
  isEventStartDateFocused: false,

  eventEndDate: '',
  isValidEventEndDate: false,
  isEventEndDateFocused: false,

  areValidEventDates: false,

  eventStartTime: '',
  isValidEventStartTime: false,
  isEventStartTimeFocused: false,

  eventEndTime: '',
  isValidEventEndTime: false,
  isEventEndTimeFocused: false,

  areValidEventTimes: false,

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

  triggerFormSubmit: false,
  currentStepperPosition: 0,
  stepsInError: new Set(),

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

  setEventStartDate: 'setEventStartDate',
  setIsValidEventStartDate: 'setIsValidEventStartDate',
  setIsEventStartDateFocused: 'setIsEventStartDateFocused',

  setEventEndDate: 'setEventEndDate',
  setIsValidEventEndDate: 'setIsValidEventEndDate',
  setIsEventEndDateFocused: 'setIsEventEndDateFocused',

  setAreValidEventDates: 'setAreValidEventDates',

  setEventStartTime: 'setEventStartTime',
  setIsValidEventStartTime: 'setIsValidEventStartTime',
  setIsEventStartTimeFocused: 'setIsEventStartTimeFocused',

  setEventEndTime: 'setEventEndTime',
  setIsValidEventEndTime: 'setIsValidEventEndTime',
  setIsEventEndTimeFocused: 'setIsEventEndTimeFocused',

  setAreValidEventTimes: 'setAreValidEventTimes',

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

  setTriggerFormSubmit: 'setTriggerFormSubmit',
  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

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

    case eventCreatorAction.setEventStartDate:
      return {
        ...state,
        eventStartDate: action.payload,
      };
    case eventCreatorAction.setIsValidEventStartDate:
      return {
        ...state,
        isValidEventStartDate: action.payload,
      };
    case eventCreatorAction.setIsEventStartDateFocused:
      return {
        ...state,
        isEventStartDateFocused: action.payload,
      };

    case eventCreatorAction.setEventEndDate:
      return {
        ...state,
        eventEndDate: action.payload,
      };
    case eventCreatorAction.setIsValidEventEndDate:
      return {
        ...state,
        isValidEventEndDate: action.payload,
      };
    case eventCreatorAction.setIsEventEndDateFocused:
      return {
        ...state,
        isEventEndDateFocused: action.payload,
      };

    case eventCreatorAction.setAreValidEventDates:
      return {
        ...state,
        areValidEventDates: action.payload,
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

    case eventCreatorAction.setAreValidEventTimes:
      return {
        ...state,
        areValidEventTimes: action.payload,
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

    case eventCreatorAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };

    case eventCreatorAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case eventCreatorAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

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
