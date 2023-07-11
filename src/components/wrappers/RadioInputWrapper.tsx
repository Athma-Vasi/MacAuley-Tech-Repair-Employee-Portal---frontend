import { Radio } from '@mantine/core';

import { AccessibleRadioInputCreatorInfo } from '../../jsxCreators';

type RadioInputWrapperProps = {
  creatorInfoObject: AccessibleRadioInputCreatorInfo;
};

function RadioInputWrapper({ creatorInfoObject }: RadioInputWrapperProps) {
  const {
    semanticName,
    label,
    description,
    ariaRequired = false,
    checked,
    dataObjArray = null,
    disabled = false,
    onChange,
    onClick,
    radioKind,
    value = '',
    withAsterisk = false,
    ref = null,
    required = false,
  } = creatorInfoObject;

  switch (radioKind) {
    case 'single': {
      return (
        <Radio
          size="sm"
          label={label}
          description={checked ? description.selected : description.deselected}
          aria-required={ariaRequired}
          aria-label={checked ? semanticName : semanticName}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          onClick={onClick}
          required={required}
          ref={ref}
        />
      );
    }
    case 'multiple': {
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
    default:
      return null;
  }
}

export { RadioInputWrapper };
