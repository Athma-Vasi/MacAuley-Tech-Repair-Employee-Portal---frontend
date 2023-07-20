import { Flex } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import {
  returnAccessibleDateTimeElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextInputElements,
} from '../../jsxCreators';
import {
  logState,
  returnDateFullRangeValidationText,
  returnDateValidationText,
  returnNumberAmountValidationText,
} from '../../utils';
import {
  AccessibleDateTimeInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  FormLayoutWrapper,
  TextWrapper,
} from '../wrappers';
import {
  QUERY_BUILDER_FILTER_OPERATORS,
  QUERY_BUILDER_SORT_OPERATORS,
} from './constants';
import {
  initialQueryBuilderState,
  queryBuilderAction,
  queryBuilderReducer,
} from './state';
import { QueryBuilderProps, QueryLabelValueTypesMap } from './types';
import {
  DATE_FULL_RANGE_REGEX,
  DATE_REGEX,
  MONEY_REGEX,
} from '../../constants/regex';

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
    isCurrentFilterValueValid,
    isCurrentFilterValueFocused,

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
          { label, value, inputKind, selectData }
        ) => {
          // selectData (string[]) cannot be sorted, the rest(number, boolean, date) can be sorted and filtered
          if (inputKind === 'selectInput') {
            acc[0].push(label);
          } else {
            acc[0].push(label);
            acc[1].push(label);
          }

          selectData
            ? acc[2].set(label, { value, inputKind, selectData })
            : acc[2].set(label, { value, inputKind });

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

  // validate filter value on every change
  useEffect(() => {
    const currentInputKind =
      labelValueTypesMap.get(currentFilterTerm)?.inputKind;
    const isValid =
      currentInputKind === 'dateInput'
        ? DATE_FULL_RANGE_REGEX.test(currentFilterValue)
        : MONEY_REGEX.test(currentFilterValue);

    queryBuilderDispatch({
      type: queryBuilderAction.setIsCurrentFilterValueValid,
      payload: isValid,
    });
  }, [currentFilterTerm, currentFilterValue, labelValueTypesMap]);

  // ----------------- accessibility text elements ----------------- //
  const currentInputKind = labelValueTypesMap.get(currentFilterTerm)?.inputKind;
  const regexValidationText =
    currentInputKind === 'dateInput'
      ? returnDateFullRangeValidationText(currentFilterValue)
      : currentInputKind === 'numberInput'
      ? returnNumberAmountValidationText({
          amount: currentFilterValue,
          kind: currentFilterTerm,
        })
      : '';
  const currentSelectData =
    labelValueTypesMap.get(currentFilterTerm)?.selectData;
  const [filterValueErrorText, filterValueValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: currentFilterTerm,
      inputText: currentFilterValue,
      isInputTextFocused: isCurrentFilterValueFocused,
      isValidInputText: isCurrentFilterValueValid,
      regexValidationText,
    });

  // ----------------- filter operation section -----------------  //

  const filterSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: filterSelectData,
    label: 'Field',
    description: `Select a field to filter ${collectionName} by`,
    value: currentFilterTerm,
    onChange: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentFilterTerm,
        payload: event.currentTarget.value,
      });
    },
  };

  const filterOperatorData =
    currentInputKind === 'selectInput'
      ? ['equals']
      : QUERY_BUILDER_FILTER_OPERATORS;
  const filterOperatorsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: filterOperatorData,
      label: 'Operator',
      description: `${
        currentFilterTerm === ''
          ? 'Please select a field'
          : currentInputKind === 'selectInput'
          ? 'Only "equals" is available for select inputs'
          : `Select an operator for ${currentFilterTerm}`
      }`,
      value: currentFilterOperator,
      onChange: (event) => {
        queryBuilderDispatch({
          type: queryBuilderAction.setCurrentFilterOperator,
          payload: event.currentTarget.value,
        });
      },
    };

  const filterValueDateInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    label: 'Value',
    description: {
      error: filterValueErrorText,
      valid: filterValueValidText,
    },
    onChange: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentFilterValue,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      queryBuilderDispatch({
        type: queryBuilderAction.setIsCurrentFilterValueFocused,
        payload: true,
      });
    },
    onBlur: () => {
      queryBuilderDispatch({
        type: queryBuilderAction.setIsCurrentFilterValueFocused,
        payload: false,
      });
    },
    inputKind: 'date',
    dateKind: 'full date',
    inputText: currentFilterValue,
    isValidInputText: isCurrentFilterValueValid,
    placeholder: 'Enter a value',
    semanticName: currentFilterTerm,
  };

  const filterValueNumberInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    label: 'Value',
    description: {
      error: filterValueErrorText,
      valid: filterValueValidText,
    },
    onChange: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentFilterValue,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      queryBuilderDispatch({
        type: queryBuilderAction.setIsCurrentFilterValueFocused,
        payload: true,
      });
    },
    onBlur: () => {
      queryBuilderDispatch({
        type: queryBuilderAction.setIsCurrentFilterValueFocused,
        payload: false,
      });
    },
    inputText: currentFilterValue,
    isValidInputText: isCurrentFilterValueValid,
    placeholder: `Enter a value for ${currentFilterTerm}`,
    semanticName: currentFilterTerm,
  };

  const filterValueSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: labelValueTypesMap.get(currentFilterTerm)?.selectData || [],
    label: 'Value',
    description: `Select a value for ${currentFilterTerm}`,
    value: currentFilterValue,
    onChange: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentFilterValue,
        payload: event.currentTarget.value,
      });
    },
  };

  // ----------------- sort operation section -----------------  //
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
      label: 'Direction',
      description:
        currentSortTerm === ''
          ? 'Please select a sort field'
          : `Select a sort direction for ${currentSortTerm}`,
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

  const createdFilterValueInput =
    currentInputKind === 'dateInput'
      ? returnAccessibleDateTimeElements([filterValueDateInputCreatorInfo])
      : currentInputKind === 'numberInput'
      ? returnAccessibleTextInputElements([filterValueNumberInputCreatorInfo])
      : returnAccessibleSelectInputElements([
          filterValueSelectInputCreatorInfo,
        ]);

  const displayFilterSection = (
    <FormLayoutWrapper>
      <TextWrapper creatorInfoObj={{}}>Filter</TextWrapper>
      <FormLayoutWrapper direction="row">
        {createdFilterSelectInput}
        {createdFilterOperatorsSelectInput}
        {createdFilterValueInput}
      </FormLayoutWrapper>
    </FormLayoutWrapper>
  );

  const displaySortSection = (
    <FormLayoutWrapper>
      <TextWrapper creatorInfoObj={{}}>Sort</TextWrapper>
      <FormLayoutWrapper direction="row">
        {createdSortSelectInput}
        {createdSortDirectionSelectInput}
      </FormLayoutWrapper>
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
