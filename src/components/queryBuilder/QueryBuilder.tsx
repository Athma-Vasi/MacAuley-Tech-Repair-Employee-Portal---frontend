import { useEffect, useReducer } from 'react';

import { SelectInputData } from '../../types';
import { logState } from '../../utils';
import {
  QueryBuilderProps,
  QueryLabelValueTypesMap,
  QueryValueTypes,
} from './types';
import {
  initialQueryBuilderState,
  queryBuilderAction,
  queryBuilderReducer,
} from './state';
import {
  AccessibleSelectInputCreatorInfo,
  FormLayoutWrapper,
  TextWrapper,
} from '../wrappers';
import { returnAccessibleSelectInputElements } from '../../jsxCreators';
import {
  QUERY_BUILDER_FILTER_OPERATORS,
  QUERY_BUILDER_SORT_OPERATORS,
} from './constants';
import { Flex } from '@mantine/core';

function QueryBuilder({
  componentQueryData,
  collectionName,
}: QueryBuilderProps) {
  const [queryBuilderState, queryBuilderDispatch] = useReducer(
    queryBuilderReducer,
    initialQueryBuilderState
  );
  const {
    currentFilterTerm,
    currentFilterOperator,
    currentFilterValue,

    currentSortTerm,
    currentSortDirection,

    filterSelectData,
    sortSelectData,
    labelValueTypesMap,

    filterStatementsQueue,
    sortStatementsQueue,

    projectionArray,
    selectedFieldsSet,

    isError,
    errorMessage,
    isLoading,
    loadingMessage,
    isSubmitting,
    submitMessage,
    isSuccessful,
    successMessage,
  } = queryBuilderState;

  useEffect(() => {
    // loop through componentQueryData and assign to both filter select data or sort select data, and valueTypesObj
    const [filterSelectData, sortSelectData, valueTypeObjects] =
      componentQueryData.reduce(
        (
          acc: [string[], string[], QueryLabelValueTypesMap],
          { label, value, type }
        ) => {
          // selectData (string[]) cannot be sorted, the rest(number, boolean, date) can be sorted and filtered
          if (type === 'selectData') {
            acc[0].push(label);
          } else {
            acc[0].push(label);
            acc[1].push(label);
          }

          acc[2].set(label, { value, type });

          return acc;
        },
        [[], [], new Map()]
      );

    queryBuilderDispatch({
      type: queryBuilderAction.setFilterSelectData,
      payload: filterSelectData,
    });
    queryBuilderDispatch({
      type: queryBuilderAction.setSortSelectData,
      payload: sortSelectData,
    });
    queryBuilderDispatch({
      type: queryBuilderAction.setLabelValueTypesMap,
      payload: valueTypeObjects,
    });
  }, [componentQueryData]);

  const filterSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: filterSelectData,
    label: 'Filter',
    description: `Select a field to filter ${collectionName} by`,
    value: currentFilterTerm,
    onChange: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentFilterTerm,
        payload: event.currentTarget.value,
      });
    },
  };

  const filterOperatorsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: QUERY_BUILDER_FILTER_OPERATORS,
      label: 'Filter operator',
      description: `${
        currentFilterTerm === ''
          ? 'Please select a filter field'
          : `Select a filter operator for ${currentFilterTerm}`
      }`,
      value: currentFilterOperator,
      onChange: (event) => {
        queryBuilderDispatch({
          type: queryBuilderAction.setCurrentFilterOperator,
          payload: event.currentTarget.value,
        });
      },
    };

  const sortSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: sortSelectData,
    label: 'Sort',
    description: `Select a field to sort ${collectionName} by`,
    value: currentSortTerm,
    onChange: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentSortTerm,
        payload: event.currentTarget.value,
      });
    },
  };

  const sortDirectionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: QUERY_BUILDER_SORT_OPERATORS,
      label: 'Sort direction',
      description: `Select a sort direction for ${currentSortTerm}`,
      value: currentSortDirection,
      onChange: (event) => {
        queryBuilderDispatch({
          type: queryBuilderAction.setCurrentSortDirection,
          payload: event.currentTarget.value,
        });
      },
    };

  const [
    createdFilterSelectInput,
    createdFilterOperatorsSelectInput,
    createdSortSelectInput,
    createdSortDirectionSelectInput,
  ] = returnAccessibleSelectInputElements([
    filterSelectInputCreatorInfo,
    filterOperatorsSelectInputCreatorInfo,
    sortSelectInputCreatorInfo,
    sortDirectionSelectInputCreatorInfo,
  ]);

  const displayFilterSection = (
    <FormLayoutWrapper direction="row">
      {createdFilterSelectInput}
      {createdFilterOperatorsSelectInput}
      {/* {createdFilterValueInput} */}
    </FormLayoutWrapper>
  );

  const displaySortSection = (
    <FormLayoutWrapper direction="row">
      {createdSortSelectInput}
      {createdSortDirectionSelectInput}
    </FormLayoutWrapper>
  );

  //
  //
  //
  useEffect(() => {
    logState('queryBuilderState')(queryBuilderState)(false);
  }, [queryBuilderState]);

  //
  return (
    <Flex direction="column" align="center" justify="center">
      <TextWrapper creatorInfoObj={{}}>Query Builder</TextWrapper>
      {displayFilterSection}
      {displaySortSection}
    </Flex>
  );
}

export { QueryBuilder };
