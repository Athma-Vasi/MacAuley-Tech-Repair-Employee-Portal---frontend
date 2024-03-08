import {
  Accordion,
  Center,
  Divider,
  Flex,
  Group,
  Modal,
  SegmentedControl,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, useEffect, useReducer } from "react";
import { RxLinkBreak2 } from "react-icons/rx";
import {
  TbArrowDown,
  TbChevronDown,
  TbClearAll,
  TbLink,
  TbPlus,
  TbQuestionMark,
  TbTrash,
  TbUpload,
} from "react-icons/tb";

import { COLORS_SWATCHES } from "../../constants/data";
import { NOTE_TEXT_REGEX, SERIAL_ID_REGEX } from "../../constants/regex";
import { useGlobalState } from "../../hooks";
import {
  AccessibleErrorValidTextElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleButtonElements,
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleDateTimeElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from "../../jsxCreators";
import { CheckboxInputData } from "../../types";
import {
  replaceLastCommaWithAnd,
  returnSerialIdValidationText,
  returnThemeColors,
} from "../../utils";
import { TimelineBuilder } from "../timelineBuilder";
import {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
} from "../wrappers";
import {
  ORDINAL_TERMS,
  QUERY_BUILDER_CASE_SENSITIVITY_OPTIONS,
  QUERY_BUILDER_FILTER_OPERATORS,
  QUERY_BUILDER_SORT_OPERATORS,
} from "./constants";
import {
  initialQueryBuilderState,
  queryBuilderAction,
  queryBuilderReducer,
} from "./state";
import { ComponentQueryData, QueryBuilderProps, QueryValueTypes } from "./types";
import {
  FILTER_HELP_MODAL_CONTENT,
  GENERAL_SEARCH_HELP_MODAL_CONTENT,
  generateFilterChainStatement,
  PROJECTION_HELP_MODAL_CONTENT,
  QUERY_BUILDER_HELP_MODAL_CONTENT,
  SEARCH_CHAIN_HELP_MODAL_CONTENT,
  SORT_HELP_MODAL_CONTENT,
} from "./utils";

function QueryBuilder({
  componentQueryData,
  collectionName,
  disableProjection = false,
  setQueryBuilderString,
  queryBuilderStringDispatch,
  queryValuesArrayDispatch,
}: QueryBuilderProps) {
  const [queryBuilderState, queryBuilderDispatch] = useReducer(
    queryBuilderReducer,
    initialQueryBuilderState
  );
  const {
    // filter section
    filterSelectData,
    currentFilterField,
    currentFilterOperator,
    currentFilterValue,
    isCurrentFilterValueValid,
    isCurrentFilterValueFocused,
    filterOperatorSelectData,
    filterStatementsQueue,

    // search section
    searchSelectData,
    currentSearchField,
    currentSearchValue,
    isCurrentSearchValueValid,
    isCurrentSearchValueFocused,
    searchStatementsQueue,

    // general search section
    isGeneralSearchCaseSensitive,
    // inclusion
    generalSearchInclusionValue,
    isGeneralSearchInclusionValueValid,
    isGeneralSearchInclusionValueFocused,
    // exclusion
    generalSearchExclusionValue,
    isGeneralSearchExclusionValueValid,
    isGeneralSearchExclusionValueFocused,

    // sort section
    sortSelectData,
    currentSortField,
    currentSortDirection,
    sortStatementsQueue,

    // projection section
    projectionArray,
    projectionCheckboxData,
    selectedFieldsSet,
    projectedFieldsSet,
    queryString,
    labelValueTypesMap,
    isQueryBuilderOpened,
    isFilterOpened,
    isSearchOpened,
    isSortOpened,
    isProjectionOpened,
  } = queryBuilderState;
  const {
    globalState: { width, rowGap, padding, themeObject },
  } = useGlobalState();

  const [openedQueryHelpModal, { open: openQueryHelpModal, close: closeQueryHelpModal }] =
    useDisclosure(false);
  const [
    openedFilterHelpModal,
    { open: openFilterHelpModal, close: closeFilterHelpModal },
  ] = useDisclosure(false);
  const [
    openedSearchChainHelpModal,
    { open: openSearchChainHelpModal, close: closeSearchChainHelpModal },
  ] = useDisclosure(false);
  const [
    openedGeneralSearchHelpModal,
    { open: openGeneralSearchHelpModal, close: closeGeneralSearchHelpModal },
  ] = useDisclosure(false);
  const [openedSortHelpModal, { open: openSortHelpModal, close: closeSortHelpModal }] =
    useDisclosure(false);
  const [
    openedProjectionHelpModal,
    { open: openProjectionHelpModal, close: closeProjectionHelpModal },
  ] = useDisclosure(false);

  useEffect(() => {
    if (!componentQueryData.length) {
      return;
    }
    // loop through componentQueryData and assign to both filter select data or sort select data, checkbox data, and labelValueTypesMap
    // used to populate and validate values of subsection inputs inside query builder

    const [
      filterSelectData,
      searchSelectData,
      sortSelectData,
      projectionCheckboxData,
      valueTypeObjects,
    ] = componentQueryData.reduce(
      (acc, curr: ComponentQueryData) => {
        const [
          filterSelectDataAcc,
          searchSelectDataAcc,
          sortSelectDataAcc,
          projectionCheckboxDataAcc,
          valueTypeObjectsAcc,
        ] = acc;

        const {
          label,
          value,
          inputKind,
          selectData,
          booleanData,
          regex = NOTE_TEXT_REGEX, // most permissive regex (superset that allows most characters)
          regexValidationFn,
        } = curr;

        // selectData (string[]) cannot be sorted, the rest(number, boolean, date) can be sorted and filtered
        if (inputKind === "selectInput" || inputKind === "booleanInput") {
          filterSelectDataAcc.push(label);
        } else if (inputKind === "textInput") {
          searchSelectDataAcc.push(label);
        } else if (
          inputKind === "dateInput" ||
          inputKind === "timeInput" ||
          inputKind === "numberInput"
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
          : valueTypeObjectsAcc.set(label, {
              value,
              inputKind,
              regex,
              regexValidationFn,
            });

        return acc;
      },
      [
        [] as string[],
        [] as string[],
        [] as string[],
        [] as CheckboxInputData,
        new Map<string, QueryValueTypes>(),
      ]
    );

    queryBuilderDispatch({
      type: queryBuilderAction.setFilterSelectData,
      payload: filterSelectData,
    });
    queryBuilderDispatch({
      type: queryBuilderAction.setSearchSelectData,
      payload: searchSelectData,
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
    if (!labelValueTypesMap.size) {
      return;
    }

    // find the corresponding regex of the current filter field
    const currentFilterFieldRegex =
      labelValueTypesMap.get(currentFilterField)?.regex ?? NOTE_TEXT_REGEX;

    const isValid = currentFilterFieldRegex.test(currentFilterValue);

    queryBuilderDispatch({
      type: queryBuilderAction.setIsCurrentFilterValueValid,
      payload: isValid,
    });
  }, [currentFilterField, currentFilterValue, labelValueTypesMap]);

  // set appropriate filter operators
  useEffect(() => {
    if (!labelValueTypesMap.size) {
      return;
    }

    const currentInputKind = labelValueTypesMap.get(currentFilterField)?.inputKind;
    const filterOperatorData =
      currentInputKind === "selectInput" || currentInputKind === "booleanInput"
        ? ["in"]
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
  }, [currentFilterField, labelValueTypesMap]);

  // sets initial filter value
  useEffect(() => {
    if (!labelValueTypesMap.size) {
      return;
    }

    const initialCreatedDateValue = new Date().toISOString().slice(0, 10);

    queryBuilderDispatch({
      type: queryBuilderAction.setCurrentFilterValue,
      payload: initialCreatedDateValue,
    });
  }, [labelValueTypesMap]);

  // prevents stale state update whenever filter term changes
  useEffect(() => {
    if (!labelValueTypesMap.size) {
      return;
    }

    const labelValueObject: QueryValueTypes | undefined =
      labelValueTypesMap.get(currentFilterField);

    if (!labelValueObject) {
      return;
    }

    const { inputKind, selectData, booleanData } = labelValueObject;
    switch (inputKind) {
      case "selectInput": {
        queryBuilderDispatch({
          type: queryBuilderAction.setCurrentFilterValue,
          payload: selectData?.[0] ?? "",
        });
        break;
      }
      case "booleanInput": {
        queryBuilderDispatch({
          type: queryBuilderAction.setCurrentFilterValue,
          payload: `${booleanData?.[0] ?? false}`,
        });
        break;
      }
      case "dateInput": {
        queryBuilderDispatch({
          type: queryBuilderAction.setCurrentFilterValue,
          payload: new Date().toISOString().slice(0, 10),
        });
        break;
      }
      case "timeInput": {
        queryBuilderDispatch({
          type: queryBuilderAction.setCurrentFilterValue,
          payload: "00:00",
        });
        break;
      }
      case "numberInput": {
        queryBuilderDispatch({
          type: queryBuilderAction.setCurrentFilterValue,
          payload: "0",
        });
        break;
      }
      case "textInput": {
        queryBuilderDispatch({
          type: queryBuilderAction.setCurrentSearchValue,
          payload: "",
        });
        break;
      }
      default:
        break;
    }
  }, [currentFilterField, labelValueTypesMap]);

  // validate search value on change
  useEffect(() => {
    // find the corresponding regex of the current search field
    const currentSearchFieldRegex =
      labelValueTypesMap.get(currentSearchField)?.regex ?? NOTE_TEXT_REGEX;

    const isValid = currentSearchFieldRegex.test(currentSearchValue);

    queryBuilderDispatch({
      type: queryBuilderAction.setIsCurrentSearchValueValid,
      payload: isValid,
    });
  }, [currentSearchField, currentSearchValue, labelValueTypesMap]);

  // validate general search inclusion value on change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(generalSearchInclusionValue);

    queryBuilderDispatch({
      type: queryBuilderAction.setIsGeneralSearchInclusionValueValid,
      payload: isValid,
    });
  }, [generalSearchInclusionValue]);

  // validate general search exclusion value on change
  useEffect(() => {
    const isValid = SERIAL_ID_REGEX.test(generalSearchExclusionValue);

    queryBuilderDispatch({
      type: queryBuilderAction.setIsGeneralSearchExclusionValueValid,
      payload: isValid,
    });
  }, [generalSearchExclusionValue]);

  // set appropriate search field
  useEffect(() => {
    if (!labelValueTypesMap.size) {
      return;
    }

    const searchSelectData = Array.from(labelValueTypesMap).reduce(
      (acc: string[], [label, obj]) => {
        const { inputKind } = obj;
        if (inputKind === "textInput") {
          acc.push(label);
        }
        return acc;
      },
      []
    );

    queryBuilderDispatch({
      type: queryBuilderAction.setSearchSelectData,
      payload: searchSelectData,
    });

    // set current search field
    queryBuilderDispatch({
      type: queryBuilderAction.setCurrentSearchField,
      payload: searchSelectData[0],
    });
  }, []);

  // whenever general search values change, clear search statements values, queue
  useEffect(() => {
    searchStatementsQueue.forEach((_, index) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setSearchStatementsQueue,
        payload: {
          index,
          value: ["", ""],
        },
      });
    });

    queryBuilderDispatch({
      type: queryBuilderAction.setCurrentSearchValue,
      payload: "",
    });

    // clear projection exclusion set
    queryBuilderDispatch({
      type: queryBuilderAction.setSelectedFieldsSet,
      payload: {
        calledFrom: "search",
      },
    });
  }, [generalSearchInclusionValue, generalSearchExclusionValue]);

  // whenever search chain values change, clear general search inclusion, exclusion values
  useEffect(() => {
    queryBuilderDispatch({
      type: queryBuilderAction.setGeneralSearchInclusionValue,
      payload: "",
    });
    queryBuilderDispatch({
      type: queryBuilderAction.setGeneralSearchExclusionValue,
      payload: "",
    });
  }, [searchStatementsQueue, currentSearchValue]);

  // build query string on every filter, search, sort, or projection arrays change
  useEffect(() => {
    if (!labelValueTypesMap.size) {
      return;
    }

    const generalSearchValue =
      generalSearchInclusionValue.length || generalSearchExclusionValue.length
        ? `${generalSearchInclusionValue.trim()}${
            generalSearchExclusionValue.length ? " -" : ""
          }${generalSearchExclusionValue.trim().split(" ").join(" -")}`
        : "";

    // build the query
    queryBuilderDispatch({
      type: queryBuilderAction.buildQueryString,
      payload: {
        labelValueTypesMap,
        filterStatementsQueue,
        generalSearchValue,
        isGeneralSearchCaseSensitive,
        searchStatementsQueue,
        sortStatementsQueue,
        projectionArray,
      },
    });
  }, [
    filterStatementsQueue,
    labelValueTypesMap,
    searchStatementsQueue,
    sortStatementsQueue,
    projectionArray,
    generalSearchInclusionValue,
    generalSearchExclusionValue,
    isGeneralSearchCaseSensitive,
  ]);

  // ----------------- accessibility texts -----------------  //
  const currentInputKind = labelValueTypesMap.get(currentFilterField)?.inputKind;

  const filterValueRegexValidationText =
    labelValueTypesMap.get(currentFilterField)?.regexValidationFn?.({
      content: currentFilterValue,
      contentKind: currentFilterField,
    }) ?? "";

  const [filterValueErrorText, filterValueValidText] = AccessibleErrorValidTextElements({
    inputElementKind: currentFilterField,
    inputText: currentFilterValue,
    isInputTextFocused: isCurrentFilterValueFocused,
    isValidInputText: isCurrentFilterValueValid,
    regexValidationText: filterValueRegexValidationText,
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
    .join(", ");

  const [projectionCheckboxInputSelectedText, projectionCheckboxInputDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: projectionArray.length > 0,
      semanticName: "exclusion fields",
      deselectedDescription: "All fields will be returned",
      selectedDescription:
        projectionArray.length === labelValueTypesMap.size
          ? "All fields have been selected for exclusion. Nothing to query!"
          : `The following fields will not be returned: ${replaceLastCommaWithAnd(
              projectionExclusionFields
            )}`,
      theme: "muted",
    });
  // ----------------- //

  const {
    generalColors: { themeColorShade, grayColorShade, grayBorderShade },
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
        semanticDescription: `Delete ${term} ${operator} ${value}`,
        semanticName: "delete filter",
        buttonOnClick: () => {
          queryBuilderDispatch({
            type: queryBuilderAction.setFilterStatementsQueue,
            payload: {
              index,
              value: ["", "", ""],
            },
          });
          // remove field from selected fields set
          queryBuilderDispatch({
            type: queryBuilderAction.setSelectedFieldsSet,
            payload: {
              calledFrom: "filter",
            },
          });

          // send query value up to DisplayResource
          if (!queryValuesArrayDispatch) {
            return;
          }
          queryValuesArrayDispatch({
            type: "setQueryValuesArray",
            payload: {
              kind: "remove",
              value: value,
            },
          });
        },
      };

      const [createdDeleteFilterButton] = returnAccessibleButtonElements([
        deleteFilterButtonCreatorInfo,
      ]);

      const displayDeleteFilterButton = (
        <Tooltip
          label={`Delete: ${
            operator === "in"
              ? `${term} that contain ${value}.`
              : `${term} that are ${operator} ${value}.`
          }`}
        >
          <Center>{createdDeleteFilterButton}</Center>
        </Tooltip>
      );

      const dividerLabel = (
        <Group>
          <TbLink color={grayColorShade} size={16} />
          <Text color={grayColorShade}>AND</Text>
          <TbArrowDown color={grayColorShade} size={16} />
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
              <Divider labelPosition="left" label={displayStatement} w="87%" size="sm" />
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
    label: "Field",
    description: `Select a field to filter ${collectionName} by`,
    describedBy:
      filterStatementsQueue.length > 0
        ? "filter-statements-deselected"
        : "filter-statements-selected",
    value: currentFilterField,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentFilterField,
        payload: event.currentTarget.value,
      });

      // set the filter value to first select data value, as the stale value is present by default
      const firstSelectDataValue =
        labelValueTypesMap.get(event.currentTarget.value)?.selectData?.[0] || "";
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentFilterValue,
        payload: firstSelectDataValue,
      });
    },
  };

  const filterOperatorsSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: filterOperatorSelectData,
    label: "Operator",
    description: `${
      currentFilterField === ""
        ? "Please select a field"
        : currentInputKind === "selectInput" || currentInputKind === "booleanInput"
        ? 'Only "in" is available for hardcoded data'
        : `Select an operator for ${currentFilterField}`
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
    label: "Value",
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
    inputKind: "date",
    dateKind: "full date",
    inputText: currentFilterValue,
    isValidInputText: isCurrentFilterValueValid,
    placeholder: "Enter a value",
    semanticName: currentFilterField,
  };

  const filterValueTimeInputCreatorInfo: AccessibleDateTimeInputCreatorInfo = {
    label: "Value",
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
    inputKind: "time",
    inputText: currentFilterValue,
    isValidInputText: isCurrentFilterValueValid,
    placeholder: "Enter time in 24-hour format",
    semanticName: currentFilterField,
  };

  const filterValueNumberInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    label: "Value",
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
    placeholder: `Enter a value for ${currentFilterField}`,
    semanticName: currentFilterField,
  };

  const filterValueSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data:
      labelValueTypesMap.get(currentFilterField)?.selectData ||
      // select input data type is (string|SelectItem)[], does not accept boolean[]
      labelValueTypesMap.get(currentFilterField)?.booleanData?.map((bool) => `${bool}`) ||
      [],
    label: "Value",
    description: `Select a value for ${currentFilterField}`,
    value: currentFilterValue,
    onChange: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentFilterValue,
        payload: event.currentTarget.value,
      });
    },
  };

  const addNewFilterButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Add",
    semanticDescription:
      "Add new filter statement that can be chained with previous statements",
    semanticName: "add new filter",
    leftIcon: <TbPlus />,
    buttonOnClick: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setFilterStatementsQueue,
        payload: {
          index: filterStatementsQueue.length,
          value: [currentFilterField, currentFilterOperator, currentFilterValue],
        },
      });
      // add field to selected fields set
      queryBuilderDispatch({
        type: queryBuilderAction.setSelectedFieldsSet,
        payload: {
          calledFrom: "filter",
        },
      });

      // if filter operator is not 'in', then their corresponding fields do not have a text index and are not searchable, as they may be numbers, dates, etc.
      if (!queryValuesArrayDispatch || currentFilterOperator !== "in") {
        return;
      }
      queryValuesArrayDispatch({
        type: "setQueryValuesArray",
        payload: {
          kind: "add",
          value: currentFilterValue,
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
      semanticName: "exclusion fields",
      label: "Fields",
      value: projectionArray,
    };
  // ----------------- //

  // ----------------- search operation -----------------  //
  const filteredSearchSelectData = searchSelectData.filter(
    (term) => !projectedFieldsSet.has(term)
  );
  const searchSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: filteredSearchSelectData,
    label: "Field",
    description: `Select a field to search ${collectionName} by`,
    value: currentSearchField,
    onChange: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentSearchField,
        payload: event.currentTarget.value,
      });
    },
  };

  const searchInputRegexValidationText =
    labelValueTypesMap.get(currentSearchField)?.regexValidationFn?.({
      content: currentSearchValue,
      contentKind: currentSearchField,
    }) ?? "";

  const [searchTextInputErrorText, searchTextInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: currentSearchField,
      inputText: currentSearchValue,
      isValidInputText: isCurrentSearchValueValid,
      isInputTextFocused: isCurrentSearchValueFocused,
      regexValidationText: searchInputRegexValidationText,
    });

  const [
    generalSearchInclusionTextInputErrorText,
    generalSearchInclusionTextInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: "general search inclusion",
    inputText: generalSearchInclusionValue,
    isInputTextFocused: isGeneralSearchInclusionValueFocused,
    isValidInputText: isGeneralSearchInclusionValueValid,
    regexValidationText: returnSerialIdValidationText({
      content: generalSearchInclusionValue,
      contentKind: "general search",
    }),
  });

  const [
    generalSearchExclusionTextInputErrorText,
    generalSearchExclusionTextInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: "general search exclusion",
    inputText: generalSearchExclusionValue,
    isInputTextFocused: isGeneralSearchExclusionValueFocused,
    isValidInputText: isGeneralSearchExclusionValueValid,
    regexValidationText: returnSerialIdValidationText({
      content: generalSearchExclusionValue,
      contentKind: "general search",
    }),
  });

  const toggleCaseSensitivitySegmentedControl = (
    <SegmentedControl
      data={QUERY_BUILDER_CASE_SENSITIVITY_OPTIONS}
      value={isGeneralSearchCaseSensitive ? "sensitive" : "insensitive"}
      onChange={(value) => {
        queryBuilderDispatch({
          type: queryBuilderAction.setIsGeneralSearchCaseSensitive,
          payload: value === "sensitive",
        });
      }}
    />
  );

  const searchTextAreaInputCreatorInfo: AccessibleTextAreaInputCreatorInfo = {
    // textAreaWidth: 330,
    description: {
      error: searchTextInputErrorText,
      valid: searchTextInputValidText,
    },
    inputText: currentSearchValue,
    isValidInputText: isCurrentSearchValueValid,
    label: "Value",
    minLength: 2,
    maxLength: 2000,
    onBlur: () => {
      queryBuilderDispatch({
        type: queryBuilderAction.setIsCurrentSearchValueFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentSearchValue,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      queryBuilderDispatch({
        type: queryBuilderAction.setIsCurrentSearchValueFocused,
        payload: true,
      });
    },
    placeholder: "Enter search term",
    required: false,
    semanticName: currentSearchField,
  };

  const generalSearchInclusionTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: generalSearchInclusionTextInputErrorText,
      valid: generalSearchInclusionTextInputValidText,
    },
    inputText: generalSearchInclusionValue,
    isValidInputText: isGeneralSearchInclusionValueValid,
    label: "Include",
    minLength: 1,
    maxLength: 100,
    onBlur: () => {
      queryBuilderDispatch({
        type: queryBuilderAction.setIsGeneralSearchInclusionValueFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setGeneralSearchInclusionValue,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      queryBuilderDispatch({
        type: queryBuilderAction.setIsGeneralSearchInclusionValueFocused,
        payload: true,
      });
    },
    placeholder: "Enter search term",
    required: false,
    semanticName: "general search inclusion",
  };

  const generalSearchExclusionTextInputCreatorInfo: AccessibleTextInputCreatorInfo = {
    description: {
      error: generalSearchExclusionTextInputErrorText,
      valid: generalSearchExclusionTextInputValidText,
    },
    inputText: generalSearchExclusionValue,
    isValidInputText: isGeneralSearchExclusionValueValid,
    label: "Exclude",
    minLength: 1,
    maxLength: 100,
    onBlur: () => {
      queryBuilderDispatch({
        type: queryBuilderAction.setIsGeneralSearchExclusionValueFocused,
        payload: false,
      });
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setGeneralSearchExclusionValue,
        payload: event.currentTarget.value,
      });
    },
    onFocus: () => {
      queryBuilderDispatch({
        type: queryBuilderAction.setIsGeneralSearchExclusionValueFocused,
        payload: true,
      });
    },
    placeholder: "Enter search term",
    required: false,
    semanticName: "general search exclusion",
  };

  const addNewSearchChainButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Add",
    buttonDisabled: !isCurrentSearchValueValid,
    semanticDescription:
      "Add new search statement that can be chained with previous statements",
    semanticName: "add new search",
    leftIcon: <TbPlus />,
    buttonOnClick: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setSearchStatementsQueue,
        payload: {
          index: searchStatementsQueue.length,
          value: [currentSearchField, currentSearchValue],
        },
      });
      // add fields to selected fields set
      queryBuilderDispatch({
        type: queryBuilderAction.setSelectedFieldsSet,
        payload: {
          calledFrom: "search",
        },
      });
      queryBuilderDispatch({
        type: queryBuilderAction.setIsCurrentSearchValueFocused,
        payload: false,
      });

      // send search value up to DisplayResource
      if (!queryValuesArrayDispatch) {
        return;
      }
      queryValuesArrayDispatch({
        type: "setQueryValuesArray",
        payload: {
          kind: "add",
          value: currentSearchValue,
        },
      });
    },
  };

  const createdSearchStatementsWithDeleteButton = searchStatementsQueue.map(
    ([field, value], index) => {
      const statement = `Search ${field} for ${value}. `;
      const displayStatement = <Text>{statement}</Text>;

      const deleteSearchButtonCreatorInfo: AccessibleButtonCreatorInfo = {
        buttonLabel: <TbTrash />,
        semanticDescription: `Delete ${field} for ${value}`,
        semanticName: "delete search",
        // leftIcon: <TbTrash />,
        buttonOnClick: (event) => {
          queryBuilderDispatch({
            type: queryBuilderAction.setSearchStatementsQueue,
            payload: {
              index,
              value: ["", ""],
            },
          });
          // remove field from selected fields set
          queryBuilderDispatch({
            type: queryBuilderAction.setSelectedFieldsSet,
            payload: {
              calledFrom: "search",
            },
          });

          // send query value up to DisplayResource
          if (!queryValuesArrayDispatch) {
            return;
          }
          queryValuesArrayDispatch({
            type: "setQueryValuesArray",
            payload: {
              kind: "remove",
              value: value,
            },
          });
        },
      };

      const [createdDeleteSearchButton] = returnAccessibleButtonElements([
        deleteSearchButtonCreatorInfo,
      ]);

      const displayDeleteSearchButton = (
        <Tooltip label={`Delete: ${field} for ${value}`}>
          <Group>{createdDeleteSearchButton}</Group>
        </Tooltip>
      );

      const nextField = searchStatementsQueue[index + 1]?.[0] ?? "";
      const logicalOperator = field === nextField ? "OR" : "AND";

      const dividerLabel = (
        <Group>
          <TbLink color={grayColorShade} size={16} />
          <Text color={grayColorShade}>{logicalOperator}</Text>
          <TbArrowDown color={grayColorShade} size={16} />
        </Group>
      );

      return (
        <Stack w="100%">
          <Flex
            key={`search-statement-${index}`}
            align="center"
            justify="space-between"
            w="100%"
            columnGap={rowGap}
          >
            <Group position="apart" w="100%">
              {displayStatement}
              {displayDeleteSearchButton}
            </Group>
          </Flex>
          {index === searchStatementsQueue.length - 1 ? null : (
            <Divider size="sm" label={dividerLabel} labelPosition="center" />
          )}
        </Stack>
      );
    }
  );

  // ----------------- //

  // ----------------- sort operation -----------------  //
  const filteredSortSelectData = sortSelectData.filter(
    (term) => !projectedFieldsSet.has(term)
  );
  const sortSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: filteredSortSelectData,
    label: "Field",
    description: `Select a field to sort ${collectionName} by`,
    value: currentSortField,
    onChange: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentSortField,
        payload: event.currentTarget.value,
      });
      // add field to selected fields set
      queryBuilderDispatch({
        type: queryBuilderAction.setSelectedFieldsSet,
        payload: {
          calledFrom: "sort",
        },
      });
    },
  };

  const sortDirectionSelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: QUERY_BUILDER_SORT_OPERATORS,
    label: "Direction",
    description:
      currentSortField === ""
        ? "Please select a sort field"
        : `Select a sort direction for ${currentSortField}`,
    value: currentSortDirection,
    onChange: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setCurrentSortDirection,
        payload: event.currentTarget.value,
      });
    },
  };

  const addNewSortButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Add",
    semanticDescription:
      "Add new sort statement that can be chained with previous statements",
    semanticName: "add new sort",
    leftIcon: <TbPlus />,
    buttonOnClick: (event) => {
      queryBuilderDispatch({
        type: queryBuilderAction.setSortStatementsQueue,
        payload: {
          index: sortStatementsQueue.length,
          value: [currentSortField, currentSortDirection],
        },
      });
      // add field to selected fields set
      queryBuilderDispatch({
        type: queryBuilderAction.setSelectedFieldsSet,
        payload: {
          calledFrom: "sort",
        },
      });
    },
  };

  const createdSortStatementsWithDeleteButton = sortStatementsQueue.map(
    ([term, direction], index) => {
      const statement = `Sort ${term} in ${direction} order. `;
      const displayStatement = <Text>{statement}</Text>;

      const deleteSortButtonCreatorInfo: AccessibleButtonCreatorInfo = {
        buttonLabel: <TbTrash />,
        semanticDescription: `Delete ${term} in ${direction} order`,
        semanticName: "delete sort",
        // leftIcon: <TbTrash />,
        buttonOnClick: (event) => {
          queryBuilderDispatch({
            type: queryBuilderAction.setSortStatementsQueue,
            payload: {
              index,
              value: ["", ""],
            },
          });
          // remove field from selected fields set
          queryBuilderDispatch({
            type: queryBuilderAction.setSelectedFieldsSet,
            payload: {
              calledFrom: "sort",
            },
          });
        },
      };

      const [createdDeleteSortButton] = returnAccessibleButtonElements([
        deleteSortButtonCreatorInfo,
      ]);

      const displayDeleteSortButton = (
        <Tooltip label={`Delete: ${term} in ${direction} order`}>
          <Group>{createdDeleteSortButton}</Group>
        </Tooltip>
      );

      const dividerLabel = (
        <Group>
          <RxLinkBreak2 color={grayColorShade} size={16} />
          <Text color={grayColorShade}>
            {`${ORDINAL_TERMS[index].charAt(0).toUpperCase()}${ORDINAL_TERMS[index].slice(
              1
            )}`}{" "}
            tiebreaker
          </Text>
          <TbArrowDown color={grayColorShade} size={16} />
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
  const submitQueryToParentComponentButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Submit",
    buttonDisabled:
      !isGeneralSearchInclusionValueValid && generalSearchInclusionValue.length > 0,
    semanticDescription: `Submit query to ${collectionName}`,
    semanticName: "submit query",
    buttonOnClick: () => {
      queryBuilderStringDispatch({
        type: setQueryBuilderString,
        payload: queryString,
      });

      // for query values array highlighting
      if (!queryValuesArrayDispatch || !generalSearchInclusionValue) {
        return;
      }
      queryValuesArrayDispatch({
        type: "setQueryValuesArray",
        payload: {
          kind: "add",
          value: generalSearchInclusionValue,
        },
      });
    },
    leftIcon: <TbUpload />,
  };

  const clearQueryButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: "Clear",
    semanticDescription: `Clear query to ${collectionName}`,
    semanticName: "clear query",
    buttonOnClick: () => {
      queryBuilderDispatch({
        type: queryBuilderAction.setClearAllQueryData,
        payload: "",
      });
      queryBuilderStringDispatch({
        type: setQueryBuilderString,
        payload: queryString,
      });

      if (!queryValuesArrayDispatch) {
        return;
      }
      queryValuesArrayDispatch({
        type: "setQueryValuesArray",
        payload: {
          kind: "clear",
          value: "",
        },
      });
    },
    leftIcon: <TbClearAll />,
  };

  const queryBuilderHelpButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: <TbQuestionMark />,
    semanticDescription: "Open query help modal",
    semanticName: "query help",
    buttonOnClick: () => {
      openQueryHelpModal();
    },
  };

  const filterHelpButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: <TbQuestionMark />,
    semanticDescription: "Open filter help modal",
    semanticName: "filter help",
    buttonOnClick: () => {
      openFilterHelpModal();
    },
  };

  const generalSearchHelpButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: <TbQuestionMark />,
    semanticDescription: "Open general search help modal",
    semanticName: "general search help",
    buttonOnClick: () => {
      openGeneralSearchHelpModal();
    },
  };

  const searchChainHelpButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: <TbQuestionMark />,
    semanticDescription: "Open search help modal",
    semanticName: "search help",
    buttonOnClick: () => {
      openSearchChainHelpModal();
    },
  };

  const sortHelpButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: <TbQuestionMark />,
    semanticDescription: "Open sort help modal",
    semanticName: "sort help",
    buttonOnClick: () => {
      openSortHelpModal();
    },
  };

  const projectionHelpButtonCreatorInfo: AccessibleButtonCreatorInfo = {
    buttonLabel: <TbQuestionMark />,
    semanticDescription: "Open projection help modal",
    semanticName: "projection help",
    buttonOnClick: () => {
      openProjectionHelpModal();
    },
  };

  // ----------------- //
  // ----------------- create and display elements -----------------  //
  const [
    createdFilterSelectInput,
    createdFilterOperatorsSelectInput,
    createdSearchSelectInput,
    createdSortSelectInput,
    createdSortDirectionSelectInput,
  ] = returnAccessibleSelectInputElements([
    filterSelectInputCreatorInfo,
    filterOperatorsSelectInputCreatorInfo,
    searchSelectInputCreatorInfo,
    sortSelectInputCreatorInfo,
    sortDirectionSelectInputCreatorInfo,
  ]);

  const [
    createdAddNewFilterButton,
    createdAddNewSearchChainButton,
    createdAddNewSortButton,
    createdSubmitButton,
    createdClearButton,
    createdQueryBuilderHelpButton,
    createdFilterHelpButton,
    createdGeneralSearchHelpButton,
    createdSearchChainHelpButton,
    createdSortHelpButton,
    createdProjectionHelpButton,
  ] = returnAccessibleButtonElements([
    addNewFilterButtonCreatorInfo,
    addNewSearchChainButtonCreatorInfo,
    addNewSortButtonCreatorInfo,
    submitQueryToParentComponentButtonCreatorInfo,
    clearQueryButtonCreatorInfo,
    queryBuilderHelpButtonCreatorInfo,
    filterHelpButtonCreatorInfo,
    generalSearchHelpButtonCreatorInfo,
    searchChainHelpButtonCreatorInfo,
    sortHelpButtonCreatorInfo,
    projectionHelpButtonCreatorInfo,
  ]);

  const [createdSearchTextAreaInput] = returnAccessibleTextAreaInputElements([
    searchTextAreaInputCreatorInfo,
  ]);

  const [createdGeneralSearchInclusionTextInput, createdGeneralSearchExclusionTextInput] =
    returnAccessibleTextInputElements([
      generalSearchInclusionTextInputCreatorInfo,
      generalSearchExclusionTextInputCreatorInfo,
    ]);

  const [createdProjectionCheckboxGroupInput] =
    returnAccessibleCheckboxGroupInputsElements([
      projectionCheckboxGroupInputCreatorInfo,
    ]);

  const createdFilterValueInput =
    currentInputKind === "dateInput"
      ? returnAccessibleDateTimeElements([filterValueDateInputCreatorInfo])
      : currentInputKind === "timeInput"
      ? returnAccessibleDateTimeElements([filterValueTimeInputCreatorInfo])
      : currentInputKind === "numberInput"
      ? returnAccessibleTextInputElements([filterValueNumberInputCreatorInfo])
      : returnAccessibleSelectInputElements([filterValueSelectInputCreatorInfo]);

  const displayFilterChains = (
    <Stack w="100%">
      <TimelineBuilder
        timelines={{
          "filter chain": createdFilterStatementsWithDeleteButton,
        }}
      />
    </Stack>
  );

  const displaySearchChains = (
    <Stack w="100%">
      <TimelineBuilder
        timelines={{
          "search chain": createdSearchStatementsWithDeleteButton,
        }}
      />
    </Stack>
  );

  const displaySortChains = (
    <Stack w="100%">
      <TimelineBuilder
        timelines={{
          "sort chain": createdSortStatementsWithDeleteButton,
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
            <TbChevronDown color={isFilterOpened ? themeColorShade : grayColorShade} />
          }
          onChange={(value) => {
            queryBuilderDispatch({
              type: queryBuilderAction.toggleIsFilterOpened,
              payload: value as "Filter" | null,
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
                <Stack w="100%">
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

                  <Group w="100%" position="apart">
                    {createdFilterSelectInput}
                    {createdFilterOperatorsSelectInput}
                  </Group>
                  {createdFilterValueInput}
                </Stack>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}
    </Stack>
  );

  const displayProjectionSection = (
    <Stack w="100%">
      <Accordion
        w="100%"
        chevron={
          <TbChevronDown color={isProjectionOpened ? themeColorShade : grayColorShade} />
        }
        onChange={(value) => {
          queryBuilderDispatch({
            type: queryBuilderAction.toggleIsProjectionOpened,
            payload: value as "Projection" | null,
          });
        }}
      >
        <Accordion.Item value="Projection">
          <Accordion.Control disabled={disableProjection}>
            <Title order={5}>Projection</Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack w="100%">
              <Stack w="100%">
                <Group spacing={rowGap}>
                  <Title order={5}>Projection Exclusion</Title>
                  <Tooltip label="Projection help">
                    <Group>{createdProjectionHelpButton}</Group>
                  </Tooltip>
                </Group>
                {createdProjectionCheckboxGroupInput}
              </Stack>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );

  const displaySearchSection = (
    <Stack w="100%">
      {filteredSearchSelectData.length === 0 ? (
        <Text>No fields to search!</Text>
      ) : (
        <Accordion
          w="100%"
          chevron={
            <TbChevronDown color={isSearchOpened ? themeColorShade : grayColorShade} />
          }
          onChange={(value) => {
            queryBuilderDispatch({
              type: queryBuilderAction.toggleIsSearchOpened,
              payload: value as "Search" | null,
            });
          }}
        >
          <Accordion.Item value="Search">
            <Accordion.Control disabled={filteredSearchSelectData.length === 0}>
              <Title order={5}>Search</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack w="100%">
                {displaySearchChains}
                <Stack w="100%">
                  <Group w="100%" position="apart">
                    <Group spacing={rowGap}>
                      <Title order={5}>Build Search Chain</Title>
                      <Tooltip label="Search help">
                        <Group>{createdSearchChainHelpButton}</Group>
                      </Tooltip>
                    </Group>
                    {/* add new search button */}
                    <Tooltip label="Add a new search chain">
                      <Group>{createdAddNewSearchChainButton}</Group>
                    </Tooltip>
                  </Group>
                  <Group w="100%" position="apart" align="flex-start">
                    {createdSearchSelectInput}
                    {createdSearchTextAreaInput}
                  </Group>

                  {/* divider */}

                  <Divider
                    size="sm"
                    w="100%"
                    variant="dashed"
                    labelPosition="center"
                    color={grayBorderShade}
                  />

                  {/* general search section */}
                  <Group w="100%" position="apart">
                    <Group spacing={rowGap}>
                      <Title order={5}>General Search</Title>
                      <Tooltip label="General search help">
                        <Group>{createdGeneralSearchHelpButton}</Group>
                      </Tooltip>
                    </Group>
                    {/* case sensitivity toggle */}
                    <Group spacing={rowGap}>
                      <Title order={6}>Case</Title>
                      {toggleCaseSensitivitySegmentedControl}
                    </Group>
                  </Group>

                  {/* inclusion and exclusion */}
                  <Group w="100%" position="apart" align="baseline">
                    {createdGeneralSearchInclusionTextInput}
                    {createdGeneralSearchExclusionTextInput}
                  </Group>
                </Stack>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}
    </Stack>
  );

  const displaySortSection = (
    <Stack w="100%">
      {filteredSortSelectData.length === 0 ? (
        <Text>No fields to sort!</Text>
      ) : (
        <Accordion
          w="100%"
          chevron={
            <TbChevronDown color={isSortOpened ? themeColorShade : grayColorShade} />
          }
          onChange={(value) => {
            queryBuilderDispatch({
              type: queryBuilderAction.toggleIsSortOpened,
              payload: value as "Sort" | null,
            });
          }}
        >
          <Accordion.Item value="Sort">
            <Accordion.Control disabled={filteredSortSelectData.length === 0}>
              <Title order={5}>Sort</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack w="100%">
                {displaySortChains}
                <Stack w="100%">
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
                  <Group w="100%" position="apart">
                    {createdSortSelectInput}
                    {createdSortDirectionSelectInput}
                  </Group>
                </Stack>
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
      ? width * 0.93
      : width < 768 // for iPhones 6 - 15
      ? width - 40
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 225) * 0.8
      : 900 - 40;

  const displayQueryBuilderComponent = (
    <Stack
      w={queryBuilderWidth}
      py={padding}
      style={{ border: borderColor, borderRadius: 4 }}
    >
      <Stack w="100%">
        <Accordion
          w="100%"
          chevron={
            <TbChevronDown
              color={isQueryBuilderOpened ? themeColorShade : grayColorShade}
            />
          }
          onChange={(value) => {
            queryBuilderDispatch({
              type: queryBuilderAction.toggleIsQueryBuilderOpened,
              payload: value as "Query Builder" | null,
            });
          }}
        >
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
                {displayProjectionSection}
                {displaySearchSection}
                {displaySortSection}
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
    </Stack>
  );

  const queryBuilderHelpModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedQueryHelpModal}
      onClose={closeQueryHelpModal}
      size={width <= 1024 ? "auto" : 1024 - 200}
      title={<Title order={4}>Query help</Title>}
    >
      {QUERY_BUILDER_HELP_MODAL_CONTENT}
    </Modal>
  );

  const filterHelpModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedFilterHelpModal}
      onClose={closeFilterHelpModal}
      size={width <= 1024 ? "auto" : 1024 - 200}
      title={<Title order={4}>Filter help</Title>}
    >
      {FILTER_HELP_MODAL_CONTENT}
    </Modal>
  );

  const generalSearchHelpModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedGeneralSearchHelpModal}
      onClose={closeGeneralSearchHelpModal}
      size={width <= 1024 ? "auto" : 1024 - 200}
      title={<Title order={4}>General Search help</Title>}
    >
      {GENERAL_SEARCH_HELP_MODAL_CONTENT}
    </Modal>
  );

  const searchChainHelpModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedSearchChainHelpModal}
      onClose={closeSearchChainHelpModal}
      size={width <= 1024 ? "auto" : 1024 - 200}
      title={<Title order={4}>Search Chain help</Title>}
    >
      {SEARCH_CHAIN_HELP_MODAL_CONTENT}
    </Modal>
  );

  const sortHelpModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedSortHelpModal}
      onClose={closeSortHelpModal}
      size={width <= 1024 ? "auto" : 1024 - 200}
      title={<Title order={4}>Sort help</Title>}
    >
      {SORT_HELP_MODAL_CONTENT}
    </Modal>
  );

  const projectionHelpModal = (
    <Modal
      centered
      closeButtonProps={{ color: themeColorShade }}
      opened={openedProjectionHelpModal}
      onClose={closeProjectionHelpModal}
      size={width <= 1024 ? "auto" : 1024 - 200}
      title={<Title order={4}>Projection help</Title>}
    >
      {PROJECTION_HELP_MODAL_CONTENT}
    </Modal>
  );

  // useEffect(() => {
  //   logState({
  //     state: queryBuilderState,
  //     groupLabel: 'queryBuilderState',
  //   });
  // }, [queryBuilderState]);

  return (
    <Group>
      {displayQueryBuilderComponent}
      {queryBuilderHelpModal}
      {filterHelpModal}
      {generalSearchHelpModal}
      {searchChainHelpModal}
      {sortHelpModal}
      {projectionHelpModal}
    </Group>
  );
}

export { QueryBuilder };
