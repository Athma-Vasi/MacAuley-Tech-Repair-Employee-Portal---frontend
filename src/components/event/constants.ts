import {
  DATE_FULL_RANGE_REGEX,
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  TIME_RAILWAY_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import {
  TEXT_AREA_INPUT_VALIDATIONS,
  TEXT_INPUT_VALIDATIONS,
} from "../../constants/validations";
import {
  ResourceRoutePaths,
  RoleResourceRoutePaths,
  StepperChild,
  StepperPage,
} from "../../types";
import {
  returnDateFullRangeValidationText,
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
  returnTimeRailwayValidationText,
  returnUsernameRegexValidationText,
} from "../../utils";
import { TIME_RAILWAY_VALIDATIONS } from "../printerIssue/create/validations";
import { ComponentQueryData } from "../queryBuilder";
import { DescriptionObjectsArray } from "../wrappers";
import { EventKind } from "./create/types";

const EVENT_ROLE_ROUTE_PATHS: RoleResourceRoutePaths = {
  manager: "actions/outreach/event",
  admin: "actions/outreach/event",
  employee: "actions/outreach/event/user",
};

function returnEventStepperPages(): StepperPage[] {
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

  const attendeesChild: StepperChild = {
    inputType: "text",
    name: "attendees",
    validations: TEXT_AREA_INPUT_VALIDATIONS,
  };

  const descriptionChild: StepperChild = {
    inputType: "text",
    name: "description",
    validations: TEXT_AREA_INPUT_VALIDATIONS,
  };

  const endDateChild: StepperChild = {
    inputType: "date",
    name: "endDate",
    validations: "dateNearFuture",
  };

  const endTimeChild: StepperChild = {
    inputType: "time",
    name: "endTime",
    validations: TIME_RAILWAY_VALIDATIONS,
  };

  const kindChild: StepperChild = {
    inputType: "select",
    name: "kind",
    selectInputData: EVENT_KIND_DATA,
  };

  const locationChild: StepperChild = {
    inputType: "text",
    name: "location",
    validations: TEXT_INPUT_VALIDATIONS,
  };

  const requiredItemsChild: StepperChild = {
    inputType: "text",
    name: "requiredItems",
    validations: TEXT_AREA_INPUT_VALIDATIONS,
  };

  const rsvpDeadlineChild: StepperChild = {
    inputType: "date",
    name: "rsvpDeadline",
    validations: "dateNearFuture",
  };

  const startDateChild: StepperChild = {
    inputType: "date",
    name: "startDate",
    validations: "dateNearFuture",
  };

  const startTimeChild: StepperChild = {
    inputType: "time",
    name: "startTime",
    validations: TIME_RAILWAY_VALIDATIONS,
  };

  const titleChild: StepperChild = {
    inputType: "text",
    name: "title",
    validations: TEXT_INPUT_VALIDATIONS,
  };

  return [
    {
      children: [
        titleChild,
        kindChild,
        startDateChild,
        endDateChild,
        startTimeChild,
        endTimeChild,
      ],
      description: "Event Date and Time",
    },
    {
      children: [
        descriptionChild,
        locationChild,
        attendeesChild,
        requiredItemsChild,
        rsvpDeadlineChild,
      ],
      description: "Event Description",
    },
    {
      children: [],
      description: "Review and Proceed",
      kind: "review",
    },
  ];
}

const EVENT_KIND_DATA: EventKind[] = [
  "Webinar",
  "Workshop",
  "Seminar",
  "Conference",
  "Networking",
  "Tech Talk",
  "Charity",
  "Team Building",
  "Awards",
  "Other",
];

const EVENT_CREATOR_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: "Event Date and Time",
    ariaLabel: "Enter event title, description, kind, date, start time, end time",
  },

  {
    description: "Event Location and Attendees",
    ariaLabel: "Enter event location, attendees, required items, and RSVP deadline",
  },

  {
    description: "Review and Proceed",
    ariaLabel:
      "Review all the information you have entered and ensure they are correct before proceeding",
  },
];

const EVENT_CREATOR_MAX_STEPPER_POSITION = 3;

const EVENT_CREATOR_QUERY_DATA: ComponentQueryData[] = [
  {
    label: "Username",
    value: "username",
    inputKind: "textInput",
    regex: USERNAME_REGEX,
    regexValidationFn: returnUsernameRegexValidationText,
  },
  {
    label: "Created Date",
    value: "createdAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Updated Date",
    value: "updatedAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Event Title",
    value: "title",
    inputKind: "textInput",
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Event Kind",
    value: "kind",
    inputKind: "selectInput",
    selectData: EVENT_KIND_DATA,
  },
  {
    label: "Event Start Date",
    value: "startDate",
    inputKind: "dateInput",
    regex: DATE_NEAR_FUTURE_REGEX,
    regexValidationFn: returnDateNearFutureValidationText,
  },
  {
    label: "Event End Date",
    value: "endDate",
    inputKind: "dateInput",
    regex: DATE_NEAR_FUTURE_REGEX,
    regexValidationFn: returnDateNearFutureValidationText,
  },
  {
    label: "Event Start Time",
    value: "startTime",
    inputKind: "timeInput",
    regex: TIME_RAILWAY_REGEX,
    regexValidationFn: returnTimeRailwayValidationText,
  },
  {
    label: "Event End Time",
    value: "endTime",
    inputKind: "timeInput",
    regex: TIME_RAILWAY_REGEX,
    regexValidationFn: returnTimeRailwayValidationText,
  },
  {
    label: "Event description",
    value: "description",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Event location",
    value: "location",
    inputKind: "textInput",
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Event attendees",
    value: "attendees",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Event required items",
    value: "eventRequiredItems",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Event RSVP deadline",
    value: "eventRsvpDeadline",
    inputKind: "dateInput",
    regex: DATE_NEAR_FUTURE_REGEX,
    regexValidationFn: returnDateNearFutureValidationText,
  },
];

const EVENT_CREATOR_ROUTE_PATHS: ResourceRoutePaths = {
  manager: "actions/outreach/event",
  admin: "actions/outreach/event",
  employee: "actions/outreach/event/user",
};

export {
  EVENT_CREATOR_DESCRIPTION_OBJECTS,
  EVENT_CREATOR_MAX_STEPPER_POSITION,
  EVENT_CREATOR_QUERY_DATA,
  EVENT_CREATOR_ROUTE_PATHS,
  EVENT_KIND_DATA,
  EVENT_ROLE_ROUTE_PATHS,
  returnEventStepperPages,
};
