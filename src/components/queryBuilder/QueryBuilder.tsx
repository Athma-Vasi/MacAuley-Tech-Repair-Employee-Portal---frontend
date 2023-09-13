import {
  Accordion,
  Center,
  Divider,
  Flex,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChangeEvent, useEffect, useReducer } from 'react';
import { RxLinkBreak2 } from 'react-icons/rx';
import {
  TbArrowDown,
  TbChevronDown,
  TbClearAll,
  TbLink,
  TbPlus,
  TbQuestionMark,
  TbTrash,
  TbUpload,
} from 'react-icons/tb';

import { COLORS_SWATCHES } from '../../constants/data';
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
  returnThemeColors,
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
} from '../wrappers';
import {
  ORDINAL_TERMS,
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
  FILTER_HELP_MODAL_CONTENT,
  generateFilterChainStatement,
  PROJECTION_HELP_MODAL_CONTENT,
  QUERY_BUILDER_HELP_MODAL_CONTENT,
  SORT_HELP_MODAL_CONTENT,
} from './utils';

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

    isQueryBuilderOpened,
    isFilterOpened,
    isFilterChainOpened,
    isSortOpened,
    isSortChainOpened,
    isProjectionOpened,
  } = queryBuilderState;
  const {
    globalState: { width, rowGap, padding, themeObject },
  } = useGlobalState();

  const [
    openedQueryHelpModal,
    { open: openQueryHelpModal, close: closeQueryHelpModal },
  ] = useDisclosure(false);
  const [
    openedFilterHelpModal,
    { open: openFilterHelpModal, close: closeFilterHelpModal },
  ] = useDisclosure(false);
  const [
    openedSortHelpModal,
    { open: openSortHelpModal, close: closeSortHelpModal },
  ] = useDisclosure(false);
  const [
    openedProjectionHelpModal,
    { open: openProjectionHelpModal, close: closeProjectionHelpModal },
  ] = useDisclosure(false);

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

  const {
    generalColors: { themeColorShade, grayColorShade },
    appThemeColors: { borderColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

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

      const dividerLabel = (
        <Group>
          <TbLink color={themeColorShade} />
          <Text>AND</Text>
          <TbArrowDown color={themeColorShade} />
        </Group>
      );

      return (
        <Stack w="100%">
          <Flex
            key={`filter-statement-${index}`}
            align="center"
            justify="space-between"
            w="100%"
            columnGap={rowGap}
          >
            <Group w="100%" position="apart">
              <Divider
                labelPosition="left"
                label={displayStatement}
                w="87%"
                size="sm"
              />
              {displayDeleteFilterButton}
            </Group>
          </Flex>
          {index === filterStatementsQueue.length - 1 ? null : (
            <Divider size="sm" label={dividerLabel} labelPosition="center" />
          )}
        </Stack>
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
    customWidth: '100%',
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

      const dividerLabel = (
        <Group>
          <RxLinkBreak2 color={themeColorShade} />
          <Text>{ORDINAL_TERMS[index]} tiebreaker</Text>
          <TbArrowDown color={themeColorShade} />
        </Group>
      );

      return (
        <Stack w="100%">
          <Flex
            key={`sort-statement-${index}`}
            align="center"
            justify="space-between"
            w="100%"
            columnGap={rowGap}
          >
            <Group position="apart" w="100%">
              {displayStatement}
              {displayDeleteSortButton}
            </Group>
          </Flex>
          {index === sortStatementsQueue.length - 1 ? null : (
            <Divider size="sm" label={dividerLabel} labelPosition="center" />
          )}
        </Stack>
      );
    }
  );
  // ----------------- //

  // ----------------- button creator infos -----------------  //
  const submitQueryToParentComponentButtonCreatorInfo: AccessibleButtonCreatorInfo =
    {
      buttonLabel: 'Submit',
      semanticDescription: `Submit query to ${collectionName}`,
      semanticName: 'submit query',
      buttonOnClick: () => {
        parentComponentDispatch({
          type: setQueryBuilderString,
          payload: queryString,
        });
      },
      leftIcon: <TbUpload />,
    };

  const clearQueryButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: 'Clear',
    semanticDescription: `Clear query to ${collectionName}`,
    semanticName: 'clear query',
    buttonOnClick: () => {
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

  const queryBuilderHelpButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: <TbQuestionMark />,
    semanticDescription: 'Open query help modal',
    semanticName: 'query help',
    buttonOnClick: () => {
      openQueryHelpModal();
    },
  };

  const filterHelpButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: <TbQuestionMark />,
    semanticDescription: 'Open filter help modal',
    semanticName: 'filter help',
    buttonOnClick: () => {
      openFilterHelpModal();
    },
  };

  const sortHelpButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: <TbQuestionMark />,
    semanticDescription: 'Open sort help modal',
    semanticName: 'sort help',
    buttonOnClick: () => {
      openSortHelpModal();
    },
  };

  const projectionHelpButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: <TbQuestionMark />,
    semanticDescription: 'Open projection help modal',
    semanticName: 'projection help',
    buttonOnClick: () => {
      openProjectionHelpModal();
    },
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
    createdQueryBuilderHelpButton,
    createdFilterHelpButton,
    createdSortHelpButton,
    createdProjectionHelpButton,
  ] = returnAccessibleButtonElements([
    addNewFilterButtonCreatorInfo,
    addNewSortButtonCreatorInfo,
    submitQueryToParentComponentButtonCreatorInfo,
    clearQueryButtonCreatorInfo,
    queryBuilderHelpButtonCreatorInfo,
    filterHelpButtonCreatorInfo,
    sortHelpButtonCreatorInfo,
    projectionHelpButtonCreatorInfo,
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

  const displayFilterSection = (
    <Stack w="100%">
      {filteredFilterSelectData.length === 0 ? (
        <Text>No fields to filter!</Text>
      ) : (
        <Accordion
          w="100%"
          chevron={
            <TbChevronDown
              color={isFilterOpened ? themeColorShade : grayColorShade}
            />
          }
          onClick={() => {
            queryBuilderDispatch({
              type: queryBuilderAction.toggleIsFilterOpened,
              payload: isFilterOpened,
            });
          }}
        >
          <Accordion.Item value="Filter">
            <Accordion.Control disabled={filteredFilterSelectData.length === 0}>
              <Title order={5}>Filter</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack w="100%">
                {displayFilterChains}
                <FormLayoutWrapper>
                  <Group w="100%" position="apart">
                    <Group spacing={rowGap}>
                      <Title order={5}>Build Filter Chain</Title>
                      <Tooltip label="Filter help">
                        <Group>{createdFilterHelpButton}</Group>
                      </Tooltip>
                    </Group>
                    {/* add new filter button */}
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
                <Group spacing={rowGap}>
                  <Title order={5}>Projection Exclusion</Title>
                  <Tooltip label="Projection help">
                    <Group>{createdProjectionHelpButton}</Group>
                  </Tooltip>
                </Group>
                {createdProjectionCheckboxGroupInput}
              </FormLayoutWrapper>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );

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
                    <Group spacing={rowGap}>
                      <Title order={5}>Build Sort Chain</Title>
                      <Tooltip label="Sort help">
                        <Group>{createdSortHelpButton}</Group>
                      </Tooltip>
                    </Group>
                    {/* add new sort chain button */}
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

  const queryBuilderWidth =
    width < 480 // for iPhone 5/SE
      ? 375 - 20
      : width < 768 // for iPhone 6/7/8
      ? width - 40
      : // at 768vw the navbar appears at width of 200px
      width < 1024
      ? (width - 200) * 0.85
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 300) * 0.85
      : 900 - 40;

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
                <Flex align="center" justify="flex-end" py={padding}>
                  <Group position="apart">
                    <Tooltip label="Query help">
                      <Group>{createdQueryBuilderHelpButton}</Group>
                    </Tooltip>
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

  const queryBuilderHelpModal = (
    <Modal
      opened={openedQueryHelpModal}
      onClose={closeQueryHelpModal}
      title={<Title order={4}>Query help</Title>}
      size={width <= 1024 ? 'auto' : 1024 - 200}
      centered
    >
      {QUERY_BUILDER_HELP_MODAL_CONTENT}
    </Modal>
  );

  const filterHelpModal = (
    <Modal
      opened={openedFilterHelpModal}
      onClose={closeFilterHelpModal}
      title={<Title order={4}>Filter help</Title>}
      size={width <= 1024 ? 'auto' : 1024 - 200}
      centered
    >
      {FILTER_HELP_MODAL_CONTENT}
    </Modal>
  );

  const sortHelpModal = (
    <Modal
      opened={openedSortHelpModal}
      onClose={closeSortHelpModal}
      title={<Title order={4}>Sort help</Title>}
      size={width <= 1024 ? 'auto' : 1024 - 200}
      centered
    >
      {SORT_HELP_MODAL_CONTENT}
    </Modal>
  );

  const projectionHelpModal = (
    <Modal
      opened={openedProjectionHelpModal}
      onClose={closeProjectionHelpModal}
      title={<Title order={4}>Projection help</Title>}
      size={width <= 1024 ? 'auto' : 1024 - 200}
      centered
    >
      {PROJECTION_HELP_MODAL_CONTENT}
    </Modal>
  );

  useEffect(() => {
    logState({
      state: queryBuilderState,
      groupLabel: 'queryBuilderState',
    });
  }, [queryBuilderState]);

  return (
    <Group>
      {displayQueryBuilderComponent}
      {queryBuilderHelpModal}
      {filterHelpModal}
      {projectionHelpModal}
      {sortHelpModal}
    </Group>
  );
}

export { QueryBuilder };
