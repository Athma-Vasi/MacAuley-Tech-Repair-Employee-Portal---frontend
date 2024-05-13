import { MantineNumberSize, MantineSize, NativeSelect } from "@mantine/core";
import { ChangeEvent, RefObject } from "react";

import { SelectInputData } from "../../types";

type AccessibleSelectInputAttributes = {
  data: string[] | SelectInputData;
  describedBy?: string;
  description?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  ref?: RefObject<HTMLSelectElement>;
  required?: boolean;
  size?: MantineSize;
  value?: string;
  width?: MantineNumberSize;
  withAsterisk?: boolean;
};

type AccessibleSelectInputProps = {
  attributes: AccessibleSelectInputAttributes;
};

function AccessibleSelectInput({ attributes }: AccessibleSelectInputProps) {
  const {
    data,
    describedBy = "",
    description,
    disabled = false,
    label = "",
    name = label,
    onChange,
    ref = null,
    required = false,
    size = "sm",
    value,
    width = 330,
    withAsterisk = required,
  } = attributes;

  return (
    <NativeSelect
      aria-describedby={describedBy}
      aria-label={`${description}. Currently selected ${value}`}
      aria-required={required}
      data={data}
      disabled={disabled}
      label={`${label.charAt(0).toUpperCase() + label.slice(1)}`}
      name={name}
      onChange={onChange}
      ref={ref}
      required={required}
      size={size}
      value={value}
      w={width}
      withAsterisk={withAsterisk}
    />
  );
}

export { AccessibleSelectInput };

export type { AccessibleSelectInputAttributes };
