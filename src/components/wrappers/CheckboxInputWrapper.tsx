import { Checkbox } from '@mantine/core';
import { ReactNode } from 'react';

/*
type AccessibleCheckboxInputCreatorInfo = {
  semanticName: string;
  accessibleDescription?:
    | {
        selected: string;
        deselected: string;
      }
    | undefined;
  ariarequired?: boolean | undefined;
  checkboxKind: 'single' | 'multiple';
  dataObjArray?:
    | Array<{
        value: string;
        label: string;
      }>
    | undefined;
  defaultValue?: [string] | undefined;
  description: {
    selected: string;
    deselected: string;
  };
  label?: string | undefined;
  checked?: boolean | undefined;
  disabled?: boolean | undefined;
  onChangeMultiple?: (value: string[]) => void | undefined;
  onChangeSingle?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void | undefined;
  onClick?: () => void | undefined;
  ref?: React.RefObject<HTMLInputElement> | undefined;
  required?: boolean | undefined;
  value?: string[] | undefined;
};
*/

type AccessibleCheckboxSingleInputCreatorInfo = {
  semanticName: string;
  label?: ReactNode | string | undefined;
  description: string;
  ariaRequired?: boolean | undefined;
  checked: boolean;
  disabled?: boolean | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean | undefined;
  ref?: React.RefObject<HTMLInputElement> | undefined | null;
};

type CheckboxSingleInputWrapperProps = {
  creatorInfoObject: AccessibleCheckboxSingleInputCreatorInfo;
};

function CheckboxSingleInputWrapper({
  creatorInfoObject,
}: CheckboxSingleInputWrapperProps) {
  const {
    checked,
    description,
    onChange,
    semanticName,
    label = `${semanticName.charAt(0).toUpperCase()}${semanticName.slice(1)}`,
    disabled = false,
    ref = null,
    required = false,
    ariaRequired = required,
  } = creatorInfoObject;

  const createdCheckboxSingleInput = (
    <Checkbox
      size="sm"
      label={label}
      description={description}
      aria-required={ariaRequired}
      aria-label={semanticName}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      required={required}
      ref={ref}
    />
  );

  return createdCheckboxSingleInput;
}

type AccessibleCheckboxGroupInputCreatorInfo = {
  semanticName: string;
  label?: ReactNode | string | undefined;
  description: string;
  ariaRequired?: boolean | undefined;
  value: string[];
  onChange: (value: string[]) => void;
  name?: string | undefined;
  required?: boolean | undefined;
  ref?: React.RefObject<HTMLInputElement> | undefined | null;
  withAsterisk?: boolean | undefined;
  dataObjectArray: Array<{
    value: string;
    label: string;
  }>;
};

type CheckboxGroupInputsWrapperProps = {
  creatorInfoObject: AccessibleCheckboxGroupInputCreatorInfo;
};

function CheckboxGroupInputsWrapper({
  creatorInfoObject,
}: CheckboxGroupInputsWrapperProps) {
  const {
    dataObjectArray,
    description,
    onChange,
    semanticName,
    label = `${semanticName.charAt(0).toUpperCase()}${semanticName.slice(1)}`,
    ariaRequired = false,
    value,
    required = false,
    ref = null,
    withAsterisk = required,
  } = creatorInfoObject;

  const createdCheckboxGroupInputs = (
    <Checkbox.Group
      size="sm"
      label={label}
      description={description}
      aria-required={ariaRequired}
      value={value}
      onChange={onChange}
      required={required}
      ref={ref}
      withAsterisk={withAsterisk}
    >
      {dataObjectArray?.map(({ value, label }) => {
        return <Checkbox key={value} value={value} label={label} />;
      })}
    </Checkbox.Group>
  );

  return createdCheckboxGroupInputs;
}

export { CheckboxGroupInputsWrapper, CheckboxSingleInputWrapper };

export type {
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
};

/**
 * const {
    semanticName,
    accessibleDescription = {
      selected: '',
      deselected: '',
    },
    ariarequired = false,
    checkboxKind,
    dataObjArray = null,
    defaultValue = [''],
    description,
    label = '',
    checked = false,
    disabled = false,
    onClick = () => {},
    onChangeSingle = () => {},
    onChangeMultiple = () => {},
    ref = null,
    required = false,
    value = [''],
  } = creatorInfoObject;
 */

/**
   * <Checkbox.Group
          label={label}
          defaultValue={defaultValue}
          description={
            value.length > 0 ? description.selected : description.deselected
          }
          value={value}
          withAsterisk={required}
          onChange={onChangeMultiple}
        >
          
          {dataObjArray?.map(({ value: value_, label }, index) => (
            <Checkbox
              key={label}
              value={value_}
              label={label}
              // color="dark"
              size="sm"
              checked={value.includes(value_)}
            />
          ))}
   */
