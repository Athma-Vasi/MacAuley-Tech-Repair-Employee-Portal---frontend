import { DescriptionObjectsArray } from '../../wrappers';

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

export {
  EVENT_CREATOR_DESCRIPTION_OBJECTS,
  EVENT_CREATOR_MAX_STEPPER_POSITION,
  EVENT_KIND_DATA,
};
