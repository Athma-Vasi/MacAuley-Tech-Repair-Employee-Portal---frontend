import React from "react";
import { queryReducer } from "./reducers";
import { createInitialQueryState } from "./state";
import { QueryChainKind, QueryProps } from "./types";
import { createQueryInputsData } from "./utils";
import { QueryFilter, QueryFilterDispatch } from "./QueryFilter";
import { QueryAction, queryAction } from "./actions";
import { Accordion, Stack, Text, Timeline } from "@mantine/core";
import { QuerySearch, QuerySearchDispatch, SearchChainDispatch } from "./QuerySearch";
import { TbChevronDown } from "react-icons/tb";
import { QueryProjection, QueryProjectionDispatch } from "./QueryProjection";
import { Chain, QueryChainDispatch } from "./Chain";
import { QuerySort, QuerySortDispatch } from "./QuerySort";
import { QueryGeneralSearch } from "./QueryGeneralSearch";

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
    filterValue,
    generalSearchCase,
    generalSearchExclusionValue,
    generalSearchInclusionValue,
    isError,
    isFilterOpened,
    isProjectionOpened,
    isQueryChainOpened,
    isQueryOpened,
    isSearchDisabled,
    isSearchOpened,
    isSortOpened,
    limitPerPage,
    projectedFieldsSet,
    projectionFields,
    queryChains,
    searchField,
    searchValue,
    selectedFieldsSet,
    sortDirection,
    sortField,
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

  const queryChain = (
    <Chain
      collectionName={collectionName}
      generalSearchCase={generalSearchCase}
      generalSearchExclusionValue={generalSearchExclusionValue}
      generalSearchInclusionValue={generalSearchInclusionValue}
      isQueryChainOpened={isQueryChainOpened}
      queryAction={queryAction}
      queryChainDispatch={queryDispatch as QueryChainDispatch}
      queryChains={queryChains}
    />
  );

  const queryFilter = (
    <QueryFilter
      fieldNamesOperatorsTypesMap={fieldNamesOperatorsTypesMap}
      filterChain={queryChains.filter}
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

  const queryProjection = (
    <QueryProjection
      parentDispatch={queryDispatch as QueryProjectionDispatch}
      projectionCheckboxData={projectionCheckboxData}
      projectionFields={projectionFields}
      queryAction={queryAction}
    />
  );

  const queryGeneralSearch = (
    <QueryGeneralSearch
      generalSearchCase={generalSearchCase}
      generalSearchExclusionValue={generalSearchExclusionValue}
      generalSearchInclusionValue={generalSearchInclusionValue}
      queryAction={queryAction}
      querySearchDispatch={queryDispatch as QuerySearchDispatch}
      validatedInputsKeyMap={validatedInputsKeyMap}
    />
  );

  const querySearch = (
    <QuerySearch
      queryAction={queryAction}
      querySearchDispatch={queryDispatch as QuerySearchDispatch}
      searchChain={queryChains.search}
      searchChainDispatch={queryDispatch as SearchChainDispatch}
      searchField={searchField}
      searchFieldSelectData={searchFieldSelectData}
      searchValue={searchValue}
      validatedInputsKeyMap={validatedInputsKeyMap}
    />
  );

  const querySort = (
    <QuerySort
      queryAction={queryAction}
      querySortDispatch={queryDispatch as QuerySortDispatch}
      sortChain={queryChains.sort}
      sortChainDispatch={queryDispatch}
      sortDirection={sortDirection}
      sortField={sortField}
      sortFieldSelectData={sortFieldSelectData}
    />
  );

  const queryAccordion = (
    <Accordion>
      <Accordion.Item value="Filter">
        <Accordion.Control>Filter</Accordion.Control>
        <Accordion.Panel>{queryFilter}</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="Project">
        <Accordion.Control>Project</Accordion.Control>
        <Accordion.Panel>{queryProjection}</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="Search by Fields">
        <Accordion.Control>Search by Fields</Accordion.Control>
        <Accordion.Panel>{querySearch}</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="Search by Text">
        <Accordion.Control>Search by Text</Accordion.Control>
        <Accordion.Panel>
          <Text>{queryGeneralSearch}</Text>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="Sort">
        <Accordion.Control>Sort</Accordion.Control>
        <Accordion.Panel>{querySort}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  return (
    <Stack>
      {queryChain}
      {queryAccordion}
    </Stack>
  );
}

export { Query };
