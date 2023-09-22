const QUERY_BUILDER_FILTER_OPERATORS = [
  'equal to',
  'less than',
  'greater than',
  'less than or equal to',
  'greater than or equal to',
];

const QUERY_BUILDER_SORT_OPERATORS = ['ascending', 'descending'];

const ORDINAL_TERMS = [
  'primary',
  'secondary',
  'tertiary',
  'quaternary',
  'quinary',
  'senary',
  'septenary',
  'octonary',
  'nonary',
  'denary',
  'undenary',
  'duodenary',
  'tredecenary',
  'quattuordecenary',
  'quindecenary',
  'sexdecenary',
  'septendecenary',
  'octodecenary',
  'novendecenary',
  'vigesimal',
];

const QUERY_BUILDER_CASE_SENSITIVITY_OPTIONS = [
  {
    label: 'Sensitive',
    value: 'sensitive',
  },
  {
    label: 'Insensitive',
    value: 'insensitive',
  },
];

export {
  ORDINAL_TERMS,
  QUERY_BUILDER_CASE_SENSITIVITY_OPTIONS,
  QUERY_BUILDER_FILTER_OPERATORS,
  QUERY_BUILDER_SORT_OPERATORS,
};
