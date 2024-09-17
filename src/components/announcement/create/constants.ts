import { REQUEST_STATUS_DATA } from "../../../constants/data";
import type { StepperChild, StepperPage } from "../../../types";

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

  const requestStatusChild: StepperChild = {
    inputType: "select",
    name: "requestStatus",
    selectInputData: REQUEST_STATUS_DATA,
  };

  return [
    {
      children: [
        titleChild,
        authorChild,
        bannerImageSrcChild,
        bannerImageAltChild,
        requestStatusChild,
      ],
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

const ANNOUNCEMENT_MAX_STEPPER_POSITION = 3;

export {
  ANNOUNCEMENT_MAX_STEPPER_POSITION,
  MAX_ARTICLE_LENGTH,
  returnAnnouncementStepperPages,
};
