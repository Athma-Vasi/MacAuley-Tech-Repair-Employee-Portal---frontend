import { ComponentQueryData } from '../../queryBuilder';
import { DescriptionObjectsArray } from '../../wrappers';

const MAX_ARTICLE_LENGTH = 12000;

const CREATE_ANNOUNCEMENT_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Announcement details',
    ariaLabel:
      'Enter title, author name, banner image source and banner image alt text',
  },

  {
    description: 'Announcement article',
    ariaLabel: 'Enter announcement article paragraphs',
  },

  {
    description: 'Review and proceed',
    ariaLabel: 'Review announcement details and article before proceeding',
  },
];

const CREATE_ANNOUNCEMENT_MAX_STEPPER_POSITION = 3;

const ANNOUNCEMENT_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Title',
    value: 'title',
    inputKind: 'textInput',
  },
  {
    label: 'Author',
    value: 'author',
    inputKind: 'textInput',
  },
  {
    label: 'Time to read',
    value: 'timeToRead',
    inputKind: 'numberInput',
  },
  {
    label: 'Created at',
    value: 'createdAt',
    inputKind: 'dateInput',
  },
  {
    label: 'Updated at',
    value: 'updatedAt',
    inputKind: 'dateInput',
  },
];

export {
  CREATE_ANNOUNCEMENT_DESCRIPTION_OBJECTS,
  CREATE_ANNOUNCEMENT_MAX_STEPPER_POSITION,
  MAX_ARTICLE_LENGTH,
};
