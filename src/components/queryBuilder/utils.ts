/**
 *  * - Queries must be of the form:
 * /resource?filter1[operator]=value1&filter2[operator]=value2&projection=-field1ToExclude&projection=-field2ToExclude&sort[sortField1]=number&skip=number&limit=number  and so on
 */

import { QueryLabelValueTypesMap } from './types';

// type GenerateQueryStringInput =
//   | { kind: 'filter'; statementsArray: FilterStatementsArray[] }
//   | { kind: 'sort'; statementsArray: SortStatementsArray[] }
//   | { kind: 'projection'; statementsArray: ProjectionStatementsArray[] };

type GenerateQueryStringInput = {
  labelValueTypesMap: QueryLabelValueTypesMap;
  filterStatementsQueue: [string, string, string][];
  sortStatementsQueue: [string, string][];
  projectionArray: string[];
};

function generateQueryString({
  labelValueTypesMap,
  filterStatementsQueue,
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

  if (filterStatementsQueue.length > 0) {
    queryString += filterStatementsQueue.reduce((acc, curr) => {
      const [field, operator, value] = curr;
      return `${acc}&${labelValueTypesMap.get(field)?.value}[${
        filterOperatorsMap.get(operator) ?? filterOperatorsMap.get('equal to')
      }]=${value ?? ''}`;
    }, '');
  }

  if (sortStatementsQueue.length > 0) {
    queryString += sortStatementsQueue.reduce((acc, curr) => {
      const [field, value] = curr;
      return `${acc}&sort[${labelValueTypesMap.get(field)?.value}]=${
        sortOperatorsMap.get(value) ?? sortOperatorsMap.get('ascending')
      }`;
    }, '');
  }

  if (projectionArray.length > 0) {
    queryString += projectionArray.reduce((acc, curr) => {
      return `${acc}&projection=-${curr}`;
    }, '');
  }

  return queryString;
}

export { generateQueryString };

export type { GenerateQueryStringInput };

/**
 * const queryString = statementsArray.reduce((acc:string, curr) => {
    const [field, operator, value] = curr;
    if (kind === 'filter') {
      return `${acc}&filter[${field}][${operator}]=${value}`;
    } else if (kind === 'sort') {
      return `${acc}&sort[${field}]=${value}`;
    } else if (kind === 'projection') {
      return `${acc}&projection=-${value}`;
    }
    return acc;
  }, '');
  return queryString;
 */

/**
   * switch (input) {
    case 'filter': {
      statementsArray.reduce((acc, curr) => {
        const [field, operator, value] = curr;
        return `${acc}&filter[${field}][${operator}]=${value}`;
      }, '');
      break;
    }
    case 'sort': {
      statementsArray.reduce((acc, curr) => {
        const [field, value] = curr;
        return `${acc}&sort[${field}]=${value}`;
      }, '');
      break;
    }
    case 'projection': {
      statementsArray.reduce((acc, curr) => {
        return `${acc}&projection=-${curr}`;
      }, '');
      break;
    }
    default: {
      queryString = '';
      break;
    }
  }
   */
