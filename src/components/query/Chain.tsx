import { splitCamelCase } from "../../utils";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { QueryChain } from "./types";

type QueryChainProps = { queryChain: QueryChain };

function Chain({ queryChain }: QueryChainProps) {
  const queryChainElements = queryChain.map(([field, operator, value], index) => {
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
              action: queryAction.modifyQueryChain,
              payload: {
                index,
                kind: "delete",
                value: [queryField, queryOperator, queryValue],
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
              action: queryAction.modifyQueryChain,
              payload: {
                index,
                kind: "insert",
                value: [queryField, queryOperator, queryValue],
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
              action: queryAction.modifyQueryChain,
              payload: {
                index,
                kind: "slideUp",
                value: [queryField, queryOperator, queryValue],
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
          disabledScreenreaderText: "Cannot move link down. Already at the bottom",
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
              action: queryAction.modifyQueryChain,
              payload: {
                index,
                kind: "slideDown",
                value: [queryField, queryOperator, queryValue],
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
          queryChain.length > 1 && index !== queryChain.length - 1 ? "and" : ""
        }`}</Text>
        {buttons}
      </Timeline.Item>
    );
  });

  const timelineAccordion = (
    <Accordion chevron={<TbChevronDown />}>
      <Accordion.Item value="Query Chain">
        <Accordion.Control disabled={queryChain.length === 0}>
          <Text size="lg">Query Chain</Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <Text size="md">{`Select ${collectionName} where:`}</Text>
            <Timeline active={Number.MAX_SAFE_INTEGER}>{queryChainElements}</Timeline>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  return null;
}

export { Chain };
