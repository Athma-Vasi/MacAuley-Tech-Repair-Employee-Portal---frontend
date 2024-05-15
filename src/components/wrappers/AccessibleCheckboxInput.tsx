import { Checkbox, MantineSize, Text } from "@mantine/core";
import { ChangeEvent, ReactNode, RefObject } from "react";

import { useGlobalState } from "../../hooks";
import { capitalizeAll } from "../../utils";
import { createAccessibleCheckboxSelectionsTextElements } from "./utils";

type AccessibleCheckboxInputSingleAttributes<ValidValueAction extends string = string> = {
  checked: boolean;
  disabled?: boolean;
  key?: string;
  label?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  parentDispatch: React.Dispatch<{
    type: ValidValueAction;
    payload: boolean;
  }>;
  ref?: RefObject<HTMLInputElement> | null;
  required?: boolean;
  name: string;
  size?: MantineSize;
  validValueAction: ValidValueAction;
  value: string;
};

type AccessibleCheckboxInputSingleProps<ValidValueAction extends string = string> = {
  attributes: AccessibleCheckboxInputSingleAttributes<ValidValueAction>;
};

function AccessibleCheckboxInputSingle<ValidValueAction extends string = string>({
  attributes,
}: AccessibleCheckboxInputSingleProps<ValidValueAction>) {
  const {
    label = capitalizeAll(attributes.name),
    name,
    checked,
    onChange,
    parentDispatch,
    key = name,
    disabled = false,
    ref = null,
    required = false,
    size = "sm",
    validValueAction,
    value,
  } = attributes;

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const { selectedTextElement, deselectedTextElement } =
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
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        parentDispatch({
          type: validValueAction,
          payload: event.currentTarget.checked,
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
  );
}

type AccessibleCheckboxInputGroupAttributes<
  ValidValueAction extends string = string,
  Payload extends string[] = string[]
> = {
  /**
   * Set of values that should be disabled. Used by QueryBuilder component to disable values from projection exclusion if they have already been queued for inclusion (by Filter, Sort, or Search).
   */
  disabledValuesSet?: Set<string>;
  inputData: Array<{ value: string; label: string }>;
  key?: string;
  label: ReactNode;
  onChange?: (value: string[]) => void;
  parentDispatch: React.Dispatch<{
    type: ValidValueAction;
    payload: Payload;
  }>;
  ref?: RefObject<HTMLInputElement> | null;
  required?: boolean;
  name: string;
  size?: MantineSize;
  value: string[];
  withAsterisk?: boolean;
};

type AccessibleCheckboxInputGroupProps<
  ValidValueAction extends string = string,
  Payload extends string[] = string[]
> = {
  attributes: AccessibleCheckboxInputGroupAttributes<ValidValueAction, Payload>;
};

function AccessibleCheckboxInputGroup<
  ValidValueAction extends string = string,
  Payload extends string[] = string[]
>({ attributes }: AccessibleCheckboxInputGroupProps<ValidValueAction, Payload>) {
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

  const { selectedTextElement, deselectedTextElement } =
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

export { AccessibleCheckboxInputGroup, AccessibleCheckboxInputSingle };

export type {
  AccessibleCheckboxInputGroupAttributes,
  AccessibleCheckboxInputSingleAttributes,
};
