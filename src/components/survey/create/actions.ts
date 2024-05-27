type SurveyAction = {
  addQuestion: "addQuestion";
  addResponseOption: "addResponseOption";
  addStepperChild: "addStepperChild";
  addStepperPage: "addStepperPage";
  deleteAllResponseOptionsForQuestion: "deleteAllResponseOptionsForQuestion";
  deleteQuestion: "deleteQuestion";
  deleteResponseOption: "deleteResponseOption";
  insertResponseOption: "insertResponseOption";
  setExpiryDate: "setExpiryDate";
  setIsSubmitting: "setIsSubmitting";
  setIsSuccessful: "setIsSuccessful";
  setPageInError: "setPageInError";
  setPreviewSurveyProps: "setPreviewSurveyProps";
  setQuestions: "setQuestions";
  setResponseInputs: "setResponseInputs";
  setResponseKinds: "setResponseKinds";
  setResponseOptions: "setResponseOptions";
  setSurveyDescription: "setSurveyDescription";
  setSurveyRecipients: "setSurveyRecipients";
  setSurveyStatistics: "setSurveyStatistics";
  setSurveyTitle: "setSurveyTitle";
  setTriggerFormSubmit: "setTriggerFormSubmit";
  setTriggerPreviewSurvey: "setTriggerPreviewSurvey";
  slideResponseOptionDown: "slideResponseOptionDown";
  slideResponseOptionUp: "slideResponseOptionUp";
};

const surveyAction: SurveyAction = {
  addQuestion: "addQuestion",
  addResponseOption: "addResponseOption",
  addStepperChild: "addStepperChild",
  addStepperPage: "addStepperPage",
  deleteAllResponseOptionsForQuestion: "deleteAllResponseOptionsForQuestion",
  deleteQuestion: "deleteQuestion",
  deleteResponseOption: "deleteResponseOption",
  insertResponseOption: "insertResponseOption",
  setExpiryDate: "setExpiryDate",
  setIsSubmitting: "setIsSubmitting",
  setIsSuccessful: "setIsSuccessful",
  setPageInError: "setPageInError",
  setPreviewSurveyProps: "setPreviewSurveyProps",
  setQuestions: "setQuestions",
  setResponseInputs: "setResponseInputs",
  setResponseKinds: "setResponseKinds",
  setResponseOptions: "setResponseOptions",
  setSurveyDescription: "setSurveyDescription",
  setSurveyRecipients: "setSurveyRecipients",
  setSurveyStatistics: "setSurveyStatistics",
  setSurveyTitle: "setSurveyTitle",
  setTriggerFormSubmit: "setTriggerFormSubmit",
  setTriggerPreviewSurvey: "setTriggerPreviewSurvey",
  slideResponseOptionDown: "slideResponseOptionDown",
  slideResponseOptionUp: "slideResponseOptionUp",
};

export { surveyAction };
export type { SurveyAction };
