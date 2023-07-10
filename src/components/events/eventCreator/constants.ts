import { DescriptionMap } from '../../stepperWrapper';

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

const EVENT_CREATOR_DESCRIPTION_MAP: DescriptionMap = new Map([
  [
    1,
    {
      description: 'Event date and time',
      ariaLabel:
        'Enter event title, description, kind, date, start time, end time',
    },
  ],
  [
    2,
    {
      description: 'Event location and attendees',
      ariaLabel:
        'Enter event location, attendees, required items, and RSVP deadline',
    },
  ],
  [
    3,
    {
      description: 'Review and proceed',
      ariaLabel:
        'Review all the information you have entered and ensure they are correct before proceeding',
    },
  ],
]);

const EVENT_CREATOR_MAX_STEPPER_POSITION = 3;

export {
  EVENT_CREATOR_DESCRIPTION_MAP,
  EVENT_CREATOR_MAX_STEPPER_POSITION,
  EVENT_KIND_DATA,
};
