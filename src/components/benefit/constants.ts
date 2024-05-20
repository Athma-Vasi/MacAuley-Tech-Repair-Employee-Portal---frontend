import { REQUEST_STATUS } from "../../constants/data";
import {
  DATE_FULL_RANGE_REGEX,
  DATE_REGEX,
  MONEY_REGEX,
  PLAN_DESCRIPTION_REGEX,
  PLAN_NAME_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import { DATE_REGEXES, MONEY_REGEXES } from "../../constants/regexes";
import {
  Currency,
  ResourceRoutePaths,
  RoleResourceRoutePaths,
  StepperChild,
  StepperPage,
} from "../../types";
import {
  returnDateFullRangeValidationText,
  returnDateValidationText,
  returnFloatAmountValidationText,
  returnGrammarValidationText,
  returnUsernameRegexValidationText,
} from "../../utils";
import { ComponentQueryData } from "../queryBuilder";
import { DescriptionObjectsArray } from "../wrappers";
import { PLAN_DESCRIPTION_REGEXES, PLAN_NAME_REGEXES } from "./create/regexes";
import { BenefitsPlanKind } from "./create/types";

const CREATE_BENEFIT_ROLE_PATHS: RoleResourceRoutePaths = {
  manager: "actions/company/benefit",
  admin: "actions/company/benefit",
  employee: "actions/company/benefit/user",
};

const CREATE_BENEFIT_DISPLAY_LOCATION = "/home/company/benefit";

function returnCreateBenefitStepperPages() {
  const currencyInput: StepperChild = {
    inputType: "select",
    name: "currency",
    selectInputData: CURRENCY_DATA,
  };

  const employerContributionInput: StepperChild = {
    inputType: "text",
    name: "employerContribution",
    regexes: MONEY_REGEXES,
  };

  const employeeContributionInput: StepperChild = {
    inputType: "text",
    name: "employeeContribution",
    regexes: MONEY_REGEXES,
  };

  const isPlanActiveInput: StepperChild = {
    inputType: "boolean",
    name: "isPlanActive",
  };

  const planDescriptionInput: StepperChild = {
    inputType: "text",
    name: "planDescription",
    regexes: PLAN_DESCRIPTION_REGEXES,
  };

  const planKindInput: StepperChild = {
    inputType: "select",
    name: "planKind",
    selectInputData: BENEFIT_PLAN_DATA,
  };

  const planNameInput: StepperChild = {
    inputType: "text",
    name: "planName",
    regexes: PLAN_NAME_REGEXES,
  };

  const planStartDateInput: StepperChild = {
    inputType: "date",
    name: "planStartDate",
    regexes: DATE_REGEXES,
  };

  const stepperPages: StepperPage[] = [
    {
      children: [
        planNameInput,
        planDescriptionInput,
        planKindInput,
        planStartDateInput,
        currencyInput,
        employerContributionInput,
        employeeContributionInput,
        isPlanActiveInput,
      ],
      description: "Plan Details",
    },
    {
      children: [],
      description: "Review plan details",
      kind: "review",
    },
  ];

  return stepperPages;
}

const BENEFIT_PLAN_DATA: BenefitsPlanKind[] = [
  "Health",
  "Dental",
  "Vision",
  "Life",
  "Disability",
  "Retirement",
  "Education",
  "Other",
];

const CURRENCY_DATA: Currency[] = ["USD", "CAD"];

const CREATE_BENEFIT_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: "Plan Details",
    ariaLabel: "Enter plan name, description, start date, and plan kind",
  },

  {
    description: "Plan Contributions",
    ariaLabel: "Enter currency, employer and employee contributions, and plan status",
  },

  {
    description: "Review and Proceed",
    ariaLabel:
      "Please review plan details and ensure accuracy of information before proceeding",
  },
];

const CREATE_BENEFIT_MAX_STEPPER_POSITION = 3;

const BENEFIT_QUERY_DATA: ComponentQueryData[] = [
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
    label: "Plan Name",
    value: "planName",
    inputKind: "textInput",
    regex: PLAN_NAME_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Plan Description",
    value: "planDescription",
    inputKind: "textInput",
    regex: PLAN_DESCRIPTION_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Plan Kind",
    value: "planKind",
    inputKind: "selectInput",
    selectData: BENEFIT_PLAN_DATA,
  },
  {
    label: "Plan Start Date",
    value: "planStartDate",
    inputKind: "dateInput",
    regex: DATE_REGEX,
    regexValidationFn: returnDateValidationText,
  },
  {
    label: "Is Plan Active",
    value: "isPlanActive",
    inputKind: "booleanInput",
    booleanData: [true, false],
  },
  {
    label: "Currency",
    value: "currency",
    inputKind: "selectInput",
    selectData: CURRENCY_DATA,
  },
  {
    label: "Employer Contribution",
    value: "employerContribution",
    inputKind: "numberInput",
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: "Employee Contribution",
    value: "employeeContribution",
    inputKind: "numberInput",
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: "Monthly Premium",
    value: "monthlyPremium",
    inputKind: "numberInput",
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: "Request Status",
    value: "requestStatus",
    inputKind: "selectInput",
    selectData: REQUEST_STATUS,
  },
];

const BENEFIT_RESOURCE_PATHS: ResourceRoutePaths = {
  manager: "actions/company/benefit",
  admin: "actions/company/benefit",
  employee: "actions/company/benefit/user",
};

export {
  BENEFIT_PLAN_DATA,
  BENEFIT_QUERY_DATA,
  BENEFIT_RESOURCE_PATHS,
  CREATE_BENEFIT_DESCRIPTION_OBJECTS,
  CREATE_BENEFIT_DISPLAY_LOCATION,
  CREATE_BENEFIT_MAX_STEPPER_POSITION,
  CREATE_BENEFIT_ROLE_PATHS,
  CURRENCY_DATA,
  PLAN_DESCRIPTION_REGEX,
  PLAN_NAME_REGEX,
  returnCreateBenefitStepperPages,
};
