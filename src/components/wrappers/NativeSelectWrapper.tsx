import { NativeSelect } from '@mantine/core';

import { AccessibleSelectInputCreatorInfo } from '../../jsxCreators';

type NativeSelectWrapperProps = {
  creatorInfoObject: AccessibleSelectInputCreatorInfo;
};

function NativeSelectWrapper({ creatorInfoObject }: NativeSelectWrapperProps) {
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

  return (
    <NativeSelect
      size="sm"
      data={data}
      label={label}
      aria-label={`Currently selected ${value}`}
      aria-required={required}
      description={description}
      value={value}
      onChange={onChange}
      ref={ref}
      withAsterisk={withAsterisk}
      required={required}
    />
  );
}

export { NativeSelectWrapper };
