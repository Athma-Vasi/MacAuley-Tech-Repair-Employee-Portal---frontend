import { REQUEST_STATUS_DATA } from "../../constants/data";
import type {
  CheckboxRadioSelectData,
  RoleResourceRoutePaths,
  StepperChild,
  StepperPage,
} from "../../types";
import type { EventKind } from "./create/types";

const EVENT_ROLE_ROUTE_PATHS: RoleResourceRoutePaths = {
  manager: "actions/outreach/event",
  admin: "actions/outreach/event",
  employee: "actions/outreach/event/user",
};

function returnEventStepperPages(): StepperPage[] {
  const attendeesChild: StepperChild = {
    inputType: "text",
    name: "attendees",
    validationKey: "textAreaInput",
  };

  const descriptionChild: StepperChild = {
    inputType: "text",
    name: "description",
    validationKey: "textAreaInput",
  };

  const endDateChild: StepperChild = {
    inputType: "date",
    name: "endDate",
    validationKey: "dateNearFuture",
  };

  const endTimeChild: StepperChild = {
    inputType: "time",
    name: "endTime",
    validationKey: "timeRailway",
  };

  const kindChild: StepperChild = {
    inputType: "select",
    name: "kind",
    selectInputData: EVENT_KIND_DATA,
  };

  const locationChild: StepperChild = {
    inputType: "text",
    name: "location",
    validationKey: "textInput",
  };

  const requiredItemsChild: StepperChild = {
    inputType: "text",
    name: "requiredItems",
    validationKey: "textAreaInput",
  };

  const rsvpDeadlineChild: StepperChild = {
    inputType: "date",
    name: "rsvpDeadline",
    validationKey: "dateNearFuture",
  };

  const startDateChild: StepperChild = {
    inputType: "date",
    name: "startDate",
    validationKey: "dateNearFuture",
  };

  const startTimeChild: StepperChild = {
    inputType: "time",
    name: "startTime",
    validationKey: "timeRailway",
  };

  const titleChild: StepperChild = {
    inputType: "text",
    name: "title",
    validationKey: "textInput",
  };

  const requestStatusChild: StepperChild = {
    inputType: "select",
    name: "requestStatus",
    selectInputData: REQUEST_STATUS_DATA,
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
        requestStatusChild,
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

const EVENT_KIND_DATA: CheckboxRadioSelectData<EventKind> = [
  { label: "Webinar", value: "Webinar" },
  { label: "Workshop", value: "Workshop" },
  { label: "Seminar", value: "Seminar" },
  { label: "Conference", value: "Conference" },
  { label: "Networking", value: "Networking" },
  { label: "Tech Talk", value: "Tech Talk" },
  { label: "Charity", value: "Charity" },
  { label: "Team Building", value: "Team Building" },
  { label: "Awards", value: "Awards" },
  { label: "Other", value: "Other" },
];

const EVENT_CREATOR_MAX_STEPPER_POSITION = 3;

export {
  EVENT_CREATOR_MAX_STEPPER_POSITION,
  EVENT_KIND_DATA,
  EVENT_ROLE_ROUTE_PATHS,
  returnEventStepperPages,
};
