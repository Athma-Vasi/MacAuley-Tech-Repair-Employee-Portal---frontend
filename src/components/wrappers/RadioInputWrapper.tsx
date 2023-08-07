import { Flex, Grid, Group, Radio } from '@mantine/core';
import React, { ReactNode } from 'react';

import { useGlobalState } from '../../hooks';

type AccessibleRadioSingleInputCreatorInfo = {
  semanticName: string;
  label?: ReactNode | string;
  description: string;
  key?: string;
  ariaRequired?: boolean;
  checked: boolean;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  ref?: React.RefObject<HTMLInputElement> | null;
};
type RadioSingleInputWrapperProps = {
  creatorInfoObject: AccessibleRadioSingleInputCreatorInfo;
};

function RadioSingleInputWrapper({
  creatorInfoObject,
}: RadioSingleInputWrapperProps) {
  const {
    globalState: { width },
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

  const radioInputSize = width < 1024 ? 'sm' : 'md';

  const createdRadioSingleInput = (
    <Radio
      size={radioInputSize}
      label={label}
      key={key}
      description={description}
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

  return createdRadioSingleInput;
}

/*
type AccessibleRadioSingleInputCreatorInfo = {
  semanticName: string;
  label: string;
  description: {
    selected: string;
    deselected: string;
  };
  ariaRequired?: boolean ;
  checked?: boolean ;
  dataObjArray?:
    | Array<{
        value: string;
        label: string;
      }>
    ;
  disabled?: boolean ;

  onChange: (event: React.ChangeEvent<HTMLInputElement> | string) => void;
  onClick: () => void;
  radioKind: 'single' | 'multiple';
  value?: string ;

  withAsterisk?: boolean ;
  ref?: React.RefObject<HTMLInputElement> ;
  required?: boolean ;
};
*/

type AccessibleRadioGroupInputCreatorInfo = {
  semanticName: string;
  label?: ReactNode | string;
  description?: ReactNode | string;
  ariaRequired?: boolean;
  key?: string;
  value?: string;
  onChange: (value: string) => void;
  name?: string;
  required?: boolean;
  ref?: React.RefObject<HTMLInputElement> | null;
  withAsterisk?: boolean;
  dataObjectArray: Array<{
    value: string;
    label: string;
  }>;
  columns?: number;
};

type RadioGroupInputsWrapperProps = {
  creatorInfoObject: AccessibleRadioGroupInputCreatorInfo;
};

function RadioGroupInputsWrapper({
  creatorInfoObject,
}: RadioGroupInputsWrapperProps) {
  const {
    globalState: { width, padding, rowGap },
  } = useGlobalState();

  const {
    columns,
    dataObjectArray,
    description,
    onChange,
    semanticName,
    key = semanticName,
    label = `${semanticName.charAt(0).toUpperCase()}${semanticName.slice(1)}`,
    ariaRequired = false,
    value,
    required = false,
    ref = null,
    withAsterisk = required,
    name = semanticName,
  } = creatorInfoObject;

  const radioInputsSize = 'sm';

  const createdRadioGroupInputs = (
    <Radio.Group
      size={radioInputsSize}
      label={label}
      description={description}
      aria-required={ariaRequired}
      aria-describedby={semanticName}
      key={key}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      ref={ref}
      withAsterisk={withAsterisk}
      w="100%"
      id={name}
    >
      {/* <Grid
        columns={
          columns
            ? columns
            : width < 480
            ? 1
            : width < 768
            ? 2
            : width < 1440
            ? 3
            : 4
        }
        p={padding}
      >
        {dataObjectArray?.map(({ value, label }, idx) => {
          return (
            <Grid.Col span={1} key={`${key}-${idx}-${label}-${value}`}>
              <Radio key={value} value={value} label={label} />
            </Grid.Col>
          );
        })}
      </Grid> */}
      <Flex
        direction="column"
        align="flex-start"
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
            <Group position="center" key={`${key}-${idx}-${label}-${value}`}>
              <Radio value={value} label={label} />
            </Group>
          );
        })}
      </Flex>
    </Radio.Group>
  );

  return createdRadioGroupInputs;
}

export { RadioGroupInputsWrapper, RadioSingleInputWrapper };

export type {
  AccessibleRadioGroupInputCreatorInfo,
  AccessibleRadioSingleInputCreatorInfo,
};

/**
 *  case 'multiple': {
      return (
        <Radio.Group
          size="sm"
          label={label}
          description={checked ? description.selected : description.deselected}
          aria-required={ariaRequired}
          value={value}
          onChange={onChange}
          name={semanticName}
          required={required}
          ref={ref}
          withAsterisk={withAsterisk}
        >
          {dataObjArray?.map(({ value, label }) => {
            return <Radio key={value} value={value} label={label} />;
          })}
        </Radio.Group>
      );
    }
 */
