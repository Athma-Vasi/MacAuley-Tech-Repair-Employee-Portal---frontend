import { ComponentQueryData } from '../../queryBuilder/types';

type SortGroupedByQueryResponseDataInput = {
  componentQueryData: ComponentQueryData[];
  groupedByQueryResponseData: Map<string | number, Record<string, any>[]>;
  fieldToSortBy?: string;
  sortDirection?: 'asc' | 'desc';
};
/**
 * Pure function. Sorts and preserves the original order of the grouped by query response data ( sort within a sort ).
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
