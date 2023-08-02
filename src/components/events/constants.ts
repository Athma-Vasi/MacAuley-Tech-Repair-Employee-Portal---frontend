import { ResourceRoutePaths } from '../../types';
import { ComponentQueryData } from '../queryBuilder';
import { DescriptionObjectsArray } from '../wrappers';

const EVENT_KIND_DATA = [
  'Webinar',
  'Workshop',
  'Seminar',
  'Conference',
  'Networking',
  'Tech Talk',
  'Charity',
  'Team Building',
  'Awards',
  'Other',
];

const EVENT_CREATOR_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Event date and time',
    ariaLabel:
      'Enter event title, description, kind, date, start time, end time',
  },

  {
    description: 'Event location and attendees',
    ariaLabel:
      'Enter event location, attendees, required items, and RSVP deadline',
  },

  {
    description: 'Review and proceed',
    ariaLabel:
      'Review all the information you have entered and ensure they are correct before proceeding',
  },
];

const EVENT_CREATOR_MAX_STEPPER_POSITION = 3;

const EVENT_CREATOR_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Event Title',
    value: 'eventTitle',
    inputKind: 'textInput',
  },
  {
    label: 'Event Kind',
    value: 'eventKind',
    inputKind: 'selectInput',
    selectData: EVENT_KIND_DATA,
  },
  {
    label: 'Event Start Date',
    value: 'eventStartDate',
    inputKind: 'dateInput',
  },
  {
    label: 'Event End Date',
    value: 'eventEndDate',
    inputKind: 'dateInput',
  },
  {
    label: 'Event Start Time',
    value: 'eventStartTime',
    inputKind: 'timeInput',
  },
  {
    label: 'Event End Time',
    value: 'eventEndTime',
    inputKind: 'timeInput',
  },
  {
    label: 'Event description',
    value: 'eventDescription',
    inputKind: 'textInput',
  },
  {
    label: 'Event location',
    value: 'eventLocation',
    inputKind: 'textInput',
  },
  {
    label: 'Event attendees',
    value: 'eventAttendees',
    inputKind: 'textInput',
  },
  {
    label: 'Event required items',
    value: 'eventRequiredItems',
    inputKind: 'textInput',
  },
  {
    label: 'Event RSVP deadline',
    value: 'eventRsvpDeadline',
    inputKind: 'dateInput',
  },
  {
    label: 'Created At',
    value: 'createdAt',
    inputKind: 'dateInput',
  },
  {
    label: 'Updated At',
    value: 'updatedAt',
    inputKind: 'dateInput',
  },
];

const EVENT_CREATOR_ROUTE_PATHS: ResourceRoutePaths = {
  manager: '/api/v1/actions/outreach/event-creator',
  admin: '/api/v1/actions/outreach/event-creator',
  employee: '/api/v1/actions/outreach/event-creator/user',
};

export {
  EVENT_CREATOR_DESCRIPTION_OBJECTS,
  EVENT_CREATOR_MAX_STEPPER_POSITION,
  EVENT_CREATOR_QUERY_DATA,
  EVENT_CREATOR_ROUTE_PATHS,
  EVENT_KIND_DATA,
};
