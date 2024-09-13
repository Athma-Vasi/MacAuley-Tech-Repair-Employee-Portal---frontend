import { flattenObjectIterative } from "../../../utils";
import type { CurrentSearchObject, CustomerSearchOperator } from "./types";

type ReturnFilteredDocumentsInput<
  Doc extends Record<string, any> = Record<string, any>,
> = {
  currentSearchObject: CurrentSearchObject | null;
  documents: Doc[] | null;
  searchOperator: CustomerSearchOperator;
};

function returnFilteredDocuments<
  Doc extends Record<string, any> = Record<string, any>,
>({
  currentSearchObject,
  documents,
  searchOperator,
}: ReturnFilteredDocumentsInput<Doc>): Doc[] {
  const searchFieldsSet = new Set<string>(
    Object.keys(currentSearchObject ?? {}),
  );
  const documentsSet = new Set<Doc>(documents ?? []);

  return documents?.length && currentSearchObject
    ? Array.from(documentsSet).reduce<Doc[]>((filteredAcc, document) => {
      const flattenedObj = flattenObjectIterative<Doc>(document);

      switch (searchOperator) {
        case "OR": {
          Object.entries(flattenedObj).forEach(
            ([documentKey, documentValue]) => {
              const pattern = currentSearchObject[documentKey]?.toLowerCase() ??
                "";

              if (searchFieldsSet.has(documentKey)) {
                if (Array.isArray(documentValue) && documentValue.length) {
                  documentValue.forEach((value) => {
                    if (
                      boyerMooreHorspoolSimpleSearch(
                        pattern,
                        value.toString().toLowerCase(),
                      ) >= 0
                    ) {
                      filteredAcc.push(document);
                    }
                  });
                }

                if (
                  boyerMooreHorspoolSimpleSearch(
                    pattern,
                    documentValue.toString().toLowerCase(),
                  ) >= 0
                ) {
                  filteredAcc.push(document);
                }
              }
            },
          );

          break;
        }

        // "AND"
        default: {
          const isEveryFieldValueMatch = Object.entries(currentSearchObject)
            .every(
              ([searchKey, searchValue]) => {
                const pattern = searchValue?.toLowerCase() ?? "";
                const documentValue = flattenedObj[searchKey];

                if (Array.isArray(documentValue) && documentValue.length) {
                  return documentValue.every((value) => {
                    return (
                      boyerMooreHorspoolSimpleSearch(
                        pattern,
                        value.toString().toLowerCase(),
                      ) >= 0
                    );
                  });
                }

                return (
                  boyerMooreHorspoolSimpleSearch(
                    pattern,
                    documentValue.toString().toLowerCase(),
                  ) >= 0
                );
              },
            );

          if (isEveryFieldValueMatch) {
            filteredAcc.push(document);
          }

          break;
        }
      }

      return filteredAcc;
    }, [])
    : [];
}

/**
 * Boyer-Moore-Horspool is a string searching algorithm that finds the first occurrence of a pattern in a text by using a shift table where the pattern is compared with the text from right to left.
 * T: O(m * n) where m is the length of the pattern and n is the length of the text.
 * @see https://www.baeldung.com/java-full-text-search-algorithms
 */
function boyerMooreHorspoolSimpleSearch(pattern: string, text: string): number {
  const patternSize = pattern.length;
  const textSize = text.length;

  let i = 0;
  let j = 0;

  while (i + patternSize <= textSize) {
    j = patternSize - 1;
    while (text[i + j] === pattern[j]) {
      j -= 1;
      if (j < 0) {
        return i;
      }
    }
    i += 1;
  }

  return -1;
}

export { boyerMooreHorspoolSimpleSearch, returnFilteredDocuments };
