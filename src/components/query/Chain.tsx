import { Accordion, Group, Stack, Text, Timeline } from "@mantine/core";
import React from "react";
import { TbChevronDown, TbLink } from "react-icons/tb";

import { splitCamelCase } from "../../utils";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { QueryAction } from "./actions";
import { MAX_LINKS_AMOUNT } from "./constants";
import {
  ModifyQueryChainPayload,
  QueryChain,
  QueryChainKind,
  QueryChains,
} from "./types";

type QueryChainDispatch = React.Dispatch<
  | {
      action: QueryAction["modifyQueryChains"];
      payload: ModifyQueryChainPayload;
    }
  | {
      action: QueryAction["setIsQueryChainOpened"];
      payload: boolean;
    }
>;

type QueryChainProps = {
  collectionName: string;
  isQueryChainOpened: boolean;
  queryAction: QueryAction;
  queryChains: QueryChains;
  queryChainDispatch: QueryChainDispatch;
};

function Chain({
  collectionName,
  isQueryChainOpened,
  queryAction,
  queryChains,
  queryChainDispatch,
}: QueryChainProps) {
  const chainLength = Object.values(queryChains).reduce((acc, queryChain) => {
    queryChain.forEach(() => (acc += 1));
    return acc;
  }, 0);

  const filterSearchSet = new Set<Omit<QueryChainKind, "sort">>([
    "filter",
    "search",
    "generalSearch",
  ]);

  const queryChainElements = Object.entries(queryChains).flatMap((tuple, chainsIndex) => {
    const [queryChainKind, queryChain] = tuple as [QueryChainKind, QueryChain];

    const timeline =
      queryChain.length === 0 ? null : (
        <Timeline active={Number.MAX_SAFE_INTEGER}>
          {queryChain.map(([field, operator, value], linkIndex) => {
            const queryLinkStatement = createQueryLinkStatement({
              field,
              filterSearchSet,
              operator,
              queryChainKind,
              value,
            });

            const deleteQueryLinkButton = (
              <AccessibleButton
                attributes={{
                  enabledScreenreaderText: `Delete link ${queryLinkStatement}`,
                  index: linkIndex,
                  kind: "delete",
                  setIconAsLabel: true,
                  onClick: (
                    _event:
                      | React.MouseEvent<HTMLButtonElement, MouseEvent>
                      | React.PointerEvent<HTMLButtonElement>
                  ) => {
                    queryChainDispatch({
                      action: queryAction.modifyQueryChains,
                      payload: {
                        index: linkIndex,
                        queryChainActions: "delete",
                        queryChainKind,
                        value: ["", "", ""],
                      },
                    });

                    if (chainLength === 0) {
                      queryChainDispatch({
                        action: queryAction.setIsQueryChainOpened,
                        payload: false,
                      });
                    }
                  },
                }}
              />
            );

            const insertQueryLinkButton = (
              <AccessibleButton
                attributes={{
                  disabled: linkIndex === MAX_LINKS_AMOUNT - 1,
                  disabledScreenreaderText: "Max query links amount reached",
                  enabledScreenreaderText: `Insert link before ${queryLinkStatement}`,
                  index: linkIndex,
                  kind: "insert",
                  setIconAsLabel: true,
                  onClick: (
                    _event:
                      | React.MouseEvent<HTMLButtonElement, MouseEvent>
                      | React.PointerEvent<HTMLButtonElement>
                  ) => {
                    queryChainDispatch({
                      action: queryAction.modifyQueryChains,
                      payload: {
                        index: linkIndex,
                        queryChainActions: "insert",
                        queryChainKind,
                        value: ["", "", ""],
                      },
                    });
                  },
                }}
              />
            );

            const slideQueryChainUpButton = (
              <AccessibleButton
                attributes={{
                  disabled: linkIndex === 0,
                  disabledScreenreaderText: "Cannot move up. Already at the top",
                  enabledScreenreaderText: `Move link ${queryLinkStatement} up`,
                  index: linkIndex,
                  kind: "up",
                  setIconAsLabel: true,
                  onClick: (
                    _event:
                      | React.MouseEvent<HTMLButtonElement, MouseEvent>
                      | React.PointerEvent<HTMLButtonElement>
                  ) => {
                    queryChainDispatch({
                      action: queryAction.modifyQueryChains,
                      payload: {
                        index: linkIndex,
                        queryChainActions: "slideUp",
                        queryChainKind,
                        value: ["", "", ""],
                      },
                    });
                  },
                }}
              />
            );

            const slideQueryChainDownButton = (
              <AccessibleButton
                attributes={{
                  disabled: linkIndex === queryChain.length - 1,
                  disabledScreenreaderText:
                    "Cannot move link down. Already at the bottom",
                  enabledScreenreaderText: `Move link ${queryLinkStatement} down`,
                  index: linkIndex,
                  kind: "down",
                  setIconAsLabel: true,
                  onClick: (
                    _event:
                      | React.MouseEvent<HTMLButtonElement, MouseEvent>
                      | React.PointerEvent<HTMLButtonElement>
                  ) => {
                    queryChainDispatch({
                      action: queryAction.modifyQueryChains,
                      payload: {
                        index: linkIndex,
                        queryChainActions: "slideDown",
                        queryChainKind,
                        value: ["", "", ""],
                      },
                    });
                  },
                }}
              />
            );

            const buttons = (
              <Group>
                {deleteQueryLinkButton}
                {insertQueryLinkButton}
                {slideQueryChainUpButton}
                {slideQueryChainDownButton}
              </Group>
            );

            return (
              <Timeline.Item
                key={`chain-${chainsIndex}-link-${linkIndex}`}
                bullet={<TbLink />}
              >
                <Text>{`${queryLinkStatement} ${
                  linkIndex === queryChain.length - 1 ? "" : "and"
                }`}</Text>
                {buttons}
              </Timeline.Item>
            );
          })}
        </Timeline>
      );

    const queryLinkHeadingElement =
      queryChain.length === 0 ? null : (
        <Stack>
          <Text size="lg">{splitCamelCase(queryChainKind)}</Text>
          <Text>
            {createQueryLinkHeading({
              collectionName,
              filterSearchSet,
              queryChainKind,
            })}
          </Text>
        </Stack>
      );

    return (
      <Stack key={`chain-${chainsIndex}`}>
        {queryLinkHeadingElement}
        {timeline}
      </Stack>
    );
  });

  return chainLength === 0 ? (
    <Text>No query chain links</Text>
  ) : (
    <Stack>{queryChainElements}</Stack>
  );
}

