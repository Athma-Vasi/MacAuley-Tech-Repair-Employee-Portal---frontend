import { DescriptionMap } from '../../stepperWrapper';

const MAX_ARTICLE_LENGTH = 12000;

const CREATE_ANNOUNCEMENT_DESCRIPTION_MAP: DescriptionMap = new Map([
  [
    1,
    {
      description: 'Announcement details',
      ariaLabel:
        'Enter title, author name, banner image source and banner image alt text',
    },
  ],
  [
    2,
    {
      description: 'Announcement article',
      ariaLabel: 'Enter announcement article paragraphs',
    },
  ],
  [
    3,
    {
      description: 'Review and proceed',
      ariaLabel: 'Review announcement details and article before proceeding',
    },
  ],
]);

const CREATE_ANNOUNCEMENT_MAX_STEPPER_POSITION = 3;

export {
  CREATE_ANNOUNCEMENT_DESCRIPTION_MAP,
  CREATE_ANNOUNCEMENT_MAX_STEPPER_POSITION,
  MAX_ARTICLE_LENGTH,
};
