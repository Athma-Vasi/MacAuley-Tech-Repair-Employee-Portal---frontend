import { Flex, Group, MantineNumberSize, MantineSize, Radio } from "@mantine/core";
import React, { ReactNode } from "react";

import { useGlobalState } from "../../hooks";
import { splitCamelCase } from "../../utils";

type AccessibleRadioInputSingleAttributes = {
  ariaRequired?: boolean;
  checked: boolean;
  description: string;
  disabled?: boolean;
  key?: string;
  label?: ReactNode | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement> | null;
  required?: boolean;
  semanticName: string;
  size?: MantineSize;
  width?: MantineNumberSize;
};
type AccessibleRadioInputSingleProps = {
  attributes: AccessibleRadioInputSingleAttributes;
};

function AccessibleRadioInputSingle({ attributes }: AccessibleRadioInputSingleProps) {
  const {
    required = false,
    ariaRequired = required,
    checked,
    description,
    disabled = false,
    semanticName,
    key = semanticName,
    label = `${semanticName.charAt(0).toUpperCase()}${semanticName.slice(1)}`,
    onChange,
    ref = null,
    size = "sm",
    width = 330,
  } = attributes;

  return (
    <Radio
      aria-label={splitCamelCase(semanticName)}
      aria-required={ariaRequired}
      checked={checked}
      description={description}
      disabled={disabled}
      key={key}
      label={label}
      name={semanticName.split(" ").join("-")}
      onChange={onChange}
      ref={ref}
      required={required}
      size={size}
      w={width}
    />
  );
}

type AccessibleRadioGroupInputCreatorInfo = {
  ariaRequired?: boolean;
  columns?: number;
  dataObjectArray: Array<{ value: string; label: string }>;
  description?: ReactNode | string;
  key?: string;
  label?: ReactNode | string;
  name?: string;
  onChange: (value: string) => void;
  ref?: React.RefObject<HTMLInputElement> | null;
  required?: boolean;
  semanticName: string;
  size?: MantineSize;
  value?: string;
  widthRadioGroup?: MantineNumberSize;
  withAsterisk?: boolean;
};

type RadioGroupInputsWrapperProps = {
  attributes: AccessibleRadioGroupInputCreatorInfo;
};

function RadioGroupInputsWrapper({ attributes }: RadioGroupInputsWrapperProps) {
  const {
    globalState: { padding, rowGap },
  } = useGlobalState();

  const {
    ariaRequired = false,
    columns,
    dataObjectArray,
    description,
    semanticName,
    key = semanticName,
    label = `${semanticName.charAt(0).toUpperCase()}${semanticName.slice(1)}`,
    name = semanticName,
    onChange,
    ref = null,
    required = false,
    size = "sm",
    value,
    widthRadioGroup,
    withAsterisk = required,
  } = attributes;

  const inputWidth = widthRadioGroup ? widthRadioGroup : 330;

  const createdRadioGroupInputs = (
    <Radio.Group
      size={size}
      label={label}
      description={description}
      aria-required={ariaRequired}
      aria-describedby={semanticName}
      aria-label={semanticName + label}
      key={key}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      ref={ref}
      withAsterisk={withAsterisk}
      w="100%"
      id={name}
    >
      <Flex
        align="flex-start"
        justify="space-between"
        p={padding}
        rowGap={rowGap}
        columnGap={rowGap}
        w="100%"
        wrap="wrap"
        key={`${key}-flex`}
      >
        {dataObjectArray?.map(({ value, label }, idx) => {
          return (
            <Group position="center" key={`${key}-${idx}-${label}-${value}`} py="xs">
              <Radio value={value} label={label} w={inputWidth} />
            </Group>
          );
        })}
      </Flex>
    </Radio.Group>
  );

  return createdRadioGroupInputs;
}

export { RadioGroupInputsWrapper, AccessibleRadioInputSingle };

export type {
  AccessibleRadioGroupInputCreatorInfo,
  AccessibleRadioInputSingleAttributes,
};
