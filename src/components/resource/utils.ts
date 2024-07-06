import { formatDate, replaceLastCommaWithAnd } from "../../utils";

function formatDocumentValue(
  key: string,
  value: unknown,
  sliceNumber = 17
): { slicedValue: string; unSlicedValue: string } {
  const keysWithDateValues = new Set([
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

  const stringifiedValue =
    typeof value === "boolean"
      ? value === true
        ? "Yes"
        : "No"
      : Array.isArray(value)
      ? replaceLastCommaWithAnd(value.join(","))
      : typeof value === "object" && value !== null
      ? ""
      : keysWithDateValues.has(key)
      ? formatDate({
          date: value as string,
          formatOptions: { dateStyle: "short" },
          locale: "en-US",
        })
      : value?.toString() ?? "";

  return {
    slicedValue:
      stringifiedValue.length > sliceNumber
        ? `${stringifiedValue.slice(0, sliceNumber)}...`
        : stringifiedValue,
    unSlicedValue: stringifiedValue,
  };
}

export { formatDocumentValue };
