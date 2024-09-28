import { Accordion, Stack } from "@mantine/core";
import React, { useEffect } from "react";

import type { SetPageInErrorPayload, StepperPage } from "../../types";
import { Chain, type QueryChainDispatch } from "./Chain";
import { QueryFilter, type SetFilterInputValuesDispatch } from "./QueryFilter";
import { QueryProjection } from "./QueryProjection";
import { QuerySearch } from "./QuerySearch";
import { QuerySort, type QuerySortDispatch } from "./QuerySort";
import { queryReducer } from "./reducers";
import { createInitialQueryState } from "./state";

import { createQueryInputsData } from "./utils";

type QueryProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string,
> = {
  collectionName: string;
  hideProjection?: boolean;
  invalidValueAction: InvalidValueAction;
  page?: number;
  parentDispatch: React.Dispatch<
    | {
      action: ValidValueAction;
      payload: string;
    }
    | {
      action: InvalidValueAction;
      payload: SetPageInErrorPayload;
    }
  >;
  /** only the children steppers objs are used */
  stepperPages: StepperPage[];
  validValueAction: ValidValueAction;
};

function Query<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string,
>({
  collectionName,
  invalidValueAction,
  page = 0,
  parentDispatch,
  stepperPages,
  validValueAction,
  hideProjection = false,
}: QueryProps<ValidValueAction, InvalidValueAction>) {
  const {
    fieldNamesOperatorsTypesMap,
    filterFieldSelectInputData,
    projectionCheckboxData,
    searchFieldSelectInputData,
    selectInputsDataMap,
    sortFieldSelectData,
    inputsValidationsMap,
  } = createQueryInputsData(stepperPages);

  const [queryState, queryDispatch] = React.useReducer(
    queryReducer,
    createInitialQueryState(searchFieldSelectInputData),
  );

  useEffect(() => {
    parentDispatch({
      action: invalidValueAction,
      payload: {
        kind: queryState.isError ? "add" : "delete",
        page,
      },
    });

    parentDispatch({
      action: validValueAction,
      payload: queryState.queryString,
    });
  }, [queryState.queryString, queryState.isError]);

  console.group("Query");
  console.log("queryState", queryState);
  console.log("stepperPages", stepperPages);
  console.log("fieldNamesOperatorsTypesMap", fieldNamesOperatorsTypesMap);
  console.log("projectionCheckboxData", projectionCheckboxData);
  console.log("filterFieldSelectInputData", filterFieldSelectInputData);
  console.log("searchFieldSelectInputData", searchFieldSelectInputData);
  console.log("selectInputsDataMap", selectInputsDataMap);
  console.log("sortFieldSelectData", sortFieldSelectData);
  console.log("inputsValidationsMap", inputsValidationsMap);
  console.groupEnd();

  const queryChain = (
    <Chain
      collectionName={collectionName}
      queryChainDispatch={queryDispatch as QueryChainDispatch}
      queryState={queryState}
    />
  );

  const queryFilter = (
    <QueryFilter
      fieldNamesOperatorsTypesMap={fieldNamesOperatorsTypesMap}
      filterFieldSelectInputData={filterFieldSelectInputData}
      inputsValidationsMap={inputsValidationsMap}
      modifyQueryChainsDispatch={queryDispatch}
      parentDispatch={queryDispatch}
      queryState={queryState}
      searchFieldSelectInputData={searchFieldSelectInputData}
      selectInputsDataMap={selectInputsDataMap}
      setFilterInputValuesDispatch={queryDispatch as SetFilterInputValuesDispatch}
    />
  );

  const queryProjection = (
    <QueryProjection
      hideProjection={hideProjection}
      parentDispatch={queryDispatch}
      projectionCheckboxData={projectionCheckboxData}
      queryState={queryState}
    />
  );

  const querySearch = (
    <QuerySearch
      parentDispatch={queryDispatch}
      queryState={queryState}
    />
  );

  const querySort = (
    <QuerySort
      querySortDispatch={queryDispatch as QuerySortDispatch}
      queryState={queryState}
      sortChainDispatch={queryDispatch}
      sortFieldSelectData={sortFieldSelectData}
    />
  );

  const queryAccordion = (
    <Accordion>
      <Accordion.Item value="Filter">
        <Accordion.Control>Filter</Accordion.Control>
        <Accordion.Panel>{queryFilter}</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="Search">
        <Accordion.Control>Search</Accordion.Control>
        <Accordion.Panel>{querySearch}</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="Projection">
        <Accordion.Control>Projection</Accordion.Control>
        <Accordion.Panel>{queryProjection}</Accordion.Panel>
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
