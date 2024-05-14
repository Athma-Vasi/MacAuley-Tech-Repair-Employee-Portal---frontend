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
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
    onChange,
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
      onChange={onChange}
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
  onChange: (value: string[]) => void;
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
    onChange,
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

  return (
    <Checkbox.Group
      aria-describedby={
        value.length > 0
          ? // id of selectedTextElement
            `${semanticName.split(" ").join("-")}-selected`
          : // id of deselectedTextElement
            `${semanticName.split(" ").join("-")}-deselected`
      }
      aria-label={ariaLabel}
      aria-required={ariaRequired}
      description={value.length > 0 ? selectedTextElement : deselectedTextElement}
      key={key}
      label={label}
      onChange={onChange}
      ref={ref}
      required={required}
      size={size}
      value={value}
      w={widthCheckbox}
      withAsterisk={withAsterisk}
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
}

export { AccessibleCheckboxInputSingle, CheckboxGroupInputsWrapper };

export type { AccessibleCheckboxInputAttributes, AccessibleCheckboxInputGroupAttributes };
