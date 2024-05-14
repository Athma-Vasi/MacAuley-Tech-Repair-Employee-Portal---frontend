import { Checkbox, MantineSize, Text } from "@mantine/core";
import { ChangeEvent, ReactNode, RefObject } from "react";

import { useGlobalState } from "../../hooks";
import { createAccessibleCheckboxSelectionsTextElements } from "./utils";

type AccessibleCheckboxInputSingleAttributes = {
  checked: boolean;
  disabled?: boolean;
  key?: string;
  label: ReactNode;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ref?: RefObject<HTMLInputElement> | null;
  required?: boolean;
  name: string;
  size?: MantineSize;
  value: string;
};

type AccessibleCheckboxInputSingleProps = {
  attributes: AccessibleCheckboxInputSingleAttributes;
};

function AccessibleCheckboxInputSingle({
  attributes,
}: AccessibleCheckboxInputSingleProps) {
  const {
    label,
    name,
    checked,
    onChange,
    key = name,
    disabled = false,
    ref = null,
    required = false,
    size = "sm",
    value,
  } = attributes;

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const [selectedTextElement, deselectedTextElement] =
    createAccessibleCheckboxSelectionsTextElements({
      checked,
      kind: "single",
      name,
      themeObject,
      value,
    });

  return (
    <Checkbox
      aria-describedby={
        checked
          ? // id of selectedTextElement
            `${name}-selected`
          : // id of deselectedTextElement
            `${name}-deselected`
      }
      aria-label={name}
      aria-required={required}
      checked={checked}
      description={checked ? selectedTextElement : deselectedTextElement}
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
  );
}

type AccessibleCheckboxInputGroupAttributes = {
  /**
   * Set of values that should be disabled. Used by QueryBuilder component to disable values from projection exclusion if they have already been queued for inclusion (by Filter, Sort, or Search).
   */
  disabledValuesSet?: Set<string>;
  inputData: Array<{ value: string; label: string }>;
  key?: string;
  label: ReactNode;
  onChange: (value: string[]) => void;
  ref?: RefObject<HTMLInputElement> | null;
  required?: boolean;
  name: string;
  size?: MantineSize;
  value: string[];
  withAsterisk?: boolean;
};

type AccessibleCheckboxInputGroupProps = {
  attributes: AccessibleCheckboxInputGroupAttributes;
};

function CheckboxGroupInputsWrapper({ attributes }: AccessibleCheckboxInputGroupProps) {
  const {
    disabledValuesSet = new Set(),
    inputData,
    label,
    name,
    key = name + " - key",
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

  const [selectedTextElement, deselectedTextElement] =
    createAccessibleCheckboxSelectionsTextElements({
      checked: value.length > 0,
      name,
      kind: "group",
      value,
      themeObject,
    });

  return (
    <Checkbox.Group
      aria-describedby={
        value.length > 0
          ? // id of selectedTextElement
            `${name}-selected`
          : // id of deselectedTextElement
            `${name}-deselected`
      }
      aria-label={name}
      aria-required={required}
      description={value.length > 0 ? selectedTextElement : deselectedTextElement}
      key={key}
      label={label}
      onChange={onChange}
      ref={ref}
      required={required}
      size={size}
      withAsterisk={withAsterisk}
    >
      {inputData?.map(({ value, label }) => (
        <Checkbox
          disabled={disabledValuesSet.has(value) || disabledValuesSet.has(label)}
          label={<Text>{label}</Text>}
          name={value}
          value={value}
        />
      ))}
    </Checkbox.Group>
  );
}

export { AccessibleCheckboxInputSingle, CheckboxGroupInputsWrapper };

export type {
  AccessibleCheckboxInputGroupAttributes,
  AccessibleCheckboxInputSingleAttributes,
};
