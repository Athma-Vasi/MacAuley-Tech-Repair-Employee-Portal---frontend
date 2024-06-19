import { MantineSize, NativeSelect } from "@mantine/core";

import { CheckboxRadioSelectData } from "../../types";
import { splitCamelCase } from "../../utils";

type AccessibleSelectInputAttributes<
  ValidValueAction extends string = string,
  Payload extends string = string
> = {
  data: CheckboxRadioSelectData<Payload>;
  describedBy?: string;
  description?: string;
  disabled?: boolean;
  label?: React.ReactNode;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  parentDispatch: React.Dispatch<{
    action: ValidValueAction;
    payload: Payload;
  }>;
  ref?: React.RefObject<HTMLSelectElement>;
  required?: boolean;
  size?: MantineSize;
  validValueAction: ValidValueAction;
  value: string;
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
    name,
    onChange,
    parentDispatch,
    ref = null,
    required = false,
    size = "sm",
    validValueAction,
    value,
    withAsterisk = required,
  } = attributes;

  const label = attributes.label ?? splitCamelCase(name);

  return (
    <NativeSelect
      aria-describedby={describedBy}
      aria-label={`${description}. Currently selected ${value}`}
      aria-required={required}
      data={data}
      disabled={disabled}
      label={label}
      name={name}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
        parentDispatch({
          action: validValueAction,
          payload: event.currentTarget.value as Payload,
        });

        onChange?.(event);
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
