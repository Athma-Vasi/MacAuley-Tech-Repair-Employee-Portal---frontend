function buildQueryString({
  limitPerPage,
  newQueryFlag,
  pageQueryString,
  queryBuilderString,
  totalDocuments,
}: {
  limitPerPage: string;
  newQueryFlag: boolean;
  pageQueryString: string;
  queryBuilderString: string;
  totalDocuments: number;
}) {
  return `${queryBuilderString}${pageQueryString}&newQueryFlag=${newQueryFlag}&totalDocuments=${totalDocuments}&limit=${limitPerPage}&projection=-action&projection=-category`;
}

export { buildQueryString };
