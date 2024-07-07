import { CURRENCY_DATA, REQUEST_STATUS, REQUEST_STATUS_DATA } from "../../constants/data";
import {
  DATE_FULL_RANGE_REGEX,
  DATE_NEAR_PAST_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import {
  CheckboxRadioSelectData,
  ResourceRoutePaths,
  RoleResourceRoutePaths,
  StepperChild,
  StepperPage,
} from "../../types";
import {
  returnDateFullRangeValidationText,
  returnDateNearPastValidationText,
  returnFloatAmountValidationText,
  returnGrammarValidationText,
  returnUsernameRegexValidationText,
} from "../../utils";
import { ComponentQueryData } from "../queryBuilder";
import { DescriptionObjectsArray } from "../wrappers";
import { ExpenseClaimKind } from "./create/types";

const EXPENSE_CLAIM_ROLE_PATHS: RoleResourceRoutePaths = {
  manager: "actions/company/expense-claim",
  admin: "actions/company/expense-claim",
  employee: "actions/company/expense-claim/user",
};

function returnExpenseClaimStepperPages() {
  const acknowledgementSwitchChild: StepperChild = {
    inputType: "checkbox",
    name: "acknowledgement",
    validationKey: "acknowledgement",
  };

  const additionalCommentsTextChild: StepperChild = {
    inputType: "text",
    isRequired: false,
    name: "additionalComments",
    validationKey: "textAreaInput",
  };

  const expenseClaimAmountChild: StepperChild = {
    inputType: "text",
    name: "expenseClaimAmount",
    validationKey: "money",
  };

  const expenseClaimCurrencyChild: StepperChild = {
    inputType: "select",
    name: "expenseClaimCurrency",
    selectInputData: CURRENCY_DATA,
  };

  const expenseClaimDateChild: StepperChild = {
    inputType: "date",
    name: "expenseClaimDate",
    validationKey: "dateNearPast",
  };

  const expenseClaimDescriptionChild: StepperChild = {
    inputType: "text",
    name: "expenseClaimDescription",
    validationKey: "textAreaInput",
  };

  const expenseClaimKindChild: StepperChild = {
    inputType: "select",
    name: "expenseClaimKind",
    selectInputData: EXPENSE_CLAIM_KIND_DATA,
  };

  const requestStatusChild: StepperChild = {
    inputType: "select",
    name: "requestStatus",
    selectInputData: REQUEST_STATUS_DATA,
  };

  const stepperPages: StepperPage[] = [
    {
      children: [
        expenseClaimKindChild,
        expenseClaimAmountChild,
        expenseClaimCurrencyChild,
        expenseClaimDateChild,
        expenseClaimDescriptionChild,
        additionalCommentsTextChild,
        acknowledgementSwitchChild,
        requestStatusChild,
      ],
      description: "Expense Details",
    },
    {
      children: [],
      description: "Upload Receipts",
    },
    {
      children: [],
      description: "Review and Proceed",
      kind: "review",
    },
  ];

  return stepperPages;
}

const EXPENSE_CLAIM_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: "Expense Details",
    ariaLabel:
      "Enter expense claim kind, amount, currency, date, description, additional comments, acknowledgement and receipt",
  },
  {
    description: "Upload Receipts",
    ariaLabel: "Select up to 3 images of receipts to upload",
  },
  {
    description: "Review and Proceed",
    ariaLabel: "Review accuracy of information and proceed",
  },
];

const EXPENSE_CLAIM_MAX_STEPPER_POSITION = 3;

const EXPENSE_CLAIM_KIND_DATA: CheckboxRadioSelectData<ExpenseClaimKind> = [
  { label: "Travel and Accomodation", value: "Travel and Accomodation" },
  { label: "Miscellaneous", value: "Miscellaneous" },
  { label: "Rent and Leasing", value: "Rent and Leasing" },
  { label: "Software and Licenses", value: "Software and Licenses" },
  { label: "Training and Certifications", value: "Training and Certifications" },
  { label: "Communication and Utilities", value: "Communication and Utilities" },
  { label: "Equipment and Supplies", value: "Equipment and Supplies" },
  { label: "Insurance", value: "Insurance" },
  { label: "Legal and Professional Fees", value: "Legal and Professional Fees" },
  { label: "Marketing and Advertising", value: "Marketing and Advertising" },
];

const EXPENSE_CLAIM_MAX_IMG_AMOUNT = 3;

const EXPENSE_CLAIM_MAX_IMG_SIZE = 1 * 1024 * 1024;

const EXPENSE_CLAIM_QUERY_DATA: ComponentQueryData[] = [
  {
    label: "Username",
    value: "username",
    inputKind: "textInput",
    regex: USERNAME_REGEX,
    regexValidationFn: returnUsernameRegexValidationText,
  },
  {
    label: "Created Date",
    value: "createdAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Updated Date",
    value: "updatedAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Expense Claim Kind",
    value: "expenseClaimKind",
    inputKind: "selectInput",
    selectData: EXPENSE_CLAIM_KIND_DATA,
  },
  {
    label: "Expense Claim Amount",
    value: "expenseClaimAmount",
    inputKind: "numberInput",
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: "Expense Claim Currency",
    value: "expenseClaimCurrency",
    inputKind: "selectInput",
    selectData: CURRENCY_DATA,
  },
  {
    label: "Expense Claim Date",
    value: "expenseClaimDate",
    inputKind: "dateInput",
    regex: DATE_NEAR_PAST_REGEX,
    regexValidationFn: returnDateNearPastValidationText,
  },
  {
    label: "Expense Claim Description",
    value: "expenseClaimDescription",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Additional Comments",
    value: "additionalComments",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Acknowledgement",
    value: "acknowledgement",
    inputKind: "booleanInput",
    booleanData: [true, false],
  },
  {
    label: "Request Status",
    value: "requestStatus",
    inputKind: "selectInput",
    selectData: REQUEST_STATUS,
  },
];

const EXPENSE_CLAIM_ROUTE_PATHS: ResourceRoutePaths = {
  manager: "actions/company/expense-claim",
  admin: "actions/company/expense-claim",
  employee: "actions/company/expense-claim/user",
};

const EXPENSE_CLAIMS_EXCLUDED_FIELDS_FROM_DISPLAY = new Set(["fileUploads"]);

export {
  EXPENSE_CLAIM_DESCRIPTION_OBJECTS,
  EXPENSE_CLAIM_KIND_DATA,
  EXPENSE_CLAIM_MAX_IMG_AMOUNT,
  EXPENSE_CLAIM_MAX_IMG_SIZE,
  EXPENSE_CLAIM_MAX_STEPPER_POSITION,
  EXPENSE_CLAIM_QUERY_DATA,
  EXPENSE_CLAIM_ROLE_PATHS,
  EXPENSE_CLAIM_ROUTE_PATHS,
  EXPENSE_CLAIMS_EXCLUDED_FIELDS_FROM_DISPLAY,
  returnExpenseClaimStepperPages,
};
