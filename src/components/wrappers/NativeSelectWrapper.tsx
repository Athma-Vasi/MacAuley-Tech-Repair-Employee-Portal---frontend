import { NativeSelect } from '@mantine/core';
import { ChangeEvent, RefObject } from 'react';

import { useGlobalState } from '../../hooks';
import { SelectInputData } from '../../types';

type AccessibleSelectInputCreatorInfo = {
  data: string[] | SelectInputData;
  label?: string;
  description: string;
  describedBy?: string;
  disabled?: boolean;
  value?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  withAsterisk?: boolean;
  ref?: RefObject<HTMLSelectElement>;
  required?: boolean;
  width?: string | number;
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
    withAsterisk = false,
    ref = null,
    required = false,
    width = '100%',
  } = creatorInfoObject;

  const selectInputSize = 'sm';

  return (
    <NativeSelect
      size={selectInputSize}
      data={data}
      disabled={disabled}
      label={`${label.charAt(0).toUpperCase() + label.slice(1)}`}
      aria-label={`Currently selected ${value}`}
      aria-required={required}
      description={description}
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
