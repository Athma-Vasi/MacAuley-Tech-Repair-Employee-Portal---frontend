import { REQUEST_STATUS } from "../../constants/data";
import {
  DATE_FULL_RANGE_REGEX,
  DATE_NEAR_PAST_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import {
  ACKNOWLEDGEMENT_VALIDATIONS,
  DATE_NEAR_PAST_VALIDATIONS,
  MONEY_VALIDATIONS,
  TEXT_AREA_INPUT_VALIDATIONS,
} from "../../constants/validations";
import {
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
import { CURRENCY_DATA } from "../benefit/constants";
import { ComponentQueryData } from "../queryBuilder";
import { DescriptionObjectsArray } from "../wrappers";
import { ExpenseClaimKind } from "./create/types";

const CREATE_EXPENSE_CLAIM_ROLE_PATHS: RoleResourceRoutePaths = {
  manager: "actions/company/expense-claim",
  admin: "actions/company/expense-claim",
  employee: "actions/company/expense-claim/user",
};

function returnExpenseClaimStepperPages() {
  const acknowledgementSwitchChild: StepperChild = {
    inputType: "checkbox",
    name: "acknowledgement",
    validations: ACKNOWLEDGEMENT_VALIDATIONS,
  };

  const additionalCommentsTextChild: StepperChild = {
    inputType: "text",
    name: "additionalComments",
    validations: TEXT_AREA_INPUT_VALIDATIONS,
  };

  const expenseClaimAmountChild: StepperChild = {
    inputType: "text",
    name: "expenseClaimAmount",
    validations: MONEY_VALIDATIONS,
  };

  const expenseClaimCurrencyChild: StepperChild = {
    inputType: "select",
    name: "expenseClaimCurrency",
    selectInputData: CURRENCY_DATA,
  };

  const expenseClaimDateChild: StepperChild = {
    inputType: "date",
    name: "expenseClaimDate",
    validations: DATE_NEAR_PAST_VALIDATIONS,
  };

  const expenseClaimDescriptionChild: StepperChild = {
    inputType: "text",
    name: "expenseClaimDescription",
    validations: TEXT_AREA_INPUT_VALIDATIONS,
  };

  const expenseClaimKindChild: StepperChild = {
    inputType: "select",
    name: "expenseClaimKind",
    selectInputData: EXPENSE_CLAIM_KIND_DATA,
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

const EXPENSE_CLAIM_KIND_DATA: ExpenseClaimKind[] = [
  "Travel and Accomodation",
  "Miscellaneous",
  "Rent and Leasing",
  "Software and Licenses",
  "Training and Certifications",
  "Communication and Utilities",
  "Equipment and Supplies",
  "Insurance",
  "Legal and Professional Fees",
  "Marketing and Advertising",
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
  CREATE_EXPENSE_CLAIM_ROLE_PATHS,
  EXPENSE_CLAIM_DESCRIPTION_OBJECTS,
  EXPENSE_CLAIM_KIND_DATA,
  EXPENSE_CLAIM_MAX_IMG_AMOUNT,
  EXPENSE_CLAIM_MAX_IMG_SIZE,
  EXPENSE_CLAIM_MAX_STEPPER_POSITION,
  EXPENSE_CLAIM_QUERY_DATA,
  EXPENSE_CLAIM_ROUTE_PATHS,
  EXPENSE_CLAIMS_EXCLUDED_FIELDS_FROM_DISPLAY,
  returnExpenseClaimStepperPages,
};
