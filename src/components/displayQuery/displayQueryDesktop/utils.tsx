import { Highlight, Text } from '@mantine/core';
import React from 'react';

import { replaceLastCommaWithAnd } from '../../../utils';
import { ComponentQueryData } from '../../queryBuilder/types';

type SortGroupedByQueryResponseDataInput = {
  componentQueryData: ComponentQueryData[];
  groupedByQueryResponseData: Map<string | number, Record<string, any>[]>;
  fieldToSortBy?: string;
  sortDirection?: 'asc' | 'desc';
};
/**
 * Pure function. Sorts and preserves the original order of the grouped by query response data ( sort within a sort ) when sort icons in table headers are clicked.
 *
 * @param {SortGroupedByQueryResponseDataInput} options - The options for sorting and grouping data.
 * @returns {Map<string | number, Record<string, any>[]>} A Map containing sorted and grouped data.
 */
function sortGroupedByQueryResponseData({
  componentQueryData,
  groupedByQueryResponseData,
  fieldToSortBy = 'createdAt',
  sortDirection = 'desc',
}: SortGroupedByQueryResponseDataInput): Map<
  string | number,
  Record<string, any>[]
> {
  if (!groupedByQueryResponseData.size) {
    return new Map<string | number, Record<string, any>[]>();
  }
  if (!componentQueryData.length) {
    return new Map<string | number, Record<string, any>[]>();
  }

  console.log({ componentQueryData });

  // find corresponding camel cased field name
  const fieldCamelCasedValue =
    componentQueryData.find(
      (queryData) =>
        queryData.label.toLowerCase() === fieldToSortBy.toLowerCase()
    )?.value ?? '';

  const clonedQueryResponseData = structuredClone(groupedByQueryResponseData);

  const sortedGroupedQueryResponseData = Array.from(
    clonedQueryResponseData
  ).reduce(
    (
      sortedGroupedQueryResponseDataAcc: Map<
        string | number,
        Record<string, any>[]
      >,
      groupedByQueryResponseObjectArrays
    ) => {
      const [groupedByFieldKey, queryResponseObjArrays] =
        groupedByQueryResponseObjectArrays as [
          string | number,
          Record<string, any>[]
        ];

      const sortedQueryResponseObjArrays = queryResponseObjArrays.sort(
        (a: Record<string | number, any>, b: Record<string | number, any>) => {
          const aFieldToSortBy = a[fieldCamelCasedValue];
          const bFieldToSortBy = b[fieldCamelCasedValue];

          // determine if field to sort by is a number and sort accordingly
          // number is first because Date.parse() will parse a number as a date
          const isNumber = Number.isNaN(Number(aFieldToSortBy)) ? false : true;
          if (isNumber) {
            const aNumber = Number(aFieldToSortBy);
            const bNumber = Number(bFieldToSortBy);

            if (aNumber < bNumber) {
              return sortDirection === 'asc' ? -1 : 1;
            }
            if (aNumber > bNumber) {
              return sortDirection === 'asc' ? 1 : -1;
            }

            return 0;
          }

          // determine if field to sort by is a date and sort accordingly
          const isDate = isNaN(Date.parse(aFieldToSortBy)) ? false : true;
          if (isDate) {
            const aDate = new Date(aFieldToSortBy);
            const bDate = new Date(bFieldToSortBy);

            if (aDate < bDate) {
              return sortDirection === 'asc' ? -1 : 1;
            }
            if (aDate > bDate) {
              return sortDirection === 'asc' ? 1 : -1;
            }

            return 0;
          }

          // sort strings
          if (aFieldToSortBy < bFieldToSortBy) {
            return sortDirection === 'asc' ? -1 : 1;
          }
          if (aFieldToSortBy > bFieldToSortBy) {
            return sortDirection === 'asc' ? 1 : -1;
          }

          return 0;
        }
      );

      sortedGroupedQueryResponseDataAcc.set(
        groupedByFieldKey,
        sortedQueryResponseObjArrays
      );

      return sortedGroupedQueryResponseDataAcc;
    },
    new Map<string | number, Record<string, any>[]>()
  );

  return sortedGroupedQueryResponseData;
}

function returnHighlightedText({
  fieldValue,
  queryValuesArray,
  backgroundColor,
}: {
  fieldValue: string | boolean | number | string[] | boolean[] | number[];
  queryValuesArray: string[];
  backgroundColor: string;
}) {
  const stringifiedText =
    fieldValue === true
      ? 'Yes'
      : fieldValue === false
      ? 'No'
      : Array.isArray(fieldValue)
      ? replaceLastCommaWithAnd(
          fieldValue
            .map(
              (value) =>
                value.toString().charAt(0).toUpperCase() +
                value.toString().slice(1)
            )
            .join(', ')
        )
      : `${fieldValue.toString().charAt(0).toUpperCase()}${fieldValue
          .toString()
          .slice(1)}`;

  // regex to determine if formattedValue has any terms in queryValuesArray
  const regex = queryValuesArray.length
    ? new RegExp(
        queryValuesArray
          .filter((value) => value) // remove empty strings
          .flatMap((value) => value.split(' ')) // split strings into words
          .join('|'),
        'gi'
      )
    : null;

  let returnedText: React.JSX.Element | React.JSX.Element[] | null = null;
  if (regex?.test(stringifiedText)) {
    returnedText = stringifiedText.split(' ').map((text, index) => {
      // word that has below symbol is also highlighted
      const wordWithoutPunctuation = text
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ')
        .toLowerCase()
        .split(' ');

      const flattenedQueryValuesArray = queryValuesArray
        .filter((value) => value) // remove empty strings
        .flatMap((value) => value.toLowerCase().split(' ')); // split strings into words

      // const isQueryArrayIncludesWord = flattenedQueryValuesArray.some(
      //   (queryValue) => wordWithoutPunctuation.includes(queryValue)
      // );
      // test with regex
      const isQueryArrayIncludesWord = flattenedQueryValuesArray.some(
        (queryValue) => {
          const regex = new RegExp(queryValue, 'gi');
          return regex.test(wordWithoutPunctuation.join(' '));
        }
      );

      if (isQueryArrayIncludesWord) {
        return (
          <Highlight
            key={`${text}-${index}`}
            highlightStyles={{ backgroundColor }}
            highlight={text}
          >
            {text}
          </Highlight>
        );
      }

      return <Text key={`${text}-${index}`}>{text}</Text>;
    });
  } else {
    returnedText = <Text>{stringifiedText}</Text>;
  }

  return returnedText;
}

export { returnHighlightedText, sortGroupedByQueryResponseData };
