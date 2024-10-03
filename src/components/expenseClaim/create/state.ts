import type { ExpenseClaimState } from "./types";

const initialExpenseClaimState: ExpenseClaimState = {
  acknowledgement: false,
  additionalComments: "",
  errorMessage: "",
  expenseClaimAmount: "",
  expenseClaimCurrency: "USD",
  expenseClaimDate: "",
  expenseClaimDescription: "",
  expenseClaimKind: "Travel and Accomodation",
  formData: [new FormData()],
  isError: false,
  isSubmitting: false,
  isSuccessful: false,
  pagesInError: new Set(),
  triggerFormSubmit: false,
};

export { initialExpenseClaimState };
