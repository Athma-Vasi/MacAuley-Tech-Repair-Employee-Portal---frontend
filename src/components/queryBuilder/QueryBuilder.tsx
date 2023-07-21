import { Center, Flex, Group, Tooltip } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { DATE_FULL_RANGE_REGEX, MONEY_REGEX } from '../../constants/regex';
import {
  returnAccessibleButtonElements,
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleDateTimeElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextInputElements,
} from '../../jsxCreators';
import { CheckboxInputData } from '../../types';
import {
  logState,
  returnDateFullRangeValidationText,
  returnNumberAmountValidationText,
} from '../../utils';
import {
  AccessibleButtonCreatorInfo,
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
    projectedFieldsSet,

    queryString,

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
    // loop through componentQueryData and assign to both filter select data or sort select data, checkbox data, and labelValueTypesMap
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
  }, [componentQueryData, selectedFieldsSet, projectedFieldsSet]);

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

  // build query string on every filter, sort, or projection arrays change
  useEffect(() => {
    // build the query
    queryBuilderDispatch({
      type: queryBuilderAction.buildQueryString,
      payload: {
        labelValueTypesMap,
        filterStatementsQueue,
        projectionArray,
        sortStatementsQueue,
      },
    });
  }, [
    filterStatementsQueue,
    projectionArray,
    sortStatementsQueue,
    labelValueTypesMap,
  ]);

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

  const createdFilterStatementsWithDeleteButton = filterStatementsQueue.map(
    ([term, operator, value], index) => {
      const [
        filterStatementsQueueSelectedText,
        filterStatementsQueueDeselectedText,
      ] = returnAccessibleSelectedDeselectedTextElements({
        isSelected: filterStatementsQueue.length > 0,
        semanticName: 'filter statements',
        deselectedDescription: 'No filter statements have been added',
        selectedDescription: `Select ${term}${
          term[term.length - 1] === 's' ? 'es' : 's'
        } that are ${operator} ${value}. `,
        theme: 'muted',
      });

      const deleteFilterButtonCreatorInfo: AccessibleButtonCreatorInfo = {
        buttonLabel: 'Delete',
        semanticDescription: `Delete filter statement: ${term} ${operator} ${value}`,
        semanticName: 'delete filter',
        buttonOnClick: (event) => {
          queryBuilderDispatch({
            type: queryBuilderAction.setFilterStatementsQueue,
            payload: {
              index,
              value: ['', '', ''],
            },
          });
          // remove field from selected fields set
          queryBuilderDispatch({
            type: queryBuilderAction.setSelectedFieldsSet,
            payload: {
              calledFrom: 'filter',
            },
          });
        },
      };

      const [createdDeleteFilterButton] = returnAccessibleButtonElements([
        deleteFilterButtonCreatorInfo,
      ]);

      const displayDeleteFilterButton = (
        <Tooltip
          label={`Delete filter statement: ${term} ${operator} ${value}`}
        >
          <Center>{createdDeleteFilterButton}</Center>
        </Tooltip>
      );

      return (
        <FormLayoutWrapper direction="row" key={`filter-statement-${index}`}>
          {filterStatementsQueueSelectedText}
          {filterStatementsQueueDeselectedText}
          {displayDeleteFilterButton}
        </FormLayoutWrapper>
      );
    }
  );

  const createdSortStatementsWithDeleteButton = sortStatementsQueue.map(
    ([term, direction], index) => {
      const [
        sortStatementsQueueSelectedText,
        sortStatementsQueueDeselectedText,
      ] = returnAccessibleSelectedDeselectedTextElements({
        isSelected: sortStatementsQueue.length > 0,
        semanticName: 'sort statements',
        deselectedDescription: 'No sort statements have been added',
        selectedDescription: `Sort ${term}s in ${direction} order. `,
        theme: 'muted',
      });

      const deleteSortButtonCreatorInfo: AccessibleButtonCreatorInfo = {
        buttonLabel: 'Delete',
        semanticDescription: `Delete sort statement: ${term} ${direction}`,
        semanticName: 'delete sort',
        buttonOnClick: (event) => {
          queryBuilderDispatch({
            type: queryBuilderAction.setSortStatementsQueue,
            payload: {
              index,
              value: ['', ''],
            },
          });
          // remove field from selected fields set
          queryBuilderDispatch({
            type: queryBuilderAction.setSelectedFieldsSet,
            payload: {
              calledFrom: 'sort',
            },
          });
        },
      };

      const [createdDeleteSortButton] = returnAccessibleButtonElements([
        deleteSortButtonCreatorInfo,
      ]);

      const displayDeleteSortButton = (
        <Tooltip label={`Delete sort statement: ${term} ${direction}`}>
          <Center>{createdDeleteSortButton}</Center>
        </Tooltip>
      );

      return (
        <FormLayoutWrapper direction="row" key={`sort-statement-${index}`}>
          {sortStatementsQueueSelectedText}
          {sortStatementsQueueDeselectedText}
          {displayDeleteSortButton}
        </FormLayoutWrapper>
      );
    }
  );

  const [
    projectionCheckboxInputSelectedText,
    projectionCheckboxInputDeselectedText,
  ] = returnAccessibleSelectedDeselectedTextElements({
    isSelected: projectionArray.length > 0,
    semanticName: 'exclusion fields',
    deselectedDescription: 'All fields will be returned',
    selectedDescription:
      projectionArray.length === labelValueTypesMap.size
        ? 'All fields have been selected for exclusion. Nothing to query!'
        : `The following fields will not be returned: ${projectionArray
            .map((item) => {
              const findCorrespondingLabel = Array.from(
                labelValueTypesMap
              ).reduce((acc, curr) => {
                const [label, obj] = curr;
                const { value } = obj;
                if (value === item) {
                  // rome-ignore lint:
                  acc = label;
                }

                return acc;
              }, '');

              return findCorrespondingLabel;
            })
            .join(', ')}`,
    theme: 'muted',
  });

  // ----------------- filter operation section -----------------  //

  const filteredFilterSelectData = filterSelectData.filter(
    (term) => !projectedFieldsSet.has(term)
  );
  const filterSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: filteredFilterSelectData,
    label: 'Field',
    description: `Select a field to filter ${collectionName} by`,
    describedBy:
      filterStatementsQueue.length > 0
        ? 'filter-statements-deselected'
        : 'filter-statements-selected',
    value: currentFilterTerm,
    onChange: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentFilterTerm,
        payload: event.currentTarget.value,
      });

      // set the filter value to first select data value, as the stale value is present by default
      const firstSelectDataValue =
        labelValueTypesMap.get(event.currentTarget.value)?.selectData?.[0] ||
        '';
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentFilterValue,
        payload: firstSelectDataValue,
      });
    },
  };

  const filterOperatorData =
    currentInputKind === 'selectInput'
      ? ['equal to']
      : QUERY_BUILDER_FILTER_OPERATORS;
  const filterOperatorsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: filterOperatorData,
      label: 'Operator',
      description: `${
        currentFilterTerm === ''
          ? 'Please select a field'
          : currentInputKind === 'selectInput'
          ? 'Only "equal to" is available for hardcoded data'
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

  const addNewFilterButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Add',
    semanticDescription:
      'Add new filter statement that can be chained with previous statements',
    semanticName: 'add new filter',
    buttonOnClick: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setFilterStatementsQueue,
        payload: {
          index: filterStatementsQueue.length,
          value: [currentFilterTerm, currentFilterOperator, currentFilterValue],
        },
      });
      // add field to selected fields set
      queryBuilderDispatch({
        type: queryBuilderAction.setSelectedFieldsSet,
        payload: {
          calledFrom: 'filter',
        },
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
      disabledValuesSet: selectedFieldsSet,
      onChange: (value) => {
        queryBuilderDispatch({
          type: queryBuilderAction.setProjectionArray,
          payload: value,
        });
        // add field to selected fields set
        queryBuilderDispatch({
          type: queryBuilderAction.setProjectedFieldsSet,
          payload: value,
        });
      },
      semanticName: 'exclusion fields',
      label: 'Fields',
      value: projectionArray,
    };

  // ----------------- sort operation section -----------------  //
  const filteredSortSelectData = sortSelectData.filter(
    (term) => !projectedFieldsSet.has(term)
  );
  const sortSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: filteredSortSelectData,
    label: 'Sort',
    description: `Select a field to sort ${collectionName} by`,
    value: currentSortTerm,
    onChange: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentSortTerm,
        payload: event.currentTarget.value,
      });
      // add field to selected fields set
      queryBuilderDispatch({
        type: queryBuilderAction.setSelectedFieldsSet,
        payload: {
          calledFrom: 'sort',
        },
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

  const addNewSortButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Add',
    semanticDescription:
      'Add new sort statement that can be chained with previous statements',
    semanticName: 'add new sort',
    buttonOnClick: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setSortStatementsQueue,
        payload: {
          index: sortStatementsQueue.length,
          value: [currentSortTerm, currentSortDirection],
        },
      });
      // add field to selected fields set
      queryBuilderDispatch({
        type: queryBuilderAction.setSelectedFieldsSet,
        payload: {
          calledFrom: 'sort',
        },
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

  const [createdAddNewFilterButton, createdAddNewSortButton] =
    returnAccessibleButtonElements([
      addNewFilterButtonCreatorInfo,
      addNewSortButtonCreatorInfo,
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
      {filteredFilterSelectData.length === 0 ? (
        <TextWrapper creatorInfoObj={{}}>No fields to filter!</TextWrapper>
      ) : (
        <>
          <TextWrapper creatorInfoObj={{}}>Filter</TextWrapper>
          {createdFilterStatementsWithDeleteButton}
          <FormLayoutWrapper direction="row">
            {createdFilterSelectInput}
            {createdFilterOperatorsSelectInput}
            {createdFilterValueInput}
            {createdAddNewFilterButton}
          </FormLayoutWrapper>
        </>
      )}
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
      {filteredSortSelectData.length === 0 ? (
        <TextWrapper creatorInfoObj={{}}>No fields to sort!</TextWrapper>
      ) : (
        <Group>
          <TextWrapper creatorInfoObj={{}}>Sort</TextWrapper>
          {createdSortStatementsWithDeleteButton}
          <FormLayoutWrapper direction="row">
            {createdSortSelectInput}
            {createdSortDirectionSelectInput}
            {createdAddNewSortButton}
          </FormLayoutWrapper>
        </Group>
      )}
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
