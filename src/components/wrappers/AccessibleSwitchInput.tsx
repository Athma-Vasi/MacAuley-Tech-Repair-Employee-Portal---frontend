import { Box, MantineSize, Switch } from "@mantine/core";
import { ChangeEvent, ReactNode, RefObject } from "react";

import { useGlobalState } from "../../hooks";
import { capitalizeAll } from "../../utils";
import { createAccessibleSwitchOnOffTextElements } from "./utils";

type AccessibleSwitchInputAttributes<ValidValueAction extends string = string> = {
  checked: boolean;
  disabled?: boolean;
  label?: ReactNode;
  labelPosition?: "left" | "right";
  name: string;
  offLabel: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onLabel: ReactNode;
  parentDispatch: React.Dispatch<{
    type: ValidValueAction;
    payload: string;
  }>;
  radius?: MantineSize;
  ref?: RefObject<HTMLInputElement>;
  required?: boolean;
  size?: MantineSize;
  /** Will be added to end of `${name} is off.` */
  switchOffDescription?: string;
  /** Will be added to end of `${name} is on.` */
  switchOnDescription?: string;
  thumbIcon?: ReactNode;
  validValueAction: ValidValueAction;
  value: string;
};

type AccessibleSwitchInputProps = {
  attributes: AccessibleSwitchInputAttributes;
};

function AccessibleSwitchInput({ attributes }: AccessibleSwitchInputProps) {
  const {
    checked,
    disabled = false,
    label = capitalizeAll(attributes.name),
    labelPosition = "right",
    name,
    onChange,
    offLabel,
    onLabel,
    parentDispatch,
    radius = "md",
    ref = null,
    required = false,
    size = "sm",
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
            payload: event.currentTarget.value,
          });

          if (onChange) {
            onChange(event);
          }
        }}
        onLabel={onLabel}
        radius={radius}
        ref={ref}
        required={required}
        size={size}
        thumbIcon={thumbIcon}
        value={value}
      />

      <Box style={{ display: "hidden" }}>
        {switchOnTextElement}
        {switchOffTextElement}
      </Box>
    </Box>
  );
}

export { AccessibleSwitchInput };

export type { AccessibleSwitchInputAttributes };