function createQueryLinkHeading({
  collectionName,
  filterSearchSet,
  queryChainKind,
}: {
  collectionName: string;
  filterSearchSet: Set<Omit<QueryChainKind, "sort">>;
  queryChainKind: QueryChainKind;
}) {
  let queryLinkHeading = "";

  if (filterSearchSet.has(queryChainKind)) {
    queryLinkHeading = `Select ${splitCamelCase(collectionName)} where:`;
  }

  if (queryChainKind === "sort") {
    queryLinkHeading = `Sort selected ${splitCamelCase(collectionName)} by:`;
  }

  return queryLinkHeading;
}

function createQueryLinkStatement({
  field,
  filterSearchSet,
  operator,
  queryChainKind,
  value,
}: {
  field: string;
  filterSearchSet: Set<Omit<QueryChainKind, "sort">>;
  operator: string;
  queryChainKind: QueryChainKind;
  value: string;
}) {
  // projection
  let queryLinkStatement = "";

  if (filterSearchSet.has(queryChainKind)) {
    queryLinkStatement = `${splitCamelCase(field)} ${
      operator.length > 0 ? `is ${operator}` : "contains"
    } ${splitCamelCase(value)}`;
  }

  if (queryChainKind === "sort") {
    queryLinkStatement = `${splitCamelCase(field)} in ${splitCamelCase(value)} order`;
  }

  return queryLinkStatement;
}

export { Chain };
export type { QueryChainDispatch };

/**
 * <Accordion
      chevron={<TbChevronDown />}
      onChange={(_event: string | null) => {
        queryChainDispatch({
          action: queryAction.setIsQueryChainOpened,
          payload: true,
        });
      }}
      value={isQueryChainOpened ? "Query Chain" : null}
    >
      <Accordion.Item value="Query Chain">
        <Accordion.Control disabled={chainLength === 0}>
          <Text size="lg">Query Chain</Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack>
            {queryChainElements.length === 0 ? (
              <Text>No query chain links</Text>
            ) : (
              queryChainElements
            )}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
 */
