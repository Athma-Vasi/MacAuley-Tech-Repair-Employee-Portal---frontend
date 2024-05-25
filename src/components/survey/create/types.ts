import { SetPageInErrorPayload } from "../../../types";
import { PreviewSurveyProps } from "../preview/types";
import {
  SurveyRecipient,
  SurveyResponseInput,
  SurveyResponseKind,
  SurveyStatistics,
} from "../types";
import { SurveyAction } from "./actions";

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

type SurveyDispatch =
  | {
      action: SurveyAction["addNewQuestionGroup"];
      payload: SurveyQuestions;
    }
  | {
      action: SurveyAction["setSurveyTitle"];
      payload: string;
    }
  | {
      action: SurveyAction["setSurveyDescription"];
      payload: string;
    }
  | {
      action: SurveyAction["setExpiryDate"];
      payload: string;
    }
  | {
      action: SurveyAction["setSurveyRecipients"];
      payload: SurveyRecipient;
    }
  | {
      action: SurveyAction["setQuestions"];
      payload: string[];
    }
  | {
      action: SurveyAction["setResponseKinds"];
      payload: string[];
    }
  | {
      action: SurveyAction["setResponseInputHtml"];
      payload: string[];
    }
  | {
      action: SurveyAction["setSurveyStatistics"];
      payload: SurveyStatistics[];
    }
  | {
      action: SurveyAction["setTriggerFormSubmit"];
      payload: boolean;
    }
  | {
      action: SurveyAction["setTriggerPreviewSurvey"];
      payload: boolean;
    }
  | {
      action: SurveyAction["setPreviewSurveyProps"];
      payload: PreviewSurveyProps;
    }
  | {
      action: SurveyAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: SurveyAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: SurveyAction["setIsSuccessful"];
      payload: boolean;
    };

export type { SurveyDispatch, SurveyQuestions, SurveyState };
