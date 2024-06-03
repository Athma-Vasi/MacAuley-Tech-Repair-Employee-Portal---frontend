import {
  DATE_FULL_RANGE_REGEX,
  FULL_NAME_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  MONEY_REGEX,
  URL_REGEX,
  USERNAME_REGEX,
} from "../../../constants/regex";
import { RoleResourceRoutePaths, StepperChild, StepperPage } from "../../../types";
import {
  returnDateFullRangeValidationText,
  returnFloatAmountValidationText,
  returnGrammarValidationText,
  returnNameValidationText,
  returnUrlValidationText,
  returnUsernameRegexValidationText,
} from "../../../utils";
import { ComponentQueryData } from "../../queryBuilder";
import { DescriptionObjectsArray } from "../../wrappers";

const ANNOUNCEMENT_ROLE_ROUTE_PATHS: RoleResourceRoutePaths = {
  admin: "actions/outreach/announcement",
  manager: "actions/outreach/announcement",
  employee: "actions/outreach/announcement/user",
};

function returnAnnouncementStepperPages(): StepperPage[] {
  const authorChild: StepperChild = {
    inputType: "text",
    name: "author",
    validationKey: "textInput",
  };

  const bannerImageAltChild: StepperChild = {
    inputType: "text",
    name: "bannerImageAlt",
    validationKey: "textInput",
  };

  const bannerImageSrcChild: StepperChild = {
    inputType: "text",
    name: "bannerImageSrc",
    validationKey: "url",
  };

  const titleChild: StepperChild = {
    inputType: "text",
    name: "title",
    validationKey: "textInput",
  };

  return [
    {
      children: [titleChild, authorChild, bannerImageSrcChild, bannerImageAltChild],
      description: "Announcement Details",
    },
    {
      children: [],
      description: "Announcement Article",
    },
    {
      children: [],
      description: "Review and Proceed",
      kind: "review",
    },
  ];
}

const MAX_ARTICLE_LENGTH = 12000;

const ANNOUNCEMENT_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: "Announcement details",
    ariaLabel: "Enter title, author name, banner image source and banner image alt text",
  },

  {
    description: "Announcement article",
    ariaLabel: "Enter announcement article paragraphs",
  },

  {
    description: "Review and proceed",
    ariaLabel: "Review announcement details and article before proceeding",
  },
];

const ANNOUNCEMENT_MAX_STEPPER_POSITION = 3;

const ANNOUNCEMENT_QUERY_DATA: ComponentQueryData[] = [
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
    label: "Title",
    value: "title",
    inputKind: "textInput",
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Author",
    value: "author",
    inputKind: "textInput",
    regex: FULL_NAME_REGEX,
    regexValidationFn: returnNameValidationText,
  },
  {
    label: "Banner Image Src",
    value: "bannerImageSrc",
    inputKind: "textInput",
    regex: URL_REGEX,
    regexValidationFn: returnUrlValidationText,
  },
  {
    label: "Banner Image Alt",
    value: "bannerImageAlt",
    inputKind: "textInput",
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Time to Read",
    value: "timeToRead",
    inputKind: "numberInput",
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
];

export {
  ANNOUNCEMENT_DESCRIPTION_OBJECTS,
  ANNOUNCEMENT_MAX_STEPPER_POSITION,
  ANNOUNCEMENT_QUERY_DATA,
  ANNOUNCEMENT_ROLE_ROUTE_PATHS,
  MAX_ARTICLE_LENGTH,
  returnAnnouncementStepperPages,
};
