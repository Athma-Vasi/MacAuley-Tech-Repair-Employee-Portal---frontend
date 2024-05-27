import { DEPARTMENT_DATA, REQUEST_STATUS, URGENCY_DATA } from "../../constants/data";
import {
  DATE_FULL_RANGE_REGEX,
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
  USERNAME_REGEX,
} from "../../constants/regex";
import {
  MONEY_VALIDATIONS,
  TEXT_AREA_INPUT_VALIDATIONS,
  TEXT_INPUT_VALIDATIONS,
} from "../../constants/validations";
import {
  ResourceRoutePaths,
  RoleResourceRoutePaths,
  StepperChild,
  StepperPage,
} from "../../types";
import {
  returnDateFullRangeValidationText,
  returnDateNearFutureValidationText,
  returnFloatAmountValidationText,
  returnGrammarValidationText,
  returnUsernameRegexValidationText,
} from "../../utils";
import { ComponentQueryData } from "../queryBuilder";
import { DescriptionObjectsArray } from "../wrappers";
import { RequestResourceType } from "./create/types";

const REQUEST_RESOURCE_ROLE_PATHS: RoleResourceRoutePaths = {
  manager: "actions/company/request-resource",
  admin: "actions/company/request-resource",
  employee: "actions/company/request-resource/user",
};

function returnRequestResourceStepperPages(): StepperPage[] {
  const departmentChild: StepperChild = {
    inputType: "select",
    name: "department",
    selectInputData: DEPARTMENT_DATA,
  };

  const resourceTypeChild: StepperChild = {
    inputType: "select",
    name: "resourceType",
    selectInputData: REQUEST_RESOURCE_TYPE_DATA,
  };

  const resourceQuantityChild: StepperChild = {
    inputType: "text",
    name: "resourceQuantity",
    validations: MONEY_VALIDATIONS,
  };

  const resourceDescriptionChild: StepperChild = {
    inputType: "text",
    name: "resourceDescription",
    validations: TEXT_AREA_INPUT_VALIDATIONS,
  };

  const reasonForRequestChild: StepperChild = {
    inputType: "text",
    name: "reasonForRequest",
    validations: TEXT_INPUT_VALIDATIONS,
  };

  const urgencyChild: StepperChild = {
    inputType: "select",
    name: "urgency",
    selectInputData: URGENCY_DATA,
  };

  const dateNeededByChild: StepperChild = {
    inputType: "date",
    name: "dateNeededBy",
    validations: "dateNearFuture",
  };

  const additionalInformationChild: StepperChild = {
    inputType: "text",
    name: "additionalInformation",
    validations: TEXT_AREA_INPUT_VALIDATIONS,
  };

  const stepperPages: StepperPage[] = [
    {
      children: [
        departmentChild,
        resourceTypeChild,
        resourceQuantityChild,
        resourceDescriptionChild,
        reasonForRequestChild,
        urgencyChild,
        dateNeededByChild,
        additionalInformationChild,
      ],
      description: "Resource Request Details",
    },
    {
      children: [],
      description: "Review Resource Request",
      kind: "review",
    },
  ];

  return stepperPages;
}

const REQUEST_RESOURCE_TYPE_DATA: RequestResourceType[] = [
  "Hardware",
  "Software",
  "Access",
  "Other",
];

const REQUEST_RESOURCE_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: "Resource Details",
    ariaLabel: "Enter department, resource kind, quantity and description",
  },

  {
    description: "Reason and Urgency",
    ariaLabel:
      "Enter reason for request, urgency, additional information and date needed by",
  },

  {
    description: "Review and Proceed",
    ariaLabel: "Review accuracy of information and proceed",
  },
];

const REQUEST_RESOURCE_MAX_STEPPER_POSITION = 3;

const REQUEST_RESOURCE_QUERY_DATA: ComponentQueryData[] = [
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
    label: "Department",
    value: "department",
    inputKind: "selectInput",
    selectData: DEPARTMENT_DATA,
  },
  {
    label: "Resource Type",
    value: "resourceType",
    inputKind: "selectInput",
    selectData: REQUEST_RESOURCE_TYPE_DATA,
  },
  {
    label: "Resource Quantity",
    value: "resourceQuantity",
    inputKind: "numberInput",
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: "Resource Description",
    value: "resourceDescription",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Reason for Request",
    value: "reasonForRequest",
    inputKind: "textInput",
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Urgency",
    value: "urgency",
    inputKind: "selectInput",
    selectData: URGENCY_DATA,
  },
  {
    label: "Date Needed By",
    value: "dateNeededBy",
    inputKind: "dateInput",
    regex: DATE_NEAR_FUTURE_REGEX,
    regexValidationFn: returnDateNearFutureValidationText,
  },
  {
    label: "Additional Information",
    value: "additionalInformation",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Request Status",
    value: "requestStatus",
    inputKind: "selectInput",
    selectData: REQUEST_STATUS,
  },
];

const REQUEST_RESOURCE_PATHS: ResourceRoutePaths = {
  manager: "actions/company/request-resource",
  admin: "actions/company/request-resource",
  employee: "actions/company/request-resource/user",
};

export {
  REQUEST_RESOURCE_DESCRIPTION_OBJECTS,
  REQUEST_RESOURCE_TYPE_DATA,
  REQUEST_RESOURCE_MAX_STEPPER_POSITION,
  REQUEST_RESOURCE_PATHS,
  REQUEST_RESOURCE_QUERY_DATA,
  REQUEST_RESOURCE_ROLE_PATHS,
  returnRequestResourceStepperPages,
};
