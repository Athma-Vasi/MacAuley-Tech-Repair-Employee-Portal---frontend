import { DescriptionObjectsArray } from "../../wrappers";
import { SurveyAction, SurveyDispatch, SurveyState } from "./types";

const initialDescriptionObjects: DescriptionObjectsArray = [
  {
    description: "Survey details",
    ariaLabel: "Enter survey title, description, expiry date, recipients and anonymity",
  },

  {
    description: "Enter question 1",
    ariaLabel: "Enter question 1, response kind and corresponding html input type",
  },

  {
    description: "Review and proceed",
    ariaLabel: "Review survey questions and associated input types and proceed",
  },
];

const initialSurveyState: SurveyState = {
  surveyTitle: "",
  surveyDescription: "",
  expiryDate: "",
  surveyRecipients: "All",
  questions: [""],
  surveyStatistics: [],
  responseKinds: ["chooseAny"],
  responseInputHtml: ["checkbox"],
  responseDataOptionsArray: [],
  triggerFormSubmit: false,
  triggerPreviewSurvey: false,
  previewSurveyProps: {
    surveyTitle: "",
    surveyDescription: "",
    surveyQuestions: [],
  },
  pagesInError: new Set(),

  isSubmitting: false,
  isSuccessful: false,
};
export { initialDescriptionObjects, initialSurveyState };
