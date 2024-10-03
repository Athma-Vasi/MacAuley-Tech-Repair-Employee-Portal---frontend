import type { SetPageInErrorPayload, UserRole } from "../../../types";
import type { EventAction } from "./actions";

type EventKind =
  | "Webinar"
  | "Workshop"
  | "Seminar"
  | "Conference"
  | "Networking"
  | "Tech Talk"
  | "Charity"
  | "Team Building"
  | "Awards"
  | "Other";

type EventSchema = {
  attendees: string;
  description: string;
  endDate: string;
  endTime: string;
  kind: EventKind;
  location: string;
  requiredItems: string;
  rsvpDeadline: string;
  startDate: string;
  startTime: string;
  title: string;
  userId: string;
  creatorRole: UserRole;
  username: string;
};

type EventDocument = EventSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type EventState = {
  attendees: string;
  description: string;
  endDate: string;
  endTime: string;
  errorMessage: string;
  isError: boolean;
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

type EventDispatch =
  | {
    action: EventAction["setAttendees"];
    payload: string;
  }
  | {
    action: EventAction["setDescription"];
    payload: string;
  }
  | {
    action: EventAction["setEndDate"];
    payload: string;
  }
  | {
    action: EventAction["setEndTime"];
    payload: string;
  }
  | {
    action: EventAction["setErrorMessage"];
    payload: string;
  }
  | {
    action: EventAction["setIsError"];
    payload: boolean;
  }
  | {
    action: EventAction["setKind"];
    payload: EventKind;
  }
  | {
    action: EventAction["setLocation"];
    payload: string;
  }
  | {
    action: EventAction["setStartDate"];
    payload: string;
  }
  | {
    action: EventAction["setStartTime"];
    payload: string;
  }
  | {
    action: EventAction["setIsSubmitting"];
    payload: boolean;
  }
  | {
    action: EventAction["setIsSuccessful"];
    payload: boolean;
  }
  | {
    action: EventAction["setPageInError"];
    payload: SetPageInErrorPayload;
  }
  | {
    action: EventAction["setRequiredItems"];
    payload: string;
  }
  | {
    action: EventAction["setRsvpDeadline"];
    payload: string;
  }
  | {
    action: EventAction["setTitle"];
    payload: string;
  }
  | {
    action: EventAction["setTriggerFormSubmit"];
    payload: boolean;
  };

export type {
  EventDispatch,
  EventDocument,
  EventKind,
  EventSchema,
  EventState,
};
