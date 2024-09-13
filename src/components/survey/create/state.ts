import { returnSurveyStepperPages } from "../constants";
import type { SurveyState } from "./types";

const initialSurveyState: SurveyState = {
  surveyTitle: "",
  surveyDescription: "",
  expiryDate: "",
  surveyRecipients: "All",
  questions: [""],
  surveyStatistics: [],
  responseKinds: ["chooseAny"],
  responseInputs: ["checkbox"],
  responseOptions: [[""]],
  triggerFormSubmit: false,
  triggerPreviewSurvey: false,
  previewSurveyProps: {
    surveyTitle: "",
    surveyDescription: "",
    surveyQuestions: [],
  },
  pagesInError: new Set(),
  stepperPages: returnSurveyStepperPages(),
  isSubmitting: false,
  isSuccessful: false,
};
export { initialSurveyState };
