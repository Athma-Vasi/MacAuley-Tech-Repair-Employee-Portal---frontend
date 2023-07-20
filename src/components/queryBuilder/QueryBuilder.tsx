import { Flex } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import {
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleDateTimeElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSelectedDeselectedTextElements,
  returnAccessibleTextInputElements,
} from '../../jsxCreators';
import {
  logState,
  returnDateFullRangeValidationText,
  returnDateValidationText,
  returnNumberAmountValidationText,
} from '../../utils';
import {
  AccessibleCheckboxGroupInputCreatorInfo,
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
import { CheckboxInputData } from '../../types';

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
    projectionCheckboxData,
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
    const [
      filterSelectData,
      sortSelectData,
      projectionCheckboxData,
      valueTypeObjects,
    ] = componentQueryData.reduce(
      (
        acc: [string[], string[], CheckboxInputData, QueryLabelValueTypesMap],
        { label, value, inputKind, selectData }
      ) => {
        // selectData (string[]) cannot be sorted, the rest(number, boolean, date) can be sorted and filtered
        if (inputKind === 'selectInput') {
          acc[0].push(label);
        } else {
          acc[0].push(label);
          acc[1].push(label);
        }

        const checkboxDataObj = {
          label,
          value,
        };
        acc[2].push(checkboxDataObj);

        selectData
          ? acc[3].set(label, { value, inputKind, selectData })
          : acc[3].set(label, { value, inputKind });

        return acc;
      },
      [[], [], [], new Map()]
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
      type: queryBuilderAction.setProjectionCheckboxData,
      payload: projectionCheckboxData,
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

  const [filterValueErrorText, filterValueValidText] =
    returnAccessibleErrorValidTextElements({
      inputElementKind: currentFilterTerm,
      inputText: currentFilterValue,
      isInputTextFocused: isCurrentFilterValueFocused,
      isValidInputText: isCurrentFilterValueValid,
      regexValidationText,
    });

  const [
    projectionCheckboxInputSelectedText,
    projectionCheckboxInputDeselectedText,
  ] = returnAccessibleSelectedDeselectedTextElements({
    isSelected: projectionArray.length > 0,
    semanticName: 'projection fields',
    deselectedDescription: 'All fields will be returned',
    selectedDescription: `Only the following fields will be returned: ${projectionArray.join(
      ', '
    )}`,
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

  // ----------------- projection operation section -----------------  //

  const projectionCheckboxGroupInputCreatorInfo: AccessibleCheckboxGroupInputCreatorInfo =
    {
      dataObjectArray: projectionCheckboxData,
      description: {
        selected: projectionCheckboxInputSelectedText,
        deselected: projectionCheckboxInputDeselectedText,
      },
      onChange: (value) => {
        queryBuilderDispatch({
          type: queryBuilderAction.setProjectionArray,
          payload: value,
        });
      },
      semanticName: 'projection fields',
      label: 'Fields',
      value: projectionArray,
      required: true,
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

  const createdProjectionCheckboxGroupInput =
    returnAccessibleCheckboxGroupInputsElements([
      projectionCheckboxGroupInputCreatorInfo,
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

  const displayProjectionSection = (
    <FormLayoutWrapper>
      <TextWrapper creatorInfoObj={{}}>Projection</TextWrapper>
      {createdProjectionCheckboxGroupInput}
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
    logState({ state: queryBuilderState });
  }, [queryBuilderState]);

  //
  return (
    <Flex direction="column" align="center" justify="center">
      <TextWrapper creatorInfoObj={{}}>Query Builder</TextWrapper>
      {displayFilterSection}
      {displayProjectionSection}
      {displaySortSection}
    </Flex>
  );
}

export { QueryBuilder };
