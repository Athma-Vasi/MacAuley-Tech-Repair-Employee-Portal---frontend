import {
  Center,
  Flex,
  Grid,
  Group,
  NavLink,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { useEffect, useReducer } from 'react';
import {
  TbArrowsSort,
  TbChevronRight,
  TbClearAll,
  TbFilterCog,
  TbLayersLinked,
  TbPlus,
  TbTrash,
  TbUpload,
} from 'react-icons/tb';
import { VscExclude } from 'react-icons/vsc';

import { DATE_FULL_RANGE_REGEX, MONEY_REGEX } from '../../constants/regex';
import { useGlobalState } from '../../hooks';
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
import { TimelineBuilder } from '../timelineBuilder';
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
  setQueryBuilderString,
  parentComponentDispatch,
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
  const {
    globalState: { width, rowGap, padding },
  } = useGlobalState();

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
        } else if (inputKind === 'dateInput' || inputKind === 'numberInput') {
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

  // ----------------- accessibility texts -----------------  //

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
  // ----------------- //

  // ----------------- filter section -----------------  //

  const createdFilterStatementsWithDeleteButton = filterStatementsQueue.map(
    ([term, operator, value], index) => {
      const statement = `Select ${term}${
        term[term.length - 1] === 's' ? 'es' : 's'
      } that are ${operator} ${value}. `;

      const displayStatement = <Text size="xs">{statement}</Text>;

      const deleteFilterButtonCreatorInfo: AccessibleButtonCreatorInfo = {
        buttonLabel: <TbTrash />,
        semanticDescription: `Delete filter statement: ${term} ${operator} ${value}`,
        semanticName: 'delete filter',
        // leftIcon: <TbTrash />,
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
        <Flex
          key={`filter-statement-${index}`}
          align="center"
          justify="space-between"
          w="100%"
          p={padding}
          columnGap={rowGap}
          style={{ border: '1px solid #e0e0e0', borderRadius: 4 }}
        >
          <Flex align="center" justify="flex-start" w="100%">
            {displayStatement}
          </Flex>
          <Flex align="center" justify="flex-end">
            {displayDeleteFilterButton}
          </Flex>
        </Flex>
      );
    }
  );

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
      ? ['', 'in']
      : QUERY_BUILDER_FILTER_OPERATORS;
  const filterOperatorsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: filterOperatorData,
      label: 'Operator',
      description: `${
        currentFilterTerm === ''
          ? 'Please select a field'
          : currentInputKind === 'selectInput'
          ? 'Only "in" is available for hardcoded data'
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
    leftIcon: <TbPlus />,
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
  // ----------------- //

  // ----------------- projection operation -----------------  //

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
  // ----------------- //

  // ----------------- sort operation -----------------  //

  const filteredSortSelectData = sortSelectData.filter(
    (term) => !projectedFieldsSet.has(term)
  );
  const sortSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: filteredSortSelectData,
    label: 'Field',
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
    leftIcon: <TbPlus />,
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

  const createdSortStatementsWithDeleteButton = sortStatementsQueue.map(
    ([term, direction], index) => {
      const statement = `Sort ${term}${
        term[term.length - 1] === 's' ? 'es' : 's'
      } in ${direction} order. `;
      const displayStatement = <Text size="xs">{statement}</Text>;

      const deleteSortButtonCreatorInfo: AccessibleButtonCreatorInfo = {
        buttonLabel: <TbTrash />,
        semanticDescription: `Delete sort statement: ${term} ${direction}`,
        semanticName: 'delete sort',
        // leftIcon: <TbTrash />,
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
        <Flex
          key={`sort-statement-${index}`}
          align="center"
          justify="space-between"
          w="100%"
          p={padding}
          columnGap={rowGap}
          style={{ border: '1px solid #e0e0e0', borderRadius: 4 }}
        >
          <Flex align="center" justify="flex-start" w="100%">
            {displayStatement}
          </Flex>
          <Flex align="center" justify="flex-end">
            {displayDeleteSortButton}
          </Flex>
        </Flex>
      );
    }
  );
  // ----------------- //

  // ----------------- submit and clear button -----------------  //
  const submitQueryToParentComponentButtonCreatorInfo: AccessibleButtonCreatorInfo =
    {
      buttonLabel: 'Submit',
      semanticDescription: `Submit query to ${collectionName}`,
      semanticName: 'submit query',
      buttonOnClick: (event) => {
        parentComponentDispatch({
          type: setQueryBuilderString,
          payload: queryString,
        });
      },
      // buttonDisabled: queryString === '?',
      leftIcon: <TbUpload />,
    };

  const clearQueryButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Clear',
    semanticDescription: `Clear query to ${collectionName}`,
    semanticName: 'clear query',
    buttonOnClick: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setClearAllQueryData,
        payload: '',
      });
      parentComponentDispatch({
        type: setQueryBuilderString,
        payload: queryString,
      });
    },
    leftIcon: <TbClearAll />,
  };
  // ----------------- //

  // ----------------- create and display elements -----------------  //

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

  const [
    createdAddNewFilterButton,
    createdAddNewSortButton,
    createdSubmitButton,
    createdClearButton,
  ] = returnAccessibleButtonElements([
    addNewFilterButtonCreatorInfo,
    addNewSortButtonCreatorInfo,
    submitQueryToParentComponentButtonCreatorInfo,
    clearQueryButtonCreatorInfo,
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

  const displayFilterChains = (
    <Stack w="100%">
      <TimelineBuilder
        timelines={{
          'filter chain': createdFilterStatementsWithDeleteButton,
        }}
      />
    </Stack>
  );
  const displaySortChains = (
    <Stack w="100%">
      <TimelineBuilder
        timelines={{
          'sort chain': createdSortStatementsWithDeleteButton,
        }}
      />
    </Stack>
  );

  const displayFilterSection = (
    <Flex w="100%" direction="column">
      {filteredFilterSelectData.length === 0 ? (
        <TextWrapper creatorInfoObj={{}}>No fields to filter!</TextWrapper>
      ) : (
        <FormLayoutWrapper>
          <NavLink
            label="Filter"
            icon={<TbFilterCog />}
            rightSection={<TbChevronRight />}
            childrenOffset="xs"
            disabled={filteredFilterSelectData.length === 0}
            w="62%"
          >
            <Flex direction="column" w="100%" rowGap={rowGap}>
              {displayFilterChains}

              <Grid
                w="100%"
                align="flex-end"
                justify="flex-start"
                gutter={rowGap}
              >
                <Grid.Col md={6} lg={3}>
                  {createdFilterSelectInput}
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                  {createdFilterOperatorsSelectInput}
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                  {createdFilterValueInput}
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                  <Flex align="center" justify="flex-end">
                    <Tooltip label="Add a new filter chain">
                      <Center>{createdAddNewFilterButton}</Center>
                    </Tooltip>
                  </Flex>
                </Grid.Col>
              </Grid>
            </Flex>
          </NavLink>
        </FormLayoutWrapper>
      )}
    </Flex>
  );

  const displayProjectionSection = (
    <FormLayoutWrapper>
      <NavLink
        label="Projection"
        icon={<VscExclude />}
        rightSection={<TbChevronRight />}
        childrenOffset="xs"
        // disabled={filteredFilterSelectData.length === 0}
        w="62%"
      >
        {createdProjectionCheckboxGroupInput}
      </NavLink>
    </FormLayoutWrapper>
  );

  const displaySortSection = (
    <Flex w="100%" direction="column">
      {filteredSortSelectData.length === 0 ? (
        <TextWrapper creatorInfoObj={{}}>No fields to sort!</TextWrapper>
      ) : (
        <FormLayoutWrapper>
          <NavLink
            label="Sort"
            icon={<TbArrowsSort />}
            rightSection={<TbChevronRight />}
            childrenOffset="xs"
            disabled={filteredSortSelectData.length === 0}
            w="62%"
          >
            <Flex direction="column" w="100%" rowGap={rowGap}>
              {displaySortChains}
              <Grid
                w="100%"
                align="flex-end"
                justify="flex-start"
                gutter={rowGap}
              >
                <Grid.Col md={6} lg={3}>
                  {createdSortSelectInput}
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                  {createdSortDirectionSelectInput}
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                  {}
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                  <Flex align="center" justify="flex-end">
                    <Tooltip label="Add a new sort chain">
                      <Center>{createdAddNewSortButton}</Center>
                    </Tooltip>
                  </Flex>
                </Grid.Col>
              </Grid>
            </Flex>
          </NavLink>
        </FormLayoutWrapper>
      )}
    </Flex>
  );

  // ----------------- //

  const displayQueryBuilderComponent = (
    <Flex
      w={width < 768 ? '100%' : width < 1440 ? '85%' : '62%'}
      p={padding}
      direction="column"
      rowGap={rowGap}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: 4,
      }}
    >
      <NavLink
        label="Query Builder"
        icon={<TbArrowsSort />}
        rightSection={<TbChevronRight />}
        childrenOffset={0}
        disabled={
          filteredSortSelectData.length === 0 &&
          filteredFilterSelectData.length === 0 &&
          projectionArray.length === 0
        }
        w="62%"
      >
        <Flex w="100%" direction="column" rowGap={rowGap} p={padding}>
          {displayFilterSection}
          {displaySortSection}
          {displayProjectionSection}
          <Flex align="center" justify="flex-end">
            <Tooltip label={`Submit ${collectionName} query`}>
              <Group position="apart">
                {createdClearButton}
                {createdSubmitButton}
              </Group>
            </Tooltip>
          </Flex>
        </Flex>
      </NavLink>
    </Flex>
  );

  // useEffect(() => {
  //   logState({
  //     state: queryBuilderState,
  //     groupLabel: 'queryBuilderState',
  //   });
  // }, [queryBuilderState]);

  return <>{displayQueryBuilderComponent}</>;
}

export { QueryBuilder };
