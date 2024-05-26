import { SetPageInErrorPayload, StepperPage } from "../../../types";
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
  expiryDate: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  previewSurveyProps: {
    surveyTitle: string;
    surveyDescription: string;
    surveyQuestions: SurveyQuestions[];
  };
  questions: Array<string>;
  responseDataOptionsArray: Array<string[]>;
  responseInputHtml: Array<SurveyResponseInput>;
  responseKinds: Array<SurveyResponseKind>;
  surveyDescription: string;
  surveyRecipients: SurveyRecipient;
  surveyStatistics: SurveyStatistics[];
  surveyTitle: string;
  stepperPages: StepperPage[];
  triggerFormSubmit: boolean;
  triggerPreviewSurvey: boolean;
};

type SurveyDispatch =
  | {
      action: SurveyAction["addQuestion"];
      payload: undefined;
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
      payload: {
        index: number;
        payload: string;
      };
    }
  | {
      action: SurveyAction["setResponseKinds"];
      payload: {
        index: number;
        payload: SurveyResponseKind;
      };
    }
  | {
      action: SurveyAction["setResponseInputHtml"];
      payload: {
        index: number;
        payload: SurveyResponseInput;
      };
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
    }
  | {
      action: SurveyAction["deleteQuestion"];
      payload: number;
    }
  | {
      action: SurveyAction["deleteResponseDataOption"];
      payload: { questionIndex: number; responseDataOptionIndex: number };
    }
  | {
      action: SurveyAction["addResponseDataOption"];
      payload: number;
    }
  | {
      action: SurveyAction["setStepperPages"];
      payload: StepperPage[];
    };

export type { SurveyDispatch, SurveyQuestions, SurveyState };
