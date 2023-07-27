import { Flex, Grid, Radio } from '@mantine/core';
import React, { ReactNode } from 'react';

import { useGlobalState } from '../../hooks';

type AccessibleRadioSingleInputCreatorInfo = {
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
  ariaRequired?: boolean | undefined;
  checked?: boolean | undefined;
  dataObjArray?:
    | Array<{
        value: string;
        label: string;
      }>
    | undefined;
  disabled?: boolean | undefined;

  onChange: (event: React.ChangeEvent<HTMLInputElement> | string) => void;
  onClick: () => void;
  radioKind: 'single' | 'multiple';
  value?: string | undefined;

  withAsterisk?: boolean | undefined;
  ref?: React.RefObject<HTMLInputElement> | undefined;
  required?: boolean | undefined;
};
*/

type AccessibleRadioGroupInputCreatorInfo = {
  semanticName: string;
  label?: ReactNode | string | undefined;
  description: string;
  ariaRequired?: boolean | undefined;
  value?: string;
  onChange: (value: string) => void;
  name?: string | undefined;
  required?: boolean | undefined;
  ref?: React.RefObject<HTMLInputElement> | undefined | null;
  withAsterisk?: boolean | undefined;
  dataObjectArray: Array<{
    value: string;
    label: string;
  }>;
};

type RadioGroupInputsWrapperProps = {
  creatorInfoObject: AccessibleRadioGroupInputCreatorInfo;
};

function RadioGroupInputsWrapper({
  creatorInfoObject,
}: RadioGroupInputsWrapperProps) {
  const {
    globalState: { width, padding },
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
    name = semanticName,
  } = creatorInfoObject;

  const radioInputsSize = 'sm';

  const createdRadioGroupInputs = (
    <Radio.Group
      size={radioInputsSize}
      label={label}
      description={description}
      aria-required={ariaRequired}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      ref={ref}
      withAsterisk={withAsterisk}
      w="100%"
      id={name}
    >
      <Grid
        columns={width < 480 ? 1 : width < 768 ? 2 : width < 1440 ? 3 : 4}
        p={padding}
      >
        {dataObjectArray?.map(({ value, label }, idx) => {
          return (
            <Grid.Col span={1} key={`${label}-${value}-${idx}`}>
              <Radio key={value} value={value} label={label} />
            </Grid.Col>
          );
        })}
      </Grid>
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
