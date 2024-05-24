import { SetStepsInErrorPayload } from "../../../types";
import { DescriptionObjectsArray } from "../../wrappers";
import { PreviewSurveyProps } from "../preview/types";
import {
  SurveyRecipient,
  SurveyResponseInput,
  SurveyResponseKind,
  SurveyStatistics,
} from "../types";

type SurveyQuestions = {
  question: string;
  responseKind: SurveyResponseKind;
  responseInput: SurveyResponseInput;
  responseDataOptions: string[] | [];
};

type SurveyState = {
  surveyTitle: string;
  surveyDescription: string;
  expiryDate: string;
  surveyRecipients: SurveyRecipient;
  questions: Array<string>;
  responseKinds: Array<string>;
  responseInputHtml: Array<string>;
  responseDataOptionsArray: Array<string[]>;
  surveyStatistics: SurveyStatistics[];
  triggerFormSubmit: boolean;
  triggerPreviewSurvey: boolean;
  previewSurveyProps: {
    surveyTitle: string;
    surveyDescription: string;
    surveyQuestions: SurveyQuestions[];
  };
  pagesInError: Set<number>;
  isSubmitting: boolean;
  isSuccessful: boolean;
};

type SurveyAction = {
  setSurveyTitle: "setSurveyTitle";
  setIsValidSurveyTitle: "setIsValidSurveyTitle";
  setIsSurveyTitleFocused: "setIsSurveyTitleFocused";

  setSurveyDescription: "setSurveyDescription";
  setIsValidSurveyDescription: "setIsValidSurveyDescription";
  setIsSurveyDescriptionFocused: "setIsSurveyDescriptionFocused";

  setExpiryDate: "setExpiryDate";
  setIsValidExpiryDate: "setIsValidExpiryDate";
  setIsExpiryDateFocused: "setIsExpiryDateFocused";

  setSurveyRecipients: "setSurveyRecipients";

  setQuestions: "setQuestions";
  setAreValidQuestions: "setAreValidQuestions";
  setAreQuestionsFocused: "setAreQuestionsFocused";
  setIsMaxQuestionsReached: "setIsMaxQuestionsReached";

  deleteQuestionGroup: "deleteQuestionGroup";
  addNewQuestionGroup: "addNewQuestionGroup";

  setResponseKinds: "setResponseKinds";
  setResponseInputHtml: "setResponseInputHtml";

  setResponseDataOptions: "setResponseDataOptions";
  setAreResponseDataOptionsValid: "setAreResponseDataOptionsValid";
  setAreResponseDataOptionsFocused: "setAreResponseDataOptionsFocused";
  setIsMaxResponseDataOptionsReached: "setIsMaxResponseDataOptionsReached";

  deleteResponseDataOption: "deleteResponseDataOption";
  addNewResponseDataOption: "addNewResponseDataOption";
  deleteAllResponseDataOptionsForQuestion: "deleteAllResponseDataOptionsForQuestion";

  setSurveyStatistics: "setSurveyStatistics";

  setTriggerFormSubmit: "setTriggerFormSubmit";
  setSubmitButtonDisabled: "setSubmitButtonDisabled";
  setTriggerPreviewSurvey: "setTriggerPreviewSurvey";
  setPreviewSurveyProps: "setPreviewSurveyProps";

  updateStepperDescriptionObjects: "updateStepperDescriptionObjects";
  createStepperDescriptionObjects: "createStepperDescriptionObjects";
  setCurrentStepperPosition: "setCurrentStepperPosition";
  setStepsInError: "setStepsInError";

  setIsSubmitting: "setIsSubmitting";
  setSubmitMessage: "setSubmitMessage";
  setIsSuccessful: "setIsSuccessful";
  setSuccessMessage: "setSuccessMessage";
  setIsLoading: "setIsLoading";
  setLoadingMessage: "setLoadingMessage";
};

type SurveyDispatch =
  | {
      type:
        | SurveyAction["setSurveyTitle"]
        | SurveyAction["setSurveyDescription"]
        | SurveyAction["setExpiryDate"]
        | SurveyAction["setSubmitMessage"]
        | SurveyAction["setSuccessMessage"]
        | SurveyAction["setLoadingMessage"];

      payload: string;
    }
  | {
      type:
        | SurveyAction["setIsValidSurveyTitle"]
        | SurveyAction["setIsSurveyTitleFocused"]
        | SurveyAction["setIsValidSurveyDescription"]
        | SurveyAction["setIsSurveyDescriptionFocused"]
        | SurveyAction["setIsValidExpiryDate"]
        | SurveyAction["setIsExpiryDateFocused"]
        | SurveyAction["setIsMaxQuestionsReached"]
        | SurveyAction["setTriggerFormSubmit"]
        | SurveyAction["setSubmitButtonDisabled"]
        | SurveyAction["setTriggerPreviewSurvey"]
        | SurveyAction["setIsSubmitting"]
        | SurveyAction["setIsSuccessful"]
        | SurveyAction["setIsLoading"];

      payload: boolean;
    }
  | {
      type: SurveyAction["setSurveyRecipients"];
      payload: SurveyRecipient;
    }
  | {
      type:
        | SurveyAction["setQuestions"]
        | SurveyAction["setResponseKinds"]
        | SurveyAction["setResponseInputHtml"];

      payload: {
        index: number;
        value: string;
      };
    }
  | {
      type: SurveyAction["setResponseDataOptions"];
      payload: {
        questionIdx: number;
        optionIdx: number;
        value: string;
      };
    }
  | {
      type: SurveyAction["setAreResponseDataOptionsValid"];
      payload: Array<boolean[]>;
    }
  | {
      type: SurveyAction["setAreResponseDataOptionsFocused"];
      payload: {
        questionIdx: number;
        optionIdx: number;
        value: boolean;
      };
    }
  | {
      type: SurveyAction["setAreValidQuestions"];
      payload: boolean[];
    }
  | {
      type:
        | SurveyAction["setAreQuestionsFocused"]
        | SurveyAction["setIsMaxResponseDataOptionsReached"];
      payload: {
        index: number;
        value: boolean;
      };
    }
  | {
      type: SurveyAction["deleteResponseDataOption"];

      payload: {
        questionIdx: number;
        optionIdx: number;
      };
    }
  | {
      type:
        | SurveyAction["addNewResponseDataOption"]
        | SurveyAction["deleteAllResponseDataOptionsForQuestion"];
      payload: {
        questionIdx: number;
      };
    }
  | {
      type:
        | SurveyAction["setCurrentStepperPosition"]
        | SurveyAction["deleteQuestionGroup"]
        | SurveyAction["addNewQuestionGroup"];
      payload: number;
    }
  | {
      type: SurveyAction["setStepsInError"];
      payload: SetStepsInErrorPayload;
    }
  | {
      type:
        | SurveyAction["createStepperDescriptionObjects"]
        | SurveyAction["updateStepperDescriptionObjects"];
      payload: {
        index: number;
        value: {
          description: string;
          ariaLabel: string;
        };
      };
    }
  | {
      type: SurveyAction["setSurveyStatistics"];
      payload: SurveyStatistics[];
    }
  | {
      type: SurveyAction["setPreviewSurveyProps"];
      payload: Omit<PreviewSurveyProps, "closePreviewSurveyModal">;
    };

type SurveyReducer = (state: SurveyState, action: SurveyDispatch) => SurveyState;

export type { SurveyAction, SurveyDispatch, SurveyReducer, SurveyState, SurveyQuestions };
