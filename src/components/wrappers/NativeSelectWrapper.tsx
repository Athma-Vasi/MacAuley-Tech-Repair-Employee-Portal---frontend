import { MantineNumberSize, MantineSize, NativeSelect } from '@mantine/core';
import { ChangeEvent, RefObject } from 'react';

import { SelectInputData } from '../../types';

type AccessibleSelectInputCreatorInfo = {
  data: string[] | SelectInputData;
  label?: string;
  description?: string;
  describedBy?: string;
  disabled?: boolean;
  value?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  withAsterisk?: boolean;
  ref?: RefObject<HTMLSelectElement>;
  required?: boolean;
  size?: MantineSize;
  width?: MantineNumberSize;
};

type NativeSelectWrapperProps = {
  creatorInfoObject: AccessibleSelectInputCreatorInfo;
};

function NativeSelectWrapper({ creatorInfoObject }: NativeSelectWrapperProps) {
  const {
    data,
    label = '',
    description,
    describedBy = '',
    disabled = false,
    value,
    onChange,
    ref = null,
    required = false,
    size = 'sm',
    width = 330,
    withAsterisk = required,
  } = creatorInfoObject;

  return (
    <NativeSelect
      size={size}
      data={data}
      disabled={disabled}
      label={`${label.charAt(0).toUpperCase() + label.slice(1)}`}
      aria-label={`${description}. Currently selected ${value}`}
      aria-required={required}
      // description={description}
      aria-describedby={describedBy}
      value={value}
      onChange={onChange}
      ref={ref}
      name={label.split(' ').join('-').toLowerCase()}
      withAsterisk={withAsterisk}
      required={required}
      w={width}
    />
  );
}

export { NativeSelectWrapper };

export type { AccessibleSelectInputCreatorInfo };
