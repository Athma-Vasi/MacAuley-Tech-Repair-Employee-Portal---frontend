/**
 *  * - Queries are of the form:
 * /resource?filter1[operator]=value1&filter2[operator]=value2&projection=-field1ToExclude&projection=-field2ToExclude&sort[sortField1]=number&skip=number&limit=number  and so on
 */

import { Stack, Text, Title } from '@mantine/core';

import { QueryLabelValueTypesMap } from './types';

type GenerateQueryStringInput = {
  labelValueTypesMap: QueryLabelValueTypesMap;
  filterStatementsQueue: [string, string, string][];
  generalSearchValue: string;
  isGeneralSearchCaseSensitive: boolean;
  searchStatementsQueue: [string, string][];
  sortStatementsQueue: [string, string][];
  projectionArray: string[];
};

function generateQueryString({
  labelValueTypesMap,
  filterStatementsQueue,
  generalSearchValue,
  isGeneralSearchCaseSensitive,
  searchStatementsQueue,
  sortStatementsQueue,
  projectionArray,
}: GenerateQueryStringInput) {
  const filterOperatorsMap = new Map([
    ['in', 'in'],
    ['equal to', 'eq'],
    ['less than', 'lt'],
    ['greater than', 'gt'],
    ['less than or equal to', 'lte'],
    ['greater than or equal to', 'gte'],
  ]);

  const sortOperatorsMap = new Map([
    ['ascending', 1],
    ['descending', -1],
  ]);

  let queryString = '?';

  // General search
  if (generalSearchValue.length) {
    queryString += `&text[search]=${generalSearchValue}&text[$caseSensitive]=${isGeneralSearchCaseSensitive}`;
  }

  // Filter
  if (filterStatementsQueue.length) {
    queryString += filterStatementsQueue.reduce((acc, curr) => {
      const [field, operator, value] = curr;
      return `${acc}&${labelValueTypesMap.get(field)?.value}[${
        filterOperatorsMap.get(operator) ?? filterOperatorsMap.get('equal to')
      }]=${value ?? ''}`;
    }, '');
  }

  // Search Chain
  if (searchStatementsQueue.length) {
    queryString += searchStatementsQueue.reduce((acc, curr) => {
      const [field, value] = curr;

      return `${acc}&${labelValueTypesMap.get(field)?.value}[${
        filterOperatorsMap.get('in') ?? filterOperatorsMap.get('equal to')
      }]=${value ?? ''}`;
    }, '');
  }

  // Sort
  if (sortStatementsQueue.length) {
    queryString += sortStatementsQueue.reduce((acc, curr) => {
      const [field, value] = curr;
      return `${acc}&sort[${labelValueTypesMap.get(field)?.value}]=${
        sortOperatorsMap.get(value) ?? sortOperatorsMap.get('ascending')
      }`;
    }, '');
  }

  // Projection
  if (projectionArray.length) {
    queryString += projectionArray.reduce((acc, curr) => {
      return `${acc}&projection=-${curr}`;
    }, '&projection=-action&projection=-category');
  }

  return queryString;
}

type GenerateFilterChainStatementInput = {
  filterStatement: [string, string, string];
};

function generateFilterChainStatement({
  filterStatement,
}: GenerateFilterChainStatementInput) {
  const [field, operator, value] = filterStatement;

  switch (operator) {
    case 'in': {
      return `Select ${field} that contain ${value}. `;
    }
    default: {
      return `Select ${field} that are ${operator} ${value}. `;
    }
  }
}

const QUERY_BUILDER_HELP_MODAL_CONTENT = (
  <Stack w="100%">
    <Title order={6}>How it works:</Title>
    <Text>
      The query builder allows you to build a query to retrieve documents from a
      collection. The query can be built using the filter, search, sort, and
      projection operations.
    </Text>

    <Title order={6}>Filter:</Title>
    <Text>
      The filter operation allows you to filter the returned documents by the
      specified fields, each representing a specific filtering condition. All of
      the conditions within the chain must be met for a document to be included
      in the query result.
    </Text>

    <Title order={6}>Search:</Title>
    <Text>
      The search operation allows you to search for documents whose fields
      contain unconstrained values (text / textarea inputs). All of the
      conditions within the chain must be met for a document to be included in
      the query result.
    </Text>

    <Title order={6}>Sort:</Title>
    <Text>
      The sort operation allows you to sort the filtered documents by the
      specified fields and operator. This allows control of the order in which
      documents are retrieved from a collection.
    </Text>

    <Title order={6}>Projection:</Title>
    <Text>
      The projection operation allows you to specify which fields to include or
      exclude in the query result. This allows you to limit the amount of data
      that is returned from the query.
    </Text>

    <Title order={6}>Example:</Title>
    <Text>
      You can use the query builder (in one query) to filter all documents that
      have a "Created date" that is greater than or equal to 2021-01-01, search
      "Customer name" for "John", sort the documents by "Created date" in
      descending order, and exclude the "Updated date" field from the query
      result.
    </Text>
  </Stack>
);

const FILTER_HELP_MODAL_CONTENT = (
  <Stack w="100%">
    <Title order={6}>How it works:</Title>
    <Text>
      The filter operation allows you to filter the returned documents by the
      specified fields, each representing a specific filtering condition. These
      conditions are transformed into MongoDB queries.
    </Text>
    <Text>
      You can chain multiple filter statements together to create logical filter
      chains. Currently, only "AND" is supported, meaning that all conditions
      within the chain must be met for a document to be included in the query
      result.
    </Text>
    <Text>
      The filter chain is executed in the order that the statements are added
      (top to bottom).
    </Text>

    <Title order={6}>Statement structure</Title>
    <Text>
      Each filter statement consists of three parts: a field, an operator, and a
      value. The field is the field that you want to filter by. The operator is
      the operator that you want to use to filter the field. The value is the
      value that you want to filter the field by.
    </Text>
    <Text>
      'in' Operator is for fields that have a constrained set of values, the
      rest ('equal to', etc.) are for unconstrained set of values.
    </Text>
  </Stack>
);

