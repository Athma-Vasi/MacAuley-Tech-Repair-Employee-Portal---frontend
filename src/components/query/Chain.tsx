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

type QueryChainProps = {
  collectionName: string;
  queryAction: QueryAction;
  queryChains: QueryChains;
  queryChainDispatch: React.Dispatch<{
    action: QueryAction["modifyQueryChains"];
    payload: ModifyQueryChainPayload;
  }>;
};

function Chain({
  collectionName,
  queryAction,
  queryChains,
  queryChainDispatch,
}: QueryChainProps) {
  const chainLength = Object.values(queryChains).reduce((acc, queryChain) => {
    queryChain.forEach(() => (acc += 1));
    return acc;
  }, 0);

  const { filter, generalSearch, search, sort: sortChain } = queryChains;
  const filterSearchChain = [...filter, ...search, ...generalSearch];

  // TODO: KEEP CHAIN SIMPLE, MOVE TIMELINE AND ACCORDION TO PARENT COMPONENT

  const timeline = <Timeline active={Number.MAX_SAFE_INTEGER}>{null}</Timeline>;

  const chainAccordion = (
    <Accordion chevron={<TbChevronDown />}>
      <Accordion.Item value="Query Chain">
        <Accordion.Control disabled={chainLength === 0}>
          <Text size="lg">Query Chain</Text>
        </Accordion.Control>
        <Accordion.Panel></Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  return (
    <Accordion chevron={<TbChevronDown />}>
      <Accordion.Item value="Query Chain">
        <Accordion.Control disabled={chainLength === 0}>
          <Text size="lg">Query Chain</Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <Timeline active={Number.MAX_SAFE_INTEGER}>
              {Object.entries(queryChains).flatMap((tuple, chainsIndex) => {
                const [queryChainKind, queryChain] = tuple as [
                  QueryChainKind,
                  QueryChain
                ];

                const queryChainElements = queryChain.map(
                  ([field, operator, value], linkIndex) => {
                    const queryLinkStatement = `${splitCamelCase(field)} ${
                      operator.length > 0 ? `is ${operator}` : "contains"
                    } ${splitCamelCase(value)}`;

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
                          chainsIndex + linkIndex === chainLength - 1 || chainLength === 1
                            ? ""
                            : "and"
                        }`}</Text>
                        {buttons}
                      </Timeline.Item>
                    );
                  }
                );

                return (
                  <React.Fragment>
                    <Text size="md">{`Select ${collectionName} where:`}</Text>
                    {queryChainElements}
                  </React.Fragment>
                );
              })}
            </Timeline>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export { Chain };
