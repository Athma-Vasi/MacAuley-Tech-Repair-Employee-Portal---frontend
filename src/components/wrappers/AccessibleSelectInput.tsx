import { MantineSize, NativeSelect } from "@mantine/core";
import { ChangeEvent, ReactNode, RefObject } from "react";

import { SelectInputData } from "../../types";

type AccessibleSelectInputAttributes = {
  data: string[] | SelectInputData;
  describedBy?: string;
  description?: string;
  disabled?: boolean;
  label: ReactNode;
  name: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  ref?: RefObject<HTMLSelectElement>;
  required?: boolean;
  size?: MantineSize;
  value?: string;
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
    label,
    name,
    onChange,
    ref = null,
    required = false,
    size = "sm",
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
      onChange={onChange}
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
