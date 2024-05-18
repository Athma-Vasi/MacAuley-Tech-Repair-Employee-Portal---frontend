import { Box, MantineSize, Switch } from "@mantine/core";
import { ChangeEvent, ReactNode, RefObject } from "react";

import { useGlobalState } from "../../hooks";
import { SetStepsInErrorPayload } from "../../types";
import { splitCamelCase } from "../../utils";
import { createAccessibleSwitchOnOffTextElements } from "./utils";

type AccessibleSwitchInputAttributes<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  checked: boolean;
  disabled?: boolean;
  invalidValueAction: InvalidValueAction;
  label?: ReactNode;
  labelPosition?: "left" | "right";
  name: string;
  offLabel: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onLabel: ReactNode;
  parentDispatch: React.Dispatch<
    | {
        type: ValidValueAction;
        payload: boolean;
      }
    | {
        type: InvalidValueAction;
        payload: SetStepsInErrorPayload;
      }
  >;
  radius?: MantineSize;
  ref?: RefObject<HTMLInputElement>;
  required?: boolean;
  size?: MantineSize;
  step?: number;
  /** Will be added to end of `${name} is off.` */
  switchOffDescription?: string;
  /** Will be added to end of `${name} is on.` */
  switchOnDescription?: string;
  thumbIcon?: ReactNode;
  validValueAction: ValidValueAction;
  value: string;
};

type AccessibleSwitchInputProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  attributes: AccessibleSwitchInputAttributes<ValidValueAction, InvalidValueAction>;
};

function AccessibleSwitchInput<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({ attributes }: AccessibleSwitchInputProps<ValidValueAction, InvalidValueAction>) {
  const {
    checked,
    disabled = false,
    invalidValueAction,
    name = splitCamelCase(attributes.name),
    label = splitCamelCase(attributes.name),
    labelPosition = "right",
    onChange,
    offLabel,
    onLabel,
    parentDispatch,
    radius = "lg",
    ref = null,
    required = false,
    size = "sm",
    step = 0,
    switchOffDescription = "",
    switchOnDescription = "",
    thumbIcon = null,
    validValueAction,
    value,
  } = attributes;

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const { switchOnTextElement, switchOffTextElement } =
    createAccessibleSwitchOnOffTextElements({
      checked,
      name,
      switchOffDescription,
      switchOnDescription,
      themeObject,
    });

  return (
    <Box>
      <Switch
        aria-label={name}
        aria-required={required}
        aria-describedby={
          checked
            ? // id of switchOnTextElement
              `${name}-on`
            : // id of switchOffTextElement
              `${name}-off`
        }
        checked={checked}
        description={checked ? switchOnTextElement : switchOffTextElement}
        disabled={disabled}
        label={label}
        labelPosition={labelPosition}
        name={name}
        offLabel={offLabel}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          parentDispatch({
            type: validValueAction,
            payload: event.currentTarget.checked,
          });

          parentDispatch({
            type: invalidValueAction,
            payload: {
              kind: event.currentTarget.checked ? "delete" : "add",
              step,
            },
          });

          onChange?.(event);
        }}
        onLabel={onLabel}
        radius={radius}
        ref={ref}
        required={required}
        size={size}
        thumbIcon={thumbIcon}
        value={value}
      />

      <Box
        style={
          // This is an invisible element that is used to provide screen reader users with additional information
          // @see https://webaim.org/techniques/css/invisiblecontent/
          {
            height: "1px",
            left: "-9999px",
            position: "absolute",
            top: "auto",
            width: "1px",
          }
        }
      >
        {switchOnTextElement}
        {switchOffTextElement}
      </Box>
    </Box>
  );
}

export { AccessibleSwitchInput };

export type { AccessibleSwitchInputAttributes };
