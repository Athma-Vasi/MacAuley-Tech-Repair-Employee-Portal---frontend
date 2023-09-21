import {
  DATE_FULL_RANGE_REGEX,
  FULL_NAME_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  MONEY_REGEX,
  URL_REGEX,
  USERNAME_REGEX,
} from '../../../constants/regex';
import {
  returnDateFullRangeValidationText,
  returnGrammarValidationText,
  returnNameValidationText,
  returnNumberAmountValidationText,
  returnUrlValidationText,
  returnUsernameRegexValidationText,
} from '../../../utils';
import { ComponentQueryData } from '../../queryBuilder';
import { DescriptionObjectsArray } from '../../wrappers';
import { ARTICLE_TITLE_REGEX } from '../constants';

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
    label: 'Title',
    value: 'title',
    inputKind: 'textInput',
    regex: ARTICLE_TITLE_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Author',
    value: 'author',
    inputKind: 'textInput',
    regex: FULL_NAME_REGEX,
    regexValidationFn: returnNameValidationText,
  },
  {
    label: 'Banner Image Src',
    value: 'bannerImageSrc',
    inputKind: 'textInput',
    regex: URL_REGEX,
    regexValidationFn: returnUrlValidationText,
  },
  {
    label: 'Banner Image Alt',
    value: 'bannerImageAlt',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Time to Read',
    value: 'timeToRead',
    inputKind: 'numberInput',
    regex: MONEY_REGEX,
    regexValidationFn: returnNumberAmountValidationText,
  },
];

export {
  CREATE_ANNOUNCEMENT_DESCRIPTION_OBJECTS,
  CREATE_ANNOUNCEMENT_MAX_STEPPER_POSITION,
  MAX_ARTICLE_LENGTH,
};
