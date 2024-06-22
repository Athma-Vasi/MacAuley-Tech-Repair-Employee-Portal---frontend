import React from "react";
import { queryReducer } from "./reducers";
import { createInitialQueryState } from "./state";
import { QueryProps } from "./types";
import { createQueryInputsData } from "./utils";
import { QueryFilter, QueryFilterDispatch } from "./QueryFilter";
import { QueryAction, queryAction } from "./actions";
import { Accordion, Stack, Text } from "@mantine/core";
import { QuerySearch, QuerySearchDispatch, SearchChainDispatch } from "./QuerySearch";
import { TbChevronDown } from "react-icons/tb";
import { QueryProjection, QueryProjectionDispatch } from "./QueryProjection";

function Query({
  collectionName,
  // invalidValueAction,
  // parentDispatch,
  stepperPages,
  // validValueAction,
  isProjectionDisabled = false,
}: QueryProps) {
  const {
    fieldNamesOperatorsTypesMap,
    filterFieldSelectInputData,
    projectionCheckboxData,
    searchFieldSelectData,
    selectInputsDataMap,
    sortFieldSelectData,
    validatedInputsKeyMap,
  } = createQueryInputsData(stepperPages);

  const [queryState, queryDispatch] = React.useReducer(
    queryReducer,
    createInitialQueryState(projectionCheckboxData, searchFieldSelectData)
  );

  const {
    filterField,
    filterOperator,
    filterOperatorSelectData,
    filterChain,
    filterValue,
    generalSearchExclusionValue,
    generalSearchInclusionValue,
    isError,
    isFilterOpened,
    isGeneralSearchCaseSensitive,
    isProjectionOpened,
    isQueryOpened,
    isSearchDisabled,
    isSearchOpened,
    isSortOpened,
    limitPerPage,
    projectedFieldsSet,
    projectionFields,
    searchField,
    searchChain,
    searchValue,
    selectedFieldsSet,
    sortDirection,
    sortField,
    sortChain,
  } = queryState;

  console.group("Query");
  console.log("queryState", queryState);
  console.log("stepperPages", stepperPages);
  console.log("fieldNamesOperatorsTypesMap", fieldNamesOperatorsTypesMap);
  console.log("filterFieldSelectInputData", filterFieldSelectInputData);
  console.log("projectionCheckboxData", projectionCheckboxData);
  console.log("searchFieldSelectData", searchFieldSelectData);
  console.log("selectInputsDataMap", selectInputsDataMap);
  console.log("sortFieldSelectData", sortFieldSelectData);
  console.log("validatedInputsKeyMap", validatedInputsKeyMap);
  console.groupEnd();

  const queryFilter = (
    <QueryFilter
      collectionName={collectionName}
      fieldNamesOperatorsTypesMap={fieldNamesOperatorsTypesMap}
      filterChain={filterChain}
      filterField={filterField}
      filterFieldSelectInputData={filterFieldSelectInputData}
      filterOperator={filterOperator}
      filterValue={filterValue}
      projectedFieldsSet={projectedFieldsSet}
      queryAction={queryAction}
      selectInputsDataMap={selectInputsDataMap}
      validatedInputsKeyMap={validatedInputsKeyMap}
      filterChainDispatch={queryDispatch}
      queryFilterDispatch={queryDispatch as QueryFilterDispatch}
    />
  );

  const querySearch = (
    <QuerySearch
      collectionName={collectionName}
      queryAction={queryAction}
      querySearchDispatch={queryDispatch as QuerySearchDispatch}
      searchChain={searchChain}
      searchChainDispatch={queryDispatch as SearchChainDispatch}
      searchField={searchField}
      searchFieldSelectData={searchFieldSelectData}
      searchValue={searchValue}
      validatedInputsKeyMap={validatedInputsKeyMap}
    />
  );

  /**
   *  <Accordion chevron={<TbChevronDown />}>
      <Accordion.Item value="Search Chain">
        <Accordion.Control disabled={searchChain.length === 0}>
          <Text size="lg">Search Chain</Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <Text size="md">{`Select ${collectionName} where:`}</Text>
            <Timeline active={Number.MAX_SAFE_INTEGER}>{searchChainElements}</Timeline>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
   */

  const queryProjectionAccordion = (
    <Accordion chevron={<TbChevronDown />}>
      <Accordion.Item value="Projection">
        <Accordion.Control
          disabled={isProjectionDisabled || projectionCheckboxData.length === 0}
        >
          <Text size="lg">Projection</Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <QueryProjection
              parentDispatch={queryDispatch as any}
              projectionCheckboxData={projectionCheckboxData}
              projectionFields={projectionFields}
              queryAction={queryAction}
            />
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  return (
    <Stack>
      {queryFilter}
      {queryProjectionAccordion}
      {querySearch}
    </Stack>
  );
}

export { Query };
