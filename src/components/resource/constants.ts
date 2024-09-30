import type { CheckboxRadioSelectData } from "../../types";
import type { LimitPerPage } from "./types";

const LIMIT_PER_PAGE_DATA: CheckboxRadioSelectData<LimitPerPage> = [
  { label: "10", value: "10" },
  { label: "25", value: "25" },
  { label: "50", value: "50" },
  { label: "75", value: "75" },
  { label: "100", value: "100" },
];

const UNMODIFIABLE_FIELDS_SET = new Set([
  "_id",
  "username",
  "userId",
  "userRole",
  "acknowledgement",
  "createdAt",
  "updatedAt",
  "__v",
]);

const KEYS_WITH_DATE_VALUES_SET = new Set([
  "createdAt",
  "updatedAt",
  // repair note
  "dateReceived",
  "estimatedCompletionDate",
  // company
  "planStartDate",
  "expenseClaimDate",
  "startDate",
  "endDate",
  "dateNeededBy",
  // general
  "dateOfOccurrence",
  // outreach
  "rsvpDeadline",
  "eventStartDate",
  "eventEndDate",
  // register - user
  "dateOfBirth",
]);

export {
  KEYS_WITH_DATE_VALUES_SET,
  LIMIT_PER_PAGE_DATA,
  UNMODIFIABLE_FIELDS_SET,
};