const GENERAL_SEARCH_HELP_MODAL_CONTENT = (
  <Stack w="100%">
    <Title order={6}>How it works:</Title>
    <Text>
      The general search operation allows searching for documents based on
      unconstrained text values.
    </Text>
    <Text>
      However, it's important to note that due to the broader search scope,
      general searches may be slower compared to targeted searches using 'Search
      Chain', as this search method scans multiple fields in your documents.
    </Text>

    <Text>
      Each space-delimited phrase is treated as a token, and documents
      containing any of these tokens will be included or excluded in the search
      results.
    </Text>

    <Title order={6}>Example:</Title>
    <Text>
      Inclusion string of 'John Doe' will return documents that contain either a
      "John" or "Doe" token . Exclusion string of '-Jane -Smith' will return
      documents that do not contain either a "Jane" or "Smith" token.
    </Text>
    <Text>
      Combining both inclusion and exclusion strings will return documents that
      contain a "John" or "Doe" token (or if case-insensitive: "john" or "doe"),
      'AND' do not contain a "Jane" or "Smith" (or if case-insensitive: "jane"
      or "smith") token.
    </Text>
  </Stack>
);

const SEARCH_CHAIN_HELP_MODAL_CONTENT = (
  <Stack w="100%">
    <Title order={6}>How it works:</Title>
    <Text>
      The search operation allows you to search for documents whose fields
      contain unconstrained values (text / textarea inputs). You can chain
      multiple search statements together to create logical search chains.
    </Text>
    <Text>
      If there are multiple identical fields, search chain will be treated as
      'OR', meaning that if <i>any</i> of the conditions within the ('OR')chain
      are met, the document will be included in the query result.
    </Text>
    <Text>
      If there are no identical fields, search chain will be treated as 'AND',
      meaning that <i>all</i> of the conditions within the ('AND')chain must be
      met for a document to be included in the query result.
    </Text>
    <Text>
      You can combine 'OR' and 'AND' search chains together to create complex or
      more specific search chains. For example, you can search for documents
      that have a "Customer name" that contains "John" <i>OR</i> "Jane" (always
      case-insensitive) <i>AND</i> a "Created date" that is greater than or
      equal to 2021-01-01.
    </Text>
    <Text>
      For improved accuracy and user experience, each field has validation rules
      corresponding to the type of data it stores. For example, a date field
      will only accept valid dates, a number field will only accept valid
      numbers, a text field that is 'email' will only accept valid emails, etc.
    </Text>

    <Title order={6}>Statement structure</Title>
    <Text>
      Each search statement consists of two components: a field and a value. The
      field represents the specific attribute you want to search within a
      document, while the value is the term used to perform the search within
      that field.
    </Text>
  </Stack>
);

const SORT_HELP_MODAL_CONTENT = (
  <Stack w="100%">
    <Title order={6}>How it works: </Title>
    <Text>
      The sort operation allows you to sort the filtered documents by the
      specified fields and operator. This allows control of the order in which
      documents are retrieved from a collection.
    </Text>
    <Text>
      Each consecutive sort statement is treated as a tiebreaker and is used to
      sort the documents that have the same value in the previous sort field.
    </Text>

    <Title order={6}>Ascending order:</Title>
    <Text>
      Ascending order is the default sort order. In ascending order, the
      documents are arranged in a field from the lowest value to the highest.
      This is often used for fields like dates or numerical values.
    </Text>
    <Text>
      For example, sorting by "Created date" in ascending order would display
      the oldest records first, followed by newer ones.
    </Text>

    <Title order={6}>Descending order:</Title>
    <Text>
      Conversely, when you sort in descending order, documents are arranged in a
      field from the highest value to the lowest. This is useful for retrieving
      the most recent or highest-valued records.
    </Text>
    <Text>
      For example, sorting by "Updated date" in descending order would display
      the newest records first, followed by older ones.
    </Text>
  </Stack>
);

const PROJECTION_HELP_MODAL_CONTENT = (
  <Stack w="100%">
    <Title order={6}>How it works: </Title>
    <Text>
      The projection operation allows you to specify which fields to include or
      exclude in the query result. This allows you to limit the amount of data
      that is returned from the query.
    </Text>
    <Text>
      By default, all fields are included in the query result. To exclude a
      field, simply select a field name's checkbox. To include a field, unselect
      the checkbox.
    </Text>
    <Text>
      The document and user Ids fields are always included in the query result.
      Toggling the "Table view" option (only for desktop users) between
      "Condensed" and "Expanded" will hide/reveal the Id fields.
    </Text>
  </Stack>
);

export {
  FILTER_HELP_MODAL_CONTENT,
  GENERAL_SEARCH_HELP_MODAL_CONTENT,
  generateFilterChainStatement,
  generateQueryString,
  PROJECTION_HELP_MODAL_CONTENT,
  QUERY_BUILDER_HELP_MODAL_CONTENT,
  SEARCH_CHAIN_HELP_MODAL_CONTENT,
  SORT_HELP_MODAL_CONTENT,
};

export type { GenerateQueryStringInput };
