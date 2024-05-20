import { Box, MantineSize, Radio } from "@mantine/core";
import React, { ReactNode } from "react";

import { useGlobalState } from "../../hooks";
import { splitCamelCase } from "../../utils";
import { createAccessibleRadioScreenreaderTextElements } from "./utils";

type AccessibleRadioInputSingleAttributes<ValidValueAction extends string = string> = {
  checked: boolean;
  description: string;
  disabled?: boolean;
  key?: string;
  label?: ReactNode;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  parentDispatch: React.Dispatch<{
    action: ValidValueAction;
    payload: string;
  }>;
  ref?: React.RefObject<HTMLInputElement> | null;
  required?: boolean;
  size?: MantineSize;
  validValueAction: ValidValueAction;
  value: string;
};
type AccessibleRadioInputSingleProps<ValidValueAction extends string = string> = {
  attributes: AccessibleRadioInputSingleAttributes<ValidValueAction>;
};

function AccessibleRadioInputSingle<ValidValueAction extends string = string>({
  attributes,
}: AccessibleRadioInputSingleProps<ValidValueAction>) {
  const {
    checked,
    description,
    disabled = false,
    name,
    key = name + " - radio single",
    label = splitCamelCase(attributes.name),
    onChange,
    parentDispatch,
    ref = null,
    required = false,
    size = "sm",
    validValueAction,
    value,
  } = attributes;

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const { screenreaderTextElement } = createAccessibleRadioScreenreaderTextElements({
    checked,
    name,
    themeObject,
    value,
  });

  return (
    <Box>
      <Radio
        aria-describedby={`${name}-selected`}
        aria-label={name}
        aria-required={required}
        checked={checked}
        description={description}
        disabled={disabled}
        key={key}
        label={label}
        name={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          parentDispatch({
            action: validValueAction,
            payload: event.currentTarget.value,
          });

          if (onChange) {
            onChange(event);
          }
        }}
        ref={ref}
        required={required}
        size={size}
        value={value}
      />

      <Box style={{ display: "hidden" }}>{screenreaderTextElement}</Box>
    </Box>
  );
}

type AccessibleRadioInputGroupAttributes<ValidValueAction extends string = string> = {
  checked: boolean;
  dataObjectArray: Array<{ value: string; label: string }>;
  description?: ReactNode | string;
  key?: string;
  label: ReactNode;
  name: string;
  onChange?: (value: string) => void;
  parentDispatch: React.Dispatch<{
    action: ValidValueAction;
    payload: string;
  }>;
  ref?: React.RefObject<HTMLInputElement> | null;
  required?: boolean;
  size?: MantineSize;
  value: string;
  validValueAction: ValidValueAction;
  withAsterisk?: boolean;
};

type AccessibleRadioInputGroupProps<ValidValueAction extends string = string> = {
  attributes: AccessibleRadioInputGroupAttributes<ValidValueAction>;
};

function AccessibleRadioInputGroup<ValidValueAction extends string = string>({
  attributes,
}: AccessibleRadioInputGroupProps<ValidValueAction>) {
  const {
    checked,
    dataObjectArray,
    description,
    name,
    key = name + " - radio group",
    label,
    onChange,
    parentDispatch,
    ref = null,
    required = false,
    size = "sm",
    validValueAction,
    value,
    withAsterisk = required,
  } = attributes;

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const { screenreaderTextElement } = createAccessibleRadioScreenreaderTextElements({
    checked,
    name,
    themeObject,
    value,
  });

  const createdRadioGroupInputs = (
    <Box>
      <Radio.Group
        aria-describedby={`${name}-selected`}
        aria-label={name}
        aria-required={required}
        description={description}
        id={name}
        key={key}
        label={label}
        name={name}
        onChange={(value: string) => {
          parentDispatch({
            action: validValueAction,
            payload: value,
          });

          if (onChange) {
            onChange(value);
          }
        }}
        ref={ref}
        required={required}
        size={size}
        value={value}
        withAsterisk={withAsterisk}
      >
        {dataObjectArray?.map(({ value, label }, idx) => {
          return <Radio value={value} label={label} checked={checked} />;
        })}
      </Radio.Group>

      <Box style={{ display: "hidden" }}>{screenreaderTextElement}</Box>
    </Box>
  );

  return createdRadioGroupInputs;
}

export { AccessibleRadioInputGroup, AccessibleRadioInputSingle };

export type { AccessibleRadioInputGroupAttributes, AccessibleRadioInputSingleAttributes };
