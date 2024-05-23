import { REQUEST_STATUS } from "../../constants/data";
import {
  DATE_FULL_RANGE_REGEX,
  DATE_NEAR_FUTURE_REGEX,
  FULL_NAME_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import {
  ACKNOWLEDGEMENT_REGEXES,
  DATE_NEAR_FUTURE_REGEXES,
  FULL_NAME_REGEXES,
  TEXT_AREA_INPUT_REGEXES,
} from "../../constants/regexes";
import { RoleResourceRoutePaths, StepperChild, StepperPage } from "../../types";
import {
  returnDateFullRangeValidationText,
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
  returnNameValidationText,
  returnUsernameRegexValidationText,
} from "../../utils";
import { ComponentQueryData } from "../queryBuilder";
import { REASON_FOR_LEAVE_DATA } from "./create/constants";

const LEAVE_REQUESTS_ROLE_PATHS: RoleResourceRoutePaths = {
  admin: "actions/company/leave-request",
  manager: "actions/company/leave-request",
  employee: "actions/company/leave-request/user",
};

function returnLeaveRequestStepperPages() {
  const acknowledgementChild: StepperChild = {
    inputType: "checkbox",
    name: "acknowledgement",
    regexes: ACKNOWLEDGEMENT_REGEXES,
  };

  const additionalCommentsChild: StepperChild = {
    inputType: "text",
    name: "additionalComments",
    regexes: TEXT_AREA_INPUT_REGEXES,
  };

  const delegatedResponsibilitiesChild: StepperChild = {
    inputType: "text",
    name: "delegatedResponsibilities",
    regexes: TEXT_AREA_INPUT_REGEXES,
  };

  const delegatedToEmployeeChild: StepperChild = {
    inputType: "text",
    name: "delegatedToEmployee",
    regexes: FULL_NAME_REGEXES,
  };

  const endDateChild: StepperChild = {
    inputType: "date",
    name: "endDate",
    regexes: DATE_NEAR_FUTURE_REGEXES,
  };

  const reasonForLeaveChild: StepperChild = {
    inputType: "select",
    name: "reasonForLeave",
    selectInputData: REASON_FOR_LEAVE_DATA,
  };

  const startDateChild: StepperChild = {
    inputType: "date",
    name: "startDate",
    regexes: DATE_NEAR_FUTURE_REGEXES,
  };

  const stepperPages: StepperPage[] = [
    {
      children: [
        acknowledgementChild,
        additionalCommentsChild,
        delegatedResponsibilitiesChild,
        delegatedToEmployeeChild,
        endDateChild,
        reasonForLeaveChild,
        startDateChild,
      ],
      description: "Create Leave Request",
    },
    {
      children: [],
      description: "Review Leave Request",
      kind: "review",
    },
  ];

  return stepperPages;
}

const LEAVE_REQUESTS_QUERY_DATA: ComponentQueryData[] = [
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
    label: "Start Date",
    value: "startDate",
    inputKind: "dateInput",
    regex: DATE_NEAR_FUTURE_REGEX,
    regexValidationFn: returnDateNearFutureValidationText,
  },
  {
    label: "End date",
    value: "endDate",
    inputKind: "dateInput",
    regex: DATE_NEAR_FUTURE_REGEX,
    regexValidationFn: returnDateNearFutureValidationText,
  },
  {
    label: "Reason for leave",
    value: "reasonForLeave",
    inputKind: "selectInput",
    selectData: REASON_FOR_LEAVE_DATA,
  },
  {
    label: "Request status",
    value: "requestStatus",
    inputKind: "selectInput",
    selectData: REQUEST_STATUS,
  },
  {
    label: "Delegated to employee",
    value: "delegatedToEmployee",
    inputKind: "textInput",
    regex: FULL_NAME_REGEX,
    regexValidationFn: returnNameValidationText,
  },
  {
    label: "Delegated responsibilities",
    value: "delegatedResponsibilities",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Additional comments",
    value: "additionalComments",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Acknowledgement",
    value: "acknowledgement",
    inputKind: "selectInput",
    selectData: ["true", "false"],
  },
];

const LEAVE_REQUESTS_PATHS = {
  manager: "actions/company/leave-request",
  admin: "actions/company/leave-request",
  employee: "actions/company/leave-request/user",
};

export {
  LEAVE_REQUESTS_PATHS,
  LEAVE_REQUESTS_QUERY_DATA,
  LEAVE_REQUESTS_ROLE_PATHS,
  returnLeaveRequestStepperPages,
};
