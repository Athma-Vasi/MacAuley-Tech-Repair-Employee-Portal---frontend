import { Checkbox, Grid } from '@mantine/core';
import { ReactNode } from 'react';

import { useGlobalState } from '../../hooks';

type AccessibleCheckboxSingleInputCreatorInfo = {
  semanticName: string;
  label?: ReactNode | string | undefined;
  description: {
    selected: JSX.Element;
    deselected: JSX.Element;
  };
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
    globalState: { width },
  } = useGlobalState();

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

  const checkboxInputSize = width < 1024 ? 'sm' : 'md';

  const createdCheckboxSingleInput = (
    <Checkbox
      size={checkboxInputSize}
      label={label}
      description={checked ? description.selected : description.deselected}
      aria-describedby={
        checked
          ? `${semanticName.split(' ').join('-')}-selected`
          : `${semanticName.split(' ').join('-')}-deselected`
      }
      aria-required={ariaRequired}
      aria-label={semanticName}
      checked={checked}
      disabled={disabled}
      name={semanticName.split(' ').join('-')}
      onChange={onChange}
      required={required}
      ref={ref}
      w="100%"
    />
  );

  return createdCheckboxSingleInput;
}

type AccessibleCheckboxGroupInputCreatorInfo = {
  semanticName: string;
  label?: ReactNode | string | undefined;
  description: {
    selected: JSX.Element;
    deselected: JSX.Element;
  };
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
    globalState: { width },
  } = useGlobalState();

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

  const checkboxInputSize = width < 1024 ? 'sm' : 'md';
  const padding =
    width < 480 ? 'xs' : width < 768 ? 'sm' : width < 1024 ? 'md' : 'lg';

  const createdCheckboxGroupInputs = (
    <Checkbox.Group
      size={checkboxInputSize}
      label={label}
      description={
        value.length > 0 ? description.selected : description.deselected
      }
      aria-required={ariaRequired}
      value={value}
      onChange={onChange}
      required={required}
      ref={ref}
      withAsterisk={withAsterisk}
    >
      <Grid
        columns={width < 480 ? 1 : width < 768 ? 2 : width < 1440 ? 3 : 4}
        p={padding}
      >
        {dataObjectArray?.map(({ value, label }) => {
          return (
            <Grid.Col span={1}>
              <Checkbox key={value} name={value} value={value} label={label} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Checkbox.Group>
  );

  return createdCheckboxGroupInputs;
}

export { CheckboxGroupInputsWrapper, CheckboxSingleInputWrapper };

export type {
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
};
