import { NativeSelect } from '@mantine/core';
import { ChangeEvent, RefObject } from 'react';

import { useGlobalState } from '../../hooks';

type AccessibleSelectInputCreatorInfo = {
  data: string[];
  label: string;
  description: string;
  describedBy?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  withAsterisk?: boolean;
  ref?: RefObject<HTMLSelectElement>;
  required?: boolean;
};

type NativeSelectWrapperProps = {
  creatorInfoObject: AccessibleSelectInputCreatorInfo;
};

function NativeSelectWrapper({ creatorInfoObject }: NativeSelectWrapperProps) {
  const {
    globalState: { width },
  } = useGlobalState();

  const {
    data,
    label,
    description,
    describedBy = '',
    value,
    onChange,
    withAsterisk = false,
    ref = null,
    required = false,
  } = creatorInfoObject;

  const selectInputSize = 'sm';

  return (
    <NativeSelect
      size={selectInputSize}
      data={data}
      label={`${label.charAt(0).toUpperCase() + label.slice(1)}:`}
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
      w="100%"
    />
  );
}

export { NativeSelectWrapper };

export type { AccessibleSelectInputCreatorInfo };
