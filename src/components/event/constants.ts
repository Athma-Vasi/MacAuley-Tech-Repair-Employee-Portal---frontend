import {
  DATE_FULL_RANGE_REGEX,
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  TIME_RAILWAY_REGEX,
  USERNAME_REGEX,
} from '../../constants/regex';
import { ResourceRoutePaths } from '../../types';
import {
  returnDateFullRangeValidationText,
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
  returnTimeRailwayValidationText,
  returnUsernameRegexValidationText,
} from '../../utils';
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
    description: 'Event Date and Time',
    ariaLabel:
      'Enter event title, description, kind, date, start time, end time',
  },

  {
    description: 'Event Location and Attendees',
    ariaLabel:
      'Enter event location, attendees, required items, and RSVP deadline',
  },

  {
    description: 'Review and Proceed',
    ariaLabel:
      'Review all the information you have entered and ensure they are correct before proceeding',
  },
];

const EVENT_CREATOR_MAX_STEPPER_POSITION = 3;

const EVENT_CREATOR_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Username',
    value: 'username',
    inputKind: 'textInput',
    regex: USERNAME_REGEX,
    regexValidationFn: returnUsernameRegexValidationText,
  },
  {
    label: 'Created Date',
    value: 'createdAt',
    inputKind: 'dateInput',
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: 'Updated Date',
    value: 'updatedAt',
    inputKind: 'dateInput',
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: 'Event Title',
    value: 'eventTitle',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
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
    regex: DATE_NEAR_FUTURE_REGEX,
    regexValidationFn: returnDateNearFutureValidationText,
  },
  {
    label: 'Event End Date',
    value: 'eventEndDate',
    inputKind: 'dateInput',
    regex: DATE_NEAR_FUTURE_REGEX,
    regexValidationFn: returnDateNearFutureValidationText,
  },
  {
    label: 'Event Start Time',
    value: 'eventStartTime',
    inputKind: 'timeInput',
    regex: TIME_RAILWAY_REGEX,
    regexValidationFn: returnTimeRailwayValidationText,
  },
  {
    label: 'Event End Time',
    value: 'eventEndTime',
    inputKind: 'timeInput',
    regex: TIME_RAILWAY_REGEX,
    regexValidationFn: returnTimeRailwayValidationText,
  },
  {
    label: 'Event description',
    value: 'eventDescription',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Event location',
    value: 'eventLocation',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Event attendees',
    value: 'eventAttendees',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Event required items',
    value: 'eventRequiredItems',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Event RSVP deadline',
    value: 'eventRsvpDeadline',
    inputKind: 'dateInput',
    regex: DATE_NEAR_FUTURE_REGEX,
    regexValidationFn: returnDateNearFutureValidationText,
  },
];

const EVENT_CREATOR_ROUTE_PATHS: ResourceRoutePaths = {
  manager: 'actions/outreach/event',
  admin: 'actions/outreach/event',
  employee: 'actions/outreach/event/user',
};

export {
  EVENT_CREATOR_DESCRIPTION_OBJECTS,
  EVENT_CREATOR_MAX_STEPPER_POSITION,
  EVENT_CREATOR_QUERY_DATA,
  EVENT_CREATOR_ROUTE_PATHS,
  EVENT_KIND_DATA,
};
