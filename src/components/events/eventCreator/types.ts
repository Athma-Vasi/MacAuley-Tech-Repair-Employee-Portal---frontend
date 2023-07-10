import {
  Action,
  ActionsOutreach,
  SetStepsInErrorPayload,
  UserRoles,
} from '../../../types';

type EventKind =
  | 'Webinar'
  | 'Workshop'
  | 'Seminar'
  | 'Conference'
  | 'Networking'
  | 'Tech Talk'
  | 'Charity'
  | 'Team Building'
  | 'Awards'
  | 'Other';

type EventCreatorSchema = {
  creatorId: string;
  creatorUsername: string;
  creatorRole: UserRoles;
  action: Action;
  category: ActionsOutreach;

  eventTitle: string;
  eventDescription: string;
  eventKind: EventKind;
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
  eventAttendees: string;
  requiredItems: string;
  rsvpDeadline: string;
};

type EventCreatorDocument = EventCreatorSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type EventCreatorState = {
  eventTitle: string;
  isValidEventTitle: boolean;
  isEventTitleFocused: boolean;

  eventKind: EventKind;

  eventStartDate: string;
  isValidEventStartDate: boolean;
  isEventStartDateFocused: boolean;

  eventEndDate: string;
  isValidEventEndDate: boolean;
  isEventEndDateFocused: boolean;

  eventStartTime: string;
  isValidEventStartTime: boolean;
  isEventStartTimeFocused: boolean;

  eventEndTime: string;
  isValidEventEndTime: boolean;
  isEventEndTimeFocused: boolean;

  eventLocation: string;
  isValidEventLocation: boolean;
  isEventLocationFocused: boolean;

  eventDescription: string;
  isValidEventDescription: boolean;
  isEventDescriptionFocused: boolean;

  eventAttendees: string;
  isValidEventAttendees: boolean;
  isEventAttendeesFocused: boolean;

  requiredItems: string;
  isValidRequiredItems: boolean;
  isRequiredItemsFocused: boolean;

  rsvpDeadline: string;
  isValidRsvpDeadline: boolean;
  isRsvpDeadlineFocused: boolean;

  currentStepperPosition: number;
  stepsInError: Set<number>;

  isError: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type EventCreatorAction = {
  setTitle: 'setTitle';
  setIsValidTitle: 'setIsValidTitle';
  setIsTitleFocused: 'setIsTitleFocused';

  setEventKind: 'setEventKind';

  setEventStartDate: 'setEventStartDate';
  setIsValidEventStartDate: 'setIsValidEventStartDate';
  setIsEventStartDateFocused: 'setIsEventStartDateFocused';

  setEventEndDate: 'setEventEndDate';
  setIsValidEventEndDate: 'setIsValidEventEndDate';
  setIsEventEndDateFocused: 'setIsEventEndDateFocused';

  setEventStartTime: 'setEventStartTime';
  setIsValidEventStartTime: 'setIsValidEventStartTime';
  setIsEventStartTimeFocused: 'setIsEventStartTimeFocused';

  setEventEndTime: 'setEventEndTime';
  setIsValidEventEndTime: 'setIsValidEventEndTime';
  setIsEventEndTimeFocused: 'setIsEventEndTimeFocused';

  setEventLocation: 'setEventLocation';
  setIsValidEventLocation: 'setIsValidEventLocation';
  setIsEventLocationFocused: 'setIsEventLocationFocused';

  setEventDescription: 'setEventDescription';
  setIsValidEventDescription: 'setIsValidEventDescription';
  setIsEventDescriptionFocused: 'setIsEventDescriptionFocused';

  setEventAttendees: 'setEventAttendees';
  setIsValidEventAttendees: 'setIsValidEventAttendees';
  setIsEventAttendeesFocused: 'setIsEventAttendeesFocused';

  setRequiredItems: 'setRequiredItems';
  setIsValidRequiredItems: 'setIsValidRequiredItems';
  setIsRequiredItemsFocused: 'setIsRequiredItemsFocused';

  setRsvpDeadline: 'setRsvpDeadline';
  setIsValidRsvpDeadline: 'setIsValidRsvpDeadline';
  setIsRsvpDeadlineFocused: 'setIsRsvpDeadlineFocused';

  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type EventCreatorDispatch =
  | {
      type:
        | EventCreatorAction['setTitle']
        | EventCreatorAction['setEventStartDate']
        | EventCreatorAction['setEventEndDate']
        | EventCreatorAction['setEventStartTime']
        | EventCreatorAction['setEventEndTime']
        | EventCreatorAction['setEventLocation']
        | EventCreatorAction['setEventDescription']
        | EventCreatorAction['setEventAttendees']
        | EventCreatorAction['setRequiredItems']
        | EventCreatorAction['setRsvpDeadline'];
      payload: string;
    }
  | {
      type:
        | EventCreatorAction['setIsValidTitle']
        | EventCreatorAction['setIsValidEventStartDate']
        | EventCreatorAction['setIsValidEventEndDate']
        | EventCreatorAction['setIsValidEventStartTime']
        | EventCreatorAction['setIsValidEventEndTime']
        | EventCreatorAction['setIsValidEventLocation']
        | EventCreatorAction['setIsValidEventDescription']
        | EventCreatorAction['setIsValidEventAttendees']
        | EventCreatorAction['setIsValidRequiredItems']
        | EventCreatorAction['setIsValidRsvpDeadline'];
      payload: boolean;
    }
  | {
      type:
        | EventCreatorAction['setIsTitleFocused']
        | EventCreatorAction['setIsEventStartDateFocused']
        | EventCreatorAction['setIsEventEndDateFocused']
        | EventCreatorAction['setIsEventStartTimeFocused']
        | EventCreatorAction['setIsEventEndTimeFocused']
        | EventCreatorAction['setIsEventLocationFocused']
        | EventCreatorAction['setIsEventDescriptionFocused']
        | EventCreatorAction['setIsEventAttendeesFocused']
        | EventCreatorAction['setIsRequiredItemsFocused']
        | EventCreatorAction['setIsRsvpDeadlineFocused'];
      payload: boolean;
    }
  | { type: EventCreatorAction['setEventKind']; payload: EventKind }
  | { type: EventCreatorAction['setCurrentStepperPosition']; payload: number }
  | {
      type: EventCreatorAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    }
  | {
      type:
        | EventCreatorAction['setIsError']
        | EventCreatorAction['setIsSubmitting']
        | EventCreatorAction['setIsSuccessful']
        | EventCreatorAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type:
        | EventCreatorAction['setErrorMessage']
        | EventCreatorAction['setSubmitMessage']
        | EventCreatorAction['setSuccessMessage']
        | EventCreatorAction['setLoadingMessage'];
      payload: string;
    };

export type {
  EventCreatorAction,
  EventCreatorDispatch,
  EventCreatorDocument,
  EventCreatorSchema,
  EventCreatorState,
  EventKind,
};
