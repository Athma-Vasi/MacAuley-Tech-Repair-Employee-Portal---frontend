import type { CreateExpenseClaimState } from "./types";

const initialCreateExpenseClaimState: CreateExpenseClaimState = {
  acknowledgement: false,
  additionalComments: "",
  areImagesValid: false,
  expenseClaimAmount: "",
  expenseClaimCurrency: "USD",
  expenseClaimDate: "",
  expenseClaimDescription: "",
  expenseClaimKind: "Travel and Accomodation",
  files: [],
  isSubmitting: false,
  isSuccessful: false,
  pagesInError: new Set(),
  triggerFormSubmit: false,
};

export { initialCreateExpenseClaimState };
