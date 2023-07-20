const QUERY_BUILDER_FILTER_OPERATORS = [
  'equals',
  'less than',
  'greater than',
  'less than or equal to',
  'greater than or equal to',
];

const QUERY_BUILDER_FILTER_OPERATORS_MAP = new Map([
  ['equals', 'eq'],
  ['less than', 'lt'],
  ['greater than', 'gt'],
  ['less than or equal to', 'lte'],
  ['greater than or equal to', 'gte'],
]);

const QUERY_BUILDER_SORT_OPERATORS = ['ascending', 'descending'];

const QUERY_BUILDER_SORT_OPERATORS_MAP = new Map([
  ['ascending', 1],
  ['descending', -1],
]);

export { QUERY_BUILDER_FILTER_OPERATORS, QUERY_BUILDER_SORT_OPERATORS };
