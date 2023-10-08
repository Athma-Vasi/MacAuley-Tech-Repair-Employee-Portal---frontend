import { ComponentQueryData } from '../../queryBuilder/types';
import { GroupedByQueryResponseData } from '../types';

type SortGroupedByQueryResponseDataInput = {
  componentQueryData: ComponentQueryData[];
  groupedByQueryResponseData: GroupedByQueryResponseData;
  fieldToSortBy?: string;
  sortDirection?: 'asc' | 'desc';
};
/**
 * Pure function. Sorts and preserves the original order of the grouped by query response data ( sort within a sort ) when sort icons in table headers are clicked.
 *
 * @param {SortGroupedByQueryResponseDataInput} options - The options for sorting and grouping data.
 * @returns {Map<string | number|boolean, Record<string, any>[]>} A Map containing sorted and grouped data.
 */
function sortGroupedByQueryResponseData({
  componentQueryData,
  groupedByQueryResponseData,
  fieldToSortBy = 'createdAt',
  sortDirection = 'desc',
}: SortGroupedByQueryResponseDataInput): GroupedByQueryResponseData {
  if (!groupedByQueryResponseData.size) {
    return new Map();
  }
  if (!componentQueryData.length) {
    return new Map();
  }

  if (fieldToSortBy === 'none') {
    return groupedByQueryResponseData;
  }

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
      sortedGroupedQueryResponseDataAcc: GroupedByQueryResponseData,
      groupedByQueryResponseObjectArrays
    ) => {
      const [groupedByFieldKey, queryResponseObjArrays] =
        groupedByQueryResponseObjectArrays as [
          string | number | boolean | symbol,
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
    new Map()
  );

  return sortedGroupedQueryResponseData;
}

export { sortGroupedByQueryResponseData };
