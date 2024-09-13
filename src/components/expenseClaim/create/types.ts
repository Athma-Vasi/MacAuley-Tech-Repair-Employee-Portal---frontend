import type {
  Currency,
  RequestStatus,
  SetPageInErrorPayload,
} from "../../../types";
import type { ExpenseClaimAction } from "./actions";

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
  additionalComments: string;
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

type ExpenseClaimState = {
  acknowledgement: boolean;
  additionalComments: string;
  expenseClaimAmount: string;
  expenseClaimCurrency: Currency;
  expenseClaimDate: string;
  expenseClaimDescription: string;
  expenseClaimKind: ExpenseClaimKind;
  formData: Array<FormData>;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  triggerFormSubmit: boolean;
};

type ExpenseClaimDispatch =
  | {
    action: ExpenseClaimAction["setAcknowledgement"];
    payload: boolean;
  }
  | {
    action: ExpenseClaimAction["setAdditionalComments"];
    payload: string;
  }
  | {
    action: ExpenseClaimAction["setExpenseClaimAmount"];
    payload: string;
  }
  | {
    action: ExpenseClaimAction["setExpenseClaimCurrency"];
    payload: Currency;
  }
  | {
    action: ExpenseClaimAction["setExpenseClaimDate"];
    payload: string;
  }
  | {
    action: ExpenseClaimAction["setExpenseClaimDescription"];
    payload: string;
  }
  | {
    action: ExpenseClaimAction["setExpenseClaimKind"];
    payload: ExpenseClaimKind;
  }
  | {
    action: ExpenseClaimAction["setFormData"];
    payload: FormData;
  }
  | {
    action: ExpenseClaimAction["setIsSubmitting"];
    payload: boolean;
  }
  | {
    action: ExpenseClaimAction["setIsSuccessful"];
    payload: boolean;
  }
  | {
    action: ExpenseClaimAction["setPageInError"];
    payload: SetPageInErrorPayload;
  }
  | {
    action: ExpenseClaimAction["setTriggerFormSubmit"];
    payload: boolean;
  };

export type {
  ExpenseClaimAction,
  ExpenseClaimDispatch,
  ExpenseClaimDocument,
  ExpenseClaimKind,
  ExpenseClaimSchema,
  ExpenseClaimState,
};
