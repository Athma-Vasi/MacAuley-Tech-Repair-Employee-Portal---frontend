import { Checkbox, Flex, Grid, Group, MantineNumberSize } from '@mantine/core';
import { ChangeEvent, ReactNode, RefObject } from 'react';

import { useGlobalState } from '../../hooks';

type AccessibleCheckboxSingleInputCreatorInfo = {
  semanticName: string;
  key?: string;
  label?: ReactNode | string;
  description: {
    selected: JSX.Element;
    deselected: JSX.Element;
  };
  ariaRequired?: boolean;
  checked: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  ref?: RefObject<HTMLInputElement> | null;
};

type CheckboxSingleInputWrapperProps = {
  creatorInfoObject: AccessibleCheckboxSingleInputCreatorInfo;
};

function CheckboxSingleInputWrapper({
  creatorInfoObject,
}: CheckboxSingleInputWrapperProps) {
  const {
    globalState: { width, padding, rowGap },
  } = useGlobalState();

  const {
    checked,
    description,
    onChange,
    semanticName,
    key = semanticName,
    label = `${semanticName.charAt(0).toUpperCase()}${semanticName.slice(1)}`,
    disabled = false,
    ref = null,
    required = false,
    ariaRequired = required,
  } = creatorInfoObject;

  const checkboxInputSize = 'sm';

  const createdCheckboxSingleInput = (
    <Checkbox
      size={checkboxInputSize}
      label={label}
      key={key}
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
  key?: string;
  label?: ReactNode | string;
  description: {
    selected: JSX.Element;
    deselected: JSX.Element;
  };
  disabledValuesSet?: Set<string>;
  ariaRequired?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
  name?: string;
  required?: boolean;
  ref?: RefObject<HTMLInputElement> | null;
  withAsterisk?: boolean;
  dataObjectArray: Array<{
    value: string;
    label: string;
  }>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  widthCheckbox?: MantineNumberSize;
};

type CheckboxGroupInputsWrapperProps = {
  creatorInfoObject: AccessibleCheckboxGroupInputCreatorInfo;
};

function CheckboxGroupInputsWrapper({
  creatorInfoObject,
}: CheckboxGroupInputsWrapperProps) {
  const {
    globalState: { width, padding, rowGap },
  } = useGlobalState();

  const {
    dataObjectArray,
    description,
    disabledValuesSet = new Set(),
    onChange,
    semanticName,
    key = semanticName,
    label = `${semanticName.charAt(0).toUpperCase()}${semanticName.slice(1)}`,
    ariaRequired = false,
    value,
    required = false,
    ref = null,
    size = 'sm',
    withAsterisk = required,
    widthCheckbox = '100%',
  } = creatorInfoObject;

  const inputWidth = 330;

  const createdCheckboxGroupInputs = (
    <Checkbox.Group
      size={size}
      label={label}
      key={key}
      description={
        value.length > 0 ? description.selected : description.deselected
      }
      aria-required={ariaRequired}
      value={value}
      onChange={onChange}
      required={required}
      ref={ref}
      withAsterisk={withAsterisk}
      w={widthCheckbox}
    >
      <Flex
        // direction="column"
        align="baseline"
        justify="space-between"
        p={padding}
        rowGap={rowGap}
        columnGap={rowGap}
        w="100%"
        wrap="wrap"
        key={`${key}-flex`}
      >
        {dataObjectArray?.map(({ value, label }, idx) => {
          return (
            <Group position="center" key={`${key}-${idx}${value}-${label}`}>
              <Checkbox
                w={inputWidth}
                name={value}
                value={value}
                label={label}
                disabled={
                  disabledValuesSet.has(value) || disabledValuesSet.has(label)
                }
              />
            </Group>
          );
        })}
      </Flex>
    </Checkbox.Group>
  );

  return createdCheckboxGroupInputs;
}

export { CheckboxGroupInputsWrapper, CheckboxSingleInputWrapper };

export type {
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
};
