import {
  Accordion,
  Center,
  Flex,
  Grid,
  Group,
  NavLink,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { ChangeEvent, useEffect, useReducer } from 'react';
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

import {
  DATE_FULL_RANGE_REGEX,
  MONEY_REGEX,
  TIME_RAILWAY_REGEX,
} from '../../constants/regex';
import { useGlobalState } from '../../hooks';
import {
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleButtonElements,
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleDateTimeElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextInputElements,
} from '../../jsxCreators';
import { CheckboxInputData } from '../../types';
import {
  logState,
  replaceLastCommaWithAnd,
  returnDateFullRangeValidationText,
  returnNumberAmountValidationText,
  returnTimeRailwayValidationText,
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
import { COLORS_SWATCHES } from '../../constants/data';
import { generateFilterChainStatement } from './utils';

function QueryBuilder({
  componentQueryData,
  collectionName,
  disableProjection = false,
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
    filterOperatorSelectData,

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
    globalState: {
      width,
      rowGap,
      padding,
      themeObject: { colorScheme, primaryShade },
    },
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
        { label, value, inputKind, selectData, booleanData }
      ) => {
        const [
          filterSelectDataAcc,
          sortSelectDataAcc,
          projectionCheckboxDataAcc,
          valueTypeObjectsAcc,
        ] = acc;

        // selectData (string[]) cannot be sorted, the rest(number, boolean, date) can be sorted and filtered
        if (inputKind === 'selectInput' || inputKind === 'booleanInput') {
          filterSelectDataAcc.push(label);
        } else if (
          inputKind === 'dateInput' ||
          inputKind === 'timeInput' ||
          inputKind === 'numberInput'
        ) {
          filterSelectDataAcc.push(label);
          sortSelectDataAcc.push(label);
        }

        const checkboxDataObj = {
          label,
          value,
        };
        projectionCheckboxDataAcc.push(checkboxDataObj);

        selectData
          ? valueTypeObjectsAcc.set(label, { value, inputKind, selectData })
          : booleanData
          ? valueTypeObjectsAcc.set(label, { value, inputKind, booleanData })
          : valueTypeObjectsAcc.set(label, { value, inputKind });

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
        : currentInputKind === 'timeInput'
        ? TIME_RAILWAY_REGEX.test(currentFilterValue)
        : MONEY_REGEX.test(currentFilterValue);

    queryBuilderDispatch({
      type: queryBuilderAction.setIsCurrentFilterValueValid,
      payload: isValid,
    });
  }, [currentFilterTerm, currentFilterValue, labelValueTypesMap]);

  // set appropriate filter operators
  useEffect(() => {
    const currentInputKind =
      labelValueTypesMap.get(currentFilterTerm)?.inputKind;
    const filterOperatorData =
      currentInputKind === 'selectInput' || currentInputKind === 'booleanInput'
        ? ['in']
        : QUERY_BUILDER_FILTER_OPERATORS;

    queryBuilderDispatch({
      type: queryBuilderAction.setFilterOperatorSelectData,
      payload: filterOperatorData,
    });

    // set current filter operator
    queryBuilderDispatch({
      type: queryBuilderAction.setCurrentFilterOperator,
      payload: filterOperatorData[0],
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
      : currentInputKind === 'timeInput'
      ? returnTimeRailwayValidationText({
          content: currentFilterValue,
          contentKind: currentFilterTerm,
          minLength: 5,
          maxLength: 5,
        })
      : currentInputKind === 'numberInput'
      ? returnNumberAmountValidationText({
          amount: currentFilterValue,
          kind: currentFilterTerm,
        })
      : '';

  const [filterValueErrorText, filterValueValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: currentFilterTerm,
      inputText: currentFilterValue,
      isInputTextFocused: isCurrentFilterValueFocused,
      isValidInputText: isCurrentFilterValueValid,
      regexValidationText,
    });

  const projectionExclusionFields = projectionArray
    .map((item) => {
      const findCorrespondingLabel = Array.from(labelValueTypesMap).find(
        ([_label, obj]) => {
          const { value } = obj;
          return value === item;
        }
      )?.[0];

      return findCorrespondingLabel;
    })
    .join(', ');

  const [
    projectionCheckboxInputSelectedText,
    projectionCheckboxInputDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: projectionArray.length > 0,
    semanticName: 'exclusion fields',
    deselectedDescription: 'All fields will be returned',
    selectedDescription:
      projectionArray.length === labelValueTypesMap.size
        ? 'All fields have been selected for exclusion. Nothing to query!'
        : `The following fields will not be returned: ${replaceLastCommaWithAnd(
            projectionExclusionFields
          )}`,
    theme: 'muted',
  });
  // ----------------- //

  const { gray } = COLORS_SWATCHES;
  const borderColor =
    colorScheme === 'light' ? `1px solid ${gray[3]}` : `1px solid ${gray[8]}`;

  // ----------------- filter section -----------------  //

  const createdFilterStatementsWithDeleteButton = filterStatementsQueue.map(
    (filterStatement, index) => {
      const statement = generateFilterChainStatement({
        filterStatement,
      });

      const [term, operator, value] = filterStatement;
      const displayStatement = <Text>{statement}</Text>;

      const deleteFilterButtonCreatorInfo: AccessibleButtonCreatorInfo = {
        buttonLabel: <TbTrash />,
        semanticDescription: `Delete filter statement: ${term} ${operator} ${value}`,
        semanticName: 'delete filter',
        buttonOnClick: () => {
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
        <Tooltip label={`Delete: ${statement}`}>
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
          style={{ border: borderColor, borderRadius: 4 }}
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
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
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

  const filterOperatorsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: filterOperatorSelectData,
      label: 'Operator',
      description: `${
        currentFilterTerm === ''
          ? 'Please select a field'
          : currentInputKind === 'selectInput' ||
            currentInputKind === 'booleanInput'
          ? 'Only "in" is available for hardcoded data'
          : `Select an operator for ${currentFilterTerm}`
      }`,
      value: currentFilterOperator,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
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
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
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

  const filterValueTimeInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    label: 'Value',
    description: {
      error: filterValueErrorText,
      valid: filterValueValidText,
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
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
    inputKind: 'time',
    inputText: currentFilterValue,
    isValidInputText: isCurrentFilterValueValid,
    placeholder: 'Enter time in 24-hour format',
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
    data:
      labelValueTypesMap.get(currentFilterTerm)?.selectData ||
      // select input data type is (string|SelectItem)[], does not accept boolean[]
      labelValueTypesMap
        .get(currentFilterTerm)
        ?.booleanData?.map((bool) => `${bool}`) ||
      [],
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
  console.log('filteredSortSelectData: ', filteredSortSelectData);
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
      const displayStatement = <Text>{statement}</Text>;

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
          <Group>{createdDeleteSortButton}</Group>
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
          style={{ border: borderColor, borderRadius: 4 }}
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
      : currentInputKind === 'timeInput'
      ? returnAccessibleDateTimeElements([filterValueTimeInputCreatorInfo])
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

  // const displayFilterSection = (
  //   <Flex w="100%" direction="column">
  //     {filteredFilterSelectData.length === 0 ? (
  //       <TextWrapper creatorInfoObj={{}}>No fields to filter!</TextWrapper>
  //     ) : (
  //       <FormLayoutWrapper>
  //         <NavLink
  //           label="Filter"
  //           icon={<TbFilterCog />}
  //           rightSection={<TbChevronRight />}
  //           childrenOffset="xs"
  //           disabled={filteredFilterSelectData.length === 0}
  //           w="62%"
  //         >
  //           <Flex direction="column" w="100%" rowGap={rowGap}>
  //             {displayFilterChains}

  //             <Grid
  //               w="100%"
  //               align="flex-end"
  //               justify="flex-start"
  //               gutter={rowGap}
  //             >
  //               <Grid.Col md={6} lg={3}>
  //                 {createdFilterSelectInput}
  //               </Grid.Col>
  //               <Grid.Col md={6} lg={3}>
  //                 {createdFilterOperatorsSelectInput}
  //               </Grid.Col>
  //               <Grid.Col md={6} lg={3}>
  //                 {createdFilterValueInput}
  //               </Grid.Col>
  //               <Grid.Col md={6} lg={3}>
  //                 <Flex align="center" justify="flex-end">
  //                   <Tooltip label="Add a new filter chain">
  //                     <Center>{createdAddNewFilterButton}</Center>
  //                   </Tooltip>
  //                 </Flex>
  //               </Grid.Col>
  //             </Grid>
  //           </Flex>
  //         </NavLink>
  //       </FormLayoutWrapper>
  //     )}
  //   </Flex>
  // );

  const displayFilterSection = (
    <Stack w="100%">
      {filteredFilterSelectData.length === 0 ? (
        <Text>No fields to filter!</Text>
      ) : (
        <Accordion w="100%">
          <Accordion.Item value="Filter">
            <Accordion.Control disabled={filteredFilterSelectData.length === 0}>
              <Title order={5}>Filter</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack w="100%">
                {displayFilterChains}
                <FormLayoutWrapper>
                  <Group w="100%" position="apart">
                    <Title order={5}>Build Filter Chain</Title>
                    <Tooltip label="Add a new filter chain">
                      <Group>{createdAddNewFilterButton}</Group>
                    </Tooltip>
                  </Group>
                  {createdFilterSelectInput}
                  {createdFilterOperatorsSelectInput}
                  {createdFilterValueInput}
                </FormLayoutWrapper>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}
    </Stack>
  );

  // const displayProjectionSection = (
  //   <FormLayoutWrapper>
  //     <NavLink
  //       label="Projection"
  //       icon={<VscExclude />}
  //       rightSection={<TbChevronRight />}
  //       childrenOffset="xs"
  //       disabled={disableProjection}
  //       w="62%"
  //     >
  //       {createdProjectionCheckboxGroupInput}
  //     </NavLink>
  //   </FormLayoutWrapper>
  // );

  const displayProjectionSection = (
    <Stack w="100%">
      <Accordion w="100%">
        <Accordion.Item value="Projection">
          <Accordion.Control disabled={disableProjection}>
            <Title order={5}>Projection</Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack w="100%">
              <FormLayoutWrapper>
                {createdProjectionCheckboxGroupInput}
              </FormLayoutWrapper>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );

  // const displaySortSection = (
  //   <Flex w="100%" direction="column">
  //     {filteredSortSelectData.length === 0 ? (
  //       <Text>No fields to sort!</Text>
  //     ) : (
  //       <FormLayoutWrapper>
  //         <NavLink
  //           label="Sort"
  //           icon={<TbArrowsSort />}
  //           rightSection={<TbChevronRight />}
  //           childrenOffset="xs"
  //           disabled={filteredSortSelectData.length === 0}
  //           w="62%"
  //         >
  //           <Flex direction="column" w="100%" rowGap={rowGap}>
  //             {displaySortChains}
  //             <Grid
  //               w="100%"
  //               align="flex-end"
  //               justify="flex-start"
  //               gutter={rowGap}
  //             >
  //               <Grid.Col md={6} lg={3}>
  //                 {createdSortSelectInput}
  //               </Grid.Col>
  //               <Grid.Col md={6} lg={3}>
  //                 {createdSortDirectionSelectInput}
  //               </Grid.Col>
  //               <Grid.Col md={6} lg={3}>
  //                 {}
  //               </Grid.Col>
  //               <Grid.Col md={6} lg={3}>
  //                 <Flex align="center" justify="flex-end">
  //                   <Tooltip label="Add a new sort chain">
  //                     <Center>{createdAddNewSortButton}</Center>
  //                   </Tooltip>
  //                 </Flex>
  //               </Grid.Col>
  //             </Grid>
  //           </Flex>
  //         </NavLink>
  //       </FormLayoutWrapper>
  //     )}
  //   </Flex>
  // );
  const displaySortSection = (
    <Stack w="100%">
      {filteredSortSelectData.length === 0 ? (
        <Text>No fields to sort!</Text>
      ) : (
        <Accordion w="100%">
          <Accordion.Item value="Sort">
            <Accordion.Control disabled={filteredSortSelectData.length === 0}>
              <Title order={5}>Sort</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack w="100%">
                {displaySortChains}
                <FormLayoutWrapper>
                  <Group w="100%" position="apart">
                    <Title order={5}>Build Sort Chain</Title>
                    <Tooltip label="Add a new sort chain">
                      <Group>{createdAddNewSortButton}</Group>
                    </Tooltip>
                  </Group>
                  {createdSortSelectInput}
                  {createdSortDirectionSelectInput}
                </FormLayoutWrapper>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}
    </Stack>
  );

  // ----------------- //

  // const displayQueryBuilderComponent = (
  //   <Flex
  //     w={width < 768 ? '100%' : width < 1440 ? '85%' : '62%'}
  //     p={padding}
  //     direction="column"
  //     rowGap={rowGap}
  //     style={{
  //       border: borderColor,
  //       borderRadius: 4,
  //     }}
  //   >
  //     <NavLink
  //       label="Query Builder"
  //       icon={<TbArrowsSort />}
  //       rightSection={<TbChevronRight />}
  //       childrenOffset={0}
  //       disabled={
  //         filteredSortSelectData.length === 0 &&
  //         filteredFilterSelectData.length === 0 &&
  //         projectionArray.length === 0
  //       }
  //       w="62%"
  //     >
  //       <Flex w="100%" direction="column" rowGap={rowGap} p={padding}>
  //         {displayFilterSection}
  //         {displaySortSection}
  //         {displayProjectionSection}
  //         <Flex align="center" justify="flex-end">
  //           <Group position="apart">
  //             <Tooltip label={`Clear ${collectionName} query`}>
  //               <Group>{createdClearButton}</Group>
  //             </Tooltip>
  //             <Tooltip label={`Submit ${collectionName} query`}>
  //               <Group>{createdSubmitButton}</Group>
  //             </Tooltip>
  //           </Group>
  //         </Flex>
  //       </Flex>
  //     </NavLink>
  //   </Flex>
  // );
  const queryBuilderWidth =
    width < 480
      ? 375 - 20
      : width < 640
      ? 480 - 20
      : width < 768
      ? 640 - 20
      : width < 1024
      ? (width - 200) * 0.75
      : 1024 - 250;

  const displayQueryBuilderComponent = (
    <Flex
      w={queryBuilderWidth}
      p={padding}
      direction="column"
      rowGap={rowGap}
      style={{
        border: borderColor,
        borderRadius: 4,
      }}
    >
      <Stack w="100%">
        <Accordion w="100%">
          <Accordion.Item value="Query Builder">
            <Accordion.Control
              disabled={
                filteredSortSelectData.length === 0 &&
                filteredFilterSelectData.length === 0 &&
                projectionArray.length === 0
              }
            >
              <Title order={4}>Query Builder</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack w="100%">
                {displayFilterSection}
                {displaySortSection}
                {displayProjectionSection}
                <Flex align="center" justify="flex-end">
                  <Group position="apart">
                    <Tooltip label={`Clear ${collectionName} query`}>
                      <Group>{createdClearButton}</Group>
                    </Tooltip>
                    <Tooltip label={`Submit ${collectionName} query`}>
                      <Group>{createdSubmitButton}</Group>
                    </Tooltip>
                  </Group>
                </Flex>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Flex>
  );

  useEffect(() => {
    logState({
      state: queryBuilderState,
      groupLabel: 'queryBuilderState',
    });
  }, [queryBuilderState]);

  return <>{displayQueryBuilderComponent}</>;
}

export { QueryBuilder };
