import {
  Code,
  Flex,
  Grid,
  MantineNumberSize,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { TbArrowDown, TbArrowUp } from "react-icons/tb";

import { COLORS_SWATCHES } from "../../../constants/data";
import { ThemeObject } from "../../../context/globalProvider/types";
import { returnAccessibleButtonElements } from "../../../jsxCreators";
import {
  flattenObjectIterative,
  replaceLastCommaWithAnd,
  returnThemeColors,
  splitCamelCase,
} from "../../../utils";
import { CurrentSearchObject, CustomerSearchOperator } from "./types";

type ReturnFilteredDocumentsInput<Doc extends Record<string, any> = Record<string, any>> =
  {
    currentSearchObject: CurrentSearchObject | null;
    documents: Doc[] | null;
    searchOperator: CustomerSearchOperator;
  };

function returnFilteredDocuments<Doc extends Record<string, any> = Record<string, any>>({
  currentSearchObject,
  documents,
  searchOperator,
}: ReturnFilteredDocumentsInput<Doc>): Doc[] {
  const searchFieldsSet = new Set<string>(Object.keys(currentSearchObject ?? {}));
  const documentsSet = new Set<Doc>(documents ?? []);

  return documents && documents.length && currentSearchObject
    ? Array.from(documentsSet).reduce<Doc[]>((filteredAcc, document) => {
        const flattenedObj = flattenObjectIterative<Doc>(document);

        switch (searchOperator) {
          case "OR": {
            Object.entries(flattenedObj).forEach(([documentKey, documentValue]) => {
              const pattern = currentSearchObject[documentKey]?.toLowerCase() ?? "";

              if (searchFieldsSet.has(documentKey)) {
                if (Array.isArray(documentValue) && documentValue.length) {
                  documentValue.forEach((value) => {
                    if (
                      boyerMooreHorspoolSimpleSearch(
                        pattern,
                        value.toString().toLowerCase()
                      ) >= 0
                    ) {
                      filteredAcc.push(document);
                    }
                  });
                }

                if (
                  boyerMooreHorspoolSimpleSearch(
                    pattern,
                    documentValue.toString().toLowerCase()
                  ) >= 0
                ) {
                  filteredAcc.push(document);
                }
              }
            });

            break;
          }

          // "AND"
          default: {
            const isEveryFieldValueMatch = Object.entries(currentSearchObject).every(
              ([searchKey, searchValue]) => {
                const pattern = searchValue?.toLowerCase() ?? "";
                const documentValue = flattenedObj[searchKey];

                if (Array.isArray(documentValue) && documentValue.length) {
                  return documentValue.every((value) => {
                    return (
                      boyerMooreHorspoolSimpleSearch(
                        pattern,
                        value.toString().toLowerCase()
                      ) >= 0
                    );
                  });
                }

                return (
                  boyerMooreHorspoolSimpleSearch(
                    pattern,
                    documentValue.toString().toLowerCase()
                  ) >= 0
                );
              }
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

type DisplayResourceDocumentInput<Doc extends Record<string, any> = Record<string, any>> =
  {
    documents: Doc[];
    padding: MantineNumberSize;
    themeObject: ThemeObject;
  };

function displayResourceDocument<Doc extends Record<string, any> = Record<string, any>>({
  themeObject,
  padding,
  documents,
}: DisplayResourceDocumentInput<Doc>): Map<[string, string], JSX.Element[]> {
  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  const [createdShowMoreButton, createdHideButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Show",
      leftIcon: <TbArrowDown />,
      buttonType: "button",
      semanticDescription: "Reveal more information",
      semanticName: "Show more",
    },
    {
      buttonLabel: "Hide",
      leftIcon: <TbArrowUp />,
      buttonType: "button",
      semanticDescription: "Hide revealed information",
      semanticName: "Hide",
    },
  ]);

  return documents.reduce<Map<[string, string], JSX.Element[]>>((acc, document) => {
    const flattenedDocElements = Object.entries(flattenObjectIterative(document)).map(
      ([key, value], index) => {
        const rowBackgroundColorLight = index % 2 === 0 ? "#f9f9f9" : "transparent";
        const rowBackgroundColorDark = "transparent";
        const rowBackgroundColor =
          themeObject.colorScheme === "dark"
            ? rowBackgroundColorDark
            : rowBackgroundColorLight;

        return (
          <Grid
            columns={10}
            w="100%"
            style={{ borderBottom: borderColor }}
            key={`${index}-${value.toString()}`}
          >
            <Grid.Col span={4} style={{ background: rowBackgroundColor }}>
              <Text>{splitCamelCase(key)}</Text>
            </Grid.Col>
            <Grid.Col span={6} style={{ background: rowBackgroundColor }}>
              <Spoiler
                maxHeight={45}
                showLabel={createdShowMoreButton}
                hideLabel={createdHideButton}
              >
                <Flex direction="row" wrap="wrap" gap={4}>
                  <Text>
                    {Array.isArray(value)
                      ? replaceLastCommaWithAnd(value.join(", "))
                      : value.toString()}
                  </Text>
                </Flex>
              </Spoiler>
            </Grid.Col>
          </Grid>
        );
      }
    );

    const docId = document._id as string;
    const profilePictureUrl = document.profilePictureUrl as string;

    acc.set([docId, profilePictureUrl], flattenedDocElements);

    return acc;
  }, new Map<[string, string], JSX.Element[]>());
}

const OPERATOR_SWITCH_HELP_MODAL_CONTENT = (
  <Stack w="100%">
    <Flex direction="column">
      <Title order={6}>How it works:</Title>
      <Flex direction="column" rowGap="xs">
        <Text>
          The search operation allows you to filter the returned documents by the
          specified fields and case-insensitive values. You can specify multiple fields
          and values to filter the documents.
        </Text>
        <Text>
          By default, the search operation uses the "AND" operator to filter the
          documents. This means that if a document contains <strong>all</strong> of the
          specified fields and values, it will be included in the search results.
        </Text>
        <Text>
          You can change the operator to "OR" to filter the documents that contain{" "}
          <strong>any</strong> of the specified fields and values.
        </Text>

        <Title order={6}>Example:</Title>
        <Text>Suppose you have a collection of documents with the following fields:</Text>

        <Text>
          <Code>
            <code>
              {`{
  "firstName": "Isabella",
  "preferredName": "Ella",
  "city": "Vancouver"
}`}
            </code>
          </Code>
        </Text>

        <Text>If you specify the following fields and values:</Text>

        <Text>
          <Code>
            <code>
              {`{
  "firstName": "Isabella",
  "city": "Edmonton"
}`}
            </code>
          </Code>
        </Text>

        <Text>
          By default, the search operation will <strong>not</strong> return the document
          because the "city" field does not contain the value "Edmonton".
        </Text>

        <Text>
          However, if you change the operator to "OR", the search operation will return
          the document because it contains the "firstName" field with the value
          "Isabella".
        </Text>

        <Text>
          As the search operation is case-insensitive, it will return the document
          (assuming a valid query) even if the "preferredName" field is specified as:
          "ella" or "ELLA" (ayy, ayy, ayy).
        </Text>
      </Flex>
    </Flex>
  </Stack>
);

export {
  boyerMooreHorspoolSimpleSearch,
  displayResourceDocument,
  OPERATOR_SWITCH_HELP_MODAL_CONTENT,
  returnFilteredDocuments,
};
