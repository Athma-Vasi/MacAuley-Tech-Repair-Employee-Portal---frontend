import {
  Action,
  ActionsCompany,
  Currency,
  RequestStatus,
  SetPageInErrorPayload,
} from "../../../types";
import { CreateExpenseClaimAction } from "./actions";

type ExpenseClaimKind =
  | "Communication and Utilities"
  | "Equipment and Supplies"
  | "Insurance"
  | "Legal and Professional Fees"
  | "Marketing and Advertising"
  | "Miscellaneous"
  | "Rent and Leasing"
  | "Software and Licenses"
  | "Training and Certifications"
  | "Travel and Accomodation";

type ExpenseClaimSchema = {
  acknowledgement: boolean;
  action: Action;
  additionalComments: string;
  category: ActionsCompany;
  expenseClaimAmount: number;
  expenseClaimCurrency: Currency;
  expenseClaimDate: string;
  expenseClaimDescription: string;
  expenseClaimKind: ExpenseClaimKind;
  requestStatus: RequestStatus;
  uploadedFilesIds: string[];
  userId: string;
  username: string;
};

type ExpenseClaimDocument = ExpenseClaimSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type CreateExpenseClaimState = {
  acknowledgement: boolean;
  additionalComments: string;
  areImagesValid: boolean;
  expenseClaimAmount: string;
  expenseClaimCurrency: Currency;
  expenseClaimDate: string;
  expenseClaimDescription: string;
  expenseClaimKind: ExpenseClaimKind;
  files: FormData[];
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  triggerFormSubmit: boolean;
};

type CreateExpenseClaimDispatch =
  | {
      action: CreateExpenseClaimAction["setAcknowledgement"];
      payload: boolean;
    }
  | {
      action: CreateExpenseClaimAction["setAdditionalComments"];
      payload: string;
    }
  | {
      action: CreateExpenseClaimAction["setAreImagesValid"];
      payload: boolean;
    }
  | {
      action: CreateExpenseClaimAction["setExpenseClaimAmount"];
      payload: string;
    }
  | {
      action: CreateExpenseClaimAction["setExpenseClaimCurrency"];
      payload: Currency;
    }
  | {
      action: CreateExpenseClaimAction["setExpenseClaimDate"];
      payload: string;
    }
  | {
      action: CreateExpenseClaimAction["setExpenseClaimDescription"];
      payload: string;
    }
  | {
      action: CreateExpenseClaimAction["setExpenseClaimKind"];
      payload: ExpenseClaimKind;
    }
  | {
      action: CreateExpenseClaimAction["setImgFormDataArray"];
      payload: FormData[];
    }
  | {
      action: CreateExpenseClaimAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: CreateExpenseClaimAction["setIsSuccessful"];
      payload: boolean;
    }
  | {
      action: CreateExpenseClaimAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: CreateExpenseClaimAction["setTriggerFormSubmit"];
      payload: boolean;
    };

export type {
  CreateExpenseClaimAction,
  CreateExpenseClaimDispatch,
  CreateExpenseClaimState,
  ExpenseClaimDocument,
  ExpenseClaimKind,
  ExpenseClaimSchema,
};
