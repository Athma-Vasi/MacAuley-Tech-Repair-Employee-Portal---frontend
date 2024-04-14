import {
  Checkbox,
  Flex,
  Group,
  MantineNumberSize,
  MantineSize,
  Text,
} from "@mantine/core";
import { ChangeEvent, ReactNode, RefObject } from "react";

import { useGlobalState } from "../../hooks";

type AccessibleCheckboxSingleInputCreatorInfo = {
  ariaRequired?: boolean;
  checked: boolean;
  description: { selected: JSX.Element; deselected: JSX.Element };
  disabled?: boolean;
  key?: string;
  label?: ReactNode | string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ref?: RefObject<HTMLInputElement> | null;
  required?: boolean;
  semanticName: string;
  size?: MantineSize;
  width?: MantineNumberSize;
};

type CheckboxSingleInputWrapperProps = {
  creatorInfoObject: AccessibleCheckboxSingleInputCreatorInfo;
};

function CheckboxSingleInputWrapper({
  creatorInfoObject,
}: CheckboxSingleInputWrapperProps) {
  const {
    checked,
    description,
    onChange,
    semanticName,
    key = semanticName,
    label = `${semanticName.charAt(0).toUpperCase()}${semanticName.slice(1)}`,
    disabled = false,
    ref = null,
    required = false,
    ariaRequired = required,
    size = "sm",
    width = "auto",
  } = creatorInfoObject;

  const createdCheckboxSingleInput = (
    <Checkbox
      aria-describedby={
        checked
          ? `${semanticName.split(" ").join("-")}-selected`
          : `${semanticName.split(" ").join("-")}-deselected`
      }
      aria-label={semanticName}
      aria-required={ariaRequired}
      checked={checked}
      description={checked ? description.selected : description.deselected}
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

  return createdCheckboxSingleInput;
}

type AccessibleCheckboxGroupInputCreatorInfo = {
  ariaRequired?: boolean;
  dataObjectArray: Array<{ value: string; label: string }>;
  description: { selected: JSX.Element; deselected: JSX.Element };
  disabledValuesSet?: Set<string>;
  key?: string;
  label?: ReactNode | string;
  name?: string;
  onChange: (value: string[]) => void;
  ref?: RefObject<HTMLInputElement> | null;
  required?: boolean;
  semanticName: string;
  size?: MantineSize;
  value: string[];
  widthCheckbox?: MantineNumberSize;
  withAsterisk?: boolean;
};

type CheckboxGroupInputsWrapperProps = {
  creatorInfoObject: AccessibleCheckboxGroupInputCreatorInfo;
};

function CheckboxGroupInputsWrapper({
  creatorInfoObject,
}: CheckboxGroupInputsWrapperProps) {
  const {
    globalState: { padding, rowGap },
  } = useGlobalState();

  const {
    dataObjectArray,
    description,
    disabledValuesSet = new Set(),
    onChange,
    semanticName,
    key = semanticName,
    label = `${semanticName.charAt(0).toUpperCase()}${semanticName.slice(1)}`,
    ariaRequired = false,
    value,
    required = false,
    ref = null,
    size = "sm",
    withAsterisk = required,
    widthCheckbox = "100%",
  } = creatorInfoObject;

  const inputWidth = 330;

  const createdCheckboxGroupInputs = (
    <Checkbox.Group
      size={size}
      label={label}
      key={key}
      description={value.length > 0 ? description.selected : description.deselected}
      aria-required={ariaRequired}
      value={value}
      onChange={onChange}
      required={required}
      ref={ref}
      withAsterisk={withAsterisk}
      w={widthCheckbox}
    >
      <Flex
        align="baseline"
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
            <Group
              align="center"
              key={`${key}-${idx}${value}-${label}`}
              position="center"
              py="xs"
            >
              <Checkbox
                disabled={disabledValuesSet.has(value) || disabledValuesSet.has(label)}
                label={<Text>{label}</Text>}
                name={value}
                value={value}
                w={inputWidth}
              />
            </Group>
          );
        })}
      </Flex>
    </Checkbox.Group>
  );

  return createdCheckboxGroupInputs;
}

export { CheckboxGroupInputsWrapper, CheckboxSingleInputWrapper };

export type {
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
};
