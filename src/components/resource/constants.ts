import type { LimitPerPage } from "./types";

const LIMIT_PER_PAGE_DATA: LimitPerPage[] = ["10", "25", "50", "75"];

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
