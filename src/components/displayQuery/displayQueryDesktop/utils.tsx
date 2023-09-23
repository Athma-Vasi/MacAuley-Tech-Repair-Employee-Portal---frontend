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

          // does not work: new Date(aFieldToSortBy) !== 'Invalid Date'
          // determine if field to sort by is a date and sort accordingly
          // const isDate =
          //   new Date(aFieldToSortBy) !== 'Invalid Date' &&
          //   !Number.isNaN(new Date(aFieldToSortBy));
          // if (isDate) {
          //   const aDate = new Date(aFieldToSortBy);
          //   const bDate = new Date(bFieldToSortBy);

          //   if (aDate < bDate) {
          //     return sortDirection === 'asc' ? -1 : 1;
          //   }
          //   if (aDate > bDate) {
          //     return sortDirection === 'asc' ? 1 : -1;
          //   }

          //   return 0;
          // }

          // determine if field to sort by is a number and sort accordingly
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

export { sortGroupedByQueryResponseData };
