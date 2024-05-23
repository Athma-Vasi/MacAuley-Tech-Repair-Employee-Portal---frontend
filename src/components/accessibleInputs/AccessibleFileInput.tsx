import { FileInput, MantineNumberSize, MantineSize } from "@mantine/core";
import { Dispatch } from "react";

import { splitCamelCase } from "../../utils";

type AccessibleFileInputAttributes<ValidValueAction extends string = string> = {
  disabled?: boolean;
  label?: string;
  name: string;
  onBlur?: () => void;
  onChange?: (payload: File | null) => void;
  onFocus?: () => void;
  parentDispatch: Dispatch<{ action: ValidValueAction; payload: File | null }>;
  placeholder?: string;
  radius?: MantineNumberSize;
  required?: boolean;
  size?: MantineSize;
  value: File | null;
  validValueAction: ValidValueAction;
  variant?: "default" | "filled" | "unstyled";
};

type AccessibleFileInputProps<ValidValueAction extends string = string> = {
  attributes: AccessibleFileInputAttributes<ValidValueAction>;
};

function AccessibleFileInput<ValidValueAction extends string = string>({
  attributes,
}: AccessibleFileInputProps<ValidValueAction>) {
  const {
    disabled = false,
    name,
    onBlur,
    onChange,
    onFocus,
    parentDispatch,
    placeholder = "",
    radius,
    required = false,
    size = "sm",
    validValueAction,
    value,
    variant = "default",
  } = attributes;

  const label = attributes.label ?? splitCamelCase(name);

  return (
    <FileInput
      aria-disabled={disabled}
      aria-label={label}
      aria-required={required}
      disabled={disabled}
      label={label}
      name={name}
      onBlur={onBlur}
      onChange={(payload: File | null) => {
        parentDispatch({
          action: validValueAction,
          payload,
        });

        onChange?.(payload);
      }}
      onFocus={onFocus}
      placeholder={placeholder}
      radius={radius}
      required={required}
      size={size}
      value={value}
      variant={variant}
      withAsterisk={required}
    />
  );
}

export { AccessibleFileInput };
export type { AccessibleFileInputAttributes, AccessibleFileInputProps };
