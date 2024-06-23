import { Accordion, Group, Stack, Text, Timeline } from "@mantine/core";
import { TbChevronDown, TbLink } from "react-icons/tb";

import { ValidationKey } from "../../constants/validations";
import { CheckboxRadioSelectData, SetPageInErrorPayload, StepperPage } from "../../types";
import { splitCamelCase } from "../../utils";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextAreaInput } from "../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { QueryAction } from "./actions";
import { MAX_LINKS_AMOUNT } from "./constants";
import { ModifyQueryChainPayload, QueryChain } from "./types";

type QuerySearchDispatch<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = React.Dispatch<
  | {
      action: ValidValueAction;
      payload: string;
    }
  | {
      action: InvalidValueAction;
      payload: SetPageInErrorPayload;
    }
>;

type SearchChainDispatch<ValidValueAction extends string = string> = React.Dispatch<{
  action: ValidValueAction;
  payload: ModifyQueryChainPayload;
}>;

type QuerySearchProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  generalSearchExclusionValue: string;
  generalSearchInclusionValue: string;
  isGeneralSearchCaseSensitive?: boolean;
  queryAction: QueryAction;
  querySearchDispatch: QuerySearchDispatch;
  searchChain: QueryChain;
  searchChainDispatch: SearchChainDispatch;
  searchField: string;
  searchFieldSelectData: CheckboxRadioSelectData;
  searchValue: string;
  validatedInputsKeyMap: Map<string, ValidationKey>;
};

