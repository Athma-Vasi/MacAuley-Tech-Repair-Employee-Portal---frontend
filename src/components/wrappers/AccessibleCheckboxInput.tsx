import { Checkbox, MantineNumberSize, MantineSize, Text } from "@mantine/core";
import { ChangeEvent, ReactNode, RefObject } from "react";

import { splitCamelCase } from "../../utils";
import { AccessibleSelectedDeselectedTextElements } from "./utils";

type AccessibleCheckboxInputAttributes = {
  ariaRequired?: boolean;
  ariaLabel?: string;
  checked: boolean;
  deselectedDescription: string;
  disabled?: boolean;
  key?: string;
  label?: ReactNode | string;
  onChangeCallbacks: Array<(event: ChangeEvent<HTMLInputElement>) => void>;
  ref?: RefObject<HTMLInputElement> | null;
  required?: boolean;
  selectedDescription: string;
  semanticName: string;
  size?: MantineSize;
  width?: MantineNumberSize;
};

type AccessibleCheckboxInputSingleProps = {
  attributes: AccessibleCheckboxInputAttributes;
};

function AccessibleCheckboxInputSingle({
  attributes,
}: AccessibleCheckboxInputSingleProps) {
  const {
    semanticName,
    ariaLabel = splitCamelCase(semanticName),
    checked,
    deselectedDescription,
    selectedDescription,
    onChangeCallbacks,
    key = semanticName,
    label = `${semanticName.charAt(0).toUpperCase()}${semanticName.slice(1)}`,
    disabled = false,
    ref = null,
    required = false,
    ariaRequired = required,
    size = "sm",
    width = "auto",
  } = attributes;

  const [selectedTextElement, deselectedTextElement] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: checked,
      semanticName,
      selectedDescription,
      deselectedDescription,
    });

  return (
    <Checkbox
      aria-describedby={
        checked
          ? // id of selectedTextElement
            `${semanticName.split(" ").join("-")}-selected`
          : // id of deselectedTextElement
            `${semanticName.split(" ").join("-")}-deselected`
      }
      aria-label={ariaLabel}
      aria-required={ariaRequired}
      checked={checked}
      description={checked ? selectedTextElement : deselectedTextElement}
      disabled={disabled}
      key={key}
      label={label}
      name={semanticName.split(" ").join("-")}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChangeCallbacks.length &&
          onChangeCallbacks.forEach((callback) => callback(event));
      }}
      ref={ref}
      required={required}
      size={size}
      w={width}
    />
  );
}

type AccessibleCheckboxInputGroupAttributes = {
  ariaRequired?: boolean;
  ariaLabel?: string;
  deselectedDescription: string;
  /**
   * Set of values that should be disabled. Used by QueryBuilder component to disable values from projection exclusion if they have already been queued for inclusion (by Filter, Sort, or Search).
   */
  disabledValuesSet?: Set<string>;
  inputData: Array<{ value: string; label: string }>;
  key?: string;
  label?: ReactNode | string;
  name?: string;
  onChangeCallbacks: Array<(value: string[]) => void>;
  ref?: RefObject<HTMLInputElement> | null;
  required?: boolean;
  selectedDescription: string;
  semanticName: string;
  size?: MantineSize;
  value: string[];
  widthCheckbox?: MantineNumberSize;
  withAsterisk?: boolean;
};

type AccessibleCheckboxInputGroupProps = {
  attributes: AccessibleCheckboxInputGroupAttributes;
};

function CheckboxGroupInputsWrapper({ attributes }: AccessibleCheckboxInputGroupProps) {
  const {
    semanticName,
    inputData,
    ariaLabel = splitCamelCase(semanticName),
    deselectedDescription,
    disabledValuesSet = new Set(),
    onChangeCallbacks,
    key = semanticName,
    label = `${semanticName.charAt(0).toUpperCase()}${semanticName.slice(1)}`,
    ariaRequired = false,
    value,
    required = false,
    ref = null,
    selectedDescription,
    size = "sm",
    withAsterisk = required,
    widthCheckbox = "100%",
  } = attributes;

  const inputWidth = 330;

  const [selectedTextElement, deselectedTextElement] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: value.length > 0,
      semanticName,
      selectedDescription,
      deselectedDescription,
    });

  const createdCheckboxGroupInputs = (
    <Checkbox.Group
      aria-describedby={
        value.length > 0
          ? // id of selectedTextElement
            `${semanticName.split(" ").join("-")}-selected`
          : // id of deselectedTextElement
            `${semanticName.split(" ").join("-")}-deselected`
      }
      aria-label={ariaLabel}
      size={size}
      label={label}
      key={key}
      description={value.length > 0 ? selectedTextElement : deselectedTextElement}
      aria-required={ariaRequired}
      value={value}
      onChange={(values: string[]) => {
        onChangeCallbacks.length &&
          onChangeCallbacks.forEach((callback) => callback(values));
      }}
      required={required}
      ref={ref}
      withAsterisk={withAsterisk}
      w={widthCheckbox}
    >
      {inputData?.map(({ value, label }) => (
        <Checkbox
          disabled={disabledValuesSet.has(value) || disabledValuesSet.has(label)}
          label={<Text>{label}</Text>}
          name={value}
          value={value}
          w={inputWidth}
        />
      ))}
    </Checkbox.Group>
  );

  return createdCheckboxGroupInputs;
}

export { AccessibleCheckboxInputSingle, CheckboxGroupInputsWrapper };

export type { AccessibleCheckboxInputAttributes, AccessibleCheckboxInputGroupAttributes };
