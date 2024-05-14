import { Box, MantineSize, Radio } from "@mantine/core";
import React, { ReactNode } from "react";

import { useGlobalState } from "../../hooks";
import { createAccessibleRadioScreenreaderTextElements } from "./utils";

type AccessibleRadioInputSingleAttributes = {
  checked: boolean;
  description: string;
  disabled?: boolean;
  key?: string;
  label: ReactNode;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement> | null;
  required?: boolean;
  size?: MantineSize;
  value: string;
};
type AccessibleRadioInputSingleProps = {
  attributes: AccessibleRadioInputSingleAttributes;
};

function AccessibleRadioInputSingle({ attributes }: AccessibleRadioInputSingleProps) {
  const {
    checked,
    description,
    disabled = false,
    name,
    key = name + " - radio single",
    label,
    onChange,
    ref = null,
    required = false,
    size = "sm",
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
        onChange={onChange}
        ref={ref}
        required={required}
        size={size}
        value={value}
      />

      <Box style={{ display: "hidden" }}>{screenreaderTextElement}</Box>
    </Box>
  );
}

type AccessibleRadioInputGroupAttributes = {
  checked: boolean;
  dataObjectArray: Array<{ value: string; label: string }>;
  description?: ReactNode | string;
  key?: string;
  label: ReactNode;
  name: string;
  onChange: (value: string) => void;
  ref?: React.RefObject<HTMLInputElement> | null;
  required?: boolean;
  size?: MantineSize;
  value: string;
  withAsterisk?: boolean;
};

type AccessibleRadioInputGroupProps = {
  attributes: AccessibleRadioInputGroupAttributes;
};

function AccessibleRadioInputGroup({ attributes }: AccessibleRadioInputGroupProps) {
  const {
    checked,
    dataObjectArray,
    description,
    name,
    key = name + " - radio group",
    label,
    onChange,
    ref = null,
    required = false,
    size = "sm",
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
        onChange={onChange}
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
