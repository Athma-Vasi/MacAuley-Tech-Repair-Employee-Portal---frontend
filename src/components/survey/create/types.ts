import type {
  SetPageInErrorPayload,
  StepperChild,
  StepperPage,
} from "../../../types";
import type {
  SurveyRecipient,
  SurveyResponseInput,
  SurveyResponseKind,
  SurveyStatistics,
} from "../types";
import type { SurveyAction } from "./actions";

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
  responseOptions: Array<string[]>;
  responseInputs: Array<SurveyResponseInput>;
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
    action: SurveyAction["addResponseOption"];
    payload: number[];
  }
  | {
    action: SurveyAction["addStepperChild"];
    payload: {
      dynamicIndexes: number[];
      value: StepperChild;
    };
  }
  | {
    action: SurveyAction["addStepperPage"];
    payload: {
      dynamicIndexes: number[];
      value: StepperPage;
    };
  }
  | {
    action: SurveyAction["deleteAllResponseOptionsForQuestion"];
    payload: number[];
  }
  | {
    action: SurveyAction["deleteQuestion"];
    payload: number[];
  }
  | {
    action: SurveyAction["deleteResponseOption"];
    payload: number[];
  }
  | {
    action: SurveyAction["insertResponseOption"];
    payload: number[];
  }
  | {
    action: SurveyAction["setExpiryDate"];
    payload: string;
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
    action: SurveyAction["setPageInError"];
    payload: SetPageInErrorPayload;
  }
  | {
    action: SurveyAction["setQuestions"];
    payload: {
      dynamicIndexes: number[];
      value: string;
    };
  }
  | {
    action: SurveyAction["setResponseInputs"];
    payload: {
      dynamicIndexes: number[];
      value: SurveyResponseInput;
    };
  }
  | {
    action: SurveyAction["setResponseKinds"];
    payload: {
      dynamicIndexes: number[];
      value: SurveyResponseKind;
    };
  }
  | {
    action: SurveyAction["setResponseOptions"];
    payload: {
      dynamicIndexes: number[];
      value: string;
    };
  }
  | {
    action: SurveyAction["setSurveyDescription"];
    payload: string;
  }
  | {
    action: SurveyAction["setSurveyRecipients"];
    payload: SurveyRecipient;
  }
  | {
    action: SurveyAction["setSurveyStatistics"];
    payload: SurveyStatistics[];
  }
  | {
    action: SurveyAction["setSurveyTitle"];
    payload: string;
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
    action: SurveyAction["slideResponseOptionDown"];
    payload: number[];
  }
  | {
    action: SurveyAction["slideResponseOptionUp"];
    payload: number[];
  };

export type { SurveyDispatch, SurveyQuestions, SurveyState };
