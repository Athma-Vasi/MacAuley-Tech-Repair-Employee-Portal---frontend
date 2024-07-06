import { formatDate, replaceLastCommaWithAnd } from "../../utils";
import { KEYS_WITH_DATE_VALUES_SET } from "./constants";

function formatDocumentValue(
  key: string,
  value: unknown,
  sliceNumber = 17
): { slicedValue: string; unSlicedValue: string } {
  const stringifiedValue =
    typeof value === "boolean"
      ? value === true
        ? "Yes"
        : "No"
      : Array.isArray(value)
      ? replaceLastCommaWithAnd(value.join(","))
      : typeof value === "object" && value !== null
      ? ""
      : KEYS_WITH_DATE_VALUES_SET.has(key)
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
