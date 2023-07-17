import { NativeSelect } from '@mantine/core';

import { useGlobalState } from '../../hooks';

type AccessibleSelectInputCreatorInfo = {
  data: string[];
  label: string;
  description: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  withAsterisk?: boolean | undefined;
  ref?: React.RefObject<HTMLSelectElement> | undefined;
  required?: boolean | undefined;
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
    value,
    onChange,
    withAsterisk = false,
    ref = null,
    required = false,
  } = creatorInfoObject;

  const selectInputSize = width < 1024 ? 'sm' : 'md';

  return (
    <NativeSelect
      size={selectInputSize}
      data={data}
      label={label}
      aria-label={`Currently selected ${value}`}
      aria-required={required}
      description={description}
      value={value}
      onChange={onChange}
      ref={ref}
      name={label.split(' ').join('-').toLowerCase()}
      withAsterisk={withAsterisk}
      required={required}
    />
  );
}

export { NativeSelectWrapper };

export type { AccessibleSelectInputCreatorInfo };
