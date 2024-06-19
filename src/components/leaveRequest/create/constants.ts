import { CheckboxRadioSelectData } from "../../../types";
import { DescriptionObjectsArray } from "../../wrappers";
import { ReasonForLeave } from "../types";

const REASON_FOR_LEAVE_DATA: CheckboxRadioSelectData<ReasonForLeave> = [
  { label: "Vacation", value: "Vacation" },
  { label: "Medical", value: "Medical" },
  { label: "Parental", value: "Parental" },
  { label: "Bereavement", value: "Bereavement" },
  { label: "Jury Duty", value: "Jury Duty" },
  { label: "Military", value: "Military" },
  { label: "Education", value: "Education" },
  { label: "Religious", value: "Religious" },
  { label: "Other", value: "Other" },
];

const LEAVE_REQUEST_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: "Leave Request Details",
    ariaLabel:
      "Enter start date, end date, reason for leave, delegated to employee, delegated responsibilities, additional comments and acknowledgement",
  },

  {
    description: "Review and Proceed",
    ariaLabel: "Review accuracy of entered information before proceeding",
  },
];

const LEAVE_REQUEST_MAX_STEPPER_POSITION = 2;

export {
  LEAVE_REQUEST_DESCRIPTION_OBJECTS,
  LEAVE_REQUEST_MAX_STEPPER_POSITION,
  REASON_FOR_LEAVE_DATA,
};
