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
    onChange,
    parentDispatch,
    ref = null,
    required = false,
    size = "sm",
    validValueAction,
    value,
  } = attributes;

  const label = attributes.label ?? splitCamelCase(name);
  const key = attributes.key ?? name + " - radio";

  const {
    globalState: { themeObject },
  } = useGlobalState();

  const { screenreaderTextElement } = createAccessibleRadioScreenreaderTextElements({
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

type AccessibleRadioInputGroupAttributes<
  ValidValueAction extends string = string,
  Data extends string = string
> = {
  // checked: boolean;
  data: Data[];
  description?: ReactNode | string;
  index?: number;
  key?: string;
  label: ReactNode;
  name: string;
  onChange?: (value: string) => void;
  parentDispatch?: React.Dispatch<{
    action: ValidValueAction;
    payload: Data;
  }>;
  parentDynamicDispatch?: React.Dispatch<{
    action: ValidValueAction;
    payload: { index: number; payload: Data };
  }>;
  ref?: React.RefObject<HTMLInputElement> | null;
  required?: boolean;
  size?: MantineSize;
  value: Data;
  validValueAction: ValidValueAction;
  withAsterisk?: boolean;
};

type AccessibleRadioInputGroupProps<
  ValidValueAction extends string = string,
  Data extends string = string
> = {
  attributes: AccessibleRadioInputGroupAttributes<ValidValueAction, Data>;
};

function AccessibleRadioInputGroup<
  ValidValueAction extends string = string,
  Data extends string = string
>({ attributes }: AccessibleRadioInputGroupProps<ValidValueAction, Data>) {
  const {
    data,
    description,
    index,
    name,
    key = name + " - radio group",
    label,
    onChange,
    parentDispatch,
    parentDynamicDispatch,
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
        onChange={(value: Data) => {
          index === undefined
            ? parentDispatch?.({
                action: validValueAction,
                payload: value,
              })
            : parentDynamicDispatch?.({
                action: validValueAction,
                payload: { index, payload: value },
              });

          onChange?.(value);
        }}
        ref={ref}
        required={required}
        size={size}
        value={value}
        withAsterisk={withAsterisk}
      >
        {data?.map((name, idx) => {
          return (
            <Radio value={name} label={splitCamelCase(name)} key={`${name}-${idx}`} />
          );
        })}
      </Radio.Group>

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
        {screenreaderTextElement}
      </Box>
    </Box>
  );

  return createdRadioGroupInputs;
}

export { AccessibleRadioInputGroup, AccessibleRadioInputSingle };

export type { AccessibleRadioInputGroupAttributes, AccessibleRadioInputSingleAttributes };
