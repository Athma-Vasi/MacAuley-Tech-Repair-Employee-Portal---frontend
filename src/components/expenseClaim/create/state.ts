import type { CreateExpenseClaimState } from "./types";

const initialCreateExpenseClaimState: CreateExpenseClaimState = {
  acknowledgement: false,
  additionalComments: "",
  expenseClaimAmount: "",
  expenseClaimCurrency: "USD",
  expenseClaimDate: "",
  expenseClaimDescription: "",
  expenseClaimKind: "Travel and Accomodation",
  formData: new FormData(),
  isSubmitting: false,
  isSuccessful: false,
  pagesInError: new Set(),
  triggerFormSubmit: false,
};

export { initialCreateExpenseClaimState };
