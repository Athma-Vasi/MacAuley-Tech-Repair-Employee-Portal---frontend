import { MantineSize, NativeSelect } from "@mantine/core";
import { ChangeEvent, ReactNode, RefObject } from "react";

import { SelectInputData } from "../../types";
import { splitCamelCase } from "../../utils";

type AccessibleSelectInputAttributes<
  ValidValueAction extends string = string,
  Payload extends string = string
> = {
  data: string[] | SelectInputData;
  describedBy?: string;
  description?: string;
  disabled?: boolean;
  label?: ReactNode;
  name: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  parentDispatch: React.Dispatch<{
    type: ValidValueAction;
    payload: Payload;
  }>;
  ref?: RefObject<HTMLSelectElement>;
  required?: boolean;
  size?: MantineSize;
  validValueAction: ValidValueAction;
  value?: string;
  withAsterisk?: boolean;
};

type AccessibleSelectInputProps<
  ValidValueAction extends string = string,
  Payload extends string = string
> = {
  attributes: AccessibleSelectInputAttributes<ValidValueAction, Payload>;
};

function AccessibleSelectInput<
  ValidValueAction extends string = string,
  Payload extends string = string
>({ attributes }: AccessibleSelectInputProps<ValidValueAction, Payload>) {
  const {
    data,
    describedBy = "",
    description,
    disabled = false,
    name = splitCamelCase(attributes.name),
    label = splitCamelCase(attributes.name),
    onChange,
    parentDispatch,
    ref = null,
    required = false,
    size = "sm",
    validValueAction,
    value,
    withAsterisk = required,
  } = attributes;

  return (
    <NativeSelect
      aria-describedby={describedBy}
      aria-label={`${description}. Currently selected ${value}`}
      aria-required={required}
      data={data}
      disabled={disabled}
      label={label}
      name={name}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        parentDispatch({
          type: validValueAction,
          payload: event.currentTarget.value as Payload,
        });

        if (onChange) {
          onChange(event);
        }
      }}
      ref={ref}
      required={required}
      size={size}
      value={value}
      withAsterisk={withAsterisk}
    />
  );
}

export { AccessibleSelectInput };

export type { AccessibleSelectInputAttributes };