function QuerySearch<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({
  generalSearchExclusionValue,
  generalSearchInclusionValue,
  isGeneralSearchCaseSensitive,
  queryAction,
  querySearchDispatch,
  searchChain,
  searchChainDispatch,
  searchField,
  searchFieldSelectData,
  searchValue,
  validatedInputsKeyMap,
}: QuerySearchProps<ValidValueAction, InvalidValueAction>) {
  const fieldSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: searchFieldSelectData,
        name: "searchField",
        parentDispatch: querySearchDispatch,
        validValueAction: queryAction.setSearchField as ValidValueAction,
        value: searchField,
      }}
    />
  );

  const stepperPages: StepperPage[] = [
    {
      children: [
        {
          inputType: "text",
          name: "searchValue",
          validationKey: validatedInputsKeyMap.get("searchValue") ?? "allowAll",
        },
        {
          inputType: "text",
          name: "include",
          validationKey: validatedInputsKeyMap.get("include") ?? "allowAll",
        },
        {
          inputType: "text",
          name: "exclude",
          validationKey: validatedInputsKeyMap.get("include") ?? "allowAll",
        },
      ],
      description: "text area",
    },
  ];

  const valueTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        name: "searchValue",
        invalidValueAction: queryAction.setIsError as InvalidValueAction,
        required: false,
        parentDispatch: querySearchDispatch,
        validValueAction: queryAction.setSearchValue as ValidValueAction,
        value: searchValue,
        stepperPages,
      }}
    />
  );

  const generalSearchInclusionTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: queryAction.setIsError as InvalidValueAction,
        name: "include",
        stepperPages,
        validValueAction: queryAction.setGeneralSearchInclusionValue as ValidValueAction,
        value: generalSearchInclusionValue,
      }}
    />
  );

  const generalSearchExclusionTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: queryAction.setIsError as InvalidValueAction,
        name: "exclude",
        stepperPages,
        validValueAction: queryAction.setGeneralSearchExclusionValue as ValidValueAction,
        value: generalSearchExclusionValue,
      }}
    />
  );

  const disabledScreenreaderText =
    searchChain.length === MAX_LINKS_AMOUNT
      ? "Max search links amount reached"
      : "Value is empty";
  const addFilterStatementsButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Add search link to chain",
        disabledScreenreaderText,
        disabled: searchChain.length === MAX_LINKS_AMOUNT || searchValue === "",
        kind: "add",
        onClick: () => {
          searchChainDispatch({
            action: queryAction.modifyQueryChains as ValidValueAction,
            payload: {
              index: searchChain.length,
              queryChainActions: "insert",
              queryChainKind: "search",
              value: [searchField, "", searchValue],
            },
          });
        },
      }}
    />
  );

  // const searchChainElements = searchChain.map(([field, value], index) => {
  //   const searchLinkStatement = `${splitCamelCase(field)} contains ${splitCamelCase(
  //     value
  //   )}`;

  //   const deleteFilterLinkButton = (
  //     <AccessibleButton
  //       attributes={{
  //         enabledScreenreaderText: `Delete link ${searchLinkStatement}`,
  //         index,
  //         kind: "delete",
  //         setIconAsLabel: true,
  //         onClick: (
  //           _event:
  //             | React.MouseEvent<HTMLButtonElement, MouseEvent>
  //             | React.PointerEvent<HTMLButtonElement>
  //         ) => {
  //           searchChainDispatch({
  //             action: queryAction.modifySearchChain as ValidValueAction,
  //             payload: {
  //               index,
  //               kind: "delete",
  //               value: [searchField, "", searchValue],
  //             },
  //           });
  //         },
  //       }}
  //     />
  //   );

  //   const insertFilterLinkButton = (
  //     <AccessibleButton
  //       attributes={{
  //         disabled: index === MAX_LINKS_AMOUNT - 1,
  //         disabledScreenreaderText: "Max filter links amount reached",
  //         enabledScreenreaderText: `Insert link before ${searchLinkStatement}`,
  //         index,
  //         kind: "insert",
  //         setIconAsLabel: true,
  //         onClick: (
  //           _event:
  //             | React.MouseEvent<HTMLButtonElement, MouseEvent>
  //             | React.PointerEvent<HTMLButtonElement>
  //         ) => {
  //           searchChainDispatch({
  //             action: queryAction.modifySearchChain as ValidValueAction,
  //             payload: {
  //               index,
  //               kind: "insert",
  //               value: [searchField, "", searchValue],
  //             },
  //           });
  //         },
  //       }}
  //     />
  //   );

  //   const slideFilterChainUpButton = (
  //     <AccessibleButton
  //       attributes={{
  //         disabled: index === 0,
  //         disabledScreenreaderText: "Cannot move up. Already at the top",
  //         enabledScreenreaderText: `Move link ${searchLinkStatement} up`,
  //         index,
  //         kind: "up",
  //         setIconAsLabel: true,
  //         onClick: (
  //           _event:
  //             | React.MouseEvent<HTMLButtonElement, MouseEvent>
  //             | React.PointerEvent<HTMLButtonElement>
  //         ) => {
  //           searchChainDispatch({
  //             action: queryAction.modifySearchChain as ValidValueAction,
  //             payload: {
  //               index,
  //               kind: "slideUp",
  //               value: [searchField, "", searchValue],
  //             },
  //           });
  //         },
  //       }}
  //     />
  //   );

  //   const slideFilterChainDownButton = (
  //     <AccessibleButton
  //       attributes={{
  //         disabled: index === searchChain.length - 1,
  //         disabledScreenreaderText: "Cannot move link down. Already at the bottom",
  //         enabledScreenreaderText: `Move link ${searchLinkStatement} down`,
  //         index,
  //         kind: "down",
  //         setIconAsLabel: true,
  //         onClick: (
  //           _event:
  //             | React.MouseEvent<HTMLButtonElement, MouseEvent>
  //             | React.PointerEvent<HTMLButtonElement>
  //         ) => {
  //           searchChainDispatch({
  //             action: queryAction.modifySearchChain as ValidValueAction,
  //             payload: {
  //               index,
  //               kind: "slideDown",
  //               value: [searchField, "", searchValue],
  //             },
  //           });
  //         },
  //       }}
  //     />
  //   );

  //   const buttons = (
  //     <Group>
  //       {deleteFilterLinkButton}
  //       {insertFilterLinkButton}
  //       {slideFilterChainUpButton}
  //       {slideFilterChainDownButton}
  //     </Group>
  //   );

  //   return (
  //     <Timeline.Item key={`timeline-link-${index}`} bullet={<TbLink />}>
  //       <Text>{`${searchLinkStatement} ${
  //         searchChain.length > 1 && index !== searchChain.length - 1 ? "and" : ""
  //       }`}</Text>
  //       {buttons}
  //     </Timeline.Item>
  //   );
  // });

  // const timelineAccordion = (
  //   <Accordion chevron={<TbChevronDown />}>
  //     <Accordion.Item value="Search Chain">
  //       <Accordion.Control disabled={searchChain.length === 0}>
  //         <Text size="lg">Search Chain</Text>
  //       </Accordion.Control>
  //       <Accordion.Panel>
  //         <Stack>
  //           <Text size="md">{`Select ${collectionName} where:`}</Text>
  //           <Timeline active={Number.MAX_SAFE_INTEGER}>{searchChainElements}</Timeline>
  //         </Stack>
  //       </Accordion.Panel>
  //     </Accordion.Item>
  //   </Accordion>
  // );

  return (
    <Stack>
      {/* {timelineAccordion} */}
      {fieldSelectInput}
      {valueTextAreaInput}
      {generalSearchInclusionTextInput}
      {generalSearchExclusionTextInput}
      {addFilterStatementsButton}
    </Stack>
  );
}

export { QuerySearch };
export type { QuerySearchDispatch, SearchChainDispatch };
