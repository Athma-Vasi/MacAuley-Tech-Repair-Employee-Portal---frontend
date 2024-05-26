import { useReducer } from "react";
import { splitCamelCase } from "../../../utils";
import { AccessibleTextInputsDynamicProps } from "./types";
import { accessibleTextInputsDynamicReducer } from "./reducers";
import { initialAccessibleTextInputsDynamicState } from "./state";
import { AccessibleTextAreaInput } from "../AccessibleTextAreaInput";
import { AccessibleButton } from "../AccessibleButton";
import {
  AccessibleTextInputsDynamicAction,
  accessibleTextInputsDynamicAction,
} from "./actions";
import { MAX_INPUTS_AMOUNT } from "./constants";
import { Container, Group, Stack } from "@mantine/core";
import { TEXT_AREA_INPUT_VALIDATIONS } from "../../../constants/validations";

function AccessibleTextInputsDynamic<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({
  attributes,
}: AccessibleTextInputsDynamicProps<ValidValueAction, InvalidValueAction>) {
  const {
    disableds,
    invalidValueAction,
    maxInputsAmount = MAX_INPUTS_AMOUNT,
    stepperPages,
    validValueAction,
    values,
    index,
    onBlurs,
    onClicks,
    onFocuses,
    page,
    parentDispatch,
    parentDynamicDispatch,
  } = attributes;

  const name = splitCamelCase(attributes.name);
  const labels =
    attributes.labels ?? values.map((_, idx) => splitCamelCase(name) + ` ${idx + 1}`);

  const [accessibleTextInputsDynamicState, accessibleTextInputsDynamicDispatch] =
    useReducer(
      accessibleTextInputsDynamicReducer,
      initialAccessibleTextInputsDynamicState
    );

  const { textValues } = accessibleTextInputsDynamicState;

  const inputs = textValues.map((value, index) => {
    // for popover validation linking
    stepperPages[page].children.push({
      inputType: "text",
      name: `${name} ${index + 1}`,
      validations: TEXT_AREA_INPUT_VALIDATIONS,
    });

    const textAreaInput = (
      <AccessibleTextAreaInput<
        AccessibleTextInputsDynamicAction["setInputValue"],
        AccessibleTextInputsDynamicAction["setPageInError"]
      >
        attributes={{
          index,
          invalidValueAction: accessibleTextInputsDynamicAction.setPageInError,
          name: `${name} ${index + 1}`,
          parentDynamicDispatch: accessibleTextInputsDynamicDispatch,
          stepperPages,
          validValueAction: accessibleTextInputsDynamicAction.setInputValue,
          value: value,
        }}
      />
    );

    const deleteInputButton = (
      <AccessibleButton
        attributes={{
          enabledScreenreaderText: `Delete ${name} ${index + 1}`,
          index,
          kind: "delete",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            accessibleTextInputsDynamicDispatch({
              action: accessibleTextInputsDynamicAction.deleteInput,
              payload: index,
            });
          },
        }}
      />
    );

    const insertInputButton = (
      <AccessibleButton
        attributes={{
          disabled: index === maxInputsAmount - 1,
          disabledScreenreaderText: "Max input amount reached",
          enabledScreenreaderText: `Insert ${name} before ${index + 1}`,
          index,
          kind: "insert",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            accessibleTextInputsDynamicDispatch({
              action: accessibleTextInputsDynamicAction.addInput,
              payload: undefined,
            });
          },
        }}
      />
    );

    const slideInputUpButton = (
      <AccessibleButton
        attributes={{
          disabled: index === 0,
          disabledScreenreaderText: "Cannot move up. Already at the top",
          enabledScreenreaderText: `Move ${name} ${index + 1} up`,
          index,
          kind: "up",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            accessibleTextInputsDynamicDispatch({
              action: accessibleTextInputsDynamicAction.slideInputUp,
              payload: index,
            });
          },
        }}
      />
    );

    const slideInputDownButton = (
      <AccessibleButton
        attributes={{
          disabled: index === textValues.length - 1,
          disabledScreenreaderText: "Cannot move down. Already at the bottom",
          enabledScreenreaderText: `Move ${name} ${index + 1} down`,
          index,
          kind: "down",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            accessibleTextInputsDynamicDispatch({
              action: accessibleTextInputsDynamicAction.slideInputDown,
              payload: index,
            });
          },
        }}
      />
    );

    const buttons = (
      <Group>
        {deleteInputButton}
        {insertInputButton}
        {slideInputUpButton}
        {slideInputDownButton}
      </Group>
    );

    return (
      <Stack>
        {textAreaInput}
        {buttons}
      </Stack>
    );
  });

  const addInputButton = (
    <AccessibleButton
      attributes={{
        // disabled: false,
        disabledScreenreaderText: "Max inputs amount reached",
        enabledScreenreaderText: `Add new ${name}: ${values.length + 1}`,
        kind: "add",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          accessibleTextInputsDynamicDispatch({
            action: accessibleTextInputsDynamicAction.addInput,
            payload: void 0,
          });
        },
      }}
    />
  );

  return (
    <Container w={700}>
      {addInputButton} {inputs}
    </Container>
  );
}

export { AccessibleTextInputsDynamic };
