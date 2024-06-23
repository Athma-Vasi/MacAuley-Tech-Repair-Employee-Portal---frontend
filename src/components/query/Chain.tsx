import { Accordion, Group, Stack, Text, Timeline } from "@mantine/core";
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
import { TbLink, TbChevronDown } from "react-icons/tb";
import React from "react";

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
  // const isAccordionDisabled = Object.values(queryChains).every(
  //   (queryChain) => queryChain.length === 0
  // );

  const chainLength = Object.entries(queryChains).reduce((acc, [_, queryChain]) => {
    queryChain.forEach(() => {
      acc += 1;
    });

    return acc;
  }, 0);

  return (
    <Accordion chevron={<TbChevronDown />}>
      <Accordion.Item value="Query Chain">
        <Accordion.Control disabled={chainLength === 0}>
          <Text size="lg">Query Chain</Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <Text size="md">{`Select ${collectionName} where:`}</Text>

            <Timeline active={Number.MAX_SAFE_INTEGER}>
              {Object.entries(queryChains).flatMap((tuple, chainsIndex) => {
                const [queryChainKind, queryChain] = tuple as [
                  QueryChainKind,
                  QueryChain
                ];

                return queryChain.map(([field, operator, value], index) => {
                  const queryLinkStatement = `${splitCamelCase(field)} ${
                    operator.length > 0 ? `is ${operator}` : "contains"
                  } ${splitCamelCase(value)}`;

                  const deleteQueryLinkButton = (
                    <AccessibleButton
                      attributes={{
                        enabledScreenreaderText: `Delete link ${queryLinkStatement}`,
                        index,
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
                              index,
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
                        disabled: index === MAX_LINKS_AMOUNT - 1,
                        disabledScreenreaderText: "Max query links amount reached",
                        enabledScreenreaderText: `Insert link before ${queryLinkStatement}`,
                        index,
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
                              index,
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
                        disabled: index === 0,
                        disabledScreenreaderText: "Cannot move up. Already at the top",
                        enabledScreenreaderText: `Move link ${queryLinkStatement} up`,
                        index,
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
                              index,
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
                        disabled: index === queryChain.length - 1,
                        disabledScreenreaderText:
                          "Cannot move link down. Already at the bottom",
                        enabledScreenreaderText: `Move link ${queryLinkStatement} down`,
                        index,
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
                              index,
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
                    <Timeline.Item key={`timeline-link-${index}`} bullet={<TbLink />}>
                      <Text>{`${queryLinkStatement} ${
                        // queryChain.length > 1 && index !== queryChain.length - 1
                        chainsIndex + index === chainLength ? "" : "and"
                      }`}</Text>
                      {buttons}
                    </Timeline.Item>
                  );
                });
              })}
            </Timeline>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export { Chain };
